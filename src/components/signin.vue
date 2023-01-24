<template>
    <div class="container mt-5 ">
        <div v-if="error.code > 0" class="alert alert-danger text-center">
            {{ error.msg }}
        </div>
        <h2 class="text-center">Sign In</h2>
        <form>
            <div class="form-group">
                <label for="exampleInputtext1">Username</label>
                <input type="text" v-model="user.name" class="form-control" id="exampleInputtext1"
                    aria-describedby="textHelp" placeholder="Enter username">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" v-model="user.password" class="form-control" id="exampleInputPassword1"
                    placeholder="Password">
            </div>

            <div class="text-center">
                <button class="btn btn-primary" href="#" @click.prevent="signin" :disabled="(!user.name || !user.password)">
                    Sign In
                </button>
            </div>
            <div class="text-center mt-3">
                <router-link class="" to="/signup">Create new account</router-link>
                <span class="mx-2">|</span>
                <router-link class="text-danger" to="/">Forgot password</router-link>
            </div>
        </form>
    </div>
</template>

<script>
module.exports = {
    data() {
        return {
            user: {
                name: 'yashshah',
                password: 'abc'
            },
            error: {
                code: 0,
                msg: ''
            }
        }
    },
    methods: {
        signin: function () {
            try {
                this.$http.post('http://localhost:3000/', this.user).then(res => {
                    localStorage.setItem("token", res.body.token);
                    localStorage.setItem("username", res.body.user.name);

                    this.$emit('showAccount');

                    console.log(res.body.user);
                    if (res.body.user.role === 3) {
                        this.$router.push({ name: "admin" })
                    } else {
                        this.$router.push({ name: "notes" })
                    }
                }).catch(error => {
                    this.error.code = 1;
                    this.error.msg = error.body.error;
                })
            } catch (error) {
                console.log(error);
            }
        },
    }
}
</script>

<style scoped>

</style>