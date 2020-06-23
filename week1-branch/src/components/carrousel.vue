<template lang="pug">
    swiper#swiper-wrapper(
        ref="swiper"
        :options="swiperOptions"
        :auto-update="true"
        :auto-destroy="true"
        :delete-instance-on-destroy="true"
        :cleanup-styles-on-destroy="true")
        swiper-slide(v-for="(img, index) in imgs" :key="index")
            img.slideImage(:src="img[0]")
            img.slideImage(:src="img[1]")
        .swiper-pagination(slot="pagination")

</template>
<script>
import { Swiper,  SwiperSlide/*, directive */ } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { slideImage } from '../assets/home_slider_img/index.js'

export default {
    name:  'carrousel',
    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            imgs: slideImage,
            swiperOptions: {
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    type: "bullets"
                },
                notNextTick: true,
                loop: true,
                initialSlide: 0,
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: true
                },
                speed: 1000,
                grabCursor: true,
            }
        }
    },
    computed: {
        swiper() {
            return this.$refs.swiper.$swiper
        }
    },
    mounted() {
        // console.log('Current Swiper instance object', this.swiper)
        this.$refs.swiper.$swiper.slideTo(1);
        this.playSwiper();
        document.querySelector('#swiper-wrapper').addEventListener('mouseover', this.stopSwiper);
        document.querySelector('#swiper-wrapper').addEventListener('mouseout', this.playSwiper)
    },
    methods: {
        stopSwiper () {
            this.$refs.swiper.$swiper.autoplay.stop();
        },
        playSwiper () {
            this.$refs.swiper.$swiper.autoplay.start();
        }
    }
}
</script>
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
    .swiper-slide
        position: relative
        height: 396px
        // padding: 2px
        // background-color: $darkgray
        .slideImage
            width: 50%
            height: 100%
            // position: absolute
            // left: 20%
            // right: 50%
</style>