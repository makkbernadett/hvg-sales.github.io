<template>
  <div class="results">
    <CheckAsnwers :quiz="quiz" :results="results" v-if="showResults"/>
    <div class="row  align-items-center" v-else>
      <div class="col-md-8">
        <h3 class="mb-3">Gratulálunk, itt láthatod az eredményedet:</h3>
        <h4 class="text-center">Témakör: <strong>{{quiz.name}}</strong></h4>
        <div class="d-flex">
        <h4 class="mb-3">Kérdések száma: <strong>{{quiz.questions.length}}</strong></h4>
        <h4 class="ml-auto">Helyes válaszok száma: <strong>{{correct}}</strong></h4>
        </div>
        <div class="progress mb-3">
            <div class="progress-bar progress-bar-success" role="progressbar" :aria-valuenow="percentage" aria-valuemin="0" aria-valuemax="100" :style="{ width: percentage + '%' }" >
                <span class="sr-only">{{percentage}}% Complete (success)</span>
            </div>
            <span class="progress-completed">{{percentage}}%</span>
        </div>
        <p class="text-center"><button class="btn btn-ghost" @click="showResultsBlock">Nézd meg az eredményt részletesen &rsaquo;</button></p>
      </div>
      <div class="col-md-4 text-center">
        <img src="http://agymenok.hvg.hu/site/upload/5357764b3e160agymenok_illustration_foldgomb.png" />
      </div>
    </div>
    <hr />
    <div class="row results-buttons">
      <div class="col-md-4"><button class="btn btn-cta btn-ghost" @click="resetQuiz">Újrakezdem <i class="material-icons pl-2">cached</i></button></div>
      <div class="col-md-2">
        <div class="fb-share-button"></div>
        <!--
        <div class="fake-fb-btn">
          <button class="btn btn-cta btn-share" @click="clickFbButton()">Megosztom <i class="material-icons pl-2">thumb_up_alt</i></button>

        </div>
        -->
      </div>
      <div class="col-md-6 text-right"><button class="btn btn-cta" @click="nextPage">Nyerni akarok! <i class="material-icons pl-2">local_play</i></button></div>
    </div>
  </div>
</template>

<script>

import CheckAsnwers from '@/components/quiz/CheckAnswers'

function triggerEvent (el, type) {
  // console.log(el, type)
  var e = document.createEvent('HTMLEvents')
  e.initEvent(type, false, true)
  el.dispatchEvent(e)
}

export default {
  name: 'Results',
  components: {
    CheckAsnwers
  },
  props: [
    'results',
    'quiz'
  ],
  data () {
    return {
      correct: 0,
      percentage: 0,
      showResults: false
    }
  },
  methods: {
    resetQuiz () {
      this.$parent.selectedCategory = ''
      this.$parent.startQuiz = true
      this.$parent.quizStep = 0
    },
    nextPage () {
      // this.$parent.quizStep++
      this.$eventBus.$emit('nextStep')
    },
    handleResults () {
      this.quiz.questions.forEach((a, index) => {
        if (this.results[index] + 1 === a.answer) this.correct++
      })
      this.percentage = ((this.correct / this.quiz.questions.length) * 100)
    },
    showResultsBlock () {
      this.showResults = !this.showResults
    },
    clickFbButton () {
      // console.log('click')
      let fbButton = document.getElementById('facebookLikeButton')
      triggerEvent(fbButton, 'mousedown')
    },
    sendEvent () {
      var dataObject = {
        'event': 'kviz_eredmenyek',
        'category': 'agymenok_kviz',
        'label': 'agymenok'
      }
      if (typeof dataLayer !== 'undefined') {
        // eslint-disable-next-line no-undef
        dataLayer.push(dataObject)
      }
    }
  },
  mounted: function () {
    this.handleResults()
    this.sendEvent()
    let fbButton = document.getElementById('facebookLikeButton')
    let cloneFbButton = fbButton.firstElementChild.cloneNode(true)
    let fbFakeButton = document.querySelector('.fb-share-button')
    fbFakeButton.appendChild(cloneFbButton)
    // console.log('fb', fbButton)
    // this.$ua.trackView('Results', true)
  }
}
</script>

<style>

</style>
