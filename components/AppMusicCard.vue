<template>
  <div class="relative cursor-pointer" @click="onCardClick">
    <div class="rounded w-full h-44 overflow-hidden">
      <img
        class="w-full h-full object-center object-cover"
        :src="thumbnail"
        alt=""
      />
    </div>
    <div class="p-3 space-y-1">
      <div class="flex ">
        <div class="flex-1">
          {{ author }}
        </div>
        <div class="flex justify-end text-xs">
          3:14
        </div>
      </div>
      <div class="text-sm text-gray-500">
        {{ title }}
      </div>
      <div class="flex pt-2">
        <div
          class="text-white rounded flex px-2 text-sm py-px"
          :class="[
            type == 'youtube' && 'bg-red-500',
            type == 'spotify' && 'bg-green-500'
          ]"
        >
          <a :href="url" target="_blank">{{ type }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String
    },
    id: {
      type: String
    },
    thumbnail: {
      type: String
    },
    author: {
      type: String
    },
    title: {
      type: String
    },
    duration: {
      type: Number
    },
    url: {
      type: String
    }
  },
  methods: {
    onCardClick() {
      console.log('ok', this.$props)
      this.$emit('click', {
        ...this.$props
      })
    }
  }
}
</script>
