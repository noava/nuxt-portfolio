<template>
  <div class="p-4 flex flex-col gap-4 items-start mb-16">
    <h1 class="text-5xl">Image to ASCII Generator</h1>
    <p class="text-light">
      Convert images to ASCII art using a custom character set. Drag and drop
      your image or select one from your device.
    </p>
    <h2 class="mt-4 text-xl">Select an image file</h2>
    <div class="flex flex-col md:flex-row gap-4 w-full">
      <label
        @dragover.prevent
        @drop.prevent="handleDrop"
        class="block w-full max-w-md border-2 border-dashed bg-secondary/10 border-primary rounded-md p-6 text-center text-light/90 hover:text-light transition cursor-pointer"
      >
        <ClientOnly>
          <input
            type="file"
            accept=".svg,.png,.jpg,.jpeg,.webp"
            @change="onFileChange"
            class="hidden"
          />
        </ClientOnly>
        <p class="mb-2">Drag and drop an image here</p>
        <p class="text-sm text-light/70">or click to select one</p>
      </label>
      <div class="w-full flex flex-col gap-2 justify-center">
        <span>Image selected : {{ fileName }}</span>

        <p class="text-sm text-light/70">
          Supported formats: SVG, PNG, JPG, JPEG, WEBP
        </p>
      </div>
    </div>
    <h2 class="mt-4 text-xl">Resolution (ASCII width):</h2>
    <input
      type="range"
      min="40"
      max="200"
      v-model="asciiWidth"
      class="w-full md:w-1/2 h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary mb-4"
    />
    <div class="flex items-center mb-4">
      <input
        id="checkbox-inverse"
        type="checkbox"
        v-model="invertOutput"
        class="appearance-none size-6 rounded-lg pb-1 bg-primary relative transition-all duration-150 flex items-center justify-center before:content-[''] before:absolute before:w-4 before:h-2 before:border-b-3 before:border-l-4 before:border-background before:rotate-[-45deg] before:scale-0 checked:before:scale-100"
      />
      <label for="checkbox-inverse" class="ms-2 text-sm font-medium">
        Inverse output
      </label>
    </div>

    <div class="flex items-center mb-4">
      <input
        checked
        id="checkbox-random_dark"
        type="checkbox"
        v-model="useRandomDark"
        class="appearance-none min-w-6 size-6 rounded-lg pb-1 bg-primary relative transition-all duration-150 flex items-center justify-center before:content-[''] before:absolute before:w-4 before:h-2 before:border-b-3 before:border-l-4 before:border-background before:rotate-[-45deg] before:scale-0 checked:before:scale-100"
      />
      <label for="checkbox-random_dark" class="ms-2 text-sm font-medium">
        Randomize Japanese Katagana characters on dark spots. Works best with
        fully dark objects.
      </label>
    </div>

    <h2 class="text-xl text-light">Custom character set:</h2>
    <input
      type="text"
      v-model="charSet"
      class="w-full md:w-1/2 p-2 border border-secondary rounded-md bg-secondary/10 text-light placeholder:text-light/70 font-mono"
    />
    <div class="flex flex-col md:flex-row mt-2">
      <p class="text-sm text-light/70">
        Use half-width characters for better results.
      </p>
      <p class="md:ms-2 text-sm text-light/70">(Default: " .:-=+*%@#XW")</p>
    </div>

    <div class="flex flex-row justify-center items-center mt-4 mb-16">
      <ButtonsDynamicButton
        @click="() => uploadedImg && generateAscii(uploadedImg)"
        button_text="Generate"
      />
      <Icon
        name="material-symbols:content-copy-outline"
        class="text-5xl text-light mx-8 align-middle cursor-pointer"
        :class="[
          isClicked && asciiArt
            ? 'scale-125 hover:text-accent'
            : 'scale-110 hover:text-primary',
        ]"
        @click="copyToClipboard"
        title="Copy to clipboard"
      />
    </div>

    <canvas ref="canvasRef" class="hidden" />
    <div
      v-if="asciiArt"
      class="max-w-full overflow-auto rounded border border-primary/70 bg-secondary/10 p-4"
    >
      <pre class="font-mono text-[12px] leading-[1] text-light">{{
        asciiArt
      }}</pre>
    </div>
  </div>
</template>

<script setup>
const canvasRef = ref(null);
const charSet = ref(" .:-=+*%@#XW");
const japCharSet = ref(
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポャュョッヮヴヴァヴィヴェヴォウィウェウォティディファフィフェフォ"
);
const asciiArt = ref("");
const asciiWidth = ref(100);
const fileName = ref("No file selected");
const useRandomDark = ref(true);
const invertOutput = ref(false);
const isClicked = ref(false);
const uploadedImg = ref(null);

const handleFile = (file) => {
  fileName.value = file.name;

  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      uploadedImg.value = img;
      generateAscii(img);
    };
    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
};

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) handleFile(file);
};

const handleDrop = (e) => {
  const file = e.dataTransfer.files[0];
  if (file) handleFile(file);
};

const generateAscii = (img) => {
  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");

  if (!img.width || !img.height) return;

  const aspectRatio = img.width / img.height;
  const width = parseInt(asciiWidth.value);

  const height = Math.floor(width / aspectRatio);

  canvas.width = width;
  canvas.height = height;

  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);

  let output = "";
  for (let y = 0; y < height; y++) {
    let line = "";
    for (let x = 0; x < width; x++) {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const brightness = (pixel[0] + pixel[1] + pixel[2]) / 3;
      const alpha = pixel[3];

      // Fill transparent pixels with spaces or characters if inverted
      if (alpha < 10) {
        if (invertOutput.value) {
          line += useRandomDark.value
            ? japCharSet.value[
                Math.floor(Math.random() * japCharSet.value.length)
              ]
            : charSet.value.at(-1)?.repeat(2);
        } else {
          line += "  ";
        }
        continue;
      }

      // Map brightness to charSet index
      let charIndex = Math.floor(
        ((255 - brightness) / 255) * (charSet.value.length - 1)
      );

      // Invert brightness output
      if (invertOutput.value) {
        charIndex = charSet.value.length - 1 - charIndex;
      }

      if (useRandomDark.value && brightness < 40 && !invertOutput.value) {
        // Randomize character from full set on very dark pixel
        const randomIndex = Math.floor(Math.random() * japCharSet.value.length);
        line += japCharSet.value[randomIndex];
      } else {
        line += charSet.value[charIndex];
        line += charSet.value[charIndex];
      }
    }
    output += line + "\n";
  }

  asciiArt.value = output;
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(asciiArt.value).then(() => {});
  isClicked.value = true;
  setTimeout(() => {
    isClicked.value = false;
  }, 200);
};
</script>
