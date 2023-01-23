<template>
    <div>
        <div v-if="showAsCard">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">
                        <router-link v-bind:to="urlForYear(item.created_on)">{{
                            item.created_on | year
                        }}</router-link> -
                        <router-link v-bind:to="urlForMonth(item.created_on)">{{
                            item.created_on | month
                        }}</router-link> -
                        <router-link v-bind:to="urlForDay(item.created_on)">{{
                            item.created_on | date
                        }}</router-link>
                    </h5>
                    <h6 class="card-subtitle mb-2 text-muted">{{ item.name }}</h6>
                    <p class="card-text">
                        {{ item.content | short }}
                    </p>
                    <button v-bind:id="item.id" @click="rm" class="text-uppercase btn btn-sm btn-danger">delete</button>
                </div>
            </div>
        </div>
        <div v-else>
            <th scope="row">{{ item.id }}</th>
            <td class="w-50">
                <div class="form-group">
                    <textarea type="text" rows="5" cols="100" class="form-control" v-model="item.content"></textarea>
                </div>
            </td>
            <td class="text-center">
                <button v-bind:id="item.id" v-bind:value="item.content" @click="update"
                    class="text-uppercase btn btn-sm btn-primary">update</button>
            </td>
            <td class="text-center">
                <button v-bind:id="item.id" @click="rm" class="text-uppercase btn btn-sm btn-danger">delete</button>
            </td>
        </div>
    </div>
</template>
<script>

export default {
    props: {
        item: {

        },
        showAsCard: true
    },
    filters: {
        'date': function (value) {
            return value.toString().slice(8, 10);
        },
        'month': function (value) {
            return value.toString().slice(5, 7);
        },
        'year': function (value) {
            return value.toString().slice(0, 4);
        },
        'short': function (value) {
            return value.toString().slice(0, 100) + "..."
        }
    },
    methods: {
        urlForYear: function (date) {
            let year = date.toString().slice(0, 4)
            return `notes/${year}`
        },
        urlForMonth: function (date) {
            let year = date.toString().slice(0, 4)
            let month = date.toString().slice(5, 7)
            return `notes/${year}/${month}`
        },
        urlForDay: function (date) {
            let year = date.toString().slice(0, 4)
            let month = date.toString().slice(5, 7)
            let day = date.toString().slice(8, 10)
            return `notes/${year}/${month}/${day}`
        },

        rm: function (event) {
            this.rmDb(event)
            this.$emit('rm')
        },
        rmDb(event) {
            this.$http.delete(`http://localhost:3000/notes/${event.target.id}/delete`).then(res => {
                console.log(res.body);
                if (res.body.error) {
                    this.error.code = 1;
                    this.error.msg = res.body.error
                } else {
                    console.log(res.body);
                    location.reload()
                }
            })
        },
        update: function (event) {
            this.updateDb(event);
        },
        updateDb(event) {
            this.$http.put(`http://localhost:3000/notes/${event.target.id}/update`, {
                content: event.target.value
            }).then(res => {
                console.log(res.body);
                switch (res.body) {
                    case 'success':
                        console.log('note updated');
                        location.reload()
                        break;
                    case 'error':
                        this.error.code = 1;
                        this.error.msg = res.body
                        break
                }
            })
        },
    }
}
</script>
<style >

</style>