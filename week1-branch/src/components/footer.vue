<template lang="pug">
    #footer.footer
        .container
            p
            | &copy; 2020 |
            i.fa.fa-value(aria-hidden='true') &nbsp;
            a(href='#') View Source
</template>
<style lang="sass" scoped>

    $lightgray: #E0E7E9
    *
        text-decoration: none
    .footer
        width: 100%
    .container
        height: 50px
        display: flex
        align-items: center
        justify-content: center
        background-color: $lightgray
        a
            padding-left: .5%
            color: #333
            &:hover
                color: #3030f0
</style>