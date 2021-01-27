<template>
  <div
    class="flex flex-col items-center justify-center w-full min-h-screen px-3 py-2 mx-auto text-warmGray-900 max-w-7xl"
  >
    <div class="flex flex-col space-y-2">
      <div class="font-bold tracking-tighter text-9xl">Stream.</div>
      <button
        class="bg-red-500 px-5 rounded py-2 text-white font-medium cursor-pointer"
        @click="loginWithGoogle"
      >
        Sign in with Google
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({}),

  mounted() {},

  methods: {
    ...mapActions('user', ['userSignInWithGoogle']),
    async loginWithGoogle() {
      try {
        const resp = await this.userSignInWithGoogle()
        if (resp) {
          this.$router.push('/')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
