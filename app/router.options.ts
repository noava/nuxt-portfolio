import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (to.path === from.path && to.hash === from.hash) {
      return false
    }

    if (to.hash === '#projects') {
      return {
        el: '#projects',
        behavior: 'smooth',
        top: 70 // Adjust this offset if you have a fixed header
      }
    }

    if (to.hash === '#contact' || from.hash === '#contact') {
      return { savedPosition }
    }
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }  
  },
};
