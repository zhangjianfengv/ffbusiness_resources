<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="/">锤子攻略站</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="/history">销售履历</b-nav-item>
            <b-nav-item href="/marketable">畅销排行</b-nav-item>
            <b-nav-item href="/item">物品查询</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <!--    <router-link to="/history">销售履历</router-link>-->
    <!--    <router-link to="/marketable">畅销排行</router-link>-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
}
</script>

<style scoped>

</style>