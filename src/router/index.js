import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '@/components/authentication/register'
import Login from '@/components/authentication/login'
import Home from '@/components/Home'
import NewPost from '@/components/post/newPost'
import Post from '@/components/post/readPost'
import ListPost from '@/components/post/listPost'
import FavoritesPosts from '@/components/post/favoritesPosts'
import AlcoCalc from '@/components/alcoCalc/alcoCalc'

Vue.use(VueRouter)

export default new VueRouter ({
	routes: [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/newpost',
    name: 'newPost',
    component: NewPost
  },
  {
    path: '/post/:id',
    props: true,
    component: Post
  },
  {
    path: '/list',
    props: true,
    component: ListPost
  },
  {
    path: '/favorites',
    name: 'favoritesPosts',
    component: FavoritesPosts
  },
  {
    path: '/calc',
    name: 'alcoCalc',
    component: AlcoCalc
  }
	],
	mode: 'history'
})