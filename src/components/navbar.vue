<template>
    <div id="navbar">
        <router-link class='nav-item' to="/notes">Notes</router-link>
        <router-link class='nav-item' to="/about">About</router-link>
        <!-- <router-link to="/signout">Signout</router-link> -->
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
#navbar {
    background-color: #333;
    overflow: hidden;
}

/* Style the links inside the navigation bar */
.nav-item {
    float: left;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
}

/* Change the color of links on hover */
.nav-item:hover {
    background-color: #ddd;
    color: black;
}

/* Add a color to the active/current link */
.router-link-active {
    background-color: #04AA6D;
    color: white;
}
</style>