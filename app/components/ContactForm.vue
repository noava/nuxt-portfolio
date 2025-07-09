<template>
  <!-- First Modal for Header and showing my email -->
  <div
    v-if="isFirstModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur p-6"
    @click.self="closeFirstModal"
  >
    <div
      class="relative w-full lg:w-[50rem] lg:h-[40rem] max-h-[90%] bg-card p-10 flex flex-col rounded-lg gap-4 justify-between"
    >
      <div
        class="absolute top-[-20px] right-[-20px] bg-background text-light border-2 cursor-pointer border-light rounded-full p-2 size-11 flex items-center justify-center"
        @click="closeFirstModal"
      >
        <Icon name="material-symbols:close" class="text-3xl" />
      </div>
      <div>
        <h2
          class="text-3xl lg:text-7xl font-bold text-center tracking-[0.5rem] lg:tracking-[1.5rem] pb-2"
        >
          Contact Me
        </h2>
        <h1 class="text-xl lg:text-3xl font-bold text-center">
          I'd love to hear from you!
        </h1>
      </div>
      <span class="text-xl block py-10 lg:py-20"
        >You could press <b>continue</b> and navigate throught the form or you
        can reach me through this email:
        <a class="text-accent" href="mailto:noavadev@gmail"
          >noavadev@gmail.com</a
        >
      </span>
      <DynamicButton
        button_text="Continue"
        :button_text_color="buttonTextColor"
        :button_border_color="buttonBorderColor"
        @click="handleFirstForm"
        class="w-full lg:w-1/2 mt-auto ms-auto"
      />
    </div>
  </div>

  <!-- Second Modal for Who, What & Why -->
  <div
    v-if="isSecondModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur p-6"
    @click.self="closeSecondModal"
  >
    <form
      id="inquiries"
      class="relative w-full lg:w-[50rem] lg:h-[40rem] max-h-[90%] bg-card p-10 flex flex-col justify-between rounded-lg gap-4"
      @submit.prevent="handleSecondForm"
      novalidate
    >
      <div
        class="absolute top-[-20px] right-[-20px] bg-background text-light border-2 cursor-pointer border-light rounded-full p-2 size-11 flex items-center justify-center"
        @click="closeSecondModal"
      >
        <Icon name="material-symbols:close" class="text-3xl" />
      </div>
      <h2 class="text-2xl lg:text-4xl font-bold text-center mb-4">
        Who, What & Why?
      </h2>

      <div class="flex flex-col">
        <label
          class="text-md lg:text-xl font-bold italic mb-1 transition duration-300 ease"
          :class="{
            'text-red-700': !form.who && hasSubmitted,
          }"
          >Who?</label
        >
        <div class="flex flex-row space-x-12">
          <div class="inline-flex items-center">
            <label
              class="relative flex items-center cursor-pointer"
              for="company"
            >
              <input
                v-model="form.who"
                type="radio"
                class="bg-background peer size-5 cursor-pointer appearance-none rounded-full border-2 border-background-darker hover:border-light transition-all"
                id="company"
                value="company"
                required
              />
              <span
                class="absolute bg-light size-[0.6rem] rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
              </span>
            </label>
            <label class="ml-2 text-light cursor-pointer text-md" for="company"
              >Company</label
            >
          </div>
          <div class="inline-flex items-center">
            <label
              class="relative flex items-center cursor-pointer"
              for="private"
            >
              <input
                v-model="form.who"
                type="radio"
                class="bg-background peer size-5 cursor-pointer appearance-none rounded-full border-2 border-background-darker hover:border-light transition-all"
                id="private"
                value="private"
                required
              />
              <span
                class="absolute bg-light size-[0.6rem] rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
              </span>
            </label>
            <label class="ml-2 text-light cursor-pointer text-md" for="private"
              >Private</label
            >
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <label
          class="text-md lg:text-xl font-bold italic mb-1 transition duration-300 ease"
          :class="{
            'text-red-700': !form.what && hasSubmitted,
          }"
          >What?</label
        >
        <div class="relative">
          <div
            class="max-w-full lg:w-1/3 bg-background text-light text-sm border-2 border-background-darker rounded-md px-3 py-2 cursor-pointer"
            @click="toggleDropdown"
          >
            {{ selectedOption || "What are you interested in?" }}
          </div>
          <div
            v-if="isDropdownOpen"
            class="absolute z-10 mt-1 bg-background rounded-md shadow-lg"
          >
            <ul class="max-w-full rounded-md">
              <li
                v-for="option in options"
                :key="option.value"
                class="hover:bg-primary hover:rounded-md text-light hover:text-background px-4 py-2 cursor-pointer mx-4 border-y-2 last:border-b-0 first:border-t-0 border-background-darker"
                @click="selectOption(option)"
              >
                {{ option.text }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <label
          class="text-md lg:text-xl font-bold italic mb-1 transition duration-300 ease"
          :class="{
            'text-red-700': !form.why && hasSubmitted,
          }"
          >Why?</label
        >
        <textarea
          class="w-full bg-background text-light text-sm border-2 border-background-darker rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-light hover:border-light shadow-sm focus:shadow whitespace-pre-line resize-none"
          type="text"
          :rows="textareaRows"
          v-model="form.why"
          placeholder="What would you like to contact me about?"
          @input="autoExpandRows"
          required
        ></textarea>
        <label class="text-xs lg:text-sm ms-auto">
          <span v-if="textareaRows !== 8"
            >This expands to more rows. Rows shown: {{ textareaRows }}</span
          >
          <span v-if="textareaRows === 8" class="text-red-700"
            >MAX<span class="text-light"> Rows, but theres a scrollbar</span>
          </span>
        </label>
      </div>

      <DynamicButton
        button_text="Next Step"
        :button_text_color="buttonTextColor"
        :button_border_color="buttonBorderColor"
        class="w-full lg:w-1/2 mt-auto ms-auto"
        type="submit"
        value="submit"
      />
    </form>
  </div>

  <!-- Third Modal for Name and Email -->
  <div
    v-if="isThirdModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur p-6"
    @click.self="closeThirdModal"
  >
    <form
      class="relative w-full lg:w-[50rem] lg:h-[40rem] max-h-[90%] bg-card p-10 flex flex-col justify-center items-center rounded-lg gap-4"
      @submit.prevent="handleThirdForm"
      novalidate
    >
      <div
        class="absolute top-[-20px] right-[-20px] bg-background text-light border-2 cursor-pointer border-light rounded-full p-2 size-11 flex items-center justify-center"
        @click="closeThirdModal"
      >
        <Icon name="material-symbols:close" class="text-3xl" />
      </div>
      <div
        class="absolute top-[-20px] left-[-20px] bg-background text-light border-2 cursor-pointer border-light rounded-full p-2 size-11 flex items-center justify-center"
        @click="goBackToSecondModal"
      >
        <Icon name="material-symbols:reply" class="text-3xl" />
      </div>
      <h2 class="text-2xl lg:text-4xl font-bold text-center mb-4">
        Enter Contact Details
      </h2>

      <div class="flex flex-col justify-center items-center my-auto">
        <div class="flex flex-col pb-6">
          <label
            class="text-md lg:text-xl font-bold italic mb-1 transition duration-300 ease"
            :class="{
              'text-red-700': !form.name && hasSubmitted,
            }"
            >Name</label
          >
          <input
            class="w-full bg-background text-light text-sm border-2 border-background-darker rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-light hover:border-light shadow-sm focus:shadow"
            type="text"
            v-model="form.name"
            placeholder="Name"
            size="30"
            required
          />
        </div>
        <div class="flex flex-col pb-6">
          <label
            class="text-md lg:text-xl font-bold italic mb-1 transition duration-300 ease"
            :class="{
              'text-red-700': (!form.email || !isEmailValid) && hasSubmitted,
            }"
            >Email</label
          >
          <input
            class="w-full bg-background text-light text-sm border-2 border-background-darker rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-light hover:border-light shadow-sm focus:shadow group-email invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700"
            type="email"
            v-model="form.email"
            placeholder="Email"
            pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
            size="30"
            required
          />
        </div>
      </div>

      <DynamicButton
        button_text="Send Info"
        :button_text_color="buttonTextColor"
        :button_border_color="buttonBorderColor"
        class="w-full lg:w-1/2 mt-auto ms-auto"
        type="submit"
        value="submit"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import DynamicButton from "./buttons/DynamicButton.vue";

