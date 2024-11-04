<template>
  <div>

    <div v-if="action === 'show'">
      <h1 class="component-h1">Book Details</h1>

      <div class="show-book">
        <img v-bind:src="'../../static/book-covers/'+currentBook.book_imageFileName" alt="" width="300">

        <table class="table table-striped table-bordered">
          <tbody>
            <tr>
              <th>Book ID</th>
              <td>{{ currentBook.book_id }}</td>   <!-- {{value}} are variables -->
            </tr>
            <tr>
              <th>Book Name</th>
              <td>{{ currentBook.book_name }}</td>
            </tr>
            <tr>
              <th>Author</th>
              <td>{{ currentBook.book_author }}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{{ currentBook.book_description }}</td>
            </tr>
            <tr>
              <th>Publication Date</th>
              <td>{{ currentBook.book_publicationDate }}</td>
            </tr>
            <tr>
              <th>ISBN</th>
              <td>{{ currentBook.book_isbn }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


    <div v-if="action === 'edit'">
      <h1 class="component-h1">Edit Book</h1>

      <div class="show-book">
        <img v-bind:src="'../../static/book-covers/'+currentBook.book_imageFileName" alt="" width="300">

        <table class="table table-striped table-bordered">
          <tbody>
            <tr>
              <th>Book ID</th>
              <td>{{ currentBook.book_id }}</td>
            </tr>
            <tr>
              <th>Book Name</th>
              <td> <input type="text" name="book name" v-model="currentBook.book_name"> </td>
              <!-- v-model is a two-way data-binding, when the input changes, the variable changes too -->
            </tr>
            <tr>
              <th>Author</th>
              <td> <input type="text" name="book author" v-model="currentBook.book_author"> </td>
            </tr>
            <tr>
              <th>Description</th>
              <td> <textarea name="book description" v-model="currentBook.book_description"></textarea> </td>
            </tr>
            <tr>
              <th>Publication Date</th>
              <td> <input type="date" name="book publicationDate" v-model="currentBook.book_publicationDate"> </td>
            </tr>
            <tr>
              <th>ISBN</th>
              <td> <input type="text" name="book isbn" v-model="currentBook.book_isbn"> </td>
            </tr>
          </tbody>
        </table>
      </div>
      <input type="button" value="SEND UPDATE" @click="sendEditRequest()" class="zoom-hover send-update">
    </div>


    <!-- when on: /books/list/all -->
    <div  v-if="action === 'list'">   <!-- v-if is a conditional rendering -->
      <h1 class="component-h1">Book List</h1>
      <!-- Search bar -->
      <div class="container">
        <div class="row height d-flex justify-content-center align-items-center">
          <div class="col-md-8">
            <div class="search">
              <input type="text" class="form-control" placeholder="Search for a book, author...">
              <input type="button" value="Search" @click="searchRequest()" class="zoom-hover"/>
            </div>
          </div>
        </div>
      </div>

      <!-- Book list -->
      <ul class="book-list">
        <li v-for="book of bookArray" v-bind:key="book.book_id" class="zoom-hover">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th colspan="3">
                  <a :href="'/#/books/show/' + book.book_id">{{ book.book_name }}<br/><i><small>{{ book.book_author }}</small></i> </a>
                </th>
              </tr>
              <tr>
                <th colspan="3">
                  <a :href="'/#/books/show/' + book.book_id">
                    <img v-bind:src="'../../static/book-covers/'+book.book_imageFileName" alt="" width="150" height="230">
                  </a>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <a :href="'/#/books/show/' + book.book_id">
                    <img src="../assets/logos/see-logo.png" alt="[SHOW]" class="zoom-hover">
                  </a>
                </td>
                <td>
                  <a :href="`/#/books/edit/${book.book_id}`">
                    <img src="../assets/logos/edit-logo.png" alt="[EDIT]" class="zoom-hover">
                  </a>
                </td>
                <td>
                  <input type="button" value="DELETE" @click="sendDeleteRequest(book.book_id)" class="zoom-hover"/>
                </td>
              </tr>
            </tbody>
          </table>
        </li>
      </ul>
    </div>

  </div>
</template>


<script>
export default {
  name: 'Books',
  props : ['action','id'],  // properties that can be passed to the component
  data () {
    return {   // variables that can be used in the template

      bookArray: [],
      // book (book_id, book_name, book_author, book_description, book_publicationDate, book_isbn)
      currentBook: {
        book_id: 0,
        book_name: '',
        book_author: '',
        book_description: '',
        book_publicationDate: '',
        book_isbn: '',
        book_imageFileName: ''
      }
    }
  },

  methods: {   // logic that can be called from the template

    async getAllData() {
      // load all data from a json file
      try {
        //let responseBooks = await this.$http.get('http://localhost:3000/books');
        // await forces to wait for the response before executing the next lines
        // the get is executed in the background (separate thread)
        //this.books = responseBooks.data;



        // for testing purposes
        this.bookArray = [
          { book_id: 1, book_name: "The Great Gatsby", book_author: "F. Scott Fitzgerald", book_description: "A novel set in the 1920s, exploring themes of wealth and society.", book_publicationDate: "1925-04-10", book_isbn: "9780743273565", book_imageFileName: "The-Great-Gatsby-cover.jpg" },
          { book_id: 2, book_name: "A Brief History of Time", book_author: "Stephen Hawking", book_description: "A book explaining the universe, time, and black holes.", book_publicationDate: "1988-04-01", book_isbn: "9780553380163", book_imageFileName: "A-Brief-History-of-Time-cover.jpg" },
          { book_id: 3, book_name: "The Hobbit", book_author: "J.R.R. Tolkien", book_description: "A fantasy novel about the adventures of Bilbo Baggins.", book_publicationDate: "1937-09-21", book_isbn: "9780547928227", book_imageFileName: "The-Hobbit-cover.jpg" },
          { book_id: 4, book_name: "1984", book_author: "George Orwell", book_description: "A dystopian novel about a totalitarian regime.", book_publicationDate: "1949-06-08", book_isbn: "9780451524935", book_imageFileName: "1984-cover.jpg" },
          { book_id: 5, book_name: "To Kill a Mockingbird", book_author: "Harper Lee", book_description: "A novel about racial injustice in the American South.", book_publicationDate: "1960-07-11", book_isbn: "9780061120084", book_imageFileName: "To-Kill-a-Mockingbird-cover.jpg" },
          { book_id: 6, book_name: "Design Patterns", book_author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides", book_description: "This book deals with the subject of object-oriented programming and introduces the concept of design patterns.", book_publicationDate: "1994-10-21", book_isbn: "9780062315007", book_imageFileName: "Design-Patterns-cover.jpg" },
          { book_id: 7, book_name: "The Da Vinci Code", book_author: "Dan Brown", book_description: "A mystery thriller involving a secret society and hidden messages.", book_publicationDate: "2003-03-18", book_isbn: "9780307474278", book_imageFileName: "The-Da-Vinci-Code-cover.jpg" },
          { book_id: 8, book_name: "Pride and Prejudice", book_author: "Jane Austen", book_description: "A classic novel about love and social class in 19th-century England.", book_publicationDate: "1813-01-28", book_isbn: "9781503290563", book_imageFileName: "Pride-and-Prejudice-cover.webp" },
          { book_id: 9, book_name: "The Catcher in the Rye", book_author: "J.D. Salinger", book_description: "A coming of age novel following the adventures of Holden Caulfield.", book_publicationDate: "1951-07-16", book_isbn: "9780316769488", book_imageFileName: "The-Catcher-in-the-Rye-cover.jpg" },
          { book_id: 10, book_name: "Sapiens: A Brief History of Humankind", book_author: "Yuval Noah Harari", book_description: "A book exploring the history of humanity from ancient to modern times.", book_publicationDate: "2011-09-04", book_isbn: "9780062316097", book_imageFileName: "Sapiens-A-Brief-History-of-Humankind-cover.jpg" },
          { book_id: 11, book_name: "The Lord of the Rings", book_author: "J.R.R. Tolkien", book_description: "A fantasy epic about the quest to destroy a powerful ring.", book_publicationDate: "1954-07-29", book_isbn: "9780544003415", book_imageFileName: "The-Lord-of-the-Rings-cover.jpg" },
          { book_id: 12, book_name: "The Alchemist", book_author: "Paulo Coelho", book_description: "A philosophical novel about a shepherd's journey to find his treasure.", book_publicationDate: "1988-01-01", book_isbn: "9780062315007", book_imageFileName: "The-Alchemist-cover.jpg" },
        ];

      } catch (exception) {
        console.log(exception);
      }
    },

    async refreshCurrentBook() {
      if (this.$props.id === "all" || this.$props.id === "0") return;
      try {
        /*
        let responseBook = await this.$http.get('http://localhost:3000/books/' + this.$props.id);
        this.book = responseBook.data;
         */

        // for testing purposes
        this.currentBook = this.bookArray.find(b => b.book_id === Number(this.$props.id));   // or String(b.book_id)


      } catch (exception) {
        console.log(exception);
      }
    },

    async sendDeleteRequest(book_id) {
      try {
        //let response = await this.$http.delete('http://localhost:3000/books/' + book_id);
        //this.books = this.books.filter(b => b.book_id !== book_id);

        // for testing purposes
        this.bookArray = this.bookArray.filter(b => b.book_id !== book_id);

      } catch (exception) {
        console.log(exception);
      }
    },
    async sendEditRequest() { }

  },

  watch: {   // watch for changes in the variables
    id: function(newId, oldId) {
      this.refreshCurrentBook();
    }
  },

  created() {   // executed when the component is created
    this.getAllData();
    this.refreshCurrentBook();

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  a {
    color: #000000;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }


  /************ BOOK DISPLAY ************/
  .show-book {
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 50px;
  }

  .show-book table {
    width: 50%;
  }

  .show-book table tbody {
    text-align: left;
  }

  .show-book table input {
    width: 100%;
  }

  .show-book table textarea {
    width: 100%;
    min-height: 4em;
  }

  .send-update {
    margin-top: 20px;
    padding: 10px;
  }

  /************ BOOK LIST ************/
  .book-list {
    margin: auto; /* Center the ul element */
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
    max-width: 1500px;
    list-style-type: none; /* Remove dots */
  }

  .book-list li {
    margin: 0 20px 20px;
    text-align: center;
    position: relative;
    max-width: 200px;
  }



  /************ SEARCH BAR ************/
  .container {
    margin: 50px auto;
  }

  .search {
    position: relative;
    box-shadow: 0 0 40px rgba(51, 51, 51, .1);
  }

  .search input[type="text"] {
    height: 60px;
    text-indent: 25px;
    border: 2px solid #d6d4d4;
  }


  .search input[type="text"]:focus {
    box-shadow: none;
    border: 2px solid #42b983;
  }

  .search input[type="button"] {
    position: absolute;
    top: 5px;     /* 5px from the top   */
    right: 5px;   /* 5px from the right */
    height: 50px;
    width: 110px;
    background: #42b983;
    color: #fff;
    border: none;
    border-radius: 5px;
  }

  .search input[type="button"]:active {
    background: #d6d4d4;
  }

</style>
