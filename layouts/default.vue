<template>
  <div
    class="appWrapper relative overflow-hidden w-full min-h-screen wrapper font-inter"
  >
    <div class="fixed top-0 z-0 left-0 w-full h-screen">
      <img
        class="w-full h-full absolute top-0 left-0 object-cover object-center"
        :src="wallpaper"
        alt=""
      />
    </div>
    <div class="playerWallpaper fixed top-0 z-10 left-0 w-full h-screen"></div>
    <div v-if="!loading" class="relative z-20">
      <div class="flex overflow-hidden w-full h-screen">
        <AppSidebar />
        <div class="w-full pt-2 pb-20 px-5 overflow-y-scroll">
          <nuxt />
        </div>
      </div>
    </div>
    <div v-else>loading...</div>
    <AppPlayer />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    loading: false,
    wallpaper: ''
  }),
  beforeRouteEnter(to, from, next) {
    console.log('before route called')
    //  const previousRoute = from.path || from.fullPath
    console.log(`Previous Route ${previousRoute}`)
  },
  mounted() {
    this.$nuxt.$on('play-music', data => {
      this.wallpaper = data.thumbnail
    })
  },
  async created() {
    console.log('created')

    return
    this.$fire.auth.onAuthStateChanged(async user => {
      if (user) {
        // this.$router.go(-1)
      }
      this.loading = false
    })
  }
}
</script>

<style scoped>
@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
  .playerWallpaper {
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
    background-color: rgba(255, 255, 255, 0.8);
  }
}
</style>
