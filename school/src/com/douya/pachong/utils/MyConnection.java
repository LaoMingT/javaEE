package com.douya.pachong.utils;



import java.sql.Connection;

/**
 * 类说明: 封装JDBC connection 对象 <br>
 * 创建时间: 2011-12-15 下午1:16:01<br>
 * @author xlh(向林海)<br>
 */
public  class MyConnection
{
	private int index = 0;
	private Connection conn;
	/**
	 * @return the index
	 */
	public int getIndex() {
		return index;
	}
	/**
	 * @param index the index to set
	 */
	public void setIndex(int index) {
		this.index = index;
	}
	/**
	 * @return the conn
	 */
	public Connection getConn() {
		return conn;
	}
	/**
	 * @param conn the conn to set
	 */
	public void setConn(Connection conn) {
		this.conn = conn;
	}
}