package com.douya.property;

/**
 * <pre>
 * 上海久科信息技术有限公司
 * Copyright (C): 2010
 * 
 * 文件名称：
 * com.weibo.property.ErrorCodeUtil.java
 * 
 * 文件描述: 
 * TODO
 * 
 * Notes:
 * 修改历史(作者/日期/改动描述):
 * 王彬/2012-7-11/初始化版本。
 * </pre>
 */

import java.io.InputStream;
import java.util.Collection;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

/**
 * @date 2012-7-11
 * @author 王彬
 * 
 */
public class ErrorCodeUtil {
	private static String default_config = "errorCode.properties";
	private static Properties mConfig;
	static {
		mConfig = new Properties();
		try {
			Class<?> config_class = Class.forName(ErrorCodeUtil.class.getName());
			InputStream is = config_class.getResourceAsStream(default_config);
			mConfig.load(is);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static String getProperty(String key) {

		return mConfig.getProperty(key);
	}

	public static Collection<?> getCollection() {
		return mConfig.values();
	}

	public static Set<?> keySet() {
		return mConfig.keySet();
	}

	public static Set<Map.Entry<Object, Object>> entrySet() {
		return mConfig.entrySet();
	}

	public static String getProperty(String key, String defaultValue) {
		String value = mConfig.getProperty(key);
		if (value == null)
			return defaultValue;

		return value;
	}

}
