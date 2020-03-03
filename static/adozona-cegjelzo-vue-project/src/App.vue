<template>
  <div id="cegjelzoApplication">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
    <div class="cegjelzo-container">

      <transition name="fade" mode="out-in" >
        <div class="loading" v-if="autoCompleteProgress" ><span class="cegjelzo-loader"></span> <strong>Keresés...</strong></div>
      </transition>

      <div class="cegjelzo-container_top">
        <transition name="fade" mode="out-in" >
          <div class="cegjelzo-alert" v-if="showAlert">
            <div class="cegjelzo-alert_box">
              Az Adózóna Cégkereső szolgáltatásában csak az Adózóna előfizetői kérhetnek le adatokat! <br />
              Ha ön már előfizetőnk, <a href="#" onclick="return openRegister();">lépjen be</a> a szolgáltatás használatához. <br />
              Ha még nem rendelkezik előfizetéssel, <a href="/elofizetes" target="_blank">itt tájékozódhat</a> az előfizetési csomagokról.
            </div>
          </div>
        </transition>
        <div class="cegjelzo-container_row">
          <h1>Cégkereső<span>Az Adózóna céginformációs szolgáltatása a Cégjelző Kft. támogatásával</span></h1>

          <Autocomplete
            v-if="loggedIn === true"
            :place-holder-text="placeHolderInputText"
            :result-items="autoCompleteResult"
            :on-key-up="onKeyUpAutoCompleteEvent"
            :on-enter="onEnterEvent"
            :on-selected="onSelectedAutoCompleteEvent"
            :auto-complete-progress="autoCompleteProgress"
            :item-id="autoCompleteFieldId"
            :logged-in="loggedIn"
            @click.native="autoCompleteClick"
            >
          </Autocomplete>

          <AutocompleteEmpty v-else :place-holder-text="placeHolderInputText" @click.native="autoCompleteClick"/>

        </div>
      </div>

      <div class="cegjelzo-container_results">

        <div class="cegjelzo-container_row">
          <ResultList v-if="resultList" :searchresultprop="searchResult" :showresult="onSelectedAutoCompleteEvent"></ResultList>
          <Result v-if="result" :searchresultprop="computedResults" :issearchlist="isSearchList"></Result>
        </div>

        <Aszf />
        <HowTo />

      </div>
    </div>
  </div>
</template>

<script>

import Aszf from '@/components/Aszf'
import HowTo from '@/components/HowTo'
import Autocomplete from '@/components/AutoComplete'
import AutocompleteEmpty from '@/components/AutocompleteEmpty'
import ResultList from '@/components/ResultList'
import Result from '@/components/Result'
import axios from 'axios'
let BASE_URL = 'http://161-adozona.hu/api/Cegjelzo/'
// let BASE_URL = 'https://dev.api.cegjelzo.com/api/v2/'
export default {
  name: 'cegjelzoApplication',
  components: {
    Aszf,
    HowTo,
    Autocomplete,
    AutocompleteEmpty,
    ResultList,
    Result
  },
  data: function () {
    return {
      searchResultItem: [],
      searchResult: [],
      placeHolderInputText: 'Keressen cégnév, adószám alapján',
      autoCompleteResult: [],
      autoCompleteProgress: false,
      autoCompleteFieldId: 'azCegjelzoSearch',
      result: false,
      resultList: false,
      resultSource: null,
      baseShowLegals: false,
      baseShowHowTo: false,
      showAlert: false

    }
  },
  computed: {
    loggedIn: function () {
      if (window.user === 'True') {
        return true
      }
    },
    computedResults: function () {
      return this.searchResultItem
    },
    isSearchList: function () {
      if (this.resultSource === 'result-list') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    autoCompleteClick () {
      if (this.loggedIn !== true) {
        this.showAlert = true
        return false
      }
    },
    onSelectedAutoCompleteEvent (id, source, name) {
      this.autoCompleteProgress = true
      this.autoCompleteResult = []
      if (id === 'NULL') {
        id = name
      }
      // DEV
      // axios.get(BASE_URL + "search?value=" + id, {
      axios.get(BASE_URL + 'GetSearchResult?value=' + id, {
      })
        .then(response => {
          this.searchResultItem = response.data
          this.result = true
          this.resultList = false
          this.resultSource = source
          // eslint-disable-next-line no-return-assign
          setTimeout(() => this.autoCompleteProgress = false, 100)
			if (window.ga) {
				window.ga('gtm1.send', {
					hitType: 'event',
					eventCategory: 'az_cegjelzo',
					eventAction: 'company_details_page',
					eventLabel: 'sid: ' + window.sid
				})
			}
			else {
				console.log('ga is not defined');
			}		  
        })
        .catch(e => {
        })
    },

    onKeyUpAutoCompleteEvent (keywordEntered) {
      this.autoCompleteResult = []
      this.autoCompleteProgress = false
      if (keywordEntered.length > 2) {
        this.autoCompleteProgress = true
        // DEV
        // axios.get(BASE_URL + "autocomplete?search=" + keywordEntered, {
        axios.get(BASE_URL + 'GetAutocompleteResult?search=' + keywordEntered, {
        })
          .then(response => {
            var newData = []
            response.data.result.forEach(function (item, index) {
              if (item.name.toLowerCase().indexOf(keywordEntered.toLowerCase()) >= 0) {
                newData.push(item)
              }
            })
            this.autoCompleteResult = newData
            // eslint-disable-next-line no-return-assign
            setTimeout(() => this.autoCompleteProgress = false, 100)
          })
          .catch(e => {
            // eslint-disable-next-line no-return-assign
            setTimeout(() => this.autoCompleteProgress = false, 100)
            this.autoCompleteResult = []
          })
      } else {
        // eslint-disable-next-line no-return-assign
        setTimeout(() => this.autoCompleteProgress = false, 100)
        this.autoCompleteResult = []
      }
    },
    onEnterEvent (keywordEntered) {

      this.autoCompleteProgress = false
      this.autoCompleteResult = []
      if (keywordEntered.length > 2) {
        this.autoCompleteProgress = true
        // DEV
        // axios.get(BASE_URL + "autocomplete?search=" + keywordEntered, {
        axios.get(BASE_URL + 'GetAutocompleteResult?search=' + keywordEntered, {
        })
          .then(response => {
            var newData = []
            response.data.result.forEach(function (item, index) {
              if (item.name.toLowerCase().indexOf(keywordEntered.toLowerCase()) >= 0) {
                newData.push(item)
              }
            })
            this.searchResult = newData
            this.autoCompleteResult = []
            // eslint-disable-next-line no-return-assign
            setTimeout(() => this.autoCompleteProgress = false, 100)
            this.result = false
            this.resultList = true
			if (window.ga) {
				window.ga('gtm1.send', {
					hitType: 'event',
					eventCategory: 'az_cegjelzo',
					eventAction: 'companies_list',
					eventLabel: 'sid: ' + window.sid
				})
			}
			else {
				console.log('ga is not defined');
			}			
          })
          .catch(e => {
            // eslint-disable-next-line no-return-assign
            setTimeout(() => this.autoCompleteProgress = false, 100)
            this.autoCompleteResult = []
            this.searchResult = []
          })
      } else {
        // eslint-disable-next-line no-return-assign
        setTimeout(() => this.autoCompleteProgress = false, 100)
        this.autoCompleteResult = []
        this.searchResult = []
      }
    },
    toggleView (view) {
      this.view = !this.view
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
