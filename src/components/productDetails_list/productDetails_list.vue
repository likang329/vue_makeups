<template>
  <div class="product-details-list-wrap">
  	<div class="product-details-tab">
  		<v-select :selectData="selectData" @tab-index="obtainTab"></v-select>
  	</div>
  	<div class="product-details-list">
  		<v-comment></v-comment>
  		<infinite-loading @infinite="selectObtain" ref="infiniteLoading">
		    <span>
		     	没有更多数据了！
		    </span>
		  </infinite-loading>
  	</div>
  </div>
</template>

<script>
	import selects from '../select/select'
	import comments from '../comment/comment'
	import InfiniteLoading from 'vue-infinite-loading'

  export default {
    props: {
    	// 接收数据
    },
    data () {
      return {
        // 数据
        productId: this.$route.query.cpid,
        skinIndex: 0, // 皮肤索引
        scoreIndex: 0, //评分索引
        ageIndex: 0, //年龄索引
       	tabIndex: 0, //tab索引
       	currentPage: 1, //分页
       	skinId: ['', 10, 11, 12, 13, 373, 374, 375],
       	selectk: {},
       	selectData: {
       		id: 1
       	},
       	productCommentList: {
       		listContent: [],
       		id: 1
       	}
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
		  selectObtain ($state) {
		  	this.$http.get(API_PROXY, {
		  		params: {
		  			rd: 1010,
		  			type: this.tabIndex, //tab索引
		  			id: this.productId, // 产品ID
		  			ca: this.ageIndex, // 年龄
		  			cq: this.skinId[this.skinIndex], // 肤质
		  			cs: this.scoreIndex, // 评分
		  			ie: this.currentPage
		  		}
		  	})
		  	.then((res) => {
		  		console.log(res, '产品详情评论列表')
		  		if (res.data.de.commments.length) {
		  			this.productCommentList.listContent = this.productCommentList.listContent.concat(res.data.de.commments)
		  			this.$store.commit("setList", this.productCommentList)
		  			this.currentPage += 1
		  			$state.loaded()
		  		} else {
		  			console.log(222)
		  			$state.complete()
		  		}
		  	})
		  	.catch((err) => {
		  		$state.complete();
		  		console.log(err, '产品详情评论列表失败')
		  	})
		  },
		  obtainTab (value) {
		  	console.log(value, 'tab')
		  	if (this.skinIndex == value.skinIndex && this.scoreIndex == value.scoreIndex && this.ageIndex == value.ageIndex && this.tabIndex == value.tabIndex) {
		  		return
		  	}
		  	this.skinIndex = value.skinIndex
        this.scoreIndex = value.scoreIndex
        this.ageIndex = value.ageIndex
       	this.tabIndex = value.tabIndex
       	this.currentPage = 1
       	this.productCommentList.listContent = []
       	this.$store.commit("setList", {})
       	this.$nextTick(() => {
	        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
	      })
		  }
		},
		directives: {
	  	// 自定义组件
	 	},
		components: {
		  // 注册组件
		  'v-select': selects,
		  'v-comment': comments,
		  InfiniteLoading
		}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>