<template lang="pug">
  .container.is-fluid
    .container(v-if="products && products.length > 0")
      button.button.is-text.is-outlined.is-pulled-right.my-2.removeAll(
        @click="deleteCartData()"
        ref="removeAllContainer") 刪除所有商品
      table.table.is-fullwidth
        thead
          tr
            th 編號
            th 圖示
            th 產品名稱
            th 售價
            th 購買數量
            th 總價
            th 移除
        tbody(ref="preivew")
          tr.has-text-justified(v-for="(item, index) in products" :key="item.product.id")
            td(scoped="row") {{ index+1 }}
            //- td.pic(:style="{backgroundImage: `url(${item.product.imageUrl[0]})`}")
            td
              figure.image.is-128x128
                img(:src="item.product.imageUrl[0]")
            td
              .item-name {{ item.product.title | hideText }}
            td
              .price(v-if="item.product.price")
                | {{ item.product.price | cash }}
                span(:class="{strike: item.product.price}")
                  | {{ item.product.origin_price | cash }}
            td
              .field.has-addons.has-addons-centered
                .control
                  button.button.is-left(@click="countQuantity(index, 'm')") &minus;
                .control
                  input.input.has-text-centered(
                    type="number"
                    v-model="item.quantity"
                    @change="updateCartData(index)"
                  )
                .control
                  button.button.is-right(@click="countQuantity(index, 'p')") &plus;
            td.item-total {{ getItemTotal(index) | cash }}
            td
              button.button.is-text.is-underlineless.remove(
                :class="{removing: item.removing}"
                @click="deleteCartData(index)"
              ) &times;
        tr.total
          td 小計
          td(colspan=4)
          td {{ countAll | cash }}
          td
      .shopcart-checkout
        button.continueshop: router-link(to="products") &lsaquo;&lsaquo;&nbsp;繼續購物
        button.checkout: router-link(to="checkout") 去結帳 &rsaquo;&rsaquo;
    .container(v-else)
      .noItemAlert
        | 還沒有把喜愛的商品加入購物車唷
        | 趕快去購物吧！
      .shopcart-checkout
        button.button.continueshop: router-link(to="/products") &lsaquo;&lsaquo;繼續購物
</template>
<script>
import { getCart, updateCart, deleteCart } from '../apis/utils';

export default {
  data() {
    return {
      products: [],
      productCheck: [],
    };
  },
  created() {
    this.getShopCartData();
  },
  computed: {
    countAll() {
      return this.products.reduce(
        (pre, cur) => pre + (cur.quantity * (cur.product.price
          ? cur.product.price
          : cur.product.origin_price)),
        0,
      );
    },
  },
  methods: {
    getShopCartData() {
      const loader = this.$loading.show();
      getCart()
        .then((resp) => {
          this.products = [...resp.data.data].map((el) => {
            const tmpEl = el;
            tmpEl.removing = false;
            return tmpEl;
          });
          loader.hide();
        });
    },
    countQuantity(i, operate) {
      if (operate === 'm') {
        if (this.products[i].quantity > 1) {
          this.products[i].quantity -= 1;
        }
      } else if (operate === 'p') {
        this.products[i].quantity += 1;
      }
      this.updateCartData(i);
    },
    updateCartData(i) {
      updateCart(this.products[i].product.id, this.products[i].quantity);
    },
    deleteCartData(i) {
      if (i || i === 0) {
        this.products[i].removing = true;
        deleteCart(this.products[i].product.id)
          .then(() => {
            this.products.splice(i, 1);
            this.products[i].removing = false;
          });
      } else {
        const loader = this.$loading.show({
          container: this.$refs.removeAllContainer,
          isFullPage: false,
        });
        deleteCart()
          .then(() => {
            this.products = [];
            loader.hide();
          });
      }
    },
    getItemTotal(index) {
      return this.products[index].quantity * (this.products[index].product.price
        ? this.products[index].product.price
        : this.products[index].product.origin_price);
    },
  },
};
</script>
<style lang="sass" scoped>
@import url(https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;500;700;900&family=Raleway:wght@500;700&family=Open+Sans:wght@400;600&display=swap)
$navyblue: #333D51
$hnavyblue: #242b39
$goldyellow: #D3AC2B
$darkgray: #CBD0D8
$lightgray: #F4F3EA

