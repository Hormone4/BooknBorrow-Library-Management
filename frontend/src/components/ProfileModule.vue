<template>
  <div>

    <div v-if="action === 'myprofile'">
      <h1 class="component-h1">My Profile</h1>
    </div>

    <div v-if="action === 'register'">
      <h1 class="component-h1">Register</h1>
      <form>
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" class="form-control" id="username" name="username" required>
          <br>
          <label for="email">Email:</label>
          <input type="email" class="form-control" id="email" name="email" required>
          <br>
          <label for="password">Password:</label>
          <input type="password" class="form-control" id="password" name="password" required>
          <br>
          <button type="submit">Submit</button>
          <p> you already have an account? <router-link to="/login">Login</router-link></p>
        </div>
      </form>
    </div>


    <div v-if="action === 'login'">
      <h1 class="component-h1">Login</h1>
      <form>
        <div class="form-group">
          <label for="username-email">Username or e-mail:</label>
          <input type="text" class="form-control" id="username-email" name="username-email" required>
          <br>
          <label for="password">Password:</label>
          <input type="password" class="form-control" id="password" name="password" required>
          <br>
          <button type="submit">Submit</button>
          <p> you don't have an account? <router-link to="/register">Register</router-link></p>
        </div>
      </form>
    </div>

  </div>
</template>


<script>
  export default {
    props: ['action']
  }
</script>


<style scoped>
  input[type="button"], button {
    padding: 10px;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 500px;
    border: #42b983 3px solid;
    padding: 20px;
    margin: auto auto 100px;
  }
</style>
