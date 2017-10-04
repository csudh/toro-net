<template>
  <div id="app">
    <router-link to="/">Home</router-link>
    <a v-if="!this.$store.state.user.displayName" href="/register" @click="register">Register</a>
    <a v-if="this.$store.state.user.displayName" href="/logout" @click="logout">Logout</a>
    <router-link v-else to="/login">Login</router-link>
    <h1>{{ title }}</h1>
    <hr />
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      title: 'Toro Net'
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  },
  mounted() {
    this.$store.dispatch('getUser')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}
</style>
