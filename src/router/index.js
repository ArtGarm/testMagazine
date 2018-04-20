import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Catalog from '@/components/catalog'
import Cart from '@/components/cart'
import Single from '@/components/item'
import Form from '@/components/zakaz'
import ty from '@/components/ty'
import deliver from '@/components/deliver'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/catalog',
      name: 'Catalog',
      component: Catalog
    },
    {
      path: '/catalog/:id',
      name: 'Single',
      component: Single
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/form',
      name: 'Form',
      component: Form
    },
    {
      path: '/ty',
      name: 'Ty',
      component: ty
    },
    {
      path: '/deliver',
      name: 'Deliver',
      component: deliver
    }
    
  ]
})
