<template>
  <div id="app">
    <b-form inline id="queryForm">
      <b-row>
        <b-form-input v-model="itemId" id="itemId" placeholder="请输入数字物品ID" :state="idState" trim></b-form-input>
        <b-form-input id="itemName" placeholder="请输入部分或完整物品名" type="text"
                      value=""></b-form-input>
        <b-form-input id="buyerName" placeholder="请输入完整购买者角色名" type="text"
                      value=""></b-form-input>
        <b-form-input id="date" placeholder="请选择或输入日期" type="text"></b-form-input>
        <b-form-select v-model="worldName" id="worldName">
          <option value="陆行鸟" style="font-weight: bold;font-style: italic">陆行鸟</option>
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
        <b-button variant="info" class="mx-1" @click="searchItem()" type="button">搜索</b-button>
        <b-button variant="info" @click="resetQueryParams()" type="button">重置</b-button>
      </b-row>
    </b-form>
    <div>
      <BootstrapTable id="table"
                      ref="table"
                      :columns="columns"
                      :options="options"
                      @on-post-body="vueFormatterPostBody"
      />
    </div>
    <div aria-hidden="true" aria-labelledby="myModalLabel" class="modal fade" id="myModal" role="dialog" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="myModalLabel"></h4>
          </div>
          <div class="modal-body">
            <table id="currentTable"></table>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-dismiss="modal" @click="closeCurrentTable()" type="button">关闭</button>
          </div>
        </div>
      </div>
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
.bootstrap-table .fixed-table-toolbar .bs-bars, .bootstrap-table .fixed-table-toolbar .columns, .bootstrap-table .fixed-table-toolbar .search {
  position: relative;
  max-width: 94%;
  margin: 10px 5px;
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

.dropdown, .dropdown-menu {
  max-width: 200px;
}

input.form-control {
  max-width: 205px;
  display: inline !important;
}
</style>
<script>
import tableMixin from '../mixins/table'
import $ from "jquery";

let query = {
  worldName: '中国'
};
let columns = [
  {
    field: 'itemId',
    title: '物品ID'
  }, {
    field: 'itemName',
    formatter: (value, row) => {
      let url = window.location.protocol + '//' + window.location.host + '/icon/' + row.itemId + '.png';
      if (row.hq)
        return '<img src="' + url + '" decoding="async" width="32" height="32" alt="图标">&nbsp;&nbsp;' + value + '<img src="/hq.png"' +
            ' decoding="async" width="16" height="16" alt="hq">';
      else
        return '<img src="' + url + '" decoding="async" width="32" height="32" alt="图标">&nbsp;&nbsp;' + value;
    },
    title: '物品名称'
  }, {
    field: 'pricePerUnit',
    visible: false,
    title: '单价'
  }, {
    field: 'quantity',
    visible: false,
    title: '数量'
  }, {
    field: 'sum',
    formatter: (value, row) => {
      return row.pricePerUnit + 'X' + row.quantity + '=' + value
    },
    title: '总计'
  }, {
    field: 'buyerName',
    title: '购买者'
  }, {
    field: 'worldName',
    title: '服务器'
  }, {
    field: 'hq',
    visible: false,
    title: '高品质'
  }, {
    field: 'timestamp',
    title: '购买时间'
  }, {}
];
let options = {
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
  showJumpto: true,
  pageNumber: 1,//初始化加载第一页，默认第一页
  pageSize: 10,
  toolbar: '#queryForm',
  stickyHeader: true,
  stickyHeaderOffsetLeft: parseInt($('body').css('padding-left'), 10),
  stickyHeaderOffsetRight: parseInt($('body').css('padding-right'), 10),
  theadClasses: 'thead-light',
  pageList: [20, 100, 200, 500, 1000]
};
export default {
  mixins: [tableMixin],
  computed: {
    idState() {
      if (!this.itemId) return null;
      return $.isNumeric(this.itemId)
    }
  },
  data() {
    columns.pop();
    columns.push({
      title: '操作',
      width: 100,
      formatter: (value, row) => {
        return this.vueFormatter({
          template: '<b-button variant="info" @click="clickRow(row)">现价</b-button>',
          data: {row},
          methods: {
            clickRow: this.clickRow
          }
        })
      }
    });
    return {
      itemId: null,
      state: null,
      worldName: '中国',
      columns: columns,
      options: options
    }
  },
  methods: {
    searchItem() {
      let $table = $('#table');
      $table.bootstrapTable('destroy');
      query = {
        itemId: this.itemId,
        itemName: $('#itemName').val(),
        worldName: this.worldName,
        buyerName: $('#buyerName').val(),
        timestamp: $('#date').val()
      };
      columns.pop();
      columns.push({
        title: '操作',
        width: 100,
        formatter: (value, row) => {
          return this.vueFormatter({
            template: '<b-button variant="info" @click="clickRow(row)">现价</b-button>',
            data: {row},
            methods: {
              clickRow: this.clickRow
            }
          })
        }
      });
      options.columns = columns;
      $table.bootstrapTable(options)
      $table.bootstrapTable('refresh', {
        query: query
      });
    },
    resetQueryParams() {
      let $table = $('#table');
      $('#queryForm')[0].reset();
      $table.bootstrapTable('destroy');
      query = {
        worldName: '中国'
      };
      this.worldName = '中国';
      $('#worldName').selectpicker('refresh');
      columns.pop();
      columns.push({
        title: '操作',
        width: 100,
        formatter: (value, row) => {
          return this.vueFormatter({
            template: '<b-button variant="info" @click="clickRow(row)">现价</b-button>',
            data: {row},
            methods: {
              clickRow: this.clickRow
            }
          })
        }
      });
      options.columns = columns;
      $table.bootstrapTable(options)
    },
    clickRow(row) {
      let name = row.worldName;
      let id = row.itemId;
      let itemName = row.itemName;
      $.ajax({
        url: "/ffbusiness/currentData/queryParentWorld", async: true, method: "post",
        data: JSON.stringify({worldName: name}),
        contentType: "application/json", success: function (data) {
          $('#myModalLabel').html(data.worldName + itemName + '低价')
        }
      });
      $('#myModal').modal('show');
      let $currentTable = $('#currentTable');
      $currentTable.bootstrapTable('destroy');
      $currentTable.bootstrapTable({
        url: '/ffbusiness/currentData/queryCurrent',
        pagination: "true",
        columns: [{
          field: 'worldName',
          title: '服务器'
        }, {
          field: 'retainerName',
          title: '雇员名'
        }, {
          field: 'hq',
          formatter: function addButton(value) {
            if (value === 'true') return '<img src="/hq.png"' +
                ' decoding="async" width="16" height="16" alt="hq">';
            else return '';
          },
          title: '高品质'
        }, {
          field: 'pricePerUnit',
          title: '单价'
        }, {
          field: 'quantity',
          title: '数量'
        }, {
          field: 'total',
          title: '总计'
        }], method: 'post',
        queryParams: function () {
          let paramCurrent = {};
          paramCurrent.worldName = name;
          paramCurrent.itemId = id;
          return paramCurrent;
        },
        contentType: "application/json",
        pageNumber: 1,//初始化加载第一页，默认第一页
        pageSize: 10,
        pageList: [20, 50]
      });
    },
    closeCurrentTable() {
      $('#myModal').modal('toggle');
    }
  },
  mounted() {
    $('select').selectpicker();
    $('#date').datepicker({language: 'zh-CN'});
  }
}


</script>
