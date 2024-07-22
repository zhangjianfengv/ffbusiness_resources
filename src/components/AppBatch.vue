<template>
  <div id="app">
    <b-form @submit.prevent inline id="queryForm" @reset="onReset">
      <b-form-input id="nameKeyword" autocomplete="off" v-model="keyword" placeholder="关键词"
                    value=""></b-form-input>
      <b-form-select v-model="worldName" :options="worldNames" @change="querySuit"></b-form-select>
      <su-select id="suits" :suits="suits" v-model="suit" ref="su-select"></su-select>
      <b-form-checkbox id="sm" v-model="suitMaterial" style="margin: 5px 9px" value="1" unchecked-value="0"
                       @change="querySuit()"
                       switch>材料
      </b-form-checkbox>
      <b-button squared variant="outline-dark" class="mx-1" @click="querySuit()" type="button"><i
          class="bi bi-search"></i>
      </b-button>
      <b-button squared variant="outline-dark" class="mx-1" type="reset"><i class="bi bi-arrow-clockwise"></i>
      </b-button>
    </b-form>
    <table id="suitTable">
    </table>
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

let selections = [];

function getIdSelections() {
  return $.map($('#suits').bootstrapTable('getSelections'), function (row) {
    return row.id
  })
}

function responseHandler(res) {
  $.each(res.rows, function (i, row) {
    row.state = $.inArray(row.id, selections) !== -1
  })
  return res
}

window.operateEvents = {
  'click .remove': function (e, value, row, index) {
    $('#suits').bootstrapTable('remove', {
      field: 'id',
      values: [row.id]
    })
  }
}
export default {
  mixins: [tableMixin],
  name: 'current',
  props: ['themeColor'],
  watch: {
    suit: function (newValue) {
      this.querySuit(newValue);
    },
  },
  data() {
    return {
      keyword: null,
      date: null,
      suits: [],
      suit: "620刻木匠",
      selectedValue: '',
      onlyHq: 0,
      suitMaterial: 0,
      worldName: null,
      worldNames: [
        {"value": "陆行鸟", "text": "陆行鸟"},
        {"value": "猫小胖", "text": "猫小胖"},
        {"value": "莫古力", "text": "莫古力"},
        {"value": "豆豆柴", "text": "豆豆柴"}]
    }
  },
  methods: {
    onReset(event) {
      event.preventDefault()
      this.keyword = null;
      this.worldName = "中国";
      this.onlyHq = 0;
      let worldName = $('#worldName');
      worldName.selectpicker('val', '中国');
      worldName.selectpicker('refresh');
      let suits = $('#suits');
      suits.selectpicker('val', null);
      suits.selectpicker('refresh');
      let table = $('#suitTable');
      table.bootstrapTable('destroy');
      this.showOptions = false;
    },
    querySuit(newValue) {
      const $remove = $('#remove');
      const vm = this;
      let suitTable = $('#suitTable');
      suitTable.bootstrapTable('destroy');
      $('#loading-indicator').show();
      $.ajax({
        url: "/ffbusiness/currentData/list",
        async: true,
        method: "post",
        contentType: "application/json",
        data: JSON.stringify({
          suitMaterial: vm.suitMaterial,
          suitName: vm.isStr(newValue) ? newValue : vm.isStr(vm.keyword) ? vm.keyword : vm.suit,
          dc: vm.worldName
        }),
        success: function (data) {
          $('#loading-indicator').hide();
          suitTable.bootstrapTable('destroy').bootstrapTable({
            data: data,
            method: 'post',
            showExport: true,
            showFooter: true,
            clickToSelect: true,
            responseHandler: responseHandler,
            toolbar: '#queryForm',
            icons: {export: "bi bi-download"},
            columns:
                [
                  {
                    field: 'state',
                    checkbox: true,
                    align: 'center',
                    valign: 'middle'
                  },
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
                  formatter: (value) => {
                    let exp = /\B(?=(\d{3})+(?!\d))/g;
                    return value.toString().replace(exp, ",")
                  },
                  footerFormatter: (value) => {
                    let total = 0;
                    for (let i = 0; i < value.length; i++) {
                      total += parseFloat(data[i].quantity);
                    }
                    return total
                  },
                  title: '数量'
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
                  title: '小计'
                }, {
                  field: 'localDateTime',
                  sortable: true,
                  title: '更新时间'
                },
                  {
                    field: 'operate',
                    title: '删除',
                    align: 'center',
                    clickToSelect: false,
                    events: window.operateEvents,
                    formatter: (value, row) => {
                      return [
                        '<a class="remove" href="javascript:void(0)" title="Remove">',
                        '<i class="bi bi-trash"></i>',
                        '</a>'
                      ].join('')
                    },
                  }
                ]
          })
          suitTable.on('check.bs.table uncheck.bs.table ' +
              'check-all.bs.table uncheck-all.bs.table',
              function () {
                $remove.prop('disabled', !suitTable.bootstrapTable('getSelections').length)
                // save your data, here just save the current page
                selections = getIdSelections()
                // push or splice the selections if you want to save all data selections
              })
          suitTable.on('all.bs.table', function (e, name, args) {
            console.log(name, args)
          })
          $remove.click(function () {
            const ids = getIdSelections();
            suitTable.bootstrapTable('remove', {
              field: 'id',
              values: ids
            })
            $remove.prop('disabled', true)
          })
        }
      });
    }, isStr(val) {
      return val !== null && val !== undefined && val !== '' && val.replace(/(^s*)|(s*$)/g, "").length !== 0;
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
  }
}
</script>