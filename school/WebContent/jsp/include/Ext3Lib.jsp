<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%-- 加载EXT相关文件的统一JSP文件，其他文件直接 import 即可。  --%>

<%-- 样式文件，加载全部样式 --%>
<%-- 可选样式，可以使用 if 标签+引用参数来判断使用这些样式 ，注意样式要引用在 ext-all.css 以后--%>
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath() %>/lib/ext-3.2.1/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath() %>/lib/ext-3.2.1/resources/css/xtheme-default.css" />
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath() %>/lib/ext-3.2.1/ux/css/ux-all.css" />
<%-- 注意引用 js 的顺序，顺序错误会导致加载失败！  --%>
<%-- 带注释的源码，开发完毕替换 
<script type="text/javascript" src="<%=request.getContextPath() %>/lib/ext-3.2.1/adapter/ext/ext-base-debug-w-comments.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/lib/ext-3.2.1/ext-all-debug-w-comments.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/lib/ext-3.2.1/ux/ux-all-debug.js"></script>

<script type="text/javascript"
	src="<%=request.getContextPath() %>/lib/ext-3.2.1/ext-all.js"></script>

--%>
<script type="text/javascript"
	src="<%=request.getContextPath() %>/lib/ext-3.2.1/adapter/ext/ext-base.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath() %>/lib/ext-3.2.1/ext-all.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath() %>/lib/ext-3.2.1/ux/ux-all.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath() %>/lib/ext-3.2.1/I18N/ext-lang-zh_CN.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath() %>/lib/ext-3.2.1/I18N/ext-ux-lang-zh_CN.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath() %>/lib/ext-3.2.1/extBase.js"></script>

<%-- 插件 
 --%>
<script type="text/javascript"
	src="<%=request.getContextPath() %>/lib/calender/WdatePicker.js"></script>
<%-- 日期选择，默认加载 --%>
<script type="text/javascript"
	src="<%=request.getContextPath() %>/lib/ext-3.2.1/ux/Ext.ux.CalenderField.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath() %>/flashChart/FusionCharts.js"></script>
<%-- 报表工具，默认加载 --%>
<script type="text/javascript"
	src="<%=request.getContextPath() %>/flashChart/FusionChartsExportComponent.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath() %>/lib/common/layout/Ext.ux.Layout.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath() %>/lib/ext-3.2.1/ux/Ext.tip.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath() %>/lib/ext-3.2.1/ux/TreeCheckNodeUI.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath() %>/lib/ext-3.2.1/ux/Ext.ux.TreeImpl.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath() %>/lib/ext-3.2.1/ux/Ext.ux.TreePanel.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath() %>/lib/ext-3.2.1/ux/Ext.ux.GridPanel.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath() %>/lib/ext-3.2.1/ux/Ext.ux.combox.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath() %>/lib/ext-3.2.1/ux/Ext.ux.MultiSelect.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath() %>/lib/ext-3.2.1/ux/MultiSelect.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath() %>/lib/common/ColumnNodeUI.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath() %>/lib/common/ComboBoxTree.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath() %>/lib/common/ComboBoxCheckTree.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath() %>/lib/ext-3.2.1/ux/TreeCheckBoxNodeUI.js"></script>




