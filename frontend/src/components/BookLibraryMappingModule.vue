<template>
    <div class="hello">
        <!-- Show Mapping Details -->
        <div v-if="action === 'show'">
            <h1 class="component-h1">Book-Library Mapping Details</h1>
            <table class="table table-striped table-bordered table-hover show-table">
                <tbody>
                    <tr>
                        <th>Mapping ID</th>
                        <td>{{ currentMapping.book_library_mapping_id }}</td>
                    </tr>
                    <tr>
                        <th>Book ID</th>
                        <td>{{ currentMapping.book_id }}</td>
                    </tr>
                    <tr>
                        <th>Library ID</th>
                        <td>{{ currentMapping.library_id }}</td>
                    </tr>
                    <tr>
                        <th>Book Status</th>
                        <td>{{ currentMapping.book_status }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Edit Mapping Details -->
        <div v-if="action === 'edit'">
            <h1 class="component-h1">Edit Mapping</h1>
            <table class="table table-striped table-bordered table-hover show-table">
                <tbody>
                    <tr>
                        <th>Mapping ID</th>
                        <td>{{ currentMapping.book_library_mapping_id }}</td>
                    </tr>
                    <tr>
                        <th>Book ID</th>
                        <td><input type="number" v-model="currentMapping.book_id" /></td>
                    </tr>
                    <tr>
                        <th>Library ID</th>
                        <td><input type="number" v-model="currentMapping.library_id" /></td>
                    </tr>
                    <tr>
                        <th>Book Status</th>
                        <!--<td><input type="text" v-model="currentMapping.book_status" /></td>-->
                        <td>
                            <select v-model="currentMapping.book_status">
                                <option value="available">Available</option>
                                <option value="borrowed">Borrowed</option>
                                <option value="reserved">Reserved</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div id="edit-error"></div>
            <input type="button" value="SEND" @click="sendEditRequest()" class="zoom-hover send-update" />
        </div>

        <!-- List All Mappings -->
        <div v-if="action === 'list'">
            <h1 class="component-h1">Book-Library Mappings List</h1>


            <!-- New Mapping button -->
            <input type="button" value="Add a new Mapping" @click="$router.push('/mappings/edit/0')" class="zoom-hover new-button" />

            <!-- Mappings List -->
            <table class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Mapping ID</th>
                        <th>Book ID</th>
                        <th>Library ID</th>
                        <th>Status</th>
                        <th>Book Name</th>
                        <th>Library Name</th>
                        <th>SEE</th>
                        <th>EDIT</th>
                        <th>DELETE</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="mapping in mappingArray" :key="mapping.book_library_mapping_id">
                        <td>{{ mapping.book_library_mapping_id }}</td>
                        <td>{{ mapping.book_id }}</td>
                        <td>{{ mapping.library_id }}</td>
                        <td>{{ mapping.book_status }}</td>
                        <td>{{ mapping.book_name }}</td>
                        <td>{{ mapping.library_name }}</td>
                        <td class="table-action-button">
                            <a :href="'/#/mappings/show/' + mapping.book_library_mapping_id">
                                <img src="../assets/logos/see-logo.png" alt="[SHOW]" class="zoom-hover">
                            </a>
                        </td>
                        <td class="table-action-button">
                            <a :href="'/#/mappings/edit/' + mapping.book_library_mapping_id">
                                <img src="../assets/logos/edit-logo.png" alt="[EDIT]" class="zoom-hover">
                            </a>
                        </td>
                        <td class="table-action-button">
                            <input type="button" value="DELETE" @click="sendDeleteRequest(mapping.book_library_mapping_id)" class="zoom-hover"/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BookLibraryMapping',
    props: ['action', 'id'],
    data() {
        return {
            mappingArray: [],
            currentMapping: {
                book_library_mapping_id: 0,
                book_id: 0,
                library_id: 0,
                book_status: 'available'
            }
        };
    },
    methods: {
        async getAllData() {
            try {
                let responseMappings = await this.$http.get('http://localhost:9000/api/mappings/listnames');
                this.mappingArray = await responseMappings.data;

            } catch (exception) {
                console.log(exception);
            }
        },

        async refreshCurrentMapping() {
            if (this.$props.id === "all" || this.$props.id === "0") {
                this.currentMapping = {
                    book_library_mapping_id: 0,
                    book_id: 0,
                    library_id: 0,
                    book_status: 'available'
                };
                return;
            }
            try {
                let responseMapping = await this.$http.get("http://localhost:9000/api/mappings/show/" + this.$props.id);
                this.currentMapping = responseMapping.data;

            } catch (exception) {
                console.log(exception);
            }
        },

        async sendDeleteRequest(mapping_id) {
            try {
                alert("DELETING MAPPING #" + mapping_id + "...");
                let response = await this.$http.get("http://localhost:9000/api/mappings/del/" + mapping_id);
                alert("DELETED: " + response.data.rowsDeleted + " mapping(s)");
                this.getAllData();

            } catch (ex) {
                console.log(ex);
            }
        },

        async sendEditRequest() {
            try {
                alert("EDITING MAPPING #" + this.currentMapping.book_library_mapping_id + "...");
                let response = await this.$http.post("http://localhost:9000/api/mappings/update/" + this.currentMapping.book_library_mapping_id, {
                    book_id: this.currentMapping.book_id,
                    library_id: this.currentMapping.library_id,
                    book_status: this.currentMapping.book_status
                });
                alert("EDITED: " + response.data.rowsUpdated);
                this.$router.push({path: '/mappings/list/all'});
                this.getAllData();

            } catch (ex) {
                console.log(ex)
                let errorDiv = document.createElement("div");
                errorDiv.innerHTML = "Make sure Book ID and Library ID exist and all fields are filled";
                errorDiv.style.color = "red";
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
                let response = await this.$http.get("http://localhost:9000/api/mappings/search/" + searchValue);
                this.mappingArray = response.data;

            } catch (ex) {
                console.log(ex);
            }
        }
    },

    watch: {
        id: function(newId, oldId) {
            this.refreshCurrentMapping();
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
        this.refreshCurrentMapping();
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