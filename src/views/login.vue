<template>
  <div class="login">
    <div class="login-bg">
      <img
        src="@/assets/bg.jpg"
        alt=""
      >
    </div>

    <div class="box">
      <div class="box-logo">Blog{{ type=='login'?'':'-注册' }}</div>
      <div class="box-form">
        <div class="box-form-item">
          <i class="el-icon-user"></i>
          <input
            v-model="name"
            class="box-form-item-input"
            type="text"
            placeholder="用户名"
            :maxlength="11"
          >
        </div>
        <div class="box-form-item">
          <i class="el-icon-lock"></i>
          <input
            v-model="password"
            class="box-form-item-input"
            type="password"
            placeholder="密码"
            :maxlength="18"
          >
        </div>
        <el-button
          class="box-form-btn"
          type="primary"
          :loading="loading"
          @click="submit"
        >{{ type=='login'?'登录':'注册' }}{{ loading?'中...':'' }}</el-button>
        <div class="box-form-footer">
          <span
            v-if="type=='login'"
            @click="toRegisterOrLogin('register')"
          >还没账号？注册账号</span>
          <span
            v-else
            @click="toRegisterOrLogin('login')"
          >去登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      type: 'login',
      name: 'admin',
      password: '123456',
      loading: false
    }
  },
  methods: {
    ...mapActions(['login']),
    // to注册or登录
    toRegisterOrLogin (type) {
      this.name = '';
      this.password = '';
      this.type = type
    },
    // 登录or注册
    async submit () {
      if (!this.name) return this.$message.error('请输入用户名');
      if (!this.password) return this.$message.error('请输入密码');
      this.loading = true;
      if (this.type == 'login') {
        await this.login({
          name: this.name,
          password: this.password
        })
        this.loading = false;
        this.$router.push('/home')
      } else {
        this.$message.success('注册成功');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  position: relative;
  &-bg {
    width: 100%;
    height: 100%;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    &::before {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      background: rgba(58, 98, 215, 0.3);
    }
  }
  .box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 340px;
    color: #fff;
    &-logo {
      font-size: 36px;
      text-align: center;
    }
    &-form {
      &-item {
        display: flex;
        align-items: center;
        background: rgba(255, 255, 255, 0.25);
        border-radius: 20px;
        margin-top: 30px;
        height: 40px;
        padding: 0 20px;
        i {
          font-size: 16px;
        }
        &-input {
          flex: 1;
          margin-left: 10px;
          border: none;
          background: transparent;
          height: 30px;
          color: #fff;
          font-size: 14px;
          &::-webkit-input-placeholder {
            color: #d3d3d3;
          }
        }
      }
      &-btn {
        margin-top: 30px;
        width: 100%;
        border-radius: 20px;
      }
      &-footer {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
        font-size: 12px;
        color: #d3d3d3;
        &:hover {
          cursor: pointer;
          color: #409eff;
        }
      }
    }
  }
}
</style>
