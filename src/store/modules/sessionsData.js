export default {
  firestorePath: 'sessions',
  firestoreRefType: 'collection',
  moduleName: 'sessionsData',
  statePropName: 'data',
  namespaced: true,
  getters: {
    getSessions: (state) => {
      return state.data
    }
  }
}