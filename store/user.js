import firebase from 'firebase/app'

export const state = () => ({
  username: '',
  email: '',
  uid: '',
  avatar: '',
  auth: false,
  role: 'user'
})

export const getters = {
  user(state) {
    return {
      username: state.username,
      email: state.email,
      uid: state.uid,
      avatar: state.avatar,
      role: state.role
    }
  }
}

export const mutations = {
  setUser(state, payload) {
    state.username = payload.username || ''
    state.email = payload.email
    state.uid = payload.uid
    state.avatar = payload.avatar
  },

  setAuth(state, payload) {
    state.auth = payload.auth
  }
}

export const actions = {
  userSignupWithEmail({ commit }, payload) {},

  userSigninWithEmail({ commit }, payload) {},

  async userSignInWithGoogle({ commit }) {
    let provider = new firebase.auth.GoogleAuthProvider()

    try {
      const result = await this.$fire.auth.signInWithPopup(provider)
      let credential = result.credential
      let token = credential.accessToken
      let user = result.user

      let newUser = {
        username: user.displayName,
        email: user.email,
        uid: user.uid,
        avatar: user.photoURL,
        role: 'user'
      }

      commit('setUser', newUser)
      commit('setAuth', true)

      const createUser = await this.$createUser(newUser)
      return createUser
    } catch (error) {
      var errorCode = error.code
      var errorMessage = error.message
      var email = error.email
      var credential = error.credential

      return {
        errorCode,
        error,
        errorMessage,
        email,
        credential
      }
    }
  },

  userLogout({ commit }) {
    this.$fire.auth
      .signOut()
      .then(() => {
        commit('setAuth', false)
        commit('setUser', {
          username: '',
          email: '',
          uid: '',
          avatar: '',
          role: ''
        })
        return 'logout'
      })
      .catch(error => {
        throw error
      })
  }
}
