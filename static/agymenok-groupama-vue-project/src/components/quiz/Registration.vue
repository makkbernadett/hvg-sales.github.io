<template>
  <div class="registration">

    <div class="row  align-items-center">
      <div class="col-md-12">
        <h3 class="mb-3 text-center">Regisztráció a nyereményjátékra</h3>
        <hr />
        <p class="text-center">Ahhoz, hogy részt vehess a sorsoláson, kérjük add meg az alábbi adataidat.</p>

        <form v-on:submit.prevent="onSubmit">
          <div class="form-row mb-3">
            <div class="form-group col-md-6">
              <label for="lastname" class="col-form-label">Vezetéknév</label>
              <input type="text" class="form-control" id="lastname" placeholder="Add meg a vezetékneved" v-model="info.lastname" @focus="inputFocus" @blur="inputBlur">
              <span id="error-lastname" class="error w-100 d-none"><i class="material-icons">error_outline</i> A vezetéknév megadása kötelező!</span>
            </div>
            <div class="form-group col-md-6">
              <label for="firstname" class="col-form-label">Keresztnév</label>
              <input type="text" class="form-control" id="firstname" placeholder="Add meg a keresztneved" v-model="info.firstname"  @focus="inputFocus" @blur="inputBlur">
              <span id="error-firstname" class="error w-100 d-none"><i class="material-icons">error_outline</i> A vezetéknév megadása kötelező!</span>
            </div>
          </div>
          <div class="form-row mb-3">
            <div class="form-group col-md-4">
              <label for="email" class="col-form-label">Email cím</label>
              <input type="email" class="form-control" id="email" placeholder="Add meg az email címed" v-model="info.email"  @focus="inputFocus" @blur="inputBlur">
              <span id="error-email" class="error w-100 d-none"><i class="material-icons">error_outline</i> Az email cím megadása kötelező!</span>
              <span id="error-email-exist" class="error w-100 d-none">Ezzel az email címmel már regisztráltak!</span>
            </div>
            <div class="form-group col-md-4">
              <label for="phone" class="col-form-label">Telefonszám <small>(06XXXXXXXX)</small></label>
              <input type="text" class="form-control" id="phone" placeholder="Add meg a telefonszámod" v-model="info.phone"  @focus="inputFocus" @blur="inputBlur">
              <span id="error-phone" class="error w-100 d-none"><i class="material-icons">error_outline</i> A telefonszám megadása kötelező!</span>
            </div>
            <div class="form-group col-md-4">
              <label for="birthdate" class="col-form-label">Születési idő <small>(ÉÉÉÉ.HH.NN)</small></label>
              <input type="text" class="form-control" id="birthdate" placeholder="Születési idő" v-model="info.birthdate"  @focus="inputFocus" @blur="inputBlur">
              <span id="error-birthdate" class="error w-100 d-none"><i class="material-icons">error_outline</i> A születési idő megadása kötelező!</span>
            </div>

          </div>

          <div class="form-group">
            <div class="form-check pl-0">
              <div class="d-flex custom-radio">
                <input type="checkbox" id="accept" name="accept" class="form-check-input" v-model="info.accept"  @focus="inputFocus" @blur="inputBlur">
                <label for="accept">
                  Elfogadom a <a href="http://static.hvgrt.hu/static/agymeno_nyeremenyszabalyzat_201908.pdf" target="_blank">játékszabályzatot</a> és az <a href="https://hvg.hu/adatvedelem" target="_blank">adatkezelési nyilatkozatot</a>

                </label>
              </div>
              <span id="error-accept" class="error w-100 d-none"><i class="material-icons">error_outline</i> A nyilatkozat elfogadása kötelező!</span>

            </div>
          </div>
          <p class="text-center">
            <button type="submit" class="btn btn-primary">Regisztrálok! <i class="material-icons pl-2">local_play</i></button>
          </p>
          <p class="text-center">
            Az összes mező kitöltése kötelező.
          </p>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '@/firebase'

