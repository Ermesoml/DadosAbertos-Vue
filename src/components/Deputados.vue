<template>
  <b-container fluid>
    <div class="hello">
      <h1>Deputados - Dados abertos</h1>
      <b-alert show>Todos os dados apresentados são disponibilizados pela câmara dos deputados.</b-alert>
      <lista-dep></lista-dep>
    </div>
  </b-container>
</template>

<script>
  import ListaDep from './ListaDep.vue'

  export default {
    name: 'hello',
    components: {
      ListaDep
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
