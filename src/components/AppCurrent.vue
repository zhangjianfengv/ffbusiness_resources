<template>
  <div id="app">
    <b-form @submit.prevent inline id="queryCurrent" @reset="onReset">
      <div class="input-wrapper">
        <b-form-input id="nameKeyword" autocomplete="off" v-model="itemName" placeholder="物品名"
                      value="" @keyup.enter="queryCurrentForm"></b-form-input>
        <b-form-select class="select-options" v-model="selectedValue" v-if="showOptions" @blur="hideSelect"
                       @change="hideSelect">
          <option v-for="option in nameOptions" :value="option" :key="option">{{ option }}</option>
        </b-form-select>
      </div>
      <b-form-select v-model="worldName" :options="worldNames" @change="searchItem()"></b-form-select>
      <b-button squared variant="outline-dark" class="mx-1" @click="searchItem()" type="button"><i
          class="bi bi-search"></i>
      </b-button>
      <b-button @click="clearFilterOption()" squared variant="outline-dark" type="button"><i class="bi bi-trash3"></i>
      </b-button>
      <b-button squared variant="outline-dark" class="mx-1" type="reset"><i class="bi bi-arrow-clockwise"></i>
      </b-button>
      <b-form-checkbox id="hq" v-model="onlyHq" style="margin: 5px 9px" value="1" unchecked-value="0"
                       @change="filterData()"
                       switch>HQ
      </b-form-checkbox>
      <b-form-checkbox id="loadMore" v-model="maximum" name="check-button" value="1" unchecked-value="0"
                       style="margin: 5px 9px"
                       @change="loadMore()" switch>更多
      </b-form-checkbox>
      <b-img id="itemIcon" :src="imageUrl" fluid alt="icon" width="32px" height="32px"></b-img>
    </b-form>
    <b-modal id="modal-item" size="sm" ok-only ok- squared variant="outline-dark" title="提示">查询条件无匹配物品
    </b-modal>
    <table id="currentTable"></table>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-3 squared variant="outline-dark">切换最近销售履历</b-button>
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
    <b-modal id="network" size="sm" ok-only ok-squared variant="outline-dark" title="提示">
      <!--      喔唷，网络崩溃啦！X﹏X。不过别急，可能等你看完这条信息就好了-->
      universalis近期开发接口服务不稳定，如果服务器多次查询失败后将尝试随机查询，无法指定大区，您也可尝试直接打开<a
        :href="uhref" target="_blank">{{ uhref }}</a>
    </b-modal>
  </div>
</template>
<style scoped>
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
  pageList: [10, 20, 50, 150, 450]
};
export default {
  mixins: [tableMixin],
  name: 'current',
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
  computed: {
    imageUrl() {
      const currentDomain = "https://static.ff14pvp.top/icon"; // 获取当前域名
      let itemId = this.itemId;
      if (itemId === '0' || itemId === 0 || !itemId)
        return currentDomain + '/icon/placeholder.png';
      return currentDomain + '/icon/' + itemId + '.png';
    },
    uhref() {
      return `https://universalis.app/market/${this.itemId}`;
    }
  },
  data() {
    return {
      maximum: 0,
      itemName: null,
      date: null,
      selectedValue: '',
      showOptions: false,
      itemId: '0',
      nameOptions: [],
      timer: null,
      onlyHq: 0,
      worldName: '中国',
      childWorld: null,
      unFilteredData: [],
      worldNames: [
        {"value": "陆行鸟", "text": "陆行鸟"},
        {"value": "猫小胖", "text": "猫小胖"},
        {"value": "莫古力", "text": "莫古力"},
        {"value": "豆豆柴", "text": "豆豆柴"},
        {"value": "中国", "text": "中国"},
        {
          label: '国际服',
          options: [
            {"value": "Aether", "text": "Aether"},
            {"value": "Crystal", "text": "Crystal"},
            {"value": "Elemental", "text": "Elemental"},
            {"value": "Gaia", "text": "Gaia"},
            {"value": "Mana", "text": "Mana"},
            {"value": "Primal", "text": "Primal"},
            {"value": "Chaos", "text": "Chaos"},
            {"value": "Light", "text": "Light"},
            {"value": "Materia", "text": "Materia"},
            {"value": "Meteor", "text": "Meteor"},
            {"value": "Dynamis", "text": "Dynamis"},
            {"value": "Japan", "text": "Japan"},
            {"value": "North-America", "text": "North-America"},
            {"value": "Europe", "text": "Europe"},
            {"value": "Oceania", "text": "Oceania"},
            {"value": "한국", "text": "한국"}
          ]
        }
      ]
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
      this.showOptions = false;
    },
    doJob: function (result, vm, $currentTable, $historyTable) {
      let color = this.themeColor;
      $('#loading-indicator').hide();
      optionCurrent.data = result;
      vm.unFilteredData = result;
      $currentTable.bootstrapTable(optionCurrent);
      let options = {
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
        pageList: [10, 20, 40],
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
      }
      $historyTable.bootstrapTable(options);
      let $button = $('button[title="Clear filters"]');
      $button.html('<i class="bi bi-trash3"></i>');
      $button.remove();
      this.showOptions = false;
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
          "https://universalis.app/api/v2/" + worldName + '/' + itemId + "?listings=50&entries=20&noGst=1");
      // 使用Promise.race等待任意一个操作完成
      Promise.race([request1, request2])
          .then(result => {
            vm.doJob(result, vm, $currentTable, $historyTable);
          })
          .catch(error => {
            console.log("failed with error:", error);
            vm.$bvModal.show('network');
            vm.raceAndHandle([request2, request1])
                .then((result) => {
                  vm.doJob(result, vm, $currentTable, $historyTable);
                })
                .catch((error) => {
                  $('#loading-indicator').hide();
                  console.log("Race and Handle failed with error:", error);
                });
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
    raceAndHandle(promises) {
      return Promise.race([Promise.allSettled(promises), new Promise((_, reject) => setTimeout(() => reject("Timeout"), 100000))])
          .then((results) => {
            const successResult = results.find((result) => result.status === 'fulfilled');
            if (successResult) {
              return successResult.value;
            } else {
              // Handle the case where all promises fail
              const errorResults = results.filter((result) => result.status === 'rejected');
              if (errorResults.length === promises.length) {
                throw new Error("All promises failed");
              } else {
                // Handle other cases if needed
                // ...
              }
            }
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
    clearFilterOption() {
      let $currentTable = $('#currentTable');
      let $historyTable = $('#historyTable');
      $currentTable.bootstrapTable('clearFilterControl');
      $historyTable.bootstrapTable('clearFilterControl');
      this.showOptions = false;
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
      this.showOptions = false;
    },
    formatNumber(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    hideSelect() {
      this.itemName = this.selectedValue;
      this.searchItem();
    }
  },
  mounted() {
    $('#loading-indicator').hide();
    const vm = this;
    // this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
    //   if (modalId === 'network') {
    //     setTimeout(function () {
    //       vm.$bvModal.hide('network')
    //     }, 3000);
    //   }
    // })
    const worldCookie = this.$cookies.get('world');
    let worldName;
    if (this.isStr(worldCookie)) {
      worldName = Base64.decode(worldCookie);
    }
    const param = this.$route.params.worldName;
    if (param) worldName = param;
    const itemId = this.$route.params.itemId;
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
            }
          });
        }
      }
    }
  }
}
</script>