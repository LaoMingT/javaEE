/**
 * <pre>
 * 上海久科信息技术有限公司
 * Copyright (C): 2012
 * 
 * 文件名称：
 * TimestampToJsonProcessor.java
 * 
 * 文件描述: 
 * 时间格式化处理器类。
 * 
 * Notes:
 * 
 * 修改历史(作者/日期/改动描述):
 * 王彬/2012.04.15/初始化版本
 * </pre>
 */
package com.douya.common.json;

import java.text.SimpleDateFormat;

import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;

public class TimestampToJsonProcessor implements JsonValueProcessor {
	private SimpleDateFormat sf;
	
	public TimestampToJsonProcessor(SimpleDateFormat sf) {
		this.sf = sf;
	}
	
	public Object processArrayValue(Object value, JsonConfig jsonConfig) {
		// TODO Auto-generated method stub
		return null;
	}
	
	public Object processObjectValue(String key, Object value,
			JsonConfig jsonConfig) {
		return sf.format(value);
	}
	
}
