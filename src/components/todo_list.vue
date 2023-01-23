<template>
    <div>
        <div class="d-flex flex-row-reverse" style="display: ;">
            <button class="btn btn-lg mb-3 mx-2" @click="showAsCard = false">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-ul"
                    viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                </svg>
            </button>
            <button class="btn btn-lg mb-3 mx-2" @click="showAsCard = true">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-card-text" viewBox="0 0 16 16">
                    <path
                        d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                    <path
                        d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
                </svg>
            </button>
        </div>
        <hr>
        <div class="row">
            <template v-if="showAsCard">
                <div class="col col-3 m-2" v-for="note in notes" :key="note.id">
                    <todo-item :showAsCard="true" :item="note" @rm="$emit('rm')"></todo-item>
                </div>
            </template>
            <template v-else>
                <table class="table table-hover p-2 border border-5">
                    <thead>
                        <tr>
                            <!-- <th class="w-5"></th>
                            <th>Content</th>
                            <th></th>
                            <th></th> -->
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="note in notes" :key="note.id">
                            <todo-item :showAsCard="false" :item="note" @rm="$emit('rm')"></todo-item>
                        </tr>
                    </tbody>
                </table>
            </template>
        </div>
    </div>
</template>
<script>

import todoItem from './todo_item.vue';
export default {
    props: {
        notes: []
    },
    data() {
        return {
            showAsCard: true
        }
    },
    components: {
        'todo-item': todoItem,
    }, 
    methods: {

    }
}
</script>
<style >

</style>