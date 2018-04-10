<template>
  <div class="selects">
  	<div class="select-tab">
  		<ul>
  			<li v-for="(item, index) in selectTab" @click="tabOption(index)" :class="index == 0 ? 'selected' : ''">{{ item }}</li>
  		</ul>
  	</div>
  	<div class="select-dropDown" v-if="selectData.id != 0">
  		<ul>
  			<li>
  				<select @change="screenSkin" v-model="skinScoreAgeIndex.skinIndex">
		  			<option v-for="(item, index) in comment_select.skin_select" :value="index">{{ item }}</option>
		  		</select>
  			</li>
  			<li>
  				<select @change="screenScore" v-model="skinScoreAgeIndex.scoreIndex">
		  			<option v-for="(item, index) in comment_select.star_select" :value="index">{{ item }}</option>
		  		</select>
  			</li>
  			<li>
  				<select @change="screenAge" v-model="skinScoreAgeIndex.ageIndex">
		  			<option v-for="(item, index) in comment_select.age_select" :value="index">{{ item }}</option>
		  		</select>
  			</li>
  		</ul>
  	</div>
  </div>
</template>

<script>
  export default {
    props: {
    	// 接收数据
    	selectData: {
    		type: Object
    	}
    },
    data () {
      return {
        // 数据
        skinScoreAgeIndex: {
        	skinIndex: 0, // 皮肤索引
        	scoreIndex: 0, //评分索引
        	ageIndex: 0, //年龄索引
        	tabIndex: 0 //tab索引
        },
        selectTab: ['全部', '达人测评', '专家点评', '有图'],
				comment_select:{
					skin_select:['肤质','干性','中性','油性','混合','敏感油性','敏感干性','敏感混合性'],
					star_select:['评分','一星','二星','三星','四星','五星'],
					age_select:['年龄','20岁以下','20-25岁','26-30岁','31-39岁','40岁以上']
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
//			console.log(this.selectData);
		},
		methods: {
		  // 往父组件传递tab选择的下标
		  tabOption (e) {
		  	this.skinScoreAgeIndex.tabIndex = e
		  	var skinScoreAgeIndex = this.skinScoreAgeIndex
		  	this.$emit('tab-index', skinScoreAgeIndex)
		  	$(event.target).addClass('selected').siblings().removeClass('selected')
		  },
		  // 往父组件传递皮肤选择的下标
		  screenSkin () {
		  	var skinScoreAgeIndex = this.skinScoreAgeIndex
		  	this.$emit('tab-index', skinScoreAgeIndex)
		  },
		  // 往父组件传递评论选择的下标
		  screenScore () {
		  	var skinScoreAgeIndex = this.skinScoreAgeIndex
		  	this.$emit('tab-index', skinScoreAgeIndex)
		  },
		  // 往父组件传递年龄选择的下标
		  screenAge () {
		  	var skinScoreAgeIndex = this.skinScoreAgeIndex
		  	this.$emit('tab-index', skinScoreAgeIndex)
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
	.selects {
		.select-tab {
			margin: 20px 0;
			ul {
				width: 100%;
				font-size: 0;
				text-align: center;
				li {
					display: inline-block;
					vertical-align: top;
					margin-right: 4px;
					padding: 5px 16px;
					font-size: 12px;
					background: rgba(255, 150, 174, 0.2);
					border-radius: 70px;
					&.selected {
						background: #FF96AE;
						color: rgb(255,255,255);
					}
				}
			}
		}
		.select-dropDown {
			padding: 0 20px;
			ul {
				display: flex;
				width: 100%;
				height: 30px;
				background: #F7F7F7;
				li {
					flex: 1;
					select {
						display: inline-block;
						width: 100%;
						height: 30px;
						line-height: 45px;
						border: 0;
						border-bottom: 2px solid rgba(93,186,152,0);
						font-size: 14px;
						text-align: center;
						text-align-last: center;
						background: none;
						color: rgb(51,51,51);
						option {
							text-align: center;
						}
					}
				}
			}
		}
	}
</style>