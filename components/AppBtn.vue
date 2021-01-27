<template>
  <button
    class="btn px-5 py-2 rounded cursor-pointer"
    :class="getClasess"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<
<script>
export default {
  props: {
    type: {
      type: String,
      default: 'primary'
    }
  },
  computed: {
    getClasess() {
      if (this.type == 'primary') {
        return 'bg-red-500 text-white'
      }
    }
  }
}
</script>
