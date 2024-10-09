<template>
  <div id="app">
    <AppHeader />
    <router-view />  <!-- This is where your pages/components will be rendered -->
  </div>
</template>

<script>import AppHeader from './components/Header.vue';  // Import the header component

export default {
  name: 'App',
  components: {
    AppHeader
  }
}
</script>

<style>   /* Global styles for the app */
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .zoom-hover:hover {
    transform: scale(1.1);
    transition: transform 0.1s;
  }

  .component-h1 {
    margin-bottom: 30px;
  }

</style>
