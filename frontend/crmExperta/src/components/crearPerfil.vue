<script setup>

</script>
//debo hacerlo funcionar con el boton de Inicio de sesion de Inicio CRM
<template>
  <div class="mb-3">
    <label for="basic-url" class="form-label">Coloque aqui sus nombres</label>
    <div class="input-group">
      <span class="input-group-text" id="basic-addon3">Nombres</span>
      <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4">
    </div>
  </div>
  <div class="mb-3">
    <label for="basic-url" class="form-label">Coloque aqui sus apellidos</label>
    <div class="input-group">
      <span class="input-group-text" id="basic-addon3">Apellidos</span>
      <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4">
    </div>
  </div>
  <div class="mb-3">
    <label for="basic-url" class="form-label">Coloque aqui su número de identificación</label>
    <div class="input-group">
      <span class="input-group-text" id="basic-addon3">Identificación</span>
      <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4">
    </div>
  </div>
<RouterLink to="/inicioCRM"> Inicio CRM </RouterLink>
</template>