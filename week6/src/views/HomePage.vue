<template lang="pug">
  .wrap
    .text-block
      .text
        | 用心打造，最舒適的家居
        span: h1 GAGU
    .container
      .row-1
        .column-1
          .img1
            img(src="https://imgur.com/IeXS91w.png", alt="")
            .txt
              h2 等待主人歸來的小熊
              p 小熊看著窗外，靜靜待在舒適暖心的床上等待主人的歸來。
          span.img2
            img(src="https://imgur.com/HaUxWZu.png", alt="")
            .txt
              h2 窗邊的室內小陽台
              p 窗外暖暖的微光透過窗簾，散落在我們身旁，與身邊的伴侶，享受只屬於兩人的甜美時光。
        .column-2
          .img1
            img(src="https://imgur.com/4tGU8lR.png", alt="")
            .txt
              h2 打造充滿夏季活力的早晨儀式
              p 別擔心，沒有陽台一樣能享受美好的夏天晨光。把床移到窗邊，打開窗，在陽光輕灑的窗台邊完成這週的重點事項；原本平淡的日子，也變得更有滋有味。
          .img2
            img(src="https://imgur.com/RihcuUY.png", alt="")
            .txt
              h2 讓小朋友找到屬於自己的興趣
              p 興趣從小開始培養，不喜歡拍照？ 那可以考慮來當個室內設計師。
          span.logo
            a(href="/"): h2 GAGU
        span.column-3
          .img1
            img(src="https://imgur.com/0VunOdA.png", alt="")
            .txt
              h2
              p
          .img2
            img(src="https://imgur.com/Vu6O729.png", alt="")
            .txt
              h2
              p
</template>
<script>
export default {

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
    .text-block
      margin-top: 1%
      text-align: center
      .text
        margin-top: 1%
        // animation: fontAnimation 3s 1 alternate
    .container
      margin: 1% 14%
      width: 70%
      display: flex
      flex-wrap: wrap
      border: 5px solid $navyblue
      .row-1
        .column-1
          border-bottom: 5px solid $navyblue
          .img1, .img2
            display: inline-block
            width: 49.7%
            img
              width: 100%
              // width: 49.7%
              vertical-align: middle
          .img1
            border-right: 5px solid $navyblue
        .column-2
          width: 49.7%
          display: inline-block
          border-right: 5px solid $navyblue
          .img1
            border-bottom: 5px solid $navyblue
            // width: 49.7%
          img
            display: block
            width: 100%
          .logo
            display: flex
            justify-content: center
            // text-align: center
            vertical-align: middle
            width: 97%
            padding: 1.5%
            // font-size: 32px
            background: $navyblue
            a
              color: $lightgray
              text-decoration: none
              transition: 1s
              &:hover
                color: $goldyellow
              h2
                padding: 1.1% 0
                letter-spacing: 1em
        .column-3
          display: inline-block
          vertical-align: top
          width: 49.7%
          img
            vertical-align: top
            width: 100%
            &:first-child
              border-bottom: 5px solid $navyblue
  .img1, .img2
    position: relative
    // width: 49.7%
    .txt
      position: absolute
      padding: 20px
      top: 0
      right: 0
      bottom: 0
      left: 0
      display: flex
      justify-content: center
      flex-direction: column
      background: rgba(0, 0, 0, .6)
      opacity: 0
      transition: opacity 1s
      &:hover
        opacity: 1
      h2
        color: $goldyellow
        position: relative
        padding: 5%
        // width: 100%
        &:after
          content: ''
          position: absolute
          width: 0%
          height: 2px
          display: block
          margin: 1px
          background: $goldyellow
          transition: width 1.5s
      &:hover h2:after
        width: 83%
      p
        padding: 0 5%
        color: $lightgray
</style>
