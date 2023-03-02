import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Posts from '../views/postsAll/Posts.vue'
import EditPost from '../views/postsAll/EditPost.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  //posts
  {
    path: '/posts',
    name: 'posts',
    component: Posts
  },
  {
    path: '/posts/:id',
    name: 'EditPost',
    component: EditPost,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
