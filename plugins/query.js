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
}
