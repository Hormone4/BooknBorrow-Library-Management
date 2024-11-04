<template>
  <header>
    <nav>
      <ul>
        <li>
          <a href="#/">
            <h1> <img src="../assets/logos/borrrow-logo.png" alt="BooknBorrow" width="100"> BooknBorrow </h1>
          </a>
        </li>
        <li class="zoom-hover">
          <a href="#/books/list/all/"> Books</a>
        </li>
        <li class="zoom-hover">
          <a href="#/libraries/list/all"> Libraries</a>
        </li>
      </ul>

      <ul>
        <li class="zoom-hover">
          <a href="#/">
            <div>Profile <img src="../assets/logos/profile-logo.png" alt="" width="50"></div>
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
  header {
    margin-bottom: 0px;
    background-color: #4b5861;
    padding: 10px;
    color: white;
    text-align: left;
  }

  nav {
    margin-left: 50px;
    margin-right: 50px;
    display: flex;
    justify-content: space-between;
  }

  nav ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    align-items: center;
  }

  a {
    color: white;
    text-decoration: none;
  }

  div img {
    margin-right: 10px;
    margin-left: 10px;
  }
</style>
