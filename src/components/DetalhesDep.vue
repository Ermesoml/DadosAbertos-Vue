<template>
  <b-container fluid>
    <div class="detalhes-dep" v-if="deputado.ultimoStatus!=undefined">
      <!-- <h1>{{$route.params.id}}</h1> -->
      <b-img rounded="circle" :src="deputado.ultimoStatus.urlFoto"></b-img>
      <h1>{{deputado.nomeCivil}}</h1>
      <p>
        Partido: {{deputado.ultimoStatus.siglaPartido}}<br>
        Município de nascimento: {{deputado.municipioNascimento}}<br>
        UF de nascimento: {{deputado.ufNascimento}} <br>
        Escolaridade: {{deputado.escolaridade}} <br>
        Email: {{deputado.ultimoStatus.gabinete.email}} <br>
        Condição eleitoral: {{deputado.ultimoStatus.condicaoEleitoral}} <br>
        Total gasto em {{ano_pesquisa}}: <strong>R${{totalGastoAno}}</strong> <br>
        Total gasto filtrado: <strong>R${{totalGastoFiltrado}}</strong> <br>
      </p>
    </div>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Despesas" active>
          <b-row>
            <line-chart :data="dadosGraficos"></line-chart>
          </b-row>
          <b-row class="mb-3">
            <b-col cols="12">
               <b-form-select v-model="ano_pesquisa" :options="options" class="mb-3" @input="buscarDespesas" />
            </b-col>
            <b-col cols="12">
               <b-form-input v-model="filtro" type="text" placeholder="Pesquise nas despesas..." class="mb-3"></b-form-input>
            </b-col>
            <b-col cols="12">
              <b-table @filtered="onFiltered" :filter="filtro" :per-page="itensPorPagina" :current-page="paginaAtual" responsive bordered striped hover :fields="fields" :items="despesas">
                <template slot="mes" slot-scope="data">
                  ({{data.item.mes}}) {{getMesAnalitico(data.item.mes)}}                  
                </template> 

              </b-table>
            </b-col>
            <b-col cols="12">
              <b-pagination align="center" :total-rows="linhasTotais" :per-page="itensPorPagina" v-model="paginaAtual" class="my-0" />
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Proposições (propostas de leis)" >
          <b-row>
            <b-col cols="12">
              <b-table @click="alert('ok')" :per-page="itensPorPagina" :current-page="paginaAtualProposicoes" responsive bordered striped hover :fields="fieldsProposicoes" :items="proposicoes">
                <template slot="mostrarDetalhes" slot-scope="data">
                  <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
                  <b-button :to="'/proposicao/' + data.item.id" variant="primary">Ver detalhes</b-button>
                </template>
              </b-table>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-card>
  </b-container>
</template>

