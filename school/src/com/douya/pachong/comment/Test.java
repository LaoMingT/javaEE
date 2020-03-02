package com.douya.pachong.comment;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

import net.sf.json.JSONArray;

import com.douya.common.hessian.MCCBusinessHessianHelper;
import com.douya.weixin.serviceImpl.WeixinServiceInterfaceImpl;

public class Test {
	private int conTactTime;// 连接建立最大延迟
	private int readTime;// 读取最大延迟
	private String encoding = "GBK";

	public HttpURLConnection getConnection(String pageURL) {
		HttpURLConnection connection = null;
		try {
			URL url = new URL(pageURL);
			connection = (HttpURLConnection) url.openConnection();
			connection.setConnectTimeout(conTactTime);
			connection.setReadTimeout(readTime);
			connection.setRequestProperty("User-Agent", "MSIE 7.0");
		} catch (MalformedURLException e) {
		} catch (Exception e) {
			return null;
		}

		return connection;
	}

	/**
	 * 描述:把内容写入文件中
	 * 
	 * @param content
	 * @param filename
	 * @return void
	 */
	public void buildFile(String content, String filename) {
		if (content != null) {
			try {
				File file = new File(filename);
				BufferedWriter bw = new BufferedWriter(new FileWriter(file));
				bw.write(content);
				bw.close();
			} catch (IOException e) {
			}
		}

	}

	public String downloadString(String pageURL, String encoding) {

		StringBuilder pageBuilder = new StringBuilder();
		HttpURLConnection connection = getConnection(pageURL);
		Reader netReader = null;
		try {
			netReader = new InputStreamReader(connection.getInputStream(),
					encoding);
		} catch (UnsupportedEncodingException e) {
			return null;
		} catch (Exception e) {
			return null;
		}

		BufferedReader br = new BufferedReader(netReader);
		String line = null;
		try {
			while ((line = br.readLine()) != null) {
				// Log.logger.info(line.toString());
				pageBuilder.append(line);
				pageBuilder.append("\r\n");
			}
			br.close();
		} catch (IOException e) {
			return null;
		}

		connection.disconnect();
		// http://coral.qq.com/article/1012467508/hotcomment?reqnum=10&callback=myHotcommentList&_=1409325470767
		return pageBuilder.toString();
	}

	public void tecentNEW() {}

	public void wyNEWS() {

		boolean t = true;
		StringBuffer sb = new StringBuffer();
		String comment = "A67A5HHR00031H2L";
		int a = 1;
		while (t) {

			String url = "http://comment.ent.163.com/cache/newlist/ent2_bbs/"
					+ comment + "_" + a + ".html";

			String str = downloadString(url, "utf-8");

			if (str.equals("")) {
				t = false;
			}

			str = str.replaceAll("var newPostList=", "");
			str = str.replaceAll(";", "");

			System.out.println(str);
			WyComment wy = null;
			try {
				wy = new WyComment(str);

			} catch (Exception e) {
				wy = null;
			}
			if (wy != null) {

				JSONArray json = wy.getNewPosts();

				WyCommentId wyid = null;
				if (json != null) {
					if (!json.isEmpty()) {

						for (int i = 0; i < json.size(); i++) {

							wyid = new WyCommentId(json.get(i).toString(), "1");

							sb.append(wyid.getB() + "\n");

							System.out.println(wyid.getB());
						}
					}
				} else {
					t = false;
				}
			}else{
				t = false;
			}
			a++;
		}
		if (sb.toString() != null && !sb.toString().equals("")) {
			buildFile(sb.toString(), comment + ".txt");
		}
	}

	public static void main(String[] args) {

		Test t = new Test();

		t.wyNEWS();

	}

}
