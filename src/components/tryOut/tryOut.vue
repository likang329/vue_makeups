<template>
  <div class="try-out">
  	<div class="title-banner">
  		<img :src="tryOutData.banner" alt="标题图片" />
  	</div>
  	<div class="try-out-list" v-if="tryOutData.lists.length > 0">
  		<ul>
  			<li v-for="item in tryOutData.lists" :key="item.id" @click="routerTryoutDetsils(item.id)">
  				<div class="tryOut-img">
  					<img :src="item.img"/>
  				</div>
  				<div class="tryOut-text">
  					<h3 class="name">{{item.name}}</h3>
  					<p class="tryout-participate">
  						<span class="tryout">试用份数：{{item.total}}</span>
  						&nbsp;&nbsp;&nbsp;
  						<span class="participate">已参与：{{item.people_num}}人</span>
  					</p>
  					<div class="end-time">距离结束：{{item.is_end === 1 ? '已结束' : 'item.end_time | formatDate'}}</div>
  					<div class="button">查看详情</div>
  				</div>
  			</li>
  		</ul>
  	</div>
  	<div v-else class="try-out-prompt">尚无试用活动，敬请期待</div>
  </div>
</template>

<script>
	import {formatDate} from '../../common/js/date.js'

  export default {
    name: 'tryOut',
    props: {
    	// 接收数据
    },
    data () {
      return {
        // 数据
        tryOutData: {}
      }
		},
		watch: {
			// 观察实例变化
		},
		filters: {
			// 过滤器
	    formatDate (time) {
        var date = new Date(time * 1000)
        console.log(date,'123')
        return formatDate(date, 'yyyy-MM-dd hh:mm')
	    }
   	},
		computed: {
		  // 监听、事实计算
		},
		created () {
		  // 页面加载前执行
		  this.tryOutObtain()
		},
		mounted () {
			// 页面加载后执行
		},
		methods: {
		  // 方法
		  tryOutObtain () {
		  	var _this = this;
		  	this.$http.get(API_PROXY, {
		  		params: {
		  			rd: 1005
		  		}
		  	})
		  	.then((res) => {
		  		console.log(res, '试用中心')
		  		this.tryOutData = res.data.de
		  	})
		  	.catch((err) => {
		  		console.log(err, '试用中心失败')
		  	})
		  },
		  routerTryoutDetsils (cpid) {
		  	this.$router.push({
		  		path: '/tryoutDetails',
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
		}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.try-out {
		.title-banner {
			width: 100%;
			height: 60px;
			background: #f5a7b9;
			img {
				display: block;
				width: 142px;
				height: 40px;
				margin: 0 auto;
				padding-top: 10px;
			}
		}
		.try-out-list {
			ul {
				li {
					box-sizing:border-box;
					display: flex;
					width: 100%;
					padding: 20px 15px;
					border-bottom: 7px solid #E8E8E8;
					&:last-child {
						border-bottom: 0;
					}
					.tryOut-img {
						width: 100px;
						margin-right: 19px;
						img {
							display: block;
							width: 100px;
						}
					}
					.tryOut-text {
						flex: 1;
						width: 0;
						margin-top: 4px;
						.name {
							font-size: 16px;
							color: #000;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space:nowrap;
						}
						.tryout-participate {
							margin: 10px 0;
						}
						.end-time, .tryout-participate {
							font-size: 11px;
							color: #666;
						}
						.button {
							width: 78px;
							height: 24px;
							margin-top: 14px;
							text-align:center;
							font-size: 12px;
							line-height: 24px;
							letter-spacing:0;
							color:#000000;
							background: #FF96AE;
							border-radius: 50px;
						}
					}
				}
			}
		}
		.try-out-prompt {
			display: flex;
			padding: 25px 0;
			text-align: center;
			font-size: 12px;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			color:#666;
		}
	}
</style>