<template>
  <div class="min-h-screen">
    <div
      class="fixed inset-0 w-full min-h-screen bg-gradient-to-br from-red-500 to-yellow-500"
    >
      <TresCanvas window-size>
        <TresPerspectiveCamera :position="[2.5, 0, 1]" :fov="90" />
        <OrbitControls />

        <Suspense>
          <LowPolyCharacter />
        </Suspense>
      </TresCanvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import LowPolyCharacter from "@/components/3d-models/LowPolyCharacter.vue";

// Turn off scrolling
onMounted(() => {
  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  document.body.style.overflow = "auto";
});
</script>
