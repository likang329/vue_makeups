<template>
  <div class="hot-products">
  	<p class="text">{{brand_discription}}</p>
  	<v-product-list></v-product-list>
  	<infinite-loading @infinite="indexProductsData" ref="infiniteLoading">
			<span>
				暂无更多数据！
			</span>
	  </infinite-loading>
  </div>
</template>

<script>
	import { mapMutations } from 'vuex'
	import productList from '../productList/productList'
	import InfiniteLoading from 'vue-infinite-loading'

  export default {
    name: 'index_hotProducts',
    props: {
    	// 接收数据
    },
    data () {
      return {
        // 数据
        brand_discription: '',
        hotListData: [],
        pagesIndex: 1
      }
		},
		watch: {
			// 观察实例变化
		},
		computed: {
		  // 监听、事实计算
		},
		created () {
		  // 页面加载前执行
		},
		mounted () {
			// 页面加载后执行
		},
		methods: {
		  // 方法
		  indexProductsData ($state) {
		  	var _this = this
		  	this.$http.get(API_PROXY, {
		  		params: {
		  			rd: 1003,
		  			ie: this.pagesIndex
		  		}
		  	})
		  	.then((res) => {
		  		console.log(res, '首页热卖产品')
		  		_this.brand_discription = res.data.de.brand_discription
		  		if (res.data.de.products) {
		  			_this.hotListData = _this.hotListData.concat(res.data.de.products)
		  			_this.$store.commit("setProductList", _this.hotListData)
		  			_this.pagesIndex += 1
		  			$state.loaded()
		  			if (res.data.de.products.length < 10) {
		  				$state.complete()
		  			}
		  		} else {
		  			$state.complete()
		  		}
		  	})
		  	.catch((err) => {
		  		$state.complete()
		  		console.log(err, '首页热卖产品错误')
		  	})
		  }
		},
		directives: {
	  	// 自定义组件
	 	},
		components: {
		  // 注册组件
		  'v-product-list': productList,
		  InfiniteLoading
		}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.hot-products {
		.text {
			margin: 10px 15px 15px;
			padding: 12px 10px 16px;
			font-size: 13px;
			line-height: 18px;
			background-color: #f5f5f5;
			color: #333;
		}
	}
</style>