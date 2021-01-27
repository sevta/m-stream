<template>
  <div class="container">
    <div class="text-2xl font-medium"></div>
    <pre class="text-sm">
      {{ user }}
    </pre>
    <div class="w-20 h-20 rounded-full overflow-hidden">
      <img
        class="w-full h-full object-cover object-center"
        :src="user.avatar"
        alt=""
      />
    </div>
    <AppBtn class="mt-5" @click="logout">
      Logout
    </AppBtn>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  layout: 'protected',

  computed: {
    ...mapGetters('user', ['user'])
  },
  methods: {
    ...mapActions('user', ['userLogout']),

    async logout() {
      try {
        await this.userLogout()
        this.$router.push('/login')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
