<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <pay-page></pay-page>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import payPage from './pay_page.vue';

export default {
    name: 'Home',
    components: {
        // HelloWorld,
        payPage,
    },
};
</script>
