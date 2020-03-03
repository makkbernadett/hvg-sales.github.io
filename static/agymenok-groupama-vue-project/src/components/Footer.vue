<template>

<footer class="page-footer">

  <!-- Footer Links -->
  <div class="container">

    <div class="row d-flex text-center justify-content-center mb-md-0 mb-4">

      <div class="col-md-8 col-12 mt-5">

        <div class="footer-brand  font-goodgirl">
          <img src="@/assets/images/agymenok_logo.png" />
          <span>Agymenők Nyereményjáték</span>
        </div>

        <p style="line-height: 1.7rem">
          Csatlakozz az Agymenők és a Groupama közös játékához! Teszteld a tudásod a négy téma valamelyikében, és miközben jól szórakozol, még az értékes nyereményekre is pályázhatsz. Értékes heti nyeremények és 1 000 000 Ft fődíj vár a szerencsés nyertesre. <strong>Legyél te is Agymenő!</strong>
        </p>
      </div>

    </div>

    <div class="row text-center d-flex justify-content-center ">

      <div class="col-md-12 ">
        <nav>
          <ul>

            <li class="nav-item">
              <a class="nav-link"  href="#" v-scroll-to="'#prizes'">
                Nyeremények
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" v-scroll-to="'#play'">
                Játssz az Agymenőkkel
              </a>
            </li>
            <li class="nav-item">
              <a href="http://static.hvgrt.hu/static/agymeno_nyeremenyszabalyzat_201908.pdf" class="nav-link" target="_blank">Játékszabályzat</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" v-scroll-to="'#about-us'">
                Rólunk
              </a>
            </li>
            <li class="nav-item">
              <a href="https://hvg.hu/adatvedelem" class="nav-link" target="_blank">ADATKEZELÉSI TÁJÉKOZTATÓ</a>
            </li>
            <li class="nav-item">
              <a href="https://hvg.hu/egyeb/cookiekezelesi_tajekoztato" class="nav-link" target="_blank">COOKIE-KEZELÉSI TÁJÉKOZTATÓ</a>
            </li>
          </ul>
        </nav>
      </div>

    </div>

    <hr class="rgba-white-light" style="margin: 0 15%;">

    <hr class="clearfix d-md-none rgba-white-light" style="margin: 10% 15% 5%;">

  </div>

  <div class="footer-copyright text-center py-3">© 2019 Copyright:
    Agymenők
  </div>

</footer>

</template>

<script>
export default {

}
</script>
