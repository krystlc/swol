import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.addSessionToUserSessions = functions.firestore
  .document('sessions/{sessionId}')
  .onCreate((snap, context) => {
    const id = context.params.sessionId
    const created = snap.data().created
    const workout = 'almost there'
    const uid = snap.data().uid

    const sess = {id, created, workout}
    const sessionRef = firestore().collection('users').doc(uid)

    return sessionRef.update({
      sessions: firestore.FieldValue.arrayUnion(sess)
    })
  })