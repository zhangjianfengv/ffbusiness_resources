<template>
  <div id="app">
    <b-form inline id="itemForm">
      <div class="input-wrapper">
        <b-form-input autocomplete="off" v-model="itemName" placeholder="物品名或者物品ID" value=""
                      @keyup.enter="searchItem"></b-form-input>
        <b-form-select class="select-options" v-model="selectedValue" v-if="showOptions" @blur="hideSelect"
                       @change="hideSelect">
          <option v-for="option in nameOptions" :value="option" :key="option">{{ option }}</option>
        </b-form-select>
      </div>
      <b-form-input class="form-control" v-model="levelEquip" placeholder="等级" type="text" value=""></b-form-input>
      <b-form-input class="form-control" v-model="levelItem" placeholder="品级" type="text" value=""></b-form-input>
      <b-form-input class="form-control" id="description" placeholder="描述" type="text" value=""></b-form-input>
      <bt-select v-model="itemTypes" ref="typeSelect" id="itemType">
      </bt-select>
      <b-form-checkbox v-model="canMake" style="margin: 5px 9px" value="true" unchecked-value="false"
                       @change="searchItem()">
        可制作
      </b-form-checkbox>
      <b-form-checkbox v-model="gil" style="margin: 5px 9px" value="1" unchecked-value="0"
                       @change="searchItem()">
        金币购买
      </b-form-checkbox>
      <b-form-checkbox v-model="canGather" style="margin: 5px 9px" value="true" unchecked-value="false"
                       @change="searchItem()">
        可采集
      </b-form-checkbox>
      <b-form-checkbox v-model="canBeHq" style="margin: 5px 9px" value="true" unchecked-value="false"
                       @change="searchItem()">
        高品质
      </b-form-checkbox>
      <b-form-checkbox v-model="trade" style="margin: 5px 9px" value="true" unchecked-value="false"
                       @change="searchItem()">
        可出售
      </b-form-checkbox>
      <b-button squared variant="outline-dark" @click="searchItem()" type="button"><i class="bi bi-search"></i>
      </b-button>
      <b-button squared variant="outline-dark" class="mx-1" @click="resetQueryParams()"
                type="button"><i class="bi bi-arrow-clockwise"></i></b-button>
      <transition name="fade">
        <div class="message text-primary" v-if="showMessage">{{ message }}</div>
      </transition>
    </b-form>
    <div>
      <BootstrapTable id="table"
                      ref="table"
                      :columns="columns"
                      :options="options"
                      @on-post-body="vueFormatterPostBody"/>
    </div>
    <div aria-hidden="true" class="modal fade" id="recipeModal" role="dialog" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" style="margin: 0 auto" id="recipeLabel"></h4>
          </div>
          <div class="modal-body recipe">
            <ul id="recipeTree">
              <ul id="demo">
                <Tree
                    class="item"
                    :item="treeData"
                ></Tree>
              </ul>
            </ul>
            <div id="recipeList">
              <b-form-select v-model="worldName" id="worldName" @change="changeWorld">
                <b-form-select-option value="陆行鸟" style="font-weight: bold;font-style: italic;">陆行鸟
                </b-form-select-option>
                <b-form-select-option value="拉诺西亚">拉诺西亚</b-form-select-option>
                <b-form-select-option value="幻影群岛">幻影群岛</b-form-select-option>
                <b-form-select-option value="神意之地">神意之地</b-form-select-option>
                <b-form-select-option value="萌芽池">萌芽池</b-form-select-option>
                <b-form-select-option value="红玉海">红玉海</b-form-select-option>
                <b-form-select-option value="宇宙和音">宇宙和音</b-form-select-option>
                <b-form-select-option value="沃仙曦染">沃仙曦染</b-form-select-option>
                <b-form-select-option value="晨曦王座">晨曦王座</b-form-select-option>
                <b-form-select-option value="猫小胖" style="font-weight: bold;font-style: italic;">猫小胖
                </b-form-select-option>
                <b-form-select-option value="紫水栈桥">紫水栈桥</b-form-select-option>
                <b-form-select-option value="摩杜纳">摩杜纳</b-form-select-option>
                <b-form-select-option value="海猫茶屋">海猫茶屋</b-form-select-option>
                <b-form-select-option value="琥珀原">琥珀原</b-form-select-option>
                <b-form-select-option value="静语庄园">静语庄园</b-form-select-option>
                <b-form-select-option value="延夏">延夏</b-form-select-option>
                <b-form-select-option value="柔风海湾">柔风海湾</b-form-select-option>
                <b-form-select-option value="莫古力" style="font-weight: bold;font-style: italic;">莫古力
                </b-form-select-option>
                <b-form-select-option value="梦羽宝境">梦羽宝境</b-form-select-option>
                <b-form-select-option value="旅人栈桥">旅人栈桥</b-form-select-option>
                <b-form-select-option value="白银乡">白银乡</b-form-select-option>
                <b-form-select-option value="白金幻象">白金幻象</b-form-select-option>
                <b-form-select-option value="拂晓之间">拂晓之间</b-form-select-option>
                <b-form-select-option value="神拳痕">神拳痕</b-form-select-option>
                <b-form-select-option value="龙巢神殿">龙巢神殿</b-form-select-option>
                <b-form-select-option value="潮风亭">潮风亭</b-form-select-option>
                <b-form-select-option value="豆豆柴" style="font-weight: bold;font-style: italic;">豆豆柴
                </b-form-select-option>
                <b-form-select-option value="银泪湖">银泪湖</b-form-select-option>
                <b-form-select-option value="伊修加德">伊修加德</b-form-select-option>
                <b-form-select-option value="红茶川">红茶川</b-form-select-option>
                <b-form-select-option value="太阳海岸">太阳海岸</b-form-select-option>
                <b-form-select-option value="水晶塔">水晶塔</b-form-select-option>
                <b-form-select-option selected value="中国" style="font-weight: bold;font-style: italic;">中国
                </b-form-select-option>
              </b-form-select>
              <b-form-input id="sb-inline" class="mt-1" v-model="craftCount" type="number" inline></b-form-input>
              <ul style="padding-left: 0">
                <li style="list-style-type:none" v-for="(value, key) in materials">{{ key }}*{{
                    value.num * craftCount
                  }}个*{{
                    value.price
                  }}({{ value.worldName }})={{ value.num * value.price * craftCount }}
                  <span @click="deleteItem(key)"><i class="bi bi-x-square"></i></span>
                </li>
              </ul>
              <span>成本总计{{
                  (this.errorText === '' || !this.errorText) ? (this.singeCost * craftCount) : '（某个材料无在售，请尝试切换至大区）'
                }}</span>
            </div>
          </div>
          <div id="loading-indicator" class="text-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-dismiss="modal" @click="closeRecipe" type="button"><i
                class="bi bi-power"></i></button>
          </div>
        </div>
      </div>
    </div>
    <div aria-hidden="true" class="modal fade" id="sourceModal" role="dialog" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" style="margin: 0 auto" id="sourceLabel"></h4>
          </div>
          <div class="modal-body">
            <BootstrapTable id="sourceTable"
                            ref="sourceTable"
                            @on-post-body="vueFormatterPostBody"/>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-dismiss="modal" @click="closeSource" type="button"><i
                  class="bi bi-power"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div aria-hidden="true" class="modal fade" id="gatherModal" role="dialog" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" style="margin: 0 auto" id="gatherLabel"></h4>
          </div>
          <div class="modal-body" style="text-align: center">
            当前艾欧泽亚时间：&nbsp;<b>{{ ETStr }}</b><br><br>
            <BootstrapTable id="gatherTable"
                            ref="gatherTable"
                            @on-post-body="vueFormatterPostBody"/>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-dismiss="modal" @click="closeGather" type="button"><i
                  class="bi bi-power"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div aria-hidden="true" class="modal fade" id="previewModal" role="dialog" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" style="margin: 0 auto" id="previewLabel">物品预览</h4>
          </div>
          <div class="modal-body" style="text-align: center">
            <img class="previewItem" :src="currentPreview"
                 alt="莫古用力找也找不到照片库啵!"
                 v-on:error="handleImageError">
            <div class="modal-footer">
              <button class="btn btn-secondary" data-dismiss="modal" @click="closePreview" type="button"><i
                  class="bi bi-power"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div aria-hidden="true" aria-labelledby="summaryTable1" class="modal fade" id="summaryModal1" role="dialog"
         tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" style="margin: 0 auto" id="SummaryLabel1"></h4>
          </div>
          <div class="modal-body">
            <div>
              <b-form-select class="modal-select" v-model="summaryScale" :options="summaryOptions"
                             @change="changeSummaryScale(summaryScale)"></b-form-select>
            </div>
            <LineChart v-if="loaded" :chart-data="chartData"/>
            <BarChart v-if="loaded" :chart-data="chartData1"/>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-dismiss="modal" @click="closeSummaryTable()" type="button"><i
                class="bi bi-power"></i></button>
          </div>
        </div>
      </div>
    </div>
    <div style="text-align:center;color: #bbb;font-size: 12px;text-decoration: none;">
      本站基础物品数据来源于&nbsp;<a style="text-align:center;color: #bbb;font-size: 12px;text-decoration: none;"
                                     href="https://github.com/thewakingsands/" target="_blank">肥肥咖啡</a>&nbsp;和&nbsp;<a
        style="text-align:center;color: #bbb;font-size: 12px;text-decoration: none;"
        href="https://garlandtools.cn/db/" target="_blank">花环数据库</a>&nbsp;© 2024 SQUARE ENIX CO., LTD.
      All Rights Reserved.
    </div>
    <b-modal ref="m-sm" ok-only size="sm" title="提示">复制isearch指令成功</b-modal>
  </div>
