import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Produto from '@/components/Produto'
import Categoria from "@/components/Categoria";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/produto',
      name: 'Produto',
      component: Produto
    },
    {
      path: '/categoria',
      name: 'Categoria',
      component: Categoria
    }
  ]
})
