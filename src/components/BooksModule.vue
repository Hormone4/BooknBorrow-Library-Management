<template>
  <div class="hello">
    <h1>{{ msg }}</h1>   <!-- {{value}} are variables -->

    <h1>JAJAJAJ</h1>


    <div>
      click me
      <button v-on:click="click">
        Click me
      </button>
    </div>


    <!--
    <table v-if="action === 'show'">
    <table v-if="action === 'edit'">
    <table v-if="action === 'list'">



    -->




    <table v-if="action === 'show'" class="table table-striped table-bordered table-hover">
      <thead>
      <tr>
        <th>Book Name</th>
        <th>Author</th>
        <th>Description</th>
        <th>Publication Date</th>
        <th>ISBN</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{{ book.book_id }}</td>
        <td>{{ book.book_name }}</td>
        <td>{{ book.book_author }}</td>
        <td>{{ book.book_description }}</td>
        <td>{{ book.book_publicationDate }}</td>
        <td>{{ book.book_isbn }}</td>
      </tr>
      </tbody>
    </table>


    <table v-if="action === 'edit'" class="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th>Book Name</th>
          <th>Author</th>
          <th>Description</th>
          <th>Publication Date</th>
          <th>ISBN</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ book.book_id }}</td>
          <!-- v-model is a two-way data binding, when the input changes, the variable changes too -->
          <td> <input type="text" name="book name" v-model="book.book_name"> </td>
          <td>{{ book.book_author }}</td>
          <td>{{ book.book_description }}</td>
          <td>{{ book.book_publicationDate }}</td>
          <td>{{ book.book_isbn }}</td>
        </tr>
        <tr>
          <td colspan="5">
            <input type = "button" value="SEND" @click="sendEditRequest()">
          </td>
        </tr>
      </tbody>
    </table>


    <!-- for: /books/list/all -->
    <table v-if="action === 'list'">
      <thead>
        <tr>
          <td>ID</td><td>NAME</td><td>SHOW DATASHEET</td><td>EDIT CAR</td><td>DELETE CAR</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="b of books" v-bind:key="b.book_id">
          <td>{{ b.book_id }}</td>
          <td>{{ b.book_name }}</td>
          <td><a :href="'/#/cars/show/' + b.book_id">[SHOW]</a></td>
          <td><a :href="`/#/cars/edit/${b.book_id}`">[EDIT]</a></td>
          <td><input type="button" value="DELETE" @click="sendDeleteRequest()" /></td>
        </tr>
      </tbody>
    </table>


  </div>
</template>


<script>
export default {
  name: 'Books',
  props : ['action','id'],  // properties that can be passed to the component
  data () {
    return {   // variables that can be used in the template
      msg: 'Welcome to Your Vue.js App',

      books: [],
      // book (book_id, book_name, book_author, book_description, book_publicationDate, book_isbn)
      book: {
        book_id: 0,
        book_name: '',
        book_author: '',
        book_description: '',
        book_publicationDate: '',
        book_isbn: ''
      },

      libraries: [],
      // library (library_name, library_email, library_phone, library_creationYear, library_zipCode, library_streetName, library_streetNumber)
      /*
      library: {   // library object, idk if it is needed
        library_name: '',
        library_email: '',
        library_phone: '',
        library_creationYear: '',
        library_zipCode: '',
        library_streetName: '',
        library_streetNumber: ''
      },
       */
    }
  },

  methods: {   // where the logic that can be called from the template

    click: function() {   // test function
      alert('clicked');
    },

    async getAllData() {
      // load all data from a json file
      try {
        //let responseBooks = await this.$http.get('http://localhost:3000/books');
        // await forces to wait for the response before executing the next lines
        // the get is executed in the background (separate thread)
        //this.books = responseBooks.data;

        this.books = [
          { book_id: 1, book_name: 'Book 1', book_author: 'Author 1', book_description: 'Description 1', book_publicationDate: '2021-01-01', book_isbn: '1234567890' },
          { book_id: 2, book_name: 'Book 2', book_author: 'Author 2', book_description: 'Description 2', book_publicationDate: '2021-02-02', book_isbn: '1234567890' },
          { book_id: 3, book_name: 'Book 3', book_author: 'Author 3', book_description: 'Description 3', book_publicationDate: '2021-03-03', book_isbn: '1234567890' },
          { book_id: 4, book_name: 'Book 4', book_author: 'Author 4', book_description: 'Description 4', book_publicationDate: '2021-04-04', book_isbn: '1234567890' },
          { book_id: 5, book_name: 'Book 5', book_author: 'Author 5', book_description: 'Description 5', book_publicationDate: '2021-05-05', book_isbn: '1234567890' }
        ];

      } catch (exception) {
        console.log(exception);
      }
    },

    async refreshOneBook() {
      if (this.$props.id === "all" || this.$props.id === "0") return;
      try {
        /*
        let responseBook = await this.$http.get('http://localhost:3000/books/' + this.$props.id);
        this.book = responseBook.data;
         */
      } catch (exception) {
        console.log(exception);
      }
    },

    async sendDeleteRequest() { },
    async sendEditRequest() { }

  },

  watch: {   // watch for changes in the variables
    id: function(newId, oldId) {
      this.refreshOneBook();
    },

    created() {   // executed when the component is created
      this.getAllData();
      this.refreshOneBook();
    }
  },
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
