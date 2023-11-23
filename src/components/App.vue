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
            <b-button type="button"
                      @click="toLogin"><img src="/bt_white_76X24.png" alt="QQ登录"/></b-button>
            <b-button variant="info" type="button"
                      href="mailto:jianfengfj@foxmail.com?subject=%E5%BE%AE%E8%A7%82%E7%BB%8F%E6%B5%8E%E5%AD%A6%E5%8F%8D%E9%A6%88&body=%E8%AF%B7%E5%A1%AB%E5%86%99%E6%82%A8%E7%9A%84%E5%AE%9D%E8%B4%B5%E6%84%8F%E8%A7%81%E6%88%96%E5%BB%BA%E8%AE%AE">
              <i class="bi bi-envelope-at-fill"></i></b-button>
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
        <div class="modal-content" style="max-width: 380px">
          <div class="modal-header">
            <h4 class="modal-title" id="myModalLabel" style="margin: 0 auto">更新笔记</h4>
          </div>
          <div class="modal-body">
            <!--            body begin-->
            <div>
              <h6>
                2023年11月17日
              </h6>
              <span style="font-size: smaller">
                1. 修复了实时物价查询页面只看HQ开关的有时不起作用的问题
            </span></div>
            <br>
            <div>
              <h6>
                2023年11月23日
              </h6>
              <span style="font-size: smaller">
                1.QQ登录按钮目前已经可以使用，目前完成登录流程的效果是在本站生成一条注册记录，包含用户id(不能关联具体qq号，可以理解成qq用户在本站的标识)、昵称头像（可以临时另外生成），无其他隐私信息。目前已有的功能都不需要登录后使用。接入QQ登录的原因是简化注册步骤和防止脚本恶意注册，以及后续开发的个人收藏夹及相关功能需要注册使用。
            </span></div>
            <!--            body end-->
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
import '../plugins/qc_jssdk'
import Base64 from '../plugins/base64'

export default {
  name: "App",
  methods: {
    note() {
      $('#note').modal('show');
    },
    toLogin() {
      QC.Login.showPopup({
        appId: Base64.decode("MTAyMDc1MDIx"),
        redirectURI: Base64.decode("aHR0cHMlM0ElMkYlMkZ3d3cuZmYxNHB2cC50b3AlMkZhcGklMkZvYXV0aCUyRnFxJTJGY2FsbGJhY2s=")
      });
    },
    closeNote() {
      $('#note').modal('toggle');
    }
  }
}
</script>

<style scoped>
body {
  padding: 0;
  margin: 0;
}
</style>