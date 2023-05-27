let queryMarketable = {
    worldName: '中国',
    timeScale: 24
};
let itemTypes = {};
let oldSelected;
let columns = [{
    field: 'itemId',
    sortable: true,
    visible: false,
    title: '物品ID'
}, {
    field: 'name',
    sortable: true,
    formatter: function iconFormatter(value, row, index, field) {
        return formatIcon(row, value);
    },
    title: '物品名称'
}, {
    field: 'quantity',
    sortable: true,
    visible: false,
    title: $('#timeScale option:selected').html().slice(2) + '售出数'
}, {
    field: 'num',
    sortable: true,
    title: $('#timeScale option:selected').html().slice(2) + '交易次数'
}, {
    field: 'numIndexCurrent',
    sortable: true,
    title: '次数排序'
}, {
    field: 'numIndexChange',
    sortable: true,
    title: '排序较上次',
    formatter: function changeFormatter(value, row, index, field) {
        return formatChange(row, value);
    },
}, {
    field: 'quantityIndexCurrent',
    sortable: true,
    visible: false,
    title: '售出数排序'
}, {
    field: 'quantityIndexChange',
    sortable: true,
    visible: false,
    title: '排序较上次',
    formatter: function changeFormatter(value, row, index, field) {
        return formatChange(row, value);
    },
}, {
    field: 'pricePerUnit',
    sortable: true,
    title: '均价'
}, {
    field: 'itemTypeName',
    sortable: true,
    visible: false,
    title: '分类'
}, {
    field: 'itemLevel',
    sortable: true,
    visible: false,
    title: '品级'
}, {
    field: 'equipLevel',
    sortable: true,
    visible: false,
    title: '等级'
}];

function filterMarketable() {
    const $marketableTable = $('#marketableTable');
    const timeScale = $('#timeScale').val();
    queryMarketable = {
        worldName: $('#worldName').val(),
        timeScale: timeScale,
        max: $('#max').val(),
        min: $('#min').val(),
        itemTypes: $('#itemType').val()
    };
    initBySortType();
    if (timeScale > 24) {
        columns[2].title = timeScale / 24 + '天售出数';
        columns[3].title = timeScale / 24 + '天交易次数';
    } else {
        columns[2].title = timeScale + '小时售出数';
        columns[3].title = timeScale + '小时交易次数';
    }
    $marketableTable.bootstrapTable('refreshOptions', {
        columns: columns
    })
    $marketableTable.bootstrapTable('refresh', {
        query: queryMarketable
    });
}

function formatChange(row, value) {
    if (value === 0) return "持平"
    else if (value > 0) return "<h4 style='display: inline;color: #1e7e34'>↓</h4>&nbsp;" + value;
    else if (value < 0) return "<h4 style='display: inline; color: #b94a48'>↑</h4>&nbsp;" + (-value);
    else return "无此物品"
}

function initMarketableNum() {
    $('#marketableTable').bootstrapTable({
        url: '/ffbusiness/saleHistory/marketableData',
        search: true,
        searchAlign: 'left',
        searchSelector: '#search',
        toolbar: '#marketableForm',
        sortName: "numIndexCurrent",
        sortOrder: 'asc',
        columns: columns,
        method: 'post',
        queryParams: function (params) {
            return queryMarketable;
        },
        pageList: [20, 100, 200, 500, 1000],
        pagination: "true",
        showJumpto: true,
        contentType: "application/json"
    });
}

function formatIcon(row, value) {
    let url = window.location.protocol + '//' + window.location.host + '/icon/' + row.itemId + '.png';
    return '<img src="' + url + '" decoding="async" width="32" height="32" alt="图标">&nbsp;&nbsp;' + value;
}

function resetMarketable() {
    $('#marketableForm')[0].reset();
    let $itemType = $('#itemType');
    $itemType.selectpicker('val', []);
    queryMarketable = {
        worldName: '中国',
        timeScale: 24
    };
    let $worldName = $('#worldName');
    $worldName.selectpicker('val', '中国');
    let $timeScale = $('#timeScale');
    $timeScale.selectpicker('val', 24);
    let $sortType = $('#sortType');
    $sortType.selectpicker('val', '1');
    $sortType.selectpicker('refresh');
    $timeScale.selectpicker('refresh');
    $worldName.selectpicker('refresh');
    $itemType.selectpicker('refresh');
    $('#marketableTable').bootstrapTable('destroy');
    const timeScale = $timeScale.val();
    if (timeScale > 24) {
        columns[2].title = timeScale / 24 + '天售出数';
        columns[3].title = timeScale / 24 + '天交易次数';
    } else {
        columns[2].title = timeScale + '小时售出数';
        columns[3].title = timeScale + '小时交易次数';
    }
    initMarketableNum();
}

function reInitTable($sortType) {
    let val = $sortType.val();
    let table = $("#marketableTable");
    if (val === '2') {
        table.bootstrapTable('showColumn', 'quantityIndexCurrent');
        table.bootstrapTable('showColumn', 'quantityIndexChange');
        table.bootstrapTable('showColumn', 'quantity');
        table.bootstrapTable('hideColumn', 'numIndexCurrent');
        table.bootstrapTable('hideColumn', 'num');
        table.bootstrapTable('hideColumn', 'numIndexChange');
        // table.bootstrapTable('refreshOptions', {
        //     sortName: "quantityIndexCurrent"
        // })
    } else {
        table.bootstrapTable('showColumn', 'numIndexCurrent');
        table.bootstrapTable('showColumn', 'numIndexChange');
        table.bootstrapTable('showColumn', 'num');
        table.bootstrapTable('hideColumn', 'quantityIndexCurrent');
        table.bootstrapTable('hideColumn', 'quantityIndexChange');
        table.bootstrapTable('hideColumn', 'quantity');
        // table.bootstrapTable('refreshOptions', {
        //     sortName: "numIndexCurrent"
        // });
    }
}

function initBySortType() {
    let $sortType = $('#sortType');
    reInitTable($sortType)
}

function openUpdateTimeTable() {
    $('#myModal').modal('show');
    $('#updateTimeTable').bootstrapTable({
        url: '/ffbusiness/saleHistory/marketableUpdateTime',
        columns: [{
            field: 'scale',
            title: '统计周期',
            formatter: function (value, row, index, field) {
                return $('#timeScale option[value=' + value + ']').html().slice(2);
            }
        }, {
            field: 'between',
            title: '当前统计范围',
            formatter: function (value, row, index, field) {
                return "开始:" + row.begin + '<br/>结束:' + row.end;
            }
        }, {
            field: 'next',
            title: '下次更新'
        }], method: 'post',
        contentType: "application/json"
    });
}

function closeUpdateTimeTable() {
    $('#myModal').modal('toggle');
}

$(document).ready(function () {
    //$('select').selectpicker({'mobile': true});
    $('select').selectpicker();
    let $sortType = $('#sortType');
    $sortType.change(function () {
        initBySortType();
    })
    initMarketableNum();
    $.ajax({
        url: "/ffbusiness/itemType/all", async: true, method: "post", contentType: "application/json", success: handleType()
    });
})
$.ajax({url: "/ffbusiness/visitor/record", async: true, method: "post", contentType: "application/json"});

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return "";
}