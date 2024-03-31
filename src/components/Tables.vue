<template>
  <b-card-group deck v-if="show">
    <b-card header-tag="header" footer-tag="footer">
      <template #header>
        <h6 class="mb-0">{{ item.itemName }}</h6>
      </template>
      <b-card-body>
        <b-card-title>当前价格</b-card-title>
        <b-card-sub-title class="mb-2">
          <b-img :src="imageUrl" fluid alt="icon" width="32px" height="32px"></b-img>
        </b-card-sub-title>
        <BootstrapTable :id="'citem-' + index" :columns="columns1" :options="tableOptions1"></BootstrapTable>
      </b-card-body>
      <template #footer>
        <b-button href="#" @click="cancelCollect" squared variant="outline-dark" type="button">取消收藏</b-button>
      </template>
    </b-card>

    <b-card header-tag="header" footer-tag="footer">
      <template #header>
        <h6 class="mb-0">{{ item.itemName }}</h6>
      </template>
      <b-card-body>
        <b-card-title>销售历史</b-card-title>
        <b-card-sub-title class="mb-2">
          <b-img :src="imageUrl" fluid alt="icon" width="32px" height="32px"></b-img>
        </b-card-sub-title>
        <BootstrapTable :id="'hitem-' + index" :columns="columns2" :options="tableOptions2"></BootstrapTable>
      </b-card-body>
      <template #footer>
        <b-button @click="cancelCollect" href="#" squared variant="outline-dark" type="button">取消收藏</b-button>
      </template>
    </b-card>
  </b-card-group>
</template>
<style scoped>
.page-item.active .page-link {
  background-color: white !important;
}
</style>
<script>
import moment from "moment";
import $ from "jquery";

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
  computed: {
    imageUrl() {
      const currentDomain = "https://static.ff14pvp.top/icon/"; // 获取当前域名
      let itemId = this.item.itemId;
      if (itemId === '0' || itemId === 0 || !itemId)
        return currentDomain + '/icon/placeholder.png';
      return currentDomain + '/icon/' + itemId + '.png';
    },
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
    cancelCollect() {
      this.show = false;
      $.ajax({
        url: "/ffbusiness/listItem/del",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify({itemId: this.item.itemId}),
        success: function (data) {
        }
      });
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
      item: this.item,
      show: true
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
