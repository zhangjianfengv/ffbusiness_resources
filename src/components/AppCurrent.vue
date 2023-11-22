<template>
  <div id="app">
    <b-form inline id="queryCurrent" @reset="onReset">
      <b-row>
        <b-form-input list="input-list" v-model="itemName" placeholder="物品名" value=""></b-form-input>
        <b-form-datalist id="input-list" :options="nameOptions"></b-form-datalist>
        <b-form-select v-model="worldName" id="worldName" @change="searchItem()">
          <option value="陆行鸟">陆行鸟</option>
          <option value="猫小胖">猫小胖</option>
          <option value="莫古力">莫古力</option>
          <option value="豆豆柴">豆豆柴</option>
          <option selected value="中国">中国</option>
        </b-form-select>
        <b-button variant="info" class="mx-1" @click="searchItem()" type="button"><i class="bi bi-search"></i>
        </b-button>
        <b-button variant="info" class="mx-1" type="reset"><i class="bi bi-arrow-clockwise"></i></b-button>
        <b-form-checkbox id="hq" v-model="onlyHq" style="margin: 5px 9px" value="1" unchecked-value="0" @change="filterData()"
                         switch>
          只看HQ
        </b-form-checkbox>
        <b-form-checkbox id="loadMore" v-model="maximum" name="check-button" value="1" unchecked-value="0" style="margin: 5px 9px"
                         @change="loadMore()" switch>加载更多
        </b-form-checkbox>
        <b-img :src="imageUrl" fluid alt="icon" width="32px" height="32px"></b-img>
      </b-row>
    </b-form>
    <b-modal id="modal-item" size="sm" ok-only ok-variant="info" title="提示">查询条件无匹配物品</b-modal>
    <table id="currentTable"></table>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-3 variant="info">切换最近销售履历</b-button>
      </b-card-header>
      <b-collapse id="accordion-3" visible accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <table id="historyTable"></table>
        </b-card-body>
      </b-collapse>
    </b-card>
    <div id="loading-indicator" class="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
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

input.form-control {
  max-width: 180px;
  display: inline !important;
}

.dropdown, .dropdown-menu {
  max-width: 200px;
}
</style>
<script>
import tableMixin from '../mixins/table'
import $ from "jquery";
import Base64 from '../plugins/base64'
import moment from "moment";

