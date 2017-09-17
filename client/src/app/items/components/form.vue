<template>
  <div class="column is-8">
    <div class="content">
      <h1>New Item</h1>
      <hr>
      <h3>Item name:</h3>
      <div class="field">
        <p class="control">
          <input class="input is-medium" type="text" name="itemName" placeholder="Caramelo" v-model="name">
        </p>
      </div>
      <h3>Applicant:</h3>
      <div class="field">
        <p class="control">
          <input class="input is-medium" type="text" name="Applicant" placeholder="Usuário" v-model="applicant">
        </p>
      </div>
      <h3>Status:</h3>
      <div class="field">
        <p class="control">
          <input class="input is-medium" type="text" name="status" placeholder="Pending" v-model="status">
        </p>
      </div>
      <hr>
      <button v-bind:class="{ 'is-disabled' : !(this.name !== '' && this.Applicant !== '' && this.status !== '') }" type="button"  class="button is-primary" @click="submit">Register</button>
      <button type="button" class="button is-danger" @click="exit">Logout</button>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-console */
  export default {
    name: 'newItemForm',
    data: () => ({
      name: '',
      Applicant: '',
      status: '',
    }),
    methods: {
      submit() {
        const { name, Applicant, status } = this;
        this.http.post('/items/register', { name, Applicant, status })
          .then(() => this.$router.push({ name: 'items.list' }))
          .catch(err => console.log(err));
      },
      exit() {
        this.$router.push({ name: 'items.list' });
      },
    },
  };
</script>
