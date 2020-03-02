/**
 * <pre>
 * 上海久科信息技术有限公司
 * Copyright (C): 2012
 * 
 * 文件名称：
 * DataUtil.java
 * 
 * 文件描述:
 * 常用数据处理工具类。
 * 
 * Notes:
 * 主要对一些数据进行格式化或者做一些常规处理操作。
 * 
 * 修改历史(作者/日期/改动描述):
 * 王彬/2012.04.15/初始化版本
 * </pre>
 */
package com.douya.common.utils;

/**
 * 数据处理工具类
 * 
 * @author Phoenix.zw
 */
public class DataUtil {
	/**
	 * 根据参考值获取与之接近的最大值(页面折线图等确定最大值使用)
	 * 
	 * @author Phoenix.zw 2011-3-28
	 * @param referenceValue
	 *            ：参考数值
	 * @return
	 */
	public static Long getMaximumValue(Long referenceValue) {
		if (null == referenceValue) {
			return Long.MAX_VALUE;
		}
		Long maxValue = referenceValue;
		if (referenceValue / 10000 > 0) {
			// 万级的，向上取与之最接近的精确到千级别数字
			// 前面相除再相乘，取到万级别；后半部分取模相除再加一后相乘，取到向上的千级别
			maxValue = referenceValue / 10000 * 10000
					+ (referenceValue % 10000 / 1000 + 1) * 1000;
		} else if (referenceValue / 1000 > 0) {
			// 千级的，向上取与之最接近的精确到百级别数字
			maxValue = referenceValue / 1000 * 1000
					+ (referenceValue % 1000 / 100 + 1) * 100;
		} else {
			// 百级的，向上取与之最接近的精确到十级别数字
			maxValue = referenceValue / 100 * 100
					+ (referenceValue % 100 / 10 + 1) * 10;
		}
		
		return maxValue;
	}
	
	/**
	 * 根据参考值获取与之接近的最小值(页面折线图等确定最小值使用)
	 * 
	 * @author Phoenix.zw 2011-3-28
	 * @param referenceValue
	 *            ：参考数值
	 * @return
	 */
	public static Long getMinimumValue(Long referenceValue) {
		if (null == referenceValue) {
			return 0L;
		}
		Long minValue = referenceValue;
		if (referenceValue / 10000 > 0) {
			// 万级的，向下取与之最接近的精确到千级别数字
			minValue = referenceValue / 10000 * 10000
					+ (referenceValue % 10000 / 1000) * 1000;
		} else if (referenceValue / 1000 > 0) {
			// 千级的，向下取与之最接近的精确到百级别数字
			minValue = referenceValue / 1000 * 1000
					+ (referenceValue % 1000 / 100) * 100;
		} else {
			// 百级的，向下取与之最接近的精确到十级别数字
			minValue = referenceValue / 100 * 100 + (referenceValue % 100 / 10)
					* 10;
		}
		return minValue;
	}
}