export default {
  data () {
    return {
      ref: firebase.firestore().collection('users'),
      users: [],
      isLoading: false,
      info: {
        lastname: null,
        firstname: null,
        email: null,
        phone: null,
        birthdate: null,
        accept: false,
        registerdate: new Date()
      },
      errors: {
        lastname: 'A vezetéknév megadása kötelező!',
        firstname: 'A keresztnév megadása kötelező!',
        email: 'Az email cím megadása kötelező!',
        phone: 'A telefonszám megadása kötelező!',
        birthdate: 'A születési idő megadása kötelező!',
        accept: 'A feltételek elfogadása kötelező!'
      },
      userLoggedIn: false
    }
  },
  methods: {
    onSubmit () {
      if (this.handleErrors()) {
        this.removeErrorClass()
        this.$parent.isLoading = true
        // https://www.fullstackfirebase.com/cloud-firestore/notes
        this.logInAnonymusUser()
        // this.$ua.trackEvent('form', 'Submit', 'Regisztráció')
        // console.log('regisztracio')
      } else {
        console.log('hiba')
      }
    },
    handleErrors () {
      this.removeErrorClass()
      let errors = []
      for (const [key, value] of Object.entries(this.info)) {
        if (value === null || value === '' || value === false) {
          // errors.push(key)
          errors[key] = this.errors[key]
          // console.log(errors)
          let errorDisplay = document.getElementById('error-' + key)
          errorDisplay.classList.add('d-flex')
        } else {
          // checking phone number
          if (key === 'phone') {
            let phoneError = this.checkPhoneNumber()
            // console.log('phoneError', phoneError)
            if (phoneError.error) {
              errors['phone'] = ''
              phoneError.messages.forEach((error) => {
                errors['phone'] += error
              })
            }
          }
          // checking age and date format
          if (key === 'birthdate') {
            let dateError = this.checkBirthDate()
            // console.log('dataerror', dateError)
            if (dateError.error) {
              errors['birthdate'] = ''
              dateError.messages.forEach((error) => {
                errors['birthdate'] += error
              })
            }
          }
        }
      }

      if (Object.keys(errors).length > 0) {
        console.log(errors)
        // display errors
        for (const [key] of Object.entries(errors)) {
          let errorDisplay = document.getElementById('error-' + key)
          errorDisplay.innerText = errors[key]
          errorDisplay.classList.add('d-flex')
        }
        return false
      } else {
        return true
      }
    },
    removeErrorClass () {
      let errorDisplays = document.querySelectorAll('.error.d-flex')
      errorDisplays.forEach(function (item) {
        item.classList.remove('d-flex')
      })
    },
    checkPhoneNumber () {
      // regular expression to match required phone formats
      let re = /((?:\+?3|0)6)(?:-|\()?(\d{1,2})(?:-|\))?(\d{3})-?(\d{3,4})/
      let phoneNumber = this.info.phone
      // console.log('telszám', phoneNumber)
      let phoneError = {error: false, messages: []}
      let errorCount = 0
      if (phoneNumber !== '') {
        let regs = phoneNumber.match(re)
        // console.log('regs', regs)
        if (regs === null) {
          phoneError.error = true
          phoneError.messages[errorCount] = 'Helytelen telefonszám formátum. Ajánlott formátumok: 0611231234 +3611231234 06-1-123-1234'
        }
        return phoneError
      }
    },
    checkBirthDate () {
      // regular expression to match required date format
      let re = /^(\d{4}).(\d{1,2}).(\d{1,2})/
      let birthDate = document.getElementById('birthdate')
      let dateError = {error: false, messages: []}
      let errorCount = 0
      if (birthDate.value !== '') {
        let regs = birthDate.value.match(re)
        if (regs !== null) {
          // year value between 1900
          if (regs[1] < 1900) {
            dateError.error = true
            dateError.messages[errorCount] = 'A születési évnek nagyobbank kell lennie, mint 1900. '
            errorCount++
          }
          // month value between 1 and 12
          if (regs[2] < 1 || regs[2] > 12) {
            dateError.error = true
            dateError.messages[errorCount] = 'Érvénytelen születési hónap (az értéknek 1 és 12 között kell lennie). '
            errorCount++
          }
          // day value between 1 and 31
          if (regs[3] < 1 || regs[3] > 31) {
            dateError.error = true
            dateError.messages[errorCount] = 'Érvénytelen születési nap (az értéknek 1 és 31 között kell lennie). '
            errorCount++
          }
          // age must be over 18
          if (new Date(parseInt(regs[1]) + 18, regs[2] - 1, regs[3]) >= new Date()) {
            dateError.error = true
            dateError.messages[errorCount] = 'A játékban csak 18 éven felüliek vehetnek részt! '
            errorCount++
          }
        } else {
          dateError.error = true
          dateError.messages[errorCount] = 'Hibás születési idő formátum. A helyes formátum: ÉÉÉÉ.HH.NN'
        }
      }
      return dateError
    },
    handleSingleError (item) {
      if (this.info[item] !== null) {
        let errorMessage = document.getElementById('error-' + item)
        if (errorMessage.classList.contains('d-flex')) { errorMessage.classList.remove('d-flex') }
      }
    },
    inputFocus (event) {
      var target = event.target || event.srcElement
      var id = target.id
      this.handleSingleError(id)
    },
    inputBlur (event) {
      var target = event.target || event.srcElement
      var id = target.id
      this.handleSingleError(id)
    },
    startRegistration () {
      let self = this
      self.userLoggedIn = true
      // check if email exists
      let exist = 0
      self.ref.where('email', '==', self.info.email)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            exist++
          })
          if (exist > 0) {
            // already exist
            self.$parent.isLoading = false
            document.getElementById('error-email-exist').classList.add('d-flex')
          } else {
            // not exist, free to register
            self.info.registerdate = new Date()
            self.ref.add(self.info).then((docRef) => {
              this.logOutAnonymusUser()
              self.$parent.isLoading = false
              self.info.lastname = null
              self.info.firstname = null
              self.info.email = null
              self.info.phone = null
              self.info.birthdate = null
              self.info.accept = false
              self.info.registerdate = null
              self.$eventBus.$emit('nextStep')
              this.sendEvent()
            })
              .catch((error) => {
                console.log('Error adding document: ', error)
              })
          }
        })
        .catch(err => {
          console.log('Error getting documents', err)
        })
    },
    logInAnonymusUser () {
      firebase.auth().signInAnonymously().then(response => {
        this.startRegistration()
        return true
      })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          console.log('auth', errorCode, errorMessage)
          return false
        })
    },
    logOutAnonymusUser () {
      firebase.auth().signOut()
        .then(response => {
        // Sign-out successful.
          this.userLoggedIn = false
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    sendEvent () {
      var dataObject = {
        'event': 'sikeres_regisztracio',
        'category': 'agymenok_regisztracio',
        'label': 'agymenok'
      }
      if (typeof dataLayer !== 'undefined') {
        // eslint-disable-next-line no-undef
        dataLayer.push(dataObject)
      }
    }
  },
  mounted: function () {
    this.logOutAnonymusUser()
  }
}
</script>
