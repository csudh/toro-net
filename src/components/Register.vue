<template>
  <div class="container">
<<<<<<< HEAD
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
=======
    <div v-if="!this.$store.state.user.displayName">
      <form @submit.prevent="validateBeforeSubmit" id="register" action="/users" method="post">
        <div class="form-group" :class="{'has-error': errors.has('displayName') }" >
          <label for="displayName" class="pull-left">Display name</label>
          <input v-model="displayName" name="displayName" id="displayName" v-validate="'required|alpha_spaces'" data-vv-delay="500" type="text" data-vv-as="display name" placeholder="Display name" class="form-control">
          <p class="text-danger" align="left" v-if="errors.has('displayName')">{{ errors.first('displayName') }}</p>
        </div>
        <div class="form-group" :class="{'has-error': errors.has('username') }" >
          <label for="username" class="pull-left">Username</label>
          <input v-model="username" name="username" id="username" v-validate="'required|alpha_dash'" data-vv-delay="500" type="text" data-vv-as="username" placeholder="Username" class="form-control">
          <p class="text-danger" align="left" v-if="errors.has('username')">{{ errors.first('username') }}</p>
        </div>
        <div class="form-group" :class="{'has-error': errors.has('email') }" >
          <label for="email" class="pull-left">Email</label>
          <input v-model="email" name="email" id="email" v-validate="'required|email'" data-vv-delay="500" type="text" data-vv-as="email address" placeholder="Email" class="form-control">
          <p class="text-danger" align="left" v-if="errors.has('email')">{{ errors.first('email') }}</p>
        </div>
        <div class="form-group" :class="{'has-error': errors.has('password') }" >
          <label for="password" class="pull-left">Password</label>
          <!-- <input v-model="password" name="password"v-validate="{ rules: { regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, required: true} }" data-vv-delay="500" type="password" data-vv-as="password" placeholder="Password" class="form-control"> -->
          <input v-model="password" name="password" id="password" v-validate="{ rules: { regex: /^(?=.*[A-Za-z])[A-Za-z\d]{1,}$/, required: true} }" data-vv-delay="500" type="password" data-vv-as="password" placeholder="Password" class="form-control">
          <p class="text-danger" align="left" v-if="errors.has('password')">{{ errors.first('password') }}</p>
        </div>
        <div class="form-group" :class="{'has-error': errors.has('passwordConf') }" >
          <label for="passwordConf" class="pull-left">Password confirmation</label>
          <input v-model="passwordConf" name="passwordConf" id="passwordConf" v-validate="'required|confirmed:password'" data-vv-delay="500" type="password" data-vv-as="password confirmation" placeholder="Password confirmation" class="form-control">
          <p class="text-danger" align="left" v-if="errors.has('passwordConf')">{{ errors.first('passwordConf') }}</p>
        </div>
        <button class="btn btn-primary" form="register" type="submit">Submit</button>
      </form>
      </div>
    <div v-else>
      <h4>You must logout before you may register a new account!</h4>
    </div>
>>>>>>> 2db63b24b81a3019a4e03a2c100d9170107c4043
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
<<<<<<< HEAD
  
 
  methods: {

    Validate(e) {
      e.preventDefault();
      this.$validator.validateAll().then((result) => {
        if (result){
         const newUser = {
=======
  methods: {
    // vee-validate function to associate with the registration form.
    validateBeforeSubmit(e) {
      e.preventDefault()
      this.$validator.validateAll().then((result) => {
        // Only runs if all fields were validated successfully.
        if (result) {
          const newUser = {
>>>>>>> 2db63b24b81a3019a4e03a2c100d9170107c4043
            displayName: this.displayName,
            username: this.username,
            email: this.email,
            password: this.password,
<<<<<<< HEAD
            question1: this.question1,
          question2: this.question2,
          question3: this.question3,
=======
>>>>>>> 2db63b24b81a3019a4e03a2c100d9170107c4043
            createdOn: new Date
          }

          this.$store.dispatch('registerUser', newUser)
          .then(res => {
<<<<<<< HEAD
             if (res.status == 200) {
=======
            if (res.status == 409) {
              if (res.statusText == 'username') {
                this.errors.add('username', 'This username is already taken.', 'auth')
                this.errors.first('username:auth')
              } 
              else if (res.statusText == 'email') {
                this.errors.add('email', 'This email is already taken.', 'auth')
                this.errors.first('username:email')
              }
            }
            else if (res.status == 200) {
>>>>>>> 2db63b24b81a3019a4e03a2c100d9170107c4043
              alert('Registration successful!')
              this.$router.push('/login')
            }
          }, err => {
            alert('Registration failed!')
            this.$router.push('/register')
          })
<<<<<<< HEAD
          return
        }
      })
        
         /* if(!this.errors.any()){
            this.formSubmitted = true;
            return
          }*/
        
    }
    
  },
  mounted(){
    this.$store.dispatch(getUser);
=======

          return
        } 
      })
    }
  },
  mounted() {
    this.$store.dispatch('getUser')
>>>>>>> 2db63b24b81a3019a4e03a2c100d9170107c4043
  }
}
</script>
