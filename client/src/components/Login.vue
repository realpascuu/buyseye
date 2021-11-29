<template>
<div class="mt-4 container-fluid rounded col-3 shadow align-text-bottom">
    <div class="row pt-3">
        <img class="img-logo" src="../assets/logoletra.png">
    </div>
    <div class="separator row"></div>
    <div class="m-2 p-1">
        <input required class="form-control" v-model="login" type="text" placeholder="Username">
    </div>
    <div class="m-2 p-1">
        <input required class="form-control" v-model="password" type="password" placeholder="Contraseña">
    </div>
    <div class="row m-2 p-1">
        <button class="btn btn-dark shadow" @click="doLogin()">Entrar</button>
    </div>
    <div class="separator row"></div>
    <div class="row p-3">
        <a class="" href="/register">Regístrate aquí</a>
    </div>
</div>
</template>

<script>
import Cliente from '../services/ClientAPI.js'
export default {
    name:'Login',
    data() {
        return {
            login: '',
            password: '',
            cliente: new Cliente('http://localhost:3000')
        }
    },
    methods: {
        async doLogin() {
            console.log('Login para ' + this.login + ' con password ' + this.password)
            var resp = await this.cliente.doLogin(this.login, this.password);
            if(resp.length > 0) {
                localStorage.setItem('token', resp);
                console.log(localStorage.getItem('token'));
                this.$router.push('/home');
                
            } else {
                window.alert("Usuario o contraseña incorrecta!");
            }
        }
    }
}
</script>

<style>
.img-logo {
    height: 150px;
    width: 150px;
    margin: 0 auto;
}
.separator {
    border-top: 1px solid grey;
    height: 2px;
}
</style>