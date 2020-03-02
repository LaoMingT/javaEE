/**
 * <pre>
 * 上海久科信息技术有限公司
 * Copyright (C): 2012
 * 
 * 文件名称：
 * IgnoreNullPropertyFilter.java
 * 
 * 文件描述: 
 * 空属性去除过滤器。
 * 
 * Notes:
 * 
 * 修改历史(作者/日期/改动描述):
 * 王彬/2012.04.15/初始化版本。
 * </pre>
 */
package com.douya.common.json;

import net.sf.json.util.PropertyFilter;

public class IgnoreNullPropertyFilter implements PropertyFilter {
	
	public boolean apply(Object object, String name, Object value) {
		if (value == null)
			return true;
		else
			return false;
	}
	
}
