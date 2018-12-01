import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
admin.initializeApp(functions.config().firebase)
admin.firestore().settings({ timestampsInSnapshots: true })

exports.addSessionToUserSessions = functions.firestore
  .document('sessions/{sessionId}')
  .onCreate((snap, context) => {
    const uid = snap.data().uid
    const id = context.params.sessionId
    const created = snap.data().created
    const workout = []

    const session = { id, created, workout }
    const userRef = admin.firestore().collection('users').doc(uid)

    return userRef.update({
      sessions: admin.firestore.FieldValue.arrayUnion(session)
    })
  })

exports.updateSessionToUserSessions = functions.firestore
  .document('sessions/{sessionId}')
  .onUpdate((change, context) => {
    const uid = change.before.data().uid
    const id = context.params.sessionId
    const newWorkout = change.after.data().workout
    const exercises = newWorkout.map(w => w.exercise)
    
    const userRef = admin.firestore().collection('users').doc(uid)

    return userRef.get().then(user => {
      const sessions = user.data().sessions
      for (const i in sessions) {
        if (sessions[i].id === id) {
          sessions[i].workout = exercises
        }
      }
      return userRef.update({sessions})
    })
  })

exports.deleteSessionFromUserSessions = functions.firestore
  .document('sessions/{sessionId}')
  .onDelete((snap, context) => {
    const uid = snap.data().uid
    const id = context.params.sessionId

    const userRef = admin.firestore().collection('users').doc(uid)

    return userRef.get().then(user => {
      return userRef.update({
        sessions: user.data().sessions.filter(sess => sess.id !== id)
      })
    })
  })