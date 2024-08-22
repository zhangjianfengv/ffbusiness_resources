<template>
  <div>
    <div id="app">
      <b-navbar id="navbar" toggleable="sm" type="dark">
        <b-navbar-brand href="/">罗薇娜的手抄本</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/history" exact-path exact-active-class="active">销售履历</b-nav-item>
            <b-nav-item to="/marketable" exact-path exact-active-class="active">市场统计</b-nav-item>
            <b-nav-item to="/current" exact-path exact-active-class="active">实时物价</b-nav-item>
            <b-nav-item to="/batch" exact-path exact-active-class="active">批量物价</b-nav-item>
            <b-nav-item to="/my" exact-path exact-active-class="active">我的关注</b-nav-item>
            <b-nav-item to="/item" exact-path exact-active-class="active">物品来源和成本</b-nav-item>
            <b-nav-item to="/furniture" exact-path exact-active-class="active">家具预览</b-nav-item>
            <b-nav-item to="/bench" exact-path exact-active-class="active">7.0基准测试</b-nav-item>
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
              <a class="top-button n-link-style" href="https://www.ff14pvp.top/package/LuoWeiNaV2.1.0.apk"><i
                  class="bi bi-android"></i></a>
              <a class="top-button n-link-style"
                 href="/luoweina.jpg"
                 id="linkWithHiddenText"
                 target="_blank"><img v-b-tooltip.hover title="小程序" width="25px"
                                      height="25px"
                                      src="/favicon324c17f2.ico" alt="小程序"></a></div>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-container fluid class="text-with-border  defineFont">
              艾&nbsp;{{ ETStr }}&nbsp;
            </b-container>
            <b-nav-item right>
              <b-img :src="imageUrl" fluid alt="icon"
                     width="32px" height="32px" class="rounded-circle"></b-img>
            </b-nav-item>
            <b-dropdown id="dropdown-form" :text="user.nickname+'，欢迎您！'" ref="dropdown" class="m-2">
              <b-dropdown-item><em>{{ user.nickname }}</em></b-dropdown-item>
              <b-dropdown-form>
                <b-form-group label-for="dropdown-form-email" @submit.stop.prevent>
                  <b-form-input label="主题" id="themeColor" v-model="themeColor" type="color"
                                @change="applyColor"></b-form-input>
                </b-form-group>
              </b-dropdown-form>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item-button @click="logOut">退出登录</b-dropdown-item-button>
            </b-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <keep-alive exclude="current">
      <router-view :themeColor="themeColor">
      </router-view>
    </keep-alive>
    <div aria-hidden="true" aria-labelledby="answer" class="modal fade" id="answer" role="dialog" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content" style="max-width: 380px">
          <div class="modal-header">
            <h4 id="myModalLabel1" class="modal-title" style="margin: 0 auto">常见问题</h4>
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
            <br>
            5.Q:安卓app无法打开/功能异常/未包含更新笔记提到的功能？<br>
            A:请重新下载安装<br>
            6.Q:统计数据和预期不太一致？<br>
            A:每日统计周期为当天8:15至次日8:15，数据每日均会增补，对于服务器均价取中位数，对于大区及跨区则取平均数。
          </div>
          <div>
            <b-alert show variant="info">
              <h4 class="alert-heading">使用技巧</h4>
              <ul>
                <li>
                  如果需要查询国服尚未更新的国际服物品价格及配方等数据，可在物品详情和成本页面查询，最后一页开始为按照id排序的国际服物品，支持过滤'可出售'等等属性，此页面的英文物品名可以直接用于其他页面的搜索
                </li>
                <li>
                  各个页面均不需要输入完整物品名即可进行关键词查询
                </li>
                <li>
                  网站绝大部分页面均适配手机端浏览
                </li>
                <li>
                  物品名可直接输入拼音，不区分大小写
                </li>
                <li>
                  登录区有切换主题配色功能
                </li>
                <li>
                  若市场统计页面无法搜索到物品，可在物品详情和成本查看物品趋势图，此页面的趋势图不过滤数据
                </li>
                <li>
                  黑话检索-输入指定快捷短语会出现关键词列表，选择关键词后会出现实际的可选物品列表（当只有一个选项时会自动填入输入框）：<br>①"g"=藏宝图<br>"g10"=陈旧的瞪羚革地图<br>以此类推(绿图="g0")<br>②"f"=时装（富婆衣）<br>③"t"=各种头花<br>
                </li>
              </ul>
            </b-alert>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-dismiss="modal" @click="closeAnswer()" type="button"><i
                class="bi bi-power"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <b-modal v-model="showModal" hide-footer @hidden="modalHidden">
        <template #modal-title>
          <span>欢迎回来！🎇🎇🎇</span>
        </template>
        <div>
          <p>网站已经更新，以下是更新内容：</p>
          <ul>
            <li>新增批量查询物价页面</li>
            <li>市场统计页面新增交易额指标</li>
          </ul>
        </div>
      </b-modal>
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
              <h6 style="padding-left: 16px">
                2024年8月9日
              </h6>
              <ul style="font-size: smaller;padding-left: 16px">
                <li><u>批量物价</u>页面需求数量可调整，修改数量后需求金额和总计金额会自动重新计算
                </li>
              </ul>
            </div>
            <div>
              <h6 style="padding-left: 16px">
                2024年8月20日
              </h6>
              <ul style="font-size: smaller;padding-left: 16px">
                <li><u>销售履历</u>页面表格“收藏”列点击按钮可进行新建/删除收藏夹、往各个收藏夹增删物品的操作，一个用户可以有多个收藏夹，未添加此项功能之前已经收藏的物品已经保存至“默认收藏夹”
                </li>
                <li><u>我的关注</u>页面可进行切换收藏夹，查询不同的收藏夹的物品价格的操作
                </li>
              </ul>
            </div>
            <div>
              <h6 style="padding-left: 16px">
                2024年8月22日
              </h6>
              <ul style="font-size: smaller;padding-left: 16px">
                <li><u>市场统计</u>页面新增"交易额"指标(预计9月1日才能全部更新)</li>
                <li><u>市场统计</u>页面趋势图新增360天时间范围</li>
                <li><u>家具预览</u>页面新增房屋抽选提醒</li>
              </ul>
            </div>
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

