# Niklas Vezina's Portfolio

Welcome to my personal portfolio! This project showcases some of my work as a developer and designer. It provides an overview of my skills, projects, and experience in web and app development. This is moved from the old portfolio to a new one built with Nuxt.

**Portfolio Link**: [https://noava.dev](https://noava.dev/)

## Features

- **Project Showcases**: Highlights my various projects, including frontend, backend, and full-stack applications.
- **Dynamic Image Viewer**: Clickable images open in a fullscreen slideshow with navigation, using Pinia for state management.
- **Interactive UI Elements**: Designed to be user-friendly with smooth transitions and interactivity. Also responsive on phone screen.
- **Storing Images for Image Viewer**: The image_urls are stored in a Supabase table which i get from the storage bucket. Thought about getting all images from the storage bucket, but this way i can control the order and choose which ones i want shown. I then cache the images to save on network requests.
  **Navbar Features Time & Weather**: These are shown in the navbar. The time is dynamically displayed using `Intl.DateTimeFormat`, while the weather icon name is fetched from the MET API, which then finds an equivialent icon from google icons using a predefined list. This allows users to see up-to-date weather conditions for Grimstad.
- **Contact Form**: The form is shown inside a modal that captures input fields for name, email, and user details like who, what, and why. This is spread between three modals to make it easier to navigate.
- **Closing Modals with Hashes**: When the contact form modal is opened, the URL changes to `#contact`. Allowing it also to access it from `#contact` hash on any View. On closing, the hash is removed from the URL, and the page remains in the same scroll position.
- **Footer Animations**: The footer features a large 'NOAVA' text with animated hover effects. Hovering over each letter triggers nice animations that bring the text to life. I used GSAP for the swipe up footer animation.

## Technologies Used

- ![Nuxt.js](https://img.shields.io/badge/nuxt.js-234.svg?style=for-the-badge&logo=nuxtdotjs) A powerful framework for building Vue.js applications, providing server-side rendering and static site generation.
- ![Vue.js](https://img.shields.io/badge/vue.js-234.svg?style=for-the-badge&logo=vuedotjs) A modern JavaScript framework for building user interfaces.
- ![Pinia](https://img.shields.io/badge/pinia-234.svg?style=for-the-badge&logo=vuedotjs&logoColor=yellow) State management for Vue.js, used to manage global states like the image viewer.
- ![TailwindCSS](https://img.shields.io/badge/tailwind_css-234.svg?style=for-the-badge&logo=tailwindcss) Utility-first CSS framework for learning mainstream UI development.
- ![TypeScript](https://img.shields.io/badge/typescript-234.svg?style=for-the-badge&logo=typescript) For type-safe development and maintaining code quality.
- ![Supabase](https://img.shields.io/badge/supabase-234.svg?style=for-the-badge&logo=supabase) For storing images and project info. This way I can keep text dynamic, but it's mostly used for learning Supabase.
- ![GSAP](https://img.shields.io/badge/gsap-234.svg?style=for-the-badge&logo=greensock) For smooth transitions and animations.
- ![Bun](https://img.shields.io/badge/bun-234.svg?style=for-the-badge&logo=bun) A fast JavaScript runtime and bundler used to optimize development speed and improve build performance.
- ![Netlify](https://img.shields.io/badge/netlify-234.svg?style=for-the-badge&logo=netlify) For deploying and hosting this web application on the cloud with continuous integration and delivery.
- ![Github](https://img.shields.io/badge/github-234.svg?style=for-the-badge&logo=github) And ofc github for storing the source code.

## Project Structure

- `src/` - Contains all the source code for the portfolio.
  - `assets/` - Some Static files used in the portfolio, most images are on supabase.
  - `components/` - Vue components such as the image viewer modal and project cards.
    - `buttons/` - Button components.
    - `projects/` - Components for each project.
  - `stores/` - Pinia store definitions for managing the app's state.
  - `views/` - Vue views for the portfolio.
- `App.vue` - The root component of the application.

## Some components i've made and what they do

- `DynamicButton.vue` - A button that you insert parameters such as text, color, and link. This data is passed to the component as props from forexample the db.
- `projects/Basic.vue` - An example project component that utilizes dynamic image modals. Other projects may be more customized.
- `BentoRectangles.vue` - A component that displays a grid of rectangles with design and animation.
- `ImageViewer.vue` - A modal component that displays images in a fullscreen slideshow. It uses Pinia to manage the state of the currently viewed image and provides navigation controls.

## Setup and Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/noava/my-portfolio.git
   ```

2. Navigate into the project directory:

   ```sh
   cd my-portfolio
   ```

3. Install the dependencies:

   ```sh
   npm install     or      bun install
   ```

4. Run the development server:

   ```sh
   npm run dev     or      bun dev
   ```

5. Open your browser and go to:

   ```sh
   http://localhost:5173
   ```

## Contact

- **Email**: [noavadev@gmail.com](mailto:noavadev@gmail.com)
- **LinkedIn**: [linkedin.com/in/niklas-vezina](https://linkedin.com/in/niklas-vezina)
