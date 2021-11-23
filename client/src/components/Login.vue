<template>
<div class="mt-2 container col-lg-3 col-sm-6 border border-secondary shadow">
    <div class="row">
        <img class="img-fluid" src="../assets/logoletra.png">
        <h3 align="center" class="text-secondary">Inicio sesión</h3>
    </div>
    <div class="row m-2">
        <i class="fas fa-exclamation-circle trailing"></i>
        <input required class="form-control" v-model="login" type="text" placeholder="Nombre de usuario">
    </div>
    <div class="row m-2">
        <input required class="form-control" v-model="password" type="password" placeholder="Contraseña">
    </div>
    <div class="row m-2">
        <button class="btn btn-dark">Entrar</button>
    </div>
    <div class="row m-2">
        <b>¿No tienes cuenta? <a href="">Regístarte aquí</a></b>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            login: '',
            password: ''
        }
    }
}
</script>

<style>

</style>