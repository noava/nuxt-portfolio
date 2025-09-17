<template>
  <div class="bg-background text-light font-saira">
    <NavbarTab />
    <section
      class="p-4 flex flex-col justify-center items-center h-screen text-center"
    >
      <h1 class="text-6xl font-bold">{{ error?.statusCode }}</h1>
      <span class="text-3xl mt-8">{{ error?.message }}</span>
    </section>
    <FooterItem />
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});
</script>
