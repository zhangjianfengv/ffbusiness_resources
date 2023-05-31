import Vue from 'vue'
import {BootstrapVue} from 'bootstrap-vue'
import History from './components/AppHistory.vue'
import './plugins/table.js'
import $ from "jquery";

let query = {
    worldName: '中国'
};
let paramCurrent = {};
Vue.use(BootstrapVue);
Vue.config.productionTip = false
new Vue({
    render: h => h(History),
    methods: {
        queryCurrent(row) {
            let name = row.worldName;
            let id = row.itemId;
            $.ajax({
                url: "/ffbusiness/currentData/queryParentWorld", async: true, method: "post",
                data: JSON.stringify({worldName: name}),
                contentType: "application/json", success: function (data) {
                    $('#myModalLabel').html(data.worldName + row.itemName + '低价')
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
                    formatter: function addButton(value) {
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
                queryParams: function () {
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
    }
}).$mount('#app')

export function initTable() {
    $('#table').bootstrapTable({
        url: '/ffbusiness/saleHistory/realData',
        pagination: "true",
        sidePagination: "server",
        columns: [{
            field: 'itemId',
            title: '物品ID'
        }, {
            field: 'itemName',
            formatter: function iconFormatter(value, row) {
                let url = window.location.protocol + '//' + window.location.host + '/icon/' + row.itemId + '.png';
                return '<img src="' + url + '" decoding="async" width="32" height="32" alt="图标">&nbsp;&nbsp;' + value;
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
            formatter: function sumFormatter(value, row) {
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
                function operation(value, row) {
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

