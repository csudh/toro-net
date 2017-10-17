<template>
<div class="container">
<form id="forgot_password" method="post" action="/auth/forgot">
<div class="form-group" >
 <input v-model="email" name="email"  type="text" placeholder="Email" class="form-control">
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
      question1: '',
      question2: '',
      question3: '',
    };
  },
}
</script>