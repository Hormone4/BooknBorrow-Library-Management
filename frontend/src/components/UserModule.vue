<template>
    <div>
        <div v-if="action === 'show'">
            <h1 class="component-h1">User Details</h1>
            <div class="show-user">
                <table class="table table-striped table-bordered">
                    <tbody>
                        <tr>
                            <th>User ID</th>
                            <td>{{ currentUser.user_id }}</td>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <td>{{ currentUser.user_name }}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{{ currentUser.user_email }}</td>
                        </tr>
                        <tr>
                            <th>Password</th>
                            <td>{{ currentUser.user_password }}</td>
                        </tr>
                        <tr>
                            <th>Created</th>
                            <td>{{ currentUser.user_created }}</td>
                        </tr>
                        <tr>
                            <th>Role</th>
                            <td>{{ currentUser.user_role }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div v-if="action === 'edit'">
            <h1 class="component-h1">{{ currentUser.user_id === 0 ? 'Add New User' : 'Edit User' }}</h1>
            <div class="show-user">
                <table class="table table-striped table-bordered">
                    <tbody>
                        <tr>
                            <th>User ID</th>
                            <td>{{ currentUser.user_id }}</td>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <td><input type="text" v-model="currentUser.user_name"></td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td><input type="email" v-model="currentUser.user_email"></td>
                        </tr>
                        <tr>
                            <th>Password</th>
                            <td><input type="password" v-model="currentUser.user_password"></td>
                        </tr>
                        <tr>
                            <th>Role</th>
                            <td>
                                <select v-model="currentUser.user_role">
                                    <option value="USER">User</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <input type="button" value="SAVE" @click="sendEditRequest()" class="zoom-hover send-update">
        </div>

        <div v-if="action === 'list'">
            <h1 class="component-h1">User List</h1>
            
            <!-- New user button -->
            <input type="button" value="Add a new user" @click="$router.push('/users/edit/0')" class="zoom-hover new-button" />

            <!-- User list -->
            <table class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th class="table-action-button">SEE</th>
                        <th class="table-action-button">EDIT</th>
                        <th class="table-action-button">DELETE</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in userArray" :key="user.user_id">
                        <td>{{ user.user_id }}</td>
                        <td>{{ user.user_name }}</td>
                        <td>{{ user.user_email }}</td>
                        <td>{{ user.user_role }}</td>
                        <td>
                            <a :href="'/#/users/show/' + user.user_id">
                                <img src="../assets/logos/see-logo.png" alt="[SHOW]" class="zoom-hover">
                            </a>
                        </td>
                            <td>
                            <a :href="'/#/users/edit/' + user.user_id">
                                <img src="../assets/logos/edit-logo.png" alt="[EDIT]" class="zoom-hover">
                            </a>
                        </td>
                        <td>
                            <input type="button" value="DELETE" @click="sendDeleteRequest(user.user_id)" class="zoom-hover"/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Users',
    props: ['action', 'id'],
    data() {
        return {
            userArray: [],
            currentUser: {
                user_id: 0,
                user_name: '',
                user_email: '',
                user_password: '',
                user_created: new Date().toISOString().slice(0, 10),
                user_role: 'USER'
            }
        };
    },

    methods: {
        async getAllData() {
            try {
                let response = await this.$http.get('http://localhost:9000/api/users/list');
                this.userArray = response.data;
            } catch (error) {
                console.log(error);
            }
        },

        async refreshCurrentUser() {
            if (this.$props.id === "all" || this.$props.id === "0") {
                this.currentUser = {
                    user_id: 0,
                    user_name: 'user name',
                    user_email: 'user@email.com',
                    user_password: 'user-pass-word',
                    user_created: new Date().toISOString().slice(0, 10),
                    user_role: 'USER'
                };
                return;
            }
            try {
                let response = await this.$http.get("http://localhost:9000/api/users/show/" + this.$props.id);
                this.currentUser = response.data;
            } catch (error) {
                console.log(error);
            }
        },

        async sendDeleteRequest(user_id) {
            try {
                alert("DELETING USER #" + user_id + "...");
                let response = await this.$http.get("http://localhost:9000/api/users/del/" + user_id);
                alert("User deleted successfully");
                this.getAllData();
            } catch (error) {
                console.log(error);
            }
        },

        async sendEditRequest() {
            try {
                let response = await this.$http.post("http://localhost:9000/api/users/update/" + this.currentUser.user_id, {
                    user_name: this.currentUser.user_name,
                    user_email: this.currentUser.user_email,
                    user_password: this.currentUser.user_password,
                    user_role: this.currentUser.user_role
                });
                alert(this.currentUser.user_id === 0 ? "User added successfully" : "User updated successfully");
                this.$router.push('/users/list/all');
            } catch (error) {
                console.log(error);
            }
        }
    },

    watch: {
        id: function(newId) {
            this.refreshCurrentUser();
        },
        action: function(newAction) {
            if (newAction === 'list') {
                this.getAllData();
            }
        }
    },

    created() {
        this.getAllData();
        this.refreshCurrentUser();
    }
};
</script>

<style scoped>
.show-user {
    margin: auto;
    width: 80%;
    max-width: 800px;
}

.show-user table {
    width: 100%;
}


.send-update {
    margin-top: 20px;
    padding: 10px 20px;
}

.new-button {
  padding: 10px;
  margin-bottom: 50px;
  margin-top: -30px;
}

</style></tr></div>