<template lang="pug">
    .wrap
        .login
            label(for="email") 信箱
            input#email(type="account" required placeholder="example@example.com")
            label(for="pwd") 密碼
            input#pwd(type="password" @keyup.enter="loginFn" required)
            .btn-block
                button.login-btn(type="button" @click="loginFn") 登入
</template>
<script>
import { mapActions } from 'vuex';
import msg from '../components/message-modal.vue';
import utils from '../apis/utils';

export default {
    mixins: [utils],
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
            this.Login({ email, password })
                .then((resp) => {
                    document.cookie = `uuid=${resp.data.uuid}; expires=${new Date(resp.data.expire * 1000)}; path=/`;
                    document.cookie = `token=${resp.data.token}; expires=${new Date(resp.data.expire * 1000)}; path=/`;
                    this.loginMsg('登入成功！');
                    setTimeout(() => {
                        this.clearMsg();
                        window.location = 'product-manage';
                    }, 2000);
                })
                .catch(() => {
                    this.loginMsg('登入失敗！');
                    setTimeout(() => this.clearMsg(), 3000);
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

    .wrap
        width: 100%
        max-width: 1440px
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
