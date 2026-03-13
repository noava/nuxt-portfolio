<template>
  <main>
    <BentoRectangles />
    <div class="flex flex-row justify-around [&>*]:text-8xl my-10">
      <Icon name="material-symbols:keyboard-arrow-down" />
      <Icon name="material-symbols:keyboard-arrow-down" />
      <Icon name="material-symbols:keyboard-arrow-down" />
    </div>
    <section id="projects">
      <div class="flex flex-col items-center mb-12 lg:mb-12">
        <h1
          class="text-primary text-[11vw] lg:text-[9xl] tracking-[0.5em] -mr-[0.5em] lg:mb-10"
        >
          Projects
        </h1>
        <div
          class="w-full px-2 flex flex-col lg:flex-row justify-between items-center max-lg:gap-8"
        >
          <h2 class="text-[5vw] lg:text-4xl">
            Includes graphic design and web design
          </h2>
          <div class="w-full max-w-sm">
            <Dropdown
              v-model="selectedCategory"
              :options="categoryOptions"
              placeholder="Filter by category"
            />
          </div>
        </div>
      </div>
      <!-- Loop through projects and dynamically assign components -->
      <!-- Id is sorted by how important the projects are -->
      <template v-for="project in filteredProjects" :key="project.id">
        <hr class="m-0 border-primary border-t-8 border-dashed" />
        <component :is="getComponentByTitle(project.title)" :id="project.id" />
      </template>
    </section>
  </main>
</template>

<script setup lang="ts">
import BasicProject from "../components/projects/Basic.vue";
import CrewBadgeProject from "../components/projects/CrewBadge.vue";

const supabase = useSupabaseClient();
const route = useRoute();
const router = useRouter();

const projects = ref<{ id: number; title: string; category: string | null }[]>(
  [],
);
const selectedCategory = ref<string>("all");

const categoryOptions = [
  { id: "all", name: "All Categories" },
  { id: "graphic-design", name: "Graphic Design" },
  { id: "web-design", name: "Web Design" },
  { id: "game-dev", name: "Game Dev" },
  { id: "app-dev", name: "App Dev" },
  { id: "other", name: "Other" },
];

const validCategoryIds = new Set(categoryOptions.map((option) => option.id));

const syncCategoryFromQuery = async (
  queryValue: string | string[] | undefined,
) => {
  const rawValue = Array.isArray(queryValue) ? queryValue[0] : queryValue;
  const normalizedValue = (rawValue ?? "").trim();

  if (validCategoryIds.has(normalizedValue)) {
    selectedCategory.value = normalizedValue;
    return;
  }

  selectedCategory.value = "all";

  if (normalizedValue !== "") {
    const nextQuery = { ...route.query };
    delete nextQuery.projects;
    await router.replace({ query: nextQuery });
  }
};

onMounted(async () => {
  await syncCategoryFromQuery(
    route.query.projects as string | string[] | undefined,
  );
  await getAllProjects();
});

watch(
  () => route.query.projects,
  async (newProjectsQuery) => {
    await syncCategoryFromQuery(
      newProjectsQuery as string | string[] | undefined,
    );
  },
);

watch(selectedCategory, async (newCategory) => {
  const nextQuery = { ...route.query };

  if (newCategory === "all") {
    delete nextQuery.projects;
  } else {
    nextQuery.projects = newCategory;
  }

  const currentProjectsQuery = Array.isArray(route.query.projects)
    ? route.query.projects[0]
    : route.query.projects;

  if (
    (newCategory === "all" && currentProjectsQuery === undefined) ||
    currentProjectsQuery === nextQuery.projects
  ) {
    return;
  }

  await router.replace({ query: nextQuery });
});

const filteredProjects = computed(() => {
  if (selectedCategory.value === "all") {
    return projects.value;
  }

  return projects.value.filter(
    (project) => project.category === selectedCategory.value,
  );
});

// Gets all projects with their IDs
const getAllProjects = async () => {
  const { data, error } = await supabase
    .from("projects")
    .select("id, title, category")
    .order("id", { ascending: true });
  if (error) {
    console.error("Error fetching projects:", error);
    return;
  }
  if (data) {
    projects.value = data;
  }
};

// Dynamically assign components. Add cases for each custom component
const getComponentByTitle = (title: string) => {
  switch (title) {
    case "CREW Badge":
      return CrewBadgeProject; // Custom component for CREW Badge

    default:
      return BasicProject; // Default to BasicProject
  }
};
</script>
