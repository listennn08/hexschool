<template lang="pug">
  #pay-page
    message
    .container
      h4
        font-awesome-icon.titleIcon(:icon="['far', 'clipboard']")
        | &nbsp; 購物清單
      .buy-item-preview
        .preview-content(
          :class="{show: isCollapse}"
        )
          .buy-item(v-for="( item, index ) in products")
            div.pic(:style="{backgroundImage: `url(${item.product.imageUrl[0]})`}")
            div {{ item.product.title | hideText }}
            div x{{ item.quantity }}
            div {{ getItemTotal(index) | cash }}
        .buy-item(v-if="products.length > 4")
          button.collapse(
            :class="isCollapse? 'up' : 'down'"
            @click="toggleCollapse()"
          )
            font-awesome-icon(
              :icon="['fas', isCollapse?'angle-double-up':'angle-double-down']"
            )
        .total 總額
          span {{ countAll | cash }}
      h4
        font-awesome-icon.titleIcon(:icon="['fas', 'info-circle']")
        | &nbsp; 訂單資訊
      .buyer-detail
        validation-observer(
            v-slot="{ invalid }"
            @submit.prevent="submitForm()"
        )
          form
            validation-provider.row(
              name="姓名"
              v-slot="{ errors, classes }"
              rules="required"
            )
              label.no-break-label(for="name") 姓名
              input#name.input(
                type="text"
                v-model="form.name"
                :class="classes"
                required
              )
              span(
                v-if="errors[0]"
              ).warning {{ errors[0] }}
            validation-provider.row(
              name="電話"
              v-slot="{ errors, classes }"
              rules="required|digits:10"
            )
              label.no-break-label(for="phone") 電話
              input#phone.input(
                type="tel"
                v-model="form.tel"
                :class="classes"
                maxlength=10
                required
              )
              span(
                v-if="errors[0]"
              ).warning {{ errors[0] }}
            validation-provider.row(
              name="信箱"
              v-slot="{ errors, classes }"
              rules="required|email"
            )
              label.break-label(for="email") 信箱
              input#email.input(
                type="email"
                v-model="form.email"
                :class="classes"
                required
              )
              span(
                v-if="errors[0]"
              ).warning {{ errors[0] }}
            validation-provider.row(
              name="收件地址"
              v-slot="{ errors, classes }"
              rules="required"
            )
              label.break-label(for="address") 收件地址
              input#address.input(
                type="text"
                v-model="form.address"
                :class="classes"
                required)
              span(
                v-if="errors[0]"
              ).warning {{ errors[0] }}
            .row
              label(for="remark") 備註
                small.option （選填)
              textarea#remark.remark(rows="5" v-model="form.remark")
            validation-provider.row(
              name="付款方式"
              v-slot="{ errors, classes }"
              rules="required"
            )
              label(
                for="paytype"
              ) 付款方式
              select.pay-type(
                name="payment"
                id="paytype"
                :class="classes"
                v-model="form.payment"
              )
                  option(value="" disabled) ---請選擇付款方式---
                  option(
                    v-for="(type, index) in payment"
                    :key="index"
                    :value="type"
                  ) {{ type }}
              span(
                v-if="errors[0]"
              ).warning {{ errors[0] }}
            .check-block
              button.back(type="button" @click="$router.go(-1)") 上一頁
              button.check
                .txt(:class="{hide: loading}") 確認訂單
                font-awesome-icon.loading.fa-1x.fa-spin(
                  :icon="['fa', 'spinner']"
                  :class="{show: loading}"
                )
      vue-confirm-dialog
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { getCart, createOrder } from '../apis/utils';

