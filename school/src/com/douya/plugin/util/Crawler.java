package com.douya.plugin.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.douya.common.utils.DateUtil;
import com.douya.pachong.model.RegexModel;
import com.douya.pachong.utils.ParsePattern;
import com.douya.pachong.utils.Util;

public class Crawler {
	
	
	private static String default_config = "weibo_pattern.pattern";
	// 正则对象
	private final List<RegexModel> regList = new ArrayList<RegexModel>();
	private Date HTTP_REQ_TIME = new Date();
	private int requestFrequence = 3000;
	private int pageLimit = 5;
	private String cookie = "";

	public Crawler() {
		ParsePattern.init(default_config, regList);
	}

	public Crawler(String cookie) {
		this.cookie = cookie;
		ParsePattern.init(default_config, regList);
	}

	public Crawler(String cookie, int pageLimit, int requestFrequence) {
		this.cookie = cookie;
		this.pageLimit = pageLimit;
		this.requestFrequence = requestFrequence;
		ParsePattern.init(default_config, regList);
	}

	/**
	 * @param args
	 * @throws IOException
	 */
	public static void main(String[] args) throws IOException {

	}

	
	/**
	 * 功能说明: 获取最大页数，针对页面没有总页数情况，采取抓取所有的页面，然后比较出最大的页码作为总页数
	 * @param rs
	 * @param regex
	 * @return 
	 * @author sea 2013-3-23
	 */
	public int getMaxPage(String rs, String regex) {
		int maxPage = 1;
		if (null == rs || "".equals(rs)) {
			return maxPage;
		}
		if (null == regex || "".equals(regex)) {
			return maxPage;
		}

		Pattern p = Pattern.compile(regex);
		Matcher m = p.matcher(rs);
		while (m.find()) {
			String str = m.group(1).trim();
			if (null == str || "".equals(str)) {
				break;
			}
			int tmpPage = Integer.parseInt(str);
			if (maxPage < tmpPage)
				maxPage = tmpPage;
		}
		return maxPage;
	}

