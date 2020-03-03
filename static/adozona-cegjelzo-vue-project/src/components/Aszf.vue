<template>
  <div>
    <h3 class="toggle-link" @click="baseShowLegals = !baseShowLegals"  :class="baseShowLegals ? 'active' : ''"><i class="material-icons">assignment</i> Felhasználási feltételek<span class="indicator"><i class="material-icons">expand_more</i><i class="material-icons">expand_less</i></span></h3>
    <div class="cegjelzo-document cegjelzo-document-intro" v-if="!baseShowLegals">
     <p>az adozona.hu portálon elérhető Céginformációs szolgáltatás online felületének felhasználói részére.
      </p>
      <p><strong>1. A működtetés alapelvei...</strong></p>
    </div>

    <div class="cegjelzo-document"  v-if="baseShowLegals">
      <p>az adozona.hu portálon elérhető Céginformációs szolgáltatás online felületének felhasználói részére</p>
      <p><strong>1. A működtetés alapelvei</strong></p>
      <ol>
      <li>A <a href="http://www.adozona.hu">adozona.hu</a> oldalon elérhető Céginformációs szolgáltatás lekérdezési lehetőséget biztosít a Cégjelző céginformációs rendszer adatbázisából azzal a céllal, hogy a szolgáltatás használói számlakiállításaik vagy számláik befogadása/ellenőrzése során kontrollálhassák a számlán szereplő partnerük alapvető adatait.</li>
      <li>Az információkat a Cégjelző Céginformációs Kft. (székhely: 1124 Budapest, Kempelen Farkas u. 1., adószám: 26163190-2-43, cégjegyzékszám: 01-09-305302) szerkeszti, és a HVG Zrt. által tulajdonolt Adózóna előfizetői férhetnek hozzá.</li>
      <li>A szolgáltatás nem képezi részét az Adózóna előfizetési csomagjának, de a használata csak előfizetők számára elérhető.</li>
      <li>A <a href="http://www.adozona.hu">adozona.hu</a> oldalon elérhető Céginformációs szolgáltatás időszakos szolgáltatás. A HVG Kiadó Zrt. fenntartja magának a jogot, hogy az előfizetési időszakok időtartamától függetlenül bármikor, előzetes bejelentés nélkül megszüntesse.</li>

      </ol>
      <p><strong>2.  Tartalom általános védelme</strong></p>
      <ol>
      <li>Valamennyi felhasználó azzal, hogy belép a HVG Kiadó Zrt. (továbbiakban Kiadó) által elérhetővé tett Céginformációs szolgáltatás oldalaira, automatikusan elfogadja az alábbi felhasználási feltételeket.</li>
      <li>A Céginformációs szolgáltatás oldalán megjelenő minden tartalom a Kiadó törvény által védett szellemi tulajdonát képezi, ezért az oldalon közzétett tartalmak és azok egyes részei (videók, ppt-k, pdf-ek, cikkek, grafikák, képek, kalkulátorok, kérdések és válaszok, jogszabályok, leírások, iratminták stb.) bármilyen módon történő felhasználása, különösen másolása, többszörözése, feldolgozása, átdolgozása, adatbázisban történő tárolása, rendszerezése, átcsoportosítása, változatlan vagy bármilyen módosítással, átszerkesztéssel történő közzététele, terjesztése, nyilvánossághoz közvetítése és kereskedelmi forgalomba hozatala kizárólag a Kiadó előzetes írásbeli engedélyével történhet (szerzői jogról szóló 1999. évi LXXVI. törvény). A felhasználó a Céginformációs szolgáltatás egyes részeit kizárólag saját felhasználás céljából használhatja.</li>
      <li>A Céginformációs szolgáltatás oldalairól értesülést és információkat átvenni és más felületeken publikálni vagy más módon nyilvánosságra hozni szigorúan TILOS. A tartalmak átvétele a szokásos hivatkozási szabályok betartása mellett sem engedélyezett! A jogosulatlan felhasználás büntető- és polgári jogi, illetőleg szerzői jogi következményeket von maga után, amelynek során a Kiadó – önkéntes teljesítés hiányában – értesítési-eltávolítási eljárásban követelheti az interneten megjelentetett jogsértő tartalom eltávolítását, illetőleg ahhoz a hozzáférés biztosításának megszüntetését, továbbá bírósági úton követelheti a jogsértés megállapítását, abbahagyását, a jogsértéstől való jövőbeni eltiltást, valamint elégtétel adását és a jogsértéssel okozott vagyoni és nem vagyoni károk megtérítését. A fentiekben foglaltak a szerzői jogról szóló 1999. évi LXXVI. törvény szerinti tiltó nyilatkozatnak minősülnek.</li>
      </ol>
      <p><strong>3. Felhasználói hozzáférések</strong></p>
      <p><strong>Felhasználó:</strong> Látogató, Regisztrált felhasználó és Adózóna előfizető.</p>
      <p><strong>Látogató:</strong> a www.adozona.hu portál regisztráció nélküli látogatói, akik a Céginformációs szolgáltatás ingyenesen és jogosultsági szinttől függetlenül elérhető tartalmait olvashatják. Cégadatok lekérdezésére a látogatók nem jogosultak.</p>
      <p><strong>Regisztrált felhasználó:</strong>a www.adozona.hu portál regisztrált látogatói hozzáférnek a site regisztrációhoz kötött tartalmaihoz, és megkapják az Adózóna Heti szemle című hetente kiküldött szakmai értesítőt. A Céginformációs szolgáltatás ingyenesen és jogosultsági szinttől függetlenül elérhető tartalmait olvashatják, cégadatok lekérdezésére a regisztrált felhasználók nem jogosultak.</p>
      <p><strong>Adózóna-előfizető:</strong> azon felhasználók, akik a látogatásuk időpontjában aktív Adózóna előfizetéssel rendelkeznek, a megrendelt előfizetési csomag típusától függetlenül díjmentesen jogosultak a Céginformációs szolgáltatás keretében cégadatok lekérdezésére.</p>
      <p><strong>4. A Kiadó felelősségének korlátozásai</strong></p>

      <ol>
      <li>A Kiadót nem terheli felelősség a fentiek szerint nem kellő elővigyázatossággal kezelt jogosultságok miatt bekövetkező esetleges károkért, valamint személyiségi jogsérelmekért.</li>
      <li>A Kiadó kizár minden felelősséget a Cégjelző Kft. által szolgáltatott Céginformációs szolgáltatás használatából fakadó minden nemű kárért. A Kiadó felhívja a figyelmet arra, hogy az lekért adatokat a felhasználók saját felelősségükre használják, alkalmazzák, annak következményei a felhasználó kizárólagos felelősségi körébe tartoznak. A Kiadó kizárja a felelősségét minden olyan kárért, mely a szolgáltatás és a segédanyagok nem szakszerű vagy nem jogszerű felhasználásából ered.</li>
      <li>A Kiadó az online működés tekintetében kizárja a felelősségét minden olyan kárért, mely előre nem látható, illetve el nem hárítható külső okból (pl. vis maior) ered. A Kiadó kifejezetten kizárja felelősségét a következményi károk tekintetében. A Szolgáltató kártérítési felelősségének felső összeghatára az Adózóna előfizetési csomag díjára korlátozott, kivéve, ha jogszabály a felelősség ilyen korlátozását kifejezetten kizárja.</li>
      </ol>
      <p><strong>4. A Cégjelző felelősségének korlátozásai</strong></p>
      <ol>
      <li>A Cégjelző céginformációs szolgáltatásokban közzétett adatok tájékoztató jellegűek. Ennélfogva a Cégjelző Kft. kizárja mindennemű felelősségét a terméken (szolgáltatáson) &#8211; az azok elkészítéséhez felhasznált (adat)források, illetőleg kiadványszerkesztési, informatikai adatkezelési és adattovábbítási módok miatt &#8211; előforduló minden hibáért, a terméken (szolgáltatáson) megjelenő szerzői véleményekre alapozott döntésért, illetve az ezekből eredő károkért. Kizárja a felelősségét különösen az olyan esetekben, amikor az Országos Cégnyilvántartó és Céginformációs Rendszer, illetve a Magyar Közlöny Lap- és Könyvkiadó Kft. (MHK) hibásan, vagy az addig szokásostól eltérő módon tesz közzé adatokat, illetve ha az Igazságügyi Minisztérium Céginformációs és Elektronikus Cégeljárásban Közreműködő Szolgálata által üzemeltetett, közhiteles cégnyilvántartás (e-cegjegyzek.hu), illetőleg a Magyar Közlöny Lap- és Könyvkiadó Kft. által kiadott, ugyancsak közhiteles Cégközlöny (e-cegkozlony.hu) adatai között eltérés van.</li>
      <li>Amennyiben szolgáltatásban eltérő adatot találnának, szíveskedjenek jelezni az <a href="mailto:info@cegjelzo.hu">info@cegjelzo.hu</a> vagy a <a href="mailto:level@cegjelzo.hu">level@cegjelzo.hu</a> címen, hogy esetleges tévedést a Cégjelző Kft. megvizsgálhassa.</li>
      </ol>
      <p><strong>5. Adatvédelem </strong></p>
      <p>A <a href="http://www.adozona.hu">www.adozona.hu</a> portálon elérhető Céginformációs szolgáltatás felhasználóira a HVG Kiadó Zrt. általános adatvédelmi elvei az irányadók.</p>
      <p>A HVG Kiadó Zrt. részletes Adatvédelmi nyilatkozatát <a href="http://hvg.hu/adatvedelem"><strong>ITT</strong></a> olvashatja el.</p>

     </div>
    <p style="text-align: center;">
      <button class="cegjelzo-button" @click="baseShowLegals = !baseShowLegals"  :class="baseShowLegals ? 'active' : ''">{{!baseShowLegals ? 'Tovább...' : 'Kevesebb...'}}</button>
    </p>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      baseShowLegals: false
    }
  }
}
</script>
