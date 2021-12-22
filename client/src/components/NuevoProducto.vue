<template>
    <div>
        <Header :nombre="this.user"></Header>
        <div class="d-flex justify-content-center p-5">
            <div class="shadow">
                <h3 class="text-center my-5">Nuevo producto</h3>
                <div class="mx-5">
                    <b-input v-model="nombre" class="my-3" placeholder="Nombre del producto"></b-input>
                    <b-textarea v-model="descripcion" class="my-3" placeholder="Descripción"></b-textarea>
                    <b-input v-model="precio" type="number" class="my-3" placeholder="Precio" min="0"></b-input>
                    <button @click="crearProducto()" class="d-block w-100 btn btn-dark my-5">Añadir producto</button>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
    
<script>
import Footer from './Footer.vue'
import Header from './Header.vue'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

export default {
  components: { Footer, Header },
    name: 'NuevoProductoComponent',
    methods: {
        crearProducto() {
            axios.post('http://localhost:3000/api/productos', {
                headers: {
                    'Authorization' : localStorage.getItem('token')
                },
                nombre: this.nombre,
                descripcion: this.descripcion,
                precio: this.precio,
                usuario: this.user
            }).then(() => {
                console.log('producto creado!')
                this.$router.push('/productos')
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    data() {
        return {
            user: jwt_decode(localStorage.getItem('token')).sub,
            nombre: '',
            descripcion: '',
            precio: '',
        }
    }
}
</script>