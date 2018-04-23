<template>
  <div class="comment">
  	<div class="selects-wrap">
  		<v-selects :selectData="selectData" @tab-index="obtainTabIndex"></v-selects>
  	</div>
		<div class="comments">
			<v-comments></v-comments>
			<infinite-loading @infinite="indexComment" ref="infiniteLoading">
				<span slot="{{ texts }}">
				  {{ texts }}
				</span>
		    <slot name="texts">{{texts}}</slot>
		  </infinite-loading>
		</div>
  </div>
</template>

<script>
	import { mapMutations } from 'vuex'
	import selects from '../select/select'
	import comments from '../comment/comment'
	import InfiniteLoading from 'vue-infinite-loading'

  export default {
    name: 'index_comment',
    props: {
    	// 接收数据
    },
    data () {
      return {
        // 数据
        tabIndex: 0, //tab索引
        pagesIndex: 1, //分页索引
        selectData: {
        	listContent: [],
        	id: 0
        },
        texts: '没有更多内容！'
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
		  indexComment ($state) {
		  	var _this = this
		  	this.$http.get(API_PROXY, {
		  		params: {
		  			rd: 1002,
       			ie: _this.pagesIndex,
       			'type': _this.tabIndex
		  		}
		  	})
		  	.then((res) => {
		  		console.log(res, '首页点评')
		  		if (res.data.de.commments.length) {
		  			_this.selectData.listContent = _this.selectData.listContent.concat(res.data.de.commments)
		  			_this.$store.commit("setList", _this.selectData)
		  			console.log(_this.$store.state.list, '首页点评列表存入vuex')
		  			_this.pagesIndex += 1
	          $state.loaded()
		  		} else {
	          $state.complete()
	        }
		  	})
		  	.catch((err) => {
		  		$state.complete()
		  		console.log(err, '首页点评错误')
		  	})
			},
			obtainTabIndex (value) {
				this.selectData.listContent = []
				this.$store.commit("setList", {})
				this.tabIndex = value.tabIndex
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
		  'v-selects': selects,
		  'v-comments': comments,
		  InfiniteLoading
		}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.selects-wrap {
		border-bottom: 1px solid #E8E8E8;
	}
</style>