(()=>{let e={worldName:"中国",timeScale:24},t=[{field:"itemId",sortable:!0,visible:!1,title:"物品ID"},{field:"name",sortable:!0,formatter:function(e,t,n,o){return function(e,t){return'<img src="'+(window.location.protocol+"//"+window.location.host+"/icon/"+e.itemId+".png")+'" decoding="async" width="32" height="32" alt="图标">&nbsp;&nbsp;'+t}(t,e)},title:"物品名称"},{field:"quantity",sortable:!0,visible:!1,title:$("#timeScale option:selected").html().slice(2)+"售出数"},{field:"num",sortable:!0,title:$("#timeScale option:selected").html().slice(2)+"交易次数"},{field:"numIndexCurrent",sortable:!0,title:"次数排序"},{field:"numIndexChange",sortable:!0,title:"排序较上次",formatter:function(e,t,o,l){return n(0,e)}},{field:"quantityIndexCurrent",sortable:!0,visible:!1,title:"售出数排序"},{field:"quantityIndexChange",sortable:!0,visible:!1,title:"排序较上次",formatter:function(e,t,o,l){return n(0,e)}},{field:"pricePerUnit",sortable:!0,title:"均价"},{field:"itemTypeName",sortable:!0,visible:!1,title:"分类"},{field:"itemLevel",sortable:!0,visible:!1,title:"品级"},{field:"equipLevel",sortable:!0,visible:!1,title:"等级"}];function n(e,t){return 0===t?"持平":t>0?"<h4 style='display: inline;color: #1e7e34'>↓</h4>&nbsp;"+t:t<0?"<h4 style='display: inline; color: #b94a48'>↑</h4>&nbsp;"+-t:"无此物品"}$(document).ready((function(){$("select").selectpicker(),$("#sortType").change((function(){!function(e){let t=$("#sortType").val(),n=$("#marketableTable");"2"===t?(n.bootstrapTable("showColumn","quantityIndexCurrent"),n.bootstrapTable("showColumn","quantityIndexChange"),n.bootstrapTable("showColumn","quantity"),n.bootstrapTable("hideColumn","numIndexCurrent"),n.bootstrapTable("hideColumn","num"),n.bootstrapTable("hideColumn","numIndexChange")):(n.bootstrapTable("showColumn","numIndexCurrent"),n.bootstrapTable("showColumn","numIndexChange"),n.bootstrapTable("showColumn","num"),n.bootstrapTable("hideColumn","quantityIndexCurrent"),n.bootstrapTable("hideColumn","quantityIndexChange"),n.bootstrapTable("hideColumn","quantity"))}()})),$("#marketableTable").bootstrapTable({url:"/ffbusiness/saleHistory/marketableData",search:!0,searchAlign:"left",searchSelector:"#search",toolbar:"#marketableForm",sortName:"numIndexCurrent",sortOrder:"asc",columns:t,method:"post",queryParams:function(t){return e},pageList:[20,100,200,500,1e3],pagination:"true",showJumpto:!0,contentType:"application/json"}),$.ajax({url:"/ffbusiness/itemType/all",async:!0,method:"post",contentType:"application/json",success:handleType()})})),$.ajax({url:"/ffbusiness/visitor/record",async:!0,method:"post",contentType:"application/json"})})();