<template>
<div class="container-fluid p-4">
    <div  class="mt-4 container-fluid rounded col-md-5 col-lg-4 col-sm-6 col-xl-3 shadow">
        <div class="pb-4 pt-3 border-bottom">
            <img class="img-logo pt-1 pb-1" src="../assets/logoletra.png">
        </div>
        <div class="pb-4 pt-4 border-bottom">
            <div class="m-2 p-1">
                <input required class="form-control" v-model="login" type="text" placeholder="Username">
            </div>
            <div class="m-2 p-1">
                <input required class="form-control" v-model="password" type="password" placeholder="Contraseña">
            </div>
            <div class="row m-2 p-1">
                <button id="boton-entrar" class="btn btn-dark shadow" @click="doLogin()">Entrar</button>
            </div>
        </div>
        <div class="row p-2">
            <router-link to="/register" class="text-center btn text-primary">Regístrate aquí</router-link>
        </div>
    </div>
    <div id="alerta" class="alert alert-danger shadow container fade show mt-2 col-lg-5 col-sm-8" role="alert" hidden>
        <button type="button" class="bg-transparent border-0 float-end close" data-dismiss="alert" aria-label="Close" @click="ocultarAlert()">
        <span aria-hidden="true">&times;</span>
        </button>
        Usuario o contraseña incorrectos.
    </div>
</div>
</template>

<script>
import anime from 'animejs'
import axios from 'axios'

export default {
    name:'Login',
    data: () => {
        return {
            login: '',
            password: ''
        }
    },
    methods: {
        async doLogin () {
            // llamamos a la API
            axios.post("http://localhost:3000/auth/login", { 
                username: this.login, 
                password: this.password 
            }).then((resp) => {
                // respuesta correcta
                console.log("inicio de sesión correcto!")
                var token = resp.data.token;
                localStorage.setItem('token', token);
                this.$router.push('/home');
            }).catch((error) => {
                // fallo
                console.log(error);
                var alerta = document.getElementById('alerta');
                var boton = document.getElementById('boton-entrar');
                // declaramos animación SHAKE del botón
                var botonShake = anime({
                    targets: boton,
                    duration: 550,
                    translateX: [
                        { value: -20, },
                        { value: 20, },
                        { value:-10, },
                        { value: 10, },
                        { value: 0, },
                    ],
                });
                botonShake.restart;
                alerta.hidden = false;
            });
        },

        ocultarAlert() {
            var alerta = document.getElementById('alerta');
            alerta.hidden = true;
        }
    }
}
</script>

<style>
.img-logo {
    display: flex;
    height: 50%;
    width: 50%;
    margin: 0 auto;
}
</style>