<script>
  import CardDep from './CardDep.vue'
  import funcoesPadroes from './mixins/funcoesPadroes'

  export default {
    name: 'detalhes-dep',
    mixins: [funcoesPadroes],
    data () {
      return {
        api: 'https://dadosabertos.camara.leg.br/api/v2/deputados/',
        deputado: {},
        despesas: [],
        despesas_filtradas: [],
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
            label: 'Total líquido'
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
        fieldsProposicoes: {
          id: {
            key: 'id',
            label: 'ID'
          },
          ano: {
            key: 'ano',
            label: 'Ano'
          },
          ementa: {
            key: 'ementa',
            label: 'Ementa'
          },
          mostrarDetalhes: {
            label: 'Ementa'
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
        linhasTotais: 0,
        filtro: '',

        proposicoes: [],
        linhasTotaisProposicoes: 0,
        paginaAtualProposicoes: 1
      }
    },
    computed: {
      totalGastoFiltrado: function () {
        let total = 0
        for (let i = 0; i < this.despesas_filtradas.length; i++) {
          total += parseFloat(this.despesas_filtradas[i].valorLiquido)
        }
        return this.formatarValor(total)
      },
      totalGastoAno: function () {
        let total = 0
        for (let i = 0; i < this.despesas.length; i++) {
          total += parseFloat(this.despesas[i].valorLiquido)
        }
        return this.formatarValor(total)
      },
      dadosGraficos: function () {
        var dadosGrafico = []
        var dado = {}
        var mes = 0
        var valorTotal = 0
        dado.data = []
        dado.name = 'Despesas'
        for (let i = 0; i < this.despesas_filtradas.length; i++) {
          if (this.despesas_filtradas[i].mes > mes || this.despesas_filtradas.length === (i + 1) || (this.despesas_filtradas[i].mes < mes && mes > 0)) {
            if (mes === 0) {
              valorTotal += parseFloat(this.despesas_filtradas[i].valorLiquido)
              mes = this.despesas_filtradas[i].mes
            } else if (this.despesas_filtradas.length === (i + 1)) {
              valorTotal += parseFloat(this.despesas_filtradas[i].valorLiquido)

              let values = []
              values.push(this.getMesAnalitico(mes))
              values.push(valorTotal)

              dado.data.unshift(values)
              mes = this.despesas_filtradas[i].mes
              valorTotal = 0
            } else {
              let values = []
              values.push(this.getMesAnalitico(mes))
              values.push(valorTotal)

              dado.data.unshift(values)
              mes = this.despesas_filtradas[i].mes
              valorTotal = 0
              valorTotal += parseFloat(this.despesas_filtradas[i].valorLiquido)
            }
          } else {
            valorTotal += parseFloat(this.despesas_filtradas[i].valorLiquido)
          }
        }
        dadosGrafico.push(dado)

        return dadosGrafico
      }
    },
    mounted: function () {
      let d = new Date()
      this.ano_pesquisa = d.getFullYear()
      this.buscarDeputado()
      this.buscarDespesas()
      this.buscarProposicoes()
    },
    methods: {
      buscarDeputado: function () {
        this.$http.get(this.api + this.$route.params.id).then((response) => {
          this.deputado = response.data.dados
        })
      },
      buscarDespesas: function () {
        this.despesas = []
        this.despesas_filtradas = []
        this.$http.get('https://dadosabertos.camara.leg.br/api/v2/deputados/' + this.$route.params.id + '/despesas' + '?ano=' + this.ano_pesquisa + '&itens=100&ordem=desc&ordenarPor=mes').then((response) => {
          this.despesas = response.data.dados
          this.despesas_filtradas = response.data.dados
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
          this.despesas_filtradas = this.despesas_filtradas.concat(response.data.dados)
          this.linhasTotais = this.despesas.length
          for (let i = 0; i < response.data.links.length; i++) {
            if (response.data.links[i].rel === 'next') {
              this.buscarDespesasURL(response.data.links[i].href)
            }
          }
        })
      },
      buscarProposicoes: function () {
        this.proposicoes = []
        this.$http.get('https://dadosabertos.camara.leg.br/api/v2/proposicoes?idAutor=' + this.$route.params.id).then((response) => {
          this.proposicoes = response.data.dados
          this.linhasTotaisProposicoes = this.proposicoes.length
          for (let i = 0; i < response.data.links.length; i++) {
            if (response.data.links[i].rel === 'next') {
              this.buscarProposicoesURL(response.data.links[i].href)
            }
          }
        })
      },
      buscarProposicoesURL: function (url) {
        this.$http.get(url).then((response) => {
          this.proposicoes = this.proposicoes.concat(response.data.dados)
          this.linhasTotaisProposicoes = this.proposicoes.length
          for (let i = 0; i < response.data.links.length; i++) {
            if (response.data.links[i].rel === 'next') {
              this.buscarProposicoesURL(response.data.links[i].href)
            }
          }
        })
      },
      onFiltered: function (filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.linhasTotais = filteredItems.length
        this.paginaAtual = 1
        this.despesas_filtradas = filteredItems
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