export default {
  name: 'pay_page',
  data() {
    return {
      payment: ['WebATM', 'ATM', 'Barcode', 'Credit', 'ApplePay', 'GooglePay'],
      form: {
        name: '',
        tel: '',
        email: '',
        payment: '',
        address: '',
        remark: '',
      },
      isCollapse: false,
      collapse: false,
    };
  },
  created() {
    this.getShopCartData();
  },
  computed: {
    ...mapGetters(['products', 'loading']),
    countAll() {
      return this
        .products
        .reduce(
          (cur, el) => cur + (el.quantity * (el.product.price
            ? el.product.price
            : el.product.origin_price)),
          0,
        );
    },
  },
  methods: {
    ...mapActions(['setProducts', 'toggleLoading']),
    getShopCartData() {
      const loader = this.$loading.show({
        container: this.$refs.preivew,
        isFullPage: false,
      });
      getCart()
        .then((resp) => {
          this.setProducts(resp.data.data);
          loader.hide();
        });
    },
    getItemTotal(index) {
      return this.products[index].quantity * (this.products[index].product.onsale
        ? this.products[index].product.onsale
        : this.products[index].product.price);
    },
    cashFormat(val) {
      return `$${val.toString().replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')}`;
    },
    submitForm() {
      this.toggleLoading();
      createOrder(this.form)
        .then((resp) => {
          this.toggleLoading();
          this.$confirm({
            message: '訂單已建立',
            button: {
              no: '繼續購物',
              yes: '去付款',
            },
            callback: (confirm) => this
              .$router
              .push(confirm ? '' : `payment/${resp.data.data.id}`),
          });
        });
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>
<style lang="sass" scoped>
@import url(https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;900&family=Raleway:wght@700;900&display=swap)
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
@keyframes collpaseList
  0%
    height: 280px
  50%
    height: 300px
  100%
    height: auto
*
  margin: 0
  padding: 0
  list-style: none
  .container
    width: 40%
    margin: 2% 30%
    text-align: center
    h4
      margin-bottom: 1%
      text-align: left
      width: 100%
    .buy-item-preview, .buyer-detail
      padding: 2% 0%
      width: 100%
    .buyer-detail
      border-top: 1px solid $darkgray
    .buy-item-preview
      text-align: center
      border-top: 1px solid $darkgray
      margin-bottom: 1%
      span
        padding: .5% 1%
        color: $darkgrayn
        border-radius: 10px
        font-weight: 700
    .preview-content
      height: auto
      max-height: 270px
      overflow-y: hidden
      &.show
        animation: collpaseList .5s 1 linear forwards
        max-height: 1080px
      .buy-item
        border-bottom: 1px solid $darkgray
        margin-bottom: 1%
        div
          display: inline-block
          width: 20%
          vertical-align: middle
          padding-bottom: 1%
        .pic
          height: 100px
          background-position: left
          background-repeat: no-repeat
          background-size: cover
    .total
      display: flex
      align-items: center
      justify-content: center
      width: 30%
      padding: 1% 10%
      margin: 1% 25%
      background: rgba(211, 172, 43, .5)
      border: 1px dotted $darkgray
      border-radius: 20px
      font-font-family: 'Noto Sans TC', sans serif
      span
        display: inline-block
        font-font-family: 'Raleway', sans serif
        margin-left: 5%
    .row:nth-of-type(4)
      label
        margin: 1% 0
        align-self: flex-start
    .row
      display: flex
      flex-wrap: wrap
      margin-bottom: 1%
      align-items: center
      width: 100%
      label
        color: #888
      label:not(.chklabel)
        width: 15%
        margin-right: 1%
      .no-break-label
        &:last-child
          width: 10%
      label
        display: inline-block
        text-align: left
        font-family: 'Noto Sans TC', sans serif
        .option
          color: $goldyellow
      .input, textarea, .pay-type
        width: 75%
        border: 1px solid $darkgray
        outline: 0
        padding: 2%
        border-radius: 5px
        &:focus
          box-shadow: 5px  5px 10px $darkgrayn
      .pay-type
        width: 79%
      .input.failed, .pay-type.failed
        border: 1px solid rgba(red, .8)
        &:focus
          box-shadow: 5px  5px 10px rgba(red, .5)
    .check-block
      border-top: 1px solid $darkgray
      display: flex
      align-items: center
      justify-content: center
      button
        width: 15%
        margin: 1%
        padding: 2%
        border: 1px solid $darkgray
        border-radius: 5px
        font-family: 'Noto Sans TC', sans serif
        background: $lightgray
        outline: none
        transition: .2s
        background: $lightgray
        color: $navyblue
        font-size: 14px
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
    .collapse
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
    .warning
      margin-left: 16%
      display: block
      color: rgba(red, .8)
</style>
