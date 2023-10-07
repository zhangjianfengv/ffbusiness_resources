<template>
  <div id="app">
    <div>
      <b-navbar toggleable="sm" type="dark" variant="info">
        <b-navbar-brand href="/">最终幻想14微观经济学</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/history">销售履历</b-nav-item>
            <b-nav-item to="/marketable">市场统计</b-nav-item>
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
                2023年9月29日
              </h6>
              <span style="font-size: smaller">
                1. 销售履历页面，表格上方的查询现价按钮，当查询条件匹配到了多个物品时，调整为不再弹框提示，而是按照全字匹配->名称最短->id最大的物品的规则查询第一个物品的价格
            </span></div>
            <br>
            <div>
              <h6>
                2023年9月30日
              </h6>
              <span style="font-size: smaller">
                1.销售履历页面，表格上方的查询现价按钮支持直接查询国服的物价情况，无需选择区服
            </span></div>
            <br>
            <div>
              <h6>
                2023年10月5日
              </h6>
              <span style="font-size: smaller">
                1.物价及销量走势可在市场统计页面点击趋势按钮查看(时间范围及区服直接受上方查询条件影响，切换条件后无需点击查询)
            </span></div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-dismiss="modal" @click="closeNote()" type="button"><i class="bi bi-power"></i></button>
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