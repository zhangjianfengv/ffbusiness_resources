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
    <keep-alive exclude="current">
      <router-view>
      </router-view>
    </keep-alive>

    <div aria-hidden="true" aria-labelledby="note" class="modal fade" id="note" role="dialog" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="myModalLabel" style="margin: 0 auto">更新笔记</h4>
          </div>
          <div class="modal-body">

            <div>
              <h6>
                2023年10月28日
              </h6>
              <span style="font-size: smaller">
                1.市场统计页面，价格销量走势图支持选择时间范围，可选择查询所有数据<br>
                2.物品查询页面可计算配方所需初级材料清单
            </span></div>
            <br>
            <div>
              <h6>
                2023年11月3日
              </h6>
              <span style="font-size: smaller">
                1.除了实时物价页面以外各个页面在加载过一次后会进行缓存，切换页面再切换回来不会立即刷新，保留查询参数<br>
                2.优化了物品名称建议的顺序，优先前缀匹配，例如关键字为“复”时复兴刺剑会显示在恢复药的前面
            </span></div>
            <br>
            <div>
              <h6>
                2023年11月6日
              </h6>
              <span style="font-size: smaller">
                1.销售履历页面支持分类检索<br>
                2.销售履历页面物品ID和物品名已经合并为一个查询条件，若输入纯数字则按物品ID处理
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