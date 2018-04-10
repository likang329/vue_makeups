<template>
  <div class="product-list">
  	<div class="product-wrap" v-for="item in productListData" @click="clkDetails(item.psy.productid, item.productid)">
  		<div class="product-img">
  			<img :src="item.img"/>
  		</div>
  		<div class="conetnt">
  			<h3 class="name">{{item.name}}</h3>
  			<div class="star-rating-wrap">
  				<div class="rating">
  					<v-star-rating :fraction="item.score"></v-star-rating>
  				</div>
					<div class="price" v-if="item.psy != ''">￥{{item.psy.price}}/{{item.psy.subject}}</div>
  			</div>
  			<div class="comment-quantity">
  				{{item.want_num}}人想用&nbsp;&nbsp;&nbsp;&nbsp;点评{{item.comment_num}}
  			</div>
  			<div class="hot" v-if="item.top_name != ''">
  				<span>2017年度榜单</span>
  			</div>
  		</div>
  	</div>
  </div>
</template>

<script>
	import vuex from 'vuex'
	import starRating from '../starRating/starRating'

  export default {
    name: 'productList',
    props: {
    	// 接收数据
    },
    data () {
      return {
        // 数据
        productListData: []
      }
		},
		watch: {
			// 观察实例变化
			'$store.state.productLists'(val) {
				this.productListData = val
				console.log(this.productListData, '从vuex获取')
			}
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
		  clkDetails (cpid, saccpid) {
		  	if (saccpid !== undefined) {
		  		this.$router.push({
			  		path: '/productDetails/comment',
			  		query: {cpid: saccpid}
			  	})
		  	} else {
		  		this.$router.push({
		  			path: '/productDetails/comment',
		  			query: {cpid: cpid}
		  		})
		  	}
		  }
		},
		directives: {
	  	// 自定义组件
	 	},
		components: {
		  // 注册组件
		  'v-star-rating': starRating
		}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.product-list {
		.product-wrap {
			display: flex;
			padding: 11px;
			border-top: 1px solid #f2f2f2;
			.product-img {
				width: 95px;
				height: 95px;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.conetnt {
				flex: 1;
				position: relative;
				.name {
					font-size: 14px;
					color: #000;
				}
				.star-rating-wrap {
					margin: 12px 0 42px;
					font-size: 0;
					.rating, .price {
						display: inline-block;
						vertical-align: top;
					}
					.price {
						font-size: 11px;
						color: #000;
					}
				}
				.comment-quantity {
					font-size: 11px;
					color: #979797;
				}
				.hot {
					position: absolute;
					left: 0;
					bottom: 28px;
					padding: 0 6px;
					border: 1px solid #000;
					font-size: 0;
					span {
						display: inline-block;
						padding-left: 14px;
						font-size: 10px;
						line-height: 14px;
						background: url(../../../static/image/diamond.png) no-repeat left center;
						background-size: 12px 10px;
					}
				}
			}
		}
	}
</style>