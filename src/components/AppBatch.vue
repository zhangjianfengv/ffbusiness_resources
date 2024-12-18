<template>
  <div id="app">
    <b-form @submit.prevent inline id="queryForm" @reset="onReset">
      <b-form-input id="nameKeyword" v-model="keyword" placeholder="部分或完整物品名" @keyup.enter="querySuit"
                    value=""></b-form-input>
      <su-select class="mx-1" id="suits" :suits="suits" v-model="suit" ref="su-select"></su-select>
      <select @change="querySuit()" class="mx-1" id="worldName" v-model="worldName">
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
      </select>
      <b-form-checkbox id="sm" v-model="suitMaterial" style="margin: 5px 9px" value="1" unchecked-value="0"
                       @change="querySuit()"
                       switch>材料成本
      </b-form-checkbox>
      <b-button squared variant="outline-dark" class="mx-1" @click="querySuit()" type="button"><i
          class="bi bi-search"></i>
      </b-button>
      <b-button squared variant="outline-dark" class="mx-1" @click="openModal()" type="button"><i
          class="bi bi-star"></i>
      </b-button>
      <b-button squared variant="outline-dark" class="mx-1" type="reset"><i class="bi bi-arrow-clockwise"></i>
      </b-button>
      <i class="bi bi-question-circle mx-1" id="tooltip-target-1"></i>
      <b-tooltip target="tooltip-target-1" triggers="hover">
        <span>如果输入了关键词则查询以关键词为准，可以选择自己的收藏夹和预置套装、关键词来代替输入关键词。对于套装例如"690刻木匠"优先显示HQ最低价(每个物品最多搜索20条在售数据如果无HQ将显示NQ最低价)。注意如果创建了与已有预置收藏夹或关键词同名的收藏夹则将总是查询自建收藏夹包含的物品</span>
      </b-tooltip>
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
    <div aria-hidden="true" class="modal fade" id="cost" role="dialog" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">


          <div class="modal-header">
            <h4 class="modal-title" style="margin: 0 auto" id="recipeLabel"></h4>
          </div>
          <div class="modal-body recipe">
            <div id="recipeList">
              <b-form-input id="sb-inline" class="mt-1" v-model="craftCount" type="number" inline></b-form-input>
              <ul style="padding-left: 0">
                <li style="list-style-type:none" v-for="(value, key) in materials">{{ key }}*{{
                    value.num * craftCount
                  }}个*{{
                    value.price
                  }}({{ value.worldName }})={{ value.num * value.price * craftCount }}
                  <span @click="deleteItem(key)"><i class="bi bi-x-square"></i></span>
                </li>
              </ul>
              <span>成本总计{{
                  (this.errorText === '' || !this.errorText) ? (this.singeCost * craftCount) : '（某个材料无在售，请尝试切换至大区）'
                }}</span>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" data-dismiss="modal" @click="closeRecipe" type="button"><i
                class="bi bi-power"></i></button>
          </div>
        </div>
      </div>
    </div>
    <b-modal
        id="first-modal"
        ref="firstModal"
        :title=modalTitle
        ok-title="确定"
        cancel-title="取消"
        @ok="saveBatch"
    >
      <b-form-input v-model="newCollectionName" placeholder="最多可输入20个字"></b-form-input>
    </b-modal>
  </div>
</template>
<style scoped>
.tooltip-container {
  position: relative;
  display: inline-block;
}

.custom-tooltip {
  position: absolute;
  top: 100%; /* 放在触发元素下方 */
  left: 0;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  padding: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  white-space: pre-wrap; /* 保留换行符 */
  z-index: 10;
  cursor: text;
}

</style>
<script>
import tableMixin from '../mixins/table'
import $ from "jquery";
import Base64 from '../plugins/base64'
import moment from "moment";
import Tree from "@/components/Tree.vue";

