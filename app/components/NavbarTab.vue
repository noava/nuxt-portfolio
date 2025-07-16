<template>
  <nav
    class="fixed top-0 left-0 right-0 w-full max-w-[1600px] h-[80px] flex justify-between items-center p-8 z-50 mx-auto"
  >
    <RouterLink
      to="/"
      class="text-5xl font-black bg-navbarfooter/50 backdrop-blur rounded-full px-6 py-2 hover:tracking-widest hover:saturate-[300%]"
      >Noava</RouterLink
    >

    <div
      :class="[
        isMenuOpen ? 'block' : 'hidden',
        'absolute top-24 right-3 lg:right-0 bg-navbarfooter/50 backdrop-blur w-[15rem] lg:w-[23rem] p-4 shadow-lg rounded-lg text-right text-3xl lg:text-5xl space-y-2 lg:space-y-4',
      ]"
      @click="closeMenu"
    >
      <RouterLink
        class="block p-2 font-black hover:tracking-widest hover:saturate-[300%]"
        :to="{ path: '/', hash: '#projects' }"
        >Projects
        <Icon
          class="align-middle text-3xl lg:text-5xl"
          name="material-symbols:bento-outline"
        />
      </RouterLink>
      <!--<RouterLink
        class="block p-2 font-black hover:tracking-widest hover:saturate-[300%]"
        to="/brandguide"
        >Brand Guide
        <span class="material-symbols-outlined text-3xl lg:text-5xl align-middle">
          brand_family
        </span>
      </RouterLink>-->
      <RouterLink
        class="block p-2 font-black hover:tracking-widest hover:saturate-[300%]"
        to="/3d-scene"
        >3d Scene
        <Icon
          class="align-middle text-3xl lg:text-5xl"
          name="material-symbols:3d-rotation-rounded"
        />
      </RouterLink>
      <RouterLink
        class="block p-2 font-black hover:tracking-widest hover:saturate-[300%]"
        to="#contact"
        >Contact
        <Icon
          class="align-middle text-3xl lg:text-5xl"
          name="material-symbols:deskphone-outline-rounded"
        />
      </RouterLink>
      <div>
        <span class="font-black text-lg lg:text-xl"
          >NORWAY, {{ NORdateHours }}</span
        >
        <span
          :class="[
            'transition-opacity duration-500 ease-in-out',
            { 'opacity-0': !showColon },
          ]"
          class="font-black text-2xl px-[0.1rem]"
          >:</span
        >
        <span class="font-black text-lg lg:text-xl">{{ NORdateMins }}</span>

        <Icon
          v-if="weatherIcon"
          class="text-3xl lg:text-5xl align-middle ms-4 me-2"
          :name="`material-symbols:${weatherIcon}-outline`"
        />
      </div>
    </div>
    <div
      class="cursor-pointer bg-navbarfooter/50 backdrop-blur rounded-full p-2 hover:saturate-[300%]"
      @click="toggleMenu"
    >
      <Icon
        v-if="isMenuOpen"
        name="material-symbols:close"
        class="text-5xl align-middle"
      />
      <Icon v-else name="material-symbols:menu" class="text-5xl align-middle" />
    </div>
  </nav>
  <div class="fixed inset-0 z-40" v-if="isMenuOpen" @click="closeMenu"></div>
</template>

<script setup>
const isMenuOpen = ref(false);
const NORdateHours = ref("");
const NORdateMins = ref("");
const showColon = ref(true);
const weatherIcon = ref("");

// MET API to Google Material Icons
const symbolCodeToIcon = {
  clearsky: "wb-sunny",
  clearsky_day: "wb-sunny",
  clearsky_night: "bedtime",
  partlycloudy: "cloud",
  partlycloudy_day: "partly-cloudy-day",
  partlycloudy_night: "partly-cloudy-night",
  cloudy: "filter-drama",
  rain: "rainy",
  lightrain: "rainy-light",
  heavyrain: "rainy-heavy",
  snow: "weather-snowy",
  lightsnow: "weather-snowy",
  heavysnow: "weather-mix",
  thunderstorm: "thunderstorm",
  fair_night: "bedtime",
  fair_day: "wb-sunny",
  fog: "foggy",
};

onMounted(() => {
  getNorwegianTime();
  getWeatherData();
  setInterval(getNorwegianTime, 1000);

  setInterval(toggleColon, 500);
});

const toggleColon = () => {
  showColon.value = !showColon.value;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const getNorwegianTime = () => {
  const NORdate = ref("");

  NORdate.value = new Intl.DateTimeFormat("no-NO", {
    timeZone: "Europe/Oslo",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());

  // Split into hours and minutes
  const [hh, mm] = NORdate.value.split(":");
  NORdateHours.value = hh;
  NORdateMins.value = mm;
};

const getWeatherData = async () => {
  try {
    const response = await fetch(
      "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=58.34&lon=8.59",
      {
        headers: {
          "User-Agent": "NoavaPortfolio",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const symbolCode =
      data.properties.timeseries[0].data.next_1_hours.summary.symbol_code;

    weatherIcon.value = symbolCodeToIcon[symbolCode] || "error";
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};
</script>
