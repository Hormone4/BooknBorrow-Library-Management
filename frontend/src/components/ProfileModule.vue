<template>
  <div>
    <div id="edit-error"></div>

    <div>
      <h1 class="component-h1">Authentication demo</h1>
      <!-- done --> <input type="button" @click="sendRequest('post', 'login', { username: 'John Doe', userpass: 'wrongpw' })" value="LOGIN BAD" />
      <!-- done --> <input type="button" @click="sendRequest('post', 'login', { username: 'John Doe', userpass: 'password123' })" value="LOGIN USER" />
      <!-- done --> <input type="button" @click="sendRequest('post', 'login', { username: 'Michael Brown', userpass: 'adminpass' })" value="LOGIN ADMIN" />
      <input type="button" @click="sendRequest('get', 'user')" value="ACCESS /user" />
      <input type="button" @click="sendRequest('get', 'admin')" value="ACCESS /admin" />
      <input type="button" @click="sendRequest('get', 'protected')" value="ACCESS /protected" />
      <!-- done --> <input type="button" @click="sendRequest('get', 'logout')" value="LOGOUT" />
    </div>




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
      <div>
        INSERT INTO users (user_name, user_email, user_password, user_created, user_role) VALUES</br>
          ('John Doe', 'john.doe@example.com', SHA2(CONCAT(now(), 'password123'), 224), now(), 'USER'),</br>
          ('Jane Smith', 'jane.smith@example.com', SHA2(CONCAT(now(), 'secretpass'), 224), now(), 'USER'),</br>
          ('Emily Clark', 'emily.clark@example.com', SHA2(CONCAT(now(), 'mypassword'), 224), now(), 'USER'),</br>
          ('Sarah Lee', 'sarah.lee@example.com', SHA2(CONCAT(now(), 'letmein'), 224), now(), 'USER'),</br>
          ('Michael Brown', 'michael.brown@example.com', SHA2(CONCAT(now(), 'adminpass'), 224), now(), 'ADMIN')</br>
        ;
    </div>
      <h1 class="component-h1">Login</h1>
      <form>
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" class="form-control" id="username" name="username" required>
          <br>
          <label for="password">Password:</label>
          <input type="password" class="form-control" id="password" name="password" required>
          <br>
          <button type="submit" @click="submitAuth()">Submit</button>
          <p> you don't have an account? <router-link to="/register">Register</router-link></p>
        </div>
      </form>
    </div>

  </div>
</template>


<script>
  export default {
    name: 'Authentication',
    props: ['action'],

    methods: {
      submitAuth() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        this.sendRequest('post', 'login', { username: username, userpass: password });
        // redirect to profile page
        this.$router.push('/profile/myprofile');
      },

      async sendRequest(method, endpoint, params) {
        let errorDiv = document.createElement("div");
        try {
          let response = null;
          if (method === "post") 
            response = await this.$http.post("http://localhost:9000/api/auth/"+endpoint, params);
          else
            response = await this.$http.get("http://localhost:9000/api/auth/"+endpoint);
          this.msg = JSON.stringify(response.data).replace(/\"/g, "");

          errorDiv.innerHTML = this.msg;
          errorDiv.style.color = "red";
          document.getElementById("edit-error").appendChild(errorDiv);
        } catch (error) {
          console.log(ex)

          errorDiv.innerHTML = "Wrong username or password";
          errorDiv.style.color = "red";
          document.getElementById("edit-error").appendChild(errorDiv);
        }
      }
    },

    watch: {
      id: function(newId, oldId) {
        this.refreshCurrentLibrary();
      },
      action: function(newAction, oldAction) {
        // remove the error message
        document.getElementById("edit-error").innerHTML = "";
        //if (newAction === "myprofile") {
        //  this.refreshCurrentUser();
        //}
      }
    }
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
