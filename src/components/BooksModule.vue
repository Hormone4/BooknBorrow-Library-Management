<template>
  <div class="hello">
    <h1>Books Module</h1>

    <p>
      ACTION = {{ action }} <br/>
      ID = {{ id }} <br/>
      <a href="/#/books/list/all">Back to the list</a> <br/>
      <a href="/#/books/edit/0">Add a new book</a> <br/>
    </p>


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
        <td>{{ book.book_id }}</td>   <!-- {{value}} are variables -->
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


    <!-- when on: /books/list/all -->
    <table v-if="action === 'list'" class="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <td>ID</td>
          <td>NAME</td>
          <td>SEE BOOK</td>
          <td>EDIT BOOK</td>
          <td>DELETE BOOK</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="b of books" v-bind:key="b.book_id">
          <td>{{ b.book_id }}</td>
          <td>{{ b.book_name }}</td>
          <td><a :href="'/#/books/show/' + b.book_id">[SHOW]</a></td>
          <td><a :href="`/#/books/edit/${b.book_id}`">[EDIT]</a></td>
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

  methods: {   // logic that can be called from the template

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



        // for testing purposes
        this.books = [
          { book_id: 1, book_name: "The Great Gatsby", book_author: "F. Scott Fitzgerald", book_description: "A novel set in the 1920s, exploring themes of wealth and society.", book_publicationDate: "1925-04-10", book_isbn: "9780743273565" },
          { book_id: 2, book_name: "A Brief History of Time", book_author: "Stephen Hawking", book_description: "A book explaining the universe, time, and black holes.", book_publicationDate: "1988-04-01", book_isbn: "9780553380163" },
          { book_id: 3, book_name: "The Hobbit", book_author: "J.R.R. Tolkien", book_description: "A fantasy novel about the adventures of Bilbo Baggins.", book_publicationDate: "1937-09-21", book_isbn: "9780547928227" },
          { book_id: 4, book_name: "1984", book_author: "George Orwell", book_description: "A dystopian novel about a totalitarian regime.", book_publicationDate: "1949-06-08", book_isbn: "9780451524935" },
          { book_id: 5, book_name: "To Kill a Mockingbird", book_author: "Harper Lee", book_description: "A novel about racial injustice in the American South.", book_publicationDate: "1960-07-11", book_isbn: "9780061120084" },
          { book_id: 6, book_name: "Sapiens: A Brief History of Humankind", book_author: "Yuval Noah Harari", book_description: "A book exploring the history of humanity from ancient to modern times.", book_publicationDate: "2011-09-04", book_isbn: "9780062316097" },
          { book_id: 7, book_name: "The Da Vinci Code", book_author: "Dan Brown", book_description: "A mystery thriller involving a secret society and hidden messages.", book_publicationDate: "2003-03-18", book_isbn: "9780307474278" },
          { book_id: 8, book_name: "Pride and Prejudice", book_author: "Jane Austen", book_description: "A classic novel about love and social class in 19th-century England.", book_publicationDate: "1813-01-28", book_isbn: "9781503290563" },
          { book_id: 9, book_name: "The Catcher in the Rye", book_author: "J.D. Salinger", book_description: "A coming of age novel following the adventures of Holden Caulfield.", book_publicationDate: "1951-07-16", book_isbn: "9780316769488" },
          { book_id: 10, book_name: "The Lord of the Rings", book_author: "J.R.R. Tolkien", book_description: "A fantasy epic about the quest to destroy a powerful ring.", book_publicationDate: "1954-07-29", book_isbn: "9780544003415" },
          { book_id: 11, book_name: "The Alchemist", book_author: "Paulo Coelho", book_description: "A philosophical novel about a shepherd's journey to find his treasure.", book_publicationDate: "1988-01-01", book_isbn: "9780062315007" }
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
    }
  },

  created() {   // executed when the component is created
    this.getAllData();

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
