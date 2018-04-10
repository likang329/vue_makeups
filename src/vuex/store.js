// 入口文件，在根组件调用，然后所有子组件可以共享数据。
import Vue from 'vue'
import Vuex from 'vuex'
//import createLogger from 'vuex/logger'

Vue.use(Vuex)
//Vue.config.debug = true
//const debug = process.env.NODE_ENV !== 'production'

// 组件间共享的数据
const state = {
  list: {
  	listContent: [],
  	id: ''
  },
  productLists: [],
  show: false
}

// 修改共享数据
const mutations = {
  setList: (state, value) => {    
    state.list = value
  },
  setProductList: (state, value) => {
  	state.productLists = value
  }
}

// 获取共享数据
const getters = {
  getList: state => {
    return state.list
  },
  getProductList: state => {
  	return state.productLists
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  modules: {
  	// 组件
  }
})