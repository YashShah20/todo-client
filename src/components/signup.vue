<template>
    <div>
        <div class="container mt-5">
            <div v-if="error.code > 0" class="alert alert-danger text-center">
                {{ error.msg }}
            </div>
            <h2 class="text-center m-2">Sign Up</h2>
            <form>
                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label for="exampleInputtext1">Username</label>
                            <input required type="text" v-model="user.name" class="form-control" aria-describedby="textHelp"
                                placeholder="Enter username">
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label for="inputState">Role</label>
                            <select required id="inputState" v-model="user.role" class="form-control">
                                <option disabled>choose...</option>
                                <option value="2">user</option>
                                <!-- <option value="3">admin</option> -->
                            </select>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input required type="password" v-model="user.password" class="form-control" placeholder="Password">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Confirm password</label>
                    <input required type="password" v-model="user.cpassword" class="form-control"
                        placeholder="Confirm password">
                </div>
                <div class="text-center">
                    <input type="submit" value="Sign up" class="btn btn-primary " href="#" @click.prevent="signup" />
                </div>
                <div class="text-center mt-3">
                    Already have an account? <router-link class="" to="/">Sign-in here</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

module.exports = {
    data() {
        return {
            user: {
                name: '',
                role: 2,
                password: "",
                cpassword: ""
            },
            error: {
                code: 0,
                msg: ""
            }
        }
    },
    methods: {
        signup: function () {
            if (this.validate()) {
                this.$http.post('http://localhost:3000/signup', this.user).then(res => {
                    console.log('user created ...');
                    this.$router.push({ name: "signin" })
                }).catch(error => {
                    this.error.code = 1
                    this.error.msg = error.body.error
                    console.log(error)
                })
            }
        },

        validate: function () {
            if (!this.user.name || this.user.name === '') {
                this.error.code = 1
                this.error.msg = 'name can not be empty'
                return false;
            }
            else if (!this.user.password || this.user.password === '') {
                this.error.code = 2
                this.error.msg = 'password can not be empty'
                return false;
            }
            else if (this.user.password != this.user.cpassword) {
                this.error.code = 3
                this.error.msg = 'password and confirm password must match'
                return false;
            }
            this.error.code = 0
            this.error.msg = ''
            return true;
        }
    }

}
</script>

<style scoped>

</style>