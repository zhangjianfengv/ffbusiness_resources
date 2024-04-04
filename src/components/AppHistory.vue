<template>
  <div id="app">
    <b-form inline id="queryForm" @reset="onReset">
      <div class="input-wrapper">
        <b-form-input id="nameKeyword" autocomplete="off" v-model="itemName" placeholder="关键词或物品ID"
                      value="" @keyup.enter="searchItem"></b-form-input>
        <b-form-select class="select-options" v-model="selectedValue" v-if="showOptions"
                       @change="selectChange">
          <option v-for="option in nameOptions" :value="option" :key="option">{{ option }}</option>
        </b-form-select>
      </div>
      <b-form-input v-model="buyerName" placeholder="购买者" type="text"
                    value="" :state="buyerNameState"></b-form-input>
      <b-form-input id="date" v-model="date" placeholder="日期" type="text"></b-form-input>
      <bt-select class="mx-1" :options="itemTypeOptions" v-model="itemTypes" ref="typeSelect" id="itemType">
      </bt-select>
      <b-form-select v-model="worldName" id="worldName" @change="searchItem()">
        <b-form-select-option value="陆行鸟" style="font-weight: bold;font-style: italic">陆行鸟</b-form-select-option>
        <b-form-select-option value="拉诺西亚">拉诺西亚</b-form-select-option>
        <b-form-select-option value="幻影群岛">幻影群岛</b-form-select-option>
        <b-form-select-option value="神意之地">神意之地</b-form-select-option>
        <b-form-select-option value="萌芽池">萌芽池</b-form-select-option>
        <b-form-select-option value="红玉海">红玉海</b-form-select-option>
        <b-form-select-option value="宇宙和音">宇宙和音</b-form-select-option>
        <b-form-select-option value="沃仙曦染">沃仙曦染</b-form-select-option>
        <b-form-select-option value="晨曦王座">晨曦王座</b-form-select-option>
        <b-form-select-option value="猫小胖" style="font-weight: bold;font-style: italic;">猫小胖</b-form-select-option>
        <b-form-select-option value="紫水栈桥">紫水栈桥</b-form-select-option>
        <b-form-select-option value="摩杜纳">摩杜纳</b-form-select-option>
        <b-form-select-option value="海猫茶屋">海猫茶屋</b-form-select-option>
        <b-form-select-option value="琥珀原">琥珀原</b-form-select-option>
        <b-form-select-option value="静语庄园">静语庄园</b-form-select-option>
        <b-form-select-option value="延夏">延夏</b-form-select-option>
        <b-form-select-option value="柔风海湾">柔风海湾</b-form-select-option>
        <b-form-select-option value="莫古力" style="font-weight: bold;font-style: italic;">莫古力</b-form-select-option>
        <b-form-select-option value="梦羽宝境">梦羽宝境</b-form-select-option>
        <b-form-select-option value="旅人栈桥">旅人栈桥</b-form-select-option>
        <b-form-select-option value="白银乡">白银乡</b-form-select-option>
        <b-form-select-option value="白金幻象">白金幻象</b-form-select-option>
        <b-form-select-option value="拂晓之间">拂晓之间</b-form-select-option>
        <b-form-select-option value="神拳痕">神拳痕</b-form-select-option>
        <b-form-select-option value="龙巢神殿">龙巢神殿</b-form-select-option>
        <b-form-select-option value="潮风亭">潮风亭</b-form-select-option>
        <b-form-select-option value="豆豆柴" style="font-weight: bold;font-style: italic;">豆豆柴</b-form-select-option>
        <b-form-select-option value="银泪湖">银泪湖</b-form-select-option>
        <b-form-select-option value="伊修加德">伊修加德</b-form-select-option>
        <b-form-select-option value="红茶川">红茶川</b-form-select-option>
        <b-form-select-option value="太阳海岸">太阳海岸</b-form-select-option>
        <b-form-select-option value="水晶塔">水晶塔</b-form-select-option>
        <b-form-select-option selected value="中国" style="font-weight: bold;font-style: italic;">中国
        </b-form-select-option>
      </b-form-select>
      <b-form-checkbox id="hq" v-model="onlyHq" style="margin: 5px 9px" value="1" unchecked-value="0"
                       @change="searchItem()">
        仅HQ
      </b-form-checkbox>
      <b-button squared variant="outline-dark" class="mx-1" @click="searchItem()" type="button"><i
          class="bi bi-search"></i>
      </b-button>
      <b-button squared variant="outline-dark" @click="queryCurrentForm()" type="button"><i class="bi bi-send"></i>
      </b-button>
      <b-button squared variant="outline-dark" class="mx-1" type="reset"><i class="bi bi-arrow-clockwise"></i>
      </b-button>
    </b-form>
    <b-modal id="modal-sm" size="sm" ok-only ok- squared variant="outline-dark" title="提示">角色名查询须指定物品
    </b-modal>
    <b-modal id="modal-item" size="sm" ok-only ok- squared variant="outline-dark" title="提示">查询条件无匹配物品
    </b-modal>
    <div>
      <BootstrapTable id="table"
                      ref="table"
                      :columns="columns"
                      :options="options"
                      @on-post-body="vueFormatterPostBody"
      />
    </div>
    <div style="text-align:center;">
      <a href="http://www.beian.gov.cn/portal/registerSystemInfo"
         style="color: #bbb;font-size: 12px;text-decoration: none;"
         target="_blank"><img src="/beian.png" style="width: 12px;height: 12px" alt="公安机关联网备案"/>
        闽公网安备 35012102500734号
      </a>
      <a href="https://beian.miit.gov.cn/" style="color: #bbb;font-size: 12px;text-decoration: none;" target="_blank">闽ICP备2023003454号-1</a>
    </div>
  </div>
