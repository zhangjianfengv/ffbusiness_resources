<template>
  <div id="app">
    <b-form inline id="marketableForm">
      <b-form-group>
        <b-form-select v-model="worldName" id="worldName">
          <option value="陆行鸟" style="font-weight: bold;font-style: italic;">陆行鸟</option>
          <option value="拉诺西亚">拉诺西亚</option>
          <option value="幻影群岛">幻影群岛</option>
          <option value="神意之地">神意之地</option>
          <option value="萌芽池">萌芽池</option>
          <option value="红玉海">红玉海</option>
          <option value="宇宙和音">宇宙和音</option>
          <option value="沃仙曦染">沃仙曦染</option>
          <option value="晨曦王座">晨曦王座</option>
          <option value="猫小胖" style="font-weight: bold;font-style: italic;">猫小胖</option>
          <option value="紫水栈桥">紫水栈桥</option>
          <option value="摩杜纳">摩杜纳</option>
          <option value="海猫茶屋">海猫茶屋</option>
          <option value="琥珀原">琥珀原</option>
          <option value="静语庄园">静语庄园</option>
          <option value="延夏">延夏</option>
          <option value="柔风海湾">柔风海湾</option>
          <option value="莫古力" style="font-weight: bold;font-style: italic;">莫古力</option>
          <option value="梦羽宝境">梦羽宝境</option>
          <option value="旅人栈桥">旅人栈桥</option>
          <option value="白银乡">白银乡</option>
          <option value="白金幻象">白金幻象</option>
          <option value="拂晓之间">拂晓之间</option>
          <option value="神拳痕">神拳痕</option>
          <option value="龙巢神殿">龙巢神殿</option>
          <option value="潮风亭">潮风亭</option>
          <option value="豆豆柴" style="font-weight: bold;font-style: italic;">豆豆柴</option>
          <option value="银泪湖">银泪湖</option>
          <option value="伊修加德">伊修加德</option>
          <option value="红茶川">红茶川</option>
          <option value="太阳海岸">太阳海岸</option>
          <option value="水晶塔">水晶塔</option>
          <option selected value="中国" style="font-weight: bold;font-style: italic;">中国</option>
        </b-form-select>
        <b-form-select id="timeScale" v-model="scale">
          <option value="8">统计8小时</option>
          <option selected value="24">统计24小时</option>
          <option value="72">统计3天</option>
          <option value="168">统计7天</option>
          <option value="360">统计15天</option>
          <option value="720">统计30天</option>
        </b-form-select>
        <bt-select :options="itemTypeOptions" v-model="itemTypes" ref="typeSelect" id="itemType">
        </bt-select>
        <b-form-input min="0" placeholder="最低售出" type="number" value=""
                      v-model="minQuantity"></b-form-input>
        <b-form-input id="min" min="0" placeholder="低价" type="number" value=""
                      v-model="min"></b-form-input>
        <b-form-input id="max" placeholder="高价" type="number" value="" v-model="max"></b-form-input>
        <b-form-input id="search" class="mx-1" placeholder="模糊过滤" type="text" value=""></b-form-input>
        <b-form-select id="sortType" v-model="sortType">
          <option selected value="1">按交易次数排序</option>
          <option value="2">按售出总数排序</option>
        </b-form-select>
        <b-button variant="info" class="mx-1" @click="filterMarketable()" type="button">查询</b-button>
        <b-button variant="info" @click="resetMarketable()" type="button">重置</b-button>
        <b-button variant="info" class="mx-1" @click="openUpdateTimeTable()" type="button">统计更新情况</b-button>
      </b-form-group>
    </b-form>
    <div>
      <BootstrapTable id="marketableTable"
                      ref="table"
                      :columns="columns"
                      :options="tableOptions"
                      @on-post-body="vueFormatterPostBody"
      />
    </div>
    <div aria-hidden="true" aria-labelledby="myModalLabel" class="modal fade" id="myModal" role="dialog" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="myModalLabel">更新时间一览</h4>
          </div>
          <div class="modal-body">
            <table id="updateTimeTable"></table>
          </div>
          <div class="modal-footer">
            <b-button variant="info" data-dismiss="modal" @click="closeUpdateTimeTable()" type="button">关闭</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.custom-select {
  padding: 0 !important;
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

.bootstrap-select:not([class*="col-"]):not([class*="form-control"]):not(.input-group-btn) {
  width: auto;
}

.dropdown, .dropdown-menu {
  max-width: 200px;
}

</style>

<style scoped>
.form-control {
  max-width: 108px !important;
}
</style>
<script>
import tableMixin from '../mixins/table'
import $ from "jquery";

let queryMarketable = {
  worldName: '中国',
  timeScale: 24
};
let columns = [{
  field: 'itemId',
  sortable: true,
  visible: false,
  title: '物品ID',
  filterControl: 'input'
}, {
  field: 'name',
  sortable: true,
  formatter: function iconFormatter(value, row) {
    let url = window.location.protocol + '//' + window.location.host + '/icon/' + row.itemId + '.png';
    return '<img src="' + url + '" decoding="async" width="32" height="32" alt="图标">&nbsp;&nbsp;' + value;
  },
  title: '物品名称'
}, {
  field: 'quantity',
  sortable: true,
  visible: false,
  title: '24小时售出数',
}, {
  field: 'num',
  sortable: true,
  title: '24小时交易次数',
}, {
  field: 'numIndexCurrent',
  sortable: true,
  title: '次数排序'
}, {
  field: 'numIndexChange',
  sortable: true,
  title: '排序较上次',
  formatter: function changeFormatter(value, row) {
    if (!$.isNumeric(row.quantityIndexChange)) return "无此物品"
    else if (value === 0) return "持平"
    else if (value > 0) return "<h4 style='display: inline;color: #1e7e34'>↓</h4>&nbsp;" + value;
    else if (value < 0) return "<h4 style='display: inline; color: #b94a48'>↑</h4>&nbsp;" + (-value);
    else return "无此物品"
  },
}, {
  field: 'quantityIndexCurrent',
  sortable: true,
  visible: false,
  title: '售出数排序'
}, {
  field: 'quantityIndexChange',
  sortable: true,
  visible: false,
  title: '排序较上次',
  formatter: function changeFormatter(value) {
    if (value === 0) return "持平"
    else if (value > 0) return "<h4 style='display: inline;color: #1e7e34'>↓</h4>&nbsp;" + value;
    else if (value < 0) return "<h4 style='display: inline; color: #b94a48'>↑</h4>&nbsp;" + (-value);
    else return "无此物品"
  },
}, {
  field: 'pricePerUnit',
  sortable: true,
  title: '均价'
}, {
  field: 'itemTypeName',
  sortable: true,
  filterControl: 'input',
  visible: false,
  title: '分类'
}, {
  field: 'itemLevel',
  sortable: true,
  visible: false,
  filterControl: 'input',
  title: '品级'
}, {
  field: 'equipLevel',
  sortable: true,
  visible: false,
  filterControl: 'input',
  title: '等级'
}];
let tableOptions = {
  url: '/ffbusiness/saleHistory/marketableData',
  search: true,
  searchAlign: 'left',
  searchSelector: '#search',
  toolbar: '#marketableForm',
  stickyHeader: true,
  stickyHeaderOffsetLeft: parseInt($('body').css('padding-left'), 10),
  stickyHeaderOffsetRight: parseInt($('body').css('padding-right'), 10),
  theadClasses: 'thead-light',
  sortName: "numIndexCurrent",
  sortOrder: 'asc',
  filterControl: true,
  method: 'post',
  queryParams: function () {
    return queryMarketable;
  },
  pageList: [20, 100, 200, 500, 1000],
  pagination: "true",
  showJumpto: true,
  showColumns: true,
  showColumnsToggleAll: true,
  showExport: true,
  icons: {columns: 'bi bi-list-ul', export: "bi bi-download"},
  contentType: "application/json",
  onAll: function () {
    let $columns = $('.columns');
    $columns.css('margin', '0')
    $columns.removeClass('float-right')
    let form = $('#marketableForm>fieldset.form-group>div');
    form.append($columns);
    $('.fixed-table-toolbar>div:not(:first)').remove();
    if (form.children().length > 12) form.children().last().remove();//TODO 魔法值
  }
};

export default {
  mixins: [tableMixin],
  data() {
    return {
      scale: 24,
      worldName: '中国',
      min: null,
      max: null,
      sortType: "1",
      columns: columns,
      itemTypes: [],
      itemTypeOptions: [],
      minQuantity: null,
      tableOptions: tableOptions,
    }
  },
  methods: {
    filterMarketable() {
      const $marketableTable = $('#marketableTable');
      const timeScale = this.scale;
      queryMarketable = {
        worldName: $('#worldName').val(),
        timeScale: timeScale,
        max: $('#max').val(),
        min: $('#min').val(),
        minQuantity: this.minQuantity,
        itemTypes: this.itemTypes
      };
      let $sortType = $('#sortType');
      this.sortType = "1";
      $sortType.selectpicker('val', '1');
      $sortType.selectpicker('refresh');
      if (timeScale > 24) {
        columns[2].title = timeScale / 24 + '天售出数';
        columns[3].title = timeScale / 24 + '天交易次数';
      } else {
        columns[2].title = timeScale + '小时售出数';
        columns[3].title = timeScale + '小时交易次数';
      }
      $marketableTable.bootstrapTable('refresh', {
        query: queryMarketable
      });
    },
    resetMarketable() {
      $('#marketableForm')[0].reset();
      let $itemType = $('#itemType');
      this.scale = 24;
      this.worldName = '中国';
      this.min = null;
      this.max = null;
      this.sortType = "1";
      this.itemTypes = [];
      this.minQuantity = null;
      $itemType.selectpicker('val', []);
      queryMarketable = {
        worldName: '中国',
        timeScale: 24
      };
      let $worldName = $('#worldName');
      $worldName.selectpicker('val', '中国');
      let $timeScale = $('#timeScale');
      $timeScale.selectpicker('val', 24);
      let $sortType = $('#sortType');
      $sortType.selectpicker('val', '1');
      $sortType.selectpicker('refresh');
      $timeScale.selectpicker('refresh');
      $worldName.selectpicker('refresh');
      $itemType.selectpicker('refresh');
      let $marketableTable = $('#marketableTable');
      $marketableTable.bootstrapTable('destroy');
      const timeScale = $timeScale.val();
      if (timeScale > 24) {
        columns[2].title = timeScale / 24 + '天售出数';
        columns[3].title = timeScale / 24 + '天交易次数';
      } else {
        columns[2].title = timeScale + '小时售出数';
        columns[3].title = timeScale + '小时交易次数';
      }
      tableOptions.columns = columns;
      $marketableTable.bootstrapTable(tableOptions);
    },
    openUpdateTimeTable() {
      $('#myModal').modal('show');
      $('#updateTimeTable').bootstrapTable({
        url: '/ffbusiness/saleHistory/marketableUpdateTime',
        columns: [{
          field: 'scale',
          title: '统计周期',
          formatter: function (value) {
            return $('#timeScale option[value=' + value + ']').html().slice(2);
          }
        }, {
          field: 'between',
          title: '当前统计范围',
          formatter: function (value, row) {
            return "开始:" + row.begin + '<br/>结束:' + row.end;
          }
        }, {
          field: 'next',
          title: '下次更新'
        }], method: 'post',
        contentType: "application/json"
      });
    },
    closeUpdateTimeTable() {
      $('#myModal').modal('toggle');
    }
  },
  mounted() {
    $('select').selectpicker();
    let $sortType = $('#sortType');
    $sortType.change(function () {
      let $sortType1 = $('#sortType');
      let val = $sortType1.val();
      let table = $("#marketableTable");
      table.bootstrapTable('refreshOptions', {
        sortOrder: 'asc',
        sortName: val === '2' ? 'quantityIndexCurrent' : 'numIndexCurrent',
        columns: columns
      })
      if (val === '2') {
        table.bootstrapTable('showColumn', 'quantityIndexCurrent');
        table.bootstrapTable('showColumn', 'quantityIndexChange');
        table.bootstrapTable('showColumn', 'quantity');
        table.bootstrapTable('hideColumn', 'numIndexCurrent');
        table.bootstrapTable('hideColumn', 'num');
        table.bootstrapTable('hideColumn', 'numIndexChange');
      } else {
        table.bootstrapTable('showColumn', 'numIndexCurrent');
        table.bootstrapTable('showColumn', 'numIndexChange');
        table.bootstrapTable('showColumn', 'num');
        table.bootstrapTable('hideColumn', 'quantityIndexCurrent');
        table.bootstrapTable('hideColumn', 'quantityIndexChange');
        table.bootstrapTable('hideColumn', 'quantity');
      }
    })
  }
}
</script>