<template>
  <header>
    <nav>
      <ul>
        <li>
          <a href="#/">
            <h1> <img src="../assets/logos/borrrow-logo.png" alt="BooknBorrow" width="100"> BooknBorrow </h1>
          </a>
        </li>
        <li>
          <a href="#/books/list/all/"> Books</a>
        </li>
        <li>
          <a href="#/libraries/list/all"> Libraries</a>
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
  header {
    margin-bottom: 60px;
    background-color: #4b5861;
    padding: 10px;
    color: white;
    text-align: left;
  }

  nav {
    margin-left: 50px;
  }

  nav ul {
    list-style: none;
    display: flex;
    gap: 30px;
    align-items: center;
  }

  a {
    color: white;
    text-decoration: none;
  }
</style>
