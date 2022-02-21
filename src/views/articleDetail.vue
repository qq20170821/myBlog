<template>
  <div class="articleDetail">
    <div class="articleDetail-main">
      <div class="articleDetail-title">{{ articleDetail.title }}</div>
      <div class="articleDetail-author">
        <div class="articleDetail-author-img">
          <el-image
            style="width: 100%; height: 100%"
            :src="require('@/assets/avatar.jpg') "
          ></el-image>
        </div>
        <div class="articleDetail-author-content">
          <div class="aac-head">
            <span class="aac-head-name">纷纷</span>
            <span
              class="aac-head-btn"
              :class="{'aac-head-btn-active':attention}"
              @click="changeAttention"
            >{{ attention?'已关注':'关注' }}</span>
          </div>
          <div class="aac-footer">
            <span class="aac-footer-time">2022/02/17</span>
            <span class="aac-footer-word">字数 {{ articleDetail.content.length }}</span>
          </div>
        </div>
      </div>
      <mavon-editor
        v-model="articleDetail.content"
        :subfield="false"
        :box-shadow="false"
        default-open="preview"
        :toolbars-flag="false"
        preview-background="#fff"
        style="border:none"
      />
    </div>
    <div class="writecomment">
      <div class="writecomment-content">
        <div class="writecomment-content-img">
          <el-image
            style="width: 100%; height: 100%"
            :src="require('@/assets/avatar.jpg') "
          ></el-image>
        </div>
        <div class="writecomment-content-input">
          <el-input
            v-model="comment"
            type="textarea"
            :rows="4"
            placeholder="写下你的评论..."
          >
          </el-input>
        </div>
      </div>
      <div class="writecomment-footer">
        <span class="writecomment-footer-publish">发布</span>
        <span class="writecomment-footer-publish">取消</span>
      </div>
    </div>
    <div class="allcomment">
      <div class="allcomment-head">

      </div>
      <div class="allcomment-list">

      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      articleDetail: {}, // 文章详情
      attention: false, // 是否关注
      comment: '' //评论内容
    }
  },
  computed: {
    ...mapState(['articleList'])
  },
  created () {
    let id = this.$route.query.id || '';
    let idx = this.articleList.findIndex(item => item.id == id)
    this.articleDetail = this.articleList[idx]
  },
  methods: {
    // 关注or取关
    changeAttention () {
      this.attention = !this.attention;
      this.$message.success(this.attention ? '关注成功' : '取消关注成功')
    }
  }
}
</script>

<style lang="scss" scoped>
.articleDetail {
  padding: 20px 0;

  &-main {
    border-radius: 5px;
    overflow: hidden;
    background-color: #fff;
  }
  &-title {
    font-size: 30px;
    font-weight: bold;
    padding: 10px 20px;
  }
  &-author {
    display: flex;
    align-items: center;
    padding: 20px;
    &-img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
    }
    &-content {
      margin-left: 20px;
      .aac-head {
        display: flex;
        align-items: center;
        &-name {
          color: #333;
          font-size: 16px;
        }
        &-btn {
          margin-left: 10px;
          border: 1px solid #ea6f5a;
          font-size: 14px;
          color: #333;
          border-radius: 20px;
          color: #ea6f5a;
          width: 70px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          &:hover {
            cursor: pointer;
            background-color: rgba(236, 97, 73, 0.1);
          }
          &-active {
            background-color: rgba(236, 97, 73, 0.8);
            color: #fff;
            &:hover {
              background-color: rgba(236, 97, 73, 0.8);
            }
          }
        }
      }
      .aac-footer {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
        span {
          margin-right: 10px;
        }
      }
    }
  }
  /deep/.v-note-wrapper {
    img {
      max-width: 100%;
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
