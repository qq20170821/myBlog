<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
input {
  background: none;
  outline: none;
  border: none;
}
input:focus {
  border: none;
}
body .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
