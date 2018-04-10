<template>
  <div class="comment-details">
  	<div class="return-wrap">
  		<v-return></v-return>
  	</div>
  	<div class="banner">
  		<img :src="commentData.firstImg" alt="" />
  	</div>
  	<div class="personal-information">
  		<div class="avatar">
  			<img :src="commentData.avater"/>
  		</div>
  		<div class="content">
  			<div class="content-wrap">
	  			<div class="name-label-date clearfix">
	  				<span class="name">{{commentData.username}}</span>
	  				<span class="label">LV{{commentData.lever}}</span>
	  			</div>
	  			<div class="skin-age">
	  				<span class="skin"></span>
	  				<span class="age">{{commentData.age}}岁</span>
	  			</div>
  			</div>
  		</div>
  	</div>
  	<div class="text-content">
  		<ul>
  			<li v-for="item in commentData.content">
  				<p v-if="item.type == 'txt'">{{item.val.content}}</p>
  				<img v-else :src="item.val.imgurl">
  			</li>
  		</ul>
  	</div>
  </div>
</template>

<script>
	import returns from '../return/return'

  export default {
    props: {
    	// 接收数据
    },
    data () {
      return {
        // 数据
        rdId: 1015,
        commentId: this.$route.query.plid,
        commentData: {}
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
		  if (this.$route.query.id == 2) {
		  	this.rdId = 1019
		  }
		  this.commentObtain()
		},
		mounted () {
			// 页面加载后执行
		},
		methods: {
		  // 方法
		  commentObtain () {
		  	this.$http.get(API_PROXY, {
		  		params: {
		  			rd: this.rdId,
		  			id: this.commentId
		  		}
		  	})
		  	.then((res) => {
		  		this.commentData = res.data.de
		  		console.log(this.commentData, '评论详情')
		  	})
		  	.catch((err) => {
		  		console.log(err, '评论详情失败')
		  	})
		  }
		},
		directives: {
	  	// 自定义组件
	 	},
		components: {
		  // 注册组件
		  'v-return': returns
		}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.comment-details {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9;
		width: 100%;
		height: 100%;
		overflow-y: auto;
		background: #fff;
		.return-wrap {
			position: fixed;
			left: 18px;
			top: 12px;
		}
		.banner {
			img {
				display: block;
				width: 100%;
			}
		}
		.personal-information{
			display: flex;
			margin-top: 20px;
			border-bottom: 1px solid #f2f2f2;
			padding: 0 15px 12px;
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
					}
					.skin-age {
						margin: 8px 0 10px;
						font-size: 11px;
						color:#979797;
					}
				}
			}
		}
		.text-content {
			ul {
				li {
					padding: 15px;
					line-height: 22px;
					font-size: 14px;
					color: #333;
					img {
						display: block;
						width: 100%;
					}
				}
			}
		}
	}
</style>