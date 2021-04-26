<template>
  <div class="card">
    <div class="number">Q{{ questionNumber+1 }}</div>
    <div class="quesion">
      <h2 >{{ currentQuestion.problem }}</h2>
      <div class="options">
        <label
          class="check"
          v-for="(option) in currentQuestion.options"
          :for="option.fraction"
          :key="option.fraction"
        >
          <input
            :id="option.fraction"
            type="radio"
            :name="currentQuestion.id"
            :value="option.fraction"
            v-model="answer"
          />
          <div>
            {{ captureStr(option.description, "。") + "。" }}
            <small>
              {{ "&nbsp;" + captureStr(option.description, "。", "r") }}
            </small>
          </div>
        </label>
      </div>
      <div
        class="noChoiceMsg"
        :class="{ hide: hasChoice }"
      >
        尚未選擇答案唷
      </div>
    </div>
    <div class="btn">
      <button @click="next()">
        <span v-if="questionNumber != 9">下一題</span>
        <span v-else>看結果</span>
        </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    questionNumber: {
      type: Number,
      required: true,
    },
    currentQuestion: {
      type: Object,
      required: true,
    },
    problemCategorys: {
      type: Array,
      required: true,
    },
    hasChoice: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    answer: null,
  }),
  methods: {
    captureStr(str, delimiter = '', direction = 'l') {
      const pivot = str.indexOf(delimiter);
      const start = (direction === 'r') ? pivot + 1 : 0;
      const end = (direction === 'r') ? str.length : pivot;
      return (pivot > -1) ? str.substring(start, end) : str;
    },
    next() {
      this.$emit('answer', this.answer);
      this.$emit('next', this.questionNumber);
      this.answer = null;
    },
  },
};
</script>

<style>

</style>
