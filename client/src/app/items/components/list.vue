<template>
  <div class="column is-8">
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="control">
            <label class="checkbox">
              <input type="checkbox" name="checkbox">
              Select all
            </label>
          </p>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <button class="button is-primary" @click="navigate('newitem.form')">New</button>
        </div>
      </div>
    </nav>
    <hr>
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>Item</th>
          <th>Applicant</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in itemsList">
          <td><input type="checkbox"></td>
          <td>{{ item.name }}</td>
          <td>{{ item.applicant }}</td>
          <td>{{ item.status }}</td>
          <td>
            <a class="button is-link" @click="edit(item._id)">Editar</a>
            <a class="button is-link" @click="remove(item._id)">Apagar</a>
          </td>
        </tr>
      </tbody>
    </table>
    <nav class="level">
      <div class="level-left">
          <div class="level-item">
          </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <button class="button is-primary" @click="navigate('newitem.form')">New</button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
/* eslint-disable no-console */
  export default {
    name: 'items-view',
    data: () => ({
      itemsList: [],
    }),
    beforeMount() {
      this.http.get('/items/list')
        .then((res) => {
          this.itemsList = res.data;
        });
    },
    methods: {
      remove(_id) {
        this.http.delete(`/items/${_id}`)
          .then(() => {
            this.http.get('/items/list')
              .then((res) => {
                this.itemsList = res.data;
              });
          })
          .catch(err => console.log(err));
      },
      edit(_id) {
        this.$router.push({ name: 'items.edit', params: { _id } });
      },
      navigate(index) {
        this.$router.push({ name: index });
      },
    },
  };
</script>
