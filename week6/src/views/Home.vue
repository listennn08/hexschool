<template lang="pug">
  #home
    navbar(:class="{sticky}")
    router-view
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import navbar from '../components/Navbar.vue';

export default {
  name: 'Home',
  components: {
    navbar,
  },
  created() {
    window.addEventListener('scroll', this.debounce(this.handleScroll));
  },
  computed: {
    ...mapGetters(['sticky']),
  },
  methods: {
    ...mapActions(['toggleSticky']),
    handleScroll() {
      if (window.scrollY > 200) {
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
.navbar
  width: 100%
  z-index: 1
  transform: translateY(0%)
  transition: transform .5s
  &.sticky
    position: fixed
    top: -1%
    transform: translateY(10%)
</style>
