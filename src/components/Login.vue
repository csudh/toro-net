<template>
  <div v-if="!this.$store.state.user.displayName">
    <div class="container">
      <div class="form-group">
        <input class="form-control" type="email" placeholder="Email" v-model="email">
      </div>
      <div class="form-group">
        <input type="password" class="form-control" placeholder="Password" v-model="password">
      </div>
      <button class="btn btn-success" @click="login()">Login</button>
      <h4 class="mx-auto">OR<h4>
      <a href="/auth/github" class="btn btn-github">
        <i class="fa fa-github"></i> Login with Github
      </a>
    </div>
  </div>
  <div v-else>
    <div class="container">
      <h4>You are already logged in, {{this.$store.state.user.displayName}}!</h4>
    </div>
  </div>
</template>

<style scoped>
.btn-github {
  border: 0;
  background: #444;
  color: white;
}
.btn-github:hover {
  background: #2B2B2B;
  color: white;
}
</style>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      const userCredentials = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', userCredentials)
    }
  },
  mounted() {
    this.$store.dispatch('getUser')
  }
}
</script>
