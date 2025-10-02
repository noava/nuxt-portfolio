<template>
  <div v-if="isLoading" class="flex justify-center items-center h-52">
    Loading...
  </div>

  <div
    v-if="!isLoading"
    :class="id % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'"
    class="lg:flex lg:justify-between lg:items-start my-16 px-2"
    :style="{ color: title_color }"
  >
    <div
      :class="id % 2 === 0 ? 'lg:ml-20 lg:text-left' : 'lg:mr-20 lg:text-right'"
      class="lg:mt-20 mx-4"
    >
      <h1
        class="text-[15vw]/[15vw] lg:text-8xl"
        :style="{ color: title_color }"
      >
        {{ title }}
      </h1>
      <h2 class="text-2xl lg:text-3xl" :style="{ color: undertitle_color }">
        {{ undertitle }}
      </h2>
      <p
        class="text-lg lg:text-2xl my-6 lg:my-12 lg:leading-relaxed"
        v-html="description"
        :style="{ color: description_color }"
      ></p>
      <DynamicButton
        class="w-full lg:w-auto mb-8"
        v-if="button_text"
        :button_text="button_text"
        :button_link="button_link"
        :button_text_color="button_text_color"
        :button_bg_color="button_bg_color"
        :button_border_color="button_border_color"
      />
      <p
        class="text-lg lg:text-2xl my-4 max-sm:text-right"
        :class="id % 2 === 0 ? 'text-left' : 'text-right'"
        :style="{ color: undertitle_color }"
      >
        {{ date }}
      </p>
    </div>
    <img
      v-if="image_url"
      :src="image_url"
      :alt="'Image of ' + title"
      class="rounded-2xl m-auto max-lg:w-[90%] w-full lg:max-w-[50%] cursor-pointer"
      :style="{ border: `${image_border} solid 10px` }"
      @click="imageStore.selectImage(image_url)"
    />
  </div>
</template>

<script setup lang="ts">
import DynamicButton from "../buttons/DynamicButton.vue";

const imageStore = useImageStore();

const supabase = useSupabaseClient();

const props = defineProps<{ id: number }>();
const { id } = toRefs(props);

const isLoading = ref(true);

const title = ref("");
const undertitle = ref("");
const description = ref("");
const image_url = ref("");
const button_text = ref("");
const date = ref("");
const button_link = ref("");
const title_color = ref("");
const undertitle_color = ref("");
const description_color = ref("");
const button_text_color = ref("");
const button_bg_color = ref("");
const button_border_color = ref("");
const font = ref("");
const image_border = ref("");

onMounted(() => {
  getProjects();
});

async function getProjects() {
  try {
    isLoading.value = true;

    let { data, error, status }: { data: any; error: any; status: any } =
      await supabase
        .from("projects")
        .select(
          `title, undertitle, description, image_url, date, button_link, button_text, title_color, undertitle_color, description_color, button_text_color, button_bg_color, button_border_color, font, image_border`
        )
        .eq("id", id.value)
        .single();

    if (error && status !== 406) throw error;

    if (data) {
      title.value = data.title;
      undertitle.value = data.undertitle;
      description.value = data.description;
      image_url.value = data.image_url;
      date.value = data.date;
      button_link.value = data.button_link;
      button_text.value = data.button_text;
      title_color.value = data.title_color;
      undertitle_color.value = data.undertitle_color;
      description_color.value = data.description_color;
      button_text_color.value = data.button_text_color;
      button_bg_color.value = data.button_bg_color;
      button_border_color.value = data.button_border_color;
      font.value = data.font;
      image_border.value = data.image_border;
    }
  } catch (error: any) {
    alert(error.message);
  } finally {
    isLoading.value = false;
  }
}
</script>
