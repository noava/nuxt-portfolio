<template>
  <div class="relative">
    <div class="border border-primary/30 rounded-lg overflow-hidden">
      <button
        type="button"
        @click="isOpen = !isOpen"
        class="w-full flex items-center justify-between p-3 bg-background/30 hover:bg-accent/30 transition-colors"
      >
        <span class="font-medium text-sm capitalize">{{ selectedLabel }}</span>
        <Icon
          :name="
            isOpen
              ? 'material-symbols:expand-less'
              : 'material-symbols:expand-more'
          "
          class="text-xl"
        />
      </button>
    </div>

    <div
      v-if="isOpen"
      tabindex="-1"
      class="absolute left-0 top-full z-10 mt-2 w-full rounded-lg border border-primary/30 bg-background p-3 space-y-2"
    >
      <button
        type="button"
        v-for="option in options"
        :key="option.id"
        @click="selectOption(option.id)"
        class="w-full text-left flex items-center space-x-2 cursor-pointer hover:bg-accent/20 p-2 rounded transition-colors"
      >
        <span class="text-sm">{{ option.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface DropdownOption {
  id: string;
  name: string;
}

const props = withDefaults(
  defineProps<{
    modelValue: string;
    options: DropdownOption[];
    placeholder?: string;
  }>(),
  {
    placeholder: "Select an option",
  },
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const isOpen = ref(false);

const selectedLabel = computed(() => {
  const selectedOption = props.options.find(
    (option) => option.id === props.modelValue,
  );

  return selectedOption?.name ?? props.placeholder;
});

const selectOption = (id: string) => {
  emit("update:modelValue", id);
  isOpen.value = false;
};
</script>