	/**
	 * 搜索方法
	 * 
	 * @param searchCondition
	 *            关键字（搜索条件）
	 * @param pageNum
	 *            页数
	 * @return 返回list
	 * @throws IOException
	 */
	public String serchByName(String searchCondition, int pageNum) throws IOException {

		Date now = new Date();

		String date1 = DateUtil.formatYearMonthDay(now);

		String param = URLEncoder.encode(searchCondition, "utf-8");
		String url = "http://s.weibo.com/weibo/" + param + "&Refer=user_weibo&retcode=6102&timescope=custom:" + date1
				+ ":" + date1 + "&Refer=g&page=" + pageNum;

		Map<String, String> map = new HashMap<String, String>();
		map.put("Accept", "text/html, application/xhtml+xml, */*");
		map.put("Accept-Language", "zh-CN");
		map.put("User-Agent", "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)");
		map.put("Host", "s.weibo.com");
		map.put("Connection", "Keep-Alive");
		map.put("Cookie", this.cookie);
		String result = downloadHtml(url, "utf-8", map);

		String rs = Util.decodeUnicode(result);

		int maxPage = getMaxPage(rs, "<li><a\\s*?href=[^>]+?>(\\d+?)</a></li>");

		if (maxPage < pageNum) {
			result = "";
		}

		return result;
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
	public String downloadHtml(String reqUrl, String ecoding, Map<String, String> paramMap) throws IOException {
		URL url = new URL(reqUrl);
		HttpURLConnection url_con = (HttpURLConnection) url.openConnection();

		long currentTime = System.currentTimeMillis();
		Date httpReqTime = HTTP_REQ_TIME;
		if (null == httpReqTime) {
			httpReqTime = new Date();
		}
		long limitTime = currentTime - httpReqTime.getTime();

		if (limitTime < requestFrequence)
			Util.sleepTime(requestFrequence - limitTime, "系统输出，控制 tcp 访问频率");

		if (paramMap != null && paramMap.size() > 0) {
			for (String key : paramMap.keySet()) {
				String value = paramMap.get(key);
				url_con.setRequestProperty(key, value);
			}
		}

		url_con.setRequestProperty("Cookie", this.cookie);
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
		// 重置 时间记录
		HTTP_REQ_TIME = new Date();

		return sb.toString();
	}

	/**
	 * 解析封装对象
	 * 
	 * @param rs
	 */
	/*public List<WeiboModel> parseHtml(String rs, String searchName) {
		String regex = "<p node-type=\"feed_list_content\">[\\s\\S]*?</dt>";
		regex = "<dl class=\"feed_list\" mid=\"\\d+?\"[\\s\\S]*?</dd>\\s*?<dd class=\"clear\"></dd>\\s*?</dl>";
		Pattern p = Pattern.compile(regex);
		Matcher m = p.matcher(rs);
		List<WeiboModel> wmList = new ArrayList<WeiboModel>();
		while (m.find()) // get a clob for a user
		{
			WeiboModel wm = new WeiboModel();
			wm.setKeywordName(searchName);

			Map<String, String> map = new HashMap<String, String>();
			String matcherStr = m.group();

			for (RegexModel rm : regList) {
				if (rm.getLayer() > 1) // 用层数控制，减少循环匹配次数
					continue;

				Matcher mm = rm.getMyPattern().matcher(matcherStr);
				if (mm.find()) {
					for (Map<String, Integer> maps : rm.getMatchGroupList()) {
						for (String propertyName : maps.keySet()) {
							Integer matchedGroup = maps.get(propertyName);
							String matchedValue = mm.group(matchedGroup).trim();
							// 将匹配到得属性和对应的值放入map里
							map.put(propertyName, matchedValue);
						}
					}
				}

				wm.setValueAuto(map);
			}

			// 抓第二层
			try {
				wm = snatchUserInfo(wm);
				System.out.println("微博信息: \n" + wm);

				wmList.add(wm);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		return wmList;
	}*/

	/**
	 * 
	 * @param wm
	 * @throws IOException
	 */
	/*public WeiboModel snatchUserInfo(WeiboModel wm) throws IOException {
		String reqUrl = "http://weibo.com/aj/user/card?type=1&id=" + wm.getUserId();
		Map<String, String> map = new HashMap<String, String>();
		map.put("Cookie", this.cookie);

		String rs = downloadHtml(reqUrl, "utf-8", map);
		rs = Util.decodeUnicode(rs);

		for (RegexModel rm : regList) {
			if (rm.getLayer() == 1) // 用层数控制，减少循环匹配次数
				continue;

			Matcher mm = rm.getMyPattern().matcher(rs);
			if (mm.find()) {
				for (Map<String, Integer> maps : rm.getMatchGroupList()) {
					for (String propertyName : maps.keySet()) {
						Integer matchedGroup = maps.get(propertyName);
						String matchedValue = mm.group(matchedGroup).trim();
						// 将匹配到得属性和对应的值放入map里
						map.put(propertyName, matchedValue);
					}
				}
			}

			wm.setValueAuto(map);

		}
		return wm;
	}*/
/*
	public void testSnatch(String searchName) throws IOException {
		for (int pageIndex = 1; pageIndex <= pageLimit; pageIndex++) {

			String searchResult = serchByName(searchName, pageIndex); // 获得微博
			String rs = Util.decodeUnicode(searchResult);

			List<WeiboModel> wlist = parseHtml(rs, searchName);
			for (WeiboModel wm : wlist) {
				wm = snatchUserInfo(wm);
				wm.setFromUrl("http://api.t.sina.com.cn/" + wm.getUserId() + "/statuses/" + wm.getWeiboId());
				System.out.println("wm \n" + wm);
			}

		}

	}
	*/
	

}
