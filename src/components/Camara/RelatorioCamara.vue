<template>
  <b-container fluid>
    <b-row>
      <b-col lg="10">
        <b-form-select v-model="ano_pesquisa" :options="options" class="mb-3" @input="buscarDespesas" />
      </b-col>
      <b-col lg="2">
        <b-button block variant="info" @click="buscarDeputados">Processar</b-button>
      </b-col>
      <b-col lg="12" v-if="!processandoDeputados">
        <b-alert show>{{totalDespesas}}</b-alert>
      </b-col>
      <b-col cols="12" v-if="processandoDeputados">
        <div id="fountainG">
          <div id="fountainG_1" class="fountainG"></div>
          <div id="fountainG_2" class="fountainG"></div>
          <div id="fountainG_3" class="fountainG"></div>
          <div id="fountainG_4" class="fountainG"></div>
          <div id="fountainG_5" class="fountainG"></div>
          <div id="fountainG_6" class="fountainG"></div>
          <div id="fountainG_7" class="fountainG"></div>
          <div id="fountainG_8" class="fountainG"></div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import CardDep from '../CardDep.vue'

  export default {
    name: 'lista-dep',
    data () {
      return {
        api: 'https://dadosabertos.camara.leg.br/api/v2/deputados?itens=99&ordenarPor=nome',
        deputados: [],
        despesas: [],
        filtroDeputados: '',
        processandoDeputados: false,
        ano_pesquisa: 2018,
        options: [
          { value: 2018, text: '2018' },
          { value: 2017, text: '2017' },
          { value: 2016, text: '2016' },
          { value: 2015, text: '2015' }
        ]
      }
    },
    computed: {
      deputadosFiltrados: function () {
        if (this.deputados.length === 0) return {}

        var filtro = this.filtroDeputados
        return this.deputados.filter(function (item) {
          return item.nome.match(filtro.toUpperCase())
        })
      },
      totalDespesas: function () {
        var total = 0
        for (var i = this.despesas.length - 1; i >= 0; i--) {
          total += parseFloat(this.despesas[i].valorLiquido)
        }
        return total
      }
    },
    methods: {
      buscarTodasDespesas: function () {
        for (var i = this.deputados.length - 1; i >= 0; i--) {
          this.buscarDespesas(this.deputados[i].id)
        }
      },
      buscarDespesas: function (deputadoId) {
        this.$http.get('https://dadosabertos.camara.leg.br/api/v2/deputados/' + deputadoId + '/despesas' + '?ano=' + this.ano_pesquisa + '&itens=100&ordem=desc&ordenarPor=numMes').then((response) => {
          this.despesas = this.despesas.concat(response.data.dados)
          for (let i = 0; i < response.data.links.length; i++) {
            if (response.data.links[i].rel === 'next') {
              this.buscarDespesasURL(response.data.links[i].href)
            } else {
              this.processandoDeputados = false
            }
          }
        })
      },
      buscarDespesasURL: function (url) {
        this.$http.get(url + '&ordenarPor=numMes').then((response) => {
          this.despesas = this.despesas.concat(response.data.dados)
          for (let i = 0; i < response.data.links.length; i++) {
            if (response.data.links[i].rel === 'next') {
              this.buscarDespesasURL(response.data.links[i].href)
            } else {
              this.processandoDeputados = false
            }
          }
        })
      },
      buscarDeputados: function () {
        this.processandoDeputados = true
        this.despesas = []
        this.deputados = []

        this.$http.get(this.api).then((response) => {
          this.deputados = response.data.dados

          for (let i = 0; i < response.data.links.length; i++) {
            if (response.data.links[i].rel === 'next') {
              this.buscarDeputadosUrl(response.data.links[i].href)
              break
            } else {
              this.buscarTodasDespesas()
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
            } else {
              this.buscarTodasDespesas()
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
  #fountainG{
    position:relative;
    width:234px;
    height:28px;
    margin:auto;
  }

  .fountainG{
    position:absolute;
    top:0;
    background-color:rgb(0,0,0);
    width:28px;
    height:28px;
    animation-name:bounce_fountainG;
      -o-animation-name:bounce_fountainG;
      -ms-animation-name:bounce_fountainG;
      -webkit-animation-name:bounce_fountainG;
      -moz-animation-name:bounce_fountainG;
    animation-duration:1.5s;
      -o-animation-duration:1.5s;
      -ms-animation-duration:1.5s;
      -webkit-animation-duration:1.5s;
      -moz-animation-duration:1.5s;
    animation-iteration-count:infinite;
      -o-animation-iteration-count:infinite;
      -ms-animation-iteration-count:infinite;
      -webkit-animation-iteration-count:infinite;
      -moz-animation-iteration-count:infinite;
    animation-direction:normal;
      -o-animation-direction:normal;
      -ms-animation-direction:normal;
      -webkit-animation-direction:normal;
      -moz-animation-direction:normal;
    transform:scale(.3);
      -o-transform:scale(.3);
      -ms-transform:scale(.3);
      -webkit-transform:scale(.3);
      -moz-transform:scale(.3);
    border-radius:19px;
      -o-border-radius:19px;
      -ms-border-radius:19px;
      -webkit-border-radius:19px;
      -moz-border-radius:19px;
  }

  #fountainG_1{
    left:0;
    animation-delay:0.6s;
      -o-animation-delay:0.6s;
      -ms-animation-delay:0.6s;
      -webkit-animation-delay:0.6s;
      -moz-animation-delay:0.6s;
  }

  #fountainG_2{
    left:29px;
    animation-delay:0.75s;
      -o-animation-delay:0.75s;
      -ms-animation-delay:0.75s;
      -webkit-animation-delay:0.75s;
      -moz-animation-delay:0.75s;
  }

  #fountainG_3{
    left:58px;
    animation-delay:0.9s;
      -o-animation-delay:0.9s;
      -ms-animation-delay:0.9s;
      -webkit-animation-delay:0.9s;
      -moz-animation-delay:0.9s;
  }

  #fountainG_4{
    left:88px;
    animation-delay:1.05s;
      -o-animation-delay:1.05s;
      -ms-animation-delay:1.05s;
      -webkit-animation-delay:1.05s;
      -moz-animation-delay:1.05s;
  }

  #fountainG_5{
    left:117px;
    animation-delay:1.2s;
      -o-animation-delay:1.2s;
      -ms-animation-delay:1.2s;
      -webkit-animation-delay:1.2s;
      -moz-animation-delay:1.2s;
  }

  #fountainG_6{
    left:146px;
    animation-delay:1.35s;
      -o-animation-delay:1.35s;
      -ms-animation-delay:1.35s;
      -webkit-animation-delay:1.35s;
      -moz-animation-delay:1.35s;
  }

  #fountainG_7{
    left:175px;
    animation-delay:1.5s;
      -o-animation-delay:1.5s;
      -ms-animation-delay:1.5s;
      -webkit-animation-delay:1.5s;
      -moz-animation-delay:1.5s;
  }

  #fountainG_8{
    left:205px;
    animation-delay:1.64s;
      -o-animation-delay:1.64s;
      -ms-animation-delay:1.64s;
      -webkit-animation-delay:1.64s;
      -moz-animation-delay:1.64s;
  }



  @keyframes bounce_fountainG{
    0%{
    transform:scale(1);
      background-color:rgb(0,0,0);
    }

    100%{
    transform:scale(.3);
      background-color:rgb(255,255,255);
    }
  }

  @-o-keyframes bounce_fountainG{
    0%{
    -o-transform:scale(1);
      background-color:rgb(0,0,0);
    }

    100%{
    -o-transform:scale(.3);
      background-color:rgb(255,255,255);
    }
  }

  @-ms-keyframes bounce_fountainG{
    0%{
    -ms-transform:scale(1);
      background-color:rgb(0,0,0);
    }

    100%{
    -ms-transform:scale(.3);
      background-color:rgb(255,255,255);
    }
  }

  @-webkit-keyframes bounce_fountainG{
    0%{
    -webkit-transform:scale(1);
      background-color:rgb(0,0,0);
    }

    100%{
    -webkit-transform:scale(.3);
      background-color:rgb(255,255,255);
    }
  }

  @-moz-keyframes bounce_fountainG{
    0%{
    -moz-transform:scale(1);
      background-color:rgb(0,0,0);
    }

    100%{
    -moz-transform:scale(.3);
      background-color:rgb(255,255,255);
    }
  }
</style>
