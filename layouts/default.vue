<template>
  <div class="relative w-full min-h-screen bg-white wrapper font-inter">
    <div v-if="!loading">
      <nuxt />
    </div>
    <div v-else>loading...</div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: true
  }),
  beforeRouteEnter(to, from, next) {
    console.log('before route called')
    //  const previousRoute = from.path || from.fullPath
    console.log(`Previous Route ${previousRoute}`)
  },
  created() {
    this.$fire.auth.onAuthStateChanged(async user => {
      if (user) {
        this.$router.go(-1)
      }
      this.loading = false
    })
  }
}
</script>
