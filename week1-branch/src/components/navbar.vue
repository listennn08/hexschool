<template lang="pug">
    #navbar.navbar
        .container
            .navbar-header
                h2: a(href="/") GAGU
            .navbar
                .navbar-list
                    //- router-link(to="/") Home
                    router-link(to="/about") 關於我們
                    router-link(to="/discount") 優惠活動
                    router-link(to="/allitem") 產品列表
                    router-link(to="/shopcart") 購物車
            .navbar-right
                .navbar-list
                    router-link(to="/login") 登入
</template>
<style lang="sass" scoped>
// $darkgrnblue:  #354649 // color
// $hoverdarkgrnblue: #465c60 // hover color
// $lightblgray: #6C7A89
// $lightbluegr: #A3C6C4
// $lightgray: #E0E7E9 // background-color

$navyblue: #333D51 
$hnavyblue: #242b39
$goldyellow: #D3AC2B 
$darkgray: #CBD0D8 
$lightgray: #F4F3EA

@import url(https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;500;700;900&family=Raleway:wght@500;700&display=swap)
*
    margin: 0
    padding: 0
    list-style: none
    font-family: 'Raleway', 'Noto Sans TC', sans-serif

#navbar
    width: 100%
    background-color: $lightgray
    .container
        width: 100%
        height: 50px
        display: flex
        margin: auto
        .navbar-header
            width: 18%
            font-size: 26px
            margin-left: 2%
            text-align: left
            vertical-align: middle
            a
                color: $navyblue
                text-decoration: none
        .navbar, .navbar-right
            display: flex
            margin: auto
            .navbar-list
                font-weight: 700
                text-transform: uppercase
                transition: .5s
                a
                    text-decoration: none
                    color: $navyblue
                    position: relative
                    &::after
                        content: ''
                        position: absolute
                        height: 0
                        bottom: 0
                        border-bottom: 1px solid $hnavyblue
                        transition: .3s
                    &:hover
                        color: $hnavyblue

        .navbar
            width: 60%
            justify-content: center
            .navbar-list
                width: 100%
                a
                    padding: 0 2%
                    &::after
                        left: 18%
                        right: 82%
                    &:hover::after
                        right: 18%
        .navbar-right
            width: 18%
            margin-right: 2%
            justify-content: flex-end
            .navbar-list
                a
                    // padding: 20% 2%
                    &::after
                        left: 0%
                        right: 100%
                    &:hover::after
                        right: 0%      
</style>