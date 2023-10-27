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
            <b-nav-item to="/current">实时物价</b-nav-item>
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
                2023年10月21日
              </h6>
              <span style="font-size: smaller">
                1.实时物价增加只看hq开关<br>
                2.修复了实时物价物品名称输入框不起作用的问题
            </span></div>
            <br>
            <div>
              <h6>
                2023年10月25日
              </h6>
              <span style="font-size: smaller">
                1.实时物价页面记住上次在销售履历页面所选大区（仅当直接进入此页面时起作用，若从履历跳转则会被覆盖）
            </span></div>
            <br>
            <div>
              <h6>
                2023年10月27日
              </h6>
              <span style="font-size: smaller">
                1.物品查询页面，可制作的物品可查看配方<br>
                2.物品查询页面，物品名称输入时显示物品建议,增加显示使用职业<br>
                3.市场统计页面，价格销量走势图，当该日售出数为0时，价格不会在走势图上显示为0而是改为不显示
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