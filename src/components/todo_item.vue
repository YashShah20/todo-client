<template>
    <div v-if="showAsCard">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">
                    <p class="text-primary">
                        <span>
                            {{ computedNote.year }} -
                        </span>
                        <span>
                            {{ computedNote.month }} -
                        </span>
                        <span>
                            {{ computedNote.day }}
                        </span>
                    </p>
                </h5>
                <h6 class="card-subtitle mb-2 text-muted">{{ computedNote.name }}</h6>
                <p class="card-text">
                    {{ computedNote.shortContent }}
                </p>
                <button v-bind:id="computedNote.id" @click="rm" class="text-uppercase btn btn-sm btn-danger">
                    delete
                </button>
            </div>
        </div>
    </div>
    <tr v-else>
        <th>{{ item.id }}</th>
        <td class="w-100">
            <textarea class="form-control" v-model="item.content"></textarea>
        </td>
        <td>
            <div class="d-flex align-items-center flex-column" style="">
                <div class="p-2">
                    <button v-bind:id="item.id" v-bind:value="item.content" @click="update"
                        class="text-uppercase btn btn-sm btn-primary">update
                    </button>
                </div>
                <div class="p-2">
                    <button v-bind:id="item.id" @click="rm" class="text-uppercase btn btn-sm btn-danger">
                        delete
                    </button>
                </div>
            </div>
        </td>
    </tr>
</template>
<script>

export default {
    props: ['item', 'showAsCard'],

    methods: {
        rm: function (event) {
            this.$emit('rm')
            this.rmDb(event)
        },
        rmDb(event) {
            console.log(event.target.id);
            this.$http.delete(`http://localhost:3000/notes/${event.target.id}/delete`, {
                headers: {
                    token: localStorage.getItem('token')
                }
            }).then(res => {
                console.log(res.body);
            }).catch(error => {
                console.log(error);
            })
        },
        update: function (event) {
            this.updateDb(event);
        },
        updateDb(event) {
            this.$http.put(`http://localhost:3000/notes/${event.target.id}/update`, {
                content: event.target.value
            }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            }).then(res => {
                console.log(res.body);
            }).catch(error => {
                console.log(error)
            })
        },
    },
    computed: {
        computedNote() {
            let result = this.item;
            result.year = result.created_on.slice(0, 4)
            result.month = result.created_on.slice(5, 7)
            result.day = result.created_on.slice(8, 10)

            result.yearURL = `notes/${result.year}`
            result.monthURL = `notes/${result.year}/${result.month}`
            result.dayURL = `notes/${result.year}/${result.month}/${result.day}`

            result.shortContent = result.content.length > 10 ? result.content.slice(0, 10) + "..." : result.content;

            return result;
        }
    }
}
</script>
<style >

</style>