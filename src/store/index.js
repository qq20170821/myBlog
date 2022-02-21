import Vue from 'vue'
import Vuex from 'vuex'
import { Message } from 'element-ui'

Vue.use(Vuex)

let userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
let currentArticle = JSON.parse(localStorage.getItem('currentArticle')) || {};
let articleList = JSON.parse(localStorage.getItem('articleList')) || [];


export default new Vuex.Store({
  state: {
    userInfo: userInfo,
    currentArticle: currentArticle, //当前正在写的文章
    articleList: articleList //文章列表
  },
  getters: {
    token (state) {
      return state.userInfo.token || ''
    }
  },
  mutations: {
    // 更新用户信息
    UPDATE_USERINFO (state, data) {
      if (data.type && data.type == 'logout') {
        localStorage.clear()
        state.userInfo = {}
      } else {
        localStorage.setItem('userInfo', JSON.stringify(data))
        state.userInfo = data
      }
    },
    // 保存当前写的文章到本地缓存
    SAVE_CURRENT_ARTICLE (state, data) {
      localStorage.setItem('currentArticle', JSON.stringify(data))
      state.currentArticle = data
    },
    // 更新文章列表
    UPDATE_ARTICLE_LIST (state, data) {
      state.articleList.unshift(data)
      let d = JSON.stringify(state.articleList)
      localStorage.setItem('articleList', d)
    }
  },
  actions: {
    // 登录
    login ({ commit }, data) {
      return new Promise((resolve, reject) => {
        setTimeout(_ => {
          commit('UPDATE_USERINFO', {
            token: '10086',
            name: '小冉'
          })
          Message.success('登录成功')
          resolve()
        }, 1500)
      })
    },
    // 登出
    logout ({ commit }) {
      commit('UPDATE_USERINFO', {
        type: 'logout'
      }) 
    }
  },
  modules: {
  }
})
