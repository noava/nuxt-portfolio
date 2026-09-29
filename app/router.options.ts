import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (to.path === from.path && to.hash === from.hash) {
      return false
    }

    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 70
      }
    }

    if (to.hash === '#contact' || from.hash === '#contact') {
      return savedPosition || false
    }
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }  
  },
};
