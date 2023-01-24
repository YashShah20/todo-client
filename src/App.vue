<template>
  <div id="app">
    <app-navbar v-bind:showAccount="showAccount" @hideAccount="showAccount = false"></app-navbar>
    <router-view @showAccount="showAccount = true"></router-view>

  </div>
</template>

<script>

import NavBar from './navbar.vue';
import Toast from './components/error.vue';

export default {
  name: 'app',
  components: {
    'app-navbar': NavBar,
    'event-toast': Toast
  },
  data() {
    return {
      user: {
        name: ''
      },
      showAccount: false
    }
  }, methods: {
  }, created() {
    if (localStorage.getItem("username")) {
      this.showAccount = true
    }
  },

}
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.css';
</style>
