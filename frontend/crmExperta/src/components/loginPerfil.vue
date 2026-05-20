<script setup>

</script>
//debo hacerlo funcionar con el boton de Inicio de sesion de Inicio CRM
<template>
  <div class="input-group mb-3">
    <span class="input-group-text" id="basic-addon1">✉️</span>
    <input type="email" class="form-control" placeholder="Correo electrónico" aria-label="correoElectronico" aria-describedby="basic-addon1">
  </div>
  <div class="input-group mb-3">
    <span class="input-group-text" id="basic-addon1">🕶️</span>
    <input type="password" class="form-control" placeholder="Contraseña" aria-label="contrasena" aria-describedby="basic-addon1">
  </div>
  <div>
    <RouterLink to="/inicioCRM"> Inicio CRM </RouterLink>
    <RouterLink to="/recuperarContrasena"> Recuperar contraseña </RouterLink>
  </div>
  </template>