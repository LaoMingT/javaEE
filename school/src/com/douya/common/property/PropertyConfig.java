/**
 * <pre>
 * 上海久科信息技术有限公司
 * Copyright (C): 2012
 * 
 * 文件名称：
 * PropertyConfig.java
 * 
 * 文件描述:
 * 配置属性操作类。
 * 
 * Notes:
 * 
 * 修改历史(作者/日期/改动描述):
 * 王彬/2012.04.15/初始化版本。
 * </pre>
 */
package com.douya.common.property;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.Properties;

import com.douya.common.CommonUtil;

public class PropertyConfig {
	private static String default_config = "config.properties";
	private static Properties mConfig;
	static {
		mConfig = new Properties();
		try {
			InputStream is = new BufferedInputStream(new FileInputStream(CommonUtil.getPath() + default_config));
			mConfig.load(is);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static String getProperty(String key) {
		return mConfig.getProperty(key);
	}

	public static String getProperty(String key, String defaultValue) {
		String value = mConfig.getProperty(key);
		if (value == null)
			return defaultValue;

		return value;
	}

	public static boolean getBooleanProperty(String name, boolean defaultValue) {
		String value = PropertyConfig.getProperty(name);

		if (value == null)
			return defaultValue;

		return (new Boolean(value)).booleanValue();
	}

	public static int getIntProperty(String name) {
		return getIntProperty(name, 0);
	}

	public static int getIntProperty(String name, int defaultValue) {
		String value = PropertyConfig.getProperty(name);

		if (value == null)
			return defaultValue;

		return (new Integer(value)).intValue();
	}

	/**
	 * @author xianglinhai
	 * @version 2.0 通过键获得int类型的value
	 */
	public static int getIntValueByKey(String key) {

		return Integer.parseInt(mConfig.getProperty(key));
	}

	/**
	 * @author xianglinhai
	 * @version 2.0 通过键获得String类型的value
	 */
	public static String getStrValueByKey(String key) {
		String value = null;
		try {
			value = new String(mConfig.getProperty(key).getBytes("ISO8859-1"), "utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return value;

	}

}
