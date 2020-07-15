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
        button.add.circle(
            data-action="add"
            @click="openPage()"
            :class="{show: addShow}"
        )
            font-awesome-icon(:icon="['fas', 'plus']")
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
                td.col {{ item.options.store ? item.options.store : 0 }}
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
        productPage(
            :class="{open: productPage.open}"
            :productPage.sync="productPage.open"
            )
        template(v-if="pagination.current_page")
            pagination(:pagination="pagination")
        vue-confirm-dialog
</template>
<script>
import { mapActions, /* mapState, */ mapGetters } from 'vuex';
import productPage from './product-page.vue';
import pagination from '../components/pagination.vue';
import { getBackendAllData, getBackendDataDetail, deleteData } from '../apis/utils';

export default {
    name: 'product-manage',
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
            productPage: {
                open: false,
            },
            pagination: {},
            windowTop: null,
            addShow: false,
        };
    },
    created() {
        const loader = this.$loading.show();
        getBackendAllData()
            .then((resp) => {
                const products = resp.data.data.map((el) => {
                    el.options = el.options
                        ? JSON.parse(el.options)
                        : { store: null };
                    getBackendDataDetail(el.id)
                        .then((r) => {
                            el.description = r.data.data.description;
                        });
                    return el;
                });
                this.setProducts(products);
                loader.hide();
                this.pagination = resp.data.meta.pagination;
            });
    },
    mounted() {
        window.addEventListener('scroll', this.onScroll);
    },
    computed: {
        ...mapGetters(['products']),
    },
    watch: {
        'pagination.current_page': {
            handler() {
                const { current_page: cur } = this.pagination;
                const loader = this.$loading.show();
                getBackendAllData(cur)
                    .then((resp) => {
                        const products = resp.data.data.map((el) => {
                            el.options = el.options
                                ? JSON.parse(el.options)
                                : { store: null };
                            getBackendDataDetail(el.id)
                                .then((r) => {
                                    el.description = r.data.data.description;
                                });
                            return el;
                        });
                        this.setProducts(products);
                        loader.hide();
                    });
            },
        },
    },
    methods: {
        ...mapActions(['setProducts', 'delProduct', 'setTempProduct', 'clearTempProduct']),
        openPage(index) {
            if (index || index === 0) {
                this.setTempProduct(this.products[index]);
            } else {
                this.clearTempProduct();
            }
            this.productPage.open = !this.productPage.open;
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
                        deleteData(this.products[index].id)
                            .then(() => {
                                this.$confirm({
                                    message: `已刪除 ${this.products[index].title}`,
                                    button: {
                                        no: 'OK',
                                    },
                                });
                            });
                        this.delProduct(index);
                    }
                },
            });
        },
        onScroll() {
            this.windowTop = window.top.scrollY; /* or: e.target.documentElement.scrollTop */
            if (this.windowTop > 200) {
                this.addShow = true;
            } else {
                this.addShow = false;
            }
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

.item-manage
    width: 95%
    margin: 0 2.5%
    position: relative
    .nav
        width: 95%
        padding: 1%
        position: fixed
        top: 0
        left: 2.5%
        background: $navyblue
        color: $lightgray
        font-family: 'Noto Sans TC', sans-serif
        font-weight: 700
        text-align: left
        box-sizing: border-box
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
        transition: .5s
        outline: none
        &:hover
            color: $lightgray
            background: $navyblue
        &.circle
            position: fixed
            box-shadow: 2px 2px 5px $navyblue
            width: 2%
            border-radius: 50%
            bottom: 2%
            right: 2%
            transform: translate(210%, 0)
            &.show
                transform: translate(0, 0)
            &:hover
                transform: translate(0, -10%)
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
                    margin: 1%
                    padding: 5%
                    outline: none
                    transition: .5s
                    &:hover
                        color: $lightgray
                        background: $navyblue
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
