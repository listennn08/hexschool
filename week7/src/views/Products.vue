<template lang="pug">
  #productPage.productPage
    categoryList(:class="{sticky}")
    productList(:class="{sticky}")
</template>
<script>
import { mapGetters } from 'vuex';
import categoryList from '../components/ProductCategories.vue';
import productList from './ProductList.vue';

export default {
  components: {
    categoryList,
    productList,
  },
  computed: {
    ...mapGetters(['sticky']),
  },
};
</script>
<style lang="sass" scoped>
@mixin mediumScreen()
  @media screen and (max-width: 1440px)
    @content
*
  margin: 0
  padding: 0
  list-style: none
.productPage
  display: flex
  justify-content: flex-start
  .category
    width: 20%
    top: 0
    margin-top: 5%
    transition: margin-top .5s
    position: fixed
  .product-list
      width: 85%
      float: right
      margin-left: 20%
      +mediumScreen
        margin-left: 15%
</style>
