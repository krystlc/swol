import router from '@/router'
import { sessionCollection } from '@/firebaseConfig'

export default {
  methods: {
    create() {
      const created = new Date()
      const session = {
        created,
        workout: [],
        uid: this.getUserId
      }
      sessionCollection.add(session)
        .then(result => {
          router.push(`/s/${result.id}`)
        })
        .catch(err => {
          // TODO: replace with toast
          alert('someone has to fix this', err)
        })
    }
  }
}