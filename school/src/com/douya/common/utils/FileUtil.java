/**
 * <pre>
 * 上海久科信息技术有限公司
 * Copyright (C): 2010
 * 
 * 文件名称：
 * com.nineclient.common.property.FileUtil.java
 * 
 * 文件描述: 
 * TODO
 * 
 * Notes:
 * 修改历史(作者/日期/改动描述):
 * 王彬/2013-1-31/初始化版本。
 * </pre>
 */
package com.douya.common.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

import com.douya.common.CommonUtil;

/**
 * @date 2013-1-31
 * @author 王彬
 * 
 */
public class FileUtil {
	private static final FileUtil singleton = new FileUtil();
	private String html = "";
	
	public static FileUtil getInstance() {
		return singleton;
	}
	
	private FileUtil() {
		StringBuilder htmlBuilder = new StringBuilder();
		try {
			File file = new File(CommonUtil.getPath() + "email.txt");
			try {
				BufferedReader bw = new BufferedReader(new FileReader(file));
				String line = null;
				// 因为不知道有几行数据，所以先存入list集合中
				while ((line = bw.readLine()) != null) {
					htmlBuilder.append(line);
				}
				bw.close();
			}
			catch (IOException e) {
				e.printStackTrace();
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		html = htmlBuilder.toString();
	}
	
	public String getHtml() {
		return html;
	}
	
	public void setHtml(String html) {
		this.html = html;
	}
	
}
