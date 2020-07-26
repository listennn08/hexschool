<template lang="pug">
  .container
    message
    h4
      font-awesome-icon.titleIcon(:icon="['far', 'clipboard']")
      | &nbsp; 購物清單
    ul.list(:class="{hide: !isCollapse}")
      li.list__item(
        v-for="prod in order.products"
        :key="prod.product.id"
      )
        .col.pic(:style="{backgroundImage: `url(${prod.product.imageUrl[0]})`}")
        .col {{ prod.product.title }}
        .col x{{ prod.quantity }}
        .col {{ prod.product.price | cash }}
    .collapse
      .horizon(v-if="!isCollapse") ⋯
      button.collapse__btn(
            :class="isCollapse? 'up' : 'down'"
            @click="toggleCollapse()"
          )
            font-awesome-icon(
              :icon="['fas', isCollapse?'angle-double-up' : 'angle-double-down']"
            )
    h4
      font-awesome-icon.titleIcon(:icon="['fas', 'info-circle']")
      | &nbsp; 訂單資訊
    table.info(v-if="order.user")
      tr
        td 姓名
        td {{ order.user.name }}
      tr
        td 電話
        td {{ order.user.tel }}
      tr
        td 信箱
        td {{ order.user.email }}
      tr
        td 地址
        td {{ order.user.address }}
      tr
        td 付款方式
        td {{ order.payment }}
      tr
        td 付款狀態
        td(:class="order.paid ? 'paid': 'unpaid'") {{ order.paid ? '已付款' : '未付款' }}
    button.btn(@click="doPay(order.id)")
      .txt(:class="{hide: loading}") 確認付款
      font-awesome-icon.loading.fa-1x.fa-spin(
        :icon="['fa', 'spinner']"
        :class="{show: loading}"
      )

</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { getOrder, payOrder } from '../apis/utils';

export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  created() {
    const loader = this.$loading.show();
    const { id } = this.$route.params;
    getOrder(id)
      .then((resp) => {
        this.setOrder(resp.data.data);
        loader.hide();
      });
  },
  computed: {
    ...mapGetters(['order', 'loading']),
  },
  methods: {
    ...mapActions(['setMsg', 'setOrder', 'toggleLoading']),
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    doPay(id) {
      this.toggleLoading();
      payOrder(id)
        .then((resp) => {
          this.setOrder(resp.data.data);
          this.toggleLoading();
          this.setMsg({
            msg: '付款完成！',
            type: true,
          });
        })
        .catch(() => {
          this.toggleLoading();
          this.setMsg({
            msg: '付款失敗！',
            type: false,
          });
        });
    },
  },
};
</script>
<style lang="sass" scoped>
@import url(https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;700;900&family=Raleway:wght@700;900&family=Open+Sans:wght@400;600&display=swap)
$navyblue: #333D51
$hnavyblue: #242b39
$goldyellow: #D3AC2B
$darkgray: #CBD0D8
$darkgrayn: #46505e
$lightgray: #F4F3EA
@keyframes collapseAnimation
  0%
    transform: translateY(0)
  50%
    transform: translateY(10%)
  100%
    transform: translateY(20%)
*
  margin: 0
  padding: 0
  list-style: none
.container
  width: 40%
  margin: 2% 30%
  text-align: center
  h4
    text-align: left
    width: 80%
    margin: 1% 10%
    border-bottom: 2px solid $navyblue
.list
  display: flex
  flex-direction: column
  width: 80%
  margin: 1% 10%
  &.hide
    overflow-y: hidden

    max-height: 150px
.list__item
  display: flex
  align-items: center
  justify-content: center
  margin: 1% 0
  padding: 1%
  border-bottom: 1px dotted #888
.collapse
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
.collapse__btn
  cursor: pointer
  padding: 1% 2%
  border: 0
  background: transparent
  outline: none
  transform: translateY(0)
  &.down
    animation: collapseAnimation 1s infinite linear forwards
  &.up
    animation: collapseAnimation 1s infinite linear reverse forwards
  &:hover
    animation-play-state: paused
.horizon
  font-weight: 700
  writing-mode: vertical-rl
.col
  width: 18%
  padding: 1%
  &.pic
    height: 100px
    background-position: left
    background-repeat: no-repeat
    background-size: cover
.info
  width: 50%
  border-top: 1px solid $navyblue
  border-collapse: collapse
  margin: 0 25%
  td
    border: 1px solid $navyblue
    padding: 2%
    &.paid
      color: green
    &.unpaid
      color: red
.btn
  margin-top: 1%
  align-self: center
  width: 16%
  padding: 1% 2%
  font-family: 'Noto Sans TC', sans serif
  border: 1px solid $darkgray
  border-radius: 5px
  background: $lightgray
  color: $navyblue
  transition: .2s
  outline: none
  &:hover
    background: $darkgrayn
    color: $lightgray
  .txt.hide
    display: none
  .loading
    font-size: 18px
    width: 100%
    text-align: center
    display: none
    &.show
      display: block
</style>
