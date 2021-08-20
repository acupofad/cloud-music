import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store'

import Home from '../views/home'
import FindMusic from '../views/find-music'
import Video from '../views/video'
import Collect from '../views/collect'
import Recommand from '../views/recommand'
import MusicDetail from '../views/find-music/personal-recommand/musicdetail'
import MvsDetail from '../views/video/mvs/mvs-details'

import PersonalRecommand from '../views/find-music/personal-recommand'
import Playlist from '../views/find-music/playlist'
import Rank from '../views/find-music/rank'
import Singers from '../views/find-music/singers'

import Videos from '../views/video/videos'
import MVs from '../views/video/mvs'

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/find-music',
    component: Home,
    children: [{
      path: '/video',
      redirect: '/video/videos',
      component: Video,
      children: [{
        path: '/video/videos',
        component: Videos,
      }, {
        path: '/video/mvs',
        component: MVs,
      }]
    }, {
      path: '/collect',
      component: Collect
    }, {
      path: '/recommand',
      component: Recommand
    }, {
      path: '/find-music',
      redirect: '/find-music/personal-recommand',
      component: FindMusic,
      children: [{
        path: '/find-music/personal-recommand',
        component: PersonalRecommand,
      }, {
        path: '/find-music/playlist',
        component: Playlist,
      }, {
        path: '/find-music/rank',
        component: Rank,
      }, {
        path: '/find-music/singers',
        component: Singers,
      }]
    }, {
      path: '/musicdetail',
      component: MusicDetail,
    },{
      path: '/mvs-details',
      component: MvsDetail,
    }]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// router.beforeEach((to, from, next) => {
//   if (to.path === '/find-music/personal-recommand') return next()
//   if (!store.state.user) return 
//   next()
// })

export default router
