<template>
  <b-container fluid>
    <b-row v-if="deputados.length!=0">
      <b-col cols="12">
        <b-form-group id="nome" label="Nome do deputado" label-for="inputNome" description="Pesquie o deputado pelo nome">
          <b-form-input id="inputNome" type="text" v-model="filtroDeputados" placeholder="Tiririca"> </b-form-input>
        </b-form-group>
      </b-col>
      <card-dep v-for="deputado in deputadosFiltrados" :nome="deputado.nome" :foto="deputado.urlFoto" :numero="String(deputado.id)"></card-dep>
    </b-row>
  </b-container>
</template>

<script>
  import CardDep from './CardDep.vue'

  export default {
    name: 'lista-dep',
    data () {
      return {
        api: 'https://dadosabertos.camara.leg.br/api/v2/deputados?itens=99&ordenarPor=nome',
        deputados: [],
        filtroDeputados: ''
      }
    },
    mounted: function () {
      this.buscarDeputados()
    },
    computed: {
      deputadosFiltrados: function () {
        if (this.deputados.length === 0) return {}

        var filtro = this.filtroDeputados
        return this.deputados.filter(function (item) {
          return item.nome.match(filtro.toUpperCase())
        })
      }
    },
    methods: {
      buscarDeputados: function () {
        this.$http.get(this.api).then((response) => {
          this.deputados = response.data.dados

          for (let i = 0; i < response.data.links.length; i++) {
            if (response.data.links[i].rel === 'next') {
              this.buscarDeputadosUrl(response.data.links[i].href)
              break
            }
          }
        })
      },
      buscarDeputadosUrl: function (url) {
        this.$http.get(url).then((response) => {
          this.deputados = this.deputados.concat(response.data.dados)
          for (let i = 0; i < response.data.links.length; i++) {
            if (response.data.links[i].rel === 'next') {
              this.buscarDeputadosUrl(response.data.links[i].href)
              break
            }
          }
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
