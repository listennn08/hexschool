<template lang="pug">
    #pay-page
        message
        .container
            .preview-title
                font-awesome-icon.titleIcon(:icon="['far', 'clipboard']")
                | &nbsp; 購物清單
                button.collapse(@click)
            .buy-item-preview
                .preview-content(ref="preivew")
                    .buy-item(v-for="( item, index ) in products")
                        div: img(:src="item.product.imageUrl")
                        div {{ item.product.title | hideText }}
                        div x{{ item.quantity }}
                        div {{ getItemTotal(index) | cash }}
                    .total 總額
                        span {{ countAll| cash }}
            .buyer-title
                font-awesome-icon.titleIcon(:icon="['fas', 'info-circle']")
                | &nbsp; 訂單資訊
            .buyer-detail
                validation-observer(
                    v-slot="{ invalid }"
                    @submit.prevent="submitForm()"
                )
                    form
                        validation-provider.row(
                            name="姓名"
                            v-slot="{ errors, classes }"
                            rules="required"
                        )
                            label.no-break-label(for="name") 姓名
                            input#name.input(
                                type="text"
                                v-model="form.name"
                                :class="classes"
                                required
                            )
                            span(
                                v-if="errors[0]"
                            ).warning {{ errors[0] }}
                        validation-provider.row(
                            name="電話"
                            v-slot="{ errors, classes }"
                            rules="required|digits:10"
                        )
                            label.no-break-label(for="phone") 電話
                            input#phone.input(
                                type="tel"
                                v-model="form.tel"
                                :class="classes"
                                maxlength=10
                                required
                            )
                            span(
                                v-if="errors[0]"
                            ).warning {{ errors[0] }}
                        validation-provider.row(
                            name="信箱"
                            v-slot="{ errors, classes }"
                            rules="required|email"
                        )
                            label.break-label(for="email") 信箱
                            input#email.input(
                                type="email"
                                v-model="form.email"
                                :class="classes"
                                required
                            )
                            span(
                                v-if="errors[0]"
                            ).warning {{ errors[0] }}
                        validation-provider.row(
                            name="收件地址"
                            v-slot="{ errors, classes }"
                            rules="required"
                        )
                            label.break-label(for="address") 收件地址
                            input#address.input(
                                type="text"
                                v-model="form.address"
                                :class="classes"
                                required)
                            span(
                                v-if="errors[0]"
                            ).warning {{ errors[0] }}
                        .row
                            label(for="remark") 備註
                                small.option （選填)
                            textarea#remark.remark(rows="5" v-model="form.remark")
                        validation-provider.row(
                            name="付款方式"
                            v-slot="{ errors, classes }"
                            rules="required"
                        )
                            label(
                                for="paytype"
                            ) 付款方式
                            select.pay-type(
                                name="payment"
                                id="paytype"
                                :class="classes"
                                v-model="form.payment"
                            )
                                option(value="" disabled) ---請選擇付款方式---
                                option(
                                    v-for="(type, index) in payment"
                                    :key="index"
                                    :value="type"
                                ) {{ type }}
                            span(
                                v-if="errors[0]"
                            ).warning {{ errors[0] }}
                        .check-block
                            button.back(type="button" @click="$router.go(-1)") 上一頁
                            button.check 確認訂單
</template>
<script>
import { mapActions } from 'vuex';
import { getCart, createOrder } from '../apis/utils';

export default {
    name: 'pay_page',
    data() {
        return {
            products: [],
            payment: ['WebATM', 'ATM', 'Barcode', 'Credit', 'ApplePay', 'GooglePay'],
            form: {
                name: '',
                tel: '',
                email: '',
                payment: '',
                address: '',
                remark: '',
            },
        };
    },
    created() {
        this.getShopCartData();
    },
    computed: {
        countAll() {
            return this
                .products
                .reduce(
                    (cur, el) => cur + (el.quantity * (el.product.price
                        ? el.product.price
                        : el.product.origin_price)),
                    0,
                );
        },
    },
    methods: {
        ...mapActions(['setMsg']),
        getShopCartData() {
            const loader = this.$loading.show({
                container: this.$refs.preivew,
                isFullPage: false,
            });
            getCart()
                .then((resp) => {
                    this.products = resp.data.data;
                    loader.hide();
                });
        },
        getItemTotal(index) {
            return this.products[index].quantity * (this.products[index].product.onsale
                ? this.products[index].product.onsale
                : this.products[index].product.price);
        },
        cashFormat(val) {
            return `$${val.toString().replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')}`;
        },
        submitForm() {
            createOrder(this.form)
                .then(() => {
                    this.setMsg({
                        msg: '訂單已建立',
                        type: true,
                    });
                });
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
        .container
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
                    div
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
                    span
                        margin-left: 5%
            .row:nth-of-type(4)
                label
                    margin: 1% 0
                    align-self: flex-start
            .row
                display: flex
                flex-wrap: wrap
                margin-bottom: 1%
                align-items: center
                width: 100%
                label
                    color: #888
                label:not(.chklabel)
                    width: 15%
                    margin-right: 1%
                .no-break-label
                    &:last-child
                        width: 10%
                label
                    display: inline-block
                    text-align: left
                    font-family: 'Noto Sans TC', sans serif
                    .option
                        color: $goldyellow
                .input, textarea, .pay-type
                    width: 75%
                    border: 1px solid $darkgray
                    outline: 0
                    padding: 2%
                    border-radius: 5px
                    &:focus
                        box-shadow: 5px  5px 10px $darkgrayn
                .pay-type
                    width: 80%
                .input.failed, .pay-type.failed
                    border: 1px solid rgba(red, .8)
                    &:focus
                        box-shadow: 5px  5px 10px rgba(red, .5)
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
            .warning
                margin-left: 15%
                display: block
                color: rgba(red, .8)
</style>
