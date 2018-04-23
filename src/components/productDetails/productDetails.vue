<template>
  <div class="product-details">
  	<div class="return-wrap">
  		<v-return></v-return>
  	</div>
  	<div class="product-information">
  		<div class="product-img" @click="productSwiper">
  			<img :src="productData.img"/>
  			<p class="text">点击查看大图</p>
  		</div>
  		<div class="product-text">
  			<h3 class="name">{{ productData.name }}</h3>
  			<div class="price-comment">
  				<span class="prices" v-if="productData.psy">参考价：￥{{ productData.psy.price != null ? productData.psy.price : '未知' }}/{{ productData.psy.subject }}</span>
  				<span class="comment">{{ productData.comment_num }}个评论</span>
  			</div>
  			<div class="score-feel">
	  			<div class="star-score">
	  				<v-star-rating :fraction="productData.score"></v-star-rating>
	  			</div>
	  			<div class="feel">{{ productData.score }}</div>
	  			<div class="feel">{{ productData.score_name }}</div>
  			</div>
  			<div class="used">
  				<span>{{ productData.used_num }}蜜友用过</span>
  				<span>{{ productData.want_num }}蜜友想用</span>
  			</div>
  			<div class="label-wrap">
  				<ul>
  					<li v-for="item in productData.effectInfo" :key="item.id">#{{ item.name }}</li>
  				</ul>
  			</div>
  		</div>
  	</div>
  	<div class="empty-h14"></div>
  	<div class="tab-nav-wrap">
  		<div class="tab-nav">
  			<div class="tab">
  				<router-link :to="{path:'/productDetails/comment',query:{cpid:productId}}">全部点评</router-link>
  			</div>
  			<div class="tab">
  				<router-link :to="{path:'/productDetails/text',query:{cpid:productId}}">产品介绍</router-link>
  			</div>
  			<div class="tab">
  				<router-link :to="{path:'/productDetails/activity',query:{cpid:productId}}">福利</router-link>
  			</div>
  		</div>
  		<router-view :productData="productData"></router-view>
  	</div>
  	<div v-if="popupShowHide" class="productSwiper-wrap">
  		<Swiper v-if="productData.imgs.length > 0" :autoPlay='false' :showIndicator='true'>
        <Slide v-for="(item,index) in productData.imgs" :key="index" style="height:100%">
        	<div class="img-wrap">
        		<div class="img-box">
		        	<img :src="item"/>
        		</div>
        	</div>
        </Slide>
   		</Swiper>
   		<div class="popup-close">
   			<a href="javascript:;" @click="productSwiper">
   				<img src="../../../static/image/return.png"/>
   			</a>
   		</div>
  	</div>
  </div>
</template>

<script>
	import starRating from '../starRating/starRating'
	import selects from '../select/select'
	import returns from '../return/return'
	import { Swiper, Slide } from 'vue-swiper-component'

  export default {
    name: 'productDetails',
    props: {
    	// 接收数据
    },
    data () {
      return {
        // 数据
        productId: this.$route.query.cpid,
        productData: {
        	psy: {},
        	imgs: {}
        },
        popupShowHide: false
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
			this.productDetailsData()
			$('.wh_swiper').css({'height': '100%'})
		},
		methods: {
		  // 方法
		  productDetailsData () {
		  	var _this = this
		  	this.$http.get('/api/commonwx/104?', {
		  		params: {
		  			rd: 1011,
		  			id: _this.productId
		  		}
		  	})
		  	.then((res) => {
		  		console.log(res, '产品详情')
		  		_this.productData = res.data.de
		  	})
		  	.catch((err) => {
		  		console.log(err, '产品详情失败')
		  	});
		  },
		  productSwiper () {
		  	this.popupShowHide = !this.popupShowHide
		  }
		},
		directives: {
	  	// 自定义组件
	 	},
		components: {
		  // 注册组件
		  'v-star-rating': starRating,
		  'v-selects': selects,
		  'v-return': returns,
		  Swiper,
    	Slide
		}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.product-details {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9;
		width: 100%;
		height: 100%;
		overflow-y: auto;
		background: #fff;
		i {
			font-style: normal;
		}
		.return-wrap {
			position: fixed;
			left: 18px;
			top: 12px;
			z-index: 12;
		}
		.product-information {
			padding: 20px 15px;
			display: flex;
			.product-img {
				width: 142px;
				img {
					display: block;
					width: 100%;
				}
				.text {
					text-align: center;
					font-size: 8px;
					color: #979797;
				}
			}
			.product-text {
				flex: 1;
				.name {
					margin: 3px 0 11px 0;
					font-size: 16px;
					color: #000;
				}
				.price-comment {
					font-size: 0;
					span {
						display: inline-block;
						vertical-align: top;
						font-size: 12px;
						color: #000;
					}
					.comment {
						margin-left: 16px;
					}
				}
				.score-feel {
					margin: 8px 0 9px;
					font-size: 0;
					.star-score, .feel {
						display: inline-block;
						vertical-align: top;
					}
					.feel {
						margin-left: 10px;
						font-size: 12px;
						color: #FF96AE;
					}
				}
				.used {
					margin-bottom: 9px;
					span {
						padding-right: 16px;
						font-size: 12px;
						color: #333;
					}
				}
				.label-wrap {
					ul {
						font-size: 0;
						li {
							display: inline-block;
							vertical-align: top;
							height: 24px;
							margin:0 5px 5px 0;
							padding: 0 12px;
							border: 1px solid #f1f1f1;
							line-height: 24px;
							font-size: 11px;
							border-radius: 12px;
						}
					}
				}
			}
		}
		.tab-nav-wrap {
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
		.productSwiper-wrap {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 30;
			background: #fff;
			.wh_swiper, .wh_slide, .wh_content {
				height: 100%;
			}
			.img-wrap {
				display: table;
				width: 100%;
		    height: 100%;
		    overflow: hidden;
		    .img-box {
		    	width: 100%;
			    vertical-align: middle;
			    display: table-cell;
			    text-align: center;
			    img {
			    	width: 100%;
			    }
		    }
			}
			.popup-close {
				position: fixed;
				left: 18px;
				top: 12px;
				z-index: 31;
				a {
					display: block;
					width: 10px;
			    height: 18px;
			    /*background: url(/static/img/return.45b7d46.png) no-repeat;*/
			    /*background-size: 100% 100%;*/
			    img {
			    	display: block;
			    	width: 100%;
			    	height: 100%;
			    }
				}
			}
		}
	}
</style>