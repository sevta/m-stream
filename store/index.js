export const state = () => ({})

export const mutations = {}

export const actions = {
  async nuxtServerInit({ commit, dispatch }) {
    console.log('NUXT SERVER INIT')
    try {
      const data = await dispatch('spotify/spotifyGetMe')
      console.log(data)

      if (data.data.error) {
        console.log('DONT COMMIT')
      } else if (data.data.data.body) {
        console.log('COMMIT')
        commit('spotify/setspotifyProfile', data.data.data.body)
      }
    } catch (error) {
      console.log(error)
    }
  }
}
