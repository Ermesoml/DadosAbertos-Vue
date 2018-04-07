<template>
  <b-container fluid>
    <div class="detalhes-dep" v-if="proposicao.id!=undefined">
      <h1>{{proposicao.ementa}}</h1>
      <p>
      </p>
    </div>
  </b-container>
</template>

<script>
  export default {
    name: 'detalhes-proposicao',
    data () {
      return {
        api: 'https://dadosabertos.camara.leg.br/api/v2/proposicoes/',
        proposicao: {}
      }
    },
    computed: {
    },
    mounted: function () {
      this.buscarProposicao()
    },
    methods: {
      buscarProposicao: function () {
        this.$http.get(this.api + this.$route.params.id).then((response) => {
          this.proposicao = response.data.dados
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
