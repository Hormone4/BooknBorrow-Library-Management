<template>
  <div>

    <div v-if="action === 'myprofile'">
      <div v-if="currentUser.user_id === 0">
        <h1 class="component-h1">You don't have a profile yet?</h1>
        <a href="#/profile/register">Click here</a> to create your profile.
        <br><br><br><br><br><br><br><br><br><br><br><br>
      </div>
      <div v-if="currentUser.user_id !== 0">
        <h1 class="component-h1">Your Profile: {{currentUser.user_name}}</h1>
        <div class="show-user">
            <table class="table table-striped table-bordered">
                <tbody>
                    <tr>
                        <th>User ID</th>
                        <td>{{ currentUser.user_id }}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td>{{ currentUser.user_name }}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{{ currentUser.user_email }}</td>
                    </tr>
                    <tr>
                        <th>Role</th>
                        <td>{{ currentUser.user_role }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>


    <div v-if="action === 'register'">
      <h1 class="component-h1">Register</h1>
      <div class="form">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" class="form-control" id="username" name="username" v-model="currentUser.user_name">
          <br>
          <label for="email">Email:</label>
          <input type="email" class="form-control" id="email" name="email" v-model="currentUser.user_email">
          <br>
          <label for="password">Password:</label>
          <input type="password" class="form-control" id="password" name="password" v-model="currentUser.user_password">
          <br>
          <button type="submit" @click="sendEditRequest()" class="zoom-hover send-update">Submit</button>
          <p> you already have an account? <a href="#/profile/login">Login</a></p>
        </div>
      </div>
    </div>


    <div v-if="action === 'login'">
      <h1 class="component-h1">Login</h1>
      <div class="form">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" class="form-control" id="username" name="username" required>
          <br>
          <label for="password">Password:</label>
          <input type="password" class="form-control" id="password" name="password" required>
          <br>
          <button type="submit" @click="submitAuth()" class="zoom-hover">Submit</button>
          <p> you don't have an account? <a href="#/profile/register">Register</a></p>
        </div>
      </div>
      <div>
          ('John Doe', 'john.doe@example.com', SHA2(CONCAT(now(), 'password123'), 224), now(), 'USER'),</br>
          ('Jane Smith', 'jane.smith@example.com', SHA2(CONCAT(now(), 'secretpass'), 224), now(), 'USER'),</br>
          ('Emily Clark', 'emily.clark@example.com', SHA2(CONCAT(now(), 'mypassword'), 224), now(), 'USER'),</br>
          ('Sarah Lee', 'sarah.lee@example.com', SHA2(CONCAT(now(), 'letmein'), 224), now(), 'USER'),</br>
          ('Michael Brown', 'michael.brown@example.com', SHA2(CONCAT(now(), 'adminpass'), 224), now(), 'ADMIN')</br>
      </div>
    </div>

    <div id="edit-error"></div>
  </div>
</template>


<script>
  export default {
    name: 'Authentication',
    props: ['action'],

    data() {
        return {
            role: '',
            currentUser: {
                user_id: 0,
                user_name: '',
                user_email: '',
                user_role: ''
            }
        };
    },

    methods: {
      submitAuth() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        this.sendRequest('post', 'login', { username: username, userpass: password });
      },

      async refreshCurrentUser() {
        try {
          let response = await this.$http.get("http://localhost:9000/api/auth/"+this.role.toLowerCase());
          this.currentUser = response.data;
        } catch (error) {
          console.log(error);
        }
      },

      async sendRequest(method, endpoint, params) {
        let errorDiv = document.createElement("div");
        try {
          let response = null;
          if (method === "post") 
            response = await this.$http.post("http://localhost:9000/api/auth/"+endpoint, params);
          else
            response = await this.$http.get("http://localhost:9000/api/auth/"+endpoint);
          
          this.role = response.data.userRole;
          if (response.data.loginResult) {
            errorDiv.innerHTML = "Login successful";
            this.$router.push('/profile/myprofile');
          }
          else
            errorDiv.innerHTML = "Wrong username or password";
          //errorDiv.innerHTML = JSON.stringify(response.data).replace(/\"/g, "");
          errorDiv.style.color = "red";
          document.getElementById("edit-error").appendChild(errorDiv);
          // redirect to profile page

        } catch (error) {
          console.log(ex)

          errorDiv.innerHTML = "Wrong username or password";
          errorDiv.style.color = "red";
          document.getElementById("edit-error").appendChild(errorDiv);
        }
      },

      async sendEditRequest() {
        try {
            let response = await this.$http.post("http://localhost:9000/api/users/update/" + this.currentUser.user_id, {
                user_name: this.currentUser.user_name,
                user_email: this.currentUser.user_email,
                user_password: this.currentUser.user_password,
                user_role: "USER"
            });

            let errorDiv = document.createElement("div");
            errorDiv.innerHTML = "Profile successfully created. You can now login";
            errorDiv.style.color = "red";
            document.getElementById("edit-error").appendChild(errorDiv);
        } catch (error) {
            console.log(error);
            let errorDiv = document.createElement("div");
            errorDiv.innerHTML = "Someone with that username/email already exists";
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
        if (newAction === "myprofile") {
          this.refreshCurrentUser();
        }
        else
          document.getElementById("edit-error").innerHTML = "";
      }
    }
  }
</script>


<style scoped>
  .show-user {
      margin: auto;
      width: 80%;
      max-width: 800px;
  }

  .show-user table {
      width: 100%;
  }

  input[type="button"], button {
    padding: 10px;
    margin-bottom: 20px;
  }

  .form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 500px;
    border: #42b983 3px solid;
    padding: 20px;
    margin: auto auto 20px;
  }
</style>
