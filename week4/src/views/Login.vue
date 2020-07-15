<template lang="pug">
    .wrap
        h1 GAGU
            small （가구）
            | 傢俱
        .login
            h3 登入
            label(for="email") 信箱
            input#email(type="account" required placeholder="example@example.com")
            label(for="pwd") 密碼
            input#pwd(type="password" @keyup.enter="loginFn" required)
            .btn-block
                button.login-btn(type="button" @click="loginFn") 登入
        .img
            img(src="../assets/login.jpg")
</template>
<script>
import { mapActions } from 'vuex';
import msg from '../components/message-modal.vue';
import { setItem } from '../cookies';
import { Login } from '../apis/utils';

export default {
    components: {
        msg,
    },
    data() {
        return {
            msg: '',
        };
    },
    methods: {
        ...mapActions(['loginMsg', 'clearMsg']),
        loginFn() {
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#pwd').value;
            if (!email) {
                document.querySelector('#email').reportValidity();
                return;
            }
            if (!password) {
                document.querySelector('#pwd').reportValidity();
                return;
            }
            Login({ email, password })
                .then((resp) => {
                    setItem('uuid', resp.data.uuid, new Date(resp.data.expire * 1000), '/');
                    setItem('token', resp.data.token, new Date(resp.data.expire * 1000), '/');
                    this.setMsg({ msg: '登入成功！', type: true });
                    setTimeout(() => {
                        this.clearMsg();
                        window.location = 'product-manage';
                    }, 1000);
                })
                .catch(() => {
                    this.setMsg({ msg: '登入失敗！', type: false });
                    setTimeout(() => this.clearMsg(), 1000);
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
    @mixin mac
        @media (max-width: 1440px)
            @content
    .wrap
        width: 90%
        max-width: 1920px
        h1
            width: 100%
            small
                font-size: 8px
        +mac
            max-width: 1440px
        height: 100%
        padding: 5%
        font-family: 'Noto Sans TC', sans-serif
        display: flex
        flex-wrap: wrap
        align-items: center
        justify-content: center
        .login
            width: 18%
            padding: 2% 1%
            box-shadow: 5px 5px 10px $navyblue
            background: #fff
            +mac
                width: 23%
            flex-wrap: wrap
            border: 2px solid $darkgrayn
            border-radius: 5%
            label
                display: flex
                align-self: flex-start
                padding: 0 5%
            input
                width: 90%
                margin: 1%
                padding: 2%
                border: 1px solid $navyblue
                border-radius: 5px
                outline: none
            .btn-block
                width: 100%
                display: flex
                justify-content: flex-end
            button
                width: 20%
                margin-top: 1%
                margin-right: 5%
                padding: 2%
                border: 1px solid $navyblue
                border-radius: 5px
                outline: none
                background: $lightgray
                color: $navyblue
                transition: 1s
                &:hover
                    background: $navyblue
                    color: $lightgray
        .img
            z-index: -999
            width: 50%
            position: absolute
            right: 0
            bottom: 0
            img
                width: 100%
                display: block
                position: relative
            &::before
                content: ''
                width: 100%
                height: 100%
                right: 0
                bottom: 0
                position: absolute
                background: linear-gradient(45deg, #fff, transparent)
                z-index: 900
</style>
