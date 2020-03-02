/**
 * <pre>
 * 紫光软件系统有限公司广电事业部
 * Copyright (C): 2010
 * 
 * 文件名称：
 * GlobalParameter.java
 * 
 * 文件描述:
 * 通用参数公共类。
 * 
 * Notes:
 * 
 * 
 * 修改历史(作者/日期/改动描述):
 * 赵旺 /2011-10-14/增加各级机构数量全局属性。
 * 赵旺/2011-09-19/增加平台数量等全局属性。
 * 武云龙/2011-08-23/增加首页直播、点播违规字段。
 * 赵旺/2011-08-20/增加记录终端操作授权的信息集合。
 * 赵旺 /2011.04.19/添加全局统计信息等ServletContext全局属性，用于缓存统计信息，减少访问数据库数量。
 * 赵旺 /2010.08.11/初始化。
 * </pre>
 */
package com.douya.common;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class Global {
	/**
	 * 移除所有session信息。
	 * 
	 * @author 王帅 @2010-9-8
	 * @param request
	 */
	public static final void removeAllSession(HttpServletRequest request) {
		HttpSession sess = request.getSession();
		sess.removeAttribute(SESSION_USER);
		sess.removeAttribute(SESS_JSON_ACTION_PRIVILEGE);
	}
	
	/**
	 * 登陆地址
	 */
	public static final String SESSION_LOGIN_URL = "login";
	/**
	 * SESSION 属性，用户
	 */
	public static final String SESSION_USER = "SESS_USER";
	/**
	 * 功能模块按钮权限
	 */
	public static final String SESS_JSON_ACTION_PRIVILEGE = "KEY_PID_MODMAP";
	public static final String SESSION_ACCOUNT = "SESSION_ACCOUNT";
	public static final String SESSION_BRAND = "SESSION_BRAND";
	public static final String SESSION_PLATFORM = "SESSION_PLATFORM";
	public static final String SESSION_DEPARTMENT = "SESSION_DEPARTMENT";
	/**
	 * ADMIN 展现的菜单
	 */
	public static final String ADMIN_USER = "admin";
	public static final String ADMIN_AUTHORITY = "A_MANAGEMENT_CENTER";
	
}
