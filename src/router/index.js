import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Deputados'
import DetalhesDep from '@/components/DetalhesDep'
import DetalhesProposicao from '@/components/DetalhesProposicao'
import RelatorioCamara from '@/components/Camara/RelatorioCamara'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/deputado/:id',
      name: 'DetalhesDep',
      component: DetalhesDep
    },
    {
      path: '/proposicao/:id',
      name: 'DetalhesProposicao',
      component: DetalhesProposicao
    },
    {
      path: '/camara',
      name: 'RelatorioCamara',
      component: RelatorioCamara
    }
  ]
})
