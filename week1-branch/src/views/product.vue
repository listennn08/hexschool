<template lang="pug">
    #product
        .container
            .item
                .img
                    img(src="", alt="alt")
                .detail
                    .category: small {{ item.category }}
                    .item-title: h1 {{ item.name }}
                    .item-content
                        .content-title 產品說明
                        .item-descript {{ item.descript }}
                    .item-price
                        .price
                        .onsale
                    .buy-num
                        button.btn-num-minus(type="button" @click="") -
                        input.num(type="number" v-model="buyNum")
                        button.btn-num-plus(type="button" @click="") +
                    button(type="button") 加入購物車
                    
</template>
<script>
export default {
    name: 'product',
}
</script>
<style lang="sass" scoped>
    *
        padding: 0
        margin: 0
        list-style: none
    .container
        .item
            .img
                img
            .detail
                .category
                    small
                .item-title
                    h1
                .item-content
                    .content-title
                    .item-descript
                    .item-price
                        .price
                        .onsale
                    .buynum
                        display: flex
                        .btn-num-minus
                        .btn-num-plus
                        .nun
                        

</style>