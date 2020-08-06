<template lang="pug">
  .home
    Navbar
    .view
      router-view
    Footer
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from 'vuex';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Navbar,
    Footer,
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  computed: {
    ...mapGetters(['sticky']),
  },
  methods: {
    ...mapActions(['toggleSticky']),
    handleScroll() {
      if (window.scrollY > 180) {
        this.toggleSticky(true);
      } else {
        this.toggleSticky(false);
      }
    },
    debounce(func, delay = 250) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
      };
    },
  },
};
</script>
<style lang="sass" scoped>
@import url(https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;900&family=Raleway:wght@500;700&display=swap)
*
  font-family: 'Noto Sans TC', sans serif
.home
  height: 100%
.view
  min-height: 90%
</style>
