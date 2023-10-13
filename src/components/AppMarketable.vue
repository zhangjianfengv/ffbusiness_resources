<template>
  <div id="app">
    <b-form inline id="marketableForm" ref="marketableForm">
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
        <b-form-input min="0" placeholder="至少售出" type="number" value=""
                      v-model="minQuantity"></b-form-input>
        <b-form-input id="min" min="0" placeholder="低价" type="number" value=""
                      v-model="min"></b-form-input>
        <b-form-input id="max" placeholder="高价" type="number" value="" v-model="max"></b-form-input>
        <b-form-input id="search" class="mx-1" placeholder="模糊过滤" type="text" v-model="searchText"></b-form-input>
        <b-form-select id="sortType" v-model="sortType">
          <option selected value="1">按交易次数排序</option>
          <option value="2">按售出总数排序</option>
        </b-form-select>
        <b-button variant="info" class="mx-1" @click="filterMarketable()" type="button"><i class="bi bi-search"></i></b-button>
        <b-button variant="info" @click="resetMarketable()" type="button"><i class="bi bi-arrow-clockwise"></i></b-button>
        <b-button variant="info" class="mx-1" @click="openUpdateTimeTable()" type="button"><i class="bi bi-calendar-month"></i>
        </b-button>
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
    <div aria-hidden="true" aria-labelledby="summaryTable" class="modal fade" id="summaryModal" role="dialog" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="SummaryLabel"></h4>
          </div>
          <div class="modal-body">
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
            <b-button variant="info" data-dismiss="modal" @click="closeUpdateTimeTable()" type="button"><i
                class="bi bi-power"></i></b-button>
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
import Base64 from '../plugins/base64'
import LineChart from "@/components/LineChart.vue";
import BarChart from "@/components/BarChart.vue";
import moment from "moment";

