<template lang="pug">
  div
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { Logout } from '../apis/utils';
import cookies from '../cookies';

export default {
  created() {
    this.doLogout();
  },
  computed: {
    ...mapGetters(['loginInfo']),
  },
  methods: {
    ...mapActions(['clearLoginInfo']),
    doLogout() {
      if (this.loginInfo.token) {
        Logout().then(() => {
          this.clearLoginInfo();
          cookies.removeItem('token');
          cookies.removeItem('uuid');
          console.log(cookies.getItem('token'), cookies.getItem('uuid'));
          this.$router.push('/');
        });
      }
    },
  },
};
</script>
