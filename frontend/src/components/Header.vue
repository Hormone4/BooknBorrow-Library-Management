<template>
  <header>
    <nav>
      <ul>
        <li>
          <a href="#/" @click="getUserRole()">
            <h1> <img src="../assets/logos/borrrow-logo.png" alt="BooknBorrow" width="100"> BooknBorrow </h1>
          </a>
        </li>
        <li class="zoom-hover">
          <a href="#/books/list/all/" @click="getUserRole()"> Books</a>
        </li>
        <li class="zoom-hover">
          <a href="#/libraries/list/all" @click="getUserRole()"> Libraries</a>
        </li>
        <li v-if="user_role === 'ADMIN'" class="zoom-hover">
          <a href="#/mappings/list/all"> Mappings</a>
        </li>
        <li v-if="user_role === 'ADMIN'" class="zoom-hover">
          <a href="#/borrow/list/all"> Borrows</a>
        </li>
        <li v-if="user_role === 'ADMIN'" class="zoom-hover">
          <a href="#/users/list/all"> Users</a>
        </li>
        <li class="zoom-hover">
          <a href="#/statistics"> Statistics</a>
        </li>
      </ul>

      <ul @mouseover="active = true" @mouseleave="active = false" >
        <li>
          <div>
            Profile
            <img src="../assets/logos/profile-logo.png" alt="" width="50">

            <ul v-if="active === true" class="profile-list">
              <li class="zoom-hover">
                <a href="#/profile/myprofile"> My Profile</a>
              </li>
              <li class="zoom-hover">
                <a href="#/profile/register"> Register</a>
              </li>
              <li class="zoom-hover">
                <a href="#/profile/login"> Login</a>
              </li>
              <li class="zoom-hover">
                <input type="button" @click="sendLogoutRequest('get', 'logout')" value="LOGOUT" />
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
      user_role: 'GUEST',
      active: false
      }
  },

  methods: {
    async getUserRole() {
      try {
        //alert("getUserRole");
        let response = await this.$http.get("http://localhost:9000/api/auth/role");
        this.user_role = response.data;
      } catch (ex) {
        console.log(ex);
      }
    },

    async sendLogoutRequest(method, endpoint, params) {
      try {
        this.$router.push('/profile/login');
        let response = null;
        response = await this.$http.get("http://localhost:9000/api/auth/"+endpoint);
        this.msg = JSON.stringify(response.data);
        this.getUserRole();
      } catch (error) {
        console.log(ex)
      }
    }
  },

  watch: {   // watch for changes in the variables
    user_role: function(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getUserRole();
      }
    }
  },
};
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
    gap: 40px;
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
