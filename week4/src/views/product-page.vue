<template lang="pug">
    #newDataPage.newDataPage(@click="toggle" )
        .container(ref="productPage")
            .loading(:class="{show: loading}")
                font-awesome-icon.fa-3x.fa-spin(:icon="['fa', 'spinner']")
            .row-100.row-title
                .page-title
                    span: h3 {{ !pid ? '新增' : '更新'}}商品
            .row
                label(for="title") 名稱
                input#title.required(type="text" v-model="tempProduct.title")
            .row
                label(for="ategory") 分類
                input#category(type="text" v-model="tempProduct.category")
            .row
                label(for="content") 商品敘述
                textarea#content(cols="25" rows="5" v-model="tempProduct.content")
            .row
                label(for="description") 商品說明
                textarea#description(cols="25" rows="5" v-model="tempProduct.description")
            .row
                label(for="origin_price") 原價
                input#origin_price(type="number" v-model="tempProduct.origin_price")
            .row
                label(for="price") 售價
                input#price(type="number" v-model="tempProduct.price")
            .row
                label(for="imageUrl") 輸入圖片網址
                input#imageUrl(type="text" v-model.lazy="tempProduct.imageUrl[0]")
                //- input#uploadImg(type="file")
                .img
                    img#preview(:src="tempProduct.imageUrl[0]" alt="")
            .row
                label(for="price") 庫存
                input#store(
                    type="number"
                    v-if="tempProduct.options"
                    v-model="tempProduct.options.store"
                    placeholder="0")
                label(for="unit") 單位
                input#price(type="text" v-model="tempProduct.unit")
                input#enabled(type="checkbox" v-model="tempProduct.enabled")
                label(for="enabled") 是否啟用
            .row-100
                button#create(
                    v-if="!tempProduct.id"
                    data-action="create"
                    type="button"
                    @click.prevent="edit"
                    ) 新增
                button#update(
                    v-else
                    data-action="update"
                    type="button"
                    @click.prevent="edit") 更新
                button#cancel(
                    @click="cancel"
                    type="button") 取消
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { getBackendDataDetail, createData, updateData } from '../apis/utils';

export default {
    name: 'productPage',
    data() {
        return {
            tempProduct: {
                imageUrl: [],
                options: {
                    store: 0,
                },
            },
        };
    },
    props: {
        addNewItem: Boolean,
    },
    computed: mapGetters(['pid', 'product', 'productPage', 'loading']),
    watch: {
        'productPage.open': {
            handler() {
                this.loadProduct();
            },
        },
    },
    methods: {
        ...mapActions([
            'setMsg', 'clearMsg', 'addProducts', 'editProduct', 'setTempProduct', 'clearTempProduct', 'togglePage', 'isLoading',
        ]),
        loadProduct() {
            if (this.pid) {
                this.isLoading(true);
                getBackendDataDetail(this.pid)
                    .then((resp) => {
                        this.tempProduct = resp.data.data;
                        if (!this.tempProduct.options) {
                            this.tempProduct.options = {
                                store: null,
                            };
                        } else {
                            this.tempProduct.options = JSON.parse(this.tempProduct.options);
                        }
                        this.isLoading(false);
                    });
            } else {
                this.tempProduct = this.product;
            }
        },
        edit(e) {
            const { action } = e.target.dataset;
            if (action === 'create') {
                this.isLoading(true);
                this.tempProduct.options = JSON.stringify(this.tempProduct.options);
                createData(this.tempProduct)
                    .then(() => {
                        this.$emit('update:addNewItem', true);
                        this.clearTempProduct();
                        this.isLoading(false);
                        this.togglePage();
                    })
                    .catch(() => {
                        this.tempProduct.options = JSON.parse(this.tempProduct.options);
                        this.setMsg({
                            msg: `上傳${this.tempProduct.title || ''}失敗`,
                            type: false,
                        });
                        setTimeout(() => { this.clearMsg(); }, 1000);
                    });
            } else if (action === 'update') {
                this.tempProduct.options = JSON.stringify(this.tempProduct.options);
                updateData(this.tempProduct.id, this.tempProduct)
                    .then((resp) => {
                        const prod = resp.data.data;
                        if (typeof prod.options === 'string') {
                            prod.options = JSON.parse(prod.options);
                        }
                        this.editProduct({
                            id: prod.id,
                            data: prod,
                        });
                        this.clearTempProduct();
                        this.togglePage();
                    })
                    .catch(() => {
                        this.tempProduct.options = JSON.parse(this.tempProduct.options);
                        this.setMsg({
                            msg: `更新${this.tempProduct.title}失敗`,
                            type: false,
                        });
                        setTimeout(() => { this.clearMsg(); }, 1000);
                    });
            }
        },
        cancel() {
            this.clearTempProduct();
            this.togglePage();
        },
        toggle(e) {
            if (e.target.className.includes('newDataPage')) {
                this.clearTempProduct();
                this.togglePage();
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
        box-sizing: border-box
    #newDataPage
        z-index: 222
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: 100%
        display: flex
        align-items: center
        justify-content: center
        .container
            position: relative
            width: 100%
            display: flex
            flex-wrap: wrap
            border: 1px solid #ddd
            background: #fff
            width: 800px
            margin: 10px 20px
            padding: 0
            .loading
                position: absolute
                top: 50%
                right: 50%
                opacity: 0
                // transition: 1s
                &.show
                    opacity: 1
            .row-100
                width: 100%
                padding: 1%
                margin-bottom: 2%
            .row-title
                background: $lightgray
                .page-title
                    width: 100%
                    span
                        display: inline-block
                        padding: 0 2px
                        h3
                            font-family: 'Noto Sans TC', sans-serif
                            font-weight: 700
                            color: $navyblue
            .row
                width: 46%
                margin: 0 1%
                padding: 1%
                display: flex
                flex-wrap: wrap
                justify-content: flex-start
                align-items: center
                .img
                    width: 30%
                    #preview
                        width: 100%
                #create.hide, #update.hide
                    display: none
            label
                width: 100px
                font-family: 'Noto Sans TC', sans-serif
                font-weight: 700
                color: $navyblue
                text-align: left
                &:not(:last-of-type)
                    display: block
            input:not([type=checkbox]), textarea
                width: 100%
                padding: 5px
                border: 1px solid #aaa
                border-radius: 5px
                outline: none
                &:focus
                    box-shadow: 0 0 5px #888
                &::-webkit-outer-spin-button, &::-webkit-inner-spin-button
                    -webkit-appearance: none
                    margin: 0
            button
                width: 20%
                float: right
                padding: 5px
                border: 1px solid #aaa
                border-radius: 5px
                outline: none
                color: $navyblue
                background: $lightgray
                transition: .5s
                &:hover
                    color: $lightgray
                    background: $navyblue
</style>
