<%-- 
	紫光软件系统有限公司广电事业部
	Copyright (C): 2010
 
 	文件名称：
 	meta.jsp
 
	文件描述:
	css和js引入页面。
	引入方法：使用 c 标签
		 <c:import url="/WEB-INF/jsp/include/htmlHead.jsp">
			<c:param name="WdatePicker" value="true" />
		 </c:import>
		 
	Notes:
	 
	修改历史(作者/日期/改动描述):
	赵旺/2010.08.11/初始化。
--%>

<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%-- 使用UTF-8編碼 --%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<%-- 使用 IE7 兼容模式 --%>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<%-- 页面标题 --%>
<script type="text/javascript">
	// <%-- 初始化上下文路徑，以便在其他JS文件中使用 --%>
	var BASE_PATH = '<%=request.getContextPath() %>';
</script>
<script type="text/javascript"
	src="<c:url value="/lib/common/Cookies.js" />"></script>
<%-- 引入 EXT 及其相關包，默认加载 --%>
<%@ include file="/jsp/include/Ext3Lib.jsp"%>



<%-- 处理 IE 时的样式 --%>
<!--[if IE]>
<link rel="stylesheet" type="text/css" href="<c:url value="/style/common/css/IEFixed.css" />" />

<![endif]-->
<link type="text/css" rel="stylesheet"
	href="./styles/css/index/admin.css" />
<link type="text/css" rel="stylesheet"
	href="./styles/css/index/header.css" />
<%-- common js --%>
<script type="text/javascript"
	src="<c:url value="/lib/common/common.js" />"></script>
<%-- 通用的js --%>
<script type="text/javascript"
	src="<c:url value="/lib/common/Nineclient.privilege.js" />"></script>
<%-- 权限控制JS --%>
<script type="text/javascript"
	src="<c:url value="/lib/common/Nineclient.talk.js" />"></script>
<%-- 通用的js --%>
<script type="text/javascript"
	src="<c:url value="/lib/common/Nineclient.renderer.js" />"></script>
<%-- 通用的renderer js --%>
<script type="text/javascript"
	src="<c:url value="/lib/common/Nineclient.skin.js" />"></script>
<%-- 皮肤管理JS --%>
<script type="text/javascript">
	// <%-- 当前系统用户的 JS 对象，与 controller 交互生成 --%>
	Nineclient.talk.user = <c:out value="${SESS_JSON_USER }" default="{}" escapeXml="false" />; 
	// <%-- 当前页面的权限情况，与 controller 交互生成 --%>
	Nineclient.talk.privilege = <c:out value="${SESS_JSON_ACTION_PRIVILEGE }" default="{}" escapeXml="false" />;
</script>