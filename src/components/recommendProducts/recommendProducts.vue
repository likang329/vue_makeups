<template>
  <div class="recommend-products" @click="jumpProductDretails(recommendList.id)">
  	<div class="recommend-img">
  		<img :src="recommendList.img"/>
  		<div class="hot" v-if="recommendList.title != undefined">
  			<span class="text">{{recommendList.title}}</span>
  			<span class="triangle"></span>
  		</div>
  	</div>
  	<h4 class="recommend-name">{{recommendList.name}}</h4>
  	<div class="price-comment clearfix">
  		<div class="price">￥{{recommendList.psy.price}}</div>
  		<div class="comment">{{recommendList.comment_num}}点评</div>
  	</div>
  	<div class="star-rating">
  		<v-star-rating :fraction="recommendList.score"></v-star-rating>
  	</div>
  </div>
</template>

<script>
	import starRating from '../starRating/starRating'

  export default {
    name: 'recommendProducts',
    props: {
    	// 接收数据
    	recommendList: {
    		type: Object
    	}
    },
    data () {
      return {
        // 数据
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
		  jumpProductDretails (cpid) {
		  	this.$router.push({
		  		path: '/productDetails/comment',
		  		query: {cpid: cpid}
		  	})
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
	.recommend-products {
		width: 125px;
		.recommend-img {
			position: relative;
			width: 123px;
			height: 123px;
			border: 1px solid #e6e6e6;
			img {
				display: block;
				width: 100%;
				height: 100%;
			}
			.hot {
				position: absolute;
				left: -1px;
				top: -1px;
				font-size: 0;
				span {
					display: inline-block;
					vertical-align: top;
					font-size: 10px;
					line-height: 14px;
				}
				.text {
					padding-left:3px;
					background-color:#ff96ae;
					color: #000;
				}
				.triangle {
					height: 0;
					width: 0;
					border: 7px solid #ff96ae;
					border-right-color: transparent;
					border-bottom-color: transparent;
				}
			}
		}
		.recommend-name {
			width: 100%;
			margin-top: 11px;
			font-size: 12px;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}
		.price-comment {
			margin: 7px 0 8px;
			font-size: 12px;
			color: #666;
			.price {
				float: left;
			}
			.comment {
				float: right;
			}
		}
	}
</style>