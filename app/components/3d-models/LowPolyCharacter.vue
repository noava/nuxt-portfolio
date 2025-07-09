<template>
  <primitive :object="model" ref="characterRef" :position="[0, -1, 0]" />
</template>

<script setup lang="ts">
const characterRef = ref();

const { onLoop } = useRenderLoop();

onLoop(({ elapsed }) => {
  if (characterRef.value) {
    characterRef.value.rotation.y = Math.sin(elapsed) + 1;
  }
});

const { scene: model, materials } = await useGLTF(
  `https://nrgbyqrjjpgsmgesvyea.supabase.co/storage/v1/object/public/project_images/3d-Models/LowPoly-Man-sitting.glb`
);

if (materials.GlassMaterial) {
  const glassMaterial = materials.GlassMaterial;
  glassMaterial.transparent = true;
  glassMaterial.opacity = 0.2;
}
</script>
