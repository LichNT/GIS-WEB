<template>
<div class="nav-bar">
  <div class="app-title">
    <slot name="title"></slot>
  </div>

  <div class="right-nav-group">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'nav-bar'
}
</script>

<style lang="css" scoped>
.nav-bar {
  min-height: 56px;
  background-color: #2196F3;
  padding: 0 10px;
  display: flex;
  align-items: stretch;
  color: #FFFFFF;
}

.app-title {
  margin: auto;
  margin-left: 20px;
  font-size: 1.5em;
}

.app-title:hover, .app-title:focus {
  color: rgb(200, 200, 200);
  cursor: pointer;
}

.app-title > a {
  text-decoration: none;
  color: #FFFFFF;
  flex: 0 1 auto;
  min-width: 48px;
  padding: 0 10px;
  text-align: center;
  line-height: 56px;
  vertical-align: middle;
}

.right-nav-group {
  flex: 1 1 auto;
  display: flex;
  justify-content: flex-end;
}

a.nav {
  text-decoration: none;
  color: #FFFFFF;
  flex: 0 1 auto;
  min-width: 48px;
  padding: 0 10px;
  text-align: center;
  line-height: 56px;
  vertical-align: middle;
}

a.nav:hover, a.nav:focus {
  background-color: #1976D2;
  cursor: pointer;
}
</style>
