/**
 * <pre>
 * 
 * Copyright (C): 2010
 * 
 * 文件名称：
 * com.nineclient.entity.Model.java
 * 
 * 文件描述: 
 * TODO
 * 
 * Notes:
 * 修改历史(作者/日期/改动描述):。
 * </pre>
 */
package com.douya.entity;

/**
 * @date 2012-12-2
 * @author 王彬
 * 
 */
public class Model {
	private String key;
	private String name;
	
	public Model() {
		
	}
	
	public Model(String key, String name) {
		this.key = key;
		this.name = name;
	}
	
	public String getKey() {
		return key;
	}
	
	public void setKey(String key) {
		this.key = key;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
}
