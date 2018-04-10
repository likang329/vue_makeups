<template>
  <div class="product-details-activity">
  	<p class="text">暂无任何活动</p>
  </div>
</template>

<script>
  export default {
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
	.product-details-activity {
		.text {
			width: 100%;
			margin-top: 25px;
			text-align: center;
			font-size: 14px;
		}
	}
</style>