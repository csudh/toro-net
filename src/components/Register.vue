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

    <div class="form-group"><div class="question">Question: When you were young, what did you want to be when you grew up?</div>
      <input type="text" class="form-control" placeholder="Answer" v-model="question1" name="question1">
    </div>
    <div class="form-group"><div class="question">Question: Who was your childhood hero?</div>
      <input type="text" class="form-control" placeholder="Answer" v-model="question2" name="question2">
    </div>
    <div class="form-group"><div class="question">Question: What was the last name of your favorite teacher?</div>
      <input type="text" class="form-control" placeholder="Answer" v-model="question3" name="question3">
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

<style scoped>
.question {
  border: 0;
  -background: #444;
  color: black;
  text-align: left;
  
}
.btn-github:hover {
  background: #2B2B2B;
  color: white;
}
</style>

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
