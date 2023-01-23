<template>
    <div class="container mt-5 ">
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
                <span class="text-capitalize">{{ user.role== 2 ? 'user' : 'admin' }}</span>
            </div>
        </div>
        <hr>
        <b>
            <label for="">Reset Password</label>
        </b>
        <form>
            <div class="form-group">
                <label for="formGroupExampleInput">Current password</label>
                <input type="password" class="form-control" id="formGroupExampleInput" placeholder="Enter password">
            </div>
            <div class="form-group">
                <label for="formGroupExampleInput2">New password</label>
                <input type="password" class="form-control" id="formGroupExampleInput2" placeholder="Enter password">
            </div>
            <div class="form-group">
                <button disabled class="btn btn-primary">Change</button>
            </div>

        </form>
    </div>
</template>
<script>

export default {
    data() {
        return {
            user: {

            }
        }
    },
    created() {
        this.username = localStorage.getItem("username");

        this.$http.get("http://localhost:3000/user", {
            headers: {
                token: localStorage.getItem("token")
            }
        }).then(res => {
            console.log(res.body);
            this.user = res.body
        }).catch(error => {
            this.$router.push({name:"signin"})
            console.log(error);
        })
    }
}
</script>
<style >

</style>