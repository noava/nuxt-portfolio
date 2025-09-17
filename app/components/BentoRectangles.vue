<template>
  <div
    class="lg:grid lg:grid-cols-4 lg:grid-rows-10 lg:gap-4 mx-2 max-lg:space-y-3 overflow-hidden"
  >
    <div class="col-span-3 row-span-2 lg:h-[16rem]">
      <div
        class="max-lg:hidden mt-24 xl:mt-12 ml-32 xl:ml-44 2xl:ml-40 text-[9rem] xl:text-[11rem] 2xl:text-[12rem]"
      >
        <h1 class="mt-0 leading-[0.5]">Niklas</h1>
        <h1 class="ml-[15vw] 2xl:ml-72">Vezina</h1>
      </div>
    </div>
    <div
      class="row-span-3 col-start-3 row-start-4 bg-primary rounded p-2 flex flex-col justify-between"
    >
      <img
        class="max-lg:hidden h-20 m-auto my-8 fill-orange-500"
        src="../assets/svg/N-wiff-stars.svg"
      />
      <p
        class="text-background font-medium text-lg lg:text-xl leading-relaxed m-4 pt-0 my-auto"
      >
        <b class="text-2xl">Hei!</b> :&#41; <br />
        My name is <b>Niklas Vezina</b>, and I have a bachelor degree in
        computer engineering. My love for graphic and web design has led me to
        create designs that are also functional on both digital and print
        platforms.
      </p>
    </div>
    <div
      class="row-span-3 col-start-3 row-start-7 bg-secondary rounded p-6 flex flex-col"
    >
      <p class="text-light font-medium text-lg lg:text-xl leading-relaxed">
        <b>I enjoy designing.</b>
        Whether it's developing a user interface or combining elements to create
        a poster or these cards:
      </p>
      <div class="grid place-items-center h-[16rem] my-auto relative">
        <img
          v-for="(image, index) in images"
          :key="index"
          :src="image.src"
          :alt="image.alt"
          class="w-[8rem] absolute transition-transform lg:hover:scale-110 cursor-pointer"
          :class="image.position"
          :style="{ zIndex: index }"
          title="Double click to open fullscreen image"
          @click="drawCard(index)"
          @dblclick="
            imageStore.selectImage(
              'https://nrgbyqrjjpgsmgesvyea.supabase.co/storage/v1/object/public/project_images/Song-cards/3-cards.webp'
            )
          "
        />
      </div>
    </div>
    <div class="row-span-6 col-start-1 row-start-3">
      <div
        class="bg-secondary aspect-[521/768] rounded p-2 flex justify-center items-center"
      >
        <NuxtImg
          class="w-full h-auto object-cover rounded"
          src="https://nrgbyqrjjpgsmgesvyea.supabase.co/storage/v1/object/public/project_images/BentoRectangles/pusekatter.webp"
          @click="
            imageStore.selectImage(
              'https://nrgbyqrjjpgsmgesvyea.supabase.co/storage/v1/object/public/project_images/BentoRectangles/pusekatter.webp'
            )
          "
        />
      </div>
      <div class="p-4">
        <span class="text-xl leading-relaxed"
          >This <b>website</b> is made using vue, gsap, typescript, supabase,
          pinia and tailwindcss. Check out the repo
          <a
            class="text-accent font-bold"
            href="https://github.com/noava/my-portfolio"
            >here</a
          >.
        </span>
      </div>
      <div
        class="bg-primary rounded h-48 overflow-hidden relative pointer-events-none"
      >
        <div
          v-for="(noava_line, index) in noava_lines"
          :key="index"
          class="text-[1.6rem] font-black leading-4 text-background rotate-[20deg] whitespace-nowrap absolute left-[-2em]"
          :style="{ top: `${index * 18 - 90}%` }"
        >
          NOAVA-NOAVA-NOAVA-NOAVA-NOAVA-NOAVA-NOAVA-NOAVA-NOAVA-NOAVA-NOAVA-NOAVA
        </div>
      </div>
    </div>

    <div class="max-lg:hidden col-span-2 col-start-2 row-start-3">
      <!-- empty long -->
    </div>
    <div class="max-lg:hidden col-start-2 row-start-4">
      <!-- empty short -->
    </div>
    <div
      class="max-lg:hidden row-span-6 col-start-2 row-start-5 bg-primary rounded p-2 h-[32rem] lg:h-[56rem]"
    >
      <div
        class="size-full bg-fixed bg-cover bg-center rounded lg:hover:scale-100"
        style="
          background-image: url(https://nrgbyqrjjpgsmgesvyea.supabase.co/storage/v1/object/public/project_images/BentoRectangles/tutrle.webp);
        "
      ></div>
    </div>

    <div class="row-span-10 col-start-4 row-start-1 space-y-4">
      <div
        class="max-lg:hidden h-[60rem] bg-secondary rounded flex items-center justify-center pointer-events-none"
      >
        <span
          class="text-[15rem] rotate-90 text-background font-black italic leading-none"
          >NOAVA</span
        >
      </div>
      <div
        class="row-span-3 col-start-4 row-start-8 p-2 bg-primary rounded h-[28rem]"
      >
        <div
          class="flex items-center justify-center relative size-full bg-fixed bg-center rounded bg-gradient-to-br from-cyan-500 to-orange-300"
        >
          <div
            class="absolute top-10 h-[20rem] p-2 rotate-[9deg] bg-orange-400 w-[13rem]"
          ></div>
          <div
            class="absolute top-10 h-[20rem] p-2 rotate-[2deg] bg-cyan-500 w-[13rem]"
          ></div>
          <NuxtImg
            class="absolute top-10 h-[20rem] p-2 lg:hover:scale-110 cursor-pointer rotate-[-8deg] hover:rotate-[0deg] transition-all"
            src="https://nrgbyqrjjpgsmgesvyea.supabase.co/storage/v1/object/public/project_images/Posters/Cowboy%20Bebop.webp"
            alt="Poster of Cowboy Bebop I've designed"
            @click="
              imageStore.selectImage(
                'https://nrgbyqrjjpgsmgesvyea.supabase.co/storage/v1/object/public/project_images/Posters/Cowboy%20Bebop.webp'
              )
            "
          />
          <div class="absolute bottom-4 text-center">
            <p class="text-background/80 italic font-semibold">
              View more posters by clicking the poster.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const imageStore = useImageStore();
const noava_lines = ref(Array(16).fill(""));
const images = ref([
  {
    src: "https://nrgbyqrjjpgsmgesvyea.supabase.co/storage/v1/object/public/project_images/Song-cards/Song-selected.svg",
    alt: "Song Selected",
    position: "top-5",
  },
  {
    src: "https://nrgbyqrjjpgsmgesvyea.supabase.co/storage/v1/object/public/project_images/Song-cards/Song-vetoed.svg",
    alt: "Song Vetoed",
    position: "rotate-[25deg] right-16 lg:right-8 top-16",
  },
  {
    src: "https://nrgbyqrjjpgsmgesvyea.supabase.co/storage/v1/object/public/project_images/Song-cards/Song-card.svg",
    alt: "Song Card",
    position: "rotate-[-25deg] left-16 lg:left-8 top-16",
  },
]);

const drawCard = (index: number) => {
  const selectedImage = images.value.splice(index, 1)[0];
  if (selectedImage) {
    images.value.push(selectedImage);
  }
};
</script>
