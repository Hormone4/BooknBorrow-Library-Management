<template>
  <div class="borrow-module">
    <h1 class="component-h1">Borrow Module</h1>

    <!-- Show Borrow details of one reservation -->
    <table v-if="action === 'show'" class="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th>Borrow ID</th>
          <th>Book Name</th>
          <th>Borrower Name</th>
          <th>Borrow Date</th>
          <th>Return Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ currentBorrow.borrow_id }}</td>
          <td>{{ currentBorrow.book_name }}</td>
          <td>{{ currentBorrow.borrower_name }}</td>
          <td>{{ currentBorrow.borrow_date }}</td>
          <td>{{ currentBorrow.return_date }}</td>
          <td>{{ currentBorrow.status }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Edit Borrow Details -->
    <table v-if="action === 'edit'" class="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th>Borrow ID</th>
          <th>Book Name</th>
          <th>Borrower Name</th>
          <th>Borrow Date</th>
          <th>Return Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ currentBorrow.borrow_id }}</td>
          <td>
            <select v-model="currentBorrow.book_id">
              <option v-for="book in bookArray" :key="book.book_id" :value="book.book_id">
                {{ book.book_name }}
              </option>
            </select>
          </td>
          <td><input type="text" v-model="currentBorrow.borrower_name" /></td>
          <td><input type="date" v-model="currentBorrow.borrow_date" /></td>
          <td><input type="date" v-model="currentBorrow.return_date" /></td>
          <td>
            <select v-model="currentBorrow.status">
              <option value="borrowed">Borrowed</option>
              <option value="returned">Returned</option>
              <option value="overdue">Overdue</option>
            </select>
          </td>
        </tr>
        <tr>
          <td colspan="6">
            <input type="button" value="SEND" @click="sendEditRequest()" />
          </td>
        </tr>
      </tbody>
    </table>

    <table v-if="action === 'list'" class="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <td>Borrow ID</td>
          <td>Book Name</td>
          <td>Status</td>
          <td>See</td>
          <td>Edit</td>
          <td>Delete</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="borrow in borrowArray" :key="borrow.borrow_id">
          <td>{{ borrow.borrow_id }}</td>
          <td>{{ borrow.book_name }}</td>
          <td>{{ borrow.status }}</td>
          <td>
            <a :href="'/#/borrow/show/' + borrow.borrow_id">[SHOW]</a>
            </td>
            <td>
            <a :href="'/#/borrow/edit/' + borrow.borrow_id">[EDIT]</a>
            </td>
            <td><input type="button" value="DELETE" @click="sendDeleteRequest(borrow.borrow_id)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Borrow',
  props: ['action', 'id'],
  data() {
    return {
      borrowArray: [],
      currentBorrow: {
        borrow_id: 0,
        book_id: '',
        book_name: '',
        borrower_name: '',
        borrow_date: '',
        return_date: '',
        status: ''
      },
      bookArray: [] // To populate the book dropdown in edit form
    };
  },
  methods: {
    async getAllData() {
      try {
        // Sample data for borrow records
        this.borrowArray = [
          {
            borrow_id: 1,
            book_id: 1,
            book_name: 'The Great Gatsby',
            borrower_name: 'John Doe',
            borrow_date: '2023-09-01',
            return_date: '2023-09-15',
            status: 'returned'
          },
          {
            borrow_id: 2,
            book_id: 2,
            book_name: 'A Brief History of Time',
            borrower_name: 'Jane Smith',
            borrow_date: '2023-09-05',
            return_date: '2023-09-20',
            status: 'borrowed'
          }

        ];

        // Sample data for books
        this.bookArray = [
          { book_id: 1, book_name: 'The Great Gatsby' },
          { book_id: 2, book_name: 'A Brief History of Time' },
          { book_id: 3, book_name: 'The Hobbit' }

        ];
      } catch (exception) {
        console.log(exception);
      }
    },
    async refreshCurrentBorrow() {
      if (this.id === 'all' || this.id === '0') return;
      try {
        this.currentBorrow = this.borrowArray.find(
          (borrow) => borrow.borrow_id === Number(this.id)
        );
      } catch (exception) {
        console.log(exception);
      }
    },
    async sendDeleteRequest(borrowId) {
      // Implement the delete functionality
      alert('Delete borrow record with ID: ' + borrowId);
    },
    async sendEditRequest() {
      // Implement the save functionality
      alert('Save borrow data: ' + JSON.stringify(this.currentBorrow));
    }
  },
  watch: {
    id(newId, oldId) {
      this.refreshCurrentBorrow();
    }
  },
  created() {
    this.getAllData();
    this.refreshCurrentBorrow();
  }
};
</script>

<style scoped>
h1,
h2 {
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
