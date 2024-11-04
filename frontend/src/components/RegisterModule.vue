<template>
  <div class="hello">
    <h1 class="component-h1">BooknBorrow</h1>

    <h2>Register</h2>

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
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}



form {
  display: flex;
  flex-direction: column;
  width: 30%;
  margin: 0 auto;
  border: #42b983 3px solid;
  border-radius: 0%;
  padding: 20px;
  margin-bottom: 200px;
}
</style>
