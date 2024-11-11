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

      <ul @mouseover="active = true" @mouseleave="active = false" >
        <li>
          <div>
            Profile
            <img src="../assets/logos/profile-logo.png" alt="" width="50">

            <ul v-if="active === true" class="profile-list">
              <li class="zoom-hover">
                <!-- <a href="#/profile/"> My Profile</a> -->
                <a href="#/profile/myprofile"> My Profile</a>
              </li>
              <li class="zoom-hover">
                <!-- <a href="#/register"> Register</a> -->
                <a href="#/profile/register"> Register</a>
              </li>
              <li class="zoom-hover">
                <!-- <a href="#/login"> Login</a> -->
                <a href="#/profile/login"> Login</a>
              </li>
            </ul>
          </div>
        </li>
      </ul>

    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',

  data () {
    return {   // variables that can be used in the template
      active: false
      }
  },
}
</script>

<style scoped>
  header {
    background-color: #4b5861;
    padding-top: 10px;
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

  .profile-list {
    position: absolute;
    background-color: black;
    padding: 20px;
    margin-top: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

</style>
