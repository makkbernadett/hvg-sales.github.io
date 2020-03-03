<template>
  <nav class="navbar navbar-expand-lg  fixed-top py-0" id="mainNav" :class="isNavbarShrink ? 'shrink' : ''">
    <div class="container">
      <a class="navbar-brand  font-goodgirl" href="#" v-scroll-to="'#app'">
        <img src="@/assets/images/agymenok_logo.png" />  <span>Agymenők Nyereményjáték</span>
      </a>
      <input type="checkbox" id="navigation-toggle" name="navigation-toggle" />
      <label for="navigation-toggle"><div class="icon"></div></label>
      <div class="" id="navbar">
        <ul class="navbar-nav ml-auto my-2 my-lg-0">

          <li class="nav-item">
            <a class="nav-link"  href="#" v-scroll-to="'#prizes'">Nyeremények</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" v-scroll-to="'#play'">Játssz az Agymenőkkel</a>
          </li>
          <li class="nav-item">
            <a href="http://static.hvgrt.hu/static/agymeno_nyeremenyszabalyzat_201908.pdf" class="nav-link" target="_blank">Játékszabályzat</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" v-scroll-to="'#about-us'">Rólunk</a>
          </li>

        </ul>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  data () {
    return {
      isNavbarShrink: false
    }
  },
  methods: {
    onScroll () {
      this.isNavbarShrink = document.body.scrollTop > 80 || document.documentElement.scrollTop > 80
    }
  },
  mounted: function () {
    window.addEventListener('scroll', this.onScroll)
    if (screen.width < 993) {
      let navButtons = document.querySelectorAll('#mainNav .nav-link')
      for (const button of navButtons) {
        button.addEventListener('click', function (event) {
          document.getElementById('navigation-toggle').checked = false
        })
      }
    }
  },
  beforeDestroy: function () {
    window.removeEventListener('scroll', this.onScroll)
  }
}
</script>
