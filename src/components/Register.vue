<template>
  <div class="container">
    <div v-if="!this.$store.state.user.displayName">
      <form @submit.prevent="validateBeforeSubmit" id="register" action="/users" method="post">
        <div class="form-group" :class="{'has-error': errors.has('displayName') }" >
          <input v-model="displayName" name="displayName" v-validate="'required|alpha_spaces'" data-vv-delay="500" type="text" data-vv-as="display name" placeholder="Name" class="form-control">
          <p class="text-danger" align="left" v-if="errors.has('displayName')">{{ errors.first('displayName') }}</p>
        </div>
        <div class="form-group" :class="{'has-error': errors.has('username') }" >
          <input v-model="username" name="username" v-validate="'required|alpha_dash'" data-vv-delay="500" type="text" data-vv-as="username" placeholder="Username" class="form-control">
          <p class="text-danger" align="left" v-if="errors.has('username')">{{ errors.first('username') }}</p>
        </div>
        <div class="form-group" :class="{'has-error': errors.has('email') }" >
          <input v-model="email" name="email" v-validate="'required|email'" data-vv-delay="500" type="text" data-vv-as="email address" placeholder="Email" class="form-control">
          <p class="text-danger" align="left" v-if="errors.has('email')">{{ errors.first('email') }}</p>
        </div>
        <div class="form-group" :class="{'has-error': errors.has('password') }" >
          <!-- <input v-model="password" name="password"v-validate="{ rules: { regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, required: true} }" data-vv-delay="500" type="password" data-vv-as="password" placeholder="Password" class="form-control"> -->
          <input v-model="password" name="password"v-validate="{ rules: { regex: /^(?=.*[A-Za-z])[A-Za-z\d]{1,}$/, required: true} }" data-vv-delay="500" type="password" data-vv-as="password" placeholder="Password" class="form-control">
          <p class="text-danger" align="left" v-if="errors.has('password')">{{ errors.first('password') }}</p>
        </div>
        <div class="form-group" :class="{'has-error': errors.has('passwordConf') }" >
          <input v-model="passwordConf" name="passwordConf" v-validate="'required|confirmed:password'" data-vv-delay="500" type="password" data-vv-as="password confirmation" placeholder="Password confirmation" class="form-control">
          <p class="text-danger" align="left" v-if="errors.has('passwordConf')">{{ errors.first('passwordConf') }}</p>
        </div>
        <button class="btn btn-primary" form="register" type="submit">Submit</button>
      </form>
      </div>
    <div v-else>
      <h4>You must logout before you may register a new account!</h4>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Register',
  methods: {
    // vee-validate function to associate with the registration form.
    validateBeforeSubmit(e) {
      e.preventDefault()
      this.$validator.validateAll().then((result) => {
        // Only runs if all fields were validated successfully.
        if (result) {
          const newUser = {
            displayName: this.displayName,
            username: this.username,
            email: this.email,
            password: this.password
          }

          this.$store.dispatch('registerUser', newUser)
          .then(res => {
            if (res.status == 409) {
              this.errors.add('username', 'This username is already taken.', 'auth')
              this.errors.first('username:auth')
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
  mounted() {
    this.$store.dispatch('getUser')
  }
}
</script>
