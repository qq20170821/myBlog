<template>
  <div class="layout">
    <div class="header">
      <div class="header-wrap">
        <div class="header-logo">
          <img
            src="@/assets/logo.png"
            alt="logo"
          >
        </div>
        <div class="header-main">
          <div class="header-main-tabs">
            <div
              v-for="(item,index) in tabs"
              :key="index"
              class="hmt-item"
              :class="{'hmt-item-active':item.path==path}"
              @click="changeTab(item.path)"
            >
              <i :class="`el-icon-${item.icon}`"></i>
              <span class="hmt-item-label">{{ item.label }}</span>
              <span
                v-if="item.label=='消息'"
                class="hmt-item-dot"
              >10</span>
            </div>
          </div>
          <div class="header-main-search">
            <input
              type="text"
              placeholder="搜索"
            >
            <i class="el-icon-search"></i>
          </div>
        </div>

        <div
          v-if="!token"
          class="header-login"
          @click="toLogin"
        >登录</div>

        <el-dropdown
          v-else
          trigger="hover"
          @command="menuClick"
        >
          <div class="el-dropdown-link header-user">
            <img
              class="hheader-user-img"
              src="@/assets/avatar.jpg"
              alt="avatar"
            >
            <span>{{ userInfo.name }}</span>
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu
            slot="dropdown"
            class="dropdown-menu"
          >
            <el-dropdown-item
              command="write"
              icon="el-icon-edit"
            >写文章</el-dropdown-item>
            <el-dropdown-item
              command="profile"
              icon="el-icon-user-solid"
            >我的主页</el-dropdown-item>
            <el-dropdown-item
              command="1"
              icon="el-icon-star-on"
            >喜欢的文章</el-dropdown-item>
            <el-dropdown-item
              command="logout"
              icon="el-icon-switch-button"
            >退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

    </div>
    <div class="main-scroll">
      <el-scrollbar style="height:100%">
        <div class="main">
          <router-view />
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  data () {
    return {
      tabs: [
        { label: '发现', path: '/find', icon: 'discover' },
        { label: '关注', path: '/attention', icon: 'collection' },
        { label: '消息', path: '/message', icon: 'bell' }
      ]
    }
  },
  computed: {
    ...mapState(['userInfo']),
    ...mapGetters(['token']),
    path () {
      return this.$route.path;
    }
  },
  methods: {
    ...mapActions(['logout']),
    // 切换菜单
    changeTab (path) {
      this.$router.push(path)
    },
    // to 登录
    toLogin () {
      this.$router.push('/login')
    },
    // 下拉列表点击
    menuClick (command) {
      console.log(command)
      if (command == 'write') {
        this.$router.push('/write')
      } else if (command == 'profile') {
        this.$router.push({
          path: '/profile/' + '10000'
        })
      } else if (command == 'logout') {
        localStorage.removeItem('userInfo')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  min-width: 1024px;
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  .header {
    flex-shrink: 0;
    color: #333;
    width: 100%;
    height: 55px;
    border-bottom: 1px solid #e7e7e7;
    box-sizing: border-box;
    background-color: #fff;
    &-wrap {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &-logo {
      cursor: pointer;
      img {
        width: 40px;
        height: 40px;
      }
    }
    &-main {
      width: 960px;
      height: 55px;
      display: flex;
      flex-shrink: 0;
      align-items: center;
      &-tabs {
        display: flex;
        align-items: center;
        height: 100%;
        .hmt-item {
          height: 100%;
          display: flex;
          align-items: center;
          padding: 0 30px;
          position: relative;
          &:hover {
            cursor: pointer;
            background-color: #f5f5f5;
          }
          &-active {
            color: #ec6149;
          }
          i {
            font-size: 20px;
          }
          &-label {
            margin-left: 5px;
          }
          &-dot {
            display: inline-block;
            position: absolute;
            right: 10px;
            top: 10px;
            background-color: #ec6149;
            color: #fff;
            font-size: 12px;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            text-align: center;
            line-height: 18px;
          }
        }
      }
      &-search {
        display: flex;
        align-items: center;
        margin-left: auto;
        margin-right: 50px;
        background-color: #eee;
        border-radius: 40px;
        padding: 0 20px;
        border: 1px solid #eee;
        input {
          width: 160px;
          height: 38px;
          border: none;
          transition: all ease-in-out 0.3s;
          &:focus {
            width: 280px;
          }
          &:focus + i {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: #969696;
            color: #fff;
            text-align: center;
            line-height: 30px;
          }
        }
        i {
          color: #000;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    &-login {
      width: 80px;
      height: 38px;
      border-radius: 20px;
      border: 1px solid rgba(236, 97, 73, 0.7);
      color: #ea6f5a;
    }
    &-user {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #888;
      cursor: pointer;
      white-space: nowrap;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #fff;
      }
      span {
        font-size: 14px;
        margin: 0 5px;
      }
    }
  }
  .main-scroll {
    background-color: #f9f9f9;
    flex: 1;
    overflow: hidden;
  }
  .main {
    width: 960px;
    margin: 0 auto;
  }
}
.dropdown-menu {
  li {
    width: 120px;
    display: flex;
    align-items: center;
  }
  .el-dropdown-menu__item:not(.is-disabled):hover {
    background-color: #f5f5f5;
    color: #333;
  }
  /deep/.el-dropdown-menu__item i {
    color: #ec6149 !important;
    margin-right: 10px;
    font-size: 16px;
  }
}
</style>
