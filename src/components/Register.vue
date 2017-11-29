<template>
  <div class="container">
    <div v-if="!this.$store.state.user.displayName">
     <form id="register" @submit.prevent="validateBeforeSubmit" method="post" action='/users'>
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
      <div class="form-group" :class="{'has-error': errors.has('password') }" >
            <input v-model="password" name="password" v-validate="{ rules: { regex: /^(?=.*[A-Za-z]+[0-9]+[!#@$*]+).{4,}$/, required: true} }" data-vv-delay="500" type="password" data-vv-as="password" placeholder="Password" class="form-control">
            <p class="text-danger" align="left" v-if="errors.has('password')">{{ errors.first('password') }}</p>
      </div>
      <div class="form-group" :class="{'has-error': errors.has('passwordConf') }" >
            <input v-model="passwordConf" name="passwordConf" v-validate="'required|confirmed:password'" data-vv-delay="500" type="password" data-vv-as="password confirmation" placeholder="Password confirmation" class="form-control">
             <p class="text-danger" align="left" v-if="errors.has('passwordConf')">{{ errors.first('passwordConf') }}</p>
      </div>
      <button class="btn btn-primary" type="submit">Register</button>
    </div>
    <div v-else>
      <h3>You cannot register while you are logged in!</h3>
    </div>
  </div>
</template>

<style scoped>
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

<script>
export default {
  name: 'Register',
  methods: {
    validateBeforeSubmit(e) {
      e.preventDefault()
      this.$validator.validateAll().then((result) => {
        if (result) {
          const newUser = {
            displayName: this.displayName,
            username: this.username,
            email: this.email,
            password: this.password,
            createdOn: new Date
          }
          this.$store.dispatch('registerUser', newUser).then(res => {
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
              alert('Registration successful!')
              this.$router.push('/login')
            }
          }, err => {
            alert('Registration failed!')
            this.$router.push('/register')
          })

          return
        }
      })
    }
  },
  mounted(){
    this.$store.dispatch('getUser')
  }
}
</script>
