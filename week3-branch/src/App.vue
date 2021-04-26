<template>
  <div id="psychological">
    <div class="vld-parent">
      <loading
        :active.sync="loadingConfig.isLoading"
        :can-cancel="false"
        :opacity="0.8"
        :is-full-page="loadingConfig.fullPage"
      />
    </div>
    <div
      id="start"
      class="start-page"
      style="background-image: url('./images/tengyart-uh6msP8Md_E-unsplash.jpeg');"
    >
      <div
        class="w-small"
        v-if="questionNumber < 0"
      >
        <h1>{{ title.zh }}</h1>
        <h2>{{ title.en }}</h2>
        <p>{{ description }}</p>
        <div class="start-btn-block">
          <button class="start" @click="nextQuesion()">開始測驗</button>
        </div>
      </div>
      <Card
        v-else-if="questionNumber >= 0 && questionNumber < 10"
        :questionNumber="questionNumber"
        :currentQuestion="currentQuestion"
        :problemCategorys.sync="problemCategorys"
        :hasChoice.sync="hasChoice"
        @next="nextQuesion"
        @answer="handleAnswer"
      />
      <template v-else>
        <div class="card">
          <header>
            <p class="score">
              {{ currentResult.score.reduce((pre, cur) => pre + cur, 0) }}
            </p>
            <h1>{{ getCategoryTextZh(currentResult.category) }}</h1>
            <h2>{{ currentResult.category }}</h2>
            <p class="detail">
              {{ currentResult.description.desc }}
            </p>
          </header>
          <div class="w-80 result-content">
            <div
              class="description"
              :class="{ highlight: resultCheck[resultIndex].high }"
            >
              <div class="description-title"> 高
                <small>(&ge; 7)</small>
              </div>
              {{ currentResult.description.high }}
            </div>
            <div
              class="description"
              :class="{ highlight: resultCheck[resultIndex].middle }"
            >
              <div class="description-title"> 中
                <small>(&#61; 6)</small>
              </div>
              {{ currentResult.description.middle }}
            </div>
            <div
              class="description"
              :class="{ highlight: resultCheck[resultIndex].low }"
            >
              <div class="description-title"> 低
                <small>(&le; 5)</small>
              </div>
              {{ currentResult.description.low }}
            </div>
          </div>
          <div class="btn">
            <button
              v-if="resultIndex != problemCategorys.length-1"
              @click="nextPage()"
            >
              下一頁
            </button>
            <button
              v-else
              @click="nextPage('reset')"
            >
              再測一次
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Card from './components/Card.vue';

export default {
  name: 'psychological',
  components: {
    Loading,
    Card,
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
    this.getData();
  },
  methods: {
    async getData() {
      this.loadingConfig.isLoading = true;
      try {
        const resp = await this.$http
          .get('https://raw.githubusercontent.com/hexschool/js-training-task/master/api/BigFive.json');
        // 標題
        this.title = resp.data.name;
        // 敘述
        this.description = resp.data.description;
        // 分數分類
        this.degree = resp.data.degree;
        // 中英對照
        this.traits = resp.data.traits;
        // 使用 lodash 轉換物件為陣列
        this._.forEach(resp.data.problemList, (item, index) => {
          // 塞入問題分類
          this.problemCategorys.push({
            category: index,
            description: item.description,
            score: [0, 0],
          });

          // 將問題放入清單中
          this.problemList.push(...item.problems);
        });

        this.loadingConfig.isLoading = false;
      } catch (e) {
        console.error(e);
      }
    },

    nextQuesion() {
      console.log(this.questionNumber);
      if (this.questionNumber === 9) { this.countResult(); }
      if (this.questionNumber > -1) {
        const { score } = this.problemCategorys[Math.floor(this.questionNumber / 2)];
        if (!score[this.questionNumber % 2]) {
          this.hasChoice = false;
          return;
        }
        this.hasChoice = true;
      }
      this.questionNumber += 1;
      this.currentQuestion = this.problemList[this.questionNumber];
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
    handleAnswer(answer) {
      const i = Math.floor(this.questionNumber / 2);
      const j = this.questionNumber % 2;
      this.problemCategorys[i].score[j] = answer;
    },
  },
};
</script>

<style lang="sass">
</style>
