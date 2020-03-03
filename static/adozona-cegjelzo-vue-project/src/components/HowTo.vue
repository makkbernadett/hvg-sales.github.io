<template>
  <div>
    <h3 class="toggle-link" @click="baseShowHowTo = !baseShowHowTo" :class="baseShowHowTo ? 'active' : ''"><i class="material-icons">contact_support</i>  Használati útmutató<span class="indicator"><i class="material-icons">expand_more</i><i class="material-icons">expand_less</i></span></h3>
    <div class="cegjelzo-document cegjelzo-document-intro" v-if="!baseShowHowTo">
      <ol class="ol-heading">
      <li><strong> A Céginformációs szolgáltatás</strong></li>
      </ol>
      <p>A Céginformációs szolgáltatás segítségével cégek, egyéni vállalkozók, civil szervezetek és költségvetési szervek adatbázisában kereshet...</p>
    </div>
    <div class="cegjelzo-document" v-if="baseShowHowTo">
    <ol class="ol-heading">
    <li><strong> A Céginformációs szolgáltatás</strong></li>
    </ol>
    <p>A Céginformációs szolgáltatás segítségével cégek, egyéni vállalkozók, civil szervezetek és költségvetési szervek adatbázisában kereshet.</p>
    <p>A partner ellenőrzésekor megtudhatja, hogy</p>
    <ul>
    <li>az működő vagy törölt,</li>
    <li>a partner ellen van-e eljárás folyamatban,</li>
    <li>a partner ellen volt-e eljárás folyamatban, ami már lezárult.</li>
    </ul>
    <p>&nbsp;</p>
    <ol start="2"  class="ol-heading">
    <li><strong> A Céginformációs szolgáltatás célja és használatának előnyei:</strong></li>
    </ol>
    <p>Az Adózóna Céginformációs szolgáltatásának számos előnye van, amelyeknek az a célja, hogy használatával időt spóroljon meg, hatékonyabb legyen a munkájában.</p>
    <p><strong>Több adatbázisban kereshet egyszerre</strong></p>
    <p>A kereső mezőre kattintva több adatbázisban (cégnyilvántartás, Cégközlöny, egyéni vállalkozók nyilvántartása, civil szervezetek nyilvántartása ) egyszerre indít keresést, és pár másodperc alatt valamennyiből egyszerre hívhatja le a keresett információkat.</p>
    <p><strong>Előszűrt információk</strong></p>
    <p>Az adatok mennyisége átlátható, annak tartalmát a könyvelők számára priorizáltuk a gyorsabb tájékozódás érdekében. Nem árasztjuk el ön számára érdektelen információkkal, az adatlista a könyvelői munka során fontos adatokra van szűkítve, ezzel is könnyítve az ön munkáját.</p>
    <p><strong>Gyors hozzáférés</strong></p>
    <p>A keresőmezőre kattintva azonnal elindíthatja a keresést, elég pár betűt beírnia, és látni fogja a lehetséges találatokat.</p>
    <p><strong>Magas adatminőség</strong></p>
    <p>A Cégközlöny közhiteles adatait használva a Cégjelző Kft. naprakész adatokat közvetít.</p>
    <p><strong>Könnyű kezelhetőség</strong></p>
    <p>Felhasználói felületünk gyors és kényelmes böngészést tesz lehetővé.</p>
    <p>&nbsp;</p>
    <ol start="3"  class="ol-heading">
    <li><strong>Az adatok lekérdezésének a módja</strong></li>
    </ol>
    <p>(Ha még nincs előfizetése <strong><u>itt </u></strong>tájékozódhat az előfizetési lehetőségekről.)</p>
    <ol start="1" class="ol-sub">
    <li>A Céginformációs szolgáltatást az Adózóna előfizetői érik el. Ha van aktív előfizetése, lépjen be email címével és jelszavával.</li>
    <li>Az adatok lekérdezéséhez írja be a keresőmezőbe a keresett cég nevét vagy adószámát.</li>
    <li>A megfelelő cég kiválasztását rögtön a legördülőben megjelenített előzetes találati lista segíti. A keresőmezőbe kattintva már pár karakter beütése után megjelenik a lehetséges találati lista, amelyet hosszabb keresési kifejezések vagy pontos adatsorok beírásával finomíthat.</li>
    <li>A cégadatok eléréséhez válassza ki, és kattintson a keresett cég sorára.</li>
    </ol>
    <p>&nbsp;</p>
    <ol start="4"  class="ol-heading">
    <li><strong> A lekérdezhető adatok</strong></li>
    </ol>
    <p>A Céginformációs szolgáltatás a Cégjelző céginformációs rendszer adatain alapszik, melynek forrásai közhiteles, nyilvános adatbázisok (cégnyilvántartás, Cégközlöny, egyéni vállalkozók nyilvántartása, civil szervezetek nyilvántartása).</p>
    <p>Az adatszolgáltatás köre a társas vállalkozásokra (cégekre), az egyéni vállalkozásokra, a civil szervezetekre és a költségvetési szervekre terjed ki.</p>
    <p>A lekérdezhető adatok:</p>
    <p>Cégek esetén:</p>
    <ul>
    <li>Cég rövid neve</li>
    <li>Cég hosszú neve</li>
    <li>Székhely</li>
    <li>Cégjegyzékszám</li>
    <li>Adószám</li>
    <li>Főtevékenység</li>
    <li>Alapítóokirat</li>
    <li>Cég státusza</li>
    <li>Jegyzett tőke</li>
    <li>Eljárások</li>
    <li>Bankszámlaszám</li>
    <li>Email cím</li>
    </ul>
    <p>Civilszervezetek esetén</p>
    <ul>
    <li>Regisztrációs szám</li>
    <li>Név</li>
    <li>Székhely</li>
    <li>Civilszervezet státusza</li>
    <li>Bejegyzés dátuma</li>
    <li>Alapítás dátuma</li>
    <li>Civilszervezet tevékenysége</li>
    <li>Közhasznúsági fokozat</li>
    <li>Tevékenység leírása</li>
    <li>Adószám</li>
    <li>Bankszámlaszám</li>
    </ul>
    <p>Egyéni Vállalkozók esetén</p>
    <ul>
    <li>Egyéni vállalkozó neve</li>
    <li>KSH szám</li>
    <li>Nyilvántartási szám</li>
    <li>Tevékenység</li>
    <li>Státusz</li>
    <li>Adószám</li>
    <li>Indulás dátuma</li>
    <li>Cím</li>
    </ul>
    <p>Költségvetési szervek esetén:</p>
    <ul>
    <li>Név</li>
    <li>Székhely</li>
    <li>Alaptevékenység fő TEÁOR kódja</li>
    <li>Adószám</li>
    <li>Közoktatási OM azonosító</li>
    <li>Alapítói jog gyakorlója</li>
    </ul>
    <p>&nbsp;</p>
    <p>Az adatokat, információkat a Cégjelző Céginformációs Kft. (székhely: 1124 Budapest, Kempelen Farkas u. 1., adószám: 26163190-2-43, cégjegyzékszám: 01-09-305302) szerkeszti, és a HVG Zrt. által tulajdonolt Adózóna előfizetői férhetnek hozzá.</p>
    <p>Amennyiben a szolgáltatással kapcsolatban bármi kérdése vagy észrevétele merül fel, kérjük írjon az <a href="mailto:info@cegjelzo.hu">info@cegjelzo.hu</a> címre.</p>
    <p>&nbsp;</p>
    </div>
    <p style="text-align: center;">
      <button class="cegjelzo-button" @click="baseShowHowTo = !baseShowHowTo"  :class="baseShowHowTo ? 'active' : ''">{{!baseShowHowTo ? 'Tovább...' : 'Kevesebb...'}}</button>
    </p>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      baseShowHowTo: false
    }
  }
}
</script>
