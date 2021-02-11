<template>
  <div
    class="appPlayer fixed bottom-0 z-30 flex items-center left-0 w-full p-3 shadow border-t"
  >
    <div
      class="yt-play absolute -left-full visibility-hidden "
      ref="ytplayer"
    ></div>
    <!-- left -->
    <div class="flex items-center">
      <div
        class="playerThumb w-10 h-10 bg-red-500 rounded-full overflow-hidden ring-2 ring-pink-400"
      >
        <img
          class="w-full h-full object-cover object-center"
          :src="thumbnail"
          alt=""
        />
      </div>
      <div class="ml-4 w-44">
        <div class="text-smtext-gray-800 font-medium">
          {{ artist }}
        </div>
        <div class="text-xs mt-px text-gray-500 font-medium truncate">
          {{ songTitle }}
        </div>
      </div>
    </div>
    <!-- end -->

    <!-- controls -->
    <div class="flex items-center ml-5 text-sm space-x-2">
      <div class="cursor-pointer">
        <svg
          class="w-6 h-6 text-red-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z"
          ></path>
        </svg>
      </div>
      <div class="cursor-pointer">
        <svg
          class="w-8 h-8 text-red-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <div class="cursor-pointer">
        <svg
          class="w-6 h-6 text-red-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z"
          ></path>
        </svg>
      </div>
    </div>
    <!-- end controls -->

    <!-- seek -->
    <div class="flex-1 pl-10 ml-5 w-60">
      <vue-slider
        v-model="value"
        :min="0"
        :max="duration"
        :marks="marks"
      ></vue-slider>
    </div>
    <!-- end seek -->
  </div>
</template>

<script>
import YTPlayer from 'yt-player'
export default {
  data() {
    return {
      value: 0,
      ytplayer: null,
      songTitle: '-',
      duration: 0,
      marks: [0, 0],
      thumbnail:
        'https://steveladdmusic.com/wp-content/themes/americanaura/assets/images/default-record-thumbnail.jpg'
    }
  },
  mounted() {
    this.$nuxt.$on('play-music', data => {
      this.playMusic(data)
    })
  },
  methods: {
    initYtPlayer() {},
    setupPlayer(data) {
      this.$nextTick(() => {
        this.ytplayer = new YTPlayer(this.$refs.ytplayer, {
          width: 0,
          height: 0
        })
        this.ytplayer.load(data.id)
        this.ytplayer.setVolume(100)
        this.ytplayer.play()
        this.songTitle = data.title
        this.thumbnail = data.thumbnail
        this.artist = data.author

        document.querySelector('.playerThumb').classList.add('animate')

        this.ytplayer.on('playing', () => {
          console.log('PLAYING')
          this.duration = this.ytplayer.getDuration()
          this.marks = [0, this.ytplayer.getDuration()]
        })

        this.ytplayer.on('timeupdate', seconds => {
          let duration = this.ytplayer.getDuration()
          // console.log({
          //   seconds,
          //   duration
          // })
        })
      })
    },
    playMusic(data) {
      document.querySelector('.playerThumb').classList.remove('animate')
      if (this.ytplayer) {
        this.ytplayer.destroy()

        this.setupPlayer(data)
      } else {
        this.setupPlayer(data)
      }
    }
  }
}
</script>

<style>
@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
  .appPlayer {
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
    background-color: rgba(255, 255, 255, 0.7);
  }
}

.playerThumb.animate {
  animation: roatatespin 0.3s linear infinite;
}

@keyframes roatatespin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
