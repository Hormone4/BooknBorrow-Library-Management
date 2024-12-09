<template>
  <div class="hello">
    <h1 class="component-h1">Library Statistics</h1>

    <!-- Most Borrowed Books -->
    <div class="stats-section">
      <h2>Most Borrowed Books</h2>
      <table class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Author</th>
            <th>Borrow Count</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in mostBorrowedBooks" :key="book.book_name">
            <td>{{ book.book_name }}</td>
            <td>{{ book.book_author }}</td>
            <td>{{ book.borrow_count }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Library Availability Stats -->
    <div class="stats-section">
      <h2>Library Availability</h2>
      <table class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Library Name</th>
            <th>Total Books</th>
            <th>Available Books</th>
            <th>Borrowed Books</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="library in libraryStats" :key="library.library_name">
            <td>{{ library.library_name }}</td>
            <td>{{ library.total_books }}</td>
            <td>{{ library.available_books }}</td>
            <td>{{ library.borrowed_books }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Monthly Stats -->
    <div class="stats-section">
      <h2>Monthly Statistics</h2>
      <table class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Month</th>
            <th>Total Borrows</th>
            <th>Unique Borrowers</th>
            <th>Average Fine</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="stat in monthlyStats" :key="stat.month">
            <td>{{ stat.month }}</td>
            <td>{{ stat.total_borrows }}</td>
            <td>{{ stat.unique_borrowers }}</td>
            <td>${{ stat.avg_fine }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Overdue Books by Library -->
    <div class="stats-section">
      <h2>Overdue Books by Library</h2>
      <table class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Library Name</th>
            <th>Overdue Count</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="library in overdueStats" :key="library.library_name">
            <td>{{ library.library_name }}</td>
            <td>{{ library.overdue_count }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Statistics',
  data() {
    return {
      mostBorrowedBooks: [],
      libraryStats: [],
      monthlyStats: [],
      overdueStats: []
    };
  },
  methods: {
    async fetchAllStats() {
      try {

        let responseMostBorrowed = await this.$http.get('http://localhost:9000/api/statistics/most-borrowed/8');
        this.mostBorrowedBooks = await responseMostBorrowed.data;


        let responseLibrary = await this.$http.get('http://localhost:9000/api/statistics/library-availability');
        this.libraryStats = await responseLibrary.data;


        let responseMonthly = await this.$http.get('http://localhost:9000/api/statistics/monthly-stats');
        this.monthlyStats = await responseMonthly.data;


        let responseOverdue = await this.$http.get('http://localhost:9000/api/statistics/overdue-by-library');
        this.overdueStats = await responseOverdue.data;

      } catch (exception) {
        console.log(exception);
      }
    }
  },
  created() {
    this.fetchAllStats();
  }
};
</script>

<style scoped>
.stats-section {
  margin: 30px auto;
  max-width: 1000px;
}

h1 {
  font-weight: normal;
  color: #42b983;
  margin-bottom: 30px;
}

h2 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.table {
  width: 100%;
  margin-bottom: 20px;
  background-color: white;
}

.table th {
  background-color: #42b983;
  color: white;
  padding: 12px;
}

.table td {
  padding: 8px;
}

</style></tbody></tr></div>
