<template>
  <div id="app">
<<<<<<< HEAD
  <img src="https://images.signaturea.com/sa/assets/logos/page_seals/2302_seal_foil.png" alt="Avatar" style="width:40%" class="w3-circle w3-margin-top"><br>
    <router-link to="/">Home</router-link>
=======
    <a href="/">Home</a>
>>>>>>> 2db63b24b81a3019a4e03a2c100d9170107c4043
    <a v-if="!this.$store.state.user.displayName" href="/register" @click="register">Register</a>
    <a v-if="this.$store.state.user.displayName" href="/logout" >Logout</a>
    <a v-else href="/login">Login</a>
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