const supabase = useSupabaseClient();

const route = useRoute();
const router = useRouter();

const isFirstModalOpen = ref(false);
const isSecondModalOpen = ref(false);
const isThirdModalOpen = ref(false);
const hasSubmitted = ref(false);
const textareaRows = ref(5);

const buttonTextColor = "#19191f";
const buttonBorderColor = "#773438";

const isDropdownOpen = ref(false);
const selectedOption = ref("");
const options = ref([
  { value: "job_offer", text: "Job offer" },
  { value: "ui_ux", text: "UI / UX" },
  { value: "posters", text: "Posters" },
  { value: "other", text: "Other" },
]);

const form = ref({
  who: "",
  what: "",
  why: "",
  name: "",
  email: "",
});

const checkHashAndOpenModal = () => {
  if (route.hash === "#contact" && !isFirstModalOpen.value) {
    isFirstModalOpen.value = true;
  } else if (route.hash !== "#contact" && isFirstModalOpen.value) {
    isFirstModalOpen.value = false;
    isSecondModalOpen.value = false;
    isThirdModalOpen.value = false;
  }
};

const removeHash = () => {
  router.replace({
    path: route.path,
    query: route.query,
    hash: '',
  });
};

watch(
  () => route.hash,
  () => {
    checkHashAndOpenModal();
  },
  { immediate: true }
);


