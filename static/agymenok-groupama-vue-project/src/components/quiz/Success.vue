<template>
  <div class="py-3">
    <h4 class="text-center mb-3">Sikeres regisztráció!</h4>
    <h2 class="font-goodgirl text-center pb-3">Gratulálunk! Te is részt veszel a sorsoláson!</h2>
    <hr />
    <p class="pt-3">
      <strong>Köszönjük, hogy velünk játszottál!</strong><br />
      A sorsolást követően emailben értesítjük nyerteseinket!
    </p>
    <p>
      <strong>Köszönjük, hogy velünk játszottál!</strong>
    </p>
    <h4 class="text-center">Találkozzunk a legközelebbi Agymenők Élménynapon!</h4>
    <p>
      Kövesd a <a href="https://www.facebook.com/hvgkonyvek/" target="_blank">HVG Könyvek Facebook oldalát</a> a legfrissebb hírekért.
    </p>
    <hr />
    <p>
      Szeretnéd továbbra is tesztelni a tudásodat? <br /><button @click="resetQuiz" class="text-link text-white">Töltsd ki a kvízt újra</button>,
      vagy szerezd be az <button  class="text-link text-white" v-scroll-to="'#about-us'">Agymenők kártyacsomagokat</button>!
    </p>
  </div>
</template>

<script>
export default {
  name: 'Success',
  data () {
    return {
      someData: false
    }
  },
  methods: {
    resetQuiz () {
      this.$parent.selectedCategory = ''
      this.$parent.startQuiz = true
      this.$parent.quizStep = 0
    }
  },
  mounted () {
    // this.$ua.trackView('Success', true)
  }
}
</script>
