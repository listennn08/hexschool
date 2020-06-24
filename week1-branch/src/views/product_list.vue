<template lang="pug">
    #product-list
        .container
            -for(let i = 0; i< 15 ;i++)
                .item(data-id=i @click="showDetail")
                    .pic
                        img(src="https://picsum.photos/300/300?random="+i)
                    .txt
                        h2 I am title
                        p TEST
            template(v-if="id")
                product(:id="id")
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
            id: null
        }
    },
    methods: {
        showDetail(e) {
            this.$nextTick(()=>{
                this.id = parseInt(e.target.dataset.id || e.target.parentNode.dataset.id || e.target.parentNode.parentNode.dataset.id);
            })
            if (document.querySelector('#product')) document.querySelector('#product').classList.toggle('hide');
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

    *
        padding: 0
        margin: 0
        list-style: none
    #product-list
        .container
            width: 45%
            margin-left: 20%
            padding-left: 10%
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
                text-decoration: none
                background: $lightgray
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