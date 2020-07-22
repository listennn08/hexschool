<template lang="pug">
    #psychological
        .vld-parent
            loading(
                :active.sync="loadingConfig.isLoading"
                :can-cancel="false"
                :opacity=1
                :is-full-page="loadingConfig.fullPage"
            )
        #start.start-page.fill-page(v-if="questionNumber<0")
            h1.w-50.mt-auto {{ title.zh }}
            h2.w-50 {{ title.en }}
            p.w-50 {{ description }}
            .start-btn-block
                button.start(@click="nextQuesion()") 開始測驗
        .fill-page.test-page(v-else-if="questionNumber>=0 && questionNumber < 10")
            .number Q{{ questionNumber+1 }}
            h1.quesion {{ currentQuestion.problem }}
            label.check(
                    :for="currentQuestion.id"
                    v-for="(option) in currentQuestion.options"
                    :key="option.id"
            )
                input(
                    type="radio"
                    :name="currentQuestion.id"
                    :value="option.fraction"
                    v-model="problemCategorys[Math.floor(questionNumber/2)].score[questionNumber%2]"
                )
                | {{ captureStr(option.description, "。") + "。" }}
                small {{ "&nbsp;" + captureStr(option.description, "。", "r") }}
            .noChoiceMsg(:class="{hide: hasChoice}") 尚未選擇答案唷
            .btn
                button(@click="nextQuesion()" v-if="questionNumber != 9") 下一題
                button(@click="countResult" v-else) 看結果
        template(v-else)
            .fill-page.result-page
                header
                    h1 {{ getCategoryTextZh(currentResult.category) }}
                    h2 {{ currentResult.category }}
                    .score {{ currentResult.score.reduce((pre, cur) => pre + cur, 0) }}
                    .w-60
                        p.detail {{ currentResult.description.desc }}
                .w-80.result-content
                    .description(:class="{highlight: resultCheck[resultIndex].high}")
                        .description-title 高
                            small （&ge; 7）
                        | {{ currentResult.description.high }}
                    .description(:class="{highlight:resultCheck[resultIndex].middle}")
                        .description-title 中
                            small  (&#61; 6)
                        | {{ currentResult.description.middle }}
                    .description(:class="{highlight: resultCheck[resultIndex].low}")
                        .description-title 低
                            small （&le; 5）
                        | {{ currentResult.description.low }}
                .btn
                    button(
                        v-if="resultIndex != problemCategorys.length-1"
                        @click="nextPage()"
                    ) 下一頁
                    button(v-else @click="nextPage('reset')") 再測一次
</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    name: 'psychological',
    components: {
        Loading,
    },
    data() {
        return {
            loadingConfig: {
                isLoading: false,
                fullPage: true,
            },
            title: [],
            description: '',
            problemCategorys: [],
            problemList: [],
            currentQuestion: {},
            questionNumber: -1,
            currentResult: {},
            resultIndex: -1,
            degree: {},
            traits: {},
            hasChoice: true,
            resultCheck: [],
            showResult: false,
        };
    },
    created() {
        this.loadingConfig.isLoading = true;
        this.$http
            .get('https://raw.githubusercontent.com/hexschool/js-training-task/master/api/BigFive.json')
            .then((resp) => {
                this.title = resp.data.name; // 標題
                this.description = resp.data.description; // 敘述
                this.degree = resp.data.degree;
                this.traits = resp.data.traits;
                this._.forEach(resp.data.problemList, (item, index) => {
                    this.problemCategorys.push({
                        category: index,
                        description: item.description,
                        score: [0, 0],
                    });
                    item.problems.forEach((q) => this.problemList.push(q));
                });
                this.loadingConfig.isLoading = false;
            });
    },
    methods: {
        nextQuesion() {
            if (this.questionNumber < 0) {
                this.questionNumber += 1;
                this.currentQuestion = this.problemList[this.questionNumber];
            } else if (this.questionNumber > -1
                && !this.problemCategorys[Math.floor(this.questionNumber / 2)]
                    .score[this.questionNumber % 2]
            ) {
                this.hasChoice = false;
            } else {
                this.hasChoice = true;
                this.questionNumber += 1;
                this.currentQuestion = this.problemList[this.questionNumber];
            }
        },
        captureStr(str, delimiter = '', direction = 'l') {
            const pivot = str.indexOf(delimiter);
            const start = (direction === 'r') ? pivot + 1 : 0;
            const end = (direction === 'r') ? str.length : pivot;
            return (pivot > -1) ? str.substring(start, end) : str;
        },
        countResult() {
            this.resultCheck = [];
            const intervalKey = Object.keys(this.degree);
            const interval = Object.values(this.degree);
            this._.forEach(this.problemCategorys, (item) => {
                const total = item.score.reduce((pre, cur) => pre + cur, 0);
                const minExpression = (total <= Math.min(...interval))
                    ? this.findKey(this.degree, Math.min(...interval))
                    : this.findKey(this.degree, interval[Math.floor(interval.length / 2)]);
                const scoreName = (total >= Math.max(...interval))
                    ? this.findKey(this.degree, Math.max(...interval))
                    : minExpression;
                const checkObj = this.addCheckObject(intervalKey, scoreName);
                this.resultCheck.push(checkObj);
            });
            this.questionNumber += 1;
            this.resultIndex += 1;
            this.currentResult = { ...this.problemCategorys[this.resultIndex] };
            this.showResult = true;
        },
        findKey(o, v) {
            return Object.keys(o).find((k) => o[k] === v);
        },
        addCheckObject(keys, checked) {
            const obj = {};
            keys.forEach((key) => {
                if (key === checked) {
                    obj[key] = true;
                } else {
                    obj[key] = false;
                }
            });
            return obj;
        },
        getCategoryTextZh(en) {
            return this.traits.zh[this.traits.en.indexOf(en)];
        },
        nextPage(i) {
            if (i !== 'reset') {
                this.resultIndex += 1;
                this.currentResult = this.problemCategorys[this.resultIndex];
            } else {
                this._.forEach(this.problemCategorys, (item, index) => {
                    this.problemCategorys[index].score = [0, 0];
                });
                this.questionNumber = -1;
                this.resultIndex = -1;
            }
        },
    },
};
</script>

