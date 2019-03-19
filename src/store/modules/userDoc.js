export default {
  firestorePath: 'users/{userId}',
  firestoreRefType: 'doc',
  moduleName: 'userDoc',
  statePropName: 'data',
  namespaced: true,
  getters: {
    sessionList: store => store.data.sessions
  }
}