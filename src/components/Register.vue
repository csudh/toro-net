<template>
  <div class="container">
    <form @submit.prevent="validateBeforeSubmit">
      <div class="form-group" :class="{'has-error': errors.has('name') }" >
        <input v-model="displayName" name="name" v-validate="'required|alpha'" data-vv-delay="500" type="text" data-vv-as="Display Name" placeholder="Name" class="form-control">
        <p class="text-danger" align="left" v-if="errors.has('name')">{{ errors.first('name') }}</p>
      </div>
      <div class="form-group" :class="{'has-error': errors.has('username') }" >
        <input v-model="username" name="username" v-validate="'required|alpha_dash'" data-vv-delay="500" type="text" data-vv-as="Username" placeholder="Username" class="form-control">
        <p class="text-danger" align="left" v-if="errors.has('username')">{{ errors.first('username') }}</p>
      </div>
      <div class="form-group" :class="{'has-error': errors.has('email') }" >
        <input v-model="email" name="email" v-validate="'required|email'" data-vv-delay="500" type="text" data-vv-as="Email Address" placeholder="Email" class="form-control">
        <p class="text-danger" align="left" v-if="errors.has('email')">{{ errors.first('email') }}</p>
      </div>
      <div class="form-group" :class="{'has-error': errors.has('password') }" >
        <input v-model="password" name="password"v-validate="{ rules: { regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, required: true} }" data-vv-delay="500" type="password" data-vv-as="Password" placeholder="Password" class="form-control">
        <p class="text-danger" align="left" v-if="errors.has('password')">{{ errors.first('password') }}</p>
      </div>
      <div class="form-group" :class="{'has-error': errors.has('passwordconf') }" >
        <input v-model="passwordConf" name="passwordconf" v-validate="'required|confirmed:password'" data-vv-delay="500" type="password" data-vv-as="Password Confirmation" placeholder="Confirm Password" class="form-control">
        <p class="text-danger" align="left" v-if="errors.has('passwordconf')">{{ errors.first('passwordconf') }}</p>
      </div>
      <button class="btn btn-primary btn-block" type="submit">Submit</button>
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
      passwordConf: '',
      formSubmitted: false,
    }
  },
  methods: {
    validateBeforeSubmit(e) {
      console.log("Verifying...");
      e.preventDefault();
      this.$validator.validateAll().then((result) => {
        if (result) {
          // eslint-disable-next-line
          alert('From Submitted!');
          this.registerUser(); 
          return;
        } 
      });
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
  }
}
</script>
