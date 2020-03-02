/**
 * <pre>
 * 上海久科信息技术有限公司
 * Copyright (C): 2012
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
 * 王彬/2012.04.15/初始化版本。
 * </pre>
 */
package com.douya.common.utils;

import javax.servlet.http.HttpServletRequest;

import org.springframework.util.StringUtils;
import org.springframework.web.bind.ServletRequestUtils;

/**
 * 对 spring ServletRequestUtils 的一个简单继承，使用该类可以方便的获取参数。<br />
 * 灵活使用和扩展。
 * 
 * @date 
 * @author 
 */
public class ServletUtils extends ServletRequestUtils {
	
	/**
	 * 页面以“,”拼写的字符串，传递到后台以后分割为数字数组形式。
	 * 
	 * @param request
	 * @param name
	 * @return
	 */
	public static int[] getIntParameters(HttpServletRequest request, String name) {
		String agrs = request.getParameter(name);
		if (StringUtils.hasText(agrs)) {
			String[] as = agrs.split(",");
			int[] rs = new int[as.length];
			for (int i = 0; i < as.length; i++) {
				int z = 0;
				try {
					z = Integer.valueOf(as[i]);
				} catch (NumberFormatException e) {
					continue;
				}
				rs[i] = z;
			}
			return rs;
		} else {
			return new int[] {};
		}
	}
	
	/**
	 * 使用 Long 默认值的获取参数。
	 * 
	 * @author 王帅 @
	 * @param request
	 * @param name
	 * @param defaultValue
	 * @return
	 */
	public static Long getLongParameter(HttpServletRequest request,
			String name, Long defaultValue) {
		String agrs = request.getParameter(name);
		try {
			defaultValue = Long.parseLong(agrs);
		} catch (NumberFormatException e) {
		}
		return defaultValue;
	}
	
	public static Integer getIntParameter(HttpServletRequest request,
			String name, Integer defaultValue) {
		String agrs = request.getParameter(name);
		try {
			defaultValue = Integer.parseInt(agrs);
		} catch (NumberFormatException e) {
		}
		return defaultValue;
	}
	
}
