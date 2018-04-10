import Vue from 'vue'
import Router from 'vue-router'
import indexs from '@/components/indexs/indexs'
import tryOut from '@/components/tryOut/tryOut'
import recommend from '@/components/recommend/recommend'
import index_comment from '@/components/index_comment/index_comment'
import index_hotProducts from '@/components/index_hotProducts/index_hotProducts'
import index_activity from '@/components/index_activity/index_activity'
import productDetails from '@/components/productDetails/productDetails'
import productDetails_list from '@/components/productDetails_list/productDetails_list'
import productDetails_text from '@/components/productDetails_text/productDetails_text'
import productDetails_activity from '@/components/productDetails_activity/productDetails_activity'
import commentDetails from '@/components/commentDetails/commentDetails'
import tryoutDetails from '@/components/tryoutDetails/tryoutDetails'
import searchIpt from '@/components/searchIpt/searchIpt'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'indexs/comment'
    }, {
    	path: '/indexs',
    	name: 'indexs',
    	component: indexs,
    	children: [
    		{
    			path: 'comment',
    			component: index_comment
    		}, {
    			path: 'hotProducts',
    			component: index_hotProducts
    		}, {
    			path: 'activity',
    			component: index_activity
    		}
    	]
    }, {
    	path: '/tryOut',
    	name: 'tryOut',
    	component: tryOut
    }, {
    	path: '/recommend',
    	name: 'recommend',
    	component: recommend
    }, {
    	path: '/productDetails',
    	name: 'productDetails',
    	component: productDetails,
    	children: [
    		{
    			path: 'comment',
    			component: productDetails_list
    		}, {
    			path: 'text',
    			component: productDetails_text
    		}, {
    			path: 'activity',
    			component: productDetails_activity
    		}
    	]
    }, {
    	path: '/commentDetails',
    	name: 'commentDetails',
    	component: commentDetails
    }, {
    	path: '/tryoutDetails',
    	name: 'tryoutDetails',
    	component: tryoutDetails
    }, {
    	path: '/search',
    	name: 'searchIpt',
    	component: searchIpt
    }
  ]
})
