<template>
  <div
    class="min-h-screen bg-background text-light font-saira leading-relaxed antialiased"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const topLineColor = "#db8c74";
const underLineColor = "#cfa152";

gsap.registerPlugin(ScrollTrigger);

onMounted(async () => {
  if (!process.client) return;

  await nextTick();

  gsap.set(".footer-container", { y: "50vh" });

  const uncover = gsap.timeline({ paused: true });
  uncover.to(".footer-container", { y: 0, ease: "none" });

  ScrollTrigger.create({
    trigger: "main",
    start: "bottom bottom",
    end: "+=75%",
    animation: uncover,
    scrub: true,
  });

  // Cursor Line
  const isMobile = window.innerWidth <= 768;
  const pointer = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };

  function updatePointer(event) {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  }

  function createLine(leader) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

    const get = gsap.getProperty(line);
    const set = gsap.quickSetter(line, "attr");

    const genModifier = (prop) => {
      const pos2 = `${prop}2`;
      return () => {
        const linePos = get(prop);
        const leaderPos = leader(prop);
        const linePosNext = linePos + (leaderPos - linePos) * 0.7;
        set({ [pos2]: leaderPos - linePosNext });
        return linePosNext;
      };
    };

    gsap.set(line, pointer);

    gsap.to(line, {
      x: "+=1",
      y: "+=1",
      repeat: -1,
      ease: "linear",
      modifiers: {
        x: genModifier("x"),
        y: genModifier("y"),
      },
    });

    return line;
  }

  function createTrail(color, length = 10) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("mouse-dot");

    let leader = (prop) => (prop === "x" ? pointer.x : pointer.y);

    for (let i = 0; i < length; i++) {
      const line = createLine(leader);
      line.style.stroke = color;
      svg.appendChild(line);
      leader = gsap.getProperty(line);
    }

    document.body.appendChild(svg);
  }

  if (!isMobile) {
    window.addEventListener("pointerdown", updatePointer);
    window.addEventListener("pointermove", updatePointer);

    createTrail(underLineColor, 20);
    createTrail(topLineColor, 10);
  }

  // Spark On Click Animation
  const createBurst = (center) => {
    for (let i = 0; i < 8; i++) {
      const randomAngle = 45 * i + (Math.random() * 20 - 10);
      createSpark(center, randomAngle);
    }
  };

  const createSpark = (center, angle) => {
    const div = document.createElement("div");
    div.classList.add("spark");
    div.style.left = `${center.x - 20}px`;
    div.style.top = `${center.y - 20}px`;
    document.body.appendChild(div);

    const endX = center.x + Math.cos(angle * (Math.PI / 180)) * 50;
    const endY = center.y + Math.sin(angle * (Math.PI / 180)) * 50;

    gsap.to(div, {
      x: endX - center.x,
      y: endY - center.y,
      scale: 0,
      duration: 0.5,
      ease: "power1.out",
      onComplete: () => div.remove(),
    });
  };

  document.body.addEventListener("pointerdown", (e) => {
    const center = { x: e.pageX, y: e.pageY };
    createBurst(center);
  });
});
</script>

<style>
.mouse-dot {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  pointer-events: none;
  z-index: 9999;

  line {
    stroke-width: 20;
    stroke-linecap: round;
  }
}

.spark {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-accent);
  backdrop-filter: invert(1);
  pointer-events: none;
  z-index: 9999;
}
</style>
