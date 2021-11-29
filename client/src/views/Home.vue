<template>
  <div class="home">
    <user></user>
    <div>
      <p>Pagina de inicio</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import User from '@/components/User.vue'

export default {
  name: 'Home',
  components: {
    User
  }
}
</script>
