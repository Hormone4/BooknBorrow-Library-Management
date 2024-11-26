<template>
  <div class="hello">
    <!-- Show Borrow Details -->
    <div v-if="action === 'show'">
      <h1 class="component-h1">Borrow Details</h1>
      <table class="table table-striped table-bordered table-hover show-table">
        <tbody>
          <tr>
            <th>Borrow ID</th>
            <td>{{ currentBorrow.borrow_id }}</td>
          </tr>
          <tr>
            <th>Book Library Mapping ID</th>
            <td>{{ currentBorrow.book_library_mapping_id }}</td>
          </tr>
          <tr>
            <th>User ID</th>
            <td>{{ currentBorrow.user_id }}</td>
          </tr>
          <tr>
            <th>Borrow Date</th>
            <td>{{ currentBorrow.borrow_borrowDate }}</td>
          </tr>
          <tr>
            <th>Return Date</th>
            <td>{{ currentBorrow.borrow_returnDate }}</td>
          </tr>
          <tr>
            <th>Actual Return Date</th>
            <td>{{ currentBorrow.borrow_actualReturnDate }}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{{ currentBorrow.borrow_status }}</td>
          </tr>
          <tr>
            <th>Fine</th>
            <td>{{ currentBorrow.borrow_fine }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit Borrow Details -->
    <div v-if="action === 'edit'">
      <h1 class="component-h1">Edit Borrow</h1>
      <h3 v-if="id === '0' || id === 'all'">
        New Borrow:
      </h3>
      <table class="table table-striped table-bordered table-hover show-table">
        <tbody>
          <tr>
            <th>Borrow ID</th>
            <td>{{ currentBorrow.borrow_id }}</td>
          </tr>
          <tr>
            <th>Book Library Mapping ID</th>
            <td><input type="number" v-model="currentBorrow.book_library_mapping_id" /></td>
          </tr>
          <tr>
            <th>User ID</th>
            <td><input type="number" v-model="currentBorrow.user_id" /></td>
          </tr>
          <tr v-if="id !== '0' && id !== 'all'">
            <th>Borrow Date</th>
            <td><input type="date" v-model="currentBorrow.borrow_borrowDate" /></td>
          </tr>
          <tr>
            <th>Return Date</th>
            <td><input type="date" v-model="currentBorrow.borrow_returnDate" /></td>
          </tr>
          <tr v-if="id !== '0' && id !== 'all'">
            <th>Actual Return Date</th>
            <td><input type="date" v-model="currentBorrow.borrow_actualReturnDate" /></td>
          </tr>
          <tr v-if="id !== '0' && id !== 'all'">
            <th>Status</th>
            <td><input type="text" v-model="currentBorrow.borrow_status" /></td>
          </tr>
          <tr v-if="id !== '0' && id !== 'all'">
            <th>Fine</th>
            <td><input type="number" v-model="currentBorrow.borrow_fine" /></td>
          </tr>
        </tbody>
      </table>
      <div id="edit-error"></div>
      <input type="button" value="SEND" @click="sendEditRequest()" class="zoom-hover send-update" />
    </div>

    <!-- List All Borrows -->
    <div v-if="action === 'list'">
      <h1 class="component-h1">Borrow List</h1>

      <!-- New Borrow button -->
      <input type="button" value="Add a new Borrow" @click="$router.push('/borrow/edit/0')" class="zoom-hover new-button" />

      <table class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Book ID</th>
            <th>User ID</th>
            <th>Borrow Date</th>
            <th>Return Date</th>
            <th>Status</th>
            <th>SEE</th>
            <th>EDIT</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="borrow in borrowArray" :key="borrow.borrow_id">
            <td>{{ borrow.book_library_mapping_id }}</td>
            <td>{{ borrow.user_id }}</td>
            <td>{{ borrow.borrow_borrowDate }}</td>
            <td>{{ borrow.borrow_returnDate }}</td>
            <td>{{ borrow.borrow_status }}</td>
            <td class="table-action-button">
              <a :href="'/#/borrow/show/' + borrow.borrow_id">
                <img src="../assets/logos/see-logo.png" alt="[SHOW]" class="zoom-hover">
              </a>
            </td>
            <td class="table-action-button">
              <a :href="'/#/borrow/edit/' + borrow.borrow_id">
                <img src="../assets/logos/edit-logo.png" alt="[EDIT]" class="zoom-hover">
              </a>
            </td>
            <td class="table-action-button">
              <input type="button" value="DELETE" @click="sendDeleteRequest(borrow.borrow_id)" class="zoom-hover"/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Borrows',
  props: ['action', 'id'],
  data() {
    return {
      borrowArray: [],
      currentBorrow: {
        borrow_id: 0,
        book_library_mapping_id: 0,
        user_id: 0,
        borrow_borrowDate: new Date().toISOString().slice(0, 10),
        borrow_returnDate: new Date().toISOString().slice(0, 10),
        borrow_actualReturnDate:  new Date().toISOString().slice(0, 10),
        borrow_status: 'borrowed',
        borrow_fine: 0
      }
    };
  },
  methods: {
    async getAllData() {
      try {
        let responseBorrows = await this.$http.get('http://localhost:9000/api/borrows/list');
        this.borrowArray = await responseBorrows.data;
      } catch (exception) {
        console.log(exception);
      }
    },

    async refreshCurrentBorrow() {
      if (this.$props.id === "all" || this.$props.id === "0") {
        this.currentBorrow = {
          borrow_id: 0,
          book_library_mapping_id: 0,
          user_id: 0,
          borrow_borrowDate: new Date().toISOString().slice(0, 10),
          borrow_returnDate: new Date().toISOString().slice(0, 10),
          borrow_actualReturnDate:  new Date().toISOString().slice(0, 10),
          borrow_status: 'ongoing',
          borrow_fine: 0
        };
        return;
      }

      try {
        let responseBorrow = await this.$http.get("http://localhost:9000/api/borrows/show/" + this.$props.id);
        this.currentBorrow = responseBorrow.data;
      } catch (exception) {
        console.log(exception);
      }
    },

    async sendDeleteRequest(borrow_id) {
      try {
        alert("DELETING BORROW #" + borrow_id + "...");
        let response = await this.$http.get("http://localhost:9000/api/borrows/del/" + borrow_id);
        alert("DELETED: " + response.data.rowsDeleted + " borrow(s)");
        this.getAllData();
      } catch (ex) {
        console.log(ex);
      }
    },

    async sendEditRequest() {
      try {
        alert("EDITING BORROW #" + this.currentBorrow.borrow_id + "...");
        let response = await this.$http.post("http://localhost:9000/api/borrows/update/" + this.currentBorrow.borrow_id, this.currentBorrow);
        alert("EDITED: " + response.data.rowsUpdated);
        this.$router.push({path: '/borrows/list/all'});
        this.getAllData();
      } catch (ex) {
        console.log(ex);
        let errorDiv = document.getElementById("edit-error");
        errorDiv.innerHTML = "<div style='color: red;'>Error updating borrow record. Please check all fields.</div>";
      }
    }
  },
  watch: {
    id: function(newId, oldId) {
      this.refreshCurrentBorrow();
    },
    action: function(newAction, oldAction) {
      if (newAction === 'list') {
        this.getAllData();
        document.getElementById("edit-error").innerHTML = "";
      }
    }
  },
  created() {
    this.getAllData();
    this.refreshCurrentBorrow();
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
  color: #42b983;
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
