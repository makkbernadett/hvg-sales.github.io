// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import BootstrapVue from 'bootstrap-vue'
import VueScrollTo from 'vue-scrollto'
// import VueAnalytics from 'vue-ua'
// const router = new VueRouter({routes, mode, linkActiveClass})

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/less/style.less'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueScrollTo)
// Vue.use(VueAnalytics, {
//   appName: '<app_name>', // Mandatory
//   appVersion: '<app_version>', // Mandatory
//   trackingId: '<your_tracking_id>', // Mandatory
//   debug: true, // Whether or not display console logs debugs (optional)
//   // vueRouter: router, // Pass the router instance to automatically sync with router (optional)
//   // ignoredViews: ['homepage'], // If router, you can exclude some routes name (case insensitive) (optional)
//   trackPage: true // |false, // Whether you want page changes to be recorded as pageviews (website) or screenviews (app), default: false
//   // createOptions: { // Optional, Option when creating GA tracker, ref: https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference
//   //   siteSpeedSampleRate: 10
//   // }
// })

Vue.prototype.$eventBus = new Vue()

new Vue({ // eslint-disable-line no-new
  el: '#app',
  created () {
    window.fbAsyncInit = () => {
      // eslint-disable-next-line no-undef
      FB.init({
        appId: '225341210848361',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v4.0'
      })
    }
    (((d, s, id) => {
      const fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      const js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/hu_HU/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk'))
  },
  components: { App },
  template: '<App/>'
})
