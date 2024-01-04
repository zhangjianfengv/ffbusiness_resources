<template>
  <div id="app">
    <div>
      <b-navbar toggleable="sm" type="dark" variant="info">
        <b-navbar-brand href="/">罗薇娜的手抄本</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/history">水晶转移记录</b-nav-item>
            <b-nav-item to="/marketable">晶簇记录</b-nav-item>
            <b-nav-item to="/item">水晶查询</b-nav-item>
            <b-nav-item to="/my">我的关注</b-nav-item>
            <b-nav-item to="/current">正在转移</b-nav-item>
            <b-button variant="info" type="button"
                      href="mailto:jianfengfj@foxmail.com?subject=%E5%BE%AE%E8%A7%82%E7%BB%8F%E6%B5%8E%E5%AD%A6%E5%8F%8D%E9%A6%88&body=%E8%AF%B7%E5%A1%AB%E5%86%99%E6%82%A8%E7%9A%84%E5%AE%9D%E8%B4%B5%E6%84%8F%E8%A7%81%E6%88%96%E5%BB%BA%E8%AE%AE">
              <i class="bi bi-envelope-at-fill"></i></b-button>
            <b-button variant="info"
                      href="https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=Am8SZj4VzSRfY5SKTfv6gAov0MnM_SPS&authKey=VT1%2FcriD%2FryxXz%2B%2BSewvL9YbN5pFwvympg%2Bt0XU70OPrvsJ8NBkBIIknzk6wiMVD&noverify=0&group_code=688539775">
              <i class="bi bi-tencent-qq"></i></b-button>
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
                2023年12月18日
              </h6>
              <span style="font-size: smaller">
                1.水晶转移履历页面点击水晶id可跳转至水晶查询页面发起查询<br/>
                2.水晶查询页面新增采集笔记内容
            </span></div>
            <br>
            <div>
              <h6>
                2023年12月31日
              </h6>
              <span style="font-size: smaller">
                1.水晶查询页面新增等级、可制作、Gil转移、可采集查询条件，补全了诗学可兑换水晶（在分类选择可选诗学兑换物）<br/>
                2.水晶查询页面可查询单个水晶的多个采集地点和采集时间<br/>
                3.水晶查询页面增加水晶名称建议
            </span>
            </div>
            <br>
            <div>
              <h6>
                2023年1月4日
              </h6>
              <span style="font-size: smaller">
                1.网站前端正在调整
            </span></div>
            <!--            body end-->
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-dismiss="modal" @click="closeNote()" type="button"><i
                class="bi bi-power"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
select.form-control, .form-control.dropdown, .dropdown-menu {
  width: 100% !important;
}

@media screen and (min-width: 768px) {
  select.form-control, .form-control.dropdown, .dropdown-menu {
    max-width: 220px !important;
  }
}

.bs-bars form, .bs-bars, .bootstrap-table .fixed-table-toolbar .columns, .bootstrap-table
.fixed-table-toolbar .search {
  position: relative;
  /*width: 100%;*/
}

.dropdown-item.active, .dropdown-item:active, .btn-secondary, .btn-info {
  color: #fff;
  text-decoration: none;
  background-color: #17a2b8 !important;
}

.page-item.active, .page-link {
  color: #17a2b8 !important;
  text-decoration: none;
  background-color: #fff !important;
}

.black-link-style {
  color: #212529 !important;
  text-decoration: underline;
}
</style>
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