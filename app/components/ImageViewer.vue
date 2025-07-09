<template>
  <div
    v-if="imageStore.selectedImage"
    class="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
    @click="closeModal"
    @keydown.esc="closeModal"
    @keydown.left="imageStore.previousImage"
    @keydown.right="imageStore.nextImage"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    tabindex="-1"
  >
    <button
      class="max-lg:hidden absolute left-20 text-light p-20"
      @click.stop="imageStore.previousImage"
    >
      <Icon name="material-symbols:arrow-back-ios" class="text-3xl" />
    </button>
    <img
      :src="imageStore.selectedImage"
      alt="Fullscreen Image"
      class="rounded-2xl max-w-full max-h-full p-2"
    />
    <button
      class="max-lg:hidden absolute right-20 text-light p-20"
      @click.stop="imageStore.nextImage"
    >
      <Icon name="material-symbols:arrow-forward-ios" class="text-3xl" />
    </button>
  </div>
</template>

<script setup lang="ts">
const imageStore = useImageStore();

const closeModal = () => {
  imageStore.clearSelectedImage();
};

// Swipe functionality
const touchStartX = ref(0);
const touchEndX = ref(0);

const handleTouchStart = (event: TouchEvent) => {
  // @ts-ignore
  touchStartX.value = event.touches[0].clientX;
};

const handleTouchMove = (event: TouchEvent) => {
  // @ts-ignore
  touchEndX.value = event.touches[0].clientX;
};

const handleTouchEnd = () => {
  const diffX = touchStartX.value - touchEndX.value;
  const swipeThreshold = 50;

  if (diffX > swipeThreshold) {
    imageStore.nextImage();
  } else if (diffX < -swipeThreshold) {
    imageStore.previousImage();
  }
};
</script>
