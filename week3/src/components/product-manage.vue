<template lang="pug">
    #item-manage
        .nav
            .nav-title: h2 產品管理介面
        button.add(
            data-action="add"
            @click="openPage()"
            )
            font-awesome-icon(:icon="['fas', 'plus']")
            |新增
        ul.edit
            li.title
                .tr
                    .col: span 分類
                    .col: span 圖片
                    .col: span 標題
                    .col: span 說明
                    .col: span 描述
                    .col: span 是否啟用
                    .col: span 原價
                    .col: span 售價
                    .col: span 庫存
                    .col: span 編輯
            li.list(
                v-for="(item, index) in products"
                :key="index"
            )
                .tr(:data-id="item.id" :data-index="index")
                    .col
                        span
                            .text {{item.category }}
                    .col
                        img(:src="item.imageUrl")
                    .col
                        span
                            .text {{ item.title }}
                    .col
                        span
                            .text {{ item.content }}
                    .col
                        span
                            .text {{ item.description }}
                    .col
                        span: font-awesome-icon(
                            :class="item.enabled ? 'check' : 'times'"
                            :icon="item.enabled ? ['fas', 'check'] : ['fas', 'times']")
                    .col
                        span {{ item.origin_price }}
                    .col
                        span {{ item.price }}
                    .col
                        span {{ item.options.store }}
                    .col
                        span
                            button.update(
                                data-action="update"
                                @click="openPage(index)"
                            )
                                font-awesome-icon(:icon="['fas', 'edit']")
                                |修改
                            button.del(@click="deleteProduct(index)")
                                font-awesome-icon(:icon="['fas', 'trash-alt']")
                                |刪除
        productPage(:product="product" @newProduct="addProduct")
</template>
<script>
import productPage from './product-page.vue';
export default {
    name: 'product-manage',
    components: {
        productPage
    },
    data() {
        return {
            api: {
                base: "https://course-ec-api.hexschool.io/api/",
                uuid: "dd62b88f-6f23-42a4-8551-b1cb4552bb3e",
                getAllData: "/ec/products"
            },
            products: [],
            product: {
                imageUrl: [],
                options: {
                    store: 0
                }
            }
        };
    },
    created() {
        this
            .$http
            .get(`${this.api.base}${this.api.uuid}${this.api.getAllData}`)
            .then((resp) => {
                this.products = resp.data.data;
                this.products = this
                    .products
                    .map((el) => {
                        let o = Object.assign({}, el);
                        o.options = {
                            store: Math.floor(Math.random() * 100)
                        };
                        return o;
                    });
            });
    },
    mounted() {
        window.addEventListener('click', function (e) {
            let c = e.target.dataset.action || e.target.parentNode.dataset.action;
            switch (c) {
                case 'add':
                    break;
                case 'update':
                    break;
                default:
                    document
                        .querySelector('#newDataPage')
                        .classList
                        .remove('open');
                    break;
            }
        });
        document
            .querySelector('#newDataPage .container')
            .addEventListener('click', function (e) {
                e.stopPropagation();
            });
    },
    methods: {
        openPage(index) {
            if (index || index == 0) {
                this.product = JSON.parse(JSON.stringify(this.products[index]));
            } else {
                this.product = {
                    options: {
                        store: null
                    }
                };
            }
            document
                .querySelector('#newDataPage')
                .classList
                .toggle('open');
        },
        addProduct(obj) {
            this.$set(this.product, obj);
            console.log(this.product)
            if (this.product.id) {
                this
                    .products
                    .forEach((item, i) => {
                        if (item.id == this.product.id) {
                            this.$set(this.products, i, this.product);
                        }
                    })
            } else {
                this.product.id = new Date().getTime();
                this
                    .products
                    .push(this.product);
            }
            this.product = {
                image: [],
                options: {
                    store: null
                }
            }
        },
        deleteProduct(index) {
            if (confirm('確認刪除？（刪除後無法復原）')) {
                this
                    .products
                    .splice(index, 1);
            }
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
$darkgrayn: #46505e
$lightgray: #F4F3EA

*
    margin: 0
    padding: 0
    list-style: none
    box-sizing: border-box
body
    
#item-manage
    width: 95%
    margin: 0 2.5%
    position: relative
    .nav
        width: 95%
        padding: 1%
        position: fixed
        top: 0
        background: $navyblue
        color: $lightgray
        font-family: 'Noto Sans TC', sans-serif
        font-weight: 700
    .add
        float: right
        padding: .5%
        margin-bottom: 1%
        margin-top: 10%
        font-family: 'Noto Sans TC', sans-serif
        border: 1px solid $navyblue
        border-radius: 5px
        color: $navyblue
        background: $lightgray
    .edit
        clear: right
        margin-top: 2%
        width: 100%
        .title, .list
            width: 100%
            .tr
                display: flex
                border-right: 1px solid $navyblue
                .col
                    width: 10%
                    font-family: 'Noto Sans TC', sans-serif
                    &:not(:last-of-type)
                        border-right: 1px solid $navyblue
                    span
                        width: 100%
                        display: flex
                        align-items: center
                        justify-content: center
                        white-space: nowrap
        .title
            background: $navyblue
            color: $lightgray
            font-family: 'Noto Sans TC', sans-serif
            font-weight: 700
            .tr
                .col:not(:last-child)
                    border-right: 1px solid $lightgray
        .list
            border-top: 1px solid $navyblue
            border-left: 1px solid $navyblue
            font-weight: 500
            &:last-of-type
                border-bottom: 1px solid $navyblue
            .tr
                .col
                    &:first-of-type, &:nth-of-type(7), &:nth-of-type(8),  &:nth-of-type(9)
                        text-transform: uppercase
                        font-family: 'Raleway', sans-serif
                    span
                        height: 100%
                        .text
                            width: 96%
                            padding: 2%
                            text-align: center
                            overflow: hidden
                            text-overflow: ellipsis
                        .check
                            color: green
                        .times
                            color: red
                        button
                            font-family: 'Noto Sans TC', sans-serif
                            border: 1px solid $navyblue
                            border-radius: 5px
                            color: $navyblue
                            background: $lightgray
                            padding: 2%
                            font-awesome-icon
                                margin-right: 1%
                        .update
                            margin-right: 2%
                    img
                        vertical-align: middle
                        width: 100%
    #newDataPage
        transform-origin: center
        transition: 1s
        transform: scale(0)
        &.open
            transform: scale(1)
            animation: openPage .5s 1 ease-in-out forwards
        &.hide
            animation: openPage .5s 1 ease-in-out reverse forwards
@keyframes openPage
    from
        background: rgba(0, 0, 0, 0)
    99.9%
        background: rgba(0, 0, 0, 0)
    to
        background: rgba(0, 0, 0, .4)
</style>