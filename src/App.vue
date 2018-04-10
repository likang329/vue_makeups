<template>
  <div id="app">
  	<div class="footer-tab">
  		<div class="tab">
  			<router-link to="/indexs/comment" class="index" :class="homeClass">首页</router-link>
  		</div>
  		<div class="tab">
  			<router-link to="/tryOut" class="try-out">试用中心</router-link>
  		</div>
  		<div class="tab">
  			<router-link to="/recommend" class="recommend">品牌产品</router-link>
  		</div>
  	</div>
    <router-view/>
    <div class="empty-h48"></div>
  </div>
</template>

<script>
	export default {
	  name: 'App',
	  data () {
	  	return {
	  		homeClass: ''
	  	}
	  },
	  watch: {
	  	'$route'(val) {
	  		this.homeCls(val.path)
	  	} 
	  },
	  mounted () {
	  	this.homeCls(this.$route.path)
	  },
	  methods: {
	  	homeCls (routeVal) {
	  		if (routeVal == '/indexs/hotProducts' || routeVal == '/indexs/activity') {
	  			this.homeClass = 'router-link-exact-active router-link-active'
	  		} else {
	  			this.homeClass = ''
	  		}
	  	}
	  }
	}
</script>

<style lang="less">
  .footer-tab {
  	position: fixed;
  	left: 0;
  	bottom: 0;
  	display: flex;
  	z-index: 9;
  	width: 100%;
  	height: 47px;
  	border-top: 1px solid #C8C8C8;
  	background: #fff;
  	.tab {
  		flex: 1;
  		text-align: center;
  		font-size: 11px;
  		a {
  			display: inline-block;
  			width: 100%;
  			margin-top: 2px;
  			padding-top: 30px;
  			color: #000;
  			&.index {
  				background: url(../static/image/home.png) no-repeat top center;
  				background-size: 27px 27px;
  				&.router-link-active {
  					background: url(../static/image/home_select.png) no-repeat top center;
  					background-size: 27px 27px;
  				}
  			}
  			&.try-out {
  				background: url(../static/image/try.png) no-repeat top center;
  				background-size: 27px 27px;
  				&.router-link-active {
  					background: url(../static/image/try_select.png) no-repeat top center;
  					background-size: 27px 27px;
  				}
  			}
  			&.recommend {
  				background: url(../static/image/brand.png) no-repeat top center;
  				background-size: 27px 27px;
  				&.router-link-active {
  					background: url(../static/image/brand_select.png) no-repeat top center;
  					background-size: 27px 27px;
  				}
  			}
  		}
  		.router-link-active {
  			color: #FF96AE;
  		}
  	}
  }
</style>