<style lang="sass">
    @import url(https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;500;700;900&family=Raleway:wght@500;700&display=swap)

    $darkred: #793331
    $brown: #975830
    $yellow: #E7AF3E
    $pinko: #E3A471
    $pinkred: #A98879
    $blue: #094F70

    *
        margin: 0
        padding: 0
        list-style: none
    body
        overflow-x: hidden
    .fill-page
        width: 100vw
        height: 100vh
        display: flex
        flex-wrap: wrap
        flex-direction: row
        justify-content: center
        align-items: flex-start
    .test-page, .result-page
        position: relative
        &:nth-of-type(even)
            background: #345966
            .number, button
                background: rgba(#BD8035, .8)
            .quesion, p, .check, h1, h2, .description
                color: #eee
            .check
                small
                    color: #aaa
            .score
                color: orange
            .highlight
                background: linear-gradient(-45deg, $pinko, $yellow)
                color: #333
        .number
            align-self: flex-start
            margin-right: auto
            padding: 2%
            text-align: center
            border-radius: 0 0 50% 0
            color: #ddd
            font-family: "Raleway", sans-serif
            font-size: 24px
            font-weight: 900
        .quesion
            width: 100%
            margin-top: auto
            padding: 1%
            display: block
            text-align: center
        .check
            display: inline-block
            width: 15%
            align-self: flex-start
            small
                display: block
                color: #ddd
                padding: 0 8%
            input
                margin-right: 1%
        .noChoiceMsg
            width: 100%
            height: 1%
            text-align: center
            padding: 1%
            color: rgba(red, .8)
            text-shadow: black 0.1em 0.1em 0.2em
            position: absolute
            top: 60%
            bottom: 0
            left: -1%
            right: 0
            opacity: 1
            transition: opacity .2s
            &.hide
                opacity: 0
        a
            text-decoration: none
        .btn
            width: 100%
            align-self: center
            text-align: center
            margin-bottom: auto
            button
                border: 0
                margin-top: 2%
                padding: 1% 1.5%
                border-radius: 15px
                outline: 0
                color: #eee
                cursor: pointer
    .start-page
        background: linear-gradient(-45deg, $pinko, $yellow)
        flex-direction: column
        align-items: flex-start
    .w-50
        width: 50%
        color: #222
        margin-left: auto
        margin-right: auto
    h1
        font-family: 'Noto Sans TC', sans-serif
    h2
        font-family: 'Raleway', sans-serif
    p
        margin-top: 1%
        font-weight: 500
    @keyframes startButton
        0%, 100%
            transform: scale(1)
        50%
            transform: scale(1.2)
    .start-btn-block
        width: 100%
        display: flex
        justify-content: center
        .start
            width: 10%
            margin-top: 2%
            padding: 1%
            border: 0
            border-radius: 15px
            color: #eee
            background: rgba($blue, .8)
            text-align: center
            font-family: 'Noto Sans TC', sans-serif
            font-size: 18px
            font-weight: 500
            animation: startButton 3s 1s infinite linear forwards
            position: relative
            text-decoration: none
            cursor: pointer
            position: relative
            outline: none
            &::after
                content: ''
                position: absolute
                border-bottom: 2px solid #eee
                top: 0
                bottom: 15px
                right: 50%
                left: 50%
                transition: .5s
            &:hover::after
                    right: 20%
                    left: 20%
    .result-page
        flex-direction: column
        align-items: center
        header
            margin-top: auto
            width: 50%
            display: flex
            flex-direction: column
            align-items: center
        h1, h2, .score
            width: 100%
            text-align: center
        .score
            font-family: 'Raleway', sans-serif
            font-size: 36px
            font-weight: 900
        .w-80
            width: 80%
        .w-60
            width: 60%
            text-align: center
        .w-50
            width: 50%
            padding: 0 5%
            box-sizing: border-box
        .w-30
            width: 30%
            padding: 2%
            box-sizing: border-box
        .result-content
            margin-top: 1%
            display: flex
            flex-direction: row
            justify-content: space-around
        .detail
            margin-top: auto
        .description-title
            width: 100%
            font-size: 24px
            text-align: center
            font-weight: 700
        .description
            width: 100%
            display: block
            text-align: center
            padding: 5% 1%
        .highlight
            border-radius: 15px
</style>
