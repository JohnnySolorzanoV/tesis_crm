<script setup>

</script>

<template>
  <div class= "logoCRM container text-center">
    <h1>EXPERTA&ABOGADOS</h1>
    <h7>Firma legal con especialistas en cada área jurídica</h7>
  </div>
  <div class="container text center">
    <div class="row">
        <RouterLink type="button" class="btn btn-primary"to="/loginPerfil"> Iniciar sesión </RouterLink>
        <RouterLink type="button" class="btn btn-secondary" to="/crearPerfil"> Registrarse </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.logoCRM {
  margin-top: 50px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn {
  width: 150px;
  margin: 10px;
}
.row {
  display: flex;
  justify-content: center;
}
</style>