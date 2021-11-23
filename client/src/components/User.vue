<template>
<div>
    <h1>Soy el usuario {{ username }}</h1>
    <table>
        <thead>
            <th>Información usuario</th>
        </thead>
        <tbody>
            <tr>
                <th>Nombre</th>
                <td>{{nombre}}</td>
            </tr>
            <tr>
                <th>Apellidos</th>
                <td>{{apellidos}}</td>
            </tr>
            <tr>
                <th>Dirección</th>
                <td>{{direccion}}</td>
            </tr>
            <tr>
                <th>Email</th>
                <td>{{email}}</td>
            </tr>
            <tr>
                <th>Fecha de nacimiento</th>
                <td>{{fechaNac}}</td>
            </tr>
            <tr>
                <th>Id</th>
                <td>{{id}}</td>
            </tr>
        </tbody>
    </table> 
</div>
</template>

<script>

export default {
    name: 'User',
    data() {
        return {
            id: 1,
            username: 'realpascuuu',
            email: 'pjs8@alu.ua.es',
            nombre: 'Pascual',
            apellidos: 'Juan',
            direccion: 'calle esta',
            fechaNac: '09-04-1999'
        }
    }
}

</script>
