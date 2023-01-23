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
                    <label for="exampleInputtext1">Add Note</label>
                    <textarea rows="5" class="form-control" v-model="newNoteText"
                        placeholder="your text goes here... "></textarea>
                </div>
                <div class="text-center">
                    <button class="btn" @click="add">Add</button>
                </div>
            </div>
            <br>
            <select class="dropdown" v-model="notePerPage">
                <!-- <option value="5">5</option> -->
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
            <label for="">showing {{ notePerPage }} entries</label>

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
        this.page = 1
        this.notePerPage = 10
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
            var newNote = {};
            newNote.content = this.newNoteText;

            this.addDb(newNote)
            // this.notes.push(newNote)
        },
        addDb(note) {
            this.$http.post(`http://localhost:3000/notes/`, note, {
                headers: {
                    token: localStorage.getItem("token")
                }
            }).then(res => {
                console.log(res.body);
            }).catch(error => {
                this.error.code = 1;
                this.error.msg = error.body.error
                console.log(error);
            })
        },
        rm: function (event) {
            console.log('delete requested');
            this.notes = this.notes.filter(note => {
                return note.id != event.target.id
            })
        }
    },
    watch: {
        'page': function (nextPage) {
            // this.page = nextPage
            this.loadData();
        },
        'notePerPage': function (newValue) {
            // this.page = nextPage
            this.loadData();
        },
    }
}
</script>

<style scoped>

</style>