</template>
<style>
</style>
<style scoped>
</style>
<script>
import tableMixin from '../mixins/table'
import $ from "jquery";
import Base64 from '../plugins/base64'

let query = {
  worldName: '中国',
  onlyHq: 0
};
let mobile = false;
if (window.matchMedia("(max-width: 767px)").matches) {
  mobile = true;
}
export default {
  mixins: [tableMixin],
  props: ['themeColor'],
  computed: {
    buyerNameInvalidState() {
      if (!this.buyerName) return null;
      return !this.itemName
    }, buyerNameState() {
      if (!this.isStr(this.buyerName)) return null;
      else return this.isStr(this.itemName)
    }
  },
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
            data: JSON.stringify({name: this.itemName}),
            success: function (data) {
              if (data) {
                if (data.length > 1) {
                  vm.showOptions = true;
                  vm.nameOptions = data;
                } else {
                  vm.showOptions = false;
                  vm.itemName = data[0];
                }
              }
            }
          });
        }
      }, 500);
    },
  },
  data() {
    let color = this.themeColor;
    let columns = [
      {
        field: 'itemId',
        title: '物品ID',
        formatter: (value) => {
          return '<a class="black-link-style" href="/#/item?id=' + value + '">' + value + '</a>'
        }
      }, {
        field: 'itemName',
        formatter: (value, row) => {
          let url = "https://static.ff14pvp.top/icon/icon/" + row.itemId + '.png?eo-img.resize=w/32/h/32';
          if (row.hq)
            return '<img src="' + url + '" decoding="async" width="32" height="32" alt="图标">&nbsp;&nbsp;' + value + '<img src="/hq.png"' +
                ' decoding="async" width="16" height="16" alt="hq">';
          else
            return '<img src="' + url + '" decoding="async" width="32" height="32" alt="图标">&nbsp;&nbsp;' + value;
        },
        title: '物品名称'
      }, {
        field: 'sum',
        formatter: (value, row) => {
          return this.formatNumber(row.pricePerUnit) + 'X' + this.formatNumber(row.quantity) + '=' + this.formatNumber(value)
        },
        title: '总计'
      }, {
        field: 'buyerName',
        title: '购买者'
      }, {
        field: 'worldName',
        title: '服务器'
      }, {
        field: 'timestamp',
        title: '购买时间'
      }
      , {
        title: '收藏',
        width: 100,
        formatter: (value, row) => {
          return this.vueFormatter({
            template: row.collect ? '<i class="bi bi-star-fill" @click="operate(row)"></i>' :
                '<i class="bi bi-star" @click="operate(row)"></i>',
            data: {row},
            methods: {
              operate: this.operateCollect
            }
          })
        }
      }, {
        title: '实时数据',
        width: 100,
        formatter: (value, row) => {
          return this.vueFormatter({
            template: '<b-button  squared variant="outline-dark" @click="clickRow(row)"><i class="bi bi-send"></i></b-button>',
            data: {row},
            methods: {
              clickRow: this.queryCurrentTable
            }
          })
        }
      }
    ];
    return {
      state: null,
      maximum: 0,
      itemName: null,
      buyerName: null,
      timer: null,
      date: null,
      nameOptions: [],
      onlyHq: 0,
      worldName: '中国',
      columns: columns,
      options: {
        url: '/ffbusiness/saleHistory/realData',
        pagination: "true",
        sidePagination: "server",
        method: 'post',
        contentType: "application/json",
        queryParamsType: '',
        queryParams: function (params) {
          query.pageSize = params.pageSize;
          query.pageNumber = params.pageNumber;
          return query
        },
        pageNumber: 1,
        pageSize: 10,
        toolbar: '#queryForm',
        paginationUseIntermediate: true,
        paginationSuccessivelySize: 1,
        paginationPagesBySide: 1,
        mobileResponsive: true,
        showExport: !mobile,
        icons: {export: "bi bi-download"},
        checkOnInit: true,
        pageList: [20, 100, 200, 500, 1000],
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
        }
      },
      itemTypes: [],
      itemTypeOptions: [],
      clickWorldName: null,
      selectedValue: '',
      showOptions: false
    }
  },
  methods: {
    searchItem() {
      if (this.buyerNameInvalidState) {
        this.$bvModal.show('modal-sm')
        return;
      }
      let $table = $('#table');
      $table.bootstrapTable('destroy');
      query = {
        itemId: $.isNumeric(this.itemName) ? this.itemName : null,
        itemName: $.isNumeric(this.itemName) ? null : this.itemName,
        worldName: this.worldName,
        buyerName: this.buyerName,
        timestamp: this.date,
        onlyHq: this.onlyHq,
        itemTypes: this.itemTypes
      };
      this.options.columns = this.columns;
      $table.bootstrapTable(this.options)
      this.showOptions = false;
    },
    onReset(event) {
      event.preventDefault()
      let $table = $('#table');
      $table.bootstrapTable('destroy');
      query = {
        worldName: '中国'
      };
      this.state = null;
      this.itemName = null;
      this.buyerName = null;
      this.date = null;
      this.worldName = "中国";
      this.onlyHq = 0;
      this.itemTypes = [];
      let $itemType = $('#itemType');
      $itemType.selectpicker('val', []);
      $itemType.selectpicker('refresh');
      this.options.columns = this.columns;
      $table.bootstrapTable(this.options)
      this.showOptions = false;
    },
    queryCurrentTable(row) {
      let id = row.itemId;
      this.$router.push({name: 'AppCurrent', params: {itemId: id, worldName: row.worldName, itemName: row.itemName}});
    },
    operateCollect(row) {
      let $table = $('#table');
      const userCookie = this.$cookies.get('user');
      if (!userCookie) {
        this.$router.push({name: 'AppMy'});
        return;
      }
      if (!row.collect) {
        $.ajax({
          url: "/ffbusiness/listItem/add",
          method: "post",
          contentType: "application/json",
          data: JSON.stringify({itemId: row.itemId}),
          success: function (data) {
            $table.bootstrapTable('refresh', {silent: true})
          }
        });
      } else {
        $.ajax({
          url: "/ffbusiness/listItem/del",
          method: "post",
          contentType: "application/json",
          data: JSON.stringify({itemId: row.itemId}),
          success: function (data) {
            $table.bootstrapTable('refresh', {silent: true})
          }
        });
      }
    },
    queryCurrentForm() {
      let tempItemId;
      let tempItemName;
      const vm = this;
      let stringify;
      if (vm.isStr(this.itemName)) {
        stringify = JSON.stringify({name: this.itemName});
        if ($.isNumeric(this.itemName)) stringify = JSON.stringify({id: this.itemName});
        $.ajax({
          url: "/ffbusiness/itemNew/getOne",
          async: true,
          method: "post",
          contentType: "application/json",
          data: stringify,
          success: function (data) {
            if (data.rows.length === 0) {
              vm.$bvModal.show('modal-item')
            } else {
              tempItemId = data.rows[0].id;
              tempItemName = data.rows[0].name;
              vm.$router.push({
                name: 'AppCurrent',
                params: {itemId: tempItemId, worldName: vm.worldName, itemName: tempItemName}
              });
            }
          }
        });
      } else vm.$bvModal.show('modal-item');
    }, isStr(val) {
      return val !== null && val !== undefined && val !== '' && val.replace(/(^s*)|(s*$)/g, "").length !== 0;
    },
    formatNumber(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    selectChange() {
      this.itemName = this.selectedValue;
      this.searchItem();
    }
  },
  mounted() {
    $('#itemType').selectpicker();
    const worldCookie = this.$cookies.get('world');
    if (this.isStr(worldCookie)) {
      this.worldName = Base64.decode(worldCookie);
    } else this.worldName = "中国";
    $('#date').datepicker({language: 'zh-CN'});
    $.ajax({url: "/ffbusiness/visitor/record", async: true, method: "post", contentType: "application/json"});
  }
}


</script>
