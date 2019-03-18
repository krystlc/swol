export default {
  firestorePath: 'sessions',
  firestoreRefType: 'collection',
  moduleName: 'sessionsData',
  statePropName: 'data',
  namespaced: true,
  sync: {
    // we can remove this guard if we fix legacy records (maybe using functions?)
    guard: ['created_at', 'created_by'],
    addedHook: function (updateStore, doc, id, store) {
      updateStore(doc)
    }
  },
  getters: {
    getSessions: state => state.data,
    getSession: (state) => (id) => {
      return state.data.find(sess => sess.id === id)
    }
  }
}