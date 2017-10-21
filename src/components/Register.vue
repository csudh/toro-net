<template>
    <div class="container">
      <form action="/users" method="post" >
      <div class="form-group">
        <input type="text" class="form-control" name="displayName" placeholder="Display name" v-model="displayName">
      </div>
      <div class="form-group">
        <input type="text" class="form-control" name="username" placeholder="Username" v-model="username">
      </div>
      <div class="form-group">
       <input type="text" class="form-control" name="email" placeholder="Email" v-model="email">
      </div>
      <div class="form-group">
        <input type="password" class="form-control" name="password" placeholder="Password" v-model="password">
      </div>
      <div class="form-group">
        <input type="password" class="form-control" name="passwordConf" placeholder="Confirm password" v-model="passwordConf">
      </div>
      <button class="btn btn-success" type="submit" >Register</button>
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
