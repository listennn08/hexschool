<template lang="pug">
    #app
        navbar
        router-view
</template>
<script>
import navbar from './components/Navbar.vue';

export default {
    components: {
        navbar,
    },
};
</script>
<style lang="sass">
*
    margin: 0
    padding: 0
    list-style: none
#app
    font-family: Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50
</style>
