<template lang="pug">
  .wrap
    .text-block
      .text
        | 用心打造，最舒適的家居
        span: h1 GAGU
    .container
      .row
          .img.border-right(:style="{backgroundImage: `url(${homeImage[0]})`}")
            .txt
              h2 等待主人歸來的小熊
              p 小熊看著窗外，靜靜待在舒適暖心的床上等待主人的歸來。
          .img(:style="{backgroundImage: `url(${homeImage[1]})`}")
            .txt
              h2 窗邊的室內小陽台
              p 窗外暖暖的微光透過窗簾，散落在我們身旁，與身邊的伴侶，享受只屬於兩人的甜美時光。
      .row
          .img.border-right(:style="{backgroundImage: `url(${homeImage[2]})`}")
            .txt
              h2 打造充滿夏季活力的早晨儀式
              p 別擔心，沒有陽台一樣能享受美好的夏天晨光。把床移到窗邊，打開窗，在陽光輕灑的窗台邊完成這週的重點事項；原本平淡的日子，也變得更有滋有味。
          .img(:style="{backgroundImage: `url(${homeImage[3]})`}")
            .txt
              h2
              p
      .row
          .img.border-right(:style="{backgroundImage: `url(${homeImage[4]})`}")
            .txt
              h2
              p
          .img(:style="{backgroundImage: `url(${homeImage[5]})`}")
            .txt
              h2 讓小朋友找到屬於自己的興趣
              p 興趣從小開始培養，不喜歡拍照？ 那可以考慮來當個室內設計師。
</template>
<script>
import { homeImage } from '../assets/home_slider_img/index';

export default {
  data() {
    return {
      homeImage,
    };
  },
};
</script>
<style lang="sass" scoped>
  $navyblue: #333D51
  $hnavyblue: #242b39
  $goldyellow: #D3AC2B
  $darkgray: #CBD0D8
  $darkgrayn: #46505e
  $lightgray: #F4F3EA
  // @keyframes fontAnimation
  //  0%
  //    margin-top: -3%
  //    opacity: 0
  //  100%
  //    margin-top: 1%
  //    opacity: 1

  *
    margin: 0
    padding: 0
    list-style: none
  .wrap
    width: 1200px
    height: 100vh
    margin: 0 15%
    .text-block
      margin-top: 1%
      text-align: center
      .text
        margin-top: 1%
        // animation: fontAnimation 3s 1 alternate
    .container
      margin: 1% 15%
      width: 70%
      display: flex
      flex-wrap: wrap
      border: 5px solid $navyblue
      box-sizing: border-box
      .row
        width: 100%
        height: 300px
        display: flex
        flex-wrap: wrap
        border-bottom: 5px solid $navyblue
        &:last-of-type
          border-bottom: 0
        .img
          box-sizing: border-box
          width: 50%
          background-position: center center
          background-repeat: no-repeat
          background-size: cover
          position: relative
          &.border-right
            border-right: 5px solid $navyblue
          .txt
            position: absolute
            padding: 20px
            top: 0
            right: 0
            bottom: 0
            left: 0
            display: flex
            justify-content: center
            align-items: center
            flex-direction: column
            background: rgba(0, 0, 0, .6)
            opacity: 0
            transition: opacity 1s
            &:hover
              opacity: 1
            h2
              color: $goldyellow
              position: relative
              width: 90%
              padding: 5% 0
              // width: 100%
              &:after
                content: ''
                position: absolute
                left: 50%
                right: 50%
                height: 2px
                display: block
                // margin: 1px
                background: $goldyellow
                transition: .5s
            &:hover h2:after
              left: 0%
              right: 0%
            p
              color: $lightgray
</style>
