<template>
  <div class="min-h-screen">
    <header>
      <NavbarTab />
    </header>

    <main class="pt-20 max-w-[1600px] m-auto">
      <slot />
    </main>

    <footer>
      <FooterItem />
    </footer>

    <ImageViewer />
    <ContactForm />
  </div>
</template>
