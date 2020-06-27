<template lang="pug">
    #productPage.productPage
        categoryList
        productList
</template>
<script>
import categoryList from '../components/product_categories.vue'
import productList from '../components/product_list.vue'
export default {
    components: {
        categoryList,
        productList
    }

}
</script>
<style lang="sass" scoped>
    *
        margin: 0
        padding: 0
        list-style: none
    .productPage
        display: flex
        justify-content: center
        .category
            width: 20%
            display: inline-block
            top: 0
            margin-top: 3%
            transition: margin-top .5s
            &.sticky
                position: fixed
                top: 15%
                left: 5%
                margin-top: 5%
        .product-list
            width: 70%
            display: inline-block
</style>