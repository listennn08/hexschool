<template>
    <div id="app">
        <navbar :class="{sticky}"></navbar>
        <message></message>
        <router-view/>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import navbar from './components/navbar.vue';

export default {
    components: {
        navbar,
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
            if (window.scrollY > 200) {
                this.toggleSticky(true);
            } else {
                this.toggleSticky(false);
            }
        },
    },
};
</script>
<style lang="scss" scope>
* {
    margin: 0;
    padding: 0;
    list-style: none;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
.navbar {
    width: 100%;
    z-index: 1;
    transform: translateY(0%);
    transition: transform .5s;
    &.sticky {
        position: fixed;
        top: -1%;
        transform: translateY(10%);
    }
}
</style>
