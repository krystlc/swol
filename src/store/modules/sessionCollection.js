export default {
  firestorePath: 'sessions',
  firestoreRefType: 'collection',
  moduleName: 'sessionCollection',
  statePropName: 'data',
  namespaced: true,
  getters: {
    list: state => state.data,
    getSession: state => id => state.data[id]
  },
}