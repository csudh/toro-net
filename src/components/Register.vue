<template>
  <div class="container">
   <form method="post" action='/users'>
    <div class="form-group">
   
      <input type="text" class="form-control" placeholder="Display name" v-model="displayName" name="displayName">
    </div>
    <div class="form-group">
      <input type="text" class="form-control" placeholder="Username" v-model="username" name="username">
    </div>
    <div class="form-group">
      <input type="text" class="form-control" placeholder="Email" v-model="email" name="email">
    </div>
    <div class="form-group">
      <input type="password" class="form-control" placeholder="Password" v-model="password" name="password">
    </div>
    <div class="form-group">
      <input type="password" class="form-control" placeholder="Confirm password" v-model="passwordConf" name="passwordConf">
    </div>
    <button class="btn btn-success" type="submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      displayName: '',
      username: '', 
      email: '',
      password: '',
      passwordConf: '' 
    }
  },
  methods: {
    registerUser() {
      const newUser = {
        displayName: this.displayName,
        username: this.username,
        email: this.email,
        password: this.password,
        passwordConf: this.passwordConf,
      }
      this.$store.dispatch('register', newUser)
    }
  }
}
</script>
