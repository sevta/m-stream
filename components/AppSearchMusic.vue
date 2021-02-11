<template>
  <div class="w-full">
    <input
      class="w-full bg-transparent border border-gray-500 rounded-full px-5 py-3 :focus:border-0"
      type="text"
      placeholder="search.."
      v-model="search"
      name=""
      value=""
      @keydown.enter="submitSearch"
    />
    <div>
      <div v-if="loadingSearch">
        loading
      </div>
      <div v-else class="searchResult ">
        <div
          v-if="filterResultsYoutube.length"
          class="flex justify-between mr-3 mt-5 "
        >
          <div class="text-4xl font-medium tracking-tighter">
            Results
          </div>
          <button @click="clearSearch">clear</button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-6 gap-6 mt-4">
          <AppMusicCard
            v-for="(item, idx) in filterResults"
            :key="idx"
            :id="item.id"
            :thumbnail="item.thumbnail"
            :author="item.author"
            :title="item.title"
            @click="playMusic"
            :type="item.type"
            :url="item.url"
          />
          <div
            class="cursor-pointer hidden"
            v-for="(item, idx) in filterResultsYoutube"
            :key="idx"
            @click="playMusic(item)"
          >
            <div>
              <div>
                <div>
                  <img
                    class="rounded"
                    :src="item.thumbnails ? item.thumbnails[0].url : ''"
                    alt=""
                  />
                  <div class="font-medium mt-2">
                    {{ item.author.name }}
                  </div>
                  <div class="font-medium text-gray-500 text-xs mt-2">
                    {{ item.title }}
                  </div>
                  <a
                    class="mt-2 text-xs leading-normal text-pink-600 underline"
                    :href="item.url"
                    >{{ item.url }}</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs, reactive, onMounted, computed } from '@nuxtjs/composition-api'
function dynamicSort(property) {
  var sortOrder = 1
  if (property[0] === '-') {
    sortOrder = -1
    property = property.substr(1)
  }
  return function(a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0
    return result * sortOrder
  }
}
export default {
  setup(props, { root: { $axios, $nuxt } }) {
    const data = reactive({
      search: '',
      results: [],
      resultYoutube: [],
      resultSpotify: [],
      nextToken: '',
      loadingSearch: false
    })

    const filterResultsYoutube = computed(() =>
      data.resultYoutube.filter(item => item.type == 'video')
    )

    const filterResults = computed(() =>
      data.results.sort(dynamicSort('author'))
    )

    async function submitSearch() {
      data.loadingSearch = true
      try {
        const resp = await $axios.get(
          `http://localhost:3000/api/search/?q=${data.search}`
        )
        if (resp.data.result.items) {
          this.resultYoutube = []
          let youtubeResult = resp.data.result.items.filter(
            item => item.type == 'video'
          )
          console.log(youtubeResult)
          youtubeResult.map(track => {
            data.resultYoutube.push({
              id: track.id,
              title: track.title,
              thumbnail: track.thumbnails[0].url,
              author: track.author.name,
              type: 'youtube',
              url: track.url,
              preview_url: null
            })
          })
        }
        if (resp.data.result_spotify) {
          this.resultSpotify = []
          let spotifyResult = resp.data.result_spotify
          console.log(spotifyResult)
          spotifyResult.map(track => {
            data.resultSpotify.push({
              id: track.id,
              title: track.name,
              thumbnail: track.album.images[1].url,
              author: track.artists ? track.artists[0].name : '-',
              type: 'spotify',
              url: track.uri,
              preview_url: track.preview_url
            })
          })
          console.log('spotify', this.resultSpotify)
        }
        console.log('youtube', this.resultYoutube)

        data.results = []
        // this.results = [...data.resultYoutube, ...data.resultSpotify]
        data.results = [...data.resultYoutube, ...data.resultSpotify]
        console.log({
          merge: data.results
        })
      } catch (error) {
        console.log(error)
      } finally {
        data.loadingSearch = false
      }
    }

    function playMusic({ id, title, thumbnail, author }) {
      $nuxt.$emit('play-music', {
        type: 'youtube',
        id,
        title,
        thumbnail,
        author
      })
    }

    function clearSearch() {
      data.results = []
      data.search = ''
    }

    function onClick(data) {
      console.log(data)
    }

    return {
      ...toRefs(data),
      submitSearch,
      playMusic,
      filterResultsYoutube,
      clearSearch,
      onClick,
      filterResults
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}
.slide-enter,
.slide-leave-active {
  transform: translateX(-100%);
}
.list-enter-active,
.list-leave-active {
  transition: all 0.6s;
}
.list-enter,
.list-leave-active {
  transform: translateX(-350px);
  opacity: 0;
}
</style>
