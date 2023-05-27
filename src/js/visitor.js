let query = {};

function initTable() {
    $('#table').bootstrapTable({
        url: '/ffbusiness/visitor/realData',
        pagination: "true",
        sidePagination: "server",
        columns: [{
            field: 'id',
            title: 'id'
        }, {
            field: 'ip',

            title: 'ip'
        }, {
            field: 'visitTime',
            title: '时间'
        }, {
            field: 'userAgent',
            title: 'UA'
        }, {
            field: 'path',
            title: 'path'
        }, {
            field: 'queryParam',
            title: '参数'
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
        pageSize: 200,
        pageList: [20, 100, 200, 500, 1000],
    });
}

$(document).ready(function () {
    initTable();
})
