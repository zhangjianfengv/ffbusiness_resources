<template>

  <div id="app">
    <b-form inline id="queryForm">
      <b-col id="queryParam" cols="12">
        <b-row no-gutters>
          <b-form-input class="form-control" id="id" placeholder="id" type="text" value=""></b-form-input>
          <b-form-input class="form-control  mx-1" id="name" placeholder="名称" type="text" value=""></b-form-input>
          <b-form-input class="form-control" id="description" placeholder="描述" type="text" value=""></b-form-input>
          <b-form-input class="form-control" id="levelItem" placeholder="品级" type="text" value=""></b-form-input>
          <b-form-input class="selectpicker  mx-1" id="itemType" multiple title="选择物品类别"></b-form-input>
          <b-form-input class="btn btn-primary  mx-1" onclick="searchItem()" type="button">搜索</b-form-input>
          <b-form-input class="btn btn-primary" onclick="resetQueryParams()" type="button">重置</b-form-input>
        </b-row>
      </b-col>
    </b-form>
    <div>
      <BootstrapTable id="table"
                      ref="table"
                      :columns="columns"
                      :data="data"
                      :options="options"
                      @on-post-body="vueFormatterPostBody"
      />
    </div>

  </div>
</template>

<script>
import tableMixin from "@/mixins/table";
import $ from "jquery";
import {handleType} from "@/assets/itemType";

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
        itemTypes: $('#itemType').val()
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
        pageList: [20, 100, 200, 500, 1000],
      });
      $('#table').bootstrapTable('refresh', {
        query: query
      });
    },
    resetQueryParams() {
      $('#queryForm')[0].reset();
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
        pageList: [20, 100, 200, 500, 1000],
      });
    }
  },
  mounted() {
    $('select').selectpicker();
    $.ajax({
      url: "/ffbusiness/itemType/all", async: true, method: "post", contentType: "application/json", success: handleType()
    });
    $.ajax({url: "/ffbusiness/visitor/record", async: true, method: "post", contentType: "application/json"});
  }
}
</script>

<style scoped>

</style>