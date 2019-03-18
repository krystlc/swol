export default {
  firestorePath: 'sessions',
  firestoreRefType: 'collection',
  moduleName: 'sessionsData',
  statePropName: 'data',
  namespaced: true,
  sync: {
    // we can remove this guard if we fix legacy records (maybe using functions?)
    guard: ['created_at', 'created_by'] 
  },
  getters: {
    getSessions: (state) => {
      return state.data
    }
  }
}