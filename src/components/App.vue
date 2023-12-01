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
            <b-nav-item to="/my">我的关注</b-nav-item>
            <b-nav-item to="/current">实时物价</b-nav-item>
            <b-button variant="info" type="button"
                      href="mailto:jianfengfj@foxmail.com?subject=%E5%BE%AE%E8%A7%82%E7%BB%8F%E6%B5%8E%E5%AD%A6%E5%8F%8D%E9%A6%88&body=%E8%AF%B7%E5%A1%AB%E5%86%99%E6%82%A8%E7%9A%84%E5%AE%9D%E8%B4%B5%E6%84%8F%E8%A7%81%E6%88%96%E5%BB%BA%E8%AE%AE">
              <i class="bi bi-envelope-at-fill"></i></b-button>
            <b-button variant="info" type="button"
                      @click="note()"><i class="bi bi-clipboard-fill"></i></b-button>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <template #button-content>
                <b-img :src="imageUrl" fluid alt="icon" width="32px" height="32px"></b-img>
                <em>{{ user.nickname }}</em>
              </template>
              <b-dropdown-item @click="logOut">退出登录</b-dropdown-item>
            </b-nav-item-dropdown>
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
                2023年11月25日
              </h6>
              <span style="font-size: smaller">
                1.实时物价页面支持查询国际服物价信息
            </span></div>
            <br>
            <div>
              <h6>
                2023年11月26日
              </h6>
              <span style="font-size: smaller">
                1.新增我的关注页面，登录后可收藏物品并在该页面批量查询物价
            </span></div>
            <div>
              <h6>
                2023年12月1日
              </h6>
              <span style="font-size: smaller">
                1.市场统计页面物品价格及销量走势图除了每日新增以外，会随着一天以上的市场统计运行后同步增补数据
            </span></div>
            <br>
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
  data() {
    return {
      user: {nickname: '用户'}
    }
  },
  computed: {
    imageUrl() {
      let s = this.user.figureQQ + '';
      return s.replace(/http:\/\//g, "https://");
    },
  },
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
    logOut() {
      window.location.href = window.location.origin + '/ffbusiness/user/logOut';
    },
    closeNote() {
      $('#note').modal('toggle');
    }
  }, mounted() {
    const vm = this;
    $.ajax({
      url: "/ffbusiness/user/current",
      method: "post",
      contentType: "application/json",
      data: JSON.stringify({}),
      success: function (data) {
        vm.user = data;
      }
    });
  }
}
</script>

<style scoped>
body {
  padding: 0;
  margin: 0;
}
</style>