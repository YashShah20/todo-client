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
                <p>{{ error.msg }}</p>
            </div>
            <p>
                <router-link to="/admin">Go Back</router-link>
            </p>
            <p class="lead">Username: <span class="mark">{{ user.name }}</span></p>
            <p class="text">Role: <span class="mark">{{ user.role == 3 ? 'admin' : 'user' }}</span></p>
            <div v-if="notes.length > 0">
                <table class="table table-bordered">
                    <caption style="caption-side: top;text-align: center;">Notes of the <b>{{ user.name }}</b>
                    </caption>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" class="w-75">Content</th>
                            <th scope="col text-center"></th>
                            <th scope="col text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(note, index) in notes" :key="note.id">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>
                                <textarea class="w-100 p-3 border border-dark border-rounded"
                                    v-model="note.content"></textarea>
                            </td>
                            <td class="w-10 text-center">
                                <button class="btn btn-primary" @click="update" :id="note.id" :value="note.content">
                                    update
                                </button>
                            </td>
                            <td class="w-10 text-center">
                                <button class="btn btn-danger" @click="rm" :id="note.id">
                                    delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                <p class="text-center text-danger h3">
                    Notes not available
                </p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    created() {
        const id = this.$route.params.id;
        this.$http.get(`http://localhost:3000/admin/user/${id}`, {
            headers: {
                "token": localStorage.getItem("token")
            }
        }).then(res => {
            console.log(res.body);
            this.user = res.body.user;
            this.notes = res.body.notes;
        }).catch(error => {
            this.error.code = 1;
            this.error.msg = error.body.error
        })
    },
    data() {
        return {
            notes: [],
            user: {

            }, error: {
                code: 0,
                msg: ''
            }
        }
    },
    methods: {
        update: function (event) {
            const { value, id } = event.target
            console.log(id, value);
            this.$http.put(`http://localhost:3000/notes/${id}/update`, {
                content: value
            }, {
                headers: {
                    "token": localStorage.getItem("token")
                }
            }).then(res => {
                console.log(res);
            }).catch(error => {
                this.error.code = 2;
                this.error.msg = error
            })
        }, rm: function (event) {
            const { id } = event.target

            this.$http.delete(`http://localhost:3000/notes/${id}/delete`, {
                headers: {
                    "token": localStorage.getItem("token")
                }
            }).then(res => {
                console.log(res);

                this.notes = this.notes.filter(note => {
                    return note.id != id
                })
            }).catch(error => {
                this.error.code = 2;
                this.error.msg = error
            })
        }
    }
}
</script>

<style scoped>

</style>