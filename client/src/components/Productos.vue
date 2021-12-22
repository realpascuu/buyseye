<template>
<div>
    <Header :nombre=this.nombre></Header>
    <div class="d-flex justify-content-center p-3">
        <h2>Productos</h2>
    </div>
     <div class="d-flex justify-content-center p-3">
        <router-link class="btn btn-success" to="/nuevoProducto">Nuevo Producto</router-link>
    </div>
    <div class="d-flex justify-content-center p-3">
        <div>
            <producto-lista @click="borrarProducto" v-for="product in productos" :key="product.id" :producto="product"></producto-lista>
        </div>
    </div>
    <Footer></Footer>
</div>
</template>
<script>
import jwt_decode from 'jwt-decode'
import Header from './Header.vue'
import axios from 'axios'
import ProductoLista from './ProductoLista.vue'
import Footer from './Footer.vue'

export default {
    components: { 
        Header,
        ProductoLista,
        Footer 
    },
    name: 'ProductosComponent',
    props: ['name'],
    methods: {
        async obtenerProductos() {
            return axios.get('http://localhost:3000/api/productos').then((resp) => {
                return resp.data
            }).catch((error) => {
                console.log('error con la api: ', error)
                return []
            });
        }, borrarProducto(id) {
            console.log('holi')
            this.productos = this.productos.filter((element) => element.id != id);
        }
    },
    data() {
        return {
            nombre: jwt_decode(localStorage.getItem('token')).sub,
            productos: []
        }
    },
    mounted: async function() {
        this.productos = await this.obtenerProductos()
    }
}
</script>

<style>

</style>