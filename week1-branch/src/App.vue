<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <navbar></navbar>
    <div class="main-view">
      <router-view/>
    </div>
    <footer>
      <footer-cus></footer-cus>
    </footer>
  </div>
</template>
<script>
import navbar from './components/navbar.vue';
import footerCus from './components/footer.vue';
export default {
  components: {
    navbar,
    footerCus,
  }
}
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
#app {
  height: 100vh;
  overflow-x: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  width: 100%;
  height: 6%;
  position: sticky;
}
.main-view {
  height: 84%;
}
#footer {
  width: 100%;
  margin-top: 2%;
  position: relative;
  bottom: 0;
  left: 0;
}
</style>
