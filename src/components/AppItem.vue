<template>
  <div id="app">
    <b-form inline id="itemForm">
      <b-col id="queryParam">
        <b-row>
          <b-form-input class="form-control" id="id" placeholder="id" type="text" value=""></b-form-input>
          <b-form-input list="input-list" v-model="itemName" placeholder="物品名" value=""></b-form-input>
          <b-form-datalist id="input-list" :options="nameOptions"></b-form-datalist>
          <b-form-input class="form-control" id="description" placeholder="描述" type="text" value=""></b-form-input>
          <b-form-input class="form-control" id="levelItem" placeholder="品级" type="text" value=""></b-form-input>
          <bt-select :options="itemTypeOptions" v-model="itemTypes" ref="typeSelect" id="itemType">
          </bt-select>
          <b-form-checkbox v-model="canBeHq" style="margin: 5px 9px" value="true" unchecked-value="false" @change="searchItem()">
            高品质
          </b-form-checkbox>
          <b-form-checkbox v-model="trade" style="margin: 5px 9px" value="true" unchecked-value="false" @change="searchItem()">
            可出售
          </b-form-checkbox>
          <b-button variant="info" @click="searchItem()" type="button"><i class="bi bi-search"></i></b-button>
          <b-button variant="info" class="mx-1" @click="resetQueryParams()"
                    type="button"><i class="bi bi-arrow-clockwise"></i></b-button>
        </b-row>
      </b-col>
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
          <div class="modal-body">
            <ul id="recipeTree">
              <ul id="demo">
                <Tree
                    class="item"
                    :item="treeData"
                ></Tree>
              </ul>
            </ul>
            <div id="recipeList">
              <b-form-input id="sb-inline" class="mb-3" v-model="craftCount" type="number" inline></b-form-input>
              <ul>
                <li style="list-style-type:none" v-for="(value, key) in materials">{{ key }}X{{ value * craftCount }}</li>
              </ul>
            </div>
          </div>
          <div id="loading-indicator" class="text-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-dismiss="modal" @click="closeRecipe()" type="button"><i
                class="bi bi-power"></i></button>
          </div>
        </div>
      </div>
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
</style>
<style scoped>
input.form-control {
  max-width: 100px;
  display: inline !important;
}

.modal-body {
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

let query = {};

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
export default {
  components: {Tree},
  mixins: [tableMixin],
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
  data() {
    let columns = [{
      field: 'id',
      title: 'id'
    }, {
      formatter: (value, row) => {
        let url = window.location.protocol + '//' + window.location.host + '/icon/' + row.id + '.png?eo-img.resize=w/32/h/32';
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
    }, {
      field: 'isIndisposable',
      title: '可丢弃',
      formatter: (value) => {
        return value === false ? '✔' : ''
      },
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
      title: '材料清单计算',
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
    return {
      columns: columns,
      options: options,
      nameOptions: [],
      itemName: '',
      trade: null,
      timer: null,
      canBeHq: null,
      materials: [],
      craftCount: 1,
      itemTypes: [],
      treeData: {}
    }
  },
  methods: {
    searchItem() {
      let $table = $('#table');
      $table.bootstrapTable('destroy');
      query = {
        id: $('#id').val(),
        name: this.itemName,
        description: $('#description').val(),
        itemUICategory: $('#itemUICategory').val(),
        levelItem: $('#levelItem').val(),
        itemTypes: this.itemTypes,
        isUntradable: this.trade !== 'true',
        canBeHq: this.canBeHq
      };
      options.columns = this.columns;
      $table.bootstrapTable(options)
      $table.bootstrapTable('refresh', {
        query: query
      });
    },
    resetQueryParams() {
      let $table = $('#table');
      $('#itemForm')[0].reset();
      $table.bootstrapTable('destroy');
      query = {};
      this.itemName = null;
      this.trade = 0;
      this.canBeHq = 0;
      let $itemType = $('#itemType');
      $itemType.selectpicker('val', []);
      $itemType.selectpicker('refresh');
      options.columns = this.columns;
      $table.bootstrapTable(options)
    },
    openRecipe(row) {
      const vm = this;
      $('#loading-indicator').show();
      $('#recipeList').hide();
      let url = window.location.protocol + '//' + window.location.host + '/icon/' + row.id + '.png?eo-img.resize=w/32/h/32';
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
      this.craftCount = 1;
      let url = window.location.protocol + '//' + window.location.host + '/icon/' + row.id + '.png?eo-img.resize=w/32/h/32';
      $('#recipeLabel').html('<img src="' + url +
          '" decoding="async" width="32" height="32" alt="图标">' + row.name + '&nbsp;材料清单');
      $('#recipeModal').modal('show');
      $.ajax({
        url: "/ffbusiness/recipe/getOne", method: "post", contentType: "application/json",
        data: JSON.stringify({itemId: row.id}),
        success: function (data) {
          $('#loading-indicator').hide();
          $('#recipeList').show();
          vm.materials = data.list;
        }
      });
    },
    isStr(val) {
      return val !== null && val !== undefined && val !== '' && val.replace(/(^s*)|(s*$)/g, "").length !== 0;
    },
    closeRecipe() {
      $('#recipeModal').modal('toggle');
    }
  },
  mounted() {
    $('select').selectpicker();
    $.ajax({
      url: "/ffbusiness/itemType/all", method: "post", contentType: "application/json", success: function (data) {
        this.options = data;
      }
    });
  }
}
</script>