<template>
  <div class="search-input">
  	<div class="search-box" :class="cssFixed">
  		<!--<div class="icon-nav">
  			<img src="http://wwwcdn.kimiss.net/public/weixin/weChatAPPImgs/classify-normal.png"/>
  		</div>-->
  		<div v-if="returnShows === true" class="return-wrap">
  			<v-return></v-return>
  		</div>
  		<div class="search-ipt">
  			<img src="../../../static/image/search-icon.png" class="icon-search"/>
  			<input class="search" type="text" placeholder="搜索产品" v-model="inputText">
  			<!--<img src="../../../static/image/scan_image.png" class="scan"/>-->
  		</div>
  		<div class="search-button" @click="searchObtain('','click')">搜索</div>
  	</div>
  	<div v-show="searchList" class="search-content" ref="searchContent">
  		<div class="search-content-tab">
  			<ul>
  				<li v-for="(item, index) in tabText" @click="tabChoice(index)" :class="index === 0 ? 'selected' : ''">
  					{{item}}<span v-if="index === 1" class="icon-triangle"></span>
  				</li>
  			</ul>
  		</div>
  		<div class="search-content-list">
  			<v-product-list></v-product-list>
  			<infinite-loading @infinite="searchObtain" ref="infiniteLoading">
			    <span>
			     	没有更多数据了！
			    </span>
			  </infinite-loading>
  		</div>
  	</div>
  	<div v-if="searchResult" class="search-content-no">您搜索的  “{{searchResultText}}” 在本品牌中未查询到</div>
  	<div v-show="recordShow" class="search-record">
  		<h3>搜索历史：</h3>
  		<ul v-if="searchRecord.length > 0">
  			<li v-for="item in searchRecord" @click="recordSearch">{{item}}</li>
  		</ul>
  		<p v-else>暂无搜索历史！</p>
  	</div>
  </div>
</template>

