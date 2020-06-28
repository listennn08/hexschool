<template lang="pug">
    #category.category
        .category-container
            ul.category-list
                li: a(href="#") 床架／床墊
                li: a(href="#") 椅子／沙發
                li: a(href="#") 被子／被套
                li: a(href="#") 地毯／窗簾
</template>
<style lang="sass" scoped>
    $navyblue: #333D51 
    $hnavyblue: #242b39
    $goldyellow: #D3AC2B 
    $darkgray: #CBD0D8
    $lightgray: #F4F3EA

    *
        padding: 0
        margin: 0
        list-style: none
    #category
        .category-container
            width: 80%
            max-width: 250px
            border: 1px solid $darkgray
            background: $lightgray
            padding: 5% 1%
            text-align: center
            border-radius: 5px
            .category-list
                li
                    margin: 1%
                    a
                        color: #888
                        text-decoration: none
                        position: relative
                        &:after
                            content: ''
                            height: 0
                            border-bottom: 1px solid $hnavyblue
                            position: absolute
                            bottom: -1%
                            right: 50%
                            left: 50%
                            transition: .2s
                        &:hover
                            color: $hnavyblue
                        &:hover:after
                            right: 0
                            left: 0
</style>