<template>
  <div class="hello">
    <h1>BooknBorrow</h1>

    <h2>Table Links</h2>
    <ul>
      <li>
        <!-- link to the books module -->
        <a
          href="#/books/list/all/"
          target="_blank"
        >
          Book list
        </a>

      </li>
      <li>
        <a href="#/libraries/list/all"> Libraries</a>
      </li>
      <li><a href="#/borrow/list/all"> Reservations</a></li>
    </ul>
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
</style>
