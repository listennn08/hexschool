<template lang="pug">
    #productPage.productPage
        categoryList(:class="{sticky}")
        productList(:class="{sticky}")
</template>
<script>
import categoryList from '../components/product_categories.vue';
import productList from './product_list.vue';

export default {
    components: {
        categoryList,
        productList,
    },
    data() {
        return {
            sticky: false,
        };
    },
    created() {
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            if (window.scrollY > 200) {
                this.sticky = true;
            } else {
                this.sticky = false;
            }
        },
    },
};
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
            top: 0
            margin-top: 3%
            transition: margin-top .5s
            &.sticky
                position: fixed
                margin-top: 5%
                top: 0
                left: 2%
        .product-list
            &.sticky
                margin-left: 20%
</style>
