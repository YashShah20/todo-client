<template>
    <div>
        <form action="#">
            <label for="">Name : </label>
            <input type="text" v-model="name">
            <br>
            <label for="">Password : </label>
            <input type="password" v-model="password">
            <br>
            <button @click.prevent="login"> Login </button>
        </form>
    </div>
</template>

<script>
module.exports = {
    data() {
        return {
            name: 'yash',
            password: 'abc'
        }
    },
    methods: {
        login: function () {
            fetch(`http://localhost:3000/`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.name,
                    password: this.password
                })
            })
                .then(res => res.text())
                .then(data => {
                    window.alert(data)
                })
        }
    }

}
</script>
<style>
form {
    text-align: center;
}

/* label {
    margin-right: 10px;
} */
input {
    width: 25%;
    height: 20px;
    margin: 15px 0px;
}

button {
    border: transparent;
    border-radius: 10px;
    height: 25px;
    width: 75px;
}
</style>