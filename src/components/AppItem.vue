<template>
  <div id="app">
    <b-form inline id="itemForm">
      <b-col id="queryParam">
        <b-row>
          <b-form-input class="form-control" id="id" placeholder="id" type="text" value=""></b-form-input>
          <b-form-input class="form-control  mx-1" id="name" placeholder="名称" type="text" value=""></b-form-input>
          <b-form-input class="form-control" id="description" placeholder="描述" type="text" value=""></b-form-input>
          <b-form-input class="form-control" id="levelItem" placeholder="品级" type="text" value=""></b-form-input>
          <bt-select :options="itemTypeOptions" v-model="itemTypes" ref="typeSelect" id="itemType">
          </bt-select>
          <b-button variant="info" @click="searchItem()" type="button">搜索</b-button>
          <b-button variant="info" class="mx-1" @click="resetQueryParams()" type="button">重置</b-button>
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
  </div>
</template>
<style>
.bootstrap-table .fixed-table-toolbar .bs-bars, .bootstrap-table .fixed-table-toolbar .columns, .bootstrap-table .fixed-table-toolbar .search {
  position: relative;
  max-width: 94%;
  margin: 10px 5px;
}

.dropdown-item.active, .dropdown-item:active, .btn-secondary ,.btn-info{
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

input.form-control {
  max-width: 205px;
  display: inline !important;
}
</style>
<script>
import tableMixin from '../mixins/table'
import $ from "jquery";

let query = {};
let columns = [{
  field: 'id',
  title: 'id'
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
}];
export default {
  mixins: [tableMixin],
  data() {
    return {
      scale: 24,
      worldName: '中国',
      min: null,
      max: null,
      sortType: "1",
      columns: columns,
      itemTypes: [],
      options: {
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
        showJumpto: true,
        pageNumber: 1,//初始化加载第一页，默认第一页
        pageSize: 100,
        toolbar: '#itemForm',
        stickyHeader: true,
        stickyHeaderOffsetLeft: parseInt($('body').css('padding-left'), 10),
        stickyHeaderOffsetRight: parseInt($('body').css('padding-right'), 10),
        theadClasses: 'thead-light',
        itemTypes: [],
        itemTypeOptions: [],
        pageList: [20, 100, 200, 500, 1000]
      }
    }
  },
  methods: {
    searchItem() {
      $('#table').bootstrapTable('destroy');
      query = {
        id: $('#id').val(),
        name: $('#name').val(),
        description: $('#description').val(),
        itemUICategory: $('#itemUICategory').val(),
        levelItem: $('#levelItem').val(),
        itemTypes: this.itemTypes
      };
      $('#table').bootstrapTable({
        url: '/ffbusiness/itemNew/realData',
        pagination: "true",
        sidePagination: "server",
        columns: columns, method: 'post',
        contentType: "application/json",
        queryParamsType: '',
        queryParams: function (params) {
          query.pageSize = params.pageSize;
          query.pageNumber = params.pageNumber;
          return query
        },
        showJumpto: true,
        pageNumber: 1,//初始化加载第一页，默认第一页
        pageSize: 100,
        toolbar: '#itemForm',
        stickyHeader: true,
        stickyHeaderOffsetLeft: parseInt($('body').css('padding-left'), 10),
        stickyHeaderOffsetRight: parseInt($('body').css('padding-right'), 10),
        theadClasses: 'thead-light',
        itemTypes: [],
        itemTypeOptions: [],
        pageList: [20, 100, 200, 500, 1000],
      });
      $('#table').bootstrapTable('refresh', {
        query: query
      });
    },
    resetQueryParams() {
      $('#itemForm')[0].reset();
      $('#table').bootstrapTable('destroy');
      query = {};
      let $itemType = $('#itemType');
      $itemType.selectpicker('val', []);
      $itemType.selectpicker('refresh');
      $('#table').bootstrapTable({
        url: '/ffbusiness/itemNew/realData',
        pagination: "true",
        sidePagination: "server",
        columns: columns, method: 'post',
        contentType: "application/json",
        queryParamsType: '',
        queryParams: function (params) {
          query.pageSize = params.pageSize;
          query.pageNumber = params.pageNumber;
          return query
        },
        showJumpto: true,
        pageNumber: 1,//初始化加载第一页，默认第一页
        pageSize: 100,
        toolbar: '#itemForm',
        stickyHeader: true,
        stickyHeaderOffsetLeft: parseInt($('body').css('padding-left'), 10),
        stickyHeaderOffsetRight: parseInt($('body').css('padding-right'), 10),
        theadClasses: 'thead-light',
        itemTypes: [],
        itemTypeOptions: [],
        pageList: [20, 100, 200, 500, 1000],
      });
    },
  },
  mounted() {
    $('select').selectpicker();
    $.ajax({
      url: "/ffbusiness/itemType/all", async: true, method: "post", contentType: "application/json", success: function (data) {
        this.options = data;
      }
    });
    $.ajax({url: "/ffbusiness/visitor/record", async: true, method: "post", contentType: "application/json"});
  }
}
</script>