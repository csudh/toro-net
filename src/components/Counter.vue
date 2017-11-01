<template>
  <div v-if="this.$store.state.user.displayName">
    <h3>Dashboard {{this.$store.state.user.displayName}}</h3>
    <h4>Count: {{this.$store.state.counts.count.count}}</h4>
    <button class="btn btn-primary" @click="incCount()">Increment Count</button>
  </div>
  <div class="container" v-else>
    <h4>You must login to access Toro Net!</h4>
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
