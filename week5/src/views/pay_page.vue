<template lang="pug">
    #pay-page
        .container
            form
                .preview-title
                    span
                        font-awesome-icon.titleIcon(:icon="['fas', 'thumbtack']")
                        | &nbsp; 購物清單
                .buy-item-preview
                    .preview-content
                        .buy-item(v-for="( item, index ) in items")
                            span: img(:src="item.img")
                            span {{ item.name }}
                            span x{{ item.number}}
                            span {{ cashFormat(getItemTotal(index)) }}
                        .total
                            span.total-title 總額
                            span.count {{ cashFormat(countAll) }}
                    .preview-collapse
                .buyer-title: span 訂單資訊
                .buyer-detail
                    .row
                        label.no-break-label(for="name") 姓名
                        input#name.small-input(required)
                        label.no-break-label(for="phone") 電話
                        input#phone.small-input(type="tel" required)
                    .row
                        label.break-label(for="email") 信箱
                        input#email.input(required)
                    .row
                        label.break-label(for="address") 收件地址
                        input#addr.input(required)
                    .row
                        label(for="remark") 備註
                            small.option （選填)
                        textarea#remark.remark(rows="5")
                    .row
                        label 付款方式
                        label.chklabel(
                            v-for="(type, index) in paytype"
                            :for="type"
                        )
                            input.pay-type(
                                type="radio"
                                name="pay-type"
                                :key="index"
                                :id="type"
                                :value="type"
                                v-model="selected"
                            )
                            | {{ type }}
                .check-block
                    button.back(type="button") 上一頁
                    button.check(type="submit") 確認付款
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
                    number: 1,
                }, {
                    id: 2,
                    name: '空氣清淨機',
                    price: 13999,
                    img: 'https://imgur.com/Ifl0c9e.png',
                    onsale: null,
                    number: 3,
                }, {
                    id: 3,
                    name: '空氣清淨機',
                    img: 'https://imgur.com/Ifl0c9e.png',
                    price: 13999,
                    onsale: 8999,
                    number: 2,
                },
            ],
            paytype: ['WebATM', 'ATM', 'Barcode', 'Credit', 'ApplePay', 'GooglePay'],
            selected: '',
        };
    },
    watch: {
        selected() {
            console.log(this.selected);
        },
    },
    computed: {
        countAll() {
            return this
                .items
                .reduce((cur, el) => cur + (el.number * (el.onsale ? el.onsale : el.price)), 0);
        },
    },
    methods: {
        getItemTotal(index) {
            return this.items[index].number * (this.items[index].onsale
                ? this.items[index].onsale
                : this.items[index].price);
        },
        cashFormat(val) {
            return `$${val.toString().replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')}`;
        },
    },
};
</script>
<style lang="sass" scoped>
    @import url(https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;700;900&family=Raleway:wght@700;900&display=swap)
    $navyblue: #333D51
    $hnavyblue: #242b39
    $goldyellow: #D3AC2B
    $darkgray: #CBD0D8
    $darkgrayn: #46505e
    $lightgray: #F4F3EA
    *
        margin: 0
        padding: 0
        list-style: none
        #pay-page
            form
                width: 40%
                margin: 2% 30%
                text-align: center
                .buy-item-preview, .buyer-detail
                    width: 90%
                    padding: 2% 5%
                .buyer-detail
                    border-top: 1px solid $darkgray
                .buy-item-preview
                    text-align: center
                    border-top: 1px solid $darkgray
                    margin-bottom: 1%
                .preview-title, .buyer-title
                    margin-bottom: 1%
                    text-align: left
                    span
                        padding: .5% 1%
                        color: $darkgrayn
                        border-radius: 10px
                        font-weight: 700
                .preview-content
                    .buy-item
                        span
                            display: inline-block
                            width: 20%
                            vertical-align: middle
                            padding-bottom: 1%
                            img
                                display: block
                                width: 50%
                        border-bottom: 1px solid $darkgray
                        margin-bottom: 1%
                    .total
                        width: 30%
                        padding: 1% 10%
                        margin: 0 25%
                        background: rgba(211, 172, 43, .5)
                        border: 1px dotted $darkgray
                        border-radius: 20px
                        .total-title
                            margin-right: 10%
                .row:nth-of-type(4)
                    label
                        margin: 1% 0
                        align-self: flex-start
                .row
                    display: flex
                    margin-bottom: 1%
                    align-items: center
                    label
                        color: #888
                    label:not(.chklabel)
                        width: 15%
                        margin-right: 1%
                    .no-break-label
                        &:last-child
                            width: 10%
                    .chklabel
                        margin: 0 1%
                    label, .pay-type-block
                        display: inline-block
                        text-align: left
                        font-family: 'Noto Sans TC', sans serif
                        .option
                            color: $goldyellow
                    input, .pay-type-block, textarea
                        padding: 1%
                        border-radius: 5px
                    .input:not([type=radio]), .pay-type-block, textarea
                        width: 80%
                    input:not([type=radio]), textarea
                        border: 1px solid $darkgray
                        outline: 0
                        &:focus
                            box-shadow: 5px  5px 10px $darkgrayn
                    .small-input
                        width: 30%
                        margin-right: 2%
                .check-block
                    border-top: 1px solid $darkgray
                    button
                        margin-top: 1%
                        margin-left: 2%
                        padding: 2%
                        border: 0
                        border-radius: 5px
                        font-family: 'Noto Sans TC', sans serif
                        background: $lightgray
                        outline: none
                        transition: .2s
                        background: $lightgray
                        color: $navyblue
                        &:hover
                            background: $darkgrayn
                            color: $lightgray
</style>
