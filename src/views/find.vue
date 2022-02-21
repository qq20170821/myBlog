<template>
  <div class="find">
    <div class="articles">
      <Article
        v-for="(item,index) in articleList"
        :key="index"
        :item="item"
      ></Article>
    </div>
    <!-- <div class="aside">aside</div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['articleList'])
  }
}
</script>
<style lang="scss" scoped>
.find {
  display: flex;
  .articles {
    flex: 1;
    padding: 20px 0;
  }
  .aside {
    margin-left: 20px;
    flex-shrink: 0;
    width: 200px;
    background-color: pink;
  }
}
</style>
