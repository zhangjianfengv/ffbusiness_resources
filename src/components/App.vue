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
                2023年10月13日
              </h6>
              <span style="font-size: smaller">
                1.查询现价条数调整到450条，可筛选高品质、服务器及雇员名<br>
                2.市场统计页面原先的品级等级及分类筛选(表格内)也改为了选项<br>
                3.现价显示的价格不含税
            </span></div>
            <br>
            <div>
              <h6>
                2023年10月14日
              </h6>
              <span style="font-size: smaller">
                1.市场统计页面展示物品是否可由生产职业制作
            </span></div>
            <br>
            <div>
              <h6>
                2023年10月18日
              </h6>
              <span style="font-size: smaller">
                1.查询现价额外返回40条销售履历(实时)
            </span></div>

          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-dismiss="modal" @click="closeNote()" type="button"><i class="bi bi-power"></i>
            </button>
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