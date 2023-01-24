<template>
    <div class="container">
        <div v-if="error.code == 1" class="alert alert-danger text-center mt-4">
            <h4 class="alert-heading">Error</h4>
            <p>{{ error.msg }}</p>
            <hr>
            <router-link to="/">
                <button class="btn btn-secondary">Sign in</button>
            </router-link>
        </div>
        <div v-else class="mt-5">
            <div v-if="error.code > 1" class="alert alert-danger text-center mt-4">
                <!-- <h4 class="alert-heading">Error</h4> -->
                <p>{{ error.msg }}</p>
                <!-- <hr> -->
            </div>
            <table class="table table-bordered">
                <caption style="caption-side: top;text-align: center;" class="h3 text-capitalize">List of users
                </caption>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <!-- <th scope="col">Password</th> -->
                        <th scope="col">Role</th>
                        <th scope="col">Number of Notes</th>
                        <!-- <th scope="col"></th> -->
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in usersWithURL" :key="user.id">
                        <th scope="row" @click="userinfo = user; userinfo.password = ''">{{ index+ 1 }}</th>
                        <td>
                            <router-link :to="user.url">
                                {{ user.name }}
                            </router-link>
                        </td>
                        <td>{{ user.role == 3 ? 'admin' : 'user' }}</td>
                        <td>{{ user.notes_count }}</td>
                        <td class="text-center">
                            <button class="btn btn-danger" :id="user.id" @click="rm">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>


            <form class="my-3">
                <legend>Update User</legend>
                <p class="text-info text-lowercase">Note: click on the number in the table to automatically fill the data</p>
                <div class="mt-2">
                    <label for="">Username</label><input type="text" class="form-control" v-model="userinfo.name">
                </div>
                <div class="mt-2">
                    <label for="">Password</label><input type="text" placeholder="Optional" class="form-control"
                        v-model="userinfo.password">
                </div>
                <div class="mt-2">
                    <label for="">Role</label>
                    <select v-model="userinfo.role" class="form-control">
                        <option value="1" disabled>choose...</option>
                        <option value="2">user</option>
                        <option value="3">admin</option>
                    </select>
                </div>
                <div class="mt-3">
                    <button class="btn btn-primary" :disabled="disabled" @click="update">
                        update
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

export default {
    created() {
        this.$http.get("http://localhost:3000/admin/users", {
            headers: {
                "token": localStorage.getItem("token")
            }
        }).then(res => {
            console.log(res.body);
            this.users = res.body;
        }).catch(error => {
            this.error.code = 1;
            this.error.msg = error.body.error
        })
    },
    data() {
        return {
            users: [],
            error: {
                code: 0,
                msg: ''
            }, userinfo: {
                id: 0,
                name: '',
                password: '',
                role: '',

            }
        }
    },
    computed: {
        disabled() {
            // console.log();
            return (!this.userinfo.name || !this.userinfo.role);
        }, usersWithURL() {
            return this.users.map(user => {
                const url = `/admin/users/${user.id}`;
                user.url = url;
                return user
            })
        }
    },
    methods: {
        rm: function (event) {
            this.error.code = 0

            const id = event.target.id;
            console.log(event.target.id);

            this.$http.delete(`http://localhost:3000/admin/user/${id}/delete`, {
                headers: {
                    'token': localStorage.getItem('token')
                }
            }).then(res => {
                this.users = this.users.filter(user => {
                    return user.id != id
                })
            }).catch(error => {
                this.error.code = 2;
                this.error.msg = error.body
            })
        },
        update: function () {
            this.error.code = 0

            const id = this.userinfo.id;
            this.$http.put(`http://localhost:3000/admin/user/${id}/update`, this.userinfo, {
                headers: {
                    'token': localStorage.getItem('token')
                }
            }).then(res => {
                console.log('user updated');
                // this.usersWithURL.push({});
                // this.usersWithURL.pop()
            }).catch(error => {
                this.error.code = 2;
                this.error.msg = error.body
            })
        }
    },
}
</script>

<style scoped>

</style>