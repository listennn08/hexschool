<template lang="pug">
  div
    navbar
    section.hero.is-fullheight
      router-view
</template>
<script>
import navbar from '../../components/backend/Navbar.vue';

export default {
  components: {
    navbar,
  },
};
</script>
<style lang="sass" scoped>
</style>
