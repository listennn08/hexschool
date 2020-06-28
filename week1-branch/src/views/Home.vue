<template>
  <div class="home">
    <HomeComponent/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeComponent from '@/components/HomeComponent.vue'

export default {
  name: 'Home',
  components: {
    HomeComponent
  }
}
</script>
<style lang="sass" scoped>
  *
    margin: 0
    padding: 0
    list-style: none
</style>
