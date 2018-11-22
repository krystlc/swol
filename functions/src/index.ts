import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
admin.initializeApp(functions.config().firebase)
admin.firestore().settings({timestampsInSnapshots: true})

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

    const session = { id, created, workout }
    const userRef = admin.firestore().collection('users').doc(uid)

    return userRef.update({
      sessions: admin.firestore.FieldValue.arrayUnion(session)
    })
  })

exports.deleteSessionFromUserSessions = functions.firestore
  .document('sessions/{sessionId}')
  .onDelete((snap, context) => {
    const id = context.params.sessionId
    const uid = snap.data().uid

    const userRef = admin.firestore().collection('users').doc(uid)

    return userRef.get().then(user => {
      return userRef.update({
        sessions: user.data().sessions.filter(sess => sess.id !== id)
      })
    })
  })