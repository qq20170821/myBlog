<template>
  <div class="article">

    <div class="article-content">
      <div
        class="article-content-title"
        @click="toDetail"
      >{{ item.title }}</div>
      <div class="article-content-text">
        {{ item.meta }}</div>
      <div class="article-content-footer">
        <div class="acf-item">
          <i class="el-icon-user"></i>
          <span>小冉</span>
        </div>
        <div class="acf-item">
          <i class="el-icon-chat-dot-square"></i>
          <span>2</span>
        </div>
        <div class="acf-item">
          <i class="el-icon-thumb"></i>
          <span>0</span>
        </div>
        <div class="acf-item">
          <i class="el-icon-time"></i>
          <span>{{ item.time }}</span>
        </div>
      </div>

    </div>
    <div class="article-img">
      <el-image
        style="width: 100%; height: 100%"
        :src="item.thumb"
        lazy
      ></el-image>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => { }
    }
  },
  methods: {
    // to 文章详情
    toDetail () {
      this.$router.push({
        path: '/articleDetail',
        query: {
          id: this.item.id
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.article {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  margin-bottom: 10px;
  border-radius: 5px;
  &-img {
    width: 210px;
    height: 128px;
    flex-shrink: 0;
    margin-left: 30px;
    border-radius: 5px;
    overflow: hidden;
    &:hover {
      cursor: pointer;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  &-content {
    flex: 1;
    &-title {
      font-size: 18px;
      color: #333;
      font-weight: bold;
      margin-bottom: 10px;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
    &-text {
      color: #999;
      font-size: 14px;
      line-height: 24px;
      word-break: break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      margin-bottom: 20px;
    }
    &-footer {
      display: flex;
      align-items: center;
      .acf-item {
        display: flex;
        align-items: center;
        margin-right: 20px;
        color: #b4b4b4;
        font-size: 12px;
        span {
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
