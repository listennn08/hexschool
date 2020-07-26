<template lang="pug">
  #product.product
    .product-container(ref="product")
      a.prev(@click.prevent="$router.go(-1)") &laquo; 上一頁
      //- button.cancel(@click="cancel()") &times;
      .category: small {{ tempProduct.category }}
      .item
        .img(:style="{backgroundImage: `url(${tempProduct.imageUrl[0]})`}")
        .detail
          h2.title  {{ tempProduct.title }}
          h4.title 產品說明
          p.content {{ tempProduct.content }}
          h4.title 產品資訊
          p.content {{ tempProduct.description }}
          h4.title 售價
          .price {{ tempProduct.price | cash }}
            span(:class="{strike: tempProduct.price}")
              | {{ tempProduct.origin_price | cash }}
          .buy-num
            button.btn-num-minus(type="button" @click="countQuantity('m')") &minus;
            input.num(type="number" v-model="tempProduct.quantity")
            button.btn-num-plus(type="button" @click="countQuantity('p')") &plus;
          button.add-cart(
            type="button"
            @click="addToCart(tempProduct.id, tempProduct.quantity)"
          )
            .txt(:class="{hide: loading}") 加入購物車
            font-awesome-icon.loading.fa-spin(
              :class="{show: loading}"
              :icon="['fas', 'spinner']"
            )
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { addCart, getDataDetail } from '../apis/utils';

export default {
  name: 'product',
  computed: {
    ...mapGetters(['tempProduct', 'productPage', 'loading']),
  },
  created() {
    const loader = this.$loading.show();
    const { id } = this.$route.params;
    getDataDetail(id)
      .then((resp) => {
        this.setTempProduct({
          ...resp.data.data,
          quantity: 1,
        });
        loader.hide();
      });
  },
  methods: {
    ...mapActions(['setMsg', 'setTempProduct', 'toggleProductPage', 'clearTempProduct', 'toggleLoading']),
    countQuantity(operate) {
      if (operate === 'm') {
        if (this.tempProduct.quantity > 1) {
          this.tempProduct.quantity -= 1;
        }
      } else if (operate === 'p') {
        this.tempProduct.quantity += 1;
      }
    },
    toggle(e) {
      const { className } = e.target;
      if (className === 'product') {
        this.clearTempProduct();
        this.toggleProductPage();
      }
    },
    cancel() {
      this.clearTempProduct();
      this.toggleProductPage();
    },
    addToCart(id, quantity) {
      this.toggleLoading();
      if (id && quantity) {
        addCart(id, quantity)
          .then(() => {
            this.getShopcartQuantity();
            this.toggleLoading();
          })
          .catch((error) => {
            this.setMsg({
              msg: error.response.data.errors[0],
              type: false,
            });
            this.toggleLoading();
          });
      }
    },
  },
  beforeDestroy() {
    this.clearTempProduct();
  },
};
</script>
<style lang="sass" scoped>
  @import url(https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;500;700;900&family=Raleway:wght@500;700&display=swap)
  $navyblue: #333D51
  $hnavyblue: #242b39
  $goldyellow: #D3AC2B
  $darkgray: #CBD0D8
  $lightgray: #F4F3EA
  *
    padding: 0
    margin: 0
    list-style: none
  .product
    margin-top: 1%
    width: 100%
    height: 100vh
    display: flex
    align-items: flex-start
    justify-content: center
    &.hide
      display: none
    // 產品容器
    .product-container
      width: 50%
      padding: 2%
      border: 1px dotted #ddd
      background:  $lightgray // #ffeaee
      position: relative
      // 右上取消按鍵
      .prev
        float: left
        position: absolute
        top: .5%
        left: .5%
        font-size: 14px
        font-family: 'Noto Sans TC', sans-serif
        border: 0
        border-radius: 20px
        background: none
        transition: .5s
        outline: 0
        cursor: pointer
      .cancel
        float: right
        position: absolute
        top: .5%
        right: .5%
        font-size: 28px
        border: 0
        border-radius: 20px
        background: none
        transition: .5s
        outline: 0
        &:hover
          // background: #ffb7c5
      // 產品分類
      .category
        align-items: flex-start
        width: 15%
        padding: 2px
        background: $goldyellow
        border-radius: 5px 5px 0 0
        font-family: 'Noto Sans TC', sans-serif
        text-transform: uppercase
        small
          color: #fff
          background: $goldyellow
      // 產品
      .item
        display: flex
        // 產品圖片
        .img
          width: 50%
          height: 500px
          margin-right: 2%
          background-position: left
          background-repeat: no-repeat
          background-size: cover
        // 產品資訊
        .detail
          width: 48%
          display: flex
          flex-direction: column
          // 產品名稱
          .title
            font-family: 'Noto Sans TC', sans-serif
            text-align: left
          h4
            margin: 1% 0
            width: 100%
            background: linear-gradient(90deg, rgba($goldyellow, .8), transparent 50%)
          // 產品說明
          .content
            // border: 1px solid #dda8cc
            font-family: 'Noto Sans TC', sans-serif
            text-align: left
            font-weight: 500
            margin-bottom: auto
            .item-descript
              color: #555
              font-size: 14px
              font-weight: 300
          // 產品價格
          .price
            text-align: left
            font-family: 'Raleway', sans-serif
            .strike
              color: #888
              text-decoration: line-through
              font-size: 12px
          // 購買數量
          .buy-num
            width: 50%
            margin-top: 3%
            border: 1px double #ddd
            border-radius: 5px
            display: flex
            .btn-num-minus, .btn-num-plus, .num
              border: 0
              padding: 5px
              font-size: 18px
              outline: none
            .btn-num-minus, .btn-num-plus
              width: 15%
              background: #fff
              transition: .5s
              &:hover
                background: #ddd
            .btn-num-minus
              border-right: 1px solid #ddd
              border-radius: 5px 0 0 5px
            .btn-num-plus
              border-left: 1px solid #ddd
              border-radius: 0 5px 5px 0
            .num
              width: 70%
              text-align: center
              -moz-appearance: textfield
              &::-webkit-outer-spin-button, &::-webkit-inner-spin-button
                -webkit-appearance: none
                margin: 0
          // 加入購物車按鍵
          .add-cart
            margin-top: 3%
            padding: 2%
            outline: none
            border: 0
            font-family: 'Noto Sans TC', sans-serif
            font-size: 18px
            font-weight: 300
            background: #fedd23
            border-radius: 5px
            transition: .5s
            &:hover
              background: #edcc12
            .txt.hide
              display: none
            .loading
              width: 100%
              text-align: center
              display: none
              &.show
                display: block
</style>
