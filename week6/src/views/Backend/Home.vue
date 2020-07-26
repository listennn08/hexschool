<template lang="pug">
  div
    navbar
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
