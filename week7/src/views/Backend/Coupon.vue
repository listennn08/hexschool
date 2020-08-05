<template lang="pug">
  .modal
    .modal-background(@click="togglePage()")
    .modal-card
      header.modal-card-head
          h4.is-size-4 {{ !coupon.id ? '新增' : '更新'}}優惠
      section.modal-card-body
        .modal-conetnt
          .field.has-text-left
            label 名稱
            .control
              input.input(type="text" v-model="coupon.title")
            label 折扣碼
            .control
              input.input(type="text" v-model="coupon.code")
            label 折扣
            .control
              input.input(type="number" v-model="coupon.percent")
            label 到期日
            .control
              input.input(v-model="coupon.deadline.datetime")
            label 啟用狀態
            .control
              input.switch(
                :class="{'is-success': coupon.enabled}"
                :id="coupon.id"
                type="checkbox"
                v-model="coupon.enabled"
                @change="changeAttr(coupon.id, coupon.enabled)"
              )
              label(
                :for="coupon.id"
              ) {{ checkEnabled(coupon.enabled) }}
      footer.modal-card-foot
        button.button.is-cus-primary(
          v-if="!coupon.id"
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
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['coupon']),
    checkEnabled() {
      return (enabled) => (enabled ? '啟用' : '未啟用');
    },
  },
  methods: {
    ...mapActions(['addCoupon', 'updateCoupon', 'deleteCoupon', 'clearTempCoupon', 'togglePage']),
    edit() {

    },
    cancel() {
      this.clearTempCoupon();
      this.togglePage();
    },
    changeAttr(id, enable) {
      console.log(id, enable);
    },
  },
};
</script>
<style lang="sass" scoped>
@import url(https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;900&family=Raleway:wght@500;700&display=swap)
.modal
  font-family: 'Noto Sans TC', sans serif
  position: fixed
</style>
