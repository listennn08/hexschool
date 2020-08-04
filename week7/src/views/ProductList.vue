<template lang="pug">
  #product-list.product-list
    .container.is-fluid
      .columns.is-multiline.is-marginless.mt-5.is-variable.is-1-fullhd.is-2-desktop.is-desktop
        .column.is-3-fullhd.is-4-widescreen.is-5-desktop-only.is-6-tablet-only.is-10-mobile(
          v-for="(item, index) in showProducts"
          :data-id="item.id"
          :key="index"
        )
          .card.is-relative.has-text-left
            .card-image.columns.is-marginless.is-cus-centered
              .is-pulled-left.is-clearfix.is-category
                | {{ item.category }}
              figure.image.is-128x128
                img.is-rounded(:src="item.imageUrl[0]")
            .card-content.is-paddingless.px-2.py-5
              .title.is-4(:title="item.title") {{ item.title }}
              .content.is-marginless.mb-auto {{ item.content | hideContent }}
              .content.has-text-right.is-marginless
                router-link.descript-link(
                  :to="`/product/${item.id}`"
                ) 查看更多 &raquo;
              .content.is-marginless
                .price.in-bottom(v-if="item.price")
                    | {{ item.price | cash }}
                    span(
                      :class="{strike: item.price}"
                    ) {{ item.origin_price | cash }}
              .card-footer
                .field.has-addons.has-addons-centered.mt-1
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
                  button.button.is-cus-primary.addCart(
                    @click="addToCart(index, item.id, item.quantity)"
                    :class="{'is-loading': item.isLoading}"
                    ) 加入購物車
      template(v-if="pagination.current_page")
        pagination(:pagination="pagination")
      //- product
      router-link(to="/shopcart").shop-cart
        .shop-container
          .cart-count(v-if="shopcart.quantity") {{ shopcart.quantity }}
          font-awesome-icon(icon="shopping-cart")
          .txt 購物車
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
// import product from '../components/Product.vue';
import productCategories from '../components/ProductCategories.vue';
import pagination from '../components/Pagination.vue';
import {
  getAllProducts, getDataDetail, getCartQuantity, addCart,
} from '../apis/utils';

