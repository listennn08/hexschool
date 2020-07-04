<template lang="pug">
    #product-list.product-list
        .container
            .item-list
                .item(
                    v-for="(el, index) in productItems"
                    :data-id="el.id"
                    :key="index"
                    @click="showDetail(el.id)"
                )
                    .pic
                        img(
                            :src="el.imageUrl[0]"
                            alt=""
                            srcset=""
                        )
                    .detail
                        .cat {{ el.category }}
                        .title {{ el.title }}
                        .descript {{ hideMoreText(el.content) }}
                    .price-block
                        span.price(v-if="el.price") NT$${{ el.price }}
                        span(
                            :class=" el.price ? 'origin-price strike' : 'origin-price'"
                        ) NT$ {{ el.origin_price }}
                    .btn
                        button.addCart 加入購物車
            template(v-if="id")
                product(
                    :id="id"
                    :class="{hide: !pageOpen}"
                    :pageOpen.sync="pageOpen")
            router-link(to="/shopcart").shop-cart
                font-awesome-icon(icon="shopping-cart")
                .txt 購物車
</template>
<script>
import product from './product.vue'
export default {
    components: {
        product
    },
    data() {
        return {
            id: null,
            productItems: [],
            api: {
                base: 'https://course-ec-api.hexschool.io/api/',
                uuid: 'dd62b88f-6f23-42a4-8551-b1cb4552bb3e',
                getAllData: '/ec/products',
            },
            pageOpen: false,
        }
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            this.$http.get(`${ this.api.base }${ this.api.uuid }${ this.api.getAllData }`)
                .then( (resp) => {
                    this.productItems = resp.data.data;
                })
                .catch((err) => {
                    console.error(err)
                })
        },
        hideMoreText(text) {
            return (text.length > 40) ? text.substring(0, 39) + '...' : text;
        },
        showDetail(id) {
            this.id = id
            console.log(this.id)
            this.$nextTick(()=>{
                
            })
            this.pageOpen = !this.pageOpen;
        }
    }
}
</script>
<style lang="sass" scoped>
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
    #product-list
        &.sticky
            margin-left: 20%
        .container
            width: 100%
            max-width: 1080px
            // margin-left: 20%
            // padding-left: 5%
            min-width: 900px
            height: 100%
            display: flex
            flex-direction: row
            flex-wrap: wrap
        .item-list
            width: 100%
            // padding: 0 5%
            // min-width: 900px
            // height: 100%
            display: flex
            flex-direction: row
            justify-content: center
            flex-wrap: wrap
            .item
                width: 286px
                height: 456px
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
                    .title
                        width: 60%
                        font-size: 18px
                        font-weight: 700
                        word-wrap: break-word
                        text-overflow: ellipsis
                        overflow: hidden
                        text-align: left
                        padding: 5px 10px
                    .cat
                        float: right
                        margin-top: 2%
                        margin-right: 2%
                        padding: 1% 2%
                        background: $goldyellow
                        border-radius: 10px
                        font-size: 12px
                    .descript
                        text-align: left
                        height: 80px
                        overflow: hidden
                        text-overflow: ellipsis
                        color: $darkgrayn
                        padding: 0 10px
                .price-block
                    display: flex
                    align-items: center
                    justify-content: flex-start
                    padding: 5px
                    span
                        width: 25%
                        margin-right: 1%
                        font-family: 'Raleway', sans-serif
                        &.origin-price.strike
                            font-size: 12px
                            text-decoration: line-through
                            color: #888
                .btn
                    display: flex
                    justify-content: flex-end
                    width: 90%
                    margin: 5%
                    button
                        width: 30%
                        padding: 1%
                        border: 1px solid $darkgray
                        background: $lightgray
                        border-radius: 5px
                        &:hover
                            background: $navyblue
                            color: $lightgray
        .shop-cart
            width: 40px
            height: 40px
            padding: 10px
            font-size: 20px
            border: 2px solid $darkgray
            border-radius: 50%
            position: fixed
            right: 5%
            bottom: 5%
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
            .img
                width: 100%
                position: relative
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