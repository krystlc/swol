import firebase from 'firebase/app'
import 'firebase/firestore'

// firebase init goes here
const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE,
  projectId: process.env.VUE_APP_PROJECT_ID,
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const sessionCollection = db.collection('sessions')

export {
  db,
  auth,
  provider,
  currentUser,
  sessionCollection
}