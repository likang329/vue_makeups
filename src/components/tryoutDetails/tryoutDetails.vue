<template>
  <div class="tryout-details">
  	<div class="return-wrap">
  		<v-return></v-return>
  	</div>
  	<div class="product-information">
  		<div class="product-img">
  			<img :src="tryoutData.img"/>
  		</div>
  		<div class="product-text">
  			<h3 class="name">{{ tryoutData.name }}</h3>
  			<div class="price-comment">
  				<span class="prices">￥{{ tryoutData.psy.price }}/{{ tryoutData.psy.subject }}</span>
  			</div>
  			<div class="score-feel">
	  			<div class="star-score">
	  				<v-star-rating :fraction="tryoutData.score"></v-star-rating>
	  			</div>
	  			<div class="feel">{{ tryoutData.score }}</div>
	  			<div class="feel">{{ tryoutData.score_name }}</div>
  			</div>
  			<div class="used">
  				<span>试用份数：{{ tryoutData.total }}份</span>
  				<span>已参与：{{ tryoutData.people_num }}人</span>
  			</div>
  			<div class="used date">
  				<span>活动时间：{{ tryoutData.start_time | formatDate }}</span>—<span>{{ tryoutData.end_time | formatDate }}</span>
  			</div>
  		</div>
  	</div>
  	<div class="product-introduce">
  		<div class="shou-hide-button">
  			<p @click="shouHideText">
  				<span>详情</span>
  				<span class="icon-triangle"></span>
  			</p>
  		</div>
  		<div class="product-text">{{ tryoutData.pro_discription }}</div>
  	</div>
  	<div class="request-numberofpeople">
  		<div class="numberofpeople">{{tryoutData.people_num}}人申请</div>
  		<div class="numberofpeople-img">
  			<ul>
  				<li v-for="item in tryoutData.apply_user">
  					<img :src="item"/>
  				</li>
  			</ul>
  		</div>
  	</div>
  	<div class="empty-h14"></div>
  	<div class="participate-button">
  		<span v-if="tryoutData.is_end != 1" class="btn">立即申请</span>
  		<!--<span v-if="" class="suspend">已申请</span>-->
  		<span v-else class="suspend">已结束</span>
  	</div>
  	<div class="participate-text">
  		有<span>{{tryoutData.reports_total}}</span>人完成了试用报告：
  	</div>
  	<div class="participate-list">
  		<v-comment></v-comment>
  	</div>
  </div>
</template>

<script>
	import vuex from 'vuex'
	import returns from '../return/return'
	import starRating from '../starRating/starRating'
	import { formatDate } from '../../common/js/date.js'
	import comments from '../comment/comment'

  export default {
    props: {
    	// 接收数据
    },
    data () {
      return {
        // 数据
        tryoutId: this.$route.query.cpid,
        tryoutData: {
        	psy: {}
        },
        tryoutList: {
        	listContent: [],
        	id: 2
        }
      }
		},
		watch: {
			// 观察实例变化
		},
		computed: {
		  // 监听、事实计算
		},
		filters: {
			// 过滤器
	    formatDate (time) {
        var date = new Date(time * 1000)
        return formatDate(date, 'yyyy.MM.dd')
	    }
   	},
		created () {
		  // 页面加载前执行
		  this.tryoutObtain()
		},
		mounted () {
			// 页面加载后执行
		},
		methods: {
		  // 方法
		  tryoutObtain () {
		  	this.$http.get(API_PROXY, {
		  		params: {
		  			rd: 1006,
		  			id: this.tryoutId
		  		}
		  	})
		  	.then((res) => {
		  		this.tryoutData = res.data.de.tryInfo
		  		console.log(this.tryoutData, '试用详情')
		  		this.tryoutList.listContent = this.tryoutList.listContent.concat(res.data.de.tryInfo.reports)
		  		this.$store.commit("setList", this.tryoutList)
		  	})
		  	.catch((err) => {
		  		console.log(err, '试用详情失败')
		  	})
		  },
		  shouHideText () {
		  	$('.product-introduce .product-text').toggle()
		  }
		},
		directives: {
	  	// 自定义组件
	 	},
		components: {
		  // 注册组件
		  'v-return': returns,
		  'v-star-rating': starRating,
		  'v-comment': comments
		}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.tryout-details {
		-webkit-overflow-scrolling: touch;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9;
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
		background: #fff;
		.return-wrap {
			position: fixed;
			left: 8px;
			top: 2px;
			z-index: 12;
		}
		.product-information {
			padding: 20px 15px 0;
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
						padding-right: 8px;
						font-size: 12px;
						color: #333;
					}
				}
				.date {
					margin: 0;
					line-height: 14px;
					span {
						display: inline-block;
						vertical-align: top;
						padding: 0;
						width: 123px;
						height: 14px;
						overflow: hidden;
						white-space: nowrap;
						&:last-child {
							width: 62px;
						}
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
		.product-introduce {
			.shou-hide-button {
				text-align: right;
				p {
					display: inline-block;
					margin-right: 15px;
					font-size: 0;
					span {
						display: inline-block;
						vertical-align: top;
						font-size: 12px;
					}
					.icon-triangle {
						margin-left: 5px;
						margin-top: 4px;
						border: 4px solid #000;
						border-right-color: transparent;
						border-left-color: transparent;
						border-bottom-color: transparent;
					}
				}
			}
			.product-text {
				margin: 8px 15px 0;
				padding: 10px;
				font-size: 14px;
				line-height: 22px;
				background: #F5F5F5;
				color: #666;
			}
		}
		.request-numberofpeople {
			display: flex;
			margin-top: 20px;
			padding: 0 15px;
			height: 48px;
			line-height: 48px;
			.numberofpeople {
				width: 140px;
				font-size: 14px;
			}
			.numberofpeople-img {
				flex: 1;
				overflow: hidden;
    		overflow-x: scroll;
				ul {
					width: 100%;
    			white-space: nowrap;
					li {
						display: inline-block;
						width: 34px;
						height: 34px;
    				margin-right: 10px;
    				margin-top: 7px;
    				img {
    					display: block;
    					width: 34px;
    					height: 34px;
    					border-radius: 50%;
    				}
					}
				}
			}
		}
		.participate-button {
			width: 100%;
			text-align: center;
			margin: 25px 0 35px;
			span {
				display: inline-block;
				width: 250px;
				height: 44px;
				line-height: 44px;
				background: #FF96AE;
				color: #fff;
				border-radius: 96px;
			}
			.suspend {
				background: #C9C9C9;
			}
		}
		.participate-text {
			padding: 0 15px;
			margin-bottom: 10px;
			font-size: 16px;
			color: #333;
			span {
				color: #FF96AE;
			}
		}
		.participate-list {
			margin-bottom: 30px;
		}
	}
</style>