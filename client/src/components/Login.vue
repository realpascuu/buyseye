<template>
<div class="box">
    <img src="../assets/logoletra.png">
    <h3>Inicio sesión</h3>
    <div>
        <input type="text" placeholder="Nombre de usuario">
    </div>
    <div>
        <input type="password" placeholder="Contraseña">
    </div>
    <button>Entrar</button>
    <div>
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
img {
    height: 200px;
} 

</style>