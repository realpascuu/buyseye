<template>
<div class="container-fluid p-4">
    <div class="col-md-5 col-col-lg-3 col-sm-6 col-xl-4 col-xxl-3 shadow container-fluid rounded">
        <div class="pt-3 border-bottom">
            <h2 class="text-center text-uppercase">Registro</h2>
        </div>
        <div class="m-3">
            <div class="border-bottom">
                <div class="pt-1">
                    <h6 class="text-center text-muted">Datos personales</h6>
                </div>
                <div class="m-3">
                    <input class="form-control" type="text" v-model="datos.nombre" placeholder="Nombre">
                </div>
                <div class="m-3">
                    <input class="form-control" type="text" v-model="datos.apellidos" placeholder="Apellidos">
                </div>
                <div class="m-3">
                    <input class="form-control" type="email" v-model="datos.email" placeholder="Correo electrónico">
                </div>
                <div class="m-3">
                    <input class="form-control" type="text" v-model="datos.direccion" placeholder="Dirección">
                </div>
                <div class="m-3 text-muted">
                    <label for="fecha_nac">Fecha de nacimiento</label>
                    <input id="fecha_nac" class="form-control text-center" type="date" v-model="datos.fechaNac" placeholder="Fecha de nacimiento">
                </div>
            </div>
            <div class="border-bottom">
                <div class="mt-3">
                    <h6 class="text-center text-muted">Datos inicio de sesión</h6>
                </div>
                <div class="m-3">
                    <input class="form-control" type="text" v-model="datos.username" placeholder="Nombre de usuario">
                </div>
                <div class="m-3">
                    <input class="form-control" type="password" v-model="datos.password1" placeholder="Contraseña">
                </div>
                <div class="m-3">
                    <input class="form-control" type="password" v-model="datos.password2" placeholder="Repetir contraseña">
                </div>
            </div>
            <div class="row m-3">
                <button type="button" @click="doRegister()" class="btn btn-dark ">Registrarme</button>
            </div>
        </div>
        <div class="row pb-2">
            <router-link class="text-center btn text-primary mt-2" to="/login">Volver</router-link>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'RegisterComponent',
    data() {
        return { 
            datos: {
                username: '',
                email: '',
                password1: '',
                password2: '',
                fechaNac: '',
                nombre: '',
                apellidos: '',
                direccion: ''
            }
        }
    },
    methods: {
        doRegister() {
            console.log('do register');
            console.log(this.datos.username)
            if(!Object.values(this.datos).some((element) => element == '') &&
            this.datos.password1 == this.datos.password2) {
                axios.post('http://localhost:3000/api/usuarios', {
                    username: this.datos.username,
                    email: this.datos.email,
                    password: this.datos.password1,
                    fecha_nacimiento: this.datos.fechaNac,
                    nombre: this.datos.nombre,
                    apellidos: this.datos.apellidos,
                    direccion: this.datos.direccion
                }).then(() => {
                    this.$router.push('/login');
                }).catch((error) => {
                    alert(this.datos.username + ' registrado!')
                    console.log(error.message)
                })
            } else{
                console.log("Rellena todo anda")
            }
        }
    }
}
</script>