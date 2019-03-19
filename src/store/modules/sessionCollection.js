export default {
  firestorePath: 'sessions',
  firestoreRefType: 'collection',
  moduleName: 'sessionCollection',
  statePropName: 'data',
  namespaced: true,
  getters: {
    list: state => state.data,
    storedSession: state => id => state.data.hasOwnProperty(id) ? state.data[id] : false
  },
}