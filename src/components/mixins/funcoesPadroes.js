export default {
  name: 'funcoesPadroes',
  methods: {
    formatarValor: function (valor, quant_casas_decimais = 2) {
      var formatter = new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: quant_casas_decimais,
        maximumFractionDigits: quant_casas_decimais
      })
      return formatter.format(valor)
    },
    getMesAnalitico: function (mes) {
      switch (mes) {
        case 1:
          return 'Janeiro'
        case 2:
          return 'Fevereiro'
        case 3:
          return 'Março'
        case 4:
          return 'Abril'
        case 5:
          return 'Maio'
        case 6:
          return 'Junho'
        case 7:
          return 'Julho'
        case 8:
          return 'Agosto'
        case 9:
          return 'Setembro'
        case 10:
          return 'Outubro'
        case 11:
          return 'Novembro'
        case 12:
          return 'Dezembro'
        default:
          return 'Não definido'
      }
    }
  }
}
