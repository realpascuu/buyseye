<template>
    <div class="card w-100">
        <div class="card-body d-flex">
            <div class="m-2">
                <b-icon-image class="foto"></b-icon-image>
            </div>
            <div class="px-5 py-3">
                <b>{{ producto.nombre }}</b>
                <div class="pt-3 text-muted descripcion">
                    {{ producto.descripcion }}
                </div>
                <div class="pt-3 text-muted descripcion">
                    {{ producto.usuario.nombre }}
                </div>
            </div>
            <div class="d-flex justify-content-end w-100">
                <div class="px-5 d-flex flex-wrap align-content-center precio font-weight-bold">
                    {{ producto.precio }} €
                </div>
                <div>
                    <b-icon-trash class="float-right boton-borrar" @click="borrarProducto()"></b-icon-trash>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ProductoLista',
    props: ['producto'],
    methods: {
        borrarProducto() {
            axios.delete('http://localhost:3000/api/productos/' + this.producto.id, {
                headers: {
                    'Authorization' : localStorage.getItem('token')
                }
            }).then(() => {
                console.log('producto borrado!')
                this.$emit("click", this.producto.id)
            }).catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>

<style>
.foto {
    height: 100px;
    width: 100px;
}
.descripcion {
    font-size: 14px;
}

.precio {
    font-size: 20px;
}
.boton-borrar {
    color: grey;   
}

.boton-borrar:hover {
    color: red;
    cursor: pointer;
}
</style>