/**
 * <pre>
 * 上海久科信息技术有限公司
 * Copyright (C): 2012
 * 
 * 文件名称：
 * IccHessianProxyFactory.java
 * 
 * 文件描述: 
 * IccHessianProxyFactory
 * 
 * Notes:
 * 
 * 修改历史(作者/日期/改动描述):
 * 王彬/2012.04.15/初始化版本。
 * </pre>
 */
package com.douya.common.hessian;

import java.io.IOException;
import java.net.URL;
import java.net.URLConnection;

import com.caucho.hessian.client.HessianProxyFactory;
import com.douya.common.property.PropertyConfig;

public class MCCHessianProxyFactory extends HessianProxyFactory {
	@Override
	protected URLConnection openConnection(URL url) throws IOException {
		URLConnection conn = super.openConnection(url);
		conn.setRequestProperty("AUTH", PropertyConfig.getProperty("FS_AUTH_KEY"));
		return conn;
	}

}
