<template lang="pug">
    #product-list
        .container
            -for(let i = 0; i< 30 ;i++)
                .item(@click="showDetail")
                    .pic
                        img(src="https://picsum.photos/300/300?random="+i)
                    .txt
                        h2 I am title
                        p TEST
                    slot
            //- .item-detail
            //-     .pic
            //-     .txt
            //-         h1
            //-         input.num(type=number)
            //-         p
            .shop-cart
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

        }
    },
    methods: {
        showDetail() {

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

    @keyframes cartAnimate()
        0%
            transform: translate(-20%, -20%)
        50%
            transform: translate(0%, 0%)
        100%
            transform: translate(-20%, -20%)

    *
        padding: 0
        margin: 0
        list-style: none
    .container
        width: 90%
        min-width: 900px
        height: 100%
        display: flex
        flex-direction: row
        flex-wrap: wrap
        .item
            width: 246px
            height: 396px
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
                img
                    display: block
                    border-radius: 13px 13px 0 0
                    width: 100%
            .txt h2
                text-align: left
                padding: 5px 15px
                // border-bottom: 2px solid $navyblue
            .txt p
                color: $darkgrayn
                padding: 5px
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
            &:hover
                box-shadow: 2px 2px 4px $goldyellow
                animation: cartAnimate .2s .2s infinite linear forwards
            .img
                width: 100%
                position: relative
            .txt
                font-size: 6px
                overflow-wrap: nowrap
</style>