import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Project from '../views/Project.vue'
import AddProject from '../views/AddProject.vue'
import DonateForm from '../views/DonateForm.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/project/:id/donate',
    name: 'DonateForm',
    component: DonateForm
  },
  {
    path: '/project/:id',
    name: 'Project',
    component: Project
  },
  {
    path: '/add-project',
    name: 'AddProject',
    component: AddProject
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
