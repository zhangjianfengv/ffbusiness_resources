<template>
  <div id="app">
    <b-form inline id="itemForm">
      <!--      <b-form-input class="form-control" id="id" placeholder="id" type="text" value=""></b-form-input>-->
      <b-form-input list="input-list" v-model="itemName" placeholder="物品名" value=""></b-form-input>
      <b-form-datalist id="input-list" :options="nameOptions"></b-form-datalist>
      <b-form-input class="form-control" v-model="levelEquip" placeholder="等级" type="text" value=""></b-form-input>
      <b-form-input class="form-control" v-model="levelItem" placeholder="品级" type="text" value=""></b-form-input>
      <b-form-input class="form-control" id="description" placeholder="描述" type="text" value=""></b-form-input>
      <bt-select :options="itemTypeOptions" v-model="itemTypes" ref="typeSelect" id="itemType">
      </bt-select>
      <b-form-checkbox v-model="canMake" style="margin: 5px 9px" value="true" unchecked-value="false"
                       @change="searchItem()">
        可制作
      </b-form-checkbox>
      <b-form-checkbox v-model="gil" style="margin: 5px 9px" value="1" unchecked-value="0"
                       @change="searchItem()">
        金币购买
      </b-form-checkbox>
      <b-form-checkbox v-model="canGather" style="margin: 5px 9px" value="true" unchecked-value="false"
                       @change="searchItem()">
        可采集
      </b-form-checkbox>
      <b-form-checkbox v-model="canBeHq" style="margin: 5px 9px" value="true" unchecked-value="false"
                       @change="searchItem()">
        高品质
      </b-form-checkbox>
      <b-form-checkbox v-model="trade" style="margin: 5px 9px" value="true" unchecked-value="false"
                       @change="searchItem()">
        可出售
      </b-form-checkbox>
      <b-button variant="info" @click="searchItem()" type="button"><i class="bi bi-search"></i></b-button>
      <b-button variant="info" class="mx-1" @click="resetQueryParams()"
                type="button"><i class="bi bi-arrow-clockwise"></i></b-button>
    </b-form>
    <div>
      <BootstrapTable id="table"
                      ref="table"
                      :columns="columns"
                      :options="options"
                      @on-post-body="vueFormatterPostBody"/>
    </div>
    <div aria-hidden="true" class="modal fade" id="recipeModal" role="dialog" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" style="margin: 0 auto" id="recipeLabel"></h4>
          </div>
          <div class="modal-body recipe">
            <ul id="recipeTree">
              <ul id="demo">
                <Tree
                    class="item"
                    :item="treeData"
                ></Tree>
              </ul>
            </ul>
            <div id="recipeList">
              <b-form-select v-model="worldName" id="worldName" @change="changeWorld(treeDat)">
                <b-form-select-option value="陆行鸟" style="font-weight: bold;font-style: italic;">陆行鸟
                </b-form-select-option>
                <b-form-select-option value="拉诺西亚">拉诺西亚</b-form-select-option>
                <b-form-select-option value="幻影群岛">幻影群岛</b-form-select-option>
                <b-form-select-option value="神意之地">神意之地</b-form-select-option>
                <b-form-select-option value="萌芽池">萌芽池</b-form-select-option>
                <b-form-select-option value="红玉海">红玉海</b-form-select-option>
                <b-form-select-option value="宇宙和音">宇宙和音</b-form-select-option>
                <b-form-select-option value="沃仙曦染">沃仙曦染</b-form-select-option>
                <b-form-select-option value="晨曦王座">晨曦王座</b-form-select-option>
                <b-form-select-option value="猫小胖" style="font-weight: bold;font-style: italic;">猫小胖
                </b-form-select-option>
                <b-form-select-option value="紫水栈桥">紫水栈桥</b-form-select-option>
                <b-form-select-option value="摩杜纳">摩杜纳</b-form-select-option>
                <b-form-select-option value="海猫茶屋">海猫茶屋</b-form-select-option>
                <b-form-select-option value="琥珀原">琥珀原</b-form-select-option>
                <b-form-select-option value="静语庄园">静语庄园</b-form-select-option>
                <b-form-select-option value="延夏">延夏</b-form-select-option>
                <b-form-select-option value="柔风海湾">柔风海湾</b-form-select-option>
                <b-form-select-option value="莫古力" style="font-weight: bold;font-style: italic;">莫古力
                </b-form-select-option>
                <b-form-select-option value="梦羽宝境">梦羽宝境</b-form-select-option>
                <b-form-select-option value="旅人栈桥">旅人栈桥</b-form-select-option>
                <b-form-select-option value="白银乡">白银乡</b-form-select-option>
                <b-form-select-option value="白金幻象">白金幻象</b-form-select-option>
                <b-form-select-option value="拂晓之间">拂晓之间</b-form-select-option>
                <b-form-select-option value="神拳痕">神拳痕</b-form-select-option>
                <b-form-select-option value="龙巢神殿">龙巢神殿</b-form-select-option>
                <b-form-select-option value="潮风亭">潮风亭</b-form-select-option>
                <b-form-select-option value="豆豆柴" style="font-weight: bold;font-style: italic;">豆豆柴
                </b-form-select-option>
                <b-form-select-option value="银泪湖">银泪湖</b-form-select-option>
                <b-form-select-option value="伊修加德">伊修加德</b-form-select-option>
                <b-form-select-option value="红茶川">红茶川</b-form-select-option>
                <b-form-select-option value="太阳海岸">太阳海岸</b-form-select-option>
                <b-form-select-option value="水晶塔">水晶塔</b-form-select-option>
                <b-form-select-option selected value="中国" style="font-weight: bold;font-style: italic;">中国
                </b-form-select-option>
              </b-form-select>
              <b-form-input id="sb-inline" class="mb-3" v-model="craftCount" type="number" inline></b-form-input>
              <ul>
                <li style="list-style-type:none" v-for="(value, key) in materials">{{ key }}*{{
                    value.num * craftCount
                  }}个*{{
                    value.price
                  }}={{ value.num * value.price * craftCount }}
                </li>
              </ul>
              <span>成本总计{{ this.singeCost * craftCount }}({{ this.worldName }})</span>
            </div>
          </div>
          <div id="loading-indicator" class="text-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-dismiss="modal" @click="closeRecipe" type="button"><i
                class="bi bi-power"></i></button>
          </div>
        </div>
      </div>
    </div>
    <div aria-hidden="true" class="modal fade" id="sourceModal" role="dialog" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" style="margin: 0 auto" id="sourceLabel"></h4>
          </div>
          <div class="modal-body">
            <BootstrapTable id="sourceTable"
                            ref="sourceTable"
                            @on-post-body="vueFormatterPostBody"/>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-dismiss="modal" @click="closeSource" type="button"><i
                  class="bi bi-power"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div aria-hidden="true" class="modal fade" id="gatherModal" role="dialog" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" style="margin: 0 auto" id="gatherLabel"></h4>
          </div>
          <div class="modal-body">
            <BootstrapTable id="gatherTable"
                            ref="gatherTable"
                            @on-post-body="vueFormatterPostBody"/>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-dismiss="modal" @click="closeGather" type="button"><i
                  class="bi bi-power"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="text-align:center;color: #bbb;font-size: 12px;text-decoration: none;">
      本站基础物品数据来源于&nbsp;<a style="text-align:center;color: #bbb;font-size: 12px;text-decoration: none;"
                                     href="https://github.com/thewakingsands/" target="_blank">CafeMaker</a>&nbsp;和&nbsp;<a
        style="text-align:center;color: #bbb;font-size: 12px;text-decoration: none;"
        href="https://garlandtools.cn/db/" target="_blank">GarlandTools Database</a>&nbsp;© 2023 SQUARE ENIX CO., LTD.
      All Rights Reserved.
    </div>
  </div>
