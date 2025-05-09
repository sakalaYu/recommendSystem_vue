import Vue from 'vue'
import Router from 'vue-router'
import '@/assets/css/reset.css'
import '@/assets/css/header.css'

Vue.use(Router)

import Shop from '@/views/shop'
import Item from '@/views/item'
import Cart from '@/views/cart'
import Checkout from '@/views/checkout'
import Payment from '@/views/payment'
import Account from '@/views/account'
import Order from '@/views/account/order'
import Address from '@/views/account/address'
import Upload from '@/views/upload'
import Chart from '@/views/chart.vue'
import Detail from '@/views/detail'

const router = new Router({
  mode: 'history',
  scrollBehavior(to, from, savePosition) {
    if (savePosition) {
      return savePosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      redirect: '/phone'
    },
    {
      path: '/phone',//首页
      name: 'Shop',
      component: Shop
    },
    {
      path: '/upload',// 文件上传
      name: 'upload',
      component: Upload,
      meta: { requiresRoot: false }
    },
    {
      path: '/chart',// 图表
      name: 'chart',
      component: Chart,
      meta: { requiresRoot: false }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/login'),
      meta: { requiresRoot: false } // 表示不需要显示根组件
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/login/register'),
      meta: { requiresRoot: false } // 表示不需要显示根组件
    },
    {
      path: '/listOne',
      name: 'listOne',
      component: () => import('../views/list/listOne'),
    },
    {
      path: '/listTwo',
      name: 'listTwo',
      component: () => import('../views/list/listTwo'),
    },
    {
      path: '/listThree',
      name: 'listThree',
      component: () => import('../views/list/listThree'),
    },
    {
      path: '/listFour',
      name: 'listFour',
      component: () => import('../views/list/listFour'),
    },
    {
      path: '/listFive',
      name: 'listFive',
      component: () => import('../views/list/listFive'),
    },
    {
      path: '/listSix',
      name: 'listSix',
      component: () => import('../views/list/listSix'),
    },
    {
      path: '/listSeven',
      name: 'listSeven',
      component: () => import('../views/list/listSeven'),
    },
    {
      path: '/listEight',
      name: 'listEight',
      component: () => import('../views/list/listEight'),
    },
    {
      path: '/item',//商品详情,但啥也没有
      name: 'Item',
      component: Item
    },
    {
      path: '/cart',//购物车
      name: 'Cart',
      component: Cart
    },
    {
      path: '/checkout',//收获信息、发票信息核对
      name: 'Checkout',
      component: Checkout
    },
    // {
    //   path: '/payment',
    //   name: 'Payment',
    //   component: Payment
    // },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail,
      meta: { requiresRoot: false }
    },
    {
      path: '/account',
      component: Account,
      meta: { requiresRoot: false },
      children: [
        {
          path: '',
          name: 'Account',
          component: Order,
          meta: { requiresRoot: false }
        },
        {
          path: '/address',
          name: 'Address',
          component: Address,
          meta: { requiresRoot: false }
        }
      ]
    }
  ]
});
router.beforeEach((to, from, next) => {
  let token = window.sessionStorage.getItem("token");
  const redirectPath = window.sessionStorage.getItem("redirectPath"); // 获取重定向路径
  console.log("token:" + token);
  console.log("to.path:" + to.path);
  const whiteList = ['/login', '/', '/phone', '/register']
  if (token) {
    if (to.path === "/login"&&!redirectPath) {//如果是登录请求
      next('/');
    } else {
      next(); //放行
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next('/login') //跳转到登录页面
    }
  }
});
export default router;

