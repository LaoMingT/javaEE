/**
 * <pre>
 * 上海久科信息技术有限公司
 * Copyright (C): 2012
 * 
 * 文件名称：
 * MCCBusinessHessianHelper.java
 * 
 * 文件描述: 
 * 业务管理 帮助类
 * 
 * Notes:
 * 
 * 修改历史(作者/日期/改动描述):
 * 袁晓燕/2012.11.7/初始化版本。
 * </pre>
 */
package com.douya.common.hessian;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLSession;

import com.caucho.hessian.client.HessianProxyFactory;
import com.douya.common.property.PropertyConfig;
import com.douya.mcc.service.MccRemoteBusinesService;

public class MCCBusinessHessianHelper {
	public static HessianProxyFactory factory;
	public static String url;
	static {
		factory = new MCCHessianProxyFactory();
		url = PropertyConfig
				.getProperty("HESSIAN_MCC_REMOTEBUSINESSERVICE_URL");
		if (url.startsWith("https")) {
			System.setProperty("java.protocol.handler.pkgs", "javax.net.ssl");
			HostnameVerifier hv = new HostnameVerifier() {
				public boolean verify(String urlHostName, SSLSession session) {
					return urlHostName.equals(session.getPeerHost());
				}
			};
			HttpsURLConnection.setDefaultHostnameVerifier(hv);
		}
	}
	
	public static Object create(Class<?> api, String urlName) {
		try {
			return factory.create(api, urlName);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static MccRemoteBusinesService getRemoteBusinesService() {
		return (MccRemoteBusinesService) MCCBusinessHessianHelper.create(
				MccRemoteBusinesService.class, url);
	}
	
}