</template>
<style>
</style>
<style scoped>
.recipe {
  padding-left: 60px;
}

ul {
  padding: 0;
}
</style>
<script>
import tableMixin from '../mixins/table'
import $ from "jquery";
import Tree from "@/components/Tree.vue";
import Base64 from "@/plugins/base64.js";

let query = {};

export default {
  components: {Tree},
  mixins: [tableMixin],
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
              vm.itemName = data;
            }
          });
        }
      }, 500);
    },
  },
  data() {
    let columns = [{
      field: 'id',
      title: 'id'
    }, {
      formatter: (value, row) => {
        let url = "https://static.ff14pvp.top/icon/icon/" + row.id + '.png?eo-img.resize=w/32/h/32';
        return '<img src="' + url + '" width="32" height="32" alt="&nbsp;&nbsp;&nbsp;&nbsp;">';
      },
      title: '图标'
    }, {
      field: 'name',
      title: '名称'
    }, {
      field: 'description',
      title: '描述'
    }, {
      field: 'levelEquip',
      title: '等级'
    }, {
      field: 'levelItem',
      title: '品级'
    }, {
      field: 'stackSize',
      title: '堆叠'
    }, {
      field: 'job',
      title: '职业',
      formatter: (value) => {
        if (value === '冒险者') {
          return ''
        } else return value;
      }
    }, {
      field: 'canBeHq',
      title: '高品质',
      formatter: (value) => {
        return value === false ? '' : '✔'
      }
    }, {
      field: 'isUnique',
      title: '独占',
      formatter: (value) => {
        return value === true ? '✔' : ''
      }
    }, {
      field: 'isCrestWorthy',
      title: '珍稀',
      formatter: (value) => {
        return value === true ? '✔' : ''
      }
    }, {
      field: 'isUntradable',
      title: '可出售',
      formatter: (value) => {
        return value === false ? '✔' : ''
      }

    }, {
      field: 'isDyeable',
      title: '可分解',
      formatter: (value) => {
        return value === true ? '✔' : ''
      }
    },
      //   {
      //   field: 'isIndisposable',
      //   title: '可丢弃',
      //   formatter: (value) => {
      //     return value === false ? '✔' : ''
      //   },
      // },
      {
        field: 'gather',
        title: '采集',
        align: 'center',
        formatter: (value, row) => {
          if (row.gatherCount > 0 && !row.recipeCount) {
            let template = '<b-button variant="info" @click="seeGather(row)"><i class="bi bi-snow2"></i></b-button>';
            return this.vueFormatter({
              template: template,
              data: {row},
              methods: {
                seeGather: this.seeGather
              }
            })
          } else return '';
        }
      },
      {
        title: 'NPC购买兑换',
        align: 'center',
        formatter: (value, row) => {
          if (row.npcTrade) {
            let template = '<b-button variant="info" @click="seeSource(row)"><i class="bi bi-shop"></i></b-button>';
            return this.vueFormatter({
              template: template,
              data: {row},
              methods: {
                seeSource: this.seeSource
              }
            })
          } else return '';
        }
      }, {
        title: '查看配方',
        formatter: (value, row) => {
          if (row.craft) {
            let template = '<b-button variant="info" @click="clickRow(row)"><i class="bi bi-receipt-cutoff"></i></b-button>';
            return this.vueFormatter({
              template: template,
              data: {row},
              methods: {
                clickRow: this.openRecipe
              }
            })
          } else return '';
        }
      }, {
        title: '材料成本计算',
        formatter: (value, row) => {
          if (row.craft) {
            let template = '<b-button variant="info" @click="clickRow(row)"><i class="bi bi-calculator"></i></b-button>';
            return this.vueFormatter({
              template: template,
              data: {row},
              methods: {
                clickRow: this.openList
              }
            })
          } else return '';
        }
      }];
    const vm = this;
    let options = {
      url: '/ffbusiness/itemNew/realData',
      pagination: "true",
      sidePagination: "server",
      method: 'post',
      contentType: "application/json",
      queryParamsType: '',
      queryParams: function (params) {
        query.pageSize = params.pageSize;
        query.pageNumber = params.pageNumber;
        query.id = vm.$route.query.id ? vm.$route.query.id : null;
        return query
      },
      pageNumber: 1,
      pageSize: 15,
      toolbar: '#itemForm',
      itemTypes: [],
      mobileResponsive: true,
      paginationUseIntermediate: true,
      paginationSuccessivelySize: 1,
      paginationPagesBySide: 1,
      checkOnInit: true,
      itemTypeOptions: [],
      pageList: [50, 100, 200, 500, 1000]
    };
    return {
      worldName: '中国',
      columns: columns,
      options: options,
      nameOptions: [],
      singeCost: 0,
      itemName: '',
      itemId: this.$route.query.id,
      trade: null,
      timer: null,
      canBeHq: null,
      canMake: null,
      levelItem: null,
      levelEquip: null,
      gil: null,
      canGather: null,
      materials: [],
      craftCount: 1,
      itemTypes: [],
      treeData: {},
      tempItemId: 0
    }
  },
  activated() {
    let id = this.$route.query.id
    if (id && id !== this.itemId) {
      this.itemId = id;
      $.ajax({
        url: "/ffbusiness/itemNew/suggestName",
        async: true,
        method: "post",
        contentType: "application/json",
        data: JSON.stringify({id: id}),
        success: function (data) {
          vm.nameOptions = data;
        }
      });
      this.searchItem();
    }
    if (!id) {
      this.itemId = null;
    }
  },
  methods: {
    searchItem() {
      let $table = $('#table');
      $table.bootstrapTable('destroy');
      query = {
        id: this.itemId,
        name: this.itemName,
        description: $('#description').val(),
        itemUICategory: $('#itemUICategory').val(),
        levelItem: this.levelItem,
        levelEquip: this.levelEquip,
        itemTypes: this.itemTypes,
        isUntradable: this.trade !== 'true',
        currencyId: this.gil === '1' ? this.gil : null,
        canBeHq: this.canBeHq,
        canGather: this.canGather,
        canMake: this.canMake,
      };
      this.options.columns = this.columns;
      $table.bootstrapTable(this.options)
      $table.bootstrapTable('refresh', {
        query: query
      });
    },
    resetQueryParams() {
      window.location.href = '/#/item';
      let $table = $('#table');
      $('#itemForm')[0].reset();
      $table.bootstrapTable('destroy');
      query = {};
      this.itemId = null;
      this.itemName = null;
      this.trade = 0;
      this.canBeHq = 0;
      this.gil = '0';
      this.canGather = 0;
      this.canMake = 0;
      this.levelEquip = null;
      this.levelItem = null;
      let $itemType = $('#itemType');
      $itemType.selectpicker('val', []);
      $itemType.selectpicker('refresh');
      this.options.columns = this.columns;
      $table.bootstrapTable(this.options)
    },
    openRecipe(row) {
      const vm = this;
      $('#loading-indicator').show();
      $('#recipeList').hide();
      let url = "https://static.ff14pvp.top/icon/icon/" + row.id + '.png?eo-img.resize=w/32/h/32';
      $('#recipeLabel').html('<img src="' + url +
          '" decoding="async" width="32" height="32" alt="图标">' + row.name + '&nbsp;配方');
      $('#recipeModal').modal('show');
      $.ajax({
        url: "/ffbusiness/recipe/getOne", method: "post", contentType: "application/json",
        data: JSON.stringify({itemId: row.id}),
        success: function (data) {
          $('#loading-indicator').hide();
          $('#recipeTree').show();
          vm.treeData = data.tree;
        }
      });
    }, openList(row) {
      const vm = this;
      $('#loading-indicator').show();
      $('#recipeTree').hide();
      $('#recipeList').hide();
      this.craftCount = 1;
      this.tempItemId = row.id;
      let url = "https://static.ff14pvp.top/icon/icon/" + row.id + '.png?eo-img.resize=w/32/h/32';
      $('#recipeLabel').html('<img src="' + url +
          '" decoding="async" width="32" height="32" alt="图标">' + row.name + '&nbsp;材料成本计算');
      $('#recipeModal').modal('show');
      $.ajax({
        url: "/ffbusiness/recipe/cost", method: "post", contentType: "application/json",
        data: JSON.stringify({itemId: row.id, worldName: this.worldName}),
        success: function (data) {
          $('#loading-indicator').hide();
          $('#recipeList').show();
          vm.materials = data.list;
          let total = 0;
          for (let item in data.list) {
            total += data.list[item].price * data.list[item].num;
          }
          vm.singeCost = total;
        }
      });
    }, changeWorld() {
      const vm = this;
      this.craftCount = 1;
      $.ajax({
        url: "/ffbusiness/recipe/cost", method: "post", contentType: "application/json",
        data: JSON.stringify({itemId: this.tempItemId, worldName: this.worldName}),
        success: function (data) {
          $('#loading-indicator').hide();
          $('#recipeList').show();
          vm.materials = data.list;
          let total = 0;
          for (let item in data.list) {
            total += data.list[item].price * data.list[item].num;
          }
          vm.singeCost = total;
        }
      });
    }, seeSource(row) {
      $.ajax({
        url: "/ffbusiness/npcSell/list",
        async: true,
        method: "post",
        contentType: "application/json",
        data: JSON.stringify({itemId: row.id}),
        success: function (data) {
          let $sourceTable = $('#sourceTable');
          $sourceTable.bootstrapTable('destroy')
          $('#sourceModal').modal('show');
          let url = "https://static.ff14pvp.top/icon/icon/" + row.id + '.png?eo-img.resize=w/32/h/32';
          $('#sourceLabel').html('<img src="' + url +
              '" decoding="async" width="32" height="32" alt="图标">' + row.name + '&nbsp;购买兑换');
          $sourceTable.bootstrapTable({
            data: data,
            columns: [{
              formatter: (value, row) => {
                return row.npcName + (row.shopName == null ? '' : '-' + row.shopName) + (row.shopSubName == null ? '' : '-' + row.shopSubName);
              },
              title: '商人'
            }, {
              formatter: (value, row) => {
                return row.locationName + '<br/>X: ' + row.locationX + ',Y: ' + row.locationY
              },
              title: '位置'
            }, {
              formatter: (value, row) => {
                let url = "https://static.ff14pvp.top/icon/icon/" + row.currencyId + '.png?eo-img.resize=w/32/h/32';
                let s = '<img src="' + url + '" decoding="async" width="32" height="32" alt="图标">';
                return s + 'X' + row.price;
              },
              title: '消耗',
            }],
            mobileResponsive: true,
            checkOnInit: true
          });
        }
      });
    }, seeGather(row) {
      $.ajax({
        url: "/ffbusiness/itemGather/list",
        async: true,
        method: "post",
        contentType: "application/json",
        data: JSON.stringify({itemId: row.id}),
        success: function (data) {
          let $sourceTable = $('#gatherTable');
          $sourceTable.bootstrapTable('destroy')
          $('#gatherModal').modal('show');
          let url = "https://static.ff14pvp.top/icon/icon/" + row.id + '.png?eo-img.resize=w/32/h/32';
          $('#gatherLabel').html('<img src="' + url +
              '" decoding="async" width="32" height="32" alt="图标">' + row.name + '&nbsp;采集地点');
          $sourceTable.bootstrapTable({
            data: data,
            columns: [{
              field: 'locationName',
              title: '地图'
            }, {
              formatter: (value, row) => {
                return 'X: ' + row.locationX + ',Y: ' + row.locationY
              },
              title: '位置'
            }, {
              field: 'type',
              formatter: (value) => {
                return !value ? '常驻' : value;
              },
              title: '类型',
            }, {
              formatter: (value, row) => {
                if (row.type && row.et1) {
                  let s;
                  s = row.et1;
                  if (row.et2)
                    s = s + ',' + row.et2;
                  return s;
                } else return '';
              },
              title: 'ET'
            }],
            mobileResponsive: true,
            checkOnInit: true
          });
        }
      });

    },
    isStr(val) {
      return val !== null && val !== undefined && val !== '' && val.replace(/(^s*)|(s*$)/g, "").length !== 0;
    },
    closeRecipe() {
      $('#recipeModal').modal('toggle');
    },
    closeSource() {
      $('#sourceModal').modal('toggle');
    },
    closeGather() {
      $('#gatherModal').modal('toggle');
    }
  },
  mounted() {
    $('#itemType').selectpicker();
    $.ajax({
      url: "/ffbusiness/itemType/all", method: "post", contentType: "application/json", success: function (data) {
        this.options = data;
      }
    });
    const worldCookie = this.$cookies.get('world');
    if (this.isStr(worldCookie)) {
      this.worldName = Base64.decode(worldCookie);
    } else this.worldName = "中国";
  }

}
</script>