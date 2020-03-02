/**
 * <pre>
 * 上海久科信息技术有限公司
 * Copyright (C): 2012
 * 
 * 文件名称：
 * JsonEnumValueProcessorMatcher.java
 * 
 * 文件描述: 
 * JSON数据处理匹配器类（支持枚举对象）。
 * 
 * Notes:
 * 
 * 修改历史(作者/日期/改动描述):
 * 王彬/2012.04.15/初始化版本
 * </pre>
 */
package com.douya.common.json;

import java.util.Set;

import net.sf.json.processors.JsonValueProcessorMatcher;

public class JsonEnumValueProcessorMatcher extends JsonValueProcessorMatcher {
	
	@SuppressWarnings("rawtypes")
	@Override
	public Object getMatch(Class target, Set set) {
		if (target != null && set != null) {
			if (set.contains(target))
				return target;
			else if (set.contains(Enum.class) && target.isEnum())
				return Enum.class;
			else
				return null;
		}
		else {
			return null;
		}
	}
	
}
