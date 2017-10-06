<template>
  <div v-if="!this.$store.state.user.displayName">
    <div class="container">
      <form id="login" action="/auth/local" method="post">
        <div class="form-group">
          <input class="form-control" type="email" name="email" placeholder="Email">
        </div>
        <div class="form-group">
          <input type="password" class="form-control" name="password" placeholder="Password">
        </div>
        <button class="btn btn-success" form="login" type="submit">Login</button>
      </form>
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
  },
  methods: {
  },
  mounted() {
    this.$store.dispatch('getUser')
  }
}
</script>
