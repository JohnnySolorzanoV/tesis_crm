<script setup>
import { RouterView, useRoute, RouterLink } from 'vue-router'
import imgCRM from './assets/logoExperta.png'
const route = useRoute()
</script>

// el p es solo para saber en que ventada me encuentro
<template>
  <p><strong>Ruta actual:</strong> {{ route.path }}</p>
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img :src="imgCRM" alt="Logo" width="30" height="30"
          class="d-inline-block align-text-top">
        EXPERTA&ABOGADOS
      </a>
    </div>
  </nav>
  <nav class="container">
    <RouterLink to="/frontendCRM"> Inicio </RouterLink>
    <RouterLink to="/inicioCRM"> Inicio CRM </RouterLink>
    <RouterLink to="/admin"> Admin </RouterLink>
    <RouterLink to="/loginPerfil"> Iniciar sesión </RouterLink>
    <RouterLink to="/crearPerfil"> Registrarse </RouterLink>
    <RouterLink to="/recuperarContrasena"> Recuperar contraseña </RouterLink>
  </nav>
  <main class="container">
    <RouterView />
  </main>
</template>
<style scoped>
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;

} 
</style>