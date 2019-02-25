import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import NewPost from '@/components/post/newPost'
import Post from '@/components/post/readPost'
import ListPost from '@/components/post/listPost'
import AlcoCalc from '@/components/alcoCalc/alcoCalc'

Vue.use(VueRouter)

export default new VueRouter ({
	routes: [
  {
    path: '',
    name: 'home',
    component: Home
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
    path: '/calc',
    name: 'alcoCalc',
    component: AlcoCalc
  }
    
	],
	mode: 'history'
})