<template>
  <div class="comment">
  	<div class="comment-wrap" v-for="(item, index) in commentListData.listContent" :key="item.id">
  		<div class="avatar">
  			<img v-if="commentListData.id == 0 || commentListData.id == 1" :src="item.avater"/>
  			<img v-else :src="item.avatar" />
  		</div>
  		<div class="content">
  			<div class="content-wrap" @click="commentDetails(item.id)">
	  			<div class="name-label-date clearfix">
	  				<span class="name">{{item.username}}</span>
	  				<span class="label">LV{{item.lever}}</span>
	  				<span v-if="commentListData.id == 0" class="date">{{item.create_time | formatDate}}</span>
	  			</div>
	  			<div class="skin-age">
	  				<span class="skin"></span>
	  				<span class="age">{{item.age}}岁</span>
	  			</div>
	  			<p class="text">{{item.content}}</p>
	  			<div class="img-wrap">
	  				<div v-for="item in item.imgs" class="img-list">
	  					<div class="img-box">
	  						<div class="img-cont">
				  				<img :src="item"/>
	  						</div>
	  					</div>
	  				</div>
	  			</div>
	  			<div v-if="commentListData.id == 1" class="date-score">
	  				<div class="date">
	  					{{item.create_time | formatDate}}
	  				</div>
	  				<div class="score">
  						<v-star-rating :fraction="item.score"></v-star-rating>
  					</div>
	  			</div>
	  			<div v-if="commentListData.id == 1" class="fabulous">{{item.vote_num}}</div>
  			</div>
  			<div class="product-dome" v-if="commentListData.id == 0" @click="routerProductDetails(item.productid)">
  				<div class="product-img">
  					<img :src="item.img"/>
  				</div>
  				<div class="product-content">
  					<h3 class="name">{{item.name}}</h3>
  					<div class="score">
  						<v-star-rating :fraction="item.score"></v-star-rating>
  					</div>
  					<div class="price">
  						<span>￥{{item.psy.price}}/{{item.psy.subject}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{item.comment_num}}</span>好评
  					</div>
  				</div>
  			</div>
				<div v-if="commentListData.id == 0" class="leave-a-message">
					<span>{{item.reply_num}}</span>
				</div>
  		</div>
  	</div>
  </div>
</template>

<script>
	import { mapState } from 'vuex'
	import { mapGetters } from 'vuex'
	import starRating from '../starRating/starRating'
	import { formatDate } from '../../common/js/date.js'

  export default {
    name: 'comment',
    props: {
    	// 接收数据
    },
    data () {
      return {
        // 数据
        commentListData: {
        	listContent: []
        }
      }
		},
		watch: {
			// 观察实例变化
			'$store.state.list'(val) {
				this.commentListData = val
				console.log(this.commentListData, '从vuex获取')
			}
		},
		filters: {
			// 过滤器
	    formatDate (time) {
        var date = new Date(time * 1000)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
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
		  commentDetails (plid) {
		  	if (this.commentListData.id == 2) {
		  		this.$router.push({
		  			path: '/commentDetails',
		  			query: {
		  				id: 2,
		  				plid: plid
		  			}
		  		})
		  	} else {
		  		this.$router.push({
		  			path: '/commentDetails',
		  			query: {
		  				plid: plid,
		  			}
		  		})
		  	}
		  },
		  routerProductDetails (cpid) {
		  	this.$router.push({
		  		path: '/productDetails/comment',
		  		query: {
		  			cpid: cpid
		  		}
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
	.comment {
		.comment-wrap {
			display: flex;
			margin-top: 20px;
			border-bottom: 1px solid #f2f2f2;
			padding: 0 15px;
			&:last-child {
				border-bottom: 0;
			}
			.avatar {
				width: 40px;
				height: 40px;
				margin-right: 7px;
				img {
					display: block;
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.content {
				flex: 1;
				overflow: hidden;
				.content-wrap {
					position: relative;
					.name-label-date {
						width: 100%;
						font-size: 0;
						span {
							display: inline-block;
							vertical-align: top;
						}
						.name {
							font-size: 14px;
							color: #000;
						}
						.label {
							margin-left: 4px;
							margin-top: 2px;
							height: 11px;
							font-size: 9px;
							padding: 0 5px;
							line-height: 11px;
							vertical-align:middle;
							border-radius: 5px;
							background-color:#f5bc23;
							color: #fff;
						}
						.date {
							float: right;
							/*margin-bottom:40rpx;*/
							font-size: 12px;
							line-height: 14px;
							color:#979797;
						}
					}
					.skin-age {
						margin: 8px 0 10px;
						font-size: 11px;
						color:#979797;
					}
					.text {
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 3;
						overflow: hidden;
						margin-bottom: 10px;
						line-height: 22px;
						font-size: 14px;
						word-wrap:break-word;
						word-break:break-all;
						color:#333;
					}
					.img-wrap {
						display: flex;
						.img-list {
							flex: 1;
							height: 92px;
							margin-bottom: 14px;
							margin-right: 10px;
							overflow: hidden;
							text-align: center;
							&:last-child {
								margin-right: 0;
							}
							.img-box {
						    display: table;
						    width: 100%;
						    height: 100%;
						    overflow: hidden;
						    .img-cont {
						    	width: 100%;
							    vertical-align: middle;
							    display: table-cell;
							    text-align: center;
						    }
							}
							img {
								width: 100%;
							}
						}
					}
					.date-score {
						width: 100%;
						margin: 16px 0 20px;
						font-size: 0;
						.date, .score {
							display: inline-block;
							vertical-align: top;
						}
						.date {
							font-size: 12px;
							line-height: 12px;
							margin-right: 6px;
							color: #979797;
						}
					}
					.fabulous {
						position: absolute;
						right: 0;
						top: 8px;
						height: 17px;
						padding-left: 18px;
						line-height: 17px;
						font-size: 12px;
						background: url(http://wwwcdn.kimiss.net/public/weixin/weChatAPPImgs/praseicon.png) no-repeat left center/14px auto;
						color: #979797;
					}
				}
				.product-dome {
					display: flex;
					margin-top: 10px;
					padding: 5px;
					background: #f5f5f5;
					.product-img {
						width: 68px;
						height: 68px;
						margin-right: 16px;
						img {
							width: 100%;
							height: 100%;
						}
					}
					.product-content {
						flex: 1;
						.name {
							font-size: 14px;
							color: #000;
						}
						.score {
							margin: 10px 0 8px;
						}
						.price {
							font-size: 11px;
							color: #979797;
						}
					}
				}
				.leave-a-message {
					width: 100%;
					margin: 8px 0 25px;
					text-align: right;
					span {
						display: inline-block;
						padding-left: 20px;
						font-size: 12px;
						line-height: 14px;
						background: url(../../../static/image/msgIcon.png) no-repeat left top;
						background-size: 16px 14px;
						color: #979797;
					}
				}
			}
		}
	}
</style>