package com.douya.pachong.utils;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

/**
 * <pre>
 * HTTP请求代理类
 * </pre>
 * 
 * @author benl
 * @version 1.0, 2007-7-3
 */
public class Post {
	/**
	 * 连接超时
	 */
	private static int connectTimeOut = 5000;
	
	/**
	 * 读取数据超时
	 */
	private static int readTimeOut = 10000;
	
	/**
	 * 请求编码
	 */
	private static String requestEncoding = "gb2312";
	
	/**
	 * <pre>
	 * 发送带参数的GET的HTTP请求
	 * </pre>
	 * 
	 * @param reqUrl
	 *            HTTP请求URL
	 * @param parameters
	 *            参数映射表
	 * @return HTTP响应的字符串
	 */
	@SuppressWarnings("rawtypes")
	public static String doGet(String reqUrl, Map parameters,
			String recvEncoding) {
		HttpURLConnection url_con = null;
		String responseContent = null;
		try {
			StringBuffer params = new StringBuffer();
			for (Iterator iter = parameters.entrySet().iterator(); iter
					.hasNext();) {
				Entry element = (Entry) iter.next();
				params.append(element.getKey().toString());
				params.append("=");
				params.append(URLEncoder.encode(element.getValue().toString(),
						Post.requestEncoding));
				params.append("&");
			}
			
			if (params.length() > 0) {
				params = params.deleteCharAt(params.length() - 1);
			}
			
			URL url = new URL(reqUrl);
			url_con = (HttpURLConnection) url.openConnection();
			url_con.setRequestMethod("GET");
			System.setProperty("sun.net.client.defaultConnectTimeout",
					String.valueOf(Post.connectTimeOut));// （单位：毫秒）jdk1.4换成这个,连接超时
			System.setProperty("sun.net.client.defaultReadTimeout",
					String.valueOf(Post.readTimeOut)); // （单位：毫秒）jdk1.4换成这个,读操作超时
			// url_con.setConnectTimeout(5000);//（单位：毫秒）jdk
			// 1.5换成这个,连接超时
			// url_con.setReadTimeout(5000);//（单位：毫秒）jdk 1.5换成这个,读操作超时
			url_con.setDoOutput(true);
			byte[] b = params.toString().getBytes();
			url_con.getOutputStream().write(b, 0, b.length);
			url_con.getOutputStream().flush();
			url_con.getOutputStream().close();
			
			InputStream in = url_con.getInputStream();
			BufferedReader rd = new BufferedReader(new InputStreamReader(in,
					recvEncoding));
			String tempLine = rd.readLine();
			StringBuffer temp = new StringBuffer();
			String crlf = System.getProperty("line.separator");
			while (tempLine != null) {
				temp.append(tempLine);
				temp.append(crlf);
				tempLine = rd.readLine();
			}
			responseContent = temp.toString();
			rd.close();
			in.close();
		}
		catch (IOException e) {
			// logger.error("网络故障", e);
		}
		finally {
			if (url_con != null) {
				url_con.disconnect();
			}
		}
		
		return responseContent;
	}
	
