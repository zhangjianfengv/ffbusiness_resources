let query = {
    worldName: '中国'
};

let paramCurrent = {};

function searchMarketable() {
    let url = window.location.protocol + '//' + window.location.host + '/ffbusiness/saleHistory/marketable';
    window.open(url, '_blank');
}

function openSearchItem() {
    let url = window.location.protocol + '//' + window.location.host + '/ffbusiness/itemNew/data';
    window.open(url, '_blank');
}

function initTable() {
    $('#table').bootstrapTable({
        url: '/ffbusiness/saleHistory/realData',
        pagination: "true",
        sidePagination: "server",
        columns: [{
            field: 'itemId',
            title: '物品ID'
        }, {
            field: 'itemName',
            formatter: function iconFormatter(value, row, index, field) {
                return formatIcon(row, value);
            },
            title: '物品名称'
        }, {
            field: 'pricePerUnit',
            visible: false,
            title: '单价'
        }, {
            field: 'quantity',
            visible: false,
            title: '数量'
        }, {
            field: 'sum',
            formatter: function sumFormatter(value, row, index, field) {
                return row.pricePerUnit + 'X' + row.quantity + '=' + value
            },
            title: '总计'
        }, {
            field: 'buyerName',
            title: '购买者'
        }, {
            field: 'worldName',
            title: '服务器'
        }, {
            field: 'hq',
            visible: false,
            title: '高品质'
        }, {
            field: 'timestamp',
            title: '购买时间'
        }, {
            title: '操作',
            width: 100,
            formatter:
                function operation(value, row, index, field) {
                    return ' <button class="btn btn-primary" onclick="queryCurrent(\'' + row.worldName + '\',' + row.itemId + ',\'' + row.itemName +
                        '\')"' +
                        ' type="button">现价</button>';
                },
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
        pageSize: 10,
        pageList: [20, 100, 200, 500, 1000],
    });
}

$.ajax({url: "/ffbusiness/visitor/record", async: true, method: "post", contentType: "application/json"});

function searchItem() {
    $('#table').bootstrapTable('destroy');
    query = {
        itemId: $('#itemId').val(),
        itemName: $('#itemName').val(),
        worldName: $('#worldName').val(),
        buyerName: $('#buyerName').val(),
        timestamp: $('#date').val()
    };
    initTable()
    $('#table').bootstrapTable('refresh', {
        query: query
    });
}

function formatIcon(row, value) {
    let url = window.location.protocol + '//' + window.location.host + '/icon/' + row.itemId + '.png';
    if (row.hq)
        return '<img src="' + url + '" decoding="async" width="32" height="32" alt="图标">&nbsp;&nbsp;' + value + '<img src="/hq.png"' +
            ' decoding="async" width="16" height="16" alt="hq">';
    else
        return '<img src="' + url + '" decoding="async" width="32" height="32" alt="图标">&nbsp;&nbsp;' + value;
}

function resetQueryParams() {
    $('#queryForm')[0].reset();
    $('#table').bootstrapTable('destroy');
    query = {
        worldName: '中国'
    };
    let $worldName = $('#worldName');
    $worldName.val('中国');
    $worldName.selectpicker('refresh');
    initTable()
}

function queryCurrent(name, id, itemName) {

    $.ajax({
        url: "/ffbusiness/currentData/queryParentWorld", async: true, method: "post",
        data: JSON.stringify({worldName: name}),
        contentType: "application/json", success: function (data) {
            $('#myModalLabel').html(data.worldName + itemName + '低价')
        }
    });

    $('#myModal').modal('show');
    let $currentTable = $('#currentTable');
    $currentTable.bootstrapTable('destroy');
    $currentTable.bootstrapTable({
        url: '/ffbusiness/currentData/queryCurrent',
        pagination: "true",
        columns: [{
            field: 'worldName',
            title: '服务器'
        }, {
            field: 'retainerName',
            title: '雇员名'
        }, {
            field: 'hq',
            formatter: function addButton(value, row, index, field) {
                if (value === 'true') return '<img src="/hq.png"' +
                    ' decoding="async" width="16" height="16" alt="hq">';
                else return '';
            },
            title: '高品质'
        }, {
            field: 'pricePerUnit',
            title: '单价'
        }, {
            field: 'quantity',
            title: '数量'
        }, {
            field: 'total',
            title: '总计'
        }], method: 'post',
        queryParams: function (params) {
            paramCurrent.worldName = name;
            paramCurrent.itemId = id;
            return paramCurrent;
        },
        contentType: "application/json",
        pageNumber: 1,//初始化加载第一页，默认第一页
        pageSize: 10,
        pageList: [20, 50]
    });

}

function closeCurrentTable() {
    $('#myModal').modal('toggle');
}

$(document).ready(function () {
    $('select').selectpicker({'mobile': true});
    $('#date').datepicker({language: 'zh-CN'});
    let cookie = getCookie('history');
    if (cookie) {
        // var base = new Base64();
        // let decode = base.decode(cookie);
        // var obj = JSON.parse(decode);
        // if (obj.worldName) {
        //     query.worldName = obj.worldName;
        //     $('#worldName').val(query.worldName);
        // }
    }
    initTable();
})

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}


