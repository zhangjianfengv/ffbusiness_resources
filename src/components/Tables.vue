<template>
  <b-card-group deck>
    <b-card>
      <b-card-text>{{ item.itemName }}售价</b-card-text>
      <BootstrapTable :id="'citem-' + index" :columns="columns1" :options="tableOptions1"></BootstrapTable>
    </b-card>
    <b-card>
      <b-card-text>{{ item.itemName }}履历</b-card-text>
      <BootstrapTable :id="'hitem-' + index" :columns="columns2" :options="tableOptions2"></BootstrapTable>
    </b-card>
  </b-card-group>
</template>
<script>
import moment from "moment";

export default {
  name: 'Tables',
  props: {
    item: {
      type: Object,
      default: {}
    }, index: {
      type: Number,
      default: 0
    }
  },
  watch: {
    item(newVal) {
      this.item = newVal;
    },
  },
  methods: {
    formatNumber(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  data() {
    let columns1 = [{
      field: 'worldName',
      title: '服务器',
    }, {
      field: 'retainerName',
      title: '雇员名',
    }, {
      field: 'hq',
      formatter: (value) => {
        return (value === true || value === 'true') ? '✔' : '✗'
      },
      title: '高品质',
    }, {
      field: 'total',
      formatter: (value, row) => {
        let exp = /\B(?=(\d{3})+(?!\d))/g;
        return row.pricePerUnit.toString().replace(exp, ",") + 'X' + row.quantity.toString().replace(exp, ",") + '=' + value.toString().replace(exp, ",")
      },
      title: '总计'
    }];
    let optionCurrent = {
      data: this.item.realData.currents,
      pagination: "true",
      columns: columns1, method: 'post',
      pageNumber: 1,
      pageSize: 5,
      paginationUseIntermediate: true,
      showSearchClearButton: true,
      paginationSuccessivelySize: 1,
      paginationPagesBySide: 1,
      pageList: [5, 10, 20]
    };
    let columns2 = [{
      field: 'worldName',
      title: '服务器'
    }, {
      field: 'buyerName',
      title: '购买者'
    }, {
      field: 'hq',
      formatter: (value) => {
        return (value === true || value === 'true') ? '✔' : '✗'
      },
      title: '高品质',
    }, {
      field: 'total',
      formatter: (value, row) => {
        return this.formatNumber(row.pricePerUnit) + 'X' + this.formatNumber(row.quantity) + '=' + this.formatNumber(value)
      },
      title: '总计'
    }, {
      field: 'timestamp',
      formatter: (value) => {
        return moment.unix(value).format('yyyy/MM/DD HH:mm:ss')
      },
      title: '购买时间'
    }];
    let hiOpt = {
      data: this.item.realData.realHistoryDtos,
      columns: columns2,
      contentType: "application/json",
      pageNumber: 1,
      pagination: "true",
      pageSize: 5,
      paginationUseIntermediate: true,
      showSearchClearButton: true,
      paginationSuccessivelySize: 1,
      paginationPagesBySide: 1,
      pageList: [5, 10, 20]
    };
    return {
      columns1: columns1,
      columns2: columns2,
      tableOptions1: optionCurrent,
      tableOptions2: hiOpt,
      item: this.item
    }
  }
  , mounted() {
    let $table = $('#hitem-' + this.index);
    let $table1 = $('#citem-' + this.index);
    $table.bootstrapTable('destroy');
    $table1.bootstrapTable('destroy');
    $table.bootstrapTable(this.tableOptions2);
    $table1.bootstrapTable(this.tableOptions1);
  }
}
</script>
