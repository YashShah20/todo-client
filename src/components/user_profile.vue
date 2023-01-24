<template>
    <div class="container mt-5 ">
        <div v-if="error.code > 0" class="alert alert-danger text-center mt-4">
            <h4 class="alert-heading">Error</h4>
            <p>{{ error.msg }}</p>
        </div>
        <div v-if="success.code > 0" class="alert alert-success text-center mt-4">
            <h4 class="alert-heading">Success</h4>
            <p>{{ success.msg }}</p>
        </div>
        <h2 class="text-center">Profile</h2>
        <div class="row">
            <div class="col col-12">
                <b>
                    <label for="">Username</label>:
                </b>
                <span class="text-capitalize">{{ user.name }}</span>
            </div>
            <div class="col col-12">
                <b>
                    <label for="">Account Type</label>:
                </b>
                <span class="text-capitalize">{{ user.role == 2 ? 'user' : 'admin' }}</span>
            </div>
            <div class="col col-12" v-if="user.role === 3">
                <router-link class="btn btn-primary" to="admin">
                    Go to admin panel
                </router-link>
            </div>
        </div>
        <hr>
        <b>
            <label for="">Reset Password</label>
        </b>
        <form>
            <div class="form-group">
                <label for="formGroupExampleInput">Current password</label>
                <input type="password" class="form-control" v-model="oldPassword" placeholder="Enter password">
            </div>
            <div class="form-group">
                <label for="formGroupExampleInput2">New password</label>
                <input type="password" class="form-control" v-model="newPassword" placeholder="Enter password">
            </div>
            <div class="form-group">
                <button @click="updatePassword" :disabled="(!oldPassword || !newPassword)" class="btn btn-primary">Change</button>
            </div>
        </form>
    </div>
</template>
<script>

export default {
    data() {
        return {
            user: {

            },
            error: {
                code: 0,
                msg: ''
            },
            success: {
                code: 0,
                msg: ''
            },
            oldPassword: '',
            newPassword: ''
        }
    },
    created() {
        this.$http.get("http://localhost:3000/user", {
            headers: {
                token: localStorage.getItem("token")
            }
        }).then(res => {
            console.log(res.body);
            this.user = res.body
        }).catch(error => {
            this.$router.push({ name: "signin" })
            console.log(error);
        })
    }, methods: {
        updatePassword: function () {
            this.$http.put(`http://localhost:3000/user/update`, {
                oldPassword: this.oldPassword,
                newPassword: this.newPassword
            }, {
                headers: {
                    token: localStorage.getItem("token")
                }
            }).then(res => {
                this.success.code = 1
                this.success.msg = 'password changed'
                setTimeout(() => {
                    this.success.code = 0
                }, 3000)
            }).catch(error => {
                this.error.code = 1
                this.error.msg = error.body.error
                setTimeout(() => {
                    this.error.code = 0
                }, 3000)
            })
        }
    }
}
</script>
<style >

</style>