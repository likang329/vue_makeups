<template>
  <div class="product-details-text">
  	<p class="text" v-html="productData.discription"></p>
  </div>
</template>

<script>
  export default {
    props: {
    	// 接收数据
    	productData: {
    		type: Object
    	}
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
	.product-details-text {
		.text {
			padding: 0 15px;
			margin: 25px 0px;
			font-size: 14px;
			color: #333;
			line-height:1.6;

		}
	}
</style>