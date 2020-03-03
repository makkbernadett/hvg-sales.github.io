<template>
  <div>
    <Header />
    <main class="main-container">
      <section class="container-fluid" id="welcome" ref="welcome">
        <div class="container">
          <div class="row align-items-center" >
            <div class="col-md-2">
              <img src="@/assets/images/agymenok_logo.png" alt="Agymenők" class="img-fluid"/>
            </div>
            <div class="col-md-8 text-center">
              <img src="@/assets/images/agymenok_slogen.png" alt="Agymenők nyereményjáték" class="img-fluid w-75"/>
              <h2 class="text-center font-goodgirl mt-4">Teszteld a tudásod és nyerj!</h2>
            </div>
            <div class="col-md-2">
              <img src="@/assets/images/agymenok_groupama_bubble.png" alt="Groupama biztosító" class="img-fluid"/>
              <img src="@/assets/images/agymenok_subtitle.png" alt="Játsz velünk az értékes nyereményekért"  class="img-fluid"/>
            </div>
          </div>
          <p class="text-center py-3">
            <a href="#play" class="btn btn-cta js-scroll-trigger" v-scroll-to="'#play'">Irány a játék</a><br />
            <a href="#prizes" class="d-inline-block mt-0 text-white" v-scroll-to="'#prizes'">Megnézem a nyereményeket &rsaquo;</a>
          </p>
        </div>

  <svg preserveAspectRatio="none" id="svg-1" viewBox="0 0 50 14" class="svg-wave">
    <defs>
      <linearGradient id="a" x1="50%" x2="50%" y1="0%" y2="100%">
        <stop stop-color="#bed640" stop-opacity="1" offset="0%"/>
        <stop stop-color="#bed640" stop-opacity=".7" offset="50%"/>
        <stop stop-color="#bed640" stop-opacity=".5" offset="70%"/>
        <stop stop-color="#bed640" stop-opacity=".35" offset="100%"/>
      </linearGradient>
    </defs>
    <path fill="url(#a)" fill-rule="evenodd" d="
            M 27,10
            C 21,12
              14,14
              0,14
            L 0,0
            L 54,0
            L 54,3
            C 40,3
              33,8
              27,10

            Z
            ">
    </path>
  </svg>

  <svg preserveAspectRatio="none" id="svg-3" viewBox="0 0 50 14" class="svg-wave">
    <defs>
      <linearGradient id="c" x1="50%" x2="50%" y1="0%" y2="100%">
        <stop stop-color="#bed640" stop-opacity="1" offset="0%"/>
        <stop stop-color="#bed640" stop-opacity=".7" offset="50%"/>
        <stop stop-color="#bed640" stop-opacity=".5" offset="70%"/>
        <stop stop-color="#bed640" stop-opacity=".35" offset="100%"/>
      </linearGradient>
    </defs>
    <path fill="url(#c)" fill-rule="evenodd" d="
            M 27,14
            C 12,14
              5,7
              0,7
            L 0,0
            L 54,0
            L 54,7
            C 49,7
              42,14
              27,14
            Z
            ">
    </path>
  </svg>
      </section>

      <section class="container-fluid" id="prizes" ref="prizes">

        <div class="container">
          <div class="row">
            <div class="col-md-12">

              <h2 class="font-goodgirl section-title text-center text-white">Nyeremények</h2>

              <p class="lead text-center text-dark py-5 w-75 mx-auto">
                <strong>Csatlakozz az Agymenők és a Groupama közös játékához! Teszteld a tudásod négy téma valamelyikében, és miközben jól szórakozol, még az értékes nyereményekre is pályázhatsz.</strong>
              </p>

              <div class="row align-items-center">
                <div class="col-md-4 text-center"><img src="@/assets/images/nyeremeny_konyvcsomag.png" alt="" class="img-fluid"></div>
                <div class="col-md-4 text-center"><img src="@/assets/images/nyeremeny_agymenokjegy.png" alt="" class="img-fluid"></div>
                <div class="col-md-4  text-center"><img src="@/assets/images/nyeremeny_wellness.png" alt="" class="img-fluid"></div>
              </div>

              <p class="lead text-center text-dark py-2 w-75 mx-auto">
                Kisorsolunk 3 db HVG Könyvek ajándékcsomagot, 50 db Agymenő Élménynap belépőjegyet és a játék végén 1 db Wellness hétvége és a fődíj is gazdára talál majd.
              </p>

              <div class="row align-items-center">
                <div class="col-md-12 text-center"><img src="@/assets/images/hvg_landing_fonyeremeny.png" alt="" class="img-fluid"></div>
              </div>

              <p class="lead text-center text-dark py-2 w-75 mx-auto">
                <strong>Minden játékos indulhat a FŐDÍJÉRT, ami 1 000 000 Ft*.</strong>

              </p>

              <p class="text-center py-1">
                <a href="#play" class="btn btn-cta js-scroll-trigger" v-scroll-to="'#play'">Irány a játék</a>
              </p>

              <p class="text-center text-dark">
                <small>
                  *A meghirdetett összeg bruttóban értendő. A nyertes a hatályos jogszabályoknak megfelelően megállapított személyijövedelemadó-előleggel csökkentett összeget kapja kézhez.
                </small>
              </p>

            </div>
          </div>
        </div>
      </section>

      <section class="container-fluid container-banner" id="banner" ref="banner">
        <a href="https://szemelyikolcson.raiffeisen.hu/?utm_source=hvg&amp;utm_medium=display&amp;utm_content=agymenoknap&amp;utm_campaign=szemelyikolcson_ujugyfelpromo_nyar">
          <img src="https://static.hvgrt.hu/static/img/statik1900x500.jpg" alt="" class="img-fluid">
        </a>
      </section>

      <section class="container-fluid" id="play" ref="play">

        <div class="container py-5">
          <div class="row">
            <div class="col-md-12">

              <h2 class="font-goodgirl section-title text-center text-white">Játssz az Agymenőkkel!</h2>
              <h3 class="text-center font-goodgirl mt-4 section-subtitle text-white mb-5">Teszteld a tudásod és nyerj!</h3>

              <Quiz />

            </div>
          </div>
        </div>
      </section>

      <AboutUs />

    </main>

    <div class="fb-share-button hide" id="facebookLikeButton" data-href="https://agymenok.hvg.hu" data-layout="button" data-size="large"><a target="_blank" :href="facebookUrl" class="fb-xfbml-parse-ignore">Share</a></div>

  </div>
</template>

<script>
import Header from '@/components/Header'
import Quiz from '@/components/quiz'
import AboutUs from '@/components/AboutUs'

export default {
  name: 'MainContent',
  components: {
    Header,
    Quiz,
    AboutUs
  },
  data () {
    return {
      users: [],
      facebookMessage: 'Ennyire vagyok AgyMENŐ! Te tudsz jobbat? 5/4 helyes válasz. Teszteld a tudásodat te is és játssz az Agymenők kvízzel! Fődíj: 1 000 000 Ft',
      facebookUrl: 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fagymenok.hvg.hu&amp;src=sdkpreparse&amp;quote=' + this.facebookMessage
    }
  },
  methods: {
    clickedCredits: function () {
      var dataObject = {
        'event': 'pressed_credits',
        'category': 'click',
        'label': 'label_pressed_credits'
      }
      if (typeof dataLayer !== 'undefined') {
        // eslint-disable-next-line no-undef
        dataLayer.push(dataObject)
      }
    }
  }
}
</script>
