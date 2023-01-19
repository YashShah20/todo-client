<template>
    <div class="body">
        <div v-if="isloggedIn">
            <h2 id="title" v-if="!isSingleDay">your all notes</h2>
            <h2 id="title" v-else>single day notes</h2>
            <div id="single-note" v-for="note in notes">
                <p @click="single">{{ singleDay(note.created_on) }}</p>
                <input type="text" v-model="note.content">
                <br>
                <button @click.prevent="update" v-bind:id="note.id" v-bind:value="note.content">Update</button>
                <button @click.prevent="del" v-bind:id="note.id">Delete</button>
                <hr>
            </div>
            <br>
            <p class='link' v-if="isSingleDay" @click="allDay">back to all notes</p>
            <router-link class='link' to="/notes/add">Add new Note</router-link>
            <!-- <button @click.prevent='signout'>Sign out</button> -->
        </div>
        <div v-else>
            please log in to view
        </div>
    </div>

</template>

<script>
module.exports = {
    data() {
        return {
            notes: [],
            isSingleDay: false,
            isloggedIn: false
        }
    },
    methods: {
        allDay: function () {
            this.isSingleDay = false;
            console.log('asnkxjas');
            location.reload()
        }
        ,
        single: function (event) {
            this.notes = this.notes.filter(note => {
                return note.created_on.match(event.target.innerHTML)
            });
            this.isSingleDay = true
        },
        singleDay: function (day) {
            return `${day.slice(0, 10)}`

        },
        update: function (event) {
            const id = event.target.id;
            const value = event.target.value;
            fetch(`http://localhost:3000/notes/${id}/update`, {
                method: 'put',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    content: value
                })
            }).then(res => res.text()).then(data => {
                if (data == 'success') {
                    console.log('updated');
                    location.reload()
                }
            })
        }, del: function (event) {
            const id = event.target.id;
            const value = event.target.value;
            fetch(`http://localhost:3000/notes/${id}/delete`, {
                method: 'delete',
                headers: {
                    'content-type': 'application/json'
                },
            }).then(res => res.text()).then(data => {
                if (data == 'success') {
                    console.log('deleted');
                    location.reload()
                }
            })
        }, signout: function () {
            console.log(`Signed out`);
        }
    },
    created() {
        fetch(`http://localhost:3000/notes`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    // window.alert('login required...');
                } else {
                    this.notes = data;
                    this.isloggedIn = true
                }
            })
    }
}
</script>
<style scoped>
.body {
    text-align: center;
    background-image: linear-gradient(to right, #f0f7f7, white);
}

#title {
    text-align: center;
    text-transform: capitalize;
}

input {
    height: 25px;
    padding: 2px 10px;
    width: 75%;
    border-radius: 10px;
    margin-bottom: 10px;
}

button {
    border: transparent;
    border-radius: 10px;
    height: 25px;
    width: 75px;
}

.link {
    text-decoration: none;

    padding: 10px 20px;
    color: black;
    text-transform: uppercase;
    background-color: rgb(182, 220, 220);
    ;
    border: black;
    border-radius: 50px;
}
</style>