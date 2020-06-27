<template lang="pug">
    #shopcart.shopcart
        .container(v-if="items && items.length > 0")
            .shopcart-title
                .column
                    .title-no 編號
                .column
                    .title-img 圖示
                .column
                    .title-name 產品名稱
                .column
                    .title-price 售價
                .column
                    .title-buynum 購買數量
                .column
                    .title-total 總價
                .column
                    .title-remove 移除
            .shopcart-item(v-for="(item, index) in items" :key="item.id")
                .column
                    .no {{ index+1 }}
                .column
                    .img: img(:src="item.img")
                .column
                    .item-name {{ item.name }}
                .column
                    .item-price
                        .onsale(v-if="item.onsale") {{ item.onsale }}
                        .price(:class="item.onsale ? 'strike': ''") {{ item.price}}
                .column
                    .buy-num
                        button.btn-num-minus(@click="minusNum(index)") &minus;
                        input.num(:value="item.number")
                        button.btn-num-plus(@click="plusNum(index)") &plus;
                .column
                    .item-total {{ getItemTotal(item.onsale ? item.onsale : item.price, item.number) }}
                .column
                    button.remove(@click="remove(index)") &times;
            .shopcart-count
                .column
                    .total-title 小計
                .column
                .column
                .column
                .column
                .column
                    .total-count {{ countAll }}
                .column
            .shopcart-checkout
                button.continueshop: router-link(to="/allitem") &lsaquo;&lsaquo;繼續購物
                button.checkout: router-link(to="/paypage") 去結帳 &rsaquo;&rsaquo;
        .container(v-else)
            .noItemAlert
                | 還沒有把喜愛的商品加入購物車唷
                | 趕快去購物吧！
            .shopcart-checkout
                button.continueshop: router-link(to="/allitem") &lsaquo;&lsaquo;繼續購物
</template>
<script>
export default {
    data() {
        return {
            items: [
                {
                    id: 1,
                    name: '空氣清淨機',
                    img: 'https://imgur.com/Ifl0c9e.png',
                    price: 13999,
                    onsale: 8999,
                    number: 1
                }, {
                    id: 2,
                    name: '空氣清淨機',
                    price: 13999,
                    img: 'https://imgur.com/Ifl0c9e.png',
                    onsale: null,
                    number: 3
                }, {
                    id: 3,
                    name: '空氣清淨機',
                    img: 'https://imgur.com/Ifl0c9e.png',
                    price: 13999,
                    onsale: 8999,
                    number: 2
                }
            ],
        }
    },
    computed: {
        countAll () {
            return this.items.reduce((cur, el) => cur + (el.number * (el.onsale ? el.onsale : el.price)), 0);
        }
    },
    methods: {
        minusNum (i) {
            this.items[i].number--;
        },
        plusNum (i) {
            this.items[i].number++;
        },
        getItemTotal(price, num) {
            return price * num;
        },
        remove (i) {
            this.items.splice(i, 1)
        },
        goback() {
            window.history.go(-1)
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

    @keyframes checkBtnAnimation
        0%
            transform: translateX(10%)
        50%
            transform: translateX(20%)
        100%
            transform: translateX(30%)
    @keyframes continueBtnAnimation
        0%
            transform: translateX(-10%)
        50%
            transform: translateX(-20%)
        100%
            transform: translateX(-30%)
    *
        margin: 0
        padding: 0
        list-style: none
    .container
        width: 80%
        margin: 5% 10%
        .shopcart-title, .shopcart-item, .shopcart-count
            display: flex
            align-items: center
            justify-content: space-between
        .shopcart-item
            &:hover
                background: $lightgray
        .shopcart-count
            border-top: 1px solid #ddd
            margin-top: 1%
            padding-top: 1%
        .shopcart-checkout
            margin-top: 1%
            float: right
            // margin-right: 15%
            width: 50%
        .img
            display: flex
            align-items: center
            justify-content: center
            width: 100%
            img
                display: block
                width: 50%
        .item-price
            display: flex
            align-items: center
            justify-content: center
            font-family: 'Raleway', sans-serif
            .price.strike
                margin-left: 3px
                text-decoration: line-through
                font-size: 12px
                color: #888
        .buy-num
            display: flex
            justify-content: center
            border: 1px solid #ddd
            border-radius: 5px
            font-size: 18px
            width: 100%
            .btn-num-minus, .btn-num-plus, .num
                border: 0
                padding: 2%
                font-size: 18px
                text-align: center
                outline: none
            .num
                width: 50%
            .btn-num-minus, .btn-num-plus
                width: 25%
            .btn-num-minus
                border-right: 1px solid #ddd
                border-radius: 5px 0 0 5px
            .btn-num-plus
                border-left: 1px solid #ddd
                border-radius: 0 5px 5px 0
        .item-total
            font-family: 'Raleway', sans-serif
        .remove
            border: 0px
            background: transparent
            font-size: 24px
            outline: none
        .checkout, .continueshop
            padding: 1% 2%
            margin: 1%
            font-size: 16px
            border: 0
            background: $darkgray
            transition: .5s
            outline: none
            border-radius: 5px
            a
                color: $navyblue
                text-decoration: none
        .checkout
            &:hover
                background: $hnavyblue
                animation: checkBtnAnimation 2s .1s infinite linear forwards
            &:hover a
                color: $lightgray
        .continueshop
            &:hover
                background: $hnavyblue
                animation: continueBtnAnimation 2s .1s infinite linear forwards
                &:hover a
                    color: $lightgray
    .column
        // border: 1px solid #ddd
        width: 20%
        text-align: center
</style>