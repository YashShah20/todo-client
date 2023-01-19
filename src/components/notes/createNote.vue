<template>
    <div>
        <h2 id="title">Create note</h2>
        <form action="#">
            <label for="">Content : </label>
            <textarea v-model="content"></textarea>
            <br>
            <button @click.prevent="add">Save</button>
        </form>
    </div>
</template>

<script>
module.exports = {
    data() {
        return {
            content: "Add you note..."
        }
    },
    methods: {
        add: function () {
            fetch('http://localhost:3000/notes/', {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    content: this.content
                })
            })
                .then(res => {
                    res.text()
                })
                .then(data => {
                    location.href = 'http://localhost:8080/#/notes'
                })
        }
    }
}
</script>
<style scoped>
body{
    background-image: linear-gradient(to right, red , yellow);
}
#title {
    text-align: center;
    text-transform: capitalize;
}
label {
    font-size: large;
}
textarea {
    width: 50%;
    height: 50px;
    border-radius: 5px;
    padding: auto;
    text-align: center;
}
button {
    margin-top: 10px;
    height: 40px;
    width:80px;
    border-radius: 50px;
}
form {
    text-align: center;
}
</style>