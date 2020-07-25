<template lang="pug">
  .banner(:class="{show: msg.text}")
    .message(:class="msg.type ? 'green' : 'red'")
      font-awesome-icon(:icon="['fas', 'exclamation-circle']")
      | {{ msg.text }}
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'message',
  computed: mapGetters(['msg']),
};
</script>
<style lang="sass" scoped>
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
  .banner
    position: fixed
    margin-top: 2%
    width: 25%
    top: 50%
    right: 50%
    left: 50%
    transition: .5s
    transform: scale(0)
    z-index: 1000
    &.show
      transform: scale(1)
    .message
      width: auto
      padding: 1%
      border: 1px solid rgba($navyblue, .8)
      box-shadow: 5px 5px 10px rgba($navyblue, .8)
      background: #fff
      &.red
        color: rgba(red, .8)
      &.green
        color: rgba(green, .8)
</style>
