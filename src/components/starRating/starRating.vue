<template>
  <div class="star-rating">
  	<div class="star-back">
  		<div class="star" :style="'width:' + (fraction*10*2.7/2) + 'px'">
	  		<img src="../../../static/image/star.png"/>
  		</div>
  	</div>
  </div>
</template>

<script>
  export default {
    name: 'starRating',
    props: {
    	// 接收数据
    	fraction: {
    		type: Number
    	}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.star-rating {
		.star-back {
			position: relative;
			width: 67px;
			height: 12px;
			background: url(../../../static/image/star.png) no-repeat right;
			background-size: 135px 12px;
			overflow: hidden;
			.star {
				position: absolute;
				left: 0;
				top: 0;
				height: 12px;
				overflow: hidden;
				img {
					display: block;
					width: 135px;
					height: 12px;
				}
			}
		}
	}
</style>