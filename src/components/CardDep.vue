<template>
  <b-col md="2" sm="12">
    <b-card tag="article" class="mb-2">
      <b-card-img :src="foto" alt="Image" :top=true></b-card-img>
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
