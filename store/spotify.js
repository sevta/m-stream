export const state = () => ({
  spotifyProfile: null
})

export const getters = {
  isSpotifyConnect(state) {
    console.log(
      'spotify state',
      state.spotifyProfile,
      state.spotifyProfile !== null
    )
    return state.spotifyProfile !== null
  }
}

export const mutations = {
  setspotifyProfile(state, n) {
    state.spotifyProfile = n
  }
}

export const actions = {
  async spotifyGetMe({ commit }, n) {
    try {
      const data = await this.$axios.get('/api/spotify/me')
      // console.log('data', data)
      if (data.data.error) {
        // console.log('ERROR SPOTIFY LOGIN')
      } else {
        // commit('setspotifyProfile', data.data.data.body)
      }
      return data
    } catch (error) {
      console.log(error)
      return error
    }
  }
}
