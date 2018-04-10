<template>
  <div class="indexs">
  	<div class="head-title">闺蜜美妆出品</div>
  	<!-- 搜索 -->
  	<div class="search" @click="routerSearch">
  		<v-search-ipt :returnShow="returnShow"></v-search-ipt>
  	</div>
  	<div class="empty-h8"></div>
  	<!-- 品牌简介 -->
  	<div class="product-logo">
  		<div class="logo">
  			<img :src="homeDatas.logo"/>
  		</div>
  		<div class="text">
  			<h3 class="name">{{homeDatas.brand_name}}</h3>
  			<div class="number-of-comments">{{homeDatas.total_comment_num}}个闺蜜用户评论过本产品</div>
  		</div>
  	</div>
  	<div class="empty-h8"></div>
  	<!-- 推荐产品 -->
  	<div class="recommend-products-list" ref="tab">
  		<div class="list-box">
	  		<ul ref="tabcontent">
	  			<li v-for="(item, index) in homeDatas.recomment_products" ref="tabitem">
	  				<v-recommend-products :recommendList="item"></v-recommend-products>
	  			</li>
	  		</ul>
  		</div>
  	</div>
  	<div class="empty-h8"></div>
  	<!-- 上榜品牌 -->
  	<div class="recommend-products-list" ref="tab">
  		<h3 class="title">
  			<span>上榜品牌</span>
  		</h3>
  		<div class="list-box">
	  		<ul ref="tabcontent">
	  			<li v-for="(item, index) in homeDatas.top_products" ref="tabitem">
	  				<v-recommend-products :recommendList="item"></v-recommend-products>
	  			</li>
	  		</ul>
  		</div>
  	</div>
  	<!---->
  	<div class="empty-h14"></div>
  	<div class="tab-nav">
  		<div class="tab">
  			<router-link to="/indexs/comment" class="">配牌口碑({{ homeDatas.total_comment_num }})</router-link>
  		</div>
  		<div class="tab">
  			<router-link to="/indexs/hotProducts" class="">热卖产品</router-link>
  		</div>
  		<div class="tab">                                                                 
  			<router-link to="/indexs/activity" class="">热门活动</router-link>
  		</div>
  	</div>
  	<router-view></router-view>
  </div>
</template>

<script>
	import BScroll from 'better-scroll'
	import searchIpt from '../searchIpt/searchIpt'
	import recommendProducts from '../recommendProducts/recommendProducts'

  export default {
    name: 'indexs',
    props: {
    	// 接收数据
    },
    data () {
      return {
        // 数据
        homeDatas: {},
        returnShow: false
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
			this.homeData();
		},
		methods: {
		  // 方法
		  homeData () {
		  	var _this = this;
		  	_this.$http.get(API_PROXY, {
		  		params: {
		  			rd: 1001
		  		}
		  	})
		  	.then((res) => {
		  		_this.homeDatas = res.data.de;
		  		console.log(_this.homeDatas, '首页数据')
		  	})
		  	.catch((err) => {
		  		console.log(err)
		  	})
		  },
		  routerSearch () {
		  	this.$router.push({
		  		path: '/search'
		  	})
		  }
		},
		directives: {
	  	// 自定义组件
	 	},
		components: {
		  // 注册组件
		  'v-search-ipt': searchIpt,
		  'v-recommend-products': recommendProducts
		}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.indexs {
		.head-title {
			position: relative;
			z-index: 11;
			width: 100%;
			font-size: 10px;
			line-height: 20px;
			text-align: center;
			color: #a1a1a1;
			background: #F5F5F5;
		}
		.product-logo {
			font-size: 0;
			border-bottom: 1px solid #e6e6e6;
			border-top: 1px solid #e6e6e6;
			background: #fff;
			color: #231815;
			.logo, .text {
				display: inline-block;
				vertical-align: top;
			}
			.logo {
				width: 65px;
				height: 65px;
				margin: 9px 15px;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.text {
				.name {
					padding: 23px 0 2px;
					font-size: 14px;
					line-height: 20px;
				}
				.number-of-comments {
					font-size: 11px;
					line-height: 16px;
				}
			}
		}
		.search {
			height: 38px;
			margin-top: -8px;
			overflow: hidden;
			background: #f5f5f5;
			.search-input {
				position: relative;
			}
			.search-box {
				position: relative;
			}
		}
		.recommend-products-list {
			padding: 20px 15px 16px;
			background: #fff;
	    opacity: 1;
	    .title {
	    	height: 20px;
	    	margin-bottom: 8px;
	    	padding-left: 14px;
	    	line-height: 20px;
	    	font-size: 14px;
	    	background: url(../../../static/image/diamond.png) no-repeat left center;
	    	background-size: 12px 10px;
	    	color: #333;
	    }
	    .list-box {
	    	overflow: hidden;
	    	overflow-x: scroll;
	    	width: 100%;
	    	height: 100%;
	    	-webkit-overflow-scrolling: touch;
	    	ul {
	    		width: 100%;
		    	white-space: nowrap;
	    		li {
			    	display: inline-block;
			    	margin-right: 10px;
			    	&:last-child {
			    		margin-right: 0;
			    	}
	    		}
	    	}
	    }
		}
		.tab-nav {
			width: 100%;
			height: 54px;
			text-align: center;
			border-bottom: 1px solid #E8E8E8;
			font-size: 0;
			background: #fff;
			.tab {
				display: inline-block;
				vertical-align: top;
				font-size: 14px;
				a {
					display: block;
					padding: 0 15px;
					border-bottom: 2px solid #fff;
					line-height: 52px;
					color: #000;
					&.router-link-active {
						border-bottom: 2px solid #ff96ae;
					}
				}
			}
		}
	}
</style>