<script>
	import vuex from 'vuex'
	import productList from '../productList/productList'
	import returns from '../return/return'
	import InfiniteLoading from 'vue-infinite-loading'

  export default {
    name: 'searchIpt',
    props: {
    	// 接收数据
    	returnShow: {
    		type: Boolean
    	}
    },
    data () {
      return {
        // 数据
        searchRecord: [], // 存储输入记录
        recordList: [], // 获取每次输入的值并存入
        returnShows: '', // 返回按钮显示隐藏
        cssFixed: '',
        inputText: '', // 获取用户输入内容
        pagesIndex: 1, // 分页索引
        tabIndex: 0, // tab索引
        tabContent: ['dianping_num', 'max_price', 'exponent'], 
        sort: 'desc', // 价格排序
        sortSwitch: true, // 控制价格正序还是倒叙
        union_key: '88669a70477bc8c0', // 用户ID
        tabText: ['点评数', '价格', '蜜友评分'],
        listContent: [], // 列表数据
        searchResultText: '',
        searchResult: false, // 搜索结果没有显示隐藏
        searchList: false, // 搜索结果有显示隐藏
        recordShow: true
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
			this.returnShows = this.returnShow
			if (this.$route.path == '/search') {
				this.returnShows = true
				this.cssFixed = 'cssFixed'
			}

			var obtainData = JSON.parse(localStorage.getItem('searchRecordList'))
			if (obtainData !== null) {
				this.searchRecord = obtainData
				console.log(obtainData, '初始')
			} else {
				this.searchRecord = []
			}
		},
		methods: {
		  // 方法
		  searchObtain ($state, e) {
		  	if (this.inputText === '') {
		  		return
		  	}
		  	if (this.searchResult === true && this.searchResultText === this.inputText) {
		  		return
		  	}
		  	if (e === 'click') {
		  		this.recordShow = false
		  		this.searchRecordStorage()

	  			this.listContent = []
	  			this.pagesIndex = 1
	  			this.$refs.searchContent.scrollIntoView(true)
	  			this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
	  		}
		  	this.$http.get(API_PROXY, {
		  		params: {
		  			rd: 1013,
		  			page: this.pagesIndex,
		  			type: this.tabContent[this.tabIndex],
		  			sort: this.sort,
		  			keyword: this.inputText,
		  			union_key: this.union_key
		  		}
		  	})
		  	.then((res) => {
		  		console.log(res, '搜索结果')
		  		if (e === 'click') {
		  			if (res.data.de.ee === 702) {
		  				this.searchResultText = this.inputText
		  				this.searchList = false
		  				this.searchResult = true
		  				return
		  			}
		  		}
		  		if (res.data.de.res.length) {
		  			this.searchList = true
		  			this.searchResult = false
	  				this.listContent = this.listContent.concat(res.data.de.res)
	  				this.$store.commit('setProductList', this.listContent)
	  				this.pagesIndex += 1
	  				if (e !== 'click') {
	  					$state.loaded()
	  				}
	  			} else {
	  				if (e !== 'click') {
	  					$state.complete()
	  				}
	  			}
		  	})
		  	.catch((err) => {
		  		console.log(err, '搜索结果失败')
		  		$state.complete()
		  	})
		  },
		  tabChoice (e) {
		  	if (e === 1) {
		  		$(event.target)
		  	}
		  	if (this. tabIndex === e) {
		  		if (e === 1) {
		  			if (this.sortSwitch == true) {
		  				this.sort = 'asc'
		  				this.sortSwitch = false
		  				$(event.target).find('.icon-triangle').addClass('icon-triangle-asc')
		  			} else {
		  				this.sort = 'desc'
		  				this.sortSwitch = true
		  				$(event.target).find('.icon-triangle').removeClass('icon-triangle-asc')
		  			}
		  		} else {
		  			return
		  		}
		  	}
		  	this.pagesIndex = 1
		  	this.listContent = []
		  	this.$store.commit('setProductList', [])
		  	this.tabIndex = e
		  	$(event.target).addClass('selected').siblings().removeClass('selected')
		  	this.$nextTick(() => {
	        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
	      })
	  	},
	  	searchRecordStorage () {
	  		this.searchRecord.unshift(this.inputText)
	  		this.searchRecord = Array.from(new Set(this.searchRecord))
	  		localStorage.setItem('searchRecordList', JSON.stringify(this.searchRecord))
	  		var obtainData = JSON.parse(localStorage.getItem('searchRecordList'))
	  		this.searchRecord = obtainData

	  		console.log(this.searchRecord, 'data2')
	  	},
	  	recordSearch (e) {
	  		this.inputText = e.target.innerText
	  		this.searchObtain('', 'click')
	  	}
		},
		directives: {
	  	// 自定义组件
	 	},
		components: {
		  // 注册组件
		  'v-product-list': productList,
		  'v-return': returns,
		  InfiniteLoading
		}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.search-input {
		-webkit-overflow-scrolling: touch;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
		background: #fff;
		z-index: 9;
		.return-wrap {
			padding: 0;
		}
		.search-box {
			display: flex;
			width: 100%;
			padding: 8px 0;
			background: #F5F5F5;
			&.cssFixed {
				position: fixed;
				left: 0;
				top: 0;
				z-index: 9;
			}
			.icon-nav {
				width: 20px;
				padding-top: 6px;
				img {
					display: block;
					width: 100%;
				}
			}
			.search-ipt {
				flex: 1;
				display: flex;
				margin: 0 10px;
				padding: 0 10px;
				border: 1px solid #e6e6e6;
				background-color: #fff;
				border-radius: 5px;
				.icon-search {
					display: block;
					width: 11px;
					height: 11px;
					margin-top: 14px;
				}
				.search {
					flex: 1;
					display: block;
					height: 38px;
					margin: 0 5px;
					line-height: 38px;
					font-size: 12px;
				}
				.scan {
					display: block;
					width: 16px;
					height: 16px;
					margin-top: 6px;
				}
			}
			.search-button {
				line-height: 38px;
				padding-right: 10px;
				font-size: 14px;
			}
		}
		.search-content {
			.search-content-tab {
				position: fixed;
				left: 0;
				top: 56px;
				width: 100%;
				background: #fff;
				z-index: 9;
				ul {
					display: flex;
					height: 40px;
					line-height: 40px;
					border-bottom: 1px solid #E8E8E8;
					font-size: 14px;
					text-align: center;
					li {
						flex: 1;
						border-bottom: 2px solid #fff;
						.icon-triangle {
							display: inline-block;
							width: 7px;
							height: 9px;
							margin-left: 4px;
							background: url(../../../static/image/none.png) no-repeat;
							background-size: 100% 100%;
						}
					}
					.selected {
						border-bottom: 2px solid #FF96AE;
						color: #FF96AE;
						.icon-triangle {
							background: url(../../../static/image/min.png) no-repeat;
							background-size: 100% 100%;
						}
						.icon-triangle-asc {
							background: url(../../../static/image/max.png) no-repeat;
							background-size: 100% 100%;
						}
					}
				}
			}
		}
		.search-content {
			padding-top: 96px;
		}
		.search-content-no {
			width: 100%;
			padding: 80px 0 25px;
			overflow: hidden;
			text-align: center;
			font-size: 12px;
			color: #666;
		}
		.search-record {
			margin-top: 56px;
			h3 {
				padding-left: 12px;
				font-size: 16px;
				line-height: 40px;
			}
			ul {
				padding: 0 2px;
				font-size: 0;
				li {
					display: inline-block;
					vertical-align: top;
					margin: 10px 10px 0;
					padding: 6px 10px;
					font-size: 12px;
					border: 1px solid #F1F1F1;
					border-radius: 14px;
				}
			}
			p {
				font-size: 14px;
				text-align: center;
			}
		}
	}
</style>