	/**
	 * <pre>
	 * 发送不带参数的GET的HTTP请求
	 * </pre>
	 * 
	 * @param reqUrl
	 *            HTTP请求URL
	 * @return HTTP响应的字符串
	 */
	public static String doGet(String reqUrl, String recvEncoding) {
		HttpURLConnection url_con = null;
		String responseContent = null;
		try {
			StringBuffer params = new StringBuffer();
			String queryUrl = reqUrl;
			int paramIndex = reqUrl.indexOf("?");
			
			if (paramIndex > 0) {
				queryUrl = reqUrl.substring(0, paramIndex);
				String parameters = reqUrl.substring(paramIndex + 1,
						reqUrl.length());
				String[] paramArray = parameters.split("&");
				for (int i = 0; i < paramArray.length; i++) {
					String string = paramArray[i];
					int index = string.indexOf("=");
					if (index > 0) {
						String parameter = string.substring(0, index);
						String value = string.substring(index + 1,
								string.length());
						params.append(parameter);
						params.append("=");
						params.append(URLEncoder.encode(value,
								Post.requestEncoding));
						params.append("&");
					}
				}
				
				params = params.deleteCharAt(params.length() - 1);
			}
			
			URL url = new URL(queryUrl);
			url_con = (HttpURLConnection) url.openConnection();
			url_con.setRequestMethod("GET");
			System.setProperty("sun.net.client.defaultConnectTimeout",
					String.valueOf(Post.connectTimeOut));// （单位：毫秒）jdk1.4换成这个,连接超时
			System.setProperty("sun.net.client.defaultReadTimeout",
					String.valueOf(Post.readTimeOut)); // （单位：毫秒）jdk1.4换成这个,读操作超时
			// url_con.setConnectTimeout(5000);//（单位：毫秒）jdk
			// 1.5换成这个,连接超时
			// url_con.setReadTimeout(5000);//（单位：毫秒）jdk 1.5换成这个,读操作超时
			url_con.setDoOutput(true);
			byte[] b = params.toString().getBytes();
			url_con.getOutputStream().write(b, 0, b.length);
			url_con.getOutputStream().flush();
			url_con.getOutputStream().close();
			InputStream in = url_con.getInputStream();
			BufferedReader rd = new BufferedReader(new InputStreamReader(in,
					recvEncoding));
			String tempLine = rd.readLine();
			StringBuffer temp = new StringBuffer();
			String crlf = System.getProperty("line.separator");
			while (tempLine != null) {
				temp.append(tempLine);
				temp.append(crlf);
				tempLine = rd.readLine();
			}
			responseContent = temp.toString();
			rd.close();
			in.close();
		}
		catch (IOException e) {
			// logger.error("网络故障", e);
		}
		finally {
			if (url_con != null) {
				url_con.disconnect();
			}
		}
		
		return responseContent;
	}
	
	/**
	 * <pre>
	 * 发送带参数的POST的HTTP请求
	 * </pre>
	 * 
	 * @param reqUrl
	 *            HTTP请求URL
	 * @param parameters
	 *            参数映射表
	 * @return HTTP响应的字符串
	 */
	@SuppressWarnings("rawtypes")
	public static String doPost(String reqUrl, Map<?, ?> parameters,
			String recvEncoding) {
		HttpURLConnection url_con = null;
		String responseContent = null;
		try {
			StringBuffer params = new StringBuffer();
			for (Iterator<?> iter = parameters.entrySet().iterator(); iter
					.hasNext();) {
				Entry element = (Entry) iter.next();
				params.append(element.getKey().toString());
				params.append("=");
				params.append(URLEncoder.encode(element.getValue().toString(),
						Post.requestEncoding));
				params.append("&");
			}
			
			if (params.length() > 0) {
				params = params.deleteCharAt(params.length() - 1);
			}
			
			URL url = new URL(reqUrl);
			url_con = (HttpURLConnection) url.openConnection();
			url_con.setRequestProperty(
					"Cookie",
					"U_TRS1=000000a2.cc892f66.507e790a.0f38e41c; SINAGLOBAL=7040baa2.d09576ec.507e7914.909670e4; U_TRS2=000000a2.c6955ee5.50874ad7.8013af29; UOR=,www.sina.com.cn,; Apache=3212952544252.7563.1351043797175; FSINAGLOBAL=000000a2.57af29ac.5076a396.b25ae100; ULV=1351043797895:1:1:1:3212952544252.7563.1351043797175:; vjuids=-c7d5befc5.13a907c74a0.0.a10e4cfab6e52; vjlast=1351043806; lxlrttp=1348623077; loginType=miniblog");
			
			url_con.setRequestMethod("POST");
			System.setProperty("sun.net.client.defaultConnectTimeout",
					String.valueOf(Post.connectTimeOut));// （单位：毫秒）jdk1.4换成这个,连接超时
			System.setProperty("sun.net.client.defaultReadTimeout",
					String.valueOf(Post.readTimeOut)); // （单位：毫秒）jdk1.4换成这个,读操作超时
			// url_con.setConnectTimeout(5000);//（单位：毫秒）jdk
			// 1.5换成这个,连接超时
			// url_con.setReadTimeout(5000);//（单位：毫秒）jdk 1.5换成这个,读操作超时
			url_con.setDoOutput(true);
			byte[] b = params.toString().getBytes();
			url_con.getOutputStream().write(b, 0, b.length);
			url_con.getOutputStream().flush();
			url_con.getOutputStream().close();
			
			InputStream in = url_con.getInputStream();
			BufferedReader rd = new BufferedReader(new InputStreamReader(in,
					recvEncoding));
			String tempLine = rd.readLine();
			StringBuffer tempStr = new StringBuffer();
			String crlf = System.getProperty("line.separator");
			while (tempLine != null) {
				tempStr.append(tempLine);
				tempStr.append(crlf);
				tempLine = rd.readLine();
			}
			responseContent = tempStr.toString();
			rd.close();
			in.close();
		}
		catch (IOException e) {
			// logger.error("网络故障", e);
		}
		finally {
			if (url_con != null) {
				url_con.disconnect();
			}
		}
		return responseContent;
	}
	
