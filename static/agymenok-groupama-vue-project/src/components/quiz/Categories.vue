<template>
  <div>

      <h4 class="text-center mt-3">Válassz témakört:</h4>

      <div class="categories d-flex pt-3">
        <div v-for="category in categories" :key="category.slug" class="category-card" @click="selectCategory(category.slug)" :class="selectedCategory === category.slug ? 'active' : ''">
          <img :src="require('@/assets/images/category-' + category.slug + '.png')" :alt="category.name">
          <h5>{{category.name}}</h5>
        </div>
      </div>
      <p class="text-center py-3">
        <button class="btn btn-cta" :class="selectedCategory !== '' ? '' : 'disabled'" @click="nextPage(); sendEvent()">Tovább a kérdésekhez</button><br />
        <button class="btn btn-cta" @click="goToPage(3)">Nem töltöm ki a kvízt, csak nyerni szeretnék</button>
      </p>
  </div>
</template>

<script>
export default {
  props: ['categories'],
  data () {
    return {
      selectedCategory: ''
    }
  },
  computed: {
    selectedQuiz: function () {
      let selectedCategoryID = this.categories.findIndex(x => x.slug === this.selectedCategory)
      return this.categories[selectedCategoryID]
    }
  },
  methods: {
    selectCategory (categorySlug) {
      if (this.selectedCategory === categorySlug) {
        this.selectedCategory = ''
        return
      }
      this.selectedCategory = categorySlug
    },
    nextPage () {
      this.$emit('update', this.selectedQuiz)
      this.$eventBus.$emit('nextStep')
    },
    goToPage (page) {
      this.$eventBus.$emit('goToPage', page)
      // this.$ua.trackEvent('Button', 'Click', 'Nem töltöm ki a kvízt, csak nyerni szeretnék')
      // console.log('click')
    },
    sendEvent () {
      var dataObject = {
        'event': 'kviz_kezdes',
        'category': 'agymenok_kviz',
        'label': 'agymenok'
      }
      if (typeof dataLayer !== 'undefined') {
        // eslint-disable-next-line no-undef
        dataLayer.push(dataObject)
      }
    }
  }
}
</script>
