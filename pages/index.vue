<template>
  <div class="">
    <div class="mt-5">
      <div class="">
        <AppSearchMusic />
      </div>
      <div>
        <div class="text-4xl font-medium tracking-tighter mb-5">
          Explore
        </div>
        <div class="grid grid-cols-5 gap-5">
          <AppMusicCard
            thumbnail="https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/12/Fleetwood-Mac-Rumours-album-covers-billboard-1000x1000.jpg?auto=format&q=60&fit=max&w=930"
            author="Artist"
            title="Song Name"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from '@nuxtjs/composition-api'
export default {
  setup() {
    onMounted(() => {
      console.log('mount')
    })
  }
}
</script>
