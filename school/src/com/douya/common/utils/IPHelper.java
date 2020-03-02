/**
 * <pre>
 * 上海久科信息技术有限公司
 * Copyright (C): 2012
 * 
 * 文件名称：
 * IPHelper.java
 * 
 * 文件描述:
 * IP地址转换公共类。
 * 
 * Notes:
 * 
 * 
 * 修改历史(作者/日期/改动描述):
 * 王彬/2012.04.15/初始化版本。
 * </pre>
 */
package com.douya.common.utils;

public class IPHelper {
	/**
	 * 功能说明：将IP地址转换为相应的long类型数据
	 * 
	 * @param strIp
	 *            IP地址
	 * @return IP地址所对应的long类型数据
	 */
	public static long ipToLong(String strIp) {
		long[] ip = new long[4];
		// 先找到IP地址字符串中.的位置
		int position1 = strIp.indexOf(".");
		int position2 = strIp.indexOf(".", position1 + 1);
		int position3 = strIp.indexOf(".", position2 + 1);
		// 将每个.之间的字符串转换成整型
		ip[0] = Long.parseLong(strIp.substring(0, position1));
		ip[1] = Long.parseLong(strIp.substring(position1 + 1, position2));
		ip[2] = Long.parseLong(strIp.substring(position2 + 1, position3));
		ip[3] = Long.parseLong(strIp.substring(position3 + 1));
		return (ip[0] << 24) + (ip[1] << 16) + (ip[2] << 8) + ip[3];
	}
	
	/**
	 * 功能说明：将IP地址转换为相应的long类型数据
	 * 
	 * @param ip1
	 *            ip段1 202.106.88.154 中的 202
	 * @param ip2
	 *            ip段2 202.106.88.154 中的 106
	 * @param ip3
	 *            ip段3 202.106.88.154 中的 88
	 * @param ip4
	 *            ip段4 202.106.88.154 中的 154
	 * @return IP地址所对应的long类型数据
	 */
	public static long ipToLong(long ip1, long ip2, long ip3, long ip4) {
		return (ip1 << 24) + (ip2 << 16) + (ip3 << 8) + ip4;
	}
	
	/**
	 * 功能说明：将IP地址转换为相应的long类型数据
	 * 
	 * @param ip1
	 *            ip段1 202.106.88.154 中的 202
	 * @param ip2
	 *            ip段2 202.106.88.154 中的 106
	 * @param ip3
	 *            ip段3 202.106.88.154 中的 88
	 * @param ip4
	 *            ip段4 202.106.88.154 中的 154
	 * @return IP地址所对应的long类型数据
	 */
	public static long ipToLong(String ip1, String ip2, String ip3, String ip4) {
		long[] ip = new long[4];
		ip[0] = Long.parseLong(ip1);
		ip[1] = Long.parseLong(ip2);
		ip[2] = Long.parseLong(ip3);
		ip[3] = Long.parseLong(ip4);
		return (ip[0] << 24) + (ip[1] << 16) + (ip[2] << 8) + ip[3];
	}
}
