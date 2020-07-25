<template lang="pug">
  #navbar.navbar
    .container
      .navbar-header
        h2: router-link(to="/admin") GAGU
          small manage
      .navbar-context
        .navbar-list
          router-link(to="/admin/products") 商品管理
          router-link(to="/admin/coupons") 優惠管理
          router-link(to="/admin/orders") 訂單管理
          router-link(to="/admin/files") 圖片管理
      .navbar-right
        .navbar-list
          router-link(to="/") 去前台
          | &nbsp;|&nbsp;
          router-link(v-if="!loginInfo.isLogin" to="/login") 登入
          router-link(v-else to="/logout") 登出
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['loginInfo']),
  },
};
</script>
<style lang="sass" scoped>

$navyblue: #333D51
$hnavyblue: #242b39
$goldyellow: #D3AC2B
$darkgray: #CBD0D8
$lightgray: #F4F3EA

@import url(https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;500;700;900&family=Raleway:wght@500;700&display=swap)
*
  margin: 0
  padding: 0
  list-style: none
  font-family: 'Raleway', 'Noto Sans TC', sans-serif

.navbar
  width: 100%
  background-color: $navyblue
  color: $lightgray
  .container
    width: 100%
    height: 50px
    display: flex
    margin: auto
    .navbar-header
      width: 18%
      font-size: 26px
      margin-left: 2%
      text-align: left
      vertical-align: middle
      a
        color: $lightgray
        text-decoration: none
      small
        margin-left: 1%
        font-size: 16px
    .navbar-context, .navbar-right
      display: flex
      margin: auto
      .navbar-list
        font-weight: 700
        text-transform: uppercase
        transition: .5s
        a
          text-decoration: none
          color: $lightgray
          position: relative
          &::after
            content: ''
            position: absolute
            height: 0
            bottom: 0
            border-bottom: 1px solid $lightgray
            transition: .3s
          &:hover
            color: $lightgray

    .navbar-context
      width: 60%
      justify-content: center
      .navbar-list
        width: 100%
        a
          padding: 0 2%
          &::after
            left: 18%
            right: 82%
          &:hover::after
            right: 18%
    .navbar-right
      width: 18%
      margin-right: 2%
      justify-content: flex-end
      .navbar-list
        // width: 30%
        // justify-content: flex-end
        a
          // padding: 0 5%
          &::after
            left: 0%
            right: 100%
          &:hover::after
            right: 0%
</style>
