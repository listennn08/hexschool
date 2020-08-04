<template lang="pug">
  #app
    router-view
</template>
<script>
import { mapActions } from 'vuex';
import { checkToken } from './apis/utils';
import cookies from './cookies';

export default {
  created() {
    checkToken()
      .then((resp) => {
        if (resp.data.success) {
          this.setLoginInfo({
            uuid: cookies.getItem('uuid') || '',
            token: cookies.getItem('token') || '',
          });
        }
      })
      .catch(() => {});
  },
  methods: {
    ...mapActions(['setLoginInfo']),
  },
};
</script>
<style lang="sass">
@import '~bulma/bulma.sass'
@import './assets/main'

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  height: 100vh

</style>
