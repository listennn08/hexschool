<template lang="pug">
    swiper(
        ref="swiper"
        :options="swiperOptions"
        :auto-update="true"
        :auto-destroy="true"
        :delete-instance-on-destroy="true"
        :cleanup-styles-on-destroy="true")
        swiper-slide(v-for="(img, index) in imgs")
            img.slideImage(:src="img" :key="index")
        .swiper-pagination(slot="pagination")

</template>
<script>
import { Swiper,  SwiperSlide/*, directive */ } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import slide1 from '../assets/home_slider_img/slide1.jpg';
import slide2 from '../assets/home_slider_img/slide2.jpg';
import slide3 from '../assets/home_slider_img/slide3.jpg';
import slide4 from '../assets/home_slider_img/slide4.jpg';
import slide5 from '../assets/home_slider_img/slide5.jpg';

export default {
    name:  'carrousel',
    components: {
        Swiper,
        SwiperSlide
    },
    // directives: {
    //     swiper: directive
    // },
    data() {
      return {
          imgs: [ slide1, slide2, slide3, slide4, slide5 ],
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
        this.$refs.swiper.$swiper.autoplay.stop();
        this.$refs.swiper.$swiper.autoplay.start();
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
            width: 60%
            height: 100%
            // position: absolute
            // left: 20%
            // right: 50%
</style>