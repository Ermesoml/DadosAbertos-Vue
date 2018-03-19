<template>
  <b-col md="2" sm="12">
    <b-card tag="article" class="mb-2">
      <b-img rounded="circle" :top="true" :src="foto" style="max-width: 120px" alt="img" class="m-1" />
      
      <p class="card-text">
        {{nome}}
      </p>
      <b-button :to="'/deputado/' + numero" variant="primary">Ver detalhes</b-button>
    </b-card>
  </b-col>
</template>

<script>
  export default {
    name: 'card-dep',
    props: {
      nome: String,
      numero: String,
      foto: String
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
