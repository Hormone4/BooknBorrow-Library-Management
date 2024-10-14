<template>
  <header class="app-header">
    <nav>
      <ul>
        <li>
          <a href="/">
            <h1> <img src="../assets/logos/borrrow-logo.png" alt="BooknBorrow" width="100"> BooknBorrow </h1>
          </a>
        </li>


      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
  .app-header {
    margin-bottom: 60px;
    background-color: #4b5861;
    padding: 10px;
    color: white;
    text-align: left;
  }
  nav ul {
    margin: 0 0 0 50px;
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: left;
  }
  nav ul li {
    margin: 0 15px;
  }
  a {
    color: white;
    text-decoration: none;
  }
</style>