	/**
	 * @return 连接超时(毫秒)
	 * @see com.hengpeng.common.web.HttpRequestProxy#connectTimeOut
	 */
	public static int getConnectTimeOut() {
		return Post.connectTimeOut;
	}
	
	/**
	 * @return 读取数据超时(毫秒)
	 * @see com.hengpeng.common.web.HttpRequestProxy#readTimeOut
	 */
	public static int getReadTimeOut() {
		return Post.readTimeOut;
	}
	
	/**
	 * @return 请求编码
	 * @see com.hengpeng.common.web.HttpRequestProxy#requestEncoding
	 */
	public static String getRequestEncoding() {
		return requestEncoding;
	}
	
	/**
	 * @param connectTimeOut
	 *            连接超时(毫秒)
	 * @see com.hengpeng.common.web.HttpRequestProxy#connectTimeOut
	 */
	public static void setConnectTimeOut(int connectTimeOut) {
		Post.connectTimeOut = connectTimeOut;
	}
	
	/**
	 * @param readTimeOut
	 *            读取数据超时(毫秒)
	 * @see com.hengpeng.common.web.HttpRequestProxy#readTimeOut
	 */
	public static void setReadTimeOut(int readTimeOut) {
		Post.readTimeOut = readTimeOut;
	}
	
	/**
	 * @param requestEncoding
	 *            请求编码
	 * @see com.hengpeng.common.web.HttpRequestProxy#requestEncoding
	 */
	public static void setRequestEncoding(String requestEncoding) {
		Post.requestEncoding = requestEncoding;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static void main(String[] args) {
		Map map = new HashMap();
		map.put("entry", "weibo");
		map.put("gateway", "1");
		map.put("from", "");
		map.put("savestate", "7");
		map.put("useticket", "1");
		map.put("vsnf", "1");
		map.put("ssosimplelogin", "1");
		map.put("su", "eGlhbmdsaW5oYWlfbGluaGFpJTQwMTYzLmNvbQ%3D%3D");
		map.put("service", "miniblog");
		map.put("servertime", "1351044373");
		map.put("nonce", "SZRO7Y");
		map.put("pwencode", "rsa2");
		map.put("rsakv", "1330428213");
		map.put("sp",
				"255add616208697190991e1e4eef31ad8f4669611634e078521a22eec254bf6ff2a8e563f6faed2cd05768874831726dd8feddb9a26e0867b133daae2605766319598fa77b67e4dd02ac23eb28c604a4b227fe79110bf67524cbe9622ad4419cb3570b93bc92d986b508bd0a376409f9893649cf26a87c223e48dd2ef6a000d3");
		map.put("encoding", "UTF-8");
		map.put("prelt", "82");
		map.put("url",
				"http%3A%2F%2Fweibo.com%2Fajaxlogin.php%3Fframelogin%3D1%26callback%3Dparent.sinaSSOController.feedBackUrlCallBack");
		map.put("returntype", "META");
		String temp = Post.doPost(
				"http://login.sina.com.cn/sso/login.php?client=ssologin.js",
				map, "gb2312");
		System.out.println("返回的消息是:" + temp);
		
	}
}