export default {
  components: {
    // product,
    productCategories,
    pagination,
  },
  data() {
    return {
      id: null,
      pageOpen: false,
      shopcart: {
        quantity: null,
      },
      pagination: {},
    };
  },
  created() {
    this.getData();
    this.getShopcartQuantity();
  },
  watch: {
    'pagination.current_page': {
      handler() {
        const { current_page: cur } = this.pagination;
        const loader = this.$loading.show();
        getAllProducts(cur)
          .then((resp) => {
            this.setProducts([...resp.data.data].map((el) => {
              const tmpEl = el;
              tmpEl.quantity = 1;
              tmpEl.isLoading = false;
              return tmpEl;
            }));
            loader.hide();
          });
      },
    },
  },
  computed: {
    ...mapGetters(['products', 'category']),
    showProducts() {
      switch (this.category) {
        case 'bed':
        case 'curtain':
          return this.filterProduct(this.category);
        case 'chair':
          return this.filterProduct(this.category, 'sofa');
        case 'case':
          return this.filterProduct(this.category, 'table');
        default:
          return this.products;
      }
    },
  },
  methods: {
    ...mapActions(['setMsg', 'setProducts', 'setPagination', 'setTempProduct', 'toggleProductPage']),
    getData() {
      const loader = this.$loading.show();
      getAllProducts()
        .then((resp) => {
          this.setProducts([...resp.data.data].map((el) => {
            const tmpEl = el;
            tmpEl.quantity = 1;
            tmpEl.isLoading = false;
            return tmpEl;
          }));
          this.pagination = resp.data.meta.pagination;
          loader.hide();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    showDetail(e) {
      const { id } = e.target.parentNode.parentNode.dataset
        || e.target.parentNode.dataset;
      if (id) {
        this.toggleProductPage();
        const loader = this.$loading.show({
          container: this.$refs.product,
          isFullPage: false,
        });
        getDataDetail(id)
          .then((resp) => {
            this.setTempProduct({
              ...resp.data.data,
              quantity: 1,
            });
            loader.hide();
          });
      }
    },
    getShopcartQuantity() {
      getCartQuantity()
        .then((resp) => {
          this.shopcart.quantity = resp.data.meta.pagination.total;
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
    },
    addToCart(index, id, quantity) {
      this.products[index].isLoading = true;
      if (id && quantity) {
        addCart(id, quantity)
          .then(() => {
            this.getShopcartQuantity();
            this.products[index].isLoading = false;
          })
          .catch((error) => {
            this.setMsg({
              msg: error.response.data.errors[0],
              type: false,
            });
            this.products[index].isLoading = false;
          });
      }
    },
    filterProduct(...category) {
      return (category.length > 1)
        ? this.products.filter((el) => {
          const cat = el.category.toLowerCase();
          return cat.indexOf(category[0]) > -1 || cat.indexOf(category[1]) > -1;
        })
        : this.products.filter((el) => el.category
          .toLowerCase()
          .indexOf(category[0]) > -1);
    },
  },
};
</script>
<style lang="sass" scoped>
@import url(https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;700&family=Raleway:wght@700;900&family=Open+Sans:wght@400;600&display=swap)
$navyblue: #333D51
$hnavyblue: #242b39
$goldyellow: #D3AC2B
$darkgray: #CBD0D8
$darkgrayn: #46505e
$lightgray: #F4F3EA

@keyframes cartAnimate
  0%
    transform: translateY(-20%)
  50%
    transform: translateY(0%)
  100%
    transform: translateY(-20%)
@mixin largeScreen()
  @media screen and (min-width: 1441px)
    @content
@mixin mediumScreen()
  @media screen and (max-width: 1440px)
    @content
.card
  border-radius: 15px
  border: 2px solid $navyblue
  transition: .5s
  // height: 200px
  &:hover
    border: 2px solid $hnavyblue
    box-shadow: 2px 2px 5px $goldyellow
.is-cus-centered
  display: flex
  justify-content: center
  align-items: center
.title
  color: $navyblue
  width: 100%
  font-size: 18px
  font-weight: 700
  white-space: nowrap
  text-overflow: ellipsis
  overflow: hidden
.is-category
  position: absolute
  left: 0
  top: 0
  width: 30%
  background: $goldyellow
  text-align: center
  padding: 1% 2%
  border-radius: 13px 0 10px 0
  font-size: 12px
  text-transform: uppercase
  z-index: 2
.media-left, .image .is-rounded
  border-radius: 15px
.descript
  min-height: 70px
  max-height: 70px
  overflow: hidden
  text-overflow: ellipsis
  color: $darkgrayn
.price
  width: 100%
  text-align: left
  font-family: 'Raleway', sans-serif
  font-weight: 500
  span.strike
    margin-left: 1%
    font-size: 12px
    text-decoration: line-through
    color: #888
  &.in-bottom
    margin-top: auto
.shop-cart
  width: 65px
  height: 65px
  padding: 10px
  font-size: 20px
  border: 2px solid $darkgray
  border-radius: 50%
  position: fixed
  right: 2%
  bottom: 2%
  color: $navyblue
  text-align: center
  transition: .5s
  text-decoration: none
  background: $lightgray
  z-index: 5
  cursor: pointer
  +largeScreen
    right: 5%
    bottom: 4%
  &:hover
    box-shadow: 2px 2px 4px $goldyellow
    animation: cartAnimate 2s infinite linear forwards
    text-decoration: underline
.shop-container
  position: relative
  .cart-count
    position: absolute
    top: -15px
    right: -10px
    background: #ff0000
    color: #fff
    font-size: 15px
    width: 20px
    height: 20px
    border-radius: 50%
    box-shadow: 2px 2px 5px #dd0000
  .txt
    font-size: 6px
    overflow-wrap: nowrap
#product
  position: fixed
  top: 10%
  right: 50%
  left: 50%
  transform: translateX(-50%)
  box-shadow: 2px 2px 5px $lightgray
  z-index: 999
</style>
