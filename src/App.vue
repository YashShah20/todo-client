<template>
  <div id="app">
    <app-navbar></app-navbar>
    <router-view></router-view>
  </div>
</template>

<script>

import NavBar from './components/navbar.vue';

export default {
  name: 'app',
  components: {
    'app-navbar': NavBar
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>
#app {
  margin: 0px;
  padding: 0px;
}
</style>
