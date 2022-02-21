<template>
  <div
    class="usercard"
    @click="test"
  >
    <div class="usercard-img">
      <el-image
        style="width: 100%; height: 100%"
        :src="require('@/assets/avatar.jpg')"
        lazy
      ></el-image>
    </div>
    <div class="usercard-content">
      <div class="usercard-content-name">安平村民</div>
      <div class="usercard-content-main">
        <span>关注 95 </span>
        <span>粉丝 105</span>
        <span>文章 20 </span>
      </div>
    </div>
    <div class="usercard-btn">关注</div>
  </div>
</template>

<script>
export default {
  methods: {
    test () {
      this.$router.push('/profile/' + new Date().getTime())
    }
  }
}
</script>

<style lang="scss" scoped>
.usercard {
  display: flex;
  align-items: center;
}
</style>
