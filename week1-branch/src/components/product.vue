<template lang="pug">
    #product
        .product-container
            button.cancel(@click="closeWindow") &times;
            .item
                .img
                    img(src="https://imgur.com/Ifl0c9e.png", alt="alt")
                .detail
                    .category: small {{ item.category }}
                    .item-title: h1 {{ item.name }}
                    .item-content
                        .content-title 產品說明
                        .item-descript {{ item.descript }}
                    .item-price
                        .price-title 售價
                        span.onsale(v-if="item.onsale") NT${{ item.onsale }}
                        span.price(:class="item.onsale ? 'strike' : ''") NT${{ item.price }}
                    .buy-num
                        button.btn-num-minus(type="button" @click="minusNum") &minus;
                        input.num(type="number" v-model="buyNum")
                        button.btn-num-plus(type="button" @click="plusNum") &plus;
                    button.add-cart(type="button") 加入購物車
</template>
<script>
export default {
    name: 'product',
    props: {
        id: {
            type: String,
            required: true,
        },
        pageOpen: String
    },
    data() {
        return {
            item: {
				name: '除濕機',
				category: '3C產品',
				descript: '可以拿來除濕',
				price: 13999,
				onsale: 8999
			},
			buyNum: 1
        }
    },
    methods: {
        plusNum () {
			this.buyNum++;
		},
		minusNum () {
			if (this.buyNum > 1) this.buyNum--;
        },
        closeWindow() {
            this.$emit('update:pageOpen', !this.pageOpen)
        }
    }
}
</script>
<style lang="sass" scoped>
    @import url(https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;500;700;900&family=Raleway:wght@500;700&display=swap)
    $navyblue: #333D51 
    $hnavyblue: #242b39
    $goldyellow: #D3AC2B 
    $darkgray: #CBD0D8 
    $lightgray: #F4F3EA
    *
        padding: 0
        margin: 0
        list-style: none
    body
        width: 1200px
        height: 100vh
        display: flex
        align-items: center
        justify-content: center
        #product
            width: 50%
            &.hide
                display: none
            /* 產品容器 */
            .product-container
                padding: 2%
                border: 1px dotted #ddd
                background:  $lightgray /* #ffeaee */
                position: relative
                /* 右上取消按鍵 */
                .cancel
                    float: right
                    position: absolute
                    top: -.5%
                    right: 0
                    font-size: 28px
                    border: 0
                    border-radius: 20px
                    background: none
                    transition: .5s
                    outline: 0
                    &:hover
                        // background: #ffb7c5
                /* 產品 */
                .item
                    display: flex
                    /* 產品圖片 */
                    .img
                        width: 100%
                        margin-right: 2%
                        img
                            display: block
                            width: 100%
                    /* 產品資訊 */
                    .detail					
                        display: flex
                        flex-direction: column
                        /* 產品分類 */
                        .category
                            align-self: flex-end
                            float: right
                            position: relative
                            padding: 2px
                            background: #fe5e3e
                            border-radius: 5px
                            font-family: 'Noto Sans TC', sans-serif
                            small
                                color: #fff
                                background: #fe5e3e
                        /* 產品名稱 */
                        .item-title
                            h1
                                font-family: 'Noto Sans TC', sans-serif
                                text-align: left
                        /* 產品說明 */
                        .item-content
                            margin-top: 3%
                            // border: 1px solid #dda8cc
                            font-family: 'Noto Sans TC', sans-serif
                            text-align: left
                            .content-title
                                font-weight: 700
                            .item-descript
                                color: #555
                                font-size: 14px
                                font-weight: 300
                        /* 產品價格 */
                        .item-price
                            text-align: left
                            margin-top: auto
                            font-family: 'Raleway', sans-serif
                            .price-title
                                font-family: 'Noto Sans TC', sans-serif
                            .price
                                margin-left: 1%
                            .price.strike
                                color: #888
                                text-decoration: line-through
                                font-size: 12px
                            .onsale
                        /* 購買數量 */
                        .buy-num
                            margin-top: 3%
                            border: 1px double #ddd
                            border-radius: 5px
                            display: flex
                            .btn-num-minus, .btn-num-plus, .num
                                border: 0
                                padding: 5px
                                font-size: 18px
                                outline: none
                            .btn-num-minus, .btn-num-plus
                                width: 15%
                                background: #fff
                                transition: .5s
                                &:hover
                                    background: #ddd
                            .btn-num-minus
                                border-right: 1px solid #ddd
                                border-radius: 5px 0 0 5px
                            .btn-num-plus
                                border-left: 1px solid #ddd
                                border-radius: 0 5px 5px 0
                            .num
                                width: 70%
                                text-align: center
                                -moz-appearance: textfield
                                &::-webkit-outer-spin-button, &::-webkit-inner-spin-button
                                    -webkit-appearance: none
                                    margin: 0
                        /* 加入購物車按鍵 */
                        .add-cart
                            margin-top: 3%
                            padding: 2%
                            outline: none
                            border: 0
                            font-family: 'Noto Sans TC', sans-serif
                            font-size: 18px
                            font-weight: 300
                            background: #fedd23
                            border-radius: 5px
                            transition: .5s
                            &:hover
                                background: #edcc12
</style>