import YTPlayer from 'yt-player'
import { reactive, toRefs } from '@nuxtjs/composition-api'

export default function() {
  const data = reactive({
    username: 'tesi',
    playerRef: null,
    player: null,
    vidId: null
  })

  function init() {
    data.player = new YTPlayer(data.playerRef)
    data.player.setSize(0, 0)
  }

  function play(vidId) {
    data.player = new YTPlayer(data.playerRef)
    data.player.setSize(0, 0)
    data.vidId = vidId
    data.player.load(vidId)
    data.player.play()
  }

  init()
  
  return {
    ...toRefs(data),
    play
  }
}
