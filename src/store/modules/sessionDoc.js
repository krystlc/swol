export default {
  firestorePath: 'sessions/{docId}',
  firestoreRefType: 'doc',
  moduleName: 'sessionDoc',
  statePropName: 'data',
  namespaced: true,
  getters: {
    sessionDate: state => {
      const time = state.data.created || state.data.created_by
      if (time) return time
      return 'woops!'
    },
    sessionWorkout: state => {
      if (state.data.workout) return state.data.workout
      return []
    },
    fetchedSession: state => state.data
  }
}