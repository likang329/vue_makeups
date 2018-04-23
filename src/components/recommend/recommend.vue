<template>
  <div class="recommend">
  	<div class="tab-wrap-pd">
	  	<div class="tab-wrap">
	  		<ul class="tab-box">
	  			<li class="tab-item selected" @click="tabSelected(0)">
	  				<p>
	  					<span class="name">系列</span>
	  					<span class="triangle"></span>
	  				</p>
	  			</li>
	  			<li class="tab-item" v-for="(item, index) in classificationData.cates" :key="item.id" @click="tabSelected(item.id)">
	  				<p>
	  					<span class="name">{{item.name}}</span>
	  					<span class="triangle"></span>
	  				</p>
	  			</li>
	  		</ul>
	  	</div>
  	</div>
  	<div class="tab-content-wrap">
	  	<ul class="tab-content hide classificationOne">
				<li v-for="item in classificationData.series" @click.stop="tabClassification(item.seriesid)">{{item.name}}</li>
			</ul>
			<ul class="tab-content hide" v-for="(item, index) in classificationData.cates">
				<li v-for="n in item.l3" :key="n.id" @click.stop="tabClassification(n.id)">{{n.name}}</li>
			</ul>
  	</div>
  	<div class="product-list-wrap">
  		<v-product-list></v-product-list>
  		<infinite-loading @infinite="recommendObtain" ref="infiniteLoading">
		    <span>
	      	没有更多数据了
		    </span>
		  </infinite-loading>
  	</div>
  </div>
</template>

<script>
	import vuex from 'vuex'
	import productList from '../productList/productList'
	import InfiniteLoading from 'vue-infinite-loading'

  export default {
    name: 'recommend',
    props: {
    	// 接收数据
    },
    data () {
      return {
        // 数据
        recommendData: [],
        classificationData: {},
        seriesId: 0, // 分类或系列ID
        typeId: 1, // typrID 1分类，2系列
        currentPage: 1, // 分页
        showHide: ''
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
			this.recommendClassification()
//			this.recommendObtain()
		},
		methods: {
		  // 获取品牌产品列表数据
		  recommendObtain ($state) {
		  	var _this = this;
		  	this.$http.get('/api/commonwx/104?', {
		  		params: {
		  			rd: 1008,
		  			id: this.seriesId,
		  			type: this.typeId,
		  			ie: this.currentPage
		  		}
		  	})
		  	.then((res) => {
		  		console.log(res, '品牌产品列表')
		  		if (res.data.de.res.length) {
		  			_this.recommendData = _this.recommendData.concat(res.data.de.res)
		  			_this.$store.commit("setProductList", _this.recommendData)
		  			console.log(this.seriesId,'获取')
		  			this.currentPage += 1
		  			$state.loaded()
		  		} else {
		  			$state.complete()
		  		}
		  	})
		  	.catch((err) => {
		  		$state.complete()
		  		console.log(err, '品牌产品列表失败')
		  	})
		  },
		  // 获取品牌tab选择数据
		  recommendClassification () {
		  	var _this = this
		  	this.$http.get('/api/commonwx/104?', {
		  		params: {
		  			rd: 1007
		  		}
		  	})
		  	.then((res) => {
		  		console.log(res.data.de, '品牌产品tab')
		  		this.classificationData = res.data.de
		  	})
		  	.catch((err) => {
		  		console.log(err, '品牌产品tab失败')
		  	})
		  },
		  // 一级tab筛选
		  tabSelected (e) {

		  	$(event.currentTarget).addClass('selected').siblings().removeClass('selected')
		  	var index = $(event.currentTarget).index()

		  	if (this.showHide === e) {
		  		$('.tab-content-wrap .tab-content').eq(index).toggle()
		  		return
		  	} else {
		  		$('.tab-content-wrap .tab-content').eq(index).show().siblings().hide()
		  		this.showHide = e
		  	}

		  	if (e === 0) {
		  		this.typeId = 2
		  	} else {
		  		this.typeId = 1
		  	}

		  	this.seriesId = e

		  	this.initialization()
		  	this.$nextTick(() => {
	        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
	      })
		  },
		  // 二级tab筛选
		  tabClassification (e) {
		  	if (this.seriesId == e) {
		  		return
		  	}

		  	this.seriesId = e
		  	$('.tab-content-wrap .tab-content li').removeClass('selected')
		  	$(event.currentTarget).addClass('selected')
		  	$(event.currentTarget).parents('.tab-content').hide()

		  	this.initialization()
		  	this.$nextTick(() => {
	        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
	      })
		  },
		  initialization () {
		  	this.currentPage = 1
		  	this.recommendData = []
		  	this.$store.commit("setProductList", null)
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
	.recommend {
		.tab-wrap-pd {
			box-sizing: border-box;
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			padding: 0 10px;
			z-index: 9;
			background: #fff;
			.tab-wrap {
				overflow: hidden;
		    overflow-x: scroll;
		    width: 100%;
		    height: 100%;
		    -webkit-overflow-scrolling: touch;
				.tab-box {
					width: 100%;
	    		white-space: nowrap;
	    		font-size: 0;
	    		.tab-item {
	    			position: relative;
	    			display: inline-block;
	    			vertical-align: top;
	    			font-size: 14px;
	    			padding: 14px 20px;
	    			border-bottom: 2px solid #fff;
	    			span {
	    				display: inline-block;
	    				vertical-align: top;
	    			}
	    			.triangle {
	    				height: 0;
							width: 0;
							border: 5px solid transparent;
							border-top-color: #e8e8e8;
							margin: 5px 0 0 2px;
	    			}
	    		}
	    		.selected {
	    			border-bottom: 2px solid #ff96ae;
	    			color: #ff96ae;
	    			.triangle {
	    				border-top-color: #ff96ae;
	    			}
	    		}
				}
			}
		}
		.tab-content-wrap {
			position: fixed;
			left: 0;
			top: 45px;
			width: 100%;
			z-index: 9;
			.tab-content {
				box-sizing: border-box;
				position: absolute;
				left: 0;
				top: 0;
				z-index: 3;
				width: 100%;
				padding: 10px 15px 5px;
				font-size: 0;
				background: #F5F5F5;
				li {
					display: inline-block;
					vertical-align: top;
					height: 30px;
					margin: 0 10px 10px 0;
					padding: 0 14px;
					line-height: 30px;
					font-size: 12px;
					border: 0;
					border-radius: 5px;
					color: #333;
					background-color: #fff;

				}
				.selected {
					background: #ff96ae;
					color: #fff;
				}
			}
			.classificationOne {
				padding: 0;
				li {
					display: block;
					margin: 0;
					padding: 8px 12px 8px 35px;
					font-size: 14px;
					border-bottom: 1px solid #fff;
					background: #F5F5F5;
				}
				.selected {
					background: none;
					color: #ff96ae;
				}
			}
		}
		.product-list-wrap {
			margin-top: 45px;
		}
	}
</style>