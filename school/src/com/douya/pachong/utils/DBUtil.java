package com.douya.pachong.utils;



import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


/**
 * JDBC链接管理
 * @author Administrator
 *
 */
public class DBUtil {
	
	public DBUtil(){};
	private static int initNum = 10;
	
	private static final String driverName = "oracle.jdbc.driver.OracleDriver";
	private static final String url = "jdbc:oracle:thin:@192.168.11.13:1521:client";
	private static final String user = "WEIBO";
	private static final  String password = "client";
	private static QueueArray queueArray = null;
	
	
	
	/**
	 * 初始化JDBC连接池
	 * @param num
	 * @return
	 */
	@SuppressWarnings("static-access")
	public  boolean  InitDBConnections(int num)
	{ 
		 initNum = num+2;
		 queueArray = new QueueArray(initNum);
		
		for(int index = 0 ; index < initNum; index++)
		{
			 Connection conn = ConnectDB();
			 if(conn == null)
				 continue;
			 
			 queueArray.enqueue(conn);
			 System.out.println("connection ......."+conn +" number "+index );
			 
			try {
				Thread.currentThread().sleep(100);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		 return true;
	}
	
	
	@SuppressWarnings("static-access")
	public synchronized static Connection getConnection()
	{
		
		Object  obj = queueArray.dequeue();
		
		 if(obj != null)
		 {
		    return (Connection)obj;
		 }else
		 {
			   int count = 0;
			  while((obj = queueArray.dequeue()) == null)
			  {
				  
				  
				  try {
						 System.err.println("---------no connections -------------");
						 
						Thread.currentThread().sleep(100);
					  } catch (InterruptedException e) {
						e.printStackTrace();
					}
				  
				  count++;
				  if(count == 2)
				  {
					  System.err.println("creat other connection !!!!!");
					  return ConnectDB();
				  }
			  }
			  
			    return null;
			 
		 }
		
		
	}
	
	/**
	 * t����ݿ�
	 * @return
	 */
	public static Connection ConnectDB()
	{
		Connection conn = null;
		try {
			Class.forName(driverName);
			conn = DriverManager.getConnection(url, user, password);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			return null;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
		return conn;
	}
	
	public synchronized static void returnConnection(Connection conn)
	{
		
		if(!queueArray.enqueue(conn))
			try {
				conn.close();
				conn = null;
				System.out.println("destroy a connection !!!");
			} catch (SQLException e) {
				e.printStackTrace();
			}
		
//		System.err.println("return connList size is ======================>>>>"+queueArray.front);
	}

	public static void main(String []args)
	{
		ConnectDB();
	}
}


