<template lang="pug">
  .container.is-fluid.is-centered
    .container
      .columns
        h2.logo.column.is-full.is-size-1.has-text-weight-bold GAGU
          //- small.is-size-6 （가구）
          //- | 傢俱
      .columns.is-centered
        .login.column.is-two-fifths.box
          h3.is-size-4.has-text-left.px-5 登入
          .card-content
            .content
              .field
                .control.has-icons-left
                  input#email.input(type="email" required placeholder="信箱")
                  span.icon.is-left: font-awesome-icon(:icon="['fas', 'envelope']")
              .field.has-addons
                .control.has-icons-left.has-icon-right.is-expanded
                  input#pwd.input(
                    :type="isPWDShow"
                    @keyup.enter="loginFn"
                    placeholder="密碼"
                    required
                  )
                  span.icon.is-left: font-awesome-icon(:icon="['fas', 'lock']")
                .control
                  button.is-right.button(@click="togglePWDShow")
                    font-awesome-icon(:icon="['fas',  isPWDShowIcon]")
              .control
                button.button.is-cus-primary(
                  type="button"
                  @click="loginFn"
                  :class="{'is-loading': loading}"
                ) 登入
    .img
      img(src="../assets/login.jpg")
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import cookies from '../cookies';
import { Login } from '../apis/utils';

export default {
  data() {
    return {
      pwdShow: false,
    };
  },
  computed: {
    ...mapGetters(['loading']),
    isPWDShow() {
      return this.pwdShow ? 'text' : 'password';
    },
    isPWDShowIcon() {
      return this.pwdShow ? 'eye-slash' : 'eye';
    },
  },
  methods: {
    ...mapActions(['toggleLoading', 'setLoginInfo', 'setMsg']),
    loginFn() {
      this.toggleLoading(true);
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#pwd').value;
      if (!email) {
        document.querySelector('#email').reportValidity();
        this.toggleLoading(false);
        return;
      }
      if (!password) {
        document.querySelector('#pwd').reportValidity();
        this.toggleLoading(false);
        return;
      }
      Login({ email, password })
        .then((resp) => {
          cookies.setItem('uuid', resp.data.uuid, new Date(resp.data.expire * 1000), '/');
          cookies.setItem('token', resp.data.token, new Date(resp.data.expire * 1000), '/');
          this.setLoginInfo({
            uuid: cookies.getItem('uuid'),
            token: cookies.getItem('token'),
          });
          this.setMsg({ msg: '登入成功！', type: true });
          this.toggleLoading(false);
          setTimeout(() => {
            this.$router.push('/admin').catch(() => {});
          }, 1000);
        })
        .catch(() => {
          this.setMsg({ msg: '登入失敗！', type: false });
        });
    },
    togglePWDShow() {
      this.pwdShow = !this.pwdShow;
    },
  },
};
</script>
<style lang="sass" scoped>
@import url(https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;500;700;900&family=Raleway:wght@500;700&display=swap)
$navyblue: #333D51
$hnavyblue: #242b39
$goldyellow: #D3AC2B
$darkgray: #CBD0D8
$darkgrayn: #46505e
$lightgray: #F4F3EA

.container
  height: 90vh
.login
  box-shadow: 2px 2px 5px $navyblue
.logo
  font-family: 'Raleway', sans-serif
.img
  z-index: -999
  width: 50%
  position: absolute
  right: 0
  bottom: 0
  img
    width: 100%
    display: block
    position: relative
  &::before
    content: ''
    width: 100%
    height: 100%
    right: 0
    bottom: 0
    position: absolute
    background: linear-gradient(45deg, #fff, transparent)
    z-index: 900
</style>
