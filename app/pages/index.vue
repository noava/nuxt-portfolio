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
        <h2 class="text-[5vw] lg:text-4xl">
          Includes graphic design and web design
        </h2>
      </div>
      <!-- Loop through projects and dynamically assign components -->
      <!-- Id is sorted by how important the projects are -->
      <template v-for="project in projects" :key="project.id">
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

const projects = ref<{ id: number; title: string }[]>([]);

onMounted(async () => {
  await getAllProjects();
});

// Gets all projects with their IDs
const getAllProjects = async () => {
  const { data, error } = await supabase
    .from("projects")
    .select("id, title")
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
