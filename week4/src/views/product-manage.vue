<template lang="pug">
    #item-manage.item-manage
        .nav
            .nav-title: h2 產品管理介面
        button.add(
            data-action="add"
            @click="openPage()"
            )
            font-awesome-icon(:icon="['fas', 'plus']")
            |新增
        table
            tr.title
                th.col 分類
                th.col 圖片
                th.col 標題
                th.col 說明
                th.col 描述
                th.col 是否啟用
                th.col 原價
                th.col 售價
                th.col 庫存
                th.col 編輯
            tr.item-list(
                v-for="(item, index) in products"
                :key="index"
                :data-id="item.id"
                :data-index="index"
            )
                td.col
                    .text {{item.category }}
                td.col
                    img(:src="item.imageUrl")
                td.col
                    .text {{ item.title }}
                td.col
                    .text {{ item.content }}
                td.col
                    .text {{ item.description }}
                td.col
                    font-awesome-icon(
                        :class="item.enabled ? 'check' : 'times'"
                        :icon="item.enabled ? ['fas', 'check'] : ['fas', 'times']")
                td.col {{ item.origin_price }}
                td.col {{ item.price }}
                td.col {{ item.options? item.options.store : 0 }}
                td.col
                    button.update(
                        data-action="update"
                        @click="openPage(index)"
                    )
                        font-awesome-icon(:icon="['fas', 'edit']")
                        |修改
                    button.del(@click="deleteProduct(index)")
                        font-awesome-icon(:icon="['fas', 'trash-alt']")
                        |刪除
        //- template(v-if="productPage.open")
        productPage(
            :product="product"
            @newProduct="addProduct"
            :class="{open: productPage.open}"
            :productPage.sync="productPage.open"
            )
        template(v-if="pagination.current_page")
            pagination(:pagination="pagination")
        vue-confirm-dialog
</template>
<script>
import productPage from './product-page.vue';
import pagination from '../components/pagination.vue';
import utils from '../apis/utils';

export default {
    name: 'product-manage',
    mixins: [utils],
    components: {
        productPage,
        pagination,
    },
    data() {
        return {
            loadingConfig: {
                isLoading: false,
                fullPage: true,
            },
            api: {
                uuid: 'dd62b88f-6f23-42a4-8551-b1cb4552bb3e',
                getAllData: '/ec/products',
            },
            products: [],
            product: {
                imageUrl: [],
                options: {
                    store: 0,
                },
            },
            productPage: {
                open: false,
            },
            pagination: {},
        };
    },
    created() {
        const loader = this.$loading.show();
        this
            .getBackendAllData()
            .then((resp) => {
                this.products = resp.data.data;
                this.pagination = resp.data.meta.pagination;
                loader.hide();
            });
    },
    methods: {
        openPage(index) {
            if (index || index === 0) {
                this.product = JSON.parse(JSON.stringify(this.products[index]));
                console.log(this.product);
            } else {
                this.product = {
                    imageUrl: [],
                    options: {
                        store: null,
                    },
                };
            }
            this.productPage.open = !this.productPage.open;
        },
        addProduct(obj) {
            this.product = obj;
            if (this.product.id) {
                this
                    .products
                    .forEach((item, i) => {
                        if (item.id === this.product.id) {
                            this.$set(this.products, i, this.product);
                        }
                    });
            } else {
                this.product.id = new Date().getTime();
                this
                    .products
                    .push(this.product);
            }
            this.product = {
                imageUrl: [],
                options: {
                    store: null,
                },
            };
        },
        deleteProduct(index) {
            this.$confirm({
                title: '刪除',
                message: `確認刪除 ${this.products[index].title}？\r\n（刪除後無法復原）`,
                button: {
                    no: '取消',
                    yes: '刪除',
                },
                callback: (confirm) => {
                    if (confirm) {
                        this
                            .products
                            .splice(index, 1);
                    }
                },
            });
        },
    },
};
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

.item-manage
    width: 95%
    margin: 0 2.5%
    position: relative
    .nav
        width: 94%
        padding: 1%
        position: fixed
        top: 0
        background: $navyblue
        color: $lightgray
        font-family: 'Noto Sans TC', sans-serif
        font-weight: 700
        text-align: left
    .add
        float: right
        padding: .5%
        margin-bottom: 1%
        margin-top: 5%
        font-family: 'Noto Sans TC', sans-serif
        border: 1px solid $navyblue
        border-radius: 5px
        color: $navyblue
        background: $lightgray
    table
        clear: right
        margin-top: 2%
        width: 100%
        border-collapse: collapse
        border-right: 1px solid $navyblue

        .title
            background: $navyblue
            color: $lightgray
            font-family: 'Noto Sans TC', sans-serif
            font-weight: 700
            th:not(:last-of-type)
                border-right: 1px solid $lightgray
            th:last-of-type
                border-right: 1px solid $navyblue
        .item-list
            border-top: 1px solid $navyblue
            border-left: 1px solid $navyblue
            font-weight: 500
            font-family: 'Noto Sans TC', sans-serif
            &:last-of-type
                border-bottom: 1px solid $navyblue
            td.col
                border: 1px solid $navyblue
                width: 10%
                max-width: 100px
                white-space: nowrap
                &:first-of-type, &:nth-of-type(7), &:nth-of-type(8),  &:nth-of-type(9)
                    text-transform: uppercase
                    font-family: 'Raleway', sans-serif
                .text
                    width: 100%
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
    .newDataPage
        transform-origin: center
        transition: .5s
        transform: scale(0)
        &.open
            transform: scale(1)
            background: rgba(0, 0, 0, .4)
</style>
