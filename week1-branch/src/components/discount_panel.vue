<template lang="pug">
    .container
        .discount-num 優惠折扣碼
            span.d-num 0857
        .discount-container
            .discount-panel
                span.discount -30%
                | 折扣倒數
                span.day 1
                |天
</template>
<style lang="sass" scoped>
    @import url(https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;700;900&family=Raleway:wght@700;900&display=swap)
    *
        margin: 0
        padding: 0
        list-style: none
        font-family: 'Noto Sans TC', sans-serif
    body
        height: 100vh
        display: flex
        align-items: center
        justify-content: center
    .container
        .discount-num
            .d-num
                margin-left: 5px
                font-family: "Raleway", Helvetica
                font-size: 36px
                color: #f00000

        .discount-container
            margin: 0 45%
            width: 180px
            position: relative
            
            .discount-panel
                padding: 18px
                border: 2px solid #feaa00
                border-radius: 0 20px 20px 0
                background: #feaa00
                text-align: center
                box-shadow: 5px 5px 10px #cb8800
                .discount, .day
                    font-family: "Raleway", Helvetica
                .discount
                    display: block
                    font-size: 36px
                    font-weight: 700
                    color: #f00000
                    position: relative
                .day
                    color: #f00000
                    
                letter-spacing: 1px
                &:before
                    content: ''
                    position: absolute
                    left: -25px
                    top: 47px
                    bottom: 0
                    width: 0
                    height: 0
                    background: #fff
                    border: 8px solid #fff
                    border-radius: 50%
                    z-index: 2
                &:after
                    content: ''
                    font-size: 36px
                    color: #000
                    width: 0
                    height: 0
                    left: -60px
                    top: 0
                    bottom: 0
                    position: absolute
                    border-top: 53px solid #fff
                    border-bottom: 53px solid #fff
                    border-right: 60px solid transparent
                    background: #feaa00
</style>