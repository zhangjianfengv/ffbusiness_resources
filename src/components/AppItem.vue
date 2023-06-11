<template>
  <div id="app">
    <b-form inline id="queryForm">
      <b-col id="queryParam" cols="12">
        <b-col id="queryParam" cols="12">
          <b-row no-gutters>
            <b-col cols="8">
              <b-form-input class="form-control" id="id" placeholder="id" type="text" value=""></b-form-input>
              <b-form-input class="form-control  mx-1" id="name" placeholder="名称" type="text" value=""></b-form-input>
              <b-form-input class="form-control" id="description" placeholder="描述" type="text" value=""></b-form-input>
              <b-form-input class="form-control" id="levelItem" placeholder="品级" type="text" value=""></b-form-input>
              <b-form-select class="selectpicker" id="itemType" multiple title="选择物品类别" v-model="itemTypes"></b-form-select>
            </b-col>
            <b-col cols="2">
            </b-col>
            <b-button variant="info" @click="searchItem()" type="button">搜索</b-button>
            <b-button variant="info" class="mx-1" @click="resetQueryParams()" type="button">重置</b-button>
          </b-row>
        </b-col>
      </b-col>
    </b-form>
    <div>
      <BootstrapTable id="table"
                      ref="table"
                      :columns="columns"
                      :data="data"
                      :options="options"
                      @on-post-body="vueFormatterPostBody"/>
    </div>
  </div>
</template>
<style>
.dropdown-item.active, .dropdown-item:active {
  color: #fff;
  text-decoration: none;
  background-color: #17a2b8 !important;
}
</style>
<script>
import tableMixin from '../mixins/table'
import $ from "jquery";

let itemTypes = {};
let oldSelected;
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
    },
  },
  mounted() {
    $('select').selectpicker();
    let $itemType = $('#itemType');
    const map = {};
    const parentMap = {};
    $itemType.on('changed.bs.select', function () {
      let selectedValues = $itemType.val();
      let newSelectedValues = [];
      for (let i = 0; i < selectedValues.length; i++) {
        let number = parseInt(selectedValues[i]);
        let exists = false;
        if (oldSelected && oldSelected.length > 0) {
          for (let oldSelectedElement of oldSelected) {
            if (number === oldSelectedElement) exists = true;
          }
        }
        if (itemTypes[number].isParent) {
          let element = parentMap[number];
          if (!exists) {
            for (let e of element) {
              newSelectedValues.push(e);
            }
          }
        }
        newSelectedValues.push(number);
      }
      if (oldSelected) {
        let rmValS = [];
        for (let oldSelectedElement of oldSelected) {
          let exist = false;
          for (let newSelectedValue of newSelectedValues) {
            if (newSelectedValue === oldSelectedElement) {
              exist = true;
              break;
            }
          }
          if (!exist)
            rmValS.push(oldSelectedElement);
        }
        if (rmValS) {
          let rmLength = rmValS.length;
          for (let rmVal of rmValS) {
            let parentMapElement = parentMap[rmVal];
            if (parentMapElement) {
              for (let parentMapElementKey in parentMapElement) {
                rmValS.push(parentMapElement[parentMapElementKey]);
              }
            }
          }
          rmValS.splice(0, rmLength);
          let rmIndex = []
          for (let i = 0; i < newSelectedValues.length; i++) {
            for (let rmVal of rmValS) {
              if (rmVal === newSelectedValues[i]) rmIndex.push(i);
            }
          }
          let values = [];
          for (let i = 0; i < newSelectedValues.length; i++) {
            let shouldRm = false;
            for (let index of rmIndex) {
              if (index === i) {
                shouldRm = true;
                break;
              }
            }
            if (!shouldRm)
              values.push(newSelectedValues[i]);
          }
          newSelectedValues = values;
        }

      }
      oldSelected = newSelectedValues;
      this.itemTypes = newSelectedValues;
      $itemType.selectpicker('refresh');
    });
    $.ajax({
      url: "/ffbusiness/itemType/all", async: true, method: "post", contentType: "application/json", success: function (data) {
        {
          for (let i = 0; i < data.length; i++) {
            let datum = data[i];
            map[datum.typeId] = datum;
            if (!datum.isParent && datum.parentType) {
              if (parentMap[datum.parentType]) parentMap[datum.parentType].push(datum.typeId);
              else {
                parentMap[datum.parentType] = [];
                parentMap[datum.parentType].push(datum.typeId);
              }
            }
          }
          itemTypes = map;
          let $itemType = $('#itemType');
          for (let i = 0; i < data.length; i++) {
            $itemType.append("<option value='" +
                data[i].typeId + "'>" +
                data[i].typeName + "</option>");
          }
          $itemType.selectpicker('refresh');
          $itemType.on('changed.bs.select', function () {
            let selectedValues = $itemType.val();
            let newSelectedValues = [];
            for (let i = 0; i < selectedValues.length; i++) {
              let number = parseInt(selectedValues[i]);
              let exists = false;
              if (oldSelected && oldSelected.length > 0) {
                for (let oldSelectedElement of oldSelected) {
                  if (number === oldSelectedElement) exists = true;
                }
              }
              if (itemTypes[number].isParent) {
                let element = parentMap[number];
                if (!exists) {
                  for (let e of element) {
                    newSelectedValues.push(e);
                  }
                }
              }
              newSelectedValues.push(number);
            }
            if (oldSelected) {
              let rmValS = [];
              for (let oldSelectedElement of oldSelected) {
                let exist = false;
                for (let newSelectedValue of newSelectedValues) {
                  if (newSelectedValue === oldSelectedElement) {
                    exist = true;
                    break;
                  }
                }
                if (!exist)
                  rmValS.push(oldSelectedElement);
              }
              if (rmValS) {
                let rmLength = rmValS.length;
                for (let rmVal of rmValS) {
                  let parentMapElement = parentMap[rmVal];
                  if (parentMapElement) {
                    for (let parentMapElementKey in parentMapElement) {
                      rmValS.push(parentMapElement[parentMapElementKey]);
                    }
                  }
                }
                rmValS.splice(0, rmLength);
                let rmIndex = []
                for (let i = 0; i < newSelectedValues.length; i++) {
                  for (let rmVal of rmValS) {
                    if (rmVal === newSelectedValues[i]) rmIndex.push(i);
                  }
                }
                let values = [];
                for (let i = 0; i < newSelectedValues.length; i++) {
                  let shouldRm = false;
                  for (let index of rmIndex) {
                    if (index === i) {
                      shouldRm = true;
                      break;
                    }
                  }
                  if (!shouldRm)
                    values.push(newSelectedValues[i]);
                }
                newSelectedValues = values;
              }

            }
            oldSelected = newSelectedValues;
            this.itemTypes = newSelectedValues;
            $itemType.selectpicker('refresh');
          });
        }
      }
    });
    $.ajax({url: "/ffbusiness/visitor/record", async: true, method: "post", contentType: "application/json"});
  }
}
</script>