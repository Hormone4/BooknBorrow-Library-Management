<template>
    <div>
      <h1 class="component-h1">Contact us</h1>
      <form>
        <div class="form-group">
          <label for="username">Object</label>
          <input type="text" class="form-control" id="object_contact" name="object_contact" required>
          <br>
          <label for="email">Email:</label>
          <input type="email" class="form-control" id="email" name="email" required>
          <br>
          <label for="password">messsage:</label>
          <textarea class="form-control" id="message" name="message" required></textarea>
          <br>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
    </template>

<script>
  export default {
    name: 'ContactModule'
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
