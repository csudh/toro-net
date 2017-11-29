<template>
  <div class="container">
    <form id="forgot_password" method="post" action="/auth/forgot">
      <div class="form-group" >
       <input v-model="email" name="email"  type="text" placeholder="Email" class="form-control">
      </div>
      <button class="btn btn-success" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ForgotPassword',
  data() {
    return {
      email: '',
    }
  }
}
</script>
