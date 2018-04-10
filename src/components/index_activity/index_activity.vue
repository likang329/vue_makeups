<template>
  <div class="activity">
  	<p class="prompt">尚无进行中活动，敬请期待</p>
  </div>
</template>

<script>
  export default {
    name: 'index_activity',
    props: {
    	// 接收数据
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
	.activity {
		.prompt {
			padding: 25px 0;
			text-align:center;
			font-size: 12px;
			color:#666;
		}
	}
</style>