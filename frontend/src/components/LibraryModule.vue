<template>
  <div class="hello">

    <!-- Show Library Details -->
    <div v-if="action === 'show'">

      <h1 class="component-h1">{{ currentLibrary.library_name }}</h1>

      <table class="table table-striped table-bordered table-hover show-table">
        <tbody>
        <tr>
          <th>Library ID</th>
          <td>{{ currentLibrary.library_id }}</td>
        </tr>
        <tr>
          <th>Library Name</th>
          <td>{{ currentLibrary.library_name }}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td>{{ currentLibrary.library_email }}</td>
        </tr>
        <tr>
          <th>Phone</th>
          <td>{{ currentLibrary.library_phone }}</td>
        </tr>
        <tr>
          <th>Creation Year</th>
          <td>{{ currentLibrary.library_creationYear }}</td>
        </tr>
        <tr>
          <th>Address</th>
          <td>
            {{ currentLibrary.library_zipCode }}</br>
            {{ currentLibrary.library_streetName }}, {{ currentLibrary.library_streetNumber }} 
          </td>
        </tr>
        </tbody>
      </table>
      </br>
      </br>
      <hr>

      <h1 class="component-h1">Books in this Library</h1>
      <ul class="book-list">
        <li v-for="book of bookArray" v-bind:key="book.book_id" class="zoom-hover">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th colspan="3">
                  <a :href="'/#/books/show/' + book.book_id">
                    {{ book.book_name }}<br/>
                    <i><small>{{ book.book_author }}</small></i>
                  </a>
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
          </table>
        </li>
      </ul>
    </div>

    <!-- Edit Library Details -->
    <div v-if="action === 'edit'">

      <h1 class="component-h1">Edit Library</h1>

      <table class="table table-striped table-bordered table-hover show-table">
        <tbody>
        <tr>
          <th>Library ID</th>
          <td>{{ currentLibrary.library_id }}</td>
        </tr>
        <tr>
          <th>Library Name</th>
          <td><input type="text" v-model="currentLibrary.library_name" /></td>
        </tr>
        <tr>
          <th>Email</th>
          <td><input type="email" v-model="currentLibrary.library_email" /></td>
        </tr>
        <tr>
          <th>Phone</th>
          <td><input type="tel" v-model="currentLibrary.library_phone" /></td>
        </tr>
        <tr>
          <th>Creation Year</th>
          <td><input type="number" v-model="currentLibrary.library_creationYear" /></td>
        </tr>
        <tr>
          <th>Zip Code</th>
          <td><input type="text" v-model="currentLibrary.library_zipCode" /></td>
        </tr>
        <tr>
          <th>Street Name</th>
          <td><input type="text" v-model="currentLibrary.library_streetName" /></td>
        </tr>
        <tr>
          <th>Street Number</th>
          <td><input type="text" v-model="currentLibrary.library_streetNumber" /></td>
        </tr>
        </tbody>
      </table>
      <div id="edit-error"></div>
      <input type="button" value="SEND" @click="sendEditRequest()"  class="zoom-hover send-update" />
    </div>


    <!-- List All Libraries -->
    <div  v-if="action === 'list'">

      <h1 class="component-h1">Library List</h1>

      <!-- Search bar -->
      <div class="container">
        <div class="row height d-flex justify-content-center align-items-center">
          <div class="col-md-8">
            <div class="search">
              <input type="text" @input="searchRequest()" id="searchBar" class="form-control" placeholder="Search for a Library">
              <input type="button" value="Search" @click="searchRequest()" class="zoom-hover"/>
            </div>
          </div>
        </div>
      </div>

      <!-- New Library button -->
      <input type="button" value="Add a new Library" @click="$router.push('/libraries/edit/0')" class="zoom-hover new-button" />

      <!-- Library List -->
      <table class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Library ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>SEE</th>
            <th>EDIT</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="library in libraryArray" :key="library.library_id">
            <td>{{ library.library_id }}</td>
            <td>
              <a :href="'/#/libraries/show/' + library.library_id">
                {{ library.library_name }}
              </a>
            </td>
            <td>{{ library.library_email }}</td>
            <td>{{ library.library_phone }}</td>
            <td class="table-action-button">
              <a :href="'/#/libraries/show/' + library.library_id">
                <img src="../assets/logos/see-logo.png" alt="[SHOW]" class="zoom-hover">
              </a>
            </td>
            <td class="table-action-button">
              <a :href="'/#/libraries/edit/' + library.library_id">
                <img src="../assets/logos/edit-logo.png" alt="[EDIT]" class="zoom-hover">
              </a>
            </td>
            <td class="table-action-button">
              <input type="button" value="DELETE" @click="sendDeleteRequest(library.library_id)" class="zoom-hover"/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Libraries',
  props: ['action', 'id'],
  data() {
    return {
      libraryArray: [],
      bookArray: [],
      currentLibrary: {
        library_id: 0,
        library_name: '',
        library_email: '',
        library_phone: '',
        library_creationYear: '',
        library_zipCode: '',
        library_streetName: '',
        library_streetNumber: ''
      }
    };
  },
  methods: {
    async getAllData() {
      try {
        let responseLibraries = await this.$http.get('http://localhost:9000/api/libraries/list ');
        this.libraryArray = await responseLibraries.data;

      } catch (exception) {
        console.log(exception);
      }
    },

    async refreshCurrentLibrary() {
      if (this.$props.id === "all" || this.$props.id === "0") {
        this.currentLibrary = {
          library_id: 0,
          library_name: 'New Library Name',
          library_email: 'librarymail@example.com',
          library_phone: '1234567890',
          library_creationYear: '2000',
          library_zipCode: '12345',
          library_streetName: 'Street Name',
          library_streetNumber: '1'
        };
        return;
      }
      try {
        let responseLibrary = await this.$http.get("http://localhost:9000/api/libraries/show/" + this.$props.id);
        this.currentLibrary = responseLibrary.data;

        let responseBooks = await this.$http.get("http://localhost:9000/api/libraries/listbooks/" + this.$props.id);
        this.bookArray = responseBooks.data;

      } catch (exception) {
        console.log(exception);
      }
    },

    async sendDeleteRequest(library_id) {
      try {
        alert("DELETING LIBRARY #" + library_id + "...");
        let response = await this.$http.get("http://localhost:9000/api/libraries/del/" + library_id);
        alert("DELETED: " + response.data.rowsDeleted + " library(ies)");
        this.getAllData();

      } catch (ex) {
        console.log(ex);
      }
    },

    async sendEditRequest() {
      try {
        alert("EDITING LIBRARY #" + this.currentLibrary.library_id + "...");
        let response = await this.$http.post("http://localhost:9000/api/libraries/update/" + this.currentLibrary.library_id, {
          library_name: this.currentLibrary.library_name,
          library_email: this.currentLibrary.library_email,
          library_phone: this.currentLibrary.library_phone,
          library_creationYear: this.currentLibrary.library_creationYear,
          library_zipCode: this.currentLibrary.library_zipCode,
          library_streetName: this.currentLibrary.library_streetName,
          library_streetNumber: this.currentLibrary.library_streetNumber
          });
        alert("EDITED: " + response.data.rowsUpdated);
        this.$router.push({path: '/libraries/list/all'}); // redirect to the Library list
        this.getAllData();

      } catch (ex) {
        console.log(ex)
        // add a div under the table to show the error message
        let errorDiv = document.createElement("div");
        errorDiv.innerHTML = "Make sure Library Email & phone number are unique and all fields are filled";
        // Make it red
        errorDiv.style.color = "red";
        // Add it to the error div
        document.getElementById("edit-error").appendChild(errorDiv);
      }
    },

    async searchRequest() {
      try {
        let searchValue = document.getElementById("searchBar").value;
        if (searchValue === "") {
          this.getAllData();
          return;
        }
        let response = await this.$http.get("http://localhost:9000/api/libraries/search/" + searchValue);
        this.libraryArray = response.data;

      } catch (ex) {
        console.log(ex);
      }
    }
  },

  watch: {
    id: function(newId, oldId) {
      this.refreshCurrentLibrary();
    },
    action: function(newAction, oldAction) {
      if (newAction === 'list') {
        this.getAllData();
        // remove the error message
        document.getElementById("edit-error").innerHTML = "";
      }
    }

  },
  created() {
    this.getAllData();
    this.refreshCurrentLibrary();
  }
};
</script>

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
    color: #000000;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }


  .show-table {
    text-align: left;
    margin: auto;
    max-width: 700px;
  }


  .send-update {
    margin-top: 20px;
    padding: 10px;
  }


  /************ BOOK LIST ************/
  .book-list {
    margin: auto; /* Center the ul element */
    margin-top: 20px;
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



  .new-button {
    padding: 10px;
    margin-bottom: 50px;
    margin-top: -30px;
  }

</style>
