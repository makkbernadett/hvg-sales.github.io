<template>
  <div class="quiz w-75 mx-auto">
    <transition name="fade">
    <div class="loader" v-if="isLoading">
       <img src="@/assets/images/agymenok_logo.png" />
      <div class="loading">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
    </transition>
    <transition name="fade" v-on:after-enter="afterEnter" mode="out-in">
      <div v-if="quizStep == 0">
        <Categories :categories="categories" v-on:update="updateData"/>
      </div>
    </transition>
    <transition name="fade" v-on:after-enter="afterEnter" mode="out-in">
      <div v-if="quizStep == 1">
        <Question :quiz="selectedQuiz" />
      </div>
    </transition>
    <transition name="fade" v-on:after-enter="afterEnter" mode="out-in">
      <div v-if="quizStep == 2">
        <Results :results="results" :quiz="selectedQuiz"/>
      </div>
    </transition>
    <transition name="fade"  v-on:after-enter="afterEnter" mode="out-in">
      <div v-if="quizStep == 3">
        <Registration />
      </div>
    </transition>
    <transition name="fade"  v-on:after-enter="afterEnter" mode="out-in">
      <div v-if="quizStep == 4">
        <Success />
      </div>
    </transition>
    <!--<button @click="resetQuiz">Újrakezdem</button>-->
  </div>

</template>

<script>
import Categories from '@/components/quiz/Categories'
import Question from '@/components/quiz/Question'
import Results from '@/components/quiz/Results'
import Registration from '@/components/quiz/Registration'
import Success from '@/components/quiz/Success'
import { setTimeout } from 'timers'

export default {
  components: {
    Question,
    Results,
    Registration,
    Categories,
    Success
  },
  data () {
    return {
      baseUrl: window.location.origin,
      startQuiz: true,
      quizStep: 0,
      selectedCategory: '',
      selectedQuiz: '',
      results: [],
      categories: [
        {
          slug: 'vilagur',
          name: 'Világűr',
          questions: [
            {
              title: 'Naponta körülbelül hányszor kerüli meg a Földet a Nemzetközi Űrállomás?',
              answers: [
                '25',
                '2',
                '7',
                '16'
              ],
              answer: 4
            },
            {
              title: 'Hány éves a nap?',
              answers: [
                '4,6 milliárd',
                '1,2 milliárd',
                '13 milliárd',
                '10 milliárd'
              ],
              answer: 1
            },
            {
              title: 'Ki mondta: „Houston, itt a Nyugalom tengere bázis. A Sas leszállt.”?',
              answers: [
                'Michael Collins',
                'James Lovell',
                'Buzz Aldrin',
                'Neil Armstrong'
              ],
              answer: 4
            },
            {
              title: 'Mennyi lenne 6 kg tömegű alma súlya a Holdon?',
              answers: [
                '1 kg',
                '3 kg',
                '6 kg',
                '12 kg'
              ],
              answer: 1
            },
            {
              title: 'Melyik klasszikus 1982-es film szól egy kisfiúról, aki segített egy földönkívülinek hazajutnia?',
              answers: [
                'Terminátor 2',
                'Mátrix',
                'A majmok bolygója',
                'E.T. – A földönkívüli'
              ],
              answer: 4
            }
          ]
        },
        {
          slug: 'foldunk',
          name: 'Földünk',
          questions: [
            {
              title: 'Miből van a Föld magjának egy része?',
              answers: [
                'jég',
                'vas',
                'szilícium',
                'alumínium'
              ],
              answer: 2
            },
            {
              title: 'A Föld felszínének hány százalékát borítja víz?',
              answers: [
                '13%',
                '52%',
                '99%',
                '71%'
              ],
              answer: 4
            },
            {
              title: 'Hogyan nevezik a trópusi ciklonok szélcsendes közepét?',
              answers: [
                'fül',
                'szupercella',
                'szem',
                'mag'
              ],
              answer: 3
            },
            {
              title: 'Mennyivel került közelebb Japán Észak-Amerikához a 2011. március 11-i földrengés következtében?',
              answers: [
                '2 m',
                '1,8 m',
                '1,2 m',
                '2,4 m'
              ],
              answer: 4
            },
            {
              title: 'Évente nagyjából hány meteor csapódik be a Földbe?',
              answers: [
                '1000',
                '750',
                '500',
                '20'
              ],
              answer: 3
            }
          ]
        },
        {
          slug: 'allatok',
          name: 'Állatok',
          questions: [
            {
              title: 'Mennyi idő alatt lehet egy strucctojást lágyra főzni?',
              answers: [
                '120 perc',
                '60 perc',
                '15 perc',
                '40 perc'
              ],
              answer: 2
            },
            {
              title: 'Melyik állat halad előre lökhajtással?',
              answers: [
                'karvaly',
                'elektromosrája',
                'kalmár',
                'zsákállat'
              ],
              answer: 3
            },
            {
              title: 'Melyik állat hallja meg a legmagasabb hangokat?',
              answers: [
                'delfin',
                'denevér',
                'kutya',
                'bagolylepke'
              ],
              answer: 4
            },
            {
              title: 'A saját testmagassága hányszorosát ugorja a bolha?',
              answers: [
                '20',
                '2000',
                '200',
                '2'
              ],
              answer: 3
            },
            {
              title: 'Hogyan mondják el a méhek egymásnak, hogy merre van a nektárlelőhely?',
              answers: [
                'nyomot hagynak',
                'eltáncolják',
                'elzümmögik',
                'követik egymást'
              ],
              answer: 2
            }
          ]
        },
        {
          slug: 'dinoszauruszok',
          name: 'Dinoszauruszok',
          questions: [
            {
              title: 'Mekkorára nőhetett egyes tudósok szerint a Tyrannosaurus rex?',
              answers: [
                '5-10 tonna',
                '20 tonna',
                '2 tonna',
                '50 tonna'
              ],
              answer: 1
            },
            {
              title: 'Mi nem létezett, amikor megjelentek az első dinoszaruruszok?',
              answers: [
                'hegységek',
                'folyók',
                'baktériumok',
                'virágok'
              ],
              answer: 4
            },
            {
              title: 'Milyen méretűek voltak a legnagyobb szauropodák egyes csigolyái?',
              answers: [
                'televízió',
                'autó',
                'ember',
                'autóbusz'
              ],
              answer: 3
            },
            {
              title: 'A tudósok szerint mi okozhatta a dinoszauruszok eltűnését?',
              answers: [
                'becsapódó kisbolygó ',
                'emberek',
                'más állatok',
                'járványok'
              ],
              answer: 1
            },
            {
              title: 'Hol fekszik a Lángoló sziklák nevű híres dinoszaurusz-lelőhely?',
              answers: [
                'Litvánia',
                'Mongólia',
                'Afganisztán',
                'Észak-Amerika'
              ],
              answer: 2
            }
          ]
        }
      ],
      isLoading: false
    }
  },
  computed: {
  },
  methods: {
    updateData (event) {
      this.selectedQuiz = event
    },
    resetQuiz () {
      this.selectedCategory = ''
      this.startQuiz = true
      this.quizStep = 0
      this.isLoading = false
    },
    afterLeave () {

    },
    afterEnter () {
      this.isLoading = false
    }
  },
  mounted: function () {
    this.$eventBus.$on('nextStep', (message) => {
      let self = this
      self.isLoading = true
      setTimeout(function () {
        self.quizStep = self.quizStep + 1
      }, 800)
    })
    this.$eventBus.$on('goToPage', (message) => {
      let self = this
      self.quizStep = message
    })
  }
}
</script>

<style lang="less" scoped>

</style>
