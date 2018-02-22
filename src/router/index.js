import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/screens/index/index.vue'
import NewDocument from '@/screens/new/new.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/new',
      name: 'NewDocument',
      component: NewDocument
    }
  ]
})
