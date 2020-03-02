<%-- 
	紫光软件系统有限公司广电事业部
	Copyright (C): 2010
 
 	文件名称：
 	index.jsp
 
	文件描述:
	登录页面。
 
	Notes:
	 
	修改历史(作者/日期/改动描述):
	赵旺/2010.08.11/初始化转到登录页面。
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@include file="/jsp/include/taglib.jsp"%>
<c:if test="${empty SESS_USER }">
	<c:redirect url="/login.do"></c:redirect>
</c:if>
<c:if test="${!empty SESS_USER }">
	<c:redirect url="/home.do"></c:redirect>
</c:if>