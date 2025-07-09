<template>
  <button
    @click="openLink"
    class="funky-button bg-primary"
    :style="buttonStyles"
    :title="button_link"
  >
    {{ button_text }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  button_link?: string;
  button_text?: string;
  button_text_color?: string;
  button_bg_color?: string;
  button_border_color?: string;
}>();

const openLink = () => {
  if (props.button_link) {
    window.open(props.button_link, "_blank");
  }
};

// Computed property to dynamically set CSS variables
const buttonStyles = {
  "--button-text-color": props.button_text_color,
  "--button-bg-color": props.button_bg_color,
  "--button-border-color": props.button_border_color,
};
</script>

<style scoped>
/* Custom Button */
.funky-button {
  font-style: italic;
  font-weight: 900;
  color: var(
    --button-text-color,
    var(--color-background)
  ); /* Default text color */
  background-color: var(
    --button-bg-color,
    var(--color-primary)
  ); /* Default background color */
  border: 3px solid var(--button-border-color, var(--color-secondary)); /* Default border color */
  border-radius: 50rem;
  box-shadow: 0px 8px var(--button-bg-color, var(--color-primary)),
    0px 11px var(--button-border-color, var(--color-secondary));
  padding: 8px 60px;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    filter: saturate(150%);
  }

  &:active {
    box-shadow: 0px 2px var(--button-border-color, var(--color-secondary));
    transform: translateY(9px);
  }
}

@media (min-width: 640px) {
  .funky-button {
    padding: 8px 80px;
    font-size: 30px;
  }
}
</style>
