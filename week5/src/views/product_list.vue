<template lang="pug">
    #product-list.product-list
        .container
            .item-list
                .item(
                    v-for="(item, index) in showProducts"
                    :data-id="item.id"
                    :key="index"
                    @click="showDetail"
                )
                    .pic
                        img(
                            :src="item.imageUrl[0]"
                            alt=""
                            srcset=""
                        )
                    .detail
                        .title(:title="item.title") {{ item.title | hideText }}
                        .cat {{ item.category }}
                        .descript {{ item.content | hideDescipt }}
                        .price(v-if="item.price")
                            | {{ item.price | cash }}
                            span(
                                :class="{strike: item.price}"
                            ) {{ item.origin_price | cash }}
                    .action
                        .num-control
                            button.num-minus(@click="countQuantity(index, 'm')") &minus;
                            input.num-input(type="number" :value="item.quantity")
                            button.num-plus(@click="countQuantity(index, 'p')") &plus;
                        button.addCart(@click="addToCart(index, item.id, item.quantity)")
                            .txt(:class="{hide: item.isLoading}") 加入購物車
                            font-awesome-icon.loading.fa-spin(
                                :class="{show: item.isLoading}"
                                :icon="['fas', 'spinner']"
                            )
            template(v-if="pagination.current_page")
                pagination(:pagination="pagination")
            product
            router-link(to="/shopcart").shop-cart
                .shop-container
                    .cart-count(v-if="shopcart.quantity") {{ shopcart.quantity }}
                    font-awesome-icon(icon="shopping-cart")
                    .txt 購物車
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import product from './product.vue';
import productCategories from '../components/product_categories.vue';
import pagination from '../components/pagination.vue';
import {
    getAllProducts, getDataDetail, getCartQuantity, addCart,
} from '../apis/utils';

export default {
    components: {
        product,
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
                            el.quantity = 1;
                            el.isLoading = false;
                            return el;
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
                        el.quantity = 1;
                        el.isLoading = false;
                        return el;
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
    @import url(https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;700;900&family=Raleway:wght@700;900&family=Open+Sans:wght@400;600&display=swap)
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
    *
        padding: 0
        margin: 0
        list-style: none
        box-sizing: border-box
    .product-list
        overflow-x: hidden
        .container
            width: 100%
            max-width: 1080px
            min-width: 1080px
            height: 100%
            display: flex
            flex-direction: row
            flex-wrap: wrap
        .item-list
            width: 100%
            display: flex
            flex-direction: row
            justify-content: flex-start
            flex-wrap: wrap
            .item
                width: 300px
                height: 450px
                margin: 15px
                border: 2px solid $navyblue
                border-radius: 15px
                transform: translateY(0)
                transition: .5s
                &:hover
                    border: 2px solid $hnavyblue
                    box-shadow: 5px 5px 10px $goldyellow
                    // transform: translateY(-2%)
                &:hover .txt h2
                    // border-bottom: 2px solid $hnavyblue
                .pic
                    border-radius: 15px 15px 0 0
                    width: 100%
                    border-bottom: 2px solid $navyblue
                    box-sizing: border-box
                    display: flex
                    align-items: center
                    justify-content: center
                    img
                        display: block
                        border-radius: 13px 13px 0 0
                        width: 80%
                .detail
                    display: flex
                    flex-wrap: wrap
                    align-items: center
                    .title
                        display: inline-block
                        width: 65%
                        font-size: 18px
                        font-weight: 700
                        white-space: nowrap
                        text-overflow: ellipsis
                        overflow: hidden
                        text-align: left
                        padding: 1% 2%
                    .cat
                        display: inline-block
                        width: 30%
                        background: $goldyellow
                        padding: 1% 2%
                        border-radius: 10px
                        font-size: 12px
                        text-transform: uppercase
                    .descript
                        text-align: left
                        height: 80px
                        overflow: hidden
                        text-overflow: ellipsis
                        color: $darkgrayn
                        padding: 0 10px
                    .price
                        width: 100%
                        text-align: left
                        padding: 1% 2%
                        font-family: 'Open Sans', sans-serif
                        font-weight: 500
                        span.strike
                            margin-left: 1%
                            font-size: 12px
                            text-decoration: line-through
                            color: #888
                .action
                    display: flex
                    justify-content: space-around
                    width: 90%
                    margin: 5%
                    button
                        border: 1px solid $darkgray
                        background: $lightgray
                        outline: none
                        &:hover
                            background: $navyblue
                            color: $lightgray
                    .num-control
                        width: 50%
                        margin: 0 2%
                        display: flex
                        border: 1px solid $darkgray
                        border-radius: 5px
                        .num-minus, .num-plus
                            border: none
                            width: 25%
                            outline: none
                        .num-minus
                            border-radius: 5px 0 0 5px
                        .num-plus
                            border-radius: 0 5px 5px 0
                        .num-input
                            width: 50%
                            border: none
                            outline: none
                            text-align: center
                            &::-webkit-outer-spin-button, &::-webkit-inner-spin-button
                                -webkit-appearance: none
                                margin: 0
                    .addCart
                        width: 30%
                        padding: 1%
                        border-radius: 5px
                        .txt.hide
                            display: none
                        .loading
                            width: 100%
                            text-align: center
                            display: none
                            &.show
                                display: block
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
            +largeScreen
                right: 15%
                bottom: 3%
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
