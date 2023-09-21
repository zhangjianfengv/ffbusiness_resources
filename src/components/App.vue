<template>
  <div id="app">
    <div>
      <b-navbar toggleable="sm" type="dark" variant="info">
        <b-navbar-brand href="/">最终幻想14微观经济学</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/history">销售履历</b-nav-item>
            <b-nav-item to="/marketable">畅销排行</b-nav-item>
            <b-nav-item to="/item">物品查询</b-nav-item>
            <b-button variant="info" type="button"
                      @click="note()"><i class="bi bi-clipboard-fill"></i></b-button>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view></router-view>
    <div aria-hidden="true" aria-labelledby="note" class="modal fade" id="note" role="dialog" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="myModalLabel">更新笔记</h4>
          </div>
          <div class="modal-body">
            <div>
              <h6>
                2023年9月5日
              </h6>
              <span style="font-size: smaller">
                1.物品名查询增加物品建议<br>
                2.现价查询UI调整<br>
                3.物品查询的id和品级查询改为精确匹配<br>
                4.和🐧稍微扯皮了下，现在网站可以在手机QQ内置浏览器正常访问了
            </span></div>
            <br>
            <div>
              <h6>
                2023年9月21日
              </h6>
              <span style="font-size: smaller">
                1.销售履历页面现在可以直接根据查询参数查询单个物品的大区内现价<br>
                2.物品名称建议调整为新版本物品显示在前<br>
                3.手机端推荐使用Edge浏览器，各个页面操作尤其是物品名称建议下拉框接近电脑端效果，新版手机端Chrome的下拉框体验略超前，手机端Edge可在各大手机品牌应用商店找到。
            </span></div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-dismiss="modal" @click="closeNote()" type="button">关闭</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "App",
  methods: {
    note() {
      $('#note').modal('show');
    },
    closeNote() {
      $('#note').modal('toggle');
    }
  }
}
</script>

<style scoped>

</style>