<template>
    <div id="app">
        <message />
        <router-view />
    </div>
</template>
<script>
import message from './components/message-modal.vue';

export default {
    components: {
        message,
    },
};
</script>
<style lang="scss">
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    body {
        overflow-x: hidden;
    }
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

</style>
