<template>
  <div class="container" v-if="this.$store.state.user.displayName">
    <h4>Welcome {{this.$store.state.user.displayName}}! What's happening?</h4>
    <br>
    <div class="form-group">
      <input type="text" class="form-control" id="title" placeholder="Title" v-model="title">
    </div>
    <div class="form-group">
      <textarea class="form-control" id="body" rows="5" placeholder="Write your thoughts here..." v-model="body">
      </textarea>
    </div>
    <button class="btn btn-primary" @click="addPost()">Post!</button>
    <hr>
  </div>
  <div class="container" v-else>
    <h4>Login to access Toro Net</h4>
    <!-- <img src="https://lh6.googleusercontent.com/boHpliCk16WKnL--c78vBJgbQaElZMDYWgMB1AgLJGVbzS7_ZfRL6JQOIVobyjLBWSARv6MeSFMl94s=w1218-h955" alt="ToroNet logo"> -->
    <!-- <img src="src/components/assets/ToroNet.png" > -->
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      // date: Date.now(),
      // username: this.$store.user.username,
      // email: this.$store.user.email,
      // displayName: this.$store.user.displayName,
      // Are the above data to be included here?
      // I think not, since the data would be passed around more times 
      // than is probably necessary... $store is accessible globally 
      // throughout the app after all.
      title: '',
      body: ''
    };
  },
  methods: {
    addPost() {
      this.$store.dispatch('addPost', this.$store.state.posts)
    }
  },
  mounted() {
    this.$store.dispatch('getUser')
  },
}
</script>
