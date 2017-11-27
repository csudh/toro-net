<template>
  <div id="app">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/">Toro Net</a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li><a v-if="!this.$store.state.user.displayName" href="/register" @click="register">Register</a></li>
            <li><a v-if="this.$store.state.user.displayName" href="/logout" >Logout</a></li>
            <!--<li><a v-if="!this.$store.state.user.displayName" href="/login">Login</a></li>-->
          </ul>
        </div>
      </div>
    </nav>
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
  color: #363636;
  margin-top: 0px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #363636;
}
.btn {
  border: 0;
  background: #860038;
  color: white;
  outline: 0;
}
.btn:active {
  background: #860038;
  outline: 0;
}
.btn:focus {
  background: #860038;
  outline: 0;
}
.btn:active:focus {
  background: #860038;
  outline: 0;
}
.btn-default {
  border: 0;
  background: #860038;
  color: white;
}
.btn-primary {
  border: 0;
  background: #860038;
  color: white;
}
.btn-primary:hover {
  background: #EFBA08;
  color: white;
}
</style>
