<template>
  <div id="app">
    <div>
      <b-navbar toggleable="sm"
                type="dark"
                style="background-color: #563d7c;box-shadow: 0 .5rem 1rem rgba(0,0,0,.05),inset 0 -1px 0 rgba(0,0,0,.1);">
        <b-navbar-brand href="/">罗薇娜的手抄本</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/history" exact-path exact-active-class="active">销售履历</b-nav-item>
            <b-nav-item to="/marketable" exact-path exact-active-class="active">市场统计</b-nav-item>
            <b-nav-item to="/item" exact-path exact-active-class="active">配方成本</b-nav-item>
            <b-nav-item to="/my" exact-path exact-active-class="active">我的关注</b-nav-item>
            <b-nav-item to="/current" exact-path exact-active-class="active">实时物价</b-nav-item>
            <b-nav-item to="/about" exact-path exact-active-class="active">关于本站</b-nav-item>
            <div class="container1">
              <a class="top-button n-link-style"
                 href="mailto:jianfengfj@foxmail.com?subject=%E5%BE%AE%E8%A7%82%E7%BB%8F%E6%B5%8E%E5%AD%A6%E5%8F%8D%E9%A6%88&body=%E8%AF%B7%E5%A1%AB%E5%86%99%E6%82%A8%E7%9A%84%E5%AE%9D%E8%B4%B5%E6%84%8F%E8%A7%81%E6%88%96%E5%BB%BA%E8%AE%AE">
                <i class="bi bi-envelope-at-fill"></i></a>
              <a class="top-button n-link-style"
                 href="https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=Am8SZj4VzSRfY5SKTfv6gAov0MnM_SPS&authKey=VT1%2FcriD%2FryxXz%2B%2BSewvL9YbN5pFwvympg%2Bt0XU70OPrvsJ8NBkBIIknzk6wiMVD&noverify=0&group_code=688539775">
                <i class="bi bi-tencent-qq"></i></a>
              <a class="top-button n-link-style"
                 @click="note()"><i class="bi bi-clipboard-fill"></i></a>
              <a class="top-button n-link-style"
                 @click="answer()"><i class="bi bi-question-circle-fill"></i></a>
              <a class="top-button n-link-style"
                 href="/luoweina.jpg"
                 id="linkWithHiddenText"
                 target="_blank"><img v-b-tooltip.hover title="小程序" width="25px"
                                      height="25px"
                                      src="/favicon324c17f2.ico" alt="小程序"></a></div>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <template #button-content>
                <b-img :src="imageUrl" fluid alt="icon" width="32px" height="32px" class="rounded-circle"></b-img>
                <em>{{ user.nickname }}</em>，欢迎您！
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
    <div aria-hidden="true" aria-labelledby="answer" class="modal fade" id="answer" role="dialog" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content" style="max-width: 380px">
          <div class="modal-header">
            <h4 class="modal-title" id="myModalLabel" style="margin: 0 auto">常见问题</h4>
          </div>
          <div class="modal-body">
            1.Q:为什么销售履历查询有时候非常慢？<br>
            A:销售履历数据由网站自行存储且数据量比较庞大，目前重点优化的查询有物品名关键词(或id)、日期、购买者以及区服筛选，数据并不分区服存储，所以查询效率往往是中国>服务器>大区。大部分情况下查询结果的总数会缓存以加快后续第二次查询。如果确实有未优化的查询需求可使用https://www.ff14pvp.top(主域名容易超时)并结合刚刚新增的销售履历导出功能<br>
            2.Q:实时物价近期速度不太稳定？<br>
            A:基于统计的线路优化逻辑刚刚更新，近期应该会改善。如果是手机使用WI-FI浏览可开启数据网络加速，具体开启方式各个手机品牌不同，例如小米手机位于设置-WLAN-网络加速：<br>
            <img src="/network.jpg" alt="手机设置网络加速" loading="lazy" width="340" height="297"><br>
            3.Q:为什么只有QQ登录？<br>
            A:QQ微信等第三方登录实现简单，无需自行开发防脚本逻辑，无需验证码邮箱手机号。QQ登录过程网站只能获取到昵称头像等可以临时生成的信息<br>
            4.Q:登陆后就只有收藏夹一个新增功能吗？<br>
            A:不是的，计划是一个用户可以有多个收藏夹，可批量查价或者计算成本这些，但尚未开发完成
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-dismiss="modal" @click="closeAnswer()" type="button"><i
                class="bi bi-power"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
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
                2023年2月15日
              </h6>
              <span style="font-size: smaller">
                1.物品查询页面：查看配方时点击物品名可打开新标签页查询该物品的详情<br>
                2.实时物价页面：清空筛选条件按钮合并为一个按钮，位于顶部
            </span>
            </div>
            <br>
            <div>
              <h6>
                2024年2月17日
              </h6>
              <span style="font-size: smaller">
                1.新增<a href="/luoweina.jpg">微信小程序</a>版本<br>
                2.新增<a href="https://www.ff14pvp.top/package/LuoWeiNaV1.1.0.apk">安卓app</a>版本。
            </span></div>
            <br>
            <div>
              <h6>
                2024年2月23日
              </h6>
              <span style="font-size: smaller">
                1.安卓app已经用纯原生重写，无任何第三方SDK，包体很小
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

.container1 {
  display: flex;
  align-items: center;
  justify-content: center;
}

.top-button {

  margin: 0 6px;
}

.dropdown-item.active, .dropdown-item:active, .btn-secondary, .btn-info {
  text-decoration: none;
  border-radius: 0 !important;
  color: #343a40;
  border-color: #343a40;
  background-color: white;
}

.page-link {
  text-decoration: none;
  border-radius: 0 !important;
  color: black;
  border-color: rgb(86, 61, 124);
  background-color: white;

}

.page-item.active .page-link {
  z-index: 3;
  color: white;
  border-color: rgb(86, 61, 124);
  background-color: rgb(86, 61, 124);
}

.n-link-style {
  color: white !important;
  text-decoration: none;
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
    }, answer() {
      $('#answer').modal('show');
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
    },
    closeAnswer() {
      $('#answer').modal('toggle');
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