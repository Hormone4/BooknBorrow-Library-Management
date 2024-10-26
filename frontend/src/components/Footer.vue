<template>
  <footer>
    <nav>
      <ul>
        <li>
          <a href="#/">
            <img src="../assets/logos/borrrow-logo.png" alt="BooknBorrow" width="80" class="invert-colors">
          </a>
        </li>
        <li>
          <a href="#/">
            <h2> BOOKNBORROW </h2>
            <ul>
              <li class="zoom-hover">
                <a href="https://github.com/Hormone4">
                  Contact us
                </a>
              </li>
            </ul>
          </a>
        </li>
        <li>
          <h2>AUTHORS</h2>
          <ul>
            <li class="zoom-hover">
              <a href="https://github.com/Hormone4" class="author-link">
                <img src="../assets/logos/github-logo.png" alt="" width="20">
                Hormone
              </a>
            </li>
            <li class="zoom-hover">
              <a href="https://github.com/Eliot999" class="author-link">
                <img src="../assets/logos/github-logo.png" alt="" width="20">
                Eliot SIMON
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <br/>
    © 2024 BooknBorrow Team
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
footer {
  margin-top: 60px;
  background-color: black;
  padding: 10px;
  color: white;
  font-size: small;
}

h2 {
  font-size: small;
  font-weight: bolder;
}

nav {
  margin: auto;
  display: flex;
  text-align: center;
  align-content: center;
  justify-content: center;
}

nav ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
}

nav ul li ul {
  margin-top: 14px;
  flex-direction: column;
  gap: 10px;
  /* align the li items to the left */

  text-align: left;

}

a {
  color: white;
  text-decoration: none;
}

.invert-colors {
  filter: invert(1);   /* invert the colors of the logo */
}

.author-link {
  text-decoration: underline;
  display: flex;
  align-content: center;
}
.author-link img {
  margin-right: 10px;
}
</style>
