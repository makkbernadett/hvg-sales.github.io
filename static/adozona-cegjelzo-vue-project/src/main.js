// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'es6-promise/auto'
import './assets/css/main.css'

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    getType (key, subkey) {
      let types = {
        'type':
            {
              'companies': 'cég',
              'civil_orgs': 'civil szervezet',
              'self_employed': 'egyéni vállalkozó',
              'budget_orgs': 'költségvetési szerv'
            },
        'status':
            {
              'Active': 'aktív',
              'Inactive': 'inaktív'
            },
        'proceedings': {
          true: 'eljárás alatt',
          false: 'nincs eljárás alatt'
        }
      }
      return types[key][subkey]
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
