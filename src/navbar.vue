<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <router-link class="navbar-brand" to="/about">TODO App</router-link>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item active">
                    <router-link class="nav-link" to="/notes">
                        Notes
                    </router-link>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <user-account v-bind:showAccount="showAccount" @hideAccount="$emit('hideAccount')"></user-account>
            </form>
        </div>
    </nav>
</template>

<script>

import UserAccount from './components/user_account.vue';

export default {
    props: ['showAccount'],
    components: {
        'user-account': UserAccount
    },
    methods: {

    }
}
</script>

<style>
select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: unset;
    text-indent: 1px;
    text-overflow: '';
}
</style>