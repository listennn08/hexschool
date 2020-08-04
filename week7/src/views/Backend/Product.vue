<template lang="pug">
  .modal(
    :class="{'is-active': page.open}"
  )
    .modal-background(@click="cancel")
    .modal-card
      header.modal-card-head
        p.is-size-4.is-full {{ !tempProduct.id ? '新增' : '更新'}}商品
      section.modal-card-body
        .field.has-text-left
            .control
              input#enabled.switch(
                :class="{'is-success': tempProduct.enabled}"
                :id="tempProduct.id"
                type="checkbox"
                v-model="tempProduct.enabled"
              )
              label(
                :for="tempProduct.id"
              ) {{ checkEnabled(tempProduct.enabled) }}
            label(for="title") 名稱
            .control
              input#title.input.is-expended(type="text" v-model="tempProduct.title")
            label(for="ategory") 分類
            .control
              input#category.input(type="text" v-model="tempProduct.category")
            label(for="content") 商品敘述
            .control
              textarea#content.textarea(cols="25" rows="5" v-model="tempProduct.content")
            label(for="description") 商品說明
            .control
              textarea#description.textarea(cols="25" rows="5" v-model="tempProduct.description")
            label(for="origin_price") 原價
            .control
              input#origin_price.input(type="number" v-model="tempProduct.origin_price")
            label(for="price") 售價
            .control
              input#price.input(type="number" v-model="tempProduct.price")
            label(for="imageUrl") 輸入圖片網址或上傳圖片
            .control
              input#imageUrl.input(type="text" v-model.lazy="tempProduct.imageUrl[0]")
              input#uploadImg(type="file")
            section.section(v-if="tempProduct.imageUrl")
              carousel(:images="tempProduct.imageUrl")
      footer.modal-card-foot
        button.button.is-cus-primary(
          v-if="!tempProduct.id"
          data-action="create"
          type="button"
          @click.prevent="edit"
        ) 新增
        button.button.is-cus-primary(
          v-else
          data-action="update"
          type="button"
          @click.prevent="edit") 更新
        button.button(
          @click="cancel"
          type="button") 取消
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import carousel from '@/components/Carousel.vue';
import {
  getBackendDataDetail, createData, updateData, uploadFile,
} from '../../apis/utils';

export default {
  name: 'productPage',
  components: {
    carousel,
  },
  props: {
    addNewItem: Boolean,
  },
  data() {
    return {
      formData: new FormData(),
    };
  },
  computed: {
    ...mapGetters(['tempProduct', 'page', 'loading']),
    checkEnabled() {
      return (enabled) => (enabled ? '啟用' : '未啟用');
    },
  },
  watch: {
    'page.open': {
      handler() {
        this.loadProduct();
      },
    },
  },
  methods: {
    ...mapActions([
      'setMsg', 'clearMsg', 'addProducts', 'editProduct', 'setTempProduct', 'clearTempProduct', 'togglePage', 'toggleLoading',
    ]),
    loadProduct() {
      if (this.tempProduct.id) {
        this.toggleLoading();
        getBackendDataDetail(this.tempProduct.id)
          .then((resp) => {
            const { data } = resp.data;
            if (!data.options) {
              data.options = {
                store: null,
              };
            } else {
              data.options = JSON.parse(data.options);
            }
            this.setTempProduct(data);
            this.toggleLoading();
          });
      }
    },
    edit(e) {
      const { action } = e.target.dataset;
      const uFile = document.querySelector('#uploadImg').files[0];
      this.formData.append('file', uFile);
      if (uFile) {
        uploadFile(this.formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((resp) => {
            console.log(resp.data.data.id, resp.data.data.path);
            document.querySelector('#uploadImg').value = '';
          });
      }
      if (action === 'create') {
        this.toggleLoading();
        this.tempProduct.options = JSON.stringify(this.tempProduct.options);
        createData(this.tempProduct)
          .then(() => {
            this.$emit('update:addNewItem', true);
            this.clearTempProduct();
            this.toggleLoading();
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
.modal
  position: fixed
.is-full
  text-align: left
  width: 100%
  // *
  //   margin: 0
  //   padding: 0
  //   list-style: none
  //   box-sizing: border-box
  // .newDataPage
  //   z-index: 222
  //   position: fixed
  //   top: 0
  //   left: 0
  //   width: 100%
  //   height: 100%
  //   display: flex
  //   align-items: center
  //   justify-content: center
  //   .container
  //     position: relative
  //     width: 100%
  //     display: flex
  //     flex-wrap: wrap
  //     border: 1px solid #ddd
  //     background: #fff
  //     width: 800px
  //     margin: 10px 20px
  //     padding: 0
  //     .loading
  //       position: absolute
  //       top: 50%
  //       right: 50%
  //       opacity: 0
  //       // transition: 1s
  //       &.show
  //         opacity: 1
  //     .row-100
  //       width: 100%
  //       padding: 1%
  //       margin-bottom: 2%
  //     .row-title
  //       background: $lightgray
  //       .page-title
  //         width: 100%
  //         span
  //           display: inline-block
  //           padding: 0 2px
  //           h3
  //             font-family: 'Noto Sans TC', sans-serif
  //             font-weight: 700
  //             color: $navyblue
  //     .row
  //       width: 46%
  //       margin: 0 1%
  //       padding: 1%
  //       display: flex
  //       flex-wrap: wrap
  //       justify-content: flex-start
  //       align-items: center
  //       .img
  //         width: 30%
  //         .preview
  //           width: 100%
  //       #create.hide, #update.hide
  //         display: none
  //     label
  //       width: 100%
  //       font-family: 'Noto Sans TC', sans-serif
  //       font-weight: 700
  //       color: $navyblue
  //       text-align: left
  //       &:not(:last-of-type)
  //         display: block
  //     input:not([type=checkbox]), textarea
  //       width: 100%
  //       padding: 5px
  //       border: 1px solid #aaa
  //       border-radius: 5px
  //       outline: none
  //       &:focus
  //         box-shadow: 0 0 5px #888
  //       &::-webkit-outer-spin-button, &::-webkit-inner-spin-button
  //         -webkit-appearance: none
  //         margin: 0
  //     button
  //       width: 20%
  //       float: right
  //       padding: 5px
  //       border: 1px solid #aaa
  //       border-radius: 5px
  //       outline: none
  //       color: $navyblue
  //       background: $lightgray
  //       transition: .5s
  //       &:hover
  //         color: $lightgray
  //         background: $navyblue
</style>
