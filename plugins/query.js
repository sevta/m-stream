export default ({ app }, inject) => {
  inject('createUser', async ({ username, email, uid, avatar, role }) => {
    try {
      const user = await app.$fire.firestore
        .collection('users')
        .doc(uid)
        .get()

      if (!user.exists) {
        await app.$fire.firestore
          .collection('users')
          .doc(uid)
          .set({
            username,
            email,
            uid,
            avatar,
            role
          })
        return 'done create user'
      }
      return 'user exist'
    } catch (error) {
      throw error
    }
  })

  inject('getUser', async uid => {
    try {
      const snapshot = await app.$fire.firestore
        .collection('users')
        .doc(uid)
        .get()
      return snapshot
    } catch (error) {
      throw error
    }
  })

  inject('getAllUsers', async uid => {
    if (!uid) return null
    try {
      const users = await app.$fire.firestore
        .collection('users')
        .where('uid', '!=', uid)
        .get()
      console.log(users)
      if (users.docs.length) return users.docs.map(user => user.data())
      return []
    } catch (error) {
      throw error
    }
  })

  inject('getRequestFollow', async uid => {
    try {
      const reqFollow = await app.$fire.firestore
        .collection('request_to_follow')
        .doc(uid)
        .collection('users')
        .get()
      console.log(reqFollow)
      if (!reqFollow.empty) {
        return reqFollow.docs.map(user => user.data())
      }
      return null
    } catch (error) {
      throw error
    }
  })
}
