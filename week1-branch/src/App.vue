<template>
  <div id="app">
    <carrousel></carrousel>
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
import carrousel from './components/carrousel.vue';
export default {
  components: {
    navbar,
    footerCus,
    carrousel,
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll () {
      if (window.scrollY > 450) {
        if(!document.getElementById('navbar').classList.contains('sticky')) {
          document.getElementById('navbar').classList.toggle('sticky');
        }
      } else {
        document.getElementById('navbar').classList.remove('sticky');
      }
    }
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
  position: relative;
}

.navbar {
  width: 100%;
  top: 20%;
  z-index: 1;
}
.navbar.sticky  {
  position: fixed;
  top: 0;
}
.main-view {
  margin-top: 1%;
  min-height: 95%;
  max-height: 95%;
}
#footer {
  width: 100%;
  margin-top: 1%;

}
</style>
