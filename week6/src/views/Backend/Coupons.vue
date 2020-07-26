<template lang="pug">
  .container
    button.add(
      data-action="add"
      @click="openPage()"
    )
      font-awesome-icon(:icon="['fas', 'plus']")
      |新增
    table
      tr.title
        th.col 折扣名稱
        th.col 折扣碼
        th.col 折扣
        th.col 啟用狀態
        th.col 到期日
        th.col 編輯
      tr.item-list(
        v-for="(item, index) in coupons"
        :key="item.id"
        :data-id="item.id"
        :data-index="index"
      )
        td.col
          .text {{ item.title }}
        td.col
          .text {{ item.code }}
        td.col
          .text {{ item.percent }}%
        td.col
          font-awesome-icon(
            :class="item.enabled ? 'check' : 'times'"
            :icon="item.enabled ? ['fas', 'check'] : ['fas', 'times']")
        td.col
          .text {{ item.deadline.datetime }}
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
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { getBackendAllCupons } from '../../apis/utils';

export default {
  created() {
    const loader = this.$loading.show();
    getBackendAllCupons()
      .then((resp) => {
        this.setCoupons(resp.data.data);
        loader.hide();
      });
  },
  computed: {
    ...mapGetters(['coupons']),
  },
  methods: {
    ...mapActions(['setCoupons']),
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
.container
  width: 95%
  margin: 0 2.5%
.add
  float: right
  padding: .5%
  margin: 1% 0
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
    width: 36px
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
        height: 200px
        background-position: left
        background-repeat: no-repeat
        background-size: cover
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
</style>
