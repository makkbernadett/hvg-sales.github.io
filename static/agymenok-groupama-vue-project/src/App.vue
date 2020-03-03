<template>
  <div id="app">
    <Home />
    <Footer />
  </div>
</template>

<script>

import Home from '@/pages/Home.vue'
import Footer from '@/components/Footer'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {
    Home,
    Footer
  }
}
</script>
