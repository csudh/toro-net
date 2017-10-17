<template>
  <div class="container">
  <div v-if="!this.$store.state.user.displayName">
   <form id="register" @submit.prevent="Validate" method="post" action='/users'>
    <div class="form-group">
      <input type="text" class="form-control" v-validate="'required'" placeholder="Display name" v-model="displayName" name="displayName">
       <p class="text-danger" align="left" v-if="errors.has('displayName')">{{ errors.first('displayName') }}</p>
    </div>
    <div class="form-group">
      <input type="text" class="form-control" v-validate="'required'" placeholder="Username" v-model="username" name="username">
       <p class="text-danger" align="left" v-if="errors.has('username')">{{ errors.first('username') }}</p>
    </div>
     <div class="form-group" >
          <input v-model="email" name="email" v-validate="'required|email'" data-vv-delay="500" type="text" data-vv-as="email address" placeholder="Email" class="form-control">
          <p class="text-danger" align="left" v-if="errors.has('email')">{{ errors.first('email') }}</p>
    </div>

    <div class="form-group"><div class="question">Question: When you were young, what did you want to be when you grew up?</div>
      <input type="text" class="form-control" v-validate="'required'" placeholder="Answer" v-model="question1" name="question1">
       <p class="text-danger" align="left" v-if="errors.has('question1')">{{ errors.first('question1') }}</p>
    </div>
    <div class="form-group"><div class="question">Question: Who was your childhood hero?</div>
      <input type="text" class="form-control" v-validate="'required'" placeholder="Answer" v-model="question2" name="question2">
       <p class="text-danger" align="left" v-if="errors.has('question2')">{{ errors.first('question2') }}</p>
    </div>
    <div class="form-group"><div class="question">Question: What was the last name of your favorite teacher?</div>
      <input type="text" class="form-control" v-validate="'required'" placeholder="Answer" v-model="question3" name="question3">
       <p class="text-danger" align="left" v-if="errors.has('question3')">{{ errors.first('question3') }}</p>
    </div>

    <div class="form-group" :class="{'has-error': errors.has('password') }" >
          <input v-model="password" name="password" v-validate.initial="{ rules: { regex: /^(?=.*[A-Za-z]+[0-9]+[!#@$*]+).{4,}$/, required: true} }" data-vv-delay="500" type="password" data-vv-as="password" placeholder="Password" class="form-control">
          <p class="alert-danger" align="left" v-if="errors.has('password')">{{ errors.first('password') }}</p>
    </div>
    <div class="form-group" :class="{'has-error': errors.has('passwordconf') }" >
          <input v-model="passwordConf" name="passwordConf" v-validate.initial="'required|confirmed:password'" data-vv-delay="500" type="password" data-vv-as="password confirmation" placeholder="Password confirmation" class="form-control">
           <p class="alert-danger" align="left" v-if="errors.has('passwordConf')">{{ errors.first('passwordConf') }}</p>
    </div>
    <button class="btn btn-success" type="submit">Register</button>
    </form>
    <li v-for="msg in messages">
    <div> 
    </div>
    </li>
  </div>
  </div>
  <div v-else>
    <h3>You cannot register while you are logged in!</h3>
  </div>
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

    Validate(e) {
      e.preventDefault();
      this.$validator.validateAll().then((result) => {
        if (result){
          document.querySelector("#register").submit();
          return
        }
      })
        
         /* if(!this.errors.any()){
            this.formSubmitted = true;
            return
          }*/
        
    },
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
  },
  mounted(){
    this.$store.dispatch(getUser);
  }
}
</script>
