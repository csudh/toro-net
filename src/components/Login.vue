<template>
  <div class="container">
    <form method="post" action="/auth/local">
    <div class="form-group">
      <input class="form-control" type="email" placeholder="Email" v-model="email" name="email">
    </div>
    <div class="form-group">
      <input type="password" class="form-control" id="password" placeholder="Password" v-model="password" name="password">
    </div>
      <button class="btn btn-success" type="submit">Login</button>
    </form>
    <h4 class="mx-auto">OR<h4>
    <form method="get" action='/auth/github'>
    <button class="btn btn-success" type="submit"> Login with Github</button>
      </form><br>
     <!-- <a href="/forgot_password">Forgot password?</a>-->
  <li v-for="msg in messages">
    <div> {{msg}}
    </div>
    </li>
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
      const user = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', user)
    }
  }
}
</script>
