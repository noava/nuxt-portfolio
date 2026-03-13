<template>
  <div
    class="footer-container bg-navbarfooter rounded-t-2xl h-full flex flex-col items-center"
  >
    <div class="max-w-[1600px]">
      <div
        class="flex max-lg:flex-col justify-between max-lg:space-y-10 lg:py-20 py-4 px-2 lg:px-8"
      >
        <div class="flex flex-row justify-between">
          <div class="lg:w-60 flex flex-row items-center gap-4">
            <Icon
              name="mdi:linkedin"
              class="text-5xl lg:text-7xl cursor-pointer"
              @click="openLink('https://linkedin.com/in/niklas-vezina')"
              title="https://linkedin.com/in/niklas-vezina"
            />
            <Icon
              name="mdi:github"
              class="text-5xl lg:text-7xl cursor-pointer"
              @click="openLink('https://github.com/noava')"
              title="https://github.com/noava"
            />
            <Icon
              name="simple-icons:itchdotio"
              class="text-5xl lg:text-7xl cursor-pointer"
              @click="openLink('https://noava.itch.io/')"
              title="https://noava.itch.io/"
            />
          </div>
          <div class="flex justify-center items-center ps-2">
            <Icon
              class="align-middle text-3xl lg:text-5xl"
              name="material-symbols:arrow-left-alt-rounded"
            />
            <span class="text-xl lg:text-3xl ps-2"
              >platforms
              <Icon name="noto:eyes" class="align-middle text-3xl lg:text-5xl"
            /></span>
          </div>
        </div>
        <div
          class="flex flex-col justify-center items-center max-lg:order-first max-lg:pb-10"
        >
          <DynamicButton
            button_text="Reach Out!"
            :button_text_color="buttonTextColor"
            :button_border_color="buttonBorderColor"
            @click="router.push({ hash: '#contact' })"
          />
          <span class="w-80 text-base pt-6"
            >Reach out if you are interesting in designing or would like to
            offer me a job!</span
          >
        </div>
      </div>

      <div class="p-2 pt-10">
        <NoavaHover class="w-full h-[18vw] max-h-[30rem]" />
        <div class="w-full text-right text-sm py-4">
          © {{ new Date().getFullYear() }} Niklas Vezina
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DynamicButton from "./buttons/DynamicButton.vue";

const router = useRouter();

const buttonTextColor = "#19191f";
const buttonBorderColor = "#773438";

function openLink(url: string) {
  navigator.vibrate(50);
  window.open(url, "_blank");
}
</script>
