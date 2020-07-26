<template lang="pug">
  .container
    table
      tr.title
        th.col 預覽
        th.col id
        th.col 路徑
        th.col 編輯
      tr.item-list(
        v-for="(item, index) in files"
        :key="item.id"
        :data-id="item.id"
        :data-index="index"
      )
        td.col(:style="{backgroundImage: `url(${item.path})`}")
        td.col
          .text {{ item.id }}
        td.col
          .text {{ item.path }}
        td.col
          button.del(@click="deleteProduct(index)")
            font-awesome-icon(:icon="['fas', 'trash-alt']")
            |刪除
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { getFile } from '../../apis/utils';

export default {
  created() {
    const loader = this.$loading.show();
    getFile()
      .then((resp) => {
        this.setFiles(resp.data.data);
        loader.hide();
      });
  },
  computed: {
    ...mapGetters(['files']),
  },
  methods: {
    ...mapActions(['setFiles']),
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
