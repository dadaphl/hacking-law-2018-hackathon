import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/screens/index/index.vue'
import NewDocument from '@/screens/new/new.vue'
import ViewDocument from '@/screens/view/view.vue'

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
    },
    {
      path: '/view/:id',
      name: 'ViewDocument',
      component: ViewDocument
    }
  ]
})
