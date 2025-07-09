export default {
  scrollBehavior(to, from, savedPosition) {
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