let optionCurrent = {
  dataField: 'currents',
  pagination: "true",
  columns: [{
    field: 'worldName',
    title: '服务器',
    filterControl: 'select'
  }, {
    field: 'retainerName',
    title: '雇员名',
    filterControl: 'select'
  }, {
    field: 'hq',
    formatter: (value) => {
      return (value === true || value === 'true') ? '✔' : '✗'
    },
    title: '高品质',
    filterControl: 'select'
  }, {
    field: 'total',
    formatter: (value, row) => {
      let exp = /\B(?=(\d{3})+(?!\d))/g;
      return row.pricePerUnit.toString().replace(exp, ",") + 'X' + row.quantity.toString().replace(exp, ",") + '=' + value.toString().replace(exp, ",")
    },
    title: '总计'
  }], method: 'post',
  pageNumber: 1,
  pageSize: 5,
  toolbar: '#queryCurrent',
  filterControl: true,
  paginationUseIntermediate: true,
  showSearchClearButton: true,
  paginationSuccessivelySize: 1,
  paginationPagesBySide: 1,
  pageList: [10, 20, 50, 150, 450],
};
export default {
  mixins: [tableMixin],
  name: 'current',
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
              vm.nameOptions = data;
            }
          });
        }
      }, 500);
    },
  },
  computed: {
    imageUrl() {
      const currentDomain = "https://static.ff14pvp.top/icon/"; // 获取当前域名
      let itemId = this.itemId;
      if (itemId === '0' || itemId === 0 || !itemId)
        return currentDomain + '/icon/placeholder.png';
      return currentDomain + '/icon/' + itemId + '.png';
    },
  },
  data() {
    return {
      maximum: 0,
      itemName: null,
      date: null,
      itemId: '0',
      nameOptions: [],
      timer: null,
      onlyHq: 0,
      worldName: '中国',
      childWorld: null,
      unFilteredData: []
    }
  },
  methods: {
    searchItem() {
      this.queryCurrentForm();
    },
    onReset(event) {
      event.preventDefault()
      this.itemName = null;
      this.worldName = "中国";
      this.onlyHq = 0;
      let $worldName = $('#worldName');
      $worldName.selectpicker('val', '中国');
      $worldName.selectpicker('refresh');
      this.maximum = '0';
      let $currentTable = $('#currentTable');
      $currentTable.bootstrapTable('destroy');
      let $historyTable = $('#historyTable');
      $historyTable.bootstrapTable('destroy');
    },
    queryCurrent: function (worldName, itemId) {
      this.maximum = '0';
      this.itemId = itemId;
      $('#loading-indicator').show();
      const vm = this;
      let $currentTable = $('#currentTable');
      $currentTable.bootstrapTable('destroy');
      let $historyTable = $('#historyTable');
      $historyTable.bootstrapTable('destroy');
      const request1 = this.performPostRequest("Operation 1", window.location.origin + "/ffbusiness/currentData/queryCurrent", {
        worldName: worldName,
        itemId: itemId
      });
      const request2 = this.performGetRequest("Operation 2",
          "https://universalis.app/api/v2/" + worldName + '/' + itemId + "?listings=50&noGst=1");
      // 使用Promise.race等待任意一个操作完成
      Promise.race([request1, request2])
          .then(result => {
            $('#loading-indicator').hide();
            optionCurrent.data = result;
            vm.unFilteredData = result;
            $currentTable.bootstrapTable(optionCurrent);
            $historyTable.bootstrapTable({
              data: result,
              dataField: 'realHistoryDtos',
              columns: [{
                field: 'worldName',
                filterControl: 'select',
                filterDefault: vm.childWorld,
                title: '服务器'
              }, {
                field: 'buyerName',
                filterControl: 'select',
                title: '购买者'
              }, {
                field: 'hq',
                formatter: (value) => {
                  return (value === true || value === 'true') ? '✔' : '✗'
                },
                title: '高品质',
                filterControl: 'select'
              }, {
                field: 'total',
                formatter: (value, row) => {
                  return vm.formatNumber(row.pricePerUnit) + 'X' + vm.formatNumber(row.quantity) + '=' + vm.formatNumber(value)
                },
                title: '总计'
              }, {
                field: 'timestamp',
                formatter: (value) => {
                  return moment.unix(value).format('yyyy/MM/DD HH:mm:ss')
                },
                title: '购买时间'
              }],
              contentType: "application/json",
              pageNumber: 1,
              pagination: "true",
              pageSize: 5,
              filterControl: true,
              paginationUseIntermediate: true,
              showSearchClearButton: true,
              paginationSuccessivelySize: 1,
              paginationPagesBySide: 1,
              pageList: [10, 20, 40]
            });
            $('button[title="Clear filters"]').html('<i class="bi bi-trash3"></i>')
          })
          .catch(error => {
            // 如果任何一个操作出现异常，这里的代码将被执行
            console.error("At least one operation encountered an exception:", error.message);
            // 这里可以根据需要处理异常，比如记录日志或返回错误信息给客户端
          });

    },
    performPostRequest(operationName, url, data) {
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      }).then(result => {
        return result;
      }).catch(error => {
        throw error;
      });
    },
    performGetRequest(operationName, url) {
      return fetch(url, {
        method: 'GET',
        mode: 'cors'
      }).then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      }).then(result => {
        return {realHistoryDtos: result.recentHistory, currents: result.listings};
      }).catch(error => {
        throw error;
      });
    },
    queryCurrentForm() {
      let tempItemId;
      let tempItemName;
      const vm = this;
      if ($.isNumeric(this.itemId) || this.isStr(this.itemName)) {
        $.ajax({
          url: "/ffbusiness/itemNew/getOne",
          async: true,
          method: "post",
          contentType: "application/json",
          data: JSON.stringify({name: this.itemName}),
          success: function (data) {
            if (data.rows.length === 0) {
              vm.$bvModal.show('modal-item')
            } else {
              tempItemId = data.rows[0].id;
              tempItemName = data.rows[0].name;
              vm.itemName = tempItemName;
              vm.itemId = tempItemId;
              vm.queryCurrent(vm.worldName, tempItemId);
            }
          }
        });
      } else vm.$bvModal.show('modal-item');
    }, isStr(val) {
      return val !== null && val !== undefined && val !== '' && val.replace(/(^s*)|(s*$)/g, "").length !== 0;
    },
    filterData() {
      let $currentTable = $('#currentTable');
      let $historyTable = $('#historyTable');
      if (this.onlyHq === '1') {
        let data0 = $currentTable.bootstrapTable('getData');
        let data1 = $historyTable.bootstrapTable('getData');
        $currentTable.bootstrapTable('load', data0.filter(item => (item.hq === 'true' || item.hq === true)))
        $historyTable.bootstrapTable('load', data1.filter(item => (item.hq === 'true' || item.hq === true)))
      } else {
        $currentTable.bootstrapTable('load', this.unFilteredData)
        $historyTable.bootstrapTable('load', this.unFilteredData)
      }
    },
    loadMore() {
      const vm = this;
      let maximum = this.maximum;
      $.ajax({
        url: "/ffbusiness/currentData/queryCurrent",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify({worldName: this.worldName, itemId: this.itemId, maximum: maximum === '1'}),
        success: function (data) {
          let $currentTable = $('#currentTable');
          optionCurrent.data = data;
          vm.unFilteredData = data;
          $currentTable.bootstrapTable('destroy').bootstrapTable(optionCurrent);
          vm.filterData();
          $('button[title="Clear filters"]').html('<i class="bi bi-trash3"></i>')
        }
      })
    },
    formatNumber(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  mounted() {
    $('#loading-indicator').hide();
    $('select').selectpicker();
    let $worldName = $('#worldName');
    const worldCookie = this.$cookies.get('world');
    let worldName;
    if (this.isStr(worldCookie)) {
      worldName = Base64.decode(worldCookie);
    }
    const param = this.$route.params.worldName;
    if (param) worldName = param;
    const itemId = this.$route.params.itemId;
    const vm = this;
    if (worldName) {
      switch (worldName) {
        case "陆行鸟":
        case "莫古力":
        case "猫小胖":
        case "豆豆柴":
        case "中国":
          if (itemId && worldName) {
            vm.queryCurrent(worldName, itemId);
            this.itemName = this.$route.params.itemName;
          }
          this.worldName = worldName;
          $worldName.selectpicker('val', worldName);
          $worldName.selectpicker('refresh');
          break;
        default: {
          vm.childWorld = worldName;
          $.ajax({
            url: "/ffbusiness/currentData/queryParentWorld", async: true, method: "post",
            data: JSON.stringify({worldName: worldName}),
            contentType: "application/json", success: function (data) {
              if (itemId && worldName) {
                vm.queryCurrent(data.worldName, itemId);
                vm.itemName = vm.$route.params.itemName;
              }
              vm.worldName = data.worldName
              $worldName.selectpicker('val', data.worldName);
              $worldName.selectpicker('refresh');
            }
          });
        }
      }
    }
  }
}
</script>