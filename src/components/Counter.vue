<template>
  <div v-if="this.$store.state.user.displayName">
    <h3>Dashboard {{this.$store.state.user.displayName}}</h3>
    <h4>Count: {{this.$store.state.counts.count.count}}</h4>
    <button class="btn btn-primary" @click="incCount()">Increment Count</button>
  </div>
  <div v-else>
    <router-link to="/login">
      <button class="btn btn-primary">Login</button>
    </router-link>
  </div>
</template>

<script>
export default {
  methods: {
    incCount() {
      this.$store.dispatch('incCount', this.$store.state.counts.count.count)
    }
  },
  mounted() {
    this.$store.dispatch('getCount')
    this.$store.dispatch('getUser')
  }
}
</script>
