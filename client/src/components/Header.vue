<template>
    <nav class="navbar p-0">
        <router-link to="/home" class="navbar-brand px-2 botones"><img src="../assets/logoletraHor50x117.png"></router-link>
        <div class="nav-item btn dropdown order-lg-last float-right botones h-100" @click="cambiarMenu()">
            <a class="btn">{{ nombre }} <b-icon icon="chevron-double-down"></b-icon></a>
            <div class="dropdown-menu" id="menuDropdown" style="display: none;">
                <button class="btn dropdown-item" @click="logout()">Cuenta</button>
                <button class="btn dropdown-item" @click="logout()">Cerrar sesión</button>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'HeaderComponent',
    methods: {
        logout() {
            if(localStorage.getItem('token') != null){
                localStorage.removeItem('token');
            }
            this.$router.push('/');
        },
        cambiarMenu() {
            var menu = document.getElementById('menuDropdown');
            console.log(menu.style.display)
            if(menu.style.display == 'none') {
                menu.style.display = 'block'
            } else {
                menu.style.display = 'none'
            }
        }
    },
    props: ["nombre"]
}
</script>

<style>
.botones:hover {
    background-color: rgba(84, 102, 4, 0.823);
}

nav {
    background-color: rgba(225, 218, 14, 0.494);
}

#menuDropdown {
    right: 0px;
    margin-top: 0.5em;
}
</style>