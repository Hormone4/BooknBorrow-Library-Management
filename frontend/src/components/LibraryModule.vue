<template>
  <div class="hello">
    <h1 class="component-h1">Library List</h1>

    <!-- Show Library Details -->
    <table v-if="action === 'show'" class="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th>Library ID</th>
          <th>Library Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Creation Year</th>
          <th>Zip Code</th>
          <th>Street Name</th>
          <th>Street Number</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ currentLibrary.library_id }}</td>
          <td>{{ currentLibrary.library_name }}</td>
          <td>{{ currentLibrary.library_email }}</td>
          <td>{{ currentLibrary.library_phone }}</td>
          <td>{{ currentLibrary.library_creationYear }}</td>
          <td>{{ currentLibrary.library_zipCode }}</td>
          <td>{{ currentLibrary.library_streetName }}</td>
          <td>{{ currentLibrary.library_streetNumber }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Edit Library Details -->
    <table v-if="action === 'edit'" class="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th>Library ID</th>
          <th>Library Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Creation Year</th>
          <th>Zip Code</th>
          <th>Street Name</th>
          <th>Street Number</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ currentLibrary.library_id }}</td>
          <td><input type="text" v-model="currentLibrary.library_name" /></td>
          <td><input type="email" v-model="currentLibrary.library_email" /></td>
          <td><input type="tel" v-model="currentLibrary.library_phone" /></td>
          <td><input type="number" v-model="currentLibrary.library_creationYear" /></td>
          <td><input type="text" v-model="currentLibrary.library_zipCode" /></td>
          <td><input type="text" v-model="currentLibrary.library_streetName" /></td>
          <td><input type="text" v-model="currentLibrary.library_streetNumber" /></td>
        </tr>
        <tr>
          <td colspan="8">
            <input type="button" value="SEND" @click="sendEditRequest()" class="zoom-hover"/>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- List All Libraries -->
    <table v-if="action === 'list'" class="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>SEE Library</th>
          <th>EDIT Library</th>
          <th>DELETE Library</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="library in libraryArray" :key="library.library_id">
          <td>{{ library.library_name }}</td>
          <td>{{ library.library_email }}</td>
          <td>{{ library.library_phone }}</td>
          <td>
            <a :href="'/#/libraries/show/' + library.library_id">
              <img src="../assets/logos/see-logo.png" alt="[SHOW]" class="zoom-hover">
            </a>
            </td>
            <td>
            <a :href="'/#/libraries/edit/' + library.library_id">
              <img src="../assets/logos/edit-logo.png" alt="[EDIT]" class="zoom-hover">
            </a>
          </td>
          <td>
            <input type="button" value="DELETE" @click="sendDeleteRequest()" class="zoom-hover"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Libraries',
  props: ['action', 'id'],
  data() {
    return {
      libraryArray: [],
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
        this.libraryArray = [
          {
            library_id: 1,
            library_name: 'Central Library',
            library_email: 'central@example.com',
            library_phone: '123-456-7890',
            library_creationYear: 1900,
            library_zipCode: '10001',
            library_streetName: 'Main St',
            library_streetNumber: '1'
          },
          {
            library_id: 2,
            library_name: 'Westside Branch',
            library_email: 'westside@example.com',
            library_phone: '123-555-7890',
            library_creationYear: 1950,
            library_zipCode: '10002',
            library_streetName: 'Second St',
            library_streetNumber: '200'
          }

        ];
      } catch (exception) {
        console.log(exception);
      }
    },
    async refreshCurrentLibrary() {
      if (this.id === 'all' || this.id === '0') return;
      try {
        // Replace this with your actual API call
        this.currentLibrary = this.libraryArray.find(
          (lib) => lib.library_id === Number(this.id)
        );
      } catch (exception) {
        console.log(exception);
      }
    },
    async sendDeleteRequest(libraryId) {
      // Implement the delete functionality
      alert('Delete library with ID: ' + libraryId);
    },
    async sendEditRequest() {
      // Implement the save functionality
      alert('Save library data: ' + JSON.stringify(this.currentLibrary));
    }
  },
  watch: {
    id(newId, oldId) {
      this.refreshCurrentLibrary();
    }
  },
  created() {
    this.getAllData();
    this.refreshCurrentLibrary();
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
