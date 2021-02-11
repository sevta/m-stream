<template>
  <div
    class="relative protected w-full min-h-screen bg-white wrapper font-inter"
  >
    <div v-if="!loading">
      <div class="flex">
        <div class="flex-1 py-7 px-10">
          <nuxt />
        </div>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data: () => ({
    loading: true
  }),

  created() {
    this.$fire.auth.onAuthStateChanged(async user => {
      if (user) {
        try {
          const currentUser = await this.$getUser(user.uid)
          if (currentUser.exists) {
            let newUser = {
              username: user.displayName,
              email: user.email,
              uid: user.uid,
              avatar: user.photoURL || '',
              role: 'user'
            }
            this.setUser(newUser)
            this.setAuth(true)
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        // this.$router.push('/login')
      }
      this.loading = false
    })
  },
  methods: {
    ...mapMutations('user', ['setUser', 'setAuth'])
  }
}
</script>
