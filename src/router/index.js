import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import BooksModule from '@/components/BooksModule'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },

    {
      path: '/books',
      redirect: '/books/list/all'
    },

    {
      path: '/books/:action/:id',
      name: 'books',
      component: BooksModule,
      props: true
    }

  ]
})
