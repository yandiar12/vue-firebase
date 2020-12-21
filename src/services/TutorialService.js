import firebase from '../config/firebase'

const db = firebase.collection('/tutorials')

class TutorialService {
  getAll() {
    return db
  }

  create(tutorial) {
    return db.add(tutorial)
    // return db.doc('tutorial').set(tutorial)
  }

  update(id, value) {
    return db.doc(id).update(value)
  }

  delete(id) {
    return db.doc(id).delete()
  }
}

export default new TutorialService()