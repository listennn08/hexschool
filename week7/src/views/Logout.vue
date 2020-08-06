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
    ...mapGetters({
      token: 'login/token',
    }),
  },
  methods: {
    ...mapActions({
      clearLoginInfo: 'login/clearLoginInfo',
    }),
    doLogout() {
      if (this.token) {
        Logout().then(() => {
          this.clearLoginInfo();
          cookies.removeItem('token');
          this.$router.push('/');
        });
      }
    },
  },
};
</script>