@keyframes checkBtnAnimation
  0%
    transform: translateX(10%)
  50%
    transform: translateX(20%)
  100%
    transform: translateX(30%)
@keyframes continueBtnAnimation
  0%
    transform: translateX(-10%)
  50%
    transform: translateX(-20%)
  100%
    transform: translateX(-30%)
@keyframes removeBtnAnimation
  0%
    transform: scale(1, 1)
  100%
    transform: scale(1.5, 1.5)
@keyframes removing
  0%
    transform: rotate(0)
  100%
    transform: rotate(360deg)
*
  font-family: 'Noto Sans TC', sans serif
.table
  td
    width: 10%
    padding: 1rem
    text-align: center
    vertical-align: middle
// .container
//   width: 80%
//   margin: 0 10%
//   .removeAll
//     float: right
//     padding: 1%
//     border: 1px solid rgba(red, .8)
//     background: #fff
//     color: rgba(red, .8)
//     border-radius: 10px
//     margin: 2% 0
//     transition: .5s
//     outline: none
//     &:hover
//       background: rgba(red, .8)
//       color: #fff
//   table
//     width: 100%
//     border-collapse: collapse
//     th
//       border-bottom: 1px solid #ddd
//     tr
//       width: 100%
//       td
//         width: 13%
//         border-bottom: 2px dotted #ddd
//   .shopcart-checkout
//     margin-top: 1%
//     float: right
//     width: 50%
//   .pic
//     height: 200px
//     background-position: left
//     background-repeat: no-repeat
//     background-size: cover
//   .price
//     font-family: 'Open Sans', sans-serif
//     color: $navyblue
//     .strike
//       margin-left: 3px
//       text-decoration: line-through
//       font-size: 12px
//       color: #888
//   .num-control
//     width: 100%
//     display: flex
//     border: 1px solid $darkgray
//     border-radius: 5px
//     .num-minus, .num-plus, .num-input
//       border: none
//       outline: none
//       font-size: 18px
//       padding: 2%
//       text-align: center
//     .num-minus, .num-plus
//       width: 25%
//       background: $lightgray
//       &:hover
//         background: $navyblue
//         color: $lightgray
//     .num-minus
//       border-radius: 5px 0 0 5px
//     .num-plus
//       border-radius: 0 5px 5px 0
//     .num-input
//       width: 50%
//       &::-webkit-outer-spin-button, &::-webkit-inner-spin-button
//         -webkit-appearance: none
//         margin: 0
//   .item-total, .total
//     font-family: 'Open Sans', sans-serif
//   .total
//     td
//       padding: 1% 0
//   .remove
//     border: 0px
//     background: transparent
//     font-size: 24px
//     outline: none
//     transform-origin: center
//     &:hover
//       animation: removeBtnAnimation 1s infinite linear forwards
//     &.removing
//       animation: removing 1s infinite linear forwards
//   .checkout, .continueshop
//     padding: 1% 2%
//     margin: 1%
//     font-size: 16px
//     border: 0
//     background: $darkgray
//     transition: .5s
//     outline: none
//     border-radius: 5px
//     a
//       color: $navyblue
//       text-decoration: none
//   .noItemAlert
//     margin: 5% 10%
//   .checkout
//     &:hover
//       background: $hnavyblue
//       animation: checkBtnAnimation 2s .1s infinite linear forwards
//     &:hover a
//       color: $lightgray
.continueshop
  &:hover
    background: $hnavyblue
    animation: continueBtnAnimation 2s .1s infinite linear forwards
    &:hover a
      color: $lightgray
</style>
