<%-- 
	豆芽科技
	Copyright (C): 2012
 
 	文件名称：
 	home.jsp
  
	文件描述:
	系统首页
	
	Notes:
	 
	修改历史(作者/日期/改动描述):
	jack/2014.04.11/初始化首页
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/jsp/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<c:import url="include/htmlHead.jsp">
</c:import>
<script type="text/javascript">
	var module = '${module}';
	
</script>

<script type="text/javascript" src="./pageJs/home.js"></script>
</head>
<body>
	<div id="layoutRender"></div>
	<div id="heard">
		<div class="logo">
			<img src="./styles/images/index/logo.gif" />
		</div>
		<div class="top_right">
			<div class="top_tab">
				<a href="javascript:;" onclick="javascript:exit();">退出系统</a>
			</div>
		</div>
		<div class="top_user">
			<a href="javascript:;"
				style="color: #fff; font-weight: bold; cursor: pointer;"
				onclick="javascript:editPassWord('${SESS_USER.pk}','${SESS_USER.account}','${SESS_USER.userName}');"><img
				src="./styles/images/index/user.png" height="20" width="20" />&nbsp;${SESS_USER.userName}</a>
		</div>
	</div>
</body>
</html>