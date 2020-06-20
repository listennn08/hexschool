<template lang="pug">
    #navbar
        .container
            .navbar-header
                h2: a(href="/") App Name
            .navbar
                ul.navbar-list
                    li: router-link(to="/") Home
                    li: router-link(to="/about") About
                    li: router-link(to="/allitem") list
            .navbar-right
                ul.navbar-list
                    li: router-link(to="#") Login
</template>
<style lang="sass" scoped>
$darkgrnblue:  #354649
$hoverdarkgrnblue: #465c60
$lightblgray: #6C7A89
$lightbluegr: #A3C6C4
$lightgray: #E0E7E9
*
    margin: 0
    padding: 0
    list-style: none

#navbar
    width: 100%
    background-color: $darkgrnblue
    .container
        width: 100%
        height: 50px
        display: flex
        .navbar-header, .navbar, .navbar-right
            margin: auto
            display: flex
        .navbar-header
            width: 18%
            padding: .5% 1%
            text-align: left
            font-size: 20px
            a
                color: $lightgray
                text-decoration: none
        .navbar, .navbar-right
            .navbar-list
                li
                    display: inline
                    font-weight: 700
                    text-transform: uppercase

                    transition: .5s
                    a
                        color: $lightgray
                        text-decoration: none
                    &:hover
                        background-color: $hoverdarkgrnblue
                    &:hover a
                        color: #fff 
        .navbar
            width: 26%
            align-items: center
            justify-content: center
            .navbar-list
                padding-left: 10%
                li
                    padding-right: 12%
                &::after
                    content: ''
        .navbar-right
            align-items: center
            justify-content: center
            width: 25%
            .navbar-list
                li
                    padding: 31% 25%
                &::after
                    content: ''

            

                    
</style>