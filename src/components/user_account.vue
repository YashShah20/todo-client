<template>
    <ul v-if="showAccount" class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle btn btn-primary" href="#" id="userDropdown" role="button"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="m-2 d-none d-lg-inline text-white text-capitalize small">
                    {{ username }}
                </span>
            </a>
            <!-- Dropdown - User Information -->
            <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                <router-link class="dropdown-item" to="/profile">
                    <i class="fas fa-user fa-sm fa-fw mr-2 text-white-400"></i>
                    Profile
                </router-link>
                <div class="dropdown-divider"></div>
                <div>
                    <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal" @click="signout">
                        <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                        Sign Out
                    </a>
                </div>
            </div>
        </li>
    </ul>
    <div v-else>
        <router-link class="btn btn-primary" to="/">
            Sign in
        </router-link>
    </div>
</template>
<script>

export default {
    props: ['showAccount'],
    data() {
        return {
            username: ''
        }
    },
    created() {
        this.username = localStorage.getItem("username")
    }, methods: {
        signout: function () {
            console.log('signout requessted');

            localStorage.removeItem("token")
            localStorage.removeItem("username")
            localStorage.removeItem("page")
            localStorage.removeItem("notePerPage")
            this.$router.push({ name: 'signin' })
            this.$emit('hideAccount')
        },
    },
    watch: {
        "showAccount": function () {
            if (this.showAccount) {
                this.username = localStorage.getItem("username")
            }
        }
    }
}
</script>
<style >

</style>