.modal-select {
  width: 80px;
}

.input-wrapper {
  width: auto; /* 在PC上默认宽度 */
}

/* 在小屏幕设备上（例如移动设备）设置输入框宽度为100% */
@media only screen and (max-width: 768px) {
  .input-wrapper {
    width: 100%;
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

.n-link-style {
  color: white !important;
  text-decoration: none;
}

.black-link-style {
  color: #212529 !important;
  text-decoration: underline;
}

.input-wrapper {
  position: relative;
}

.defineFont {
  font-family: '楷体', Arial, '华文仿宋', '微软雅黑', 'Microsoft YaHei', '宋体', SimSun, '思源宋体', 'Source Han Serif', '方正兰亭黑体', 'FZLanTingHei-R-GBK', '华文黑体', STHeiti, 'Noto Sans CJK', Helvetica, sans-serif;
}

.text-with-border {
  width: fit-content; /* 让容器宽度根据文本内容自适应 */
  color: white;
  padding-right: 0;
  font-weight: bold; /* 设置加粗样式 */
}

.select-options {
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  width: 100%;
  z-index: 1000; /* 保证选择框在最顶层 */
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
      user: {nickname: '用户'},
      showModal: false,
      ETStr: '',
      themeColor: (localStorage.getItem('themeColor') || '#563d7c')
    }
  },
  computed: {
    imageUrl() {
      let s = this.user.figureQQ;
      if (s)
        return s.replace(/http:\/\//g, "https://");
      else return 'https://static.ff14pvp.top/icon/icon/placeholder.png';
    },
  },
  methods: {
    note() {
      $('#note').modal('show');
    },
    answer() {
      $('#answer').modal('show');
    }, applyColor() {
      const currentColor = this.themeColor;
      const navbar = document.querySelectorAll('#navbar');
      const dropDown = document.querySelectorAll('#dropdown-form');
      const form = document.querySelectorAll('#dropdown-form__BV_toggle_');
      form.forEach(function (element) {
        element.style.color = 'white';
        element.style.borderColor = currentColor;
        element.style.backgroundColor = currentColor;
      });
      navbar.forEach(link => {
        link.style.backgroundColor = currentColor;
        link.style.boxShadow = '0 .5rem 1rem rgba(0, 0, 0, .05), inset 0 -1px 0 rgba(0, 0, 0, .1)';
      });
      dropDown.forEach(link => {
        link.style.backgroundColor = currentColor;
      });
      localStorage.setItem('themeColor', currentColor);
    },
    toLogin() {
      QC.Login.showPopup({
        appId: Base64.decode("MTAyMDc1MDIx"),
        redirectURI: Base64.decode("aHR0cHMlM0ElMkYlMkZ3d3cuZmYxNHB2cC50b3AlMkZhcGklMkZvYXV0aCUyRnFxJTJGY2FsbGJhY2s=")
      });
    },
    modalHidden() {
      localStorage.setItem('hideModal0', 'true');
    },
    logOut() {
      window.location.href = window.location.origin + '/ffbusiness/user/logOut';
    },
    closeNote() {
      $('#note').modal('toggle');
    },
    eorzeaTime() {
      const currentTimeStampInSeconds = Date.now() / 1000;//需不需要math.floor?
      const etSeconds = currentTimeStampInSeconds * 720 / 35;
      const hours = Math.floor(etSeconds / 3600) % 24;
      const minutes = Math.floor((etSeconds % 3600) / 60);
      this.ETStr = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
    },
    closeAnswer() {
      $('#answer').modal('toggle');
    }
  },
  mounted() {
    const vm = this;
    this.eorzeaTime();
    setInterval(this.eorzeaTime, 1000);
    $.ajax({
      url: "/ffbusiness/user/current",
      method: "post",
      contentType: "application/json",
      data: JSON.stringify({}),
      success: function (data) {
        vm.user = data;
        if (!data.nickname) vm.user = {nickname: '暗之战士'};
      }
    });
    if (!localStorage.getItem('hideModal0')) {
      this.showModal = true;
    }
    let item = localStorage.getItem('themeColor');
    if (item) {
      this.themeColor = item;
    }
    this.applyColor();
  }
}
</script>

<style scoped>
body {
  padding: 0;
  margin: 0;
}
</style>