const closeFirstModal = () => {
  isFirstModalOpen.value = false;
  removeHash();
};

const closeSecondModal = () => {
  isSecondModalOpen.value = false;
  removeHash();
};

const goBackToSecondModal = () => {
  isSecondModalOpen.value = true;
  isThirdModalOpen.value = false;
};

const closeThirdModal = () => {
  isThirdModalOpen.value = false;
  removeHash();
};

// No first form. Just easier to read this way
const handleFirstForm = () => {
  isFirstModalOpen.value = false;
  isSecondModalOpen.value = true;
};

const handleSecondForm = async () => {
  hasSubmitted.value = true;

  if (!form.value.who || !form.value.what || !form.value.why) {
    return;
  }
  isSecondModalOpen.value = false;
  isThirdModalOpen.value = true;

  hasSubmitted.value = false;
};

const handleThirdForm = async () => {
  hasSubmitted.value = true;

  if (!form.value.name || !form.value.email || !isEmailValid.value) {
    return;
  }

  const { data, error } = await supabase
    .from("inquiries")
    // @ts-ignore
    .insert({
      who: form.value.who,
      what: form.value.what,
      why: form.value.why,
      name: form.value.name,
      email: form.value.email,
    });
  if (error) {
    console.log(error);
    return;
  }
  if (data) {
    console.log(data);
  }

  isThirdModalOpen.value = false;
  removeHash();
  hasSubmitted.value = false;
};

const isEmailValid = computed(() => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(form.value.email);
});

const autoExpandRows = () => {
  const lineBreaks = (form.value.why.match(/\n/g) || []).length;
  textareaRows.value = Math.min(Math.max(5, lineBreaks + 1), 8);
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectOption = (option: { value: string; text: string }) => {
  selectedOption.value = option.text;
  isDropdownOpen.value = false;
  form.value.what = option.value;
};
</script>
