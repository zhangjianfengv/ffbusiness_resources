<template>
  <div id="app">
    <b-form @submit.prevent inline id="queryForm" @reset="onReset">
      <b-form-input id="nameKeyword" v-model="keyword" placeholder="关键词"
                    value=""></b-form-input>
      <b-form-input id="search" class="mx-1" placeholder="模糊过滤" type="text" v-model="searchText"></b-form-input>
      <b-form-select id="worldSelect" v-model="worldName" :options="worldNames"></b-form-select>
      <su-select id="suits" :suits="suits" v-model="suit" ref="su-select"></su-select>
      <b-form-checkbox id="sm" v-model="suitMaterial" style="margin: 5px 9px" value="1" unchecked-value="0"
                       @change="querySuit()"
                       switch>材料成本
      </b-form-checkbox>
      <b-button squared variant="outline-dark" class="mx-1" @click="querySuit()" type="button"><i
          class="bi bi-search"></i>
      </b-button>
      <b-button squared variant="outline-dark" class="mx-1" type="reset"><i class="bi bi-arrow-clockwise"></i>
      </b-button>
    </b-form>
    <BootstrapTable id="suitTable"
                    ref="suitTable"
                    :columns="columns"
                    :options="tableOptions"
                    @on-post-body="vueFormatterPostBody"/>
    <div id="loading-indicator" class="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>
<script>
import tableMixin from '../mixins/table'
import $ from "jquery";
import Base64 from '../plugins/base64'
import moment from "moment";

