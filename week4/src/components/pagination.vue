<template lang="pug">
    #pagination.page-wrap
        button#prev.page(@click="changePage('m')") &laquo;
        button.page(
            v-for="(index) in pagination.total_pages"
            :key="index"
            :class="{curpage: index === pagination.current_page}"
            @click="goToPage(index)"
        ) {{ index }}
        button#next.page(@click="changePage('p')") &raquo;
</template>
<script>
export default {
    name: 'pagination',
    props: {
        pagination: Object,
    },
    template: '#pagination',
    methods: {
        changePage(m) {
            const currentPage = this.pagination.current_page;
            const totalPage = this.pagination.total_pages;
            if (m === 'p') {
                if (currentPage < totalPage) {
                    this.$emit('update:pagination', this.pagination.current_page += 1);
                }
            } else if (m === 'm') {
                if (currentPage > 1) {
                    this.$emit('update:pagination', this.pagination.current_page -= 1);
                }
            }
        },
        goToPage(n) {
            this.$emit('update:pagination', this.pagination.current_page = n);
        },
    },
};
</script>
<style lang="sass" scoped>
    .page-wrap
        margin-top: 1%
        display: flex
        justify-content: center
    .page
        background: #fff
        padding: .5% 1%
        outline: none
        border-top: 1px solid #ddd
        border-bottom: 1px solid #ddd
        border-right: 0
        border-left: 1px solid #ddd
        &.curpage
            border: 1px solid #888
            border-left: 1px solid #888
            border-bottom: 1px solid #888
            border-right: 0
            &.curpage + .page
                border-left: 1px solid #888
        &:hover
            background: #888
        &:last-child
            border-right: 1px solid #ddd
</style>
