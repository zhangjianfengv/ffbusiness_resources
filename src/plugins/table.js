// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap-table/dist/bootstrap-table.min.css'
// // import theme
// import 'bootstrap-table/dist/themes/materialize/bootstrap-table-materialize.min.css'
//
// // import extension
// import 'bootstrap-table/dist/extensions/fixed-columns/bootstrap-table-fixed-columns.min.css'
// import './jquery.js'
// import 'bootstrap'
// import 'bootstrap-table/dist/bootstrap-table.js'
// import 'bootstrap-table/dist/themes/materialize/bootstrap-table-materialize.js'
// import 'bootstrap-table/dist/locale/bootstrap-table-zh-CN.js'
// import 'bootstrap-table/dist/extensions/export/bootstrap-table-export.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-table/dist/bootstrap-table.min.css'

import './jquery.js'
import Vue from 'vue'
import 'bootstrap'
// import 'tableexport.jquery.plugin/libs/FileSaver/FileSaver.min.js'
// import 'tableexport.jquery.plugin/tableExport.min.js'
import 'bootstrap-table/dist/bootstrap-table'
import BootstrapTable from 'bootstrap-table/dist/bootstrap-table-vue.esm'
import 'bootstrap-table/dist/extensions/export/bootstrap-table-export'

Vue.component('BootstrapTable', BootstrapTable)
