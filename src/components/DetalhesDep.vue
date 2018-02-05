<template>
  <b-container fluid>
    <div class="detalhes-dep" v-if="deputado.ultimoStatus!=undefined">
      <!-- <h1>{{$route.params.id}}</h1> -->
      <b-img :src="deputado.ultimoStatus.urlFoto"></b-img>
      <h1>{{deputado.nomeCivil}}</h1>
    </div>
  </b-container>
</template>

<script>
  import CardDep from './CardDep.vue'

  export default {
    name: 'detalhes-dep',
    data () {
      return {
        api: 'https://dadosabertos.camara.leg.br/api/v2/deputados/',
        deputado: {}
      }
    },
    mounted: function () {
      this.buscarDeputado()
    },
    methods: {
      buscarDeputado: function () {
        this.$http.get(this.api + this.$route.params.id).then((response) => {
          this.deputado = response.data.dados
        })
      }
    },
    components: {
      CardDep
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
