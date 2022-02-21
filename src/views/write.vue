<template>
  <div class="write">
    <div class="write-head">
      <input
        v-model="title"
        type="text"
        placeholder="文章标题"
        maxlength="50"
      >
      <div class="write-head-status">当前编辑状态：<span>{{ isSave?'已保存':'保存中...' }}</span></div>
      <el-button
        type="primary"
        class="write-head-btn"
        :loading="loading"
        @click="publish"
      ><i class="el-icon-s-promotion"></i>{{ loading?'正在发布...':'发布文章' }}</el-button>
    </div>
    <mavon-editor
      ref="md"
      v-model="value"
      :style="isFullscreen?'height:100%':'height:calc(100vh - 140px)'"
      :toolbars="toolbars"
      @imgAdd="imgAdd"
      @imgDel="imgDel"
      @save="save"
      @change="change"
      @fullScreen="fullScreenChange"
    />

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      title: '', // 文章标题
      value: '', // 文章内容
      isFullscreen: false, //当前是否全屏
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      isSave: true, //是否已保存
      timeGap: 500, //自动保存时间间隔,即作者停止编辑后多久自动保存
      timer: null,
      loading: false
    }
  },
  computed: {
    ...mapState(['currentArticle', 'articleList'])
  },
  watch: {
    title () {
      this.change()
    }
  },
  created () {
    // 默认读取本地缓存的数据
    this.title = this.currentArticle.title;
    this.value = this.currentArticle.content;
  },
  methods: {
    ...mapMutations(['SAVE_CURRENT_ARTICLE', 'UPDATE_ARTICLE_LIST']),
    // 绑定@imgAdd event
    imgAdd (pos, $file) {
      console.log($file)
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append('file', $file);
      axios({
        url: 'https://imgurl.org/upload/aws_s3',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((res) => {
        try {
          console.log(res)
          let url = res.data.url;
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          /**
               * $vm 指为mavonEditor实例，可以通过如下两种方式获取
               * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
               * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
               */
          this.$refs.md.$img2Url(pos, url);
        } catch (error) {
          this.$message.error('上传失败')
        }

      })
    },
    imgDel (pos) {

    },
    // 全屏切换
    fullScreenChange (bol) {
      this.isFullscreen = bol
    },
    // 编辑内容改变
    change () {
      clearTimeout(this.timer)
      this.timer = null
      this.timer = setTimeout(_ => {
        this.save()
      }, this.timeGap)

    },
    // 保存 ctrl+s或手动点击按钮触发
    save () {
      this.isSave = false;
      setTimeout(_ => {
        this.isSave = true;
        let payload = {
          title: this.title || '',
          content: this.value || ''
        }
        this.SAVE_CURRENT_ARTICLE(payload)
        console.log('已保存-------', this.value)

      }, 150)
    },
    // 获取内容纯文本-作为文章简介
    getText (str) {
      str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
      str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
      //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
      str = str.replace(/&nbsp;/ig, '');//去掉&nbsp;
      str = str.replace(/\s/g, ''); //将空格去掉
      return str;
    },
    // 获取图片src,当前仅返回第一张图片的地址
    getImgSrc (htmlstr) {
      let imgSrc = ''
      let imgStrs = htmlstr.match(/<img.*?>/g)
      // console.log(imgStrs, '------图片标签')
      if (imgStrs) {
        // 获取每个img url
        let urls = imgStrs.map(url => {
          return url.match(/\ssrc=['"](.*?)['"]/)[1]
        })
        // console.log(urls, '------图片url')
        imgSrc = urls[0]
      } else {
        console.log('----没有图片')
      }
      return imgSrc
    },
    // 发布文章
    publish () {
      this.title = this.title.trim();
      this.value = this.value.trim();
      if (!this.title) return this.$message.warning('请填写文章标题');
      if (!this.value) return this.$message.warning('文章内容不能为空');
      let payload = {
        id: this.articleList.length,
        time: new Date(),
        title: this.title,
        meta: this.getText(this.$refs.md.d_render),
        thumb: this.getImgSrc(this.$refs.md.d_render),
        content: this.value
      }
      console.log('payload=========', payload)
      this.loading = true;
      setTimeout(_ => {
        this.loading = false;
        this.UPDATE_ARTICLE_LIST(payload)
        this.$message.success('发布成功')
        this.$router.push('/find')
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.write {
  position: fixed;
  z-index: 999;
  width: 1400px;
  margin: 0 auto;
  top: 55px;
  left: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  &-head {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 70px;
    input {
      flex: 1;
      height: 50px;
      font-size: 18px;
      font-weight: bold;
    }
    &-status {
      color: #999;
      font-size: 12px;
      display: flex;
      justify-content: flex-end;
      span {
        width: 50px;
      }
    }
    &-btn {
      margin-left: 20px;
      background-color: #ea6f5a;
      color: #fff;
      border-radius: 5px;
      padding: 8px 20px;
      border: none;
      i {
        margin-right: 5px;
      }
      &:hover {
        cursor: pointer;
        background-color: rgba(234, 111, 90, 0.8);
      }
    }
  }
}
/deep/.v-note-show,
/deep/.v-note-read-model {
  img {
    max-width: 100%;
    display: block;
    margin: 0 auto;
  }
}
</style>
