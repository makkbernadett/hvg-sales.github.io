import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// const settings = {timestampsInSnapshots: true}

const config = {
  apiKey: 'AIzaSyD_5T4NwENsA-My9nV35T-yVR_EePPz8Fw',
  authDomain: 'agymenokgroupamabackend.firebaseapp.com',
  databaseURL: 'https://agymenokgroupamabackend.firebaseio.com',
  projectId: 'agymenokgroupamabackend',
  storageBucket: '',
  messagingSenderId: '826288397304',
  appId: '1:826288397304:web:4907292371e050c0'
}
firebase.initializeApp(config)

export default firebase
