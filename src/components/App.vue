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
            <div><h6>
              2023年8月16日
            </h6>
              <span style="font-size: smaller">
                 销售履历<br>
              性能优化：优化了物品名模糊查询的速度。具体为当模糊查询的结果过多时会缓存总数的值，下次同样的关键词查询时不再计算总数，缓存值几天更新一次。
            </span></div>
            <br>
            <div>
              <h6>
              2023年8月18日
            </h6>
              <span style="font-size: smaller">
                销售履历<br>
                1.HQ筛选<br>
                2.部分查询条件变化时直接发起查询
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