let queryParam = {
  suitMaterial: 0,
  suitName: '710骑士',
  dc: '陆行鸟'
};
export default {
  components: {Tree},
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
          return '<img src="' + url + '" decoding="async" loading="lazy"  width="32" height="32" alt="图标">&nbsp;&nbsp;' + '<a class="black-link-style" href="/#/item?id=' + row.itemId + '">' + value + '</a>';
        },
        title: '物品名称',
      }, {
        field: 'worldName',
        title: '服务器',
        formatter: (value) => {
          if (!value) return this.worldName
          return value
        },
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
        formatter: (value, row, index) => {
          const formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '&nbsp;&nbsp;';
          this.hoverRowData = row.detailData;
          let currentWorldName = this.worldName;
          let container = '';
          if (row.detailData)
            this.hoverRowData.forEach(item => {
              const hqImage = item.hq === "true" ? '<img src="https://www.ff14pvp.top/hq.png" alt="HQ" style="width:20px;height:20px;">' : '';
              const row = `<div>${item.pricePerUnit} * ${item.quantity} = ${item.total} (${hqImage}${item.worldName ? item.worldName : currentWorldName})</div>`;
              container += row;
            });
          return ' <div class="tooltip-container" onmouseenter="showTooltip(' + index + ')" onmouseleave="hideTooltip(' + index + ')">' +
              '<span>' + formattedValue + '</span> ' +
              '<div  id="tooltipdiv' + index +
              '"  style="display: none"  class="custom-tooltip" > ' + container + '</div><i style="text-align: right;float: right" class="bi bi-database-fill-down"></i>';
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
      {
        field: 'needQuantity',
        title: '需求数量',
        formatter: this.needQuantityFormatter,
        footerFormatter: (value) => {
          let total = 0;
          for (let i = 0; i < value.length; i++) {
            let row = value[i];
            total += parseFloat(row.needQuantity ? row.needQuantity : row.quantity);
          }
          return total
        },
      }, {
        field: 'needTotal',
        sortable: true,
        formatter: (value, row) => {
          if (!value) value = row.total;
          let exp = /\B(?=(\d{3})+(?!\d))/g;
          return value.toString().replace(exp, ",")
        },
        footerFormatter: (data) => {
          let sum = 0;
          for (let i = 0; i < data.length; i++) {
            let needTotal = data[i].needTotal;
            sum += parseFloat(needTotal ? needTotal : data[i].total);
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
        title: '材料成本计算',
        formatter: (value, row) => {
          if (row.craft) {
            let template = '<b-button  squared variant="outline-dark" @click="clickRow(row)"><i class="bi bi-calculator"></i></b-button>';
            return this.vueFormatter({
              template: template,
              data: {row},
              methods: {
                clickRow: this.openList
              }
            })
          } else return '';
        }
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
      columns: columns,
    };
    return {
      keyword: null,
      date: null,
      activeTooltip: null, // 当前显示工具提示的行索引
      craftCount: 1,
      tempItemId: null,
      newCollectionName: null,
      tableData: [],
      modalTitle: "批量保存当前列表物品和需求数量",
      inputTimeout: null,
      suits: [],
      hoverRowData: null, // 存储悬停行的数据
      tableOptions: options,
      columns: columns,
      searchText: null,
      suit: "710骑士",
      selectedValue: '',
      suitMaterial: 0,
      worldName: '陆行鸟',
      materials: [],
      errorText: null,
      singeCost: 0,
    }
  },
  methods: {
    querySuit(newValue) {
      let suitTable = $('#suitTable');
      suitTable.bootstrapTable('destroy');
      queryParam = {
        suitMaterial: this.suitMaterial,
        suitName: this.isStr(newValue) ? newValue : this.isStr(this.keyword) ? this.keyword : this.suit,
        dc: this.worldName
      };
      this.tableOptions.url = '/ffbusiness/currentData/list';
      suitTable.bootstrapTable(this.tableOptions);
    },
    onReset(event) {
      event.preventDefault()
      this.keyword = null;
      this.searchText = null;
      this.worldName = "陆行鸟";
      let $worldName = $('#worldName');
      $worldName.selectpicker('val', '中国');
      $worldName.selectpicker('refresh');
      let suits = $('#suits');
      suits.selectpicker('val', '710骑士');
      suits.selectpicker('refresh');
      let table = $('#suitTable');
      table.bootstrapTable('destroy');
    },
    openList(row) {
      const vm = this;
      $('#loading-indicator').show();
      $('#recipeList').hide();
      this.craftCount = 1;
      this.tempItemId = row.itemId;
      let url = "https://static.ff14pvp.top/icon/icon/" + row.itemId + '.png';
      $('#recipeLabel').html('<img src="' + url +
          '" decoding="async" loading="lazy"  width="32" height="32" alt="图标">' + row.itemName + '&nbsp;材料成本计算');
      $('#cost').modal('show');
      $.ajax({
        url: "/ffbusiness/recipe/cost", method: "post", contentType: "application/json",
        data: JSON.stringify({itemId: row.itemId, worldName: this.worldName}),
        success: function (data) {
          $('#loading-indicator').hide();
          $('#recipeList').show();
          vm.materials = data.list;
          if (data.list === null) {
            vm.errorText = 'error'
            return;
          }
          let total = 0;
          for (let item in data.list) {
            total += data.list[item].price * data.list[item].num;
          }
          vm.errorText = null;
          vm.singeCost = total;
        }
      });
    },
    deleteItem(key) {
      this.$delete(this.materials, key);
      let total = 0;
      for (let item in this.materials) {
        total += this.materials[item].price * this.materials[item].num;
      }
      this.singeCost = total;
    }, saveBatch() {
      const userCookie = this.$cookies.get('user');
      if (!userCookie) {
        this.$router.push({name: 'AppMy'});
        return;
      }
      let $suitTable = $('#suitTable');
      let initData = $suitTable.bootstrapTable('getData');
      let data = this.tableData.length > 0 ? this.tableData : initData;
      let listName = this.newCollectionName;
      if (this.isStr(listName))
        $.ajax({
          url: "/ffbusiness/listItem/batch",
          async: true,
          method: "post",
          contentType: "application/json",
          data: JSON.stringify({
            listName: listName, items: data.map(item => ({
              itemId: item.itemId,
              itemNum: item.needQuantity ? item.needQuantity : item.quantity
            }))
          }),
          success: function (data) {
          }
        });
    },
    // 格式化器函数，显示带逗号的数字
    needQuantityFormatter(value, row, index) {
      let val = value;
      if (!value) val = row.quantity;
      return `<input type="number" class="form-control" value="${val}" oninput=" window.updateQuantity(${index}, this.value)">`;
    }, // 格式化器函数，显示带逗号的数字
    formatPrice(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    openModal() {
      this.$refs.firstModal.show();
      this.newCollectionName = this.isStr(this.keyword) ? this.keyword : this.suit;
    },
    closeRecipe() {
      $('#cost').modal('toggle');
    },
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
    const vm = this;
    let $suits = $('#suits');
    $suits.selectpicker();
    $('#loading-indicator').hide();
    const worldCookie = this.$cookies.get('world');
    let worldName;
    let $worldName = $('#worldName');
    if (this.isStr(worldCookie)) {
      worldName = Base64.decode(worldCookie);
      this.worldName = worldName;
      $worldName.selectpicker('val', worldName);
      $worldName.selectpicker('refresh');
    } else {
      this.worldName = '陆行鸟'
      $worldName.selectpicker('val', '陆行鸟');
      $worldName.selectpicker('refresh');
    }
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
    window.showTooltip = function (index) {
      $('#tooltipdiv' + index).show();
    };
    window.hideTooltip = function (index) {
      $('#tooltipdiv' + index).hide();
    };
  }
}
</script>