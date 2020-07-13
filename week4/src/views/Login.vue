<template lang="pug">
    .wrap
        .login
            label(for="email") 信箱
            input#email(type="account" required placeholder="example@example.com")
            label(for="pwd") 密碼
            input#pwd(type="password" @keyup.enter="loginFn" required)
            .btn-block
                button.login-btn(type="button" @click="loginFn") 登入
        msg(:class="{show:msg != ''}" :msg.sync="msg")
</template>
<script>
import msg from '../components/message-modal.vue';
import { Login } from '../apis/utils.js';

export default {
    components: {
        msg,
    },
    data() {
        return {
            api: {
                base: 'https://course-ec-api.hexschool.io/api/',
                login: 'auth/login',
            },
            msg: '',
        };
    },
    methods: {
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
            // this.$http
            //     .post(`${this.api.base}${this.api.login}`, {
            //         email,
            //         password,
            //     })
            Login({email, password})
                .then((resp) => {
                    document.cookie = `uuid=${resp.data.uuid}; expires=${new Date(resp.data.expire * 1000)}; path=/`;
                    document.cookie = `token=${resp.data.token}; expires=${new Date(resp.data.expire * 1000)}; path=/`;
                    this.api.uuid = resp.data.uuid;
                    this.api.token = resp.data.token;
                    this.$http.defaults.headers.Authorization = `Bearer ${resp.data.token}`;
                    this.msg = '登入成功！';
                    setTimeout(() => { this.msg = ''; }, 3000);
                    window.location = 'product-manage';
                })
                .catch(() => {
                    this.msg = '登入失敗！';
                    setTimeout(() => { this.msg = ''; }, 3000);
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
    body
        overflow: hidden
    .wrap
        width: 1440px
        height: 100%
        padding: 5%
        font-family: 'Noto Sans TC', sans-serif
        display: flex
        align-items: center
        justify-content: center
        box-sizing: border-box
        .login
            width: 25%
            padding: 2%
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
</style>
