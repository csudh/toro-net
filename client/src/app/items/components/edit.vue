<template>
  <div class="column is-8">
    <div class="content">
      <h1>Edit item</h1>
      <hr>
      <h3>Item name:</h3>
      <div class="field">
        <p class="control">
          <input class="input is-medium" type="text" name="itemName" placeholder="Arroz" v-model="name">
        </p>
      </div>
      <h3>Applicant:</h3>
      <div class="field">
        <p class="control">
          <input class="input is-medium" type="text" name="applicant" placeholder="Usuário" v-model="applicant">
        </p>
      </div>
      <h3>Status:</h3>
      <div class="field">
        <p class="control">
          <input class="input is-medium" type="text" name="status" placeholder="Entregue" v-model="status">
        </p>
      </div>
      <hr>
      <button v-bind:class="{ 'is-disabled' : this.name === '' && this.applicant === '' && this.status == '' }" type="button"  class="button is-primary" @click="edit">Edit</button>
      <button type="button" class="button is-danger" @click="exit">Logout</button>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    name: 'editForm',
    data: () => ({
      name: '',
      applicant: '',
      status: '',
    }),
    methods: {
      edit() {
        const data = {};
        if (this.name) data.name = this.name;
        if (this.applicant) data.applicant = this.applicant;
        if (this.status) data.status = this.status;
        if (data !== {}) {
          this.http.put(`/items/${this.$route.params._id}`, data)
            .then(() => this.$router.push({ name: 'items.list' }))
            .catch(err => console.log(err));
        }
      },
      exit() {
        this.$router.push({ name: 'items.list' });
      },
    },
  };
</script>
