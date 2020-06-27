<template lang="pug">
    .wrap
        .text
            | 用心打造，最舒適的家居
            span: h1 GAGU
        .container
            .row-1
                .column-1
                    img(:src="homeImg[0]", alt="")
                    img(:src="homeImg[1]", alt="")
                .column-2
                    img(:src="homeImg[2]", alt="")
                    img(:src="homeImg[3]", alt="")
                    span.logo: a(href="/") GAGU
                span.column-3
                    img(:src="homeImg[4]", alt="")
                    img(:src="homeImg[5]", alt="")
</template>
<script>
import { homeImage } from '../assets/home_slider_img/index.js'
export default {
    data() {
        return {
            homeImg: homeImage,
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
    @mixin mac()
        @media screen and (max-width:1440px)
            @content
    @keyframes fontAnimation
        0%
            margin-top: -3%
            opacity: 0
        100%
            margin-top: 2%
            opacity: 1
    *
        margin: 0
        padding: 0
        list-style: none
    .wrap
        width: 100%
        .text
            
            margin-top: 2%
            opacity: 0
            text-align: center
            animation: fontAnimation 3s 1s 1 alternate forwards
            font-family: 'Raleway', 'Noto Sans TC', sans-serif
        .container
            margin: 1% 15%
            width: 70%
            display: flex
            flex-wrap: wrap
            border: 5px solid $navyblue
            background: $navyblue
            .row-1
                .column-1
                    border-bottom: 5px solid $navyblue
                    img
                        width: 49.7%
                        vertical-align: top
                        // +mac
                        //     width: 49.6%
                        &:first-child
                            border-right: 5px solid $navyblue
                .column-2
                    width: 49.7%
                    display: inline-block
                    border-right: 5px solid $navyblue
                    // +mac
                    //     width: 49.6%
                    img:not(:last-child)
                        display: block
                        width: 100%
                        border-bottom: 5px solid $navyblue
                    img
                        &:last-child
                            display: block
                            width: 100%
                    .logo
                        display: block
                        text-align: center
                        vertical-align: center
                        width: 100%
                        font-size: 32px
                        padding: 1% 0
                        background: $navyblue
                        font-family: 'Raleway', sans-serif
                        // +mac
                        //     font-size: 28px
                        //     padding: .1% 0
                        a
                            margin: 0
                            color: $lightgray
                            text-decoration: none
                            transition: 1s
                            &:hover
                                color: $goldyellow
                        
                .column-3
                    display: inline-block
                    vertical-align: top
                    width: 49.7%
                    img
                        vertical-align: top
                        width: 100%
                        &:first-child
                            border-bottom: 5px solid $navyblue
</style>