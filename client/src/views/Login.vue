<template>
    <div class="container-fluid">
        <login></login>
        <Footer></Footer>
    </div>
</template>

<script>
import Login from '@/components/Login.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'LoginView',
  components: {
    Login,
    Footer
  }
}
</script>