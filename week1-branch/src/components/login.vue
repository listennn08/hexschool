<template lang="pug">
    #login-page
        label(for="email") 信箱 
        input#email(type="account")
        label(for="pwd") 密碼
        input#pwd(type="password")
        .btn-block
            button#login(type="button" @click="login") 登入
</template>
<script>
export default {
    methods: {
        login() {
            let email = document.querySelector('#email').value;
            let pwd = document.querySelector('#pwd').value;
            this.$http.post('https://course-ec-api.hexschool.io/api/auth/login',{
                email: email,
                password: pwd
            })
            .then((resp) => {
                this.$http.defaults.headers['Authorization'] = `Bearer ${resp.data.token}`;
            })
            .catch((error) => {
                console.error(error)
            })
        }
    }
}
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
#login-page
	width: 16%
	margin: 5% 40%
	padding: 2%
	display: flex
	flex-wrap: wrap
	border: 2px solid $darkgrayn
	border-radius: 5%
    font-family: 'Noto Sans TC', sans-serif 
    overflow: hidden
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
		&:hover
			background: $navyblue
			color: $lightgray
button
	width: 5%
	margin-right: 5%
	padding: 1%
	border: 1px solid $navyblue
	border-radius: 5px
	outline: none
</style>