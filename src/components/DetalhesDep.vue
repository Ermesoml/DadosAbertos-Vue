<template>
  <b-container fluid>
    <div class="detalhes-dep" v-if="deputado.ultimoStatus!=undefined">
      <!-- <h1>{{$route.params.id}}</h1> -->
      <b-img :src="deputado.ultimoStatus.urlFoto"></b-img>
      <h1>{{deputado.nomeCivil}}</h1>
      <p>
        Partido: {{deputado.ultimoStatus.siglaPartido}}<br>
        Município de nascimento: {{deputado.municipioNascimento}}<br>
        UF de nascimento: {{deputado.ufNascimento}} <br>
        Escolaridade: {{deputado.escolaridade}} <br>
        Email: {{deputado.ultimoStatus.gabinete.email}} <br>
        Condição eleitoral: {{deputado.ultimoStatus.condicaoEleitoral}} <br> 
      </p>
    </div>
    <b-row>
      <b-col cols="12">
         <b-form-select v-model="ano_pesquisa" :options="options" class="mb-3" @input="buscarDespesas" />
      </b-col>
      <b-col cols="12">
        <b-table :per-page="itensPorPagina" :current-page="paginaAtual" responsive bordered striped hover :fields="fields" :items="despesas"></b-table>
      </b-col>
      <b-col cols="12">
        <b-pagination align="center" :total-rows="linhasTotais" :per-page="itensPorPagina" v-model="paginaAtual" class="my-0" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import CardDep from './CardDep.vue'

  export default {
    name: 'detalhes-dep',
    data () {
      return {
        api: 'https://dadosabertos.camara.leg.br/api/v2/deputados/',
        deputado: {},
        despesas: [],
        ano_pesquisa: 0,
        fields: {
          ano: {
            key: 'ano',
            label: 'Ano'
          },
          mes: {
            key: 'mes',
            label: 'Mês'
          },
          tipoDespesa: {
            key: 'tipoDespesa',
            label: 'Tipo de despesa'
          },
          valorLiquido: {
            key: 'valorLiquido',
            label: 'Tipo de líquido'
          },
          dataDocumento: {
            key: 'dataDocumento',
            label: 'Data do documento'
          },
          nomeFornecedor: {
            key: 'nomeFornecedor',
            label: 'Fornecedor'
          }
        },
        options: [
          { value: 2018, text: '2018' },
          { value: 2017, text: '2017' },
          { value: 2016, text: '2016' },
          { value: 2015, text: '2015' }
        ],
        paginaAtual: 1,
        itensPorPagina: 20,
        linhasTotais: 0
      }
    },
    mounted: function () {
      let d = new Date()
      this.ano_pesquisa = d.getFullYear()
      this.buscarDeputado()
      this.buscarDespesas()
    },
    methods: {
      buscarDeputado: function () {
        this.$http.get(this.api + this.$route.params.id).then((response) => {
          this.deputado = response.data.dados
        })
      },
      buscarDespesas: function () {
        this.despesas = []
        this.$http.get('https://dadosabertos.camara.leg.br/api/v2/deputados/' + this.$route.params.id + '/despesas' + '?ano=' + this.ano_pesquisa + '&itens=100&ordem=desc&ordenarPor=numMes').then((response) => {
          this.despesas = response.data.dados
          this.linhasTotais = this.despesas.length
          for (let i = 0; i < response.data.links.length; i++) {
            if (response.data.links[i].rel === 'next') {
              this.buscarDespesasURL(response.data.links[i].href)
            }
          }
        })
      },
      buscarDespesasURL: function (url) {
        this.$http.get(url).then((response) => {
          this.despesas = this.despesas.concat(response.data.dados)
          this.linhasTotais = this.despesas.length
          for (let i = 0; i < response.data.links.length; i++) {
            if (response.data.links[i].rel === 'next') {
              this.buscarDespesasURL(response.data.links[i].href)
            }
          }
        })
      },
      formatarValor: function (valor, quant_casas_decimais = 2) {
        var formatter = new Intl.NumberFormat('pt-BR', {
          minimumFractionDigits: quant_casas_decimais,
          maximumFractionDigits: 2
        })
        return formatter.format(valor)
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
