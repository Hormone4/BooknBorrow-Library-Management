import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import BooksModule from '@/components/BooksModule'
import LibraryModule from '@/components/LibraryModule' // Import the LibraryModule component
import BorrowModule from '@/components/BorrowModule'
import RegisterModule from '@/components/RegisterModule'
import LoginModule from '@/components/LoginModule'
Vue.use(Router)

export default new Router({
  routes: [
    // Home Route
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },

    // Books Module Routes
    {
      path: '/books',
      redirect: '/books/list/all' // Redirect to the books list
    },
    {
      path: '/books/:action/:id',
      name: 'books',
      component: BooksModule,
      props: true
    },

    // Libraries Module Routes
    {
      path: '/libraries',
      redirect: '/libraries/list/all' // Redirect to the libraries list
    },
    {
      path: '/libraries/:action/:id',
      name: 'libraries',
      component: LibraryModule,
      props: true   // Pass the route parameters as props to the component
    },

    // Borrow Module Routes
    {
      path: '/borrow',
      redirect: '/borrow/list/all'
    },
    {
      path: '/borrow/:action/:id',
      name: 'borrow',
      component: BorrowModule,
      props: true
    },

    // Register Module Routes
    {
      path: '/register',
      name: 'register',
      component: RegisterModule
    },
    {
      path: '/login',
      name: 'login',
      component: LoginModule
    }
  ]
})
