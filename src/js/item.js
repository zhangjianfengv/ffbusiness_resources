let query = {};
let itemTypes = {};
let oldSelected;

function initTable() {
    $('#table').bootstrapTable({
        url: '/ffbusiness/itemNew/realData',
        pagination: "true",
        sidePagination: "server",
        columns: [{
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
        }], method: 'post',
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

function searchItem() {
    $('#table').bootstrapTable('destroy');
    query = {
        id: $('#id').val(),
        name: $('#name').val(),
        description: $('#description').val(),
        itemUICategory: $('#itemUICategory').val(),
        levelItem: $('#levelItem').val(),
        itemTypes: $('#itemType').val()
    };
    initTable()
    $('#table').bootstrapTable('refresh', {
        query: query
    });
}

function resetQueryParams() {
    $('#queryForm')[0].reset();
    $('#table').bootstrapTable('destroy');
    query = {};
    let $itemType = $('#itemType');
    $itemType.selectpicker('val', []);
    $itemType.selectpicker('refresh');
    initTable()
}

$(document).ready(function () {
    $('select').selectpicker({'mobile': true});
    initTable();
    $.ajax({
        url: "/ffbusiness/itemType/all", async: true, method: "post", contentType: "application/json", success: handleType()
    });
})
$.ajax({url: "/ffbusiness/visitor/record", async: true, method: "post", contentType: "application/json"});
