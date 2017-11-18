<template>
<<<<<<< HEAD
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
=======
  <div v-if="!this.$store.state.user.displayName">
    <div class="container">
      <form @submit.prevent="validateBeforeSubmit" id="login" action="/auth/local" method="post">
        <div class="form-group" :class="{'has-error': errors.has('email') }" >
          <label for="email" class="pull-left">Email</label>
          <input name="email" id="email" v-validate="'required|email'" data-vv-delay="500" type="text" data-vv-as="email address" placeholder="Email" class="form-control">
          <p class="text-danger" align="left" v-if="errors.has('email')">{{ errors.first('email') }}</p>
        </div>
        <div class="form-group" :class="{'has-error': errors.has('password') }" >
          <label for="password" class="pull-left">Password</label>
          <input name="password" id="password" v-validate="'required'" data-vv-delay="500" type="text" data-vv-as="password" placeholder="Password" class="form-control" type="password">
          <p class="text-danger" align="left" v-if="errors.has('password')">{{ errors.first('password') }}</p>
        </div>
        <button class="btn btn-primary" form="login" type="submit">Login</button>
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
>>>>>>> 2db63b24b81a3019a4e03a2c100d9170107c4043
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
  methods: {
    validateBeforeSubmit(e) {
      e.preventDefault()
      this.$validator.validateAll().then((result) => {
        if (result) {
          // eslint-disable-next-line
          document.querySelector('#login').submit()
          return
        } 
      })
    }
  },
  mounted() {
    this.$store.dispatch('getUser')
  }
}
</script>
