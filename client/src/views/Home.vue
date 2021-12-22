<template>
  <div class="home">
    <Header :nombre="this.nombre"></Header>
    <div class="container">
    <div class="d-flex justify-content-center p-4">
      <div class="">
        <div class="group-card d-lg-flex text-center">
          <router-link to="/usuarios" class="btn">
            <div class="card p-5 btn mx-5 my-5 boton-usuarios">
              Usuarios
            </div>
          </router-link>
          <router-link to="/productos" class="btn">
            <div class="card p-5 btn mx-5 my-5 boton-productos">
              Productos        
            </div>
          </router-link>
        </div>
      </div>
    </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import jwt_decode from 'jwt-decode'
import Footer from '../components/Footer.vue'
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    Header,
    Footer
    
  },
  data() {
    return {
      nombre: jwt_decode(localStorage.getItem('token')).sub
    }
  }
}
</script>
<style>
.boton-usuarios {
  background-color: darkcyan;
  border: 5px solid darkcyan;
}

.boton-usuarios:hover {
  background-color: white;
}

.boton-productos {
  background-color: rgb(227, 114, 15);
  border: 5px solid rgb(227, 114, 15);
}

.boton-productos:hover {
  background-color: white;
}
</style>