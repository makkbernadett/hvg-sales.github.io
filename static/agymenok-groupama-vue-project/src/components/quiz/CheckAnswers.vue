<template>
  <div class="check-answers">
    <div class="close" @click="showResultsBlock"><i class="material-icons">close</i></div>
    <div class="row">
      <div class="col-md-12">
        <div class="check-answer" v-for="(question, index) in quiz.questions" :key="index">
          <h5 class="d-flex align-items-center">
            <img :src="require('@/assets/images/category-' + quiz.slug + '.png')" :alt="quiz.name" class="img-fluid mr-2">
            <strong>{{ quiz.name }}</strong>
            <span class="ml-auto">
              {{index + 1}}/{{quiz.questions.length}}
            </span>
          </h5>

          <h3><strong>{{question.title }} </strong></h3>
          <ul class="answer">
            <li class="answer-item" v-for="(answer, answerIndex) in question.answers" :key="'answer_'+answerIndex" :class="answerIndex == question.answer - 1 ? 'correct-answer' : ''">
              <p :class="answerIndex == results[index] ? 'selected' : ''">{{answer}}</p>
            </li>
          </ul>
        </div>
        <p class="text-center">
          <button @click="showResultsBlock" class="btn btn-ghost">&lsaquo; vissza</button>
        </p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: ['quiz', 'results'],
  data () {
    return {
      quizItem: 0,
      answers: [],
      selectedQuestion: ''
    }
  },
  methods: {
    showResultsBlock () {
      this.$parent.showResultsBlock()
    }
  }
}
</script>