let queryMarketable = {
  worldName: '中国',
  timeScale: 24
};
export default {
  mixins: [tableMixin],
  components: {
    LineChart, BarChart
  },
  data() {
    return {
      scale: 24,
      worldName: '中国',
      min: null,
      max: null,
      sortType: "1",
      chartData: {},
      searchText: null,
      chartData1: {},
      columns: [
        {
          field: '',
          title: '序号',
          align: "center",
          formatter: function (value, row, index) {
            return index + 1;
          }
        }, {
          field: 'itemId',
          sortable: true,
          visible: false,
          title: '物品ID',
          filterControl: 'input'
        }, {
          field: 'name',
          sortable: true,
          formatter: function iconFormatter(value, row) {
            let url = window.location.protocol + '//' + window.location.host + '/icon/' + row.itemId + '.png?eo-img.resize=w/32/h/32';
            return '<img src="' + url + '" decoding="async" width="32" height="32" alt="图标">&nbsp;&nbsp;' + value;
          },
          title: '物品名称'
        }, {
          field: 'quantity',
          sortable: true,
          visible: false,
          title: '售出数',
        }, {
          field: 'num',
          sortable: true,
          title: '交易次数',
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
          filterControl: 'select',
          visible: false,
          title: '分类'
        }, {
          field: 'itemLevel',
          sortable: true,
          visible: false,
          filterControl: 'select',
          title: '品级'
        }, {
          field: 'equipLevel',
          sortable: true,
          visible: false,
          filterControl: 'select',
          title: '等级'
        }, {
          title: '操作',
          width: 100,
          formatter: (value, row) => {
            let template;
            if (row.quantityIndexChange < 0)
              template = '<b-button variant="info" @click="clickRow(row)"><i class="bi bi-graph-up-arrow"></i></b-button>';
            else template = '<b-button variant="info" @click="clickRow(row)"><i class="bi bi-graph-down-arrow"></i></b-button>'
            return this.vueFormatter({
              template: template,
              data: {row},
              methods: {
                clickRow: this.openSummary
              }
            })

          }
        }],
      itemTypes: [],
      loaded: false,
      itemTypeOptions: [],
      minQuantity: null,
      tableOptions: {
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
        paginationUseIntermediate: true,
        paginationSuccessivelySize: 1,
        paginationPagesBySide: 1,
        queryParams: function () {
          return queryMarketable;
        },
        columns: this.columns,
        pageList: [20, 100, 200, 500, 1000],
        pagination: "true",
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
      },
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
      $marketableTable.bootstrapTable('refresh', {
        query: queryMarketable
      });
    },
    resetMarketable() {
      let $itemType = $('#itemType');
      let $worldName = $('#worldName');
      let $timeScale = $('#timeScale');
      let $sortType = $('#sortType');
      let $marketableTable = $('#marketableTable');
      $('#marketableForm')[0].reset();
      this.scale = 24;
      this.worldName = '中国';
      this.min = null;
      this.max = null;
      this.sortType = "1";
      this.itemTypes = [];
      this.minQuantity = null;
      $itemType.selectpicker('val', []);
      $worldName.selectpicker('val', '中国');
      $timeScale.selectpicker('val', 24);
      $sortType.selectpicker('val', '1');
      $sortType.selectpicker('refresh');
      $timeScale.selectpicker('refresh');
      $worldName.selectpicker('refresh');
      $itemType.selectpicker('refresh');
      this.searchText = null;
      queryMarketable = {
        worldName: '中国',
        timeScale: 24
      };
      $marketableTable.bootstrapTable('refreshOptions', this.tableOptions);
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
            return "开始:" + row.begin.substring(0, 19) + '<br/>结束:' + row.end.substring(0, 19);
          }
        }, {
          field: 'next',
          title: '下次更新',
          formatter: function (value) {
            return value.substring(0, 19);
          }
        }], method: 'post',
        contentType: "application/json"
      });
    },
    openSummary(row) {
      const vm = this;
      let url = window.location.protocol + '//' + window.location.host + '/icon/' + row.itemId + '.png?eo-img.resize=w/32/h/32';
      $('#SummaryLabel').html(this.worldName + '&nbsp;<img src="' + url +
          '" decoding="async" width="32" height="32" alt="图标">' + row.name + '&nbsp;趋势')
      $('#summaryModal').modal('show');
      let format = "yyyyMMDD";
      $.ajax({
        url: "/ffbusiness/summary/query", method: "post",
        data: JSON.stringify({
          itemId: row.itemId,
          startDate: moment().subtract(this.scale, 'hours').format(format),
          endDate: moment().format(format),
          worldName: vm.worldName
        }),
        contentType: "application/json", success: function (data) {
          let labels = data.dates;
          let realLabels = [];
          for (let l of labels) {
            realLabels.push(moment(l).subtract(1, "days").format(format));//因为后端日期总是加一天
          }
          vm.chartData = {
            labels: realLabels,
            datasets: [
              {
                label: '均价',
                backgroundColor: '#df9ba1',
                data: data.values[0].value
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
    closeUpdateTimeTable() {
      $('#myModal').modal('toggle');
    }, closeSummaryTable() {
      $('#summaryModal').modal('toggle');
    }, isStr(val) {
      return val !== null && val !== undefined && val !== '' && val.replace(/(^s*)|(s*$)/g, "").length !== 0;
    }
  },
  mounted() {
    $('select').selectpicker();
    const worldCookie = this.$cookies.get('world');
    if (this.isStr(worldCookie)) {
      let worldName = Base64.decode(worldCookie);
      let $worldName = $('#worldName');
      $worldName.selectpicker('val', worldName);
      $worldName.selectpicker('refresh');
      this.worldName = worldName;
    }
    let $sortType = $('#sortType');
    $sortType.change(function () {
      let $sortType1 = $('#sortType');
      let val = $sortType1.val();
      let table = $("#marketableTable");
      table.bootstrapTable('refreshOptions', {
        sortOrder: 'asc',
        sortName: val === '2' ? 'quantityIndexCurrent' : 'numIndexCurrent',
        columns: this.columns
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