let queryParam = {
  suitMaterial: 0,
  suitName: '地图',
  dc: '陆行鸟'
};
export default {
  mixins: [tableMixin],
  name: 'batch',
  props: ['themeColor'],
  watch: {
    suit: function (newValue) {
      this.querySuit(newValue);
    },
  },
  data() {
    let columns = [
      {
        title: 'ID',
        field: 'itemId',
        align: 'center',
        valign: 'middle',
        sortable: true,
        footerFormatter: (value) => {
          return '总计'
        },
      },
      {
        field: 'itemName',
        sortable: true,
        formatter: function iconFormatter(value, row) {
          let url = "https://static.ff14pvp.top/icon/icon/" + row.itemId + '.png';
          return '<img src="' + url + '" decoding="async" width="32" height="32" alt="图标">&nbsp;&nbsp;' + '<a class="black-link-style" href="/#/item?id=' + row.itemId + '">' + value + '</a>';
        },
        title: '物品名称'
      }, {
        field: 'worldName',
        title: '服务器',
        sortable: true
      }, {
        field: 'retainerName',
        title: '雇员名',
        sortable: true
      }, {
        field: 'hq',
        formatter: (value) => {
          return (value === true || value === 'true') ? '✔' : '✗'
        },
        title: '高品质',
        sortable: true,
      }, {
        field: 'pricePerUnit',
        sortable: true,
        formatter: (value, row) => {
          let exp = /\B(?=(\d{3})+(?!\d))/g;
          return value.toString().replace(exp, ",")
        },
        title: '单价'
      }, {
        field: 'quantity',
        sortable: true,
        formatter: (value, row) => {
          let exp = /\B(?=(\d{3})+(?!\d))/g;
          return value.toString().replace(exp, ",")
        },
        footerFormatter: (value) => {
          let total = 0;
          for (let i = 0; i < value.length; i++) {
            total += parseFloat(value[i].quantity);
          }
          return total
        },
        title: '出售数量'
      }, {
        field: 'total',
        sortable: true,
        formatter: (value, row) => {
          let exp = /\B(?=(\d{3})+(?!\d))/g;
          return value.toString().replace(exp, ",")
        },
        footerFormatter: (data) => {
          let total = 0;
          for (let i = 0; i < data.length; i++) {
            total += parseFloat(data[i].total);
          }
          let s = '<img src="https://static.ff14pvp.top/icon/icon/1.png" width="32" height="32" alt="&nbsp;&nbsp;&nbsp;&nbsp;">';
          return s + total
        },
        title: '出售金额'
      },
      // {
      //   field: 'needQuantity',
      //   sortable: true,
      //   formatter: (value, row) => {
      //     if (!value) value = row.quantity;
      //     if (row.itemName.includes("戒指") || row.itemName.includes("指环")) value = value * 2;
      //     let exp = /\B(?=(\d{3})+(?!\d))/g;
      //     return value.toString().replace(exp, ",")
      //   },
      //   footerFormatter: (value) => {
      //     let total = 0;
      //     for (let i = 0; i < value.length; i++) {
      //       let row = value[i];
      //       if (row.itemName.includes("戒指") || row.itemName.includes("指环"))
      //         total += parseFloat(row.needQuantity ? row.needQuantity : row.quantity) * 2;
      //       else total += parseFloat(row.needQuantity ? row.needQuantity : row.quantity);
      //     }
      //     return total
      //   },
      //   title: '需求数量'
      // },
      {
        field: 'needQuantity',
        title: '需求数量',
        formatter: this.needQuantityFormatter,
        footerFormatter: (value) => {
          let total = 0;
          for (let i = 0; i < value.length; i++) {
            let row = value[i];
            if (row.itemName.includes("戒指") || row.itemName.includes("指环"))
              total += parseFloat(row.needQuantity ? row.needQuantity : row.quantity) * 2;
            else total += parseFloat(row.needQuantity ? row.needQuantity : row.quantity);
          }
          return total
        },
      }, {
        field: 'needTotal',
        sortable: true,
        formatter: (value, row) => {
          if (!value) value = row.total;
          if (row.itemName.includes("戒指") || row.itemName.includes("指环")) value = value * 2;
          let exp = /\B(?=(\d{3})+(?!\d))/g;
          return value.toString().replace(exp, ",")
        },
        footerFormatter: (data) => {
          let sum = 0;
          for (let i = 0; i < data.length; i++) {
            let needTotal = data[i].needTotal;
            if (data[i].itemName.includes("戒指") || data[i].itemName.includes("指环"))
              sum += parseFloat(needTotal ? needTotal : data[i].total) * 2;
            else sum += parseFloat(needTotal ? needTotal : data[i].total);
          }
          let s = '<img src="https://static.ff14pvp.top/icon/icon/1.png" width="32" height="32" alt="&nbsp;&nbsp;&nbsp;&nbsp;">';
          return s + sum
        },
        title: '需求金额'
      }, {
        field: 'cacheTime',
        sortable: true,
        formatter: (value, row) => {
          return value === null ? moment.unix(row.lastReviewTime).format('YYYY-MM-DD HH:mm:ss') : value
        },
        title: '更新时间'
      },
      {
        field: 'operate',
        title: '删除',
        align: 'center',
        formatter: (value, row) => {
          return this.vueFormatter({
            template: '<b-button  squared variant="outline-dark" @click="removeRow(row)"><i class="bi bi-trash"></i></b-button>',
            data: {row},
            methods: {
              removeRow: this.rmRow
            }
          })
        }
      }];
    let options = {
      url: null,
      queryParams: function () {
        return queryParam;
      },
      method: 'post',
      showExport: true,
      showFooter: true,
      search: true,
      searchAlign: 'left',
      searchSelector: '#search',
      toolbar: '#queryForm',
      icons: {export: "bi bi-download"},
      columns: columns
    };
    return {
      keyword: null,
      date: null,
      tableData: [],
      inputTimeout: null,
      suits: [],
      tableOptions: options,
      columns: columns,
      searchText: null,
      suit: "地图",
      selectedValue: '',
      suitMaterial: 0,
      worldName: '陆行鸟',
      worldNames: [
        {"value": "陆行鸟", "text": "陆行鸟"},
        {"value": "猫小胖", "text": "猫小胖"},
        {"value": "莫古力", "text": "莫古力"},
        {"value": "豆豆柴", "text": "豆豆柴"}]
    }
  },
  methods: {
    querySuit(newValue) {
      const vm = this;
      let suitTable = $('#suitTable');
      suitTable.bootstrapTable('destroy');
      queryParam = {
        suitMaterial: vm.suitMaterial,
        suitName: vm.isStr(newValue) ? newValue : vm.isStr(vm.keyword) ? vm.keyword : vm.suit,
        dc: vm.worldName
      };
      this.tableOptions.url = '/ffbusiness/currentData/list';
      suitTable.bootstrapTable(this.tableOptions);
    },
    onReset(event) {
      event.preventDefault()
      this.keyword = null;
      this.searchText = null;
      this.worldName = "陆行鸟";
      let worldName = $('#worldName');
      worldName.selectpicker('val', '中国');
      worldName.selectpicker('refresh');
      let suits = $('#suits');
      suits.selectpicker('val', '地图');
      suits.selectpicker('refresh');
      let table = $('#suitTable');
      table.bootstrapTable('destroy');
    },
    handleInput(event, index) {
      // 清除之前的定时器
      clearTimeout(this.inputTimeout);
      // 设置新的定时器，延迟500毫秒调用更新函数
      this.inputTimeout = setTimeout(() => {
        this.updateQuantity(index, event.target.value);
      }, 500);
    },
    // 格式化器函数，显示带逗号的数字
    needQuantityFormatter(value, row, index) {
      let val = value;
      if (!value) val = row.quantity;
      if (row.itemName.includes("戒指") || row.itemName.includes("指环")) val *= 2;
      return `<input type="number" class="form-control" value="${val}" oninput=" window.updateQuantity(${index}, this.value)">`;
    },
    // updateFooter(data) {
    //   let total = 0;
    //   this.tableData.forEach(row => {
    //     let value = row.needQuantity ? row.needQuantity : row.quantity;
    //     total += value;
    //   });
    //   let sum = 0;
    //   for (let i = 0; i < data.length; i++) {
    //     let needTotal = data[i].needTotal;
    //     sum += parseFloat(needTotal ? needTotal : data[i].total);
    //   }
    //   $('#suitTable > tfoot:nth-child(3) > tr:nth-child(1) > th:nth-child(9) > div:nth-child(1)').html(total)
    //   let value1 = '<img src="https://static.ff14pvp.top/icon/icon/1.png" width="32" height="32" alt="&nbsp;&nbsp;&nbsp;&nbsp;">' + sum;
    //   $('#suitTable > tfoot:nth-child(3) > tr:nth-child(1) > th:nth-child(10) > div:nth-child(1)').html(value1)
    // },
    isStr(val) {
      return val !== null && val !== undefined && val !== '' && val.replace(/(^s*)|(s*$)/g, "").length !== 0;
    }, rmRow(val) {
      $('#suitTable').bootstrapTable('remove', {
        field: 'itemId',
        values: [val.itemId]
      });
    },
    formatNumber(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  mounted() {
    let $suits = $('#suits');
    $suits.selectpicker();
    $('#loading-indicator').hide();
    const worldCookie = this.$cookies.get('world');
    let worldName;
    if (this.isStr(worldCookie)) {
      worldName = Base64.decode(worldCookie);
      this.worldName = worldName;
    } else {
      this.worldName = '陆行鸟'
    }
    $('#worldSelect').selectpicker('refresh');
    // 在全局范围内定义updateQuantity函数
    window.updateQuantity = (index, value) => {
      const vm = this;
      clearTimeout(this.inputTimeout);
      this.inputTimeout = setTimeout(() => {
        let $suitTable = $('#suitTable');
        let data = $suitTable.bootstrapTable('getData');
        data[index].needQuantity = Number(value);
        data[index].needTotal = data[index].needQuantity * data[index].pricePerUnit;
        $suitTable.bootstrapTable('load', data)
        vm.tableData = data;
      }, 500)
    };
  }
}
</script>