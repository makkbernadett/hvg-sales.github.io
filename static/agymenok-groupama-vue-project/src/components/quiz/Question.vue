<template>
  <div class="question">

    <div class="row">
      <div class="col-md-4 col-sm-6">
        <div class="question-card flip-in">
          <h5 class="d-flex align-items-center">
            <img :src="require('@/assets/images/category-' + quiz.slug + '.png')" :alt="quiz.name" class="img-fluid mr-2">
            <strong>{{ quiz.name }}</strong>
            <span class="ml-auto">
              {{quizItem + 1}}/{{quiz.questions.length}}
            </span>
          </h5>

          <h3><strong>{{ quiz.questions[quizItem].title }} </strong></h3>

          <div class="question-card-footer">
            <img src="@/assets/images/agymenok_logo.png" /> <span class="font-goodgirl">Agymenők Nyereményjáték</span>
          </div>
        </div>
      </div>
      <div class="col-md-8 col-sm-6 d-flex align-items-center" >
        <div class="w-100">
          <div class="question-inputs">
            <div v-for="(question, index) in quiz.questions[quizItem].answers" :key="index" class="d-flex custom-radio">
              <input type="radio" :id="'answer'+index" name="currentQuestion" v-model="selectedQuestion" :value="index">
              <label :for="'answer'+index">{{question}}</label>
            </div>
          </div>
          <p class="text-right pb-0 mb-0">
            <button @click="submitAnswer" class="btn btn-cta mb-0" :class="selectedQuestion !== '' ? '' : 'disabled'">Tovább</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*
function whichTransitionEvent () {
  var t
  var el = document.createElement('fakeelement')

  var transitions = {
    'transition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'MozTransition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd'
  }

  for (t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t]
    }
  }
}
*/

export default {
  props: ['quiz'],
  data () {
    return {
      quizItem: 0,
      answers: [],
      selectedQuestion: ''
    }
  },
  methods: {
    submitAnswer: function (e) {
      let tempItemNumber = this.quizItem + 1
      this.answers.push(this.selectedQuestion)
      // let cardToChange = document.querySelector('.question-card')
      // cardToChange.classList.add('flip-out')
      this.quizItem = tempItemNumber
      if (this.quizItem === this.quiz.questions.length) {
        this.$parent.results = this.answers
        // this.$parent.quizStep = 2
        this.$eventBus.$emit('nextStep')
      } else {
        this.selectedQuestion = ''
      }
      /*
      let transitionEvent = whichTransitionEvent()
      cardToChange.addEventListener(transitionEvent, () => {
        setTimeout(function () {
          cardToChange.classList.remove('flip-out')
          cardToChange.classList.add('flip-in')
        }, 300)
      })
      */
    },
    handleAnswer (e) {
      this.quiz.questions[this.quizItem] = e.answer
      if ((this.currentQuestion + 1) === this.questions.length) {
        this.handleResults()
        this.questionStage = false
        this.resultsStage = true
      } else {
        this.currentQuestion++
      }
    },
    handleResults () {
      this.questions.forEach((a, index) => {
        if (this.answers[index] === a.answer) this.correct++
      })
      this.perc = ((this.correct / this.questions.length) * 100).toFixed(2)
    }
  }
}
</script>
