<template lang="pug">
    #footer.footer
        .container
            p
            | &copy; 2020 |
            i.fa.fa-value(aria-hidden='true') &nbsp;
            a(href='#') View Source
</template>
<style lang="sass" scoped>
    // $darkgrnblue:  #354649 // color
    // $hoverdarkgrnblue: #465c60 // hover color
    // $lightgray: #E0E7E9
    $navyblue: #333D51 
    $hnavyblue: #242b39
    $goldyellow: #D3AC2B 
    $darkgray: #CBD0D8 
    $lightgray: #F4F3EA
    *
        margin: 0
        padding: 0
        list-style: none
        text-decoration: none
    .footer
        width: 100%
    .container
        display: flex
        // align-items: center
        justify-content: center
        padding: 1%
        background-color: $lightgray
        a
            padding-left: .5%
            color: $navyblue
            &:hover
                color: $hnavyblue
</style>