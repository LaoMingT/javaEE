package com.douya.pachong.utils;


import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

public class Util {

	static long readTimeOut = 10000;
	static long connectTimeOut = 1000;
	static String cookie = "";
	static String htmlEcoding = "utf-8";

	/**
	 * 控制IE浏览器打开某个网页
	 */
	public static void controlIEBrowser() {

		try {
			Runtime.getRuntime().exec(
					"c:/Program Files/Internet Explorer/IEXPLORE.EXE http://weibo.com/messages?topnav=1&wvr=3.6");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 调用抓包程序, 获得抓包得到的数据<br>
	 * 
	 * @return
	 */
	public static String callCmd2SnatchCookie() {
		StringBuffer sb = new StringBuffer();
		Runtime rn = Runtime.getRuntime();
		Process p = null;
		BufferedReader br = null;
		try {
			String path = "cookie/IptvCap.exe";
			String str = path;
			p = rn.exec(str);
			br = new BufferedReader(new InputStreamReader(p.getInputStream()));
			String line = "";
			while ((line = br.readLine()) != null) {
				sb.append(line + "\n");
				System.out.println(line);
			}
			p.destroy();

		} catch (Exception e) {
			System.out.println(" 调用获取 cookie的 程序失败：" + e.getMessage());
		} finally {
			if (null != p)
				p.destroy();
			try {
				if (null != br)
					br.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		return sb.toString();
	}

	/**
	 * 将将文件写入指定的位置<br>
	 * 
	 * @param filePath
	 *            指定的路径<br>
	 * @param resource
	 *            文件内容<br>
	 */
	public static void writeFile(String filePath, String resource) {
		BufferedWriter bw = null;
		String file_path = filePath.substring(0, filePath.lastIndexOf("/") + 1);
		File file = new File(file_path);
		if (!file.exists()) {
			file.mkdirs();
		}
		try {
			bw = new BufferedWriter(new FileWriter(filePath));
			bw.write(resource);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (null != bw)
					bw.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	}

	/**
	 * 将字符串时间格式化为timestamp 类型
	 * 
	 * @param dateStr
	 * @return
	 * @throws ParseException
	 */
	public static Timestamp dateFormatTool(String time) throws ParseException {
		SimpleDateFormat bartDateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		if (time.contains("月")) {
			time = new Timestamp(System.currentTimeMillis()).toString().substring(0, 4) + "-"
					+ time.replace("月", "-").replace("日", " ") + ":00";

			return new Timestamp(bartDateFormat.parse(time).getTime());
		}
		if (time.contains("今天")) {
			time = new Timestamp(System.currentTimeMillis()).toString().substring(0, 10) + time.replace("今天", "")
					+ ":00";
			return new Timestamp(bartDateFormat.parse(time).getTime());
		}
		if (time.contains("分钟前")) {
			long time_ = (System.currentTimeMillis() - Integer.parseInt(time.replace("分钟前", "")) * 60 * 1000);
			return new Timestamp(time_);
		}
		if (time.contains("秒前")) {
			long time_ = (System.currentTimeMillis() - Integer.parseInt(time.replace("秒前", "")) * 1000);
			return new Timestamp(time_);
		}

		return new Timestamp(System.currentTimeMillis() - 10);

	}

	public static void main(String[] args) throws UnsupportedEncodingException {
		/*
		 * //亚马逊 String url =
		 * "http://www.amazon.cn/s/ref=nb_sb_noss_2?__mk_zh_CN=%E4%BA%9A%E9%A9%AC%E9%80%8A%E7%BD%91%E7%AB%99&url=search-alias%3Daps&field-keywords=%E5%B8%AE%E5%AE%9D%E9%80%82"
		 * ; cookie =
		 * "5SnMamzvowels.pos=2; 5SnMamzvowels.time.0=1351653558613; 5SnMamzvowels.time.1=1351653585455; 5SnMamzvowels.time.2=1350265531682; 5SnMamzvowels.time.3=1350265788854; 5SnMamzvowels.time.4=1350266255258; csm-hit=179.02; x-wl-uid=1OURitN5KUX/bH/ounmdGdGd33WRaSBFJ0/0XlwsFThk+Ha9r112iqyJNLCMIiTWGd4MJ0/m+LmMau3k2iJht265jAx5n5WBJccHY8N08tMaS9cGQiQKEuckkEXJ6UHFUPRng3LS+u2w=; session-id-time=2082729601l; session-id=475-3189705-8305027; ubid-acbcn=475-5838250-1075954; session-token=uc0K1+8sf3idAX3G2hpEual7seD+lHjVniN8/1QhWnWIJ1GdrehcfqyfgyQVO8V5XwDoCDaT3xa3LF8f/qvkjHXvNwsHUSmYXWYwCOW3zhu75rsmJQNb1LcPjaUYXs2h4Ly14MrCCW4pWTaRBPf2g8vhDS9AMStkuTGBGHvj9CSZfgI1JtjhJjppliYAe00/Ozues9jtyW2GhhXPpMa+1QFgTUq+Hkn6Uucy9gV46eWcIEFYL6OhAYAFFypwvtvr; x-acbcn=\"@8LSrKy6@jOdezdhuVgnadA5gu0WK@kh\""
		 * ; try { String rs = downloadHtml(url, "utf-8", new HashMap()); rs =
		 * decodeUnicode(rs); writeFile("C:/Users/sea/Desktop/test.html", rs);
		 * System.out.println(rs); } catch (IOException e) {
		 * e.printStackTrace(); }
		 */

		// System.out.println(URLDecoder.decode("%E5%B8%AE%E5%AE%9D%E9%80%82",
		// "utf-8"));

		/*
		 * String reqUrl =
		 * "https://capi-cn.ssl-images-amazon.com/MdkhSKOBS0d4BWN17tnaNoiTZ,Eipqz1IF23vYYURkw0qB4Ybn59AXi8jnvgFiFCrclfnhlUJqQ_1A,G3IUSsmVWxADtvXOHNBPYUFOo00E"
		 * ; cookie =
		 * "x-wl-uid=1a6VsIyYi5dnxZVARDQ8IY8hp1XBM1Ru52IiN/28ziK5c3ZgAshorrzpMS8Ls763phKVJhU74mcA8kPwfXuxxHnyIGT+Yp/cur1/e2vLALtDHTeqG8AnRkeJcEMk50rTsrgVw3rAV3HY=; session-id-time=2082729601l; session-id=476-8672132-3360968; ubid-acbcn=477-6198185-1227906; session-token=4t5McLXWcPAQKs1t4ZNWi3liiuGwpK1wq0hPOWTaqSavKOcr2houhzH0TEphyipKhF2Xz3Gtw9PlgZcX2eTny+H8NuSvwkG7AIacBc160tUUA3cF3oxuHKg/pqejxp2RSxZHNZFpCvy/N5fohv25NFpP6zmfJJFDkuazK2/HLevIOpIVAXCowMkc6my7FH9vTJk+mLS02HJr6cxDMt+AHM1pMd4chYEZ9Be3zQDJB6pZf9OJA5dOQN5X1GhVAwvn; x-acbcn=bgHx1x4Bf9WGA1kqa5sUeYOltnBxGsZO; csm-hit=450.91; 5SnMamzvowels.pos=5; 5SnMamzvowels.time.0=1351732863903; 5SnMamzvowels.time.1=1351732900816; 5SnMamzvowels.time.2=1351732913417; 5SnMamzvowels.time.3=1351732928435; 5SnMamzvowels.time.4=1351732953198"
		 * ; downloadPicture(reqUrl, "C:/Users/sea/Desktop/a.jpg");
		 */

		// controlIEBrowser();

	}

	/**
	 * 乐蜂网评论回复
	 * 
	 * @throws UnsupportedEncodingException
	 */
	@SuppressWarnings("rawtypes")
	public static void leFengWangReply() throws UnsupportedEncodingException {

		String replyStr = "刚买的。还不错呢"; // 回复内容
		String pId = "13264"; // 产品ID
		String commentId = "364607"; // 评论id

		replyStr = URLEncoder.encode(replyStr, "utf-8").replace("%", "%25"); // 编码
		String reqUrl = "http://active.lefeng.com/goods/commentReply.jsp?callback=jQuery16407462300365563701_1351743221045&commentid="
				+ commentId + "&reply=" + replyStr + "&pid=" + pId + "&_=" + System.currentTimeMillis();

		cookie = "__v=1.551825917000747640.1349856213.1350264208.1351741896.4; __utma=96327937.1622534523.1350266108.1350266108.1351741868.2; __utmz=96327937.1350266108.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); Hm_lvt_db93c73698769fe05759abb4a4b36104=1349856213452,1350217743201,1350264114372,1351741868094; WT_FPC=id=2c5d10d6b3a8cb8711e1349856213895:lv=1351744956915:ss=1351741870986; LongTimeValuesCookies=__SSO_LOGIN%2441b607ae511127f8733fa905af7b4e04b83408b45ee8292cb7fd5e2debac152660968cb1f160ebf2d15b158976b4a2191a9f661eab6b666f%23__user_id_login_2009%24bd127eb257901f5f%23__LOGIN__VIEWINFO__%24hudiefeiguo%23__LOGIN%24xianglinhai_linhai%40163.com; lafaso_login_name_as988=xianglinhai_linhai%40163.com; search_history_info=%u5B9D%u6D01%24*%23%u534A%u5B9D%u77F3; CHANETINFO=48262192457; vrm_product_uniqueid=8b55cc54-e5e5-4071-b1f9-1b5363aac8ce_48304; history_info=http%3A//img2.imglafaso.com/images/product/2012_10/51642_0_s.jpg+http%3A//product.lefeng.com/product/51642.html+SOYJOY%u7EF4%u7EF4%u56BC%u76CA%u56BC%u6C34%u679C%u5927%u8C46%u8425%u517B%u68D2%uFF08%u5927%u67A3%u5473%uFF0927g*12%u652F%24http%3A//img5.imglafaso.com/images/product/2012_07/48088_0_s.jpg+http%3A//product.lefeng.com/product/48088.html+%u8212%u5C14%u7F8E%u5FAA%u5E8F%u51CF%u538B%u5F39%u529B280D%u7626%u817F%u889C%uFF08%u8FDE%u88E4%u5305%u8DBE%u9ED1%u8272%uFF09%24http%3A//img3.imglafaso.com/images/product/2012_09/153880_0_s.jpg+http%3A//product.lefeng.com/product/153880.html+%u7231%u8FD9%u8336%u8BED%u6C34%u679C%u6717%u59C6%u9152%20%u82B1%u679C%u8336100g%24http%3A//img1.imglafaso.com/images/product/2012_10/48304_0_s.jpg+http%3A//product.lefeng.com/product/48304.html+VICHY%u8587%u59FF%u6D3B%u6027%u5851%u989C%u65B0%u751F%u7CBE%u534E%u4E73%2030ml%u2014%24null; Hm_lpvt_db93c73698769fe05759abb4a4b36104=1351743221349; __utmb=96327937.20.10.1351741868; __utmc=96327937; __l=253009943; __lstinst=254666832; zhuanti_groupbuy_id=new@fushi/index.html@ak1|new@Coat.html@ak1|new@riyong/@ak1; OneTimeValuesCookies=__user_type__%240%23__user_totalbuy__%240%23__user_id__%249801074; JSESSIONID=abcnELIy8ePzb5msMg6Qt";
		Map map = new HashMap();
		String rs = doPost(reqUrl, map, "utf-8");
		System.out.println("rs " + rs);

		/*
		 * String rs= doPost(reqUrl, map, "utf-8");
		 * writeFile("C:/Users/sea/Desktop/a.html", rs);
		 */

		// System.out.println(URLDecoder.decode("%25E6%2588%2591%25E5%25A5%25B3%25E6%259C%258B%25E5%258F%258B%25E4%25B9%25B0%25E7%259A%2584%25EF%25BC%258C%25E6%2595%2588%25E6%259E%259C%25E5%25BE%2588%25E6%2598%258E%25E6%2598%25BE%25EF%25BC%2581%25EF%25BC%2581".replace("25",
		// ""), "utf-8"));
		// System.out.println(URLEncoder.encode("我女朋友买的，效果很明显！！",
		// "utf-8").replace("%", "%25"));

	}

	/**
	 * 抓取微信内容
	 */
	public static void snatch_WeixingContent() {
		String reqUrl = "http://mp.weixin.qq.com/cgi-bin/getmessage?t=wxm-message&lang=zh_CN&count=50&timeline=1&day=0";
		Map<String, String> map = new HashMap<String, String>();
		map.put("Host", "mp.weixin.qq.com");
		map.put("Connection", "keep-alive");
		map.put("User-Agent",
				"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4");
		map.put("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
		map.put("Referer",
				"http://mp.weixin.qq.com/cgi-bin/getmessage?t=wxm-message&lang=zh_CN&count=50&timeline=1&day=0");
		map.put("Accept-Encoding", "gzip,deflate,sdch");
		map.put("Accept-Language", "zh-CN,zh;q=0.8");
		map.put("Accept-Charset", "GBK,utf-8;q=0.7,*;q=0.3");

		try {
			String rs = doPost(reqUrl, "utf-8", map);
			System.out.println("rs \n" + rs);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 下载函数
	 * 
	 * @param reqUrl
	 *            请求URl<br>
	 * @param ecoding
	 *            编码 <br>
	 * @param paramMap
	 *            参数集合<br>
	 * @return html <br>
	 * @throws IOException
	 */
	public static String doPost(String reqUrl, String ecoding, Map<String, String> paramMap) throws IOException {
		URL url = new URL(reqUrl);
		HttpURLConnection url_con = (HttpURLConnection) url.openConnection();

		if (paramMap != null && paramMap.size() > 0) //
		{
			for (String key : paramMap.keySet()) {
				String value = paramMap.get(key);
				url_con.setRequestProperty(key, value);
			}
		}

		InputStream in = url_con.getInputStream();

		BufferedReader rd = null;
		rd = new BufferedReader(new InputStreamReader(in, ecoding));

		String tempLine = null;
		StringBuffer tempStr = new StringBuffer();
		while ((tempLine = rd.readLine()) != null) {
			tempStr.append(tempLine + "\n");
		}
		rd.close();
		in.close();
		return tempStr.toString();
	}

	/**
	 * 发送带参数的POST的HTTP请求
	 * @param reqUrl  HTTP请求URL
	 * @param parameters 参数映射表
	 * @param reqHeader http 请求头设置
	 * @param recvEncoding HTTP响应的字符串
	 * @return 服务器返回的消息
	 */
	@SuppressWarnings("rawtypes")
	public static String doPost(String reqUrl, Map<?, ?> parameters, Map<String, String> reqHeader, String recvEncoding) {

		HttpURLConnection url_con = null;
		String responseContent = null;
		try {
			StringBuffer params = new StringBuffer();
			for (Iterator<?> iter = parameters.entrySet().iterator(); iter.hasNext();) {
				Entry element = (Entry) iter.next();
				params.append(element.getKey().toString());
				params.append("=");
				params.append(URLEncoder.encode(element.getValue().toString(), recvEncoding));
				params.append("&");
			}

			if (params.length() > 0) {
				params = params.deleteCharAt(params.length() - 1);
			}

			URL url = new URL(reqUrl);
			url_con = (HttpURLConnection) url.openConnection();

			if (reqHeader != null && reqHeader.size() > 0) {
				for (String key : reqHeader.keySet()) {
					String value = reqHeader.get(key);
					url_con.setRequestProperty(key, value);
				}
			}

			url_con.setRequestMethod("POST");
			System.setProperty("sun.net.client.defaultConnectTimeout", String.valueOf("100000"));
			System.setProperty("sun.net.client.defaultReadTimeout", String.valueOf("100000"));

			url_con.setDoOutput(true);
			byte[] b = params.toString().getBytes();
			url_con.getOutputStream().write(b, 0, b.length);
			url_con.getOutputStream().flush();
			url_con.getOutputStream().close();

			InputStream in = url_con.getInputStream();
			BufferedReader rd = new BufferedReader(new InputStreamReader(in, recvEncoding));
			String tempLine = rd.readLine();
			StringBuffer tempStr = new StringBuffer();
			String crlf = System.getProperty("line.separator");
			while (tempLine != null) {
				tempStr.append(tempLine + "\n");
				tempStr.append(crlf);
				tempLine = rd.readLine();
			}
			responseContent = tempStr.toString();
			if (null != rd)
				rd.close();
			if (null != in)
				in.close();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (null != url_con) {
				url_con.disconnect();
			}
		}
		//重置 时间记录
		return responseContent;
	}

	public static String doPost(String reqUrl) {
		HttpURLConnection url_con = null;
		String responseContent = null;
		try {
			URL url = new URL(reqUrl);
			url_con = (HttpURLConnection) url.openConnection();
			url_con.setRequestProperty("Cookie", cookie);
			url_con.setRequestMethod("POST");
			System.setProperty("sun.net.client.defaultConnectTimeout", String.valueOf(connectTimeOut));// （单位：毫秒）jdk1.4换成这个,连接超时
			System.setProperty("sun.net.client.defaultReadTimeout", String.valueOf(readTimeOut)); // （单位：毫秒）jdk1.4换成这个,读操作超时
			// url_con.setConnectTimeout(5000);//（单位：毫秒）jdk
			// 1.5换成这个,连接超时
			// url_con.setReadTimeout(5000);//（单位：毫秒）jdk 1.5换成这个,读操作超时
			url_con.setDoOutput(true);
			url_con.getOutputStream().flush();
			url_con.getOutputStream().close();

			InputStream in = url_con.getInputStream();
			BufferedReader rd = new BufferedReader(new InputStreamReader(in, htmlEcoding));
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
		} catch (IOException e) {
			System.out.println("error=========> " + e.getMessage());
			// e.printStackTrace();
		} finally {
			if (url_con != null) {
				url_con.disconnect();
			}
		}
		return responseContent;
	}

	/**
	 * @param reqUrl
	 *            图片的连接<br>
	 * @param savePath
	 *            保存的路径
	 */
	@SuppressWarnings("resource")
	public static void downloadPicture(String reqUrl, String savePath) {
		HttpURLConnection url_con = null;
		try {
			File file = new File(savePath.substring(0, savePath.lastIndexOf("/")));
			if (!file.exists()) {
				file.mkdirs();
			}
			URL url = new URL(reqUrl);
			url_con = (HttpURLConnection) url.openConnection();
			url_con.setRequestProperty("Cookie", cookie);
			url_con.setRequestMethod("POST");
			url_con.setDoOutput(true);
			url_con.getOutputStream().flush();
			url_con.getOutputStream().close();

			InputStream is = url_con.getInputStream();
			BufferedReader rd = new BufferedReader(new InputStreamReader(is, "gbk"));
			FileOutputStream fw = null;
			System.out.println("图片下载地址util===========" + reqUrl);
			System.out.println("savePath======> " + savePath);
			File f = new File(savePath.substring(0, savePath.lastIndexOf("/")));
			if (!f.exists()) {
				f.mkdirs();
			}
			fw = new FileOutputStream(savePath, true);
			int num = -1;
			while ((num = is.read()) != (-1))// 是否读完所有数据
			{
				fw.write(num);// 将数据写往文件
			}
			rd.close();
			is.close();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (url_con != null) {
				url_con.disconnect();
			}
		}
	}

	@SuppressWarnings("rawtypes")
	public static String doPost(String reqUrl, Map<?, ?> parameters, String recvEncoding) {
		HttpURLConnection url_con = null;
		String responseContent = null;
		try {
			StringBuffer params = new StringBuffer();
			for (Iterator<?> iter = parameters.entrySet().iterator(); iter.hasNext();) {
				Entry element = (Entry) iter.next();
				params.append(element.getKey().toString());
				params.append("=");
				params.append(URLEncoder.encode(element.getValue().toString(), htmlEcoding));
				params.append("&");
			}

			if (params.length() > 0) {
				params = params.deleteCharAt(params.length() - 1);
			}

			URL url = new URL(reqUrl);
			url_con = (HttpURLConnection) url.openConnection();
			url_con.setRequestProperty("Accept", "application/javascript, */*;q=0.8");
			url_con.setRequestProperty("Referer", "http://review.lefeng.com/reply/13264-519874.html");
			url_con.setRequestProperty("Accept-Language", "zh-CN");
			url_con.setRequestProperty("User-Agent",
					"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)");
			url_con.setRequestProperty("Host", "active.lefeng.com");
			url_con.setRequestProperty("Connection", "Keep-Alive");
			url_con.setRequestProperty("Cookie", cookie);
			url_con.setRequestMethod("POST");
			System.setProperty("sun.net.client.defaultConnectTimeout", String.valueOf(connectTimeOut));// （单位：毫秒）jdk1.4换成这个,连接超时
			System.setProperty("sun.net.client.defaultReadTimeout", String.valueOf(readTimeOut)); // （单位：毫秒）jdk1.4换成这个,读操作超时
			// url_con.setConnectTimeout(5000);//（单位：毫秒）jdk
			// 1.5换成这个,连接超时
			// url_con.setReadTimeout(5000);//（单位：毫秒）jdk 1.5换成这个,读操作超时
			url_con.setDoOutput(true);
			int code = url_con.getResponseCode();
			System.out.println("code " + code);
			System.out.println("response =====>>" + url_con.getURL());
			/*
			 * byte[] b = params.toString().getBytes();
			 * url_con.getOutputStream().write(b, 0, b.length);
			 * url_con.getOutputStream().flush();
			 * url_con.getOutputStream().close();
			 */

			InputStream in = url_con.getInputStream();
			BufferedReader rd = new BufferedReader(new InputStreamReader(in, recvEncoding));
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
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (url_con != null) {
				url_con.disconnect();
			}
		}
		return responseContent;
	}

	/**
	 * unicode 转换成 中文
	 * 
	 * @author fanhui 2007-3-15
	 * @param theString
	 * @return
	 */

	public static String decodeUnicode(String theString) {

		char aChar;

		int len = theString.length();

		StringBuffer outBuffer = new StringBuffer(len);

		for (int x = 0; x < len;) {

			aChar = theString.charAt(x++);

			if (aChar == '\\') {

				aChar = theString.charAt(x++);

				if (aChar == 'u') {

					// Read the xxxx

					int value = 0;

					for (int i = 0; i < 4; i++) {

						aChar = theString.charAt(x++);

						switch (aChar) {

						case '0':

						case '1':

						case '2':

						case '3':

						case '4':

						case '5':

						case '6':

						case '7':

						case '8':

						case '9':

							value = (value << 4) + aChar - '0';

							break;

						case 'a':

						case 'b':

						case 'c':

						case 'd':

						case 'e':

						case 'f':

							value = (value << 4) + 10 + aChar - 'a';

							break;

						case 'A':

						case 'B':

						case 'C':

						case 'D':

						case 'E':

						case 'F':

							value = (value << 4) + 10 + aChar - 'A';

							break;

						default:

							throw new IllegalArgumentException(

							"Malformed   \\uxxxx   encoding.");

						}

					}

					outBuffer.append((char) value);

				} else {

					if (aChar == 't')

						aChar = '\t';

					else if (aChar == 'r')

						aChar = '\r';

					else if (aChar == 'n')

						aChar = '\n';

					else if (aChar == 'f')

						aChar = '\f';

					outBuffer.append(aChar);

				}

			} else

				outBuffer.append(aChar);

		}

		return outBuffer.toString();

	}

	public static String getPath() {

		String path = getClassFilePath(Util.class);
		path = path.substring(0, path.lastIndexOf("classes") + 8);
		return path;
	}

	public static String getClassFilePath(Class<?> clazz) {
		try {
			return java.net.URLDecoder.decode(getClassFile(clazz).getAbsolutePath(), "UTF-8");
		} catch (UnsupportedEncodingException e) {
			// logger.error("url decode error:", e);
			return "";
		}
	}

	private static File getClassFile(Class<?> clazz) {
		URL path = clazz.getResource(clazz.getName().substring(clazz.getName().lastIndexOf(".") + 1) + ".class");
		if (path == null) {
			String name = clazz.getName().replaceAll("[.]", "/");
			path = clazz.getResource("/" + name + ".class");
		}
		return new File(path.getFile());
	}

	/**
	 * 读文件
	 * 
	 * @param filePath
	 * @return
	 */
	public static String readFile(String filePath) {
		StringBuffer sb = new StringBuffer();
		try {
			String path = getPath() + filePath;
			System.out.println(" path " + path);
			File f = new File(path);
			if (f.isFile() && f.exists()) {
				InputStreamReader read = new InputStreamReader(new FileInputStream(f), "UTF-8");
				BufferedReader reader = new BufferedReader(read);
				String line;
				while ((line = reader.readLine()) != null) {
					sb.append(line + "\n");
				}
				read.close();
			} else
				System.out.println("can not find the filepath " + path);
		} catch (Exception e) {
			System.out.println("读取文件内容操作出错");
			e.printStackTrace();
		}
		return sb.toString();

	}

	/**
	 * 下载函数
	 * 
	 * @param reqUrl
	 *            请求URl<br>
	 * @param ecoding
	 *            编码 <br>
	 * @param paramMap
	 *            参数集合<br>
	 * @return html <br>
	 * @throws IOException
	 */
	public static String downloadMusic(String reqUrl, String ecoding, Map<String, String> paramMap, String cookie)
			throws IOException {
		URL url = new URL(reqUrl);
		HttpURLConnection url_con = (HttpURLConnection) url.openConnection();

		if (paramMap != null && paramMap.size() > 0) {
			for (String key : paramMap.keySet()) {
				String value = paramMap.get(key);
				url_con.setRequestProperty(key, value);
			}
		}

		url_con.setRequestProperty("Cookie", cookie);
		InputStream in = url_con.getInputStream();

		BufferedReader rd = null;
		if (ecoding == null || ecoding.equals("")) {
			String str = url_con.getHeaderField("Content-Type");
			if (str != null && !str.equals("")) {
				ecoding = str.split("=")[1].trim();
				if (ecoding != null && !ecoding.equals(""))
					rd = new BufferedReader(new InputStreamReader(in, ecoding));
				else
					rd = new BufferedReader(new InputStreamReader(in));
			} else
				rd = new BufferedReader(new InputStreamReader(in));

		} else
			rd = new BufferedReader(new InputStreamReader(in, ecoding));

		String tempLine = null;
		StringBuffer sb = new StringBuffer();
		while ((tempLine = rd.readLine()) != null) {
			sb.append(tempLine + "\n");
		}
		rd.close();
		in.close();
		return sb.toString();
	}

	/**
	 * 下载函数
	 * 
	 * @param reqUrl
	 *            请求URl<br>
	 * @param ecoding
	 *            编码 <br>
	 * @param paramMap
	 *            参数集合<br>
	 * @return html <br>
	 * @throws IOException
	 */
	public static String downloadHtml(String reqUrl, String ecoding, Map<String, String> paramMap) throws IOException {
		URL url = new URL(reqUrl);
		HttpURLConnection url_con = (HttpURLConnection) url.openConnection();

		if (paramMap != null && paramMap.size() > 0) // ���ò���
		{
			for (String key : paramMap.keySet()) {
				String value = paramMap.get(key);
				url_con.setRequestProperty(key, value);
			}
		}

		url_con.setRequestProperty("Cookie", cookie);
		InputStream in = url_con.getInputStream();

		BufferedReader rd = null;
		if (ecoding == null || ecoding.equals("")) {
			String str = url_con.getHeaderField("Content-Type");
			if (str != null && !str.equals("")) {
				ecoding = str.split("=")[1].trim();
				if (ecoding != null && !ecoding.equals(""))
					rd = new BufferedReader(new InputStreamReader(in, ecoding));
				else
					rd = new BufferedReader(new InputStreamReader(in));
			} else
				rd = new BufferedReader(new InputStreamReader(in));

		} else
			rd = new BufferedReader(new InputStreamReader(in, ecoding));

		String tempLine = null;
		StringBuffer sb = new StringBuffer();
		while ((tempLine = rd.readLine()) != null) {
			sb.append(tempLine + "\n");
		}
		rd.close();
		in.close();
		return sb.toString();
	}

	/**
	 * @param printStr
	 */
	@SuppressWarnings("static-access")
	public static void sleepTime(long sleepTime, String printStr) {
		try {
			if (printStr != null && !printStr.equals(""))
				System.out.println("=======" + printStr + "=======");
			Thread.currentThread().sleep(sleepTime);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 把map里的键值对自动赋给model的属性
	 * 
	 * @param fieldMap
	 * @param obj
	 */
	@SuppressWarnings("rawtypes")
	public static void setModelValueAuto(Map fieldMap, Object obj) {
		Class<?> clazz = obj.getClass();
		Field[] field = clazz.getDeclaredFields();
		for (Field f : field) {
			f.setAccessible(true);
			@SuppressWarnings("unchecked")
			Iterator<String> it = fieldMap.keySet().iterator();
			while (it.hasNext()) {
				String FieldNameKey = it.next();
				if (f.getName().equals(FieldNameKey)) // 如果属性名和map里的key相等
				{
					Object fieldValue = fieldMap.get(FieldNameKey);

					try {
						if (f.getType().toString().endsWith("String")) // String
																		// 类型
						{
							fieldValue = fieldValue.toString();
							f.set(obj, fieldValue);
						}
						if (f.getType().toString().endsWith("int")) // int类型
						{
							fieldValue = Integer.parseInt(fieldValue.toString());
							f.set(obj, fieldValue);
						}
						if (f.getType().toString().endsWith(".Long")) // long类型
						{
							fieldValue = Long.parseLong(fieldValue.toString());
							f.set(obj, fieldValue);
						}
						if (f.getType().toString().endsWith("sql.Timestamp")) // Timestamp
																				// 类型
						{
							fieldValue = new Timestamp(Long.parseLong(fieldValue.toString()));
							f.set(obj, fieldValue);
						}

					} catch (IllegalArgumentException e) {
						e.printStackTrace();
					} catch (IllegalAccessException e) {
						e.printStackTrace();
					}
				}
			}

		}

	}
}
