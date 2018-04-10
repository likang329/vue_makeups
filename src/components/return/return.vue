<template>
  <div class="return" @click="returns">
  	<div class="return-button">
  		<img src="../../../static/image/return.png"/>
  	</div>
  </div>
</template>

<script>
  export default {
    name: 'return',
		methods: {
		  // 方法
		  returns () {
		  	this.$router.go(-1);
		  }
		}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.return {
		.return-button {
			width: 10px;
			height: 18px;
			/*background: url(../../../static/image/return.png) no-repeat;*/
			/*background-size: 100% 100%;*/
			img {
				display: block;
				width: 100%;
				height: 100%;
			}
		}
	}
</style>