<template>
  <div
    class="appSidebar flex w-full fixed -top-full sm:top-0 sm:relative sm:w-60 flex-col px-8 pt-10 min-h-screen"
  >
    <div class="w-full flex mb-10">
      <div class="text-4xl flex border-b items-center tracking-tighter">
        <div>
          mMusic
        </div>
        <div>
          <svg
            class="w-6 h-6 text-pink-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
    <div class="space-y-7">
      <div class="space-y-2">
        <div class="font-medium text-base">
          Recomended
        </div>
        <ul class="space-y-2 font-normal text-sm text-gray-500 pl-1">
          <li>Explore</li>
          <li>File</li>
          <li>Storage</li>
          <li>Explore</li>
        </ul>
      </div>
      <div class="space-y-2">
        <div class="font-medium text-base">
          Recomended
        </div>
        <ul class="space-y-2 font-normal text-sm text-gray-500 pl-1">
          <li>Explore</li>
          <li>File</li>
          <li>Storagse</li>
          <li>Explore</li>
        </ul>
      </div>
      <div class="space-y-2" v-if="!isSpotifyConnect">
        <button
          class="w-full py-2 bg-green-500 text-white cursor-pointer rounded-full"
          @click="connectSpotify"
        >
          Connect spotify
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('spotify', ['isSpotifyConnect'])
  },
  mounted() {
    console.log(this.isSpotifyConnect)
  },
  methods: {
    async connectSpotify() {
      try {
        const resp = await this.$axios.get('/api/login/spotify')
        console.log(resp)
        window.location = resp.data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
  .appSidebar {
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
    background-color: rgba(255, 255, 255, 0.4);
  }
}
</style>
