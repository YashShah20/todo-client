<template>
    <div class="container">
        <div v-if="error.code > 0" class="alert alert-danger text-center mt-4">
            <h4 class="alert-heading">Login Required</h4>
            <p>{{ error.msg }}</p>
            <hr>
            <router-link to="/">
                <button class="btn btn-secondary">Sign in</button>
            </router-link>
        </div>
        <div v-else>
            <h3 class="mt-3 text-center">Your saved notes</h3>
            <hr>
            <br>
            <div class="">
                <div class="form-group">
                    <label for="exampleInputtext1">Add Note <span class="text-danger lead">*</span> </label>
                    <textarea rows="5" class="form-control" v-model="newNoteText"
                        placeholder="your text goes here... "></textarea>
                </div>
                <div class="text-center">
                    <button :disabled="(newNoteText.trim().length > 5 )? false : true" class="btn" @click="add">Add</button>
                </div>
            </div>
            <br>
            <div class="d-flex flex-row">
                <div class="p-1">
                    <select class="form-control" v-model="notePerPage">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
                <div class="p-1">
                    <p>Showing {{ Math.min(nItems, notePerPage) }} entries out of {{ nItems }}</p>
                </div>
            </div>
            <todo-list v-bind:notes="notes" @rm="rm">
            </todo-list>
            <app-pagination v-bind:nItems="nItems" v-bind:notesPerPage="notePerPage" v-bind:currentPage="page"
                @pageChanged="handlePageChange">
            </app-pagination>
        </div>
    </div>
</template>

<script>
const notes = require('./../notes')
import todoList from './todo_list.vue'

import pagination from './pagination.vue'
// import { log } from 'console'

export default {
    components: {
        'todo-list': todoList,
        'app-pagination': pagination,
    },
    data() {
        return {
            notes: [],
            newNoteText: '',
            error: {
                code: 0,
                msg: ""
            },
            nItems: 0,
            notePerPage: 10,
            page: 1
        }
    },
    computed: {
    },
    created() {
        // console.log('component created');
        this.page = localStorage.getItem("page") || 1
        this.notePerPage = localStorage.getItem("notePerPage") || 10
        this.loadData();
    },
    methods: {
        handlePageChange: function (next_page) {
            this.page = next_page
        },
        loadData: function () {
            this.$http.get(`http://localhost:3000/notes?page=${this.page}&note_per_page=${this.notePerPage}`, {
                headers: {
                    'token': localStorage.getItem("token")
                }
            }).then(res => {
                this.notes = res.body
            }).catch(error => {
                this.error.code = 1;
                this.error.msg = error.body.error
                console.log(error);
            });

            this.$http.get(`http://localhost:3000/notes/size`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            }).then(res => {
                this.nItems = res.body.count
            }).catch(error => {
                this.error.code = 1;
                this.error.msg = error.body.error
                console.log(error);
            });
        },
        add: function () {
            console.log('request');
            this.nItems = parseInt(this.nItems) + 1
            this.addDb()
        },
        addDb() {
            this.$http.post(`http://localhost:3000/notes/`, {
                content: this.newNoteText
            }, {
                headers: {
                    token: localStorage.getItem("token")
                }
            }).then(res => {
                console.log(res.body);
                this.notes.push(res.body)
            }).catch(error => {
                this.error.code = 1;
                this.error.msg = error.body.error
                console.log(error);
            })
        },
        rm: function (id) {
            console.log('delete requested');
            console.log(id);
            this.notes = this.notes.filter(note => {
                return note.id != id
            });
            this.nItems -= 1
        }
    },
    watch: {
        'page': function (nextPage) {
            // this.page = nextPage
            localStorage.setItem("page", this.page)
            this.loadData();
        },
        'notePerPage': function (newValue) {
            // this.page = nextPage
            localStorage.setItem("notePerPage", this.notePerPage)
            this.loadData();
        },
    }
}
</script>

<style scoped>

</style>