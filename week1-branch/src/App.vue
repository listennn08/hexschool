<template>
  <div id="app">
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
body {
  height: 100%;
}
#app {
  height: 100%;
  overflow-x: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  width: 100%;
  position: sticky;
}
.main-view {
  margin-top: 1%;
  min-height: 98%;
}
#footer {
  width: 100%;
  margin-top: 1%;
}
</style>
