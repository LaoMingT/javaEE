/**
 * <pre>
 * 上海久科信息技术有限公司
 * Copyright (C): 2012
 * 
 * 文件名称：
 * EnumToJsonProcessor.java
 * 
 * 文件描述: 
 * 枚举类型到JSON转换处理公用类。
 * 
 * Notes:
 * 
 * 修改历史(作者/日期/改动描述):
 * 王彬/2012.04.15/初始化版本。
 * </pre>
 */
package com.douya.common.json;

import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;

public class EnumToJsonProcessor implements JsonValueProcessor {
	public Object processArrayValue(Object value, JsonConfig jsonConfig) {
		return null;
	}
	
	public Object processObjectValue(String key, Object value,
			JsonConfig jsonConfig) {
		try {
			JSONObject jObj = new JSONObject();
			jObj.put("text", value.toString());
			jObj.put("codeText", value.getClass().getMethod("toCodeString",
					new Class[] {}).invoke(value, new Object[] {}));
			jObj.put("value", value.getClass().getMethod("getValue",
					new Class[] {}).invoke(value, new Object[] {}));
			return jObj;
		} catch (Exception ignore) {
			throw new RuntimeException(value.getClass()
					+ "枚举对象没有toCodeString方法，不符合框架要求。");
		}
	}
	
}
