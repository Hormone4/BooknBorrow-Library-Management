<template>
  <div id="app">
    <AppHeader />
    <router-view />  <!-- This is where your pages/components will be rendered -->
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './components/Header.vue';  // Import the header component
import AppFooter from './components/Footer.vue';  // Import the footer component

export default {
  name: 'App',
  components: {   // Register the components so they can be used in the template
    AppHeader,
    AppFooter
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

  input[type="button"] {
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 3px;
  }

  input[type="button"]:active {
    background: #d6d4d4;
  }

</style>
