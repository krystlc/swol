import firebase from 'firebase/app'
import 'firebase/firestore'

// firebase init goes here
const config = {
  apiKey: 'AIzaSyDt7dZt1do0RiHVXQm55JaYXs734RbWd5g',
  authDomain: 'swol-42b55.firebaseapp.com',
  databaseURL: 'https://swol-42b55.firebaseio.com',
  projectId: 'swol-42b55',
  storageBucket: 'swol-42b55.appspot.com',
  messagingSenderId: '134839827188'
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')
const sessionCollection = db.collection('sessions')

export {
    db,
    auth,
    currentUser,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection,
    sessionCollection
}