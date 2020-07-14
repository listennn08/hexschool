<template lang="pug">
    .banner(:class="{show: msg.text}")
        .message(:class="msg.type ? 'green' : 'red'")
            font-awesome-icon(:icon="['fas', 'exclamation-circle']")
            | {{ msg.text }}
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'message',
    computed: mapState({
        msg: (state) => state.msg,
    }),
    methods: {
        ...mapActions,
    },
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
    position: absolute
    margin-top: 2%
    width: 100%
    top: 0
    right: -100%
    transition: .5s
    transform: translateX(0)
    &.show
        transform: translateX(-12%)
    .message
        width: 10%
        padding: 1%
        border: 1px solid rgba($navyblue, .8)
        box-shadow: 5px 5px 10px rgba($navyblue, .8)
        background: #fff
        &.red
            color: rgba(red, .8)
        &.green
            color: rgba(green, .8)
</style>