</template>
<style>
</style>
<style scoped>
.previewItem {
  width: 100%;
}
</style>
<script>
import tableMixin from '../mixins/table'
import $ from "jquery";
import Tree from "@/components/Tree.vue";
import Base64 from "@/plugins/base64.js";
import moment from "moment/moment.js";
import BarChart from "@/components/BarChart.vue";
import LineChart from "@/components/LineChart.vue";

let query = {};
export default {
  components: {LineChart, BarChart, Tree},
  mixins: [tableMixin],
  props: ['themeColor'],
  watch: {
    itemName: function (newValue) {
      const vm = this;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (this.isStr(newValue)) {
          $.ajax({
            url: "/ffbusiness/itemNew/suggestName",
            async: true,
            method: "post",
            contentType: "application/json",
            data: JSON.stringify({name: this.itemName, all: true}),
            success: function (data) {
              if (data) {
                if (data.length > 1) {
                  vm.showOptions = true;
                  vm.nameOptions = data;
                } else if (data.length === 1) {
                  vm.showOptions = false;
                  vm.itemName = data[0];
                } else vm.showOptions = false;
              } else vm.showOptions = false;
            }
          });
        }
      }, 500);
    },
  },
  data() {
    let query = {};
    let columns = [{
      field: 'id',
      title: 'id'
    }, {
      formatter: (value, row) => {
        let url = "https://static.ff14pvp.top/icon/icon/" + row.id + '.png';
        return '<img src="' + url + '" width="32" height="32" alt="&nbsp;&nbsp;&nbsp;&nbsp;">';
      },
      title: '图标'
    }, {
      field: 'name',
      formatter: (value, row) => {
        let template = '<span>' + row.name + '&nbsp;<img src="/isearch.png" alt="isearch" height="20px" @click="copyIsearch(row)"/>&nbsp;<i id="cli' + row.id + '" @click="copyText(row)" class="bi bi-clipboard"></i>&nbsp;' +
            '<a href="https://ff14.huijiwiki.com/wiki/%E7%89%A9%E5%93%81:' + value + '"><i class="bi bi-wikipedia"></i></a></span>';
        return this.vueFormatter({
          template: template,
          data: {row},
          methods: {
            copyText: this.copyText,
            copyIsearch: this.copySearch,
          }
        })
      },
      title: '名称'
    }, {
      field: 'description',
      title: '描述'
    }, {
      field: 'levelEquip',
      title: '等级'
    }, {
      field: 'levelItem',
      title: '品级'
    }, {
      field: 'stackSize',
      title: '堆叠'
    }, {
      field: 'job',
      title: '职业',
      formatter: (value) => {
        if (value === '冒险者') {
          return ''
        } else return value;
      }
    },
      {
        field: 'itemType',
        title: '分类'
      },
      {
        field: 'canBeHq',
        title: '高品质',
        formatter: (value) => {
          return value === false ? '' : '✔'
        }
      }, {
        field: 'isUnique',
        title: '独占',
        formatter: (value) => {
          return value === true ? '✔' : ''
        }
      }, {
        field: 'isCrestWorthy',
        title: '珍稀',
        formatter: (value) => {
          return value === true ? '✔' : ''
        }
      }, {
        field: 'isUntradable',
        title: '可出售',
        formatter: (value) => {
          return value === false ? '✔' : ''
        }
      }, {
        field: 'isDyeable',
        title: '可分解',
        formatter: (value) => {
          return value === true ? '✔' : ''
        }
      },
      {
        title: '家具预览',
        align: 'center',
        formatter: (value, row) => {
          if (row.preview) {
            let template = '<b-button  squared variant="outline-dark" @click="seeGather(row)"><i class="bi bi-image"></i></b-button>';
            return this.vueFormatter({
              template: template,
              data: {row},
              methods: {
                seeGather: this.seePreview
              }
            })
          } else return '';
        }
      }, {
        field: 'gather',
        title: '采集',
        align: 'center',
        formatter: (value, row) => {
          if (row.gatherCount > 0 && !row.recipeCount && !row.isDyeable) {
            let template = '<b-button  squared variant="outline-dark" @click="seeGather(row)"><i class="bi bi-snow2"></i></b-button>';
            return this.vueFormatter({
              template: template,
              data: {row},
              methods: {
                seeGather: this.seeGather
              }
            })
          } else return '';
        }
      }, {
        field: 'guYuan',
        title: '雇员筹集',
        align: 'center',
        formatter: (value) => {
          switch (value) {
            case 0:
              return '';
            case 1:
              return '捕鱼人';
            case 2:
              return '战斗精英/魔法导师';
            case 3:
              return '采矿工';
            case 4:
              return '园艺工';
          }
        }
      },
      {
        title: 'NPC购买兑换',
        align: 'center',
        formatter: (value, row) => {
          if (row.npcTrade) {
            let template = '<b-button  squared variant="outline-dark" @click="seeSource(row)"><i class="bi bi-shop"></i></b-button>';
            return this.vueFormatter({
              template: template,
              data: {row},
              methods: {
                seeSource: this.seeSource
              }
            })
          } else return '';
        }
      },
      {
        title: '趋势图',
        width: 100,
        formatter: (value, row) => {
          let template = '';
          if (row.isUntradable === false)
            template = '<b-button  squared variant="outline-dark" @click="clickRow(row)"><i class="bi bi-database"></i></b-button>';
          return this.vueFormatter({
            template: template,
            data: {row},
            methods: {
              clickRow: this.openSummary
            }
          })
        }
      }
      ,
      {
        title: '查看配方',
        formatter: (value, row) => {
          if (row.craft) {
            let template = '<b-button  squared variant="outline-dark" @click="clickRow(row)"><i class="bi bi-receipt-cutoff"></i></b-button>';
            return this.vueFormatter({
              template: template,
              data: {row},
              methods: {
                clickRow: this.openRecipe
              }
            })
          } else return '';
        }
      }, {
        title: '材料成本计算',
        formatter: (value, row) => {
          if (row.craft) {
            let template = '<b-button  squared variant="outline-dark" @click="clickRow(row)"><i class="bi bi-calculator"></i></b-button>';
            return this.vueFormatter({
              template: template,
              data: {row},
              methods: {
                clickRow: this.openList
              }
            })
          } else return '';
        }
      }];
    const vm = this;
    let color = this.themeColor;
    let options = {
      url: '/ffbusiness/itemNew/realData',
      pagination: "true",
      sidePagination: "server",
      method: 'post',
      contentType: "application/json",
      queryParamsType: '',
      queryParams: function (params) {
        query.pageSize = params.pageSize;
        query.pageNumber = params.pageNumber;
        query.id = vm.$route.query.id ? vm.$route.query.id : null;
        return query
      },
      pageNumber: 1,
      pageSize: 15,
      toolbar: '#itemForm',
      itemTypes: [],
      mobileResponsive: true,
      paginationUseIntermediate: true,
      paginationSuccessivelySize: 1,
      paginationPagesBySide: 1,
      checkOnInit: true,
      itemTypeOptions: [],
      onAll: function () {
        const otherLinks = document.querySelectorAll('.page-link');
        if (otherLinks) {
          otherLinks.forEach(link => {
            link.style.textDecoration = 'none';
            link.style.borderRadius = '0 !important';
            link.style.color = 'black';
            link.style.borderColor = color;
            link.style.backgroundColor = 'white';
          });
        }
        const active = document.querySelector('.pagination .page-item.active .page-link');
        if (active) {
          active.style.color = 'white';
          active.style.borderColor = color;
          active.style.backgroundColor = color;
        }
      },
      pageList: [50, 100, 200, 500, 1000]
    };
    return {
      worldName: '中国',
      columns: columns,
      options: options,
      nameOptions: [],
      singeCost: 0,
      itemName: null,
      itemId: this.$route.query.id,
      trade: null,
      timer: null,
      canBeHq: null,
      canMake: null,
      defaultUrl: 'https://sta2.ff14pvp.top/preview/',
      currentPreview: 'https://static.ff14pvp.top/icon/icon/placeholder.png',
      levelItem: null,
      levelEquip: null,
      gil: null,
      canGather: null,
      materials: [],
      copyIcon: 'clipboard',
      craftCount: 1,
      errorText: '',
      itemTypes: [],
      treeData: {},
      chartData: {},
      searchText: null,
      chartData1: {},
      summaryScale: '7',
      summaryItemId: null,
      summaryOptions: [
        {value: '3', text: '3天'},
        {value: '7', text: '7天'},
        {value: '15', text: '15天'},
        {value: '30', text: '30天'},
        {value: '90', text: '90天'},
        {value: '360', text: '360天'},
        {value: 'all', text: '所有时间'}
      ],
      message: '复制成功!',
      showMessage: false,
      tempItemId: 0,
      ETStr: '00:00',
      selectedValue: '',
      currentIntervalId: 0,
      showOptions: false
    }
  },
  activated() {
    const vm = this;
    const worldCookie = this.$cookies.get('world');
    if (this.isStr(worldCookie)) {
      this.worldName = Base64.decode(worldCookie);
    } else this.worldName = "中国";
    let id = this.$route.query.id
    if (id) {
      $.ajax({
        url: "/ffbusiness/itemNew/getOne",
        async: true,
        method: "post",
        contentType: "application/json",
        data: JSON.stringify({id: parseInt(id.toString())}),
        success: function (data) {
          vm.itemName = data.rows[0].name;
          vm.itemId = id;
        }
      });
    }
    this.searchItem();
    this.itemId = null;
  },
  methods: {
    searchItem() {
      let $table = $('#table');
      $table.bootstrapTable('destroy');
      let checkNumber1 = this.checkNumber(this.itemName);
      query = {
        id: checkNumber1 ? parseInt(this.itemName) : this.$route.query.id ? this.$route.query.id : null,
        name: checkNumber1 ? null : this.itemName,
        description: $('#description').val(),
        itemUICategory: $('#itemUICategory').val(),
        levelItem: this.levelItem,
        levelEquip: this.levelEquip,
        itemTypes: this.itemTypes,
        isUntradable: this.trade !== 'true',
        currencyId: this.gil === '1' ? this.gil : null,
        canBeHq: this.canBeHq,
        canGather: this.canGather,
        canMake: this.canMake,
      };
      this.options.columns = this.columns;
      this.options.queryParams = function (params) {
        query.pageSize = params.pageSize;
        query.pageNumber = params.pageNumber;
        return query
      }
      $table.bootstrapTable(this.options)
      this.itemId = null;
      this.showOptions = false;
    },
    resetQueryParams() {
      window.location.href = '/#/item';
      let $table = $('#table');
      $('#itemForm')[0].reset();
      $table.bootstrapTable('destroy');
      query = {};
      this.itemId = null;
      this.itemName = null;
      this.trade = 0;
      this.canBeHq = 0;
      this.gil = '0';
      this.canGather = 0;
      this.canMake = 0;
      this.levelEquip = null;
      this.levelItem = null;
      let $itemType = $('#itemType');
      $itemType.selectpicker('val', []);
      $itemType.selectpicker('refresh');
      this.options.columns = this.columns;
      $table.bootstrapTable(this.options)
      this.showOptions = false;
    },
    openRecipe(row) {
      const vm = this;
      $('#loading-indicator').show();
      $('#recipeList').hide();
      let url = "https://static.ff14pvp.top/icon/icon/" + row.id + '.png';
      $('#recipeLabel').html('<img src="' + url +
          '" decoding="async" width="32" height="32" alt="图标">' + row.name + '&nbsp;配方');
      $('#recipeModal').modal('show');
      $.ajax({
        url: "/ffbusiness/recipe/getOne", method: "post", contentType: "application/json",
        data: JSON.stringify({itemId: row.id}),
        success: function (data) {
          $('#loading-indicator').hide();
          $('#recipeTree').show();
          vm.treeData = data.tree;
          vm.showOptions = false;
        }
      });
    }, openList(row) {
      const vm = this;
      $('#loading-indicator').show();
      $('#recipeTree').hide();
      $('#recipeList').hide();
      this.craftCount = 1;
      this.tempItemId = row.id;
      let url = "https://static.ff14pvp.top/icon/icon/" + row.id + '.png';
      $('#recipeLabel').html('<img src="' + url +
          '" decoding="async" width="32" height="32" alt="图标">' + row.name + '&nbsp;材料成本计算');
      $('#recipeModal').modal('show');
      $.ajax({
        url: "/ffbusiness/recipe/cost", method: "post", contentType: "application/json",
        data: JSON.stringify({itemId: row.id, worldName: this.worldName}),
        success: function (data) {
          $('#loading-indicator').hide();
          $('#recipeList').show();
          vm.materials = data.list;
          if (data.list === null) {
            vm.errorText = 'error'
            return;
          }
          let total = 0;
          for (let item in data.list) {
            total += data.list[item].price * data.list[item].num;
          }
          vm.errorText = null;
          vm.singeCost = total;
          vm.showOptions = false;
        }
      });
    }, changeWorld() {
      const vm = this;
      $.ajax({
        url: "/ffbusiness/recipe/cost", method: "post", contentType: "application/json",
        data: JSON.stringify({itemId: this.tempItemId, worldName: this.worldName}),
        success: function (data) {
          $('#loading-indicator').hide();
          $('#recipeList').show();
          vm.materials = data.list;
          if (data.list === null) {
            vm.errorText = 'error'
            return;
          }
          let total = 0;
          for (let item in data.list) {
            total += data.list[item].price * data.list[item].num;
          }
          vm.errorText = null;
          vm.singeCost = total;
          vm.showOptions = false;
        }
      });
    }, seeSource(row) {
      $.ajax({
        url: "/ffbusiness/npcSell/list",
        async: true,
        method: "post",
        contentType: "application/json",
        data: JSON.stringify({itemId: row.id}),
        success: function (data) {
          let $sourceTable = $('#sourceTable');
          $sourceTable.bootstrapTable('destroy')
          $('#sourceModal').modal('show');
          let url = "https://static.ff14pvp.top/icon/icon/" + row.id + '.png';
          $('#sourceLabel').html('<img src="' + url +
              '" decoding="async" width="32" height="32" alt="图标">' + row.name + '&nbsp;购买兑换');
          $sourceTable.bootstrapTable({
            data: data,
            columns: [{
              formatter: (value, row) => {
                return row.npcName + (row.shopName == null ? '' : '-' + row.shopName) + (row.shopSubName == null ? '' : '-' + row.shopSubName);
              },
              title: '商人'
            }, {
              formatter: (value, row) => {
                return row.locationName + '<br/>X: ' + row.locationX + ',Y: ' + row.locationY
              },
              title: '位置'
            }, {
              formatter: (value, row) => {
                let url = "https://static.ff14pvp.top/icon/icon/" + row.currencyId + '.png';
                let s = '<img src="' + url + '" decoding="async" width="32" height="32" alt="图标">';
                return s + 'X' + row.price;
              },
              title: '消耗',
            }],
            mobileResponsive: true,
            checkOnInit: true
          });
        }
      });
      this.showOptions = false;
    },
    hideSelect() {
      this.itemName = this.selectedValue;
      this.searchItem();
    }, seeGather(row) {
      clearInterval(this.currentIntervalId);
      const vm = this;
      $.ajax({
        url: "/ffbusiness/itemGather/list",
        async: true,
        method: "post",
        contentType: "application/json",
        data: JSON.stringify({itemId: row.id}),
        success: function (data) {
          let $sourceTable = $('#gatherTable');
          $sourceTable.bootstrapTable('destroy')
          $('#gatherModal').modal('show');
          let url = "https://static.ff14pvp.top/icon/icon/" + row.id + '.png';
          $('#gatherLabel').html('<img src="' + url +
              '" decoding="async" width="32" height="32" alt="图标">' + row.name + '&nbsp;采集地点');
          let options = {
            data: data,
            columns: [{
              field: 'locationName',
              title: '地图'
            }, {
              formatter: (value, row) => {
                return 'X: ' + row.locationX + ',Y: ' + row.locationY
              },
              title: '位置'
            }, {
              field: 'type',
              formatter: (value) => {
                return !value ? '常驻' : value;
              },
              title: '类型',
            }, {
              formatter: (value, row) => {
                if (row.type && row.et1) {
                  let s;
                  s = row.et1;
                  if (row.et2)
                    s = s + ',' + row.et2;
                  return s;
                } else return '';
              },
              title: 'ET'
            }, {
              formatter: (value, row) => {
                if (row.type && row.et1) {
                  let s;
                  const currentTimeStampInSeconds = Date.now() / 1000;//需不需要math.floor?
                  const etSeconds = currentTimeStampInSeconds * 720 / 35;
                  const hours = Math.floor(etSeconds / 3600) % 24;
                  const minutes = Math.floor((etSeconds % 3600) / 60);
                  let et1 = row.et1;
                  let et2 = row.et2;
                  let diff1;
                  let diff2 = null;
                  if (et2) {
                    if (et2 && hours >= et2) {
                      et1 = et1 + ':00';
                      et2 = et2 + ':00';
                      diff1 = vm.timeDifferenceInSeconds('24:00', hours + ':' + minutes) + vm.timeDifferenceInSeconds('00:00', et1);
                      diff2 = vm.timeDifferenceInSeconds('24:00', hours + ':' + minutes) + vm.timeDifferenceInSeconds('00:00', et2);
                    } else if (hours >= et1) {
                      et1 = et1 + ':00';
                      et2 = et2 + ':00';
                      diff1 = vm.timeDifferenceInSeconds('24:00', hours + ':' + minutes) + vm.timeDifferenceInSeconds('00:00', et1);
                      diff2 = vm.timeDifferenceInSeconds(et2, hours + ':' + minutes);
                    } else {
                      et1 = et1 + ':00';
                      et2 = et2 + ':00';
                      diff1 = vm.timeDifferenceInSeconds(et1, hours + ':' + minutes);
                      diff2 = vm.timeDifferenceInSeconds(et2, hours + ':' + minutes);
                    }
                  } else {
                    if (hours >= et1) {
                      et1 = et1 + ':00';
                      diff1 = vm.timeDifferenceInSeconds('24:00', hours + ':' + minutes) + vm.timeDifferenceInSeconds('00:00', et1);
                    } else {
                      et1 = et1 + ':00';
                      diff1 = vm.timeDifferenceInSeconds(et1, hours + ':' + minutes);
                    }
                  }
                  if (diff1) s = '距离' + et1 + '还有' + Math.floor(diff1 * 35 / 720 / 60) + '分' + Math.floor((diff1 * 35 / 720) % 60) + '秒<br/>'
                  if (diff2) s = s + '距离' + et2 + '还有' + Math.floor(diff2 * 35 / 720 / 60) + '分' + Math.floor((diff2 * 35 / 720) % 60) + '秒<br/>'
                  return s;
                } else return '';
              },
              title: '采集时间'
            }],
            mobileResponsive: true,
            checkOnInit: true
          };
          $sourceTable.bootstrapTable(options);
          vm.currentIntervalId = setInterval(function () {
            $sourceTable.bootstrapTable('refreshOptions', options);
          }, 1000);
        }
      });
      this.showOptions = false;
    }, seePreview(row) {
      fetch('/ffbusiness/itemNew/furniture/' + row.id)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            this.currentPreview = this.defaultUrl + data.icon + '.jpg?v=1';
            $('#previewModal').modal('show');
          })
          .catch(error => {
            console.error('Error fetching items:', error);
          });
    },
    timeToSeconds(time) {
      const parts = time.split(':');
      const hours = parseInt(parts[0]);
      const minutes = parseInt(parts[1]);
      return hours * 3600 + minutes * 60;
    },
    timeDifferenceInSeconds(time1, time2) {
      var seconds1 = this.timeToSeconds(time1);
      var seconds2 = this.timeToSeconds(time2);
      return Math.abs(seconds1 - seconds2);
    },
    handleChildClick() {
      this.closeRecipe();
      this.itemName = localStorage.getItem('recipeId');
      let $table = $('#table');
      $table.bootstrapTable('destroy');
      query = {
        id: parseInt(this.itemName)
      };
      this.options.columns = this.columns;
      this.options.queryParams = function (params) {
        query.pageSize = params.pageSize;
        query.pageNumber = params.pageNumber;
        return query
      }
      $table.bootstrapTable(this.options)
      this.itemId = null;
      this.showOptions = false;
    },
    eorzeaTime() {
      const currentTimeStampInSeconds = Date.now() / 1000;//需不需要math.floor?
      const etSeconds = currentTimeStampInSeconds * 720 / 35;
      const hours = Math.floor(etSeconds / 3600) % 24;
      const minutes = Math.floor((etSeconds % 3600) / 60);
      this.ETStr = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
    },
    isStr(val) {
      return val !== null && val !== undefined && val !== '' && val.replace(/(^s*)|(s*$)/g, "").length !== 0;
    },
    deleteItem(key) {
      this.$delete(this.materials, key);
      let total = 0;
      for (let item in this.materials) {
        total += this.materials[item].price * this.materials[item].num;
      }
      this.singeCost = total;
    },
    handleImageError(event) {
      if (event.target.src.startsWith(this.defaultUrl))
        event.target.src = event.target.src.replace(this.defaultUrl, 'https://sta2.ff14pvp.top/lpreview/l/').replace(".jpg", '.png');
      else event.target.src = 'https://static.ff14pvp.top/icon/icon/placeholder.png'
    },
    copyText(row) {
      this.replaceElementClass('cli' + row.id)
      const element = document.createElement('textarea')
      element.value = row.name
      element.style.width = '0'
      element.style.height = '0'
      element.style.opacity = '0'
      element.style.position = 'absolute'
      document.body.appendChild(element)
      element.select();
      element.setSelectionRange(0, 99999); // 适配 iOS
      const success = document.execCommand('copy')
      if (!success) {
        prompt('请手动复制以下内容', row.name)
      }
      document.body.removeChild(element)
    },
    copySearch(row) {
      const element = document.createElement('textarea')
      let value = '/isearch ' + row.name;
      element.value = value
      element.style.width = '0'
      element.style.height = '0'
      element.style.opacity = '0'
      element.style.position = 'absolute'
      document.body.appendChild(element)
      element.select();
      element.setSelectionRange(0, 99999); // 适配 iOS
      const success = document.execCommand('copy')
      if (!success) {
        prompt('请手动复制以下内容', value)
      }
      this.$refs['m-sm'].show()
      document.body.removeChild(element)
    },
    // 获取具有指定 id 和 class 的元素，并进行类替换
    replaceElementClass(id) {
      // 获取元素
      const element = document.getElementById(id);
      // 检查元素是否存在并且具有指定的 class
      if (element && element.classList.contains('bi-clipboard-fill')) {
        // 如果元素具有 bi-clipboard-fill 类，则替换为 bi-clipboard 类
        element.classList.remove('bi-clipboard-fill');
        element.classList.add('bi-clipboard');
      } else if (element && element.classList.contains('bi-clipboard')) {
        // 如果元素具有 bi-clipboard 类，则替换为 bi-clipboard-fill 类
        element.classList.remove('bi-clipboard');
        element.classList.add('bi-clipboard-fill');
      }
    },
    closeRecipe() {
      $('#recipeModal').modal('toggle');
    }, closePreview() {
      $('#previewModal').modal('toggle');
    },
    closeSource() {
      $('#sourceModal').modal('toggle');
    },
    checkNumber(inputValue) {
      const numberPattern = /^\d+(\.\d+)?$/;
      return inputValue && numberPattern.test(inputValue);
    },
    closeGather() {
      $('#gatherModal').modal('toggle');
    },
    openSummary(row) {
      let url = "https://static.ff14pvp.top/icon/icon/" + row.id + '.png';
      $('#SummaryLabel1').html(this.worldName + '&nbsp;<img src="' + url +
          '" decoding="async" width="32" height="32" alt="图标">' + row.name + '&nbsp;趋势')
      $('#summaryModal1').modal('show');
      this.summaryItemId = row.id;
      this.changeSummaryScale(this.summaryScale);
    },
    changeSummaryScale(scale) {
      const vm = this;
      let format = "yyyyMMDD";
      $.ajax({
        url: "/ffbusiness/summary/query", method: "post",
        data: JSON.stringify({
          itemId: vm.summaryItemId,
          startDate: scale === "all" ? '20230209' : moment().subtract(parseInt(scale), 'days').format(format),
          endDate: moment().format(format),
          worldName: vm.worldName
        }),
        contentType: "application/json", success: function (data) {
          let labels = data.dates;
          let realLabels = [];
          for (let l of labels) {
            realLabels.push(moment(l).subtract(1, "days").format(format));//因为后端日期总是加一天
          }
          let priceData = data.values[0].value;
          vm.chartData = {
            labels: realLabels,
            datasets: [
              {
                label: '均价',
                backgroundColor: '#df9ba1',
                data: priceData
              }
            ]
          };
          vm.loaded = true;
          vm.chartData1 = {
            labels: realLabels,
            datasets: [
              {
                label: '售出数',
                backgroundColor: '#5ba585',
                data: data.values[1].value
              }
            ]
          };
          vm.loaded = true;
        }
      });
    },
    closeSummaryTable() {
      $('#summaryModal1').modal('toggle');
    }
  },
  mounted() {
    this.eorzeaTime();
    setInterval(this.eorzeaTime, 1000);
    $('#itemType').selectpicker();
    $.ajax({
      url: "/ffbusiness/itemType/all", method: "post", contentType: "application/json", success: function (data) {
        this.options = data;
      }
    });
    const worldCookie = this.$cookies.get('world');
    if (this.isStr(worldCookie)) {
      this.worldName = Base64.decode(worldCookie);
    } else this.worldName = "中国";
    window.addEventListener('storage', (event) => {
      if (event.key === 'recipeId') {
        this.handleChildClick();
      }
    });
  }
}
</script>