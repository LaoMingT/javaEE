package com.douya.weixin.serviceImpl;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import jeasy.analysis.MMAnalyzer;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.alibaba.fastjson.JSON;
import com.douya.weixin.json.AccessToken;
import com.douya.weixin.service.WeixinServiceInterface;
import com.sedion.advanced.model.Article;
import com.sedion.advanced.model.Music;
import com.sedion.advanced.model.PersonalInf;
import com.sedion.advanced.model.WeixinGroup;
import com.sedion.advanced.model.WeixinMedia;
import com.sedion.advanced.model.WeixinOauth2Token;
import com.sedion.advanced.model.WeixinQRCode;
import com.sedion.advanced.model.WeixinUserList;
import com.sedion.advanced.util.CreateQRCode;
import com.sedion.advanced.util.GetPersoninf;
import com.sedion.advanced.util.GetUserList;
import com.sedion.advanced.util.GroupUtil;
import com.sedion.advanced.util.MakeCustomMessage;
import com.sedion.advanced.util.MediaUtil;
import com.sedion.advanced.util.OAuthUtil;
import com.sedion.advanced.util.SendCustomMessage;
import com.sedion.menu.model.Menu;
import com.sedion.menu.util.MenuUtil;
/**
 * 微信功能接口的调用平台接口的实现
 * @author szd1007  20140617 www.douyakeji.com
 *
 */

public class WeixinServiceInterfaceImpl implements WeixinServiceInterface {

	private String appID;
	private String appsecret;
	private final static Log log = LogFactory.getLog(WeixinServiceInterfaceImpl.class);
	private HttpClient client = new HttpClient();
//	private DefaultHttpClient deClient = new DefaultHttpClient();

	//接口url
	private String accessTokenUrl="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential";
	private String postMenuUrl="https://api.weixin.qq.com/cgi-bin/menu/create?access_token=";
	private String getUserListUrl="https://api.weixin.qq.com/cgi-bin/user/get?";
	public WeixinServiceInterfaceImpl(String appID,String appsecret)
	{
		this.appID = appID;
		this.appsecret = appsecret;
	}
	public String getToken()
	{
		String url = this.accessTokenUrl+"&appid="+this.appID+"&secret="+this.appsecret;
//		String t="{\"access_token\":\"WLg7JFw4tBml11oLoSlnb3hFZxg9E7R3p6Aq_yIEAALGZ6jrkqsTP40XcVefqA5JTygmg724o_czulvd7kgCmw\",\"expires_in\":7200}";
		AccessToken at= JSON.parseObject(executeGET(url), AccessToken.class);
		System.out.println("获取token: "+at.getAccess_token());
		return at.getAccess_token();
	}
	/**
	 * 执行httpget方法
	 * @param url   
	 * @return  
	 */
	public String executeGET(String url)
	{
		String responseString=null;
		GetMethod gm = new GetMethod(url);
		try {
			client.executeMethod(gm);
			responseString = gm.getResponseBodyAsString();
			gm.releaseConnection();//释放链接
		} catch (HttpException e) {
			// TODO Auto-generated catch block
			log.error("get方法执行错误"+e);
 		} catch (IOException e) {
			// TODO Auto-generated catch block
			log.error("get方法执行错误"+e);
		}
	
		return responseString;

	}
	/**
	 * httpPost方法
	 * @param url
	 * @param params  参数
	 * @return   返回相应字符串
	 */
	public boolean executePostJson(String url,String json)
	{
		 PostMethod post = new PostMethod(url);
         post.setRequestBody(json);
		 
         post.getParams().setContentCharset("utf-8");
         //发送http请求
         String respStr = "";
         try {
             client.executeMethod(post);
             respStr = post.getResponseBodyAsString();
         } catch (HttpException e) {
             e.printStackTrace();
         } catch (IOException e) {
             e.printStackTrace();
         }
         System.out.println(respStr);
//		   DefaultHttpClient ssclient = new DefaultHttpClient();

		// HttpClient client = new HttpClient();
//PostMethod post = new PostMethod(url);
//post.setRequestBody(responeJsonStr);
//post.getParams().setContentCharset("utf-8");
////发送http请求
//String respStr = "";
//try {
//client.executeMethod(post);
//respStr = post.getResponseBodyAsString();
//} catch (HttpException e) {
//e.printStackTrace();
//} catch (IOException e) {
//e.printStackTrace();
//}
//System.out.println(responeJsonStr);
//System.out.println(respStr);



//		      try {  
//
//		   	   //登录
//		        HttpPost menuPost = new HttpPost(url);  
//		     //用户名密码登录
//		        	StringEntity entity = new StringEntity(URLEncoder.encode(json, "UTF-8"),"utf-8");
//		             menuPost.setEntity(entity);
//		        HttpResponse response = ssclient.execute(menuPost);
//		        System.out.println(EntityUtils.toString(response.getEntity()));
//		      }catch(Exception e)
//		      {
//		    	  
//		      }

		
		return true;
	}

	/**
	 * 读取文件内容
	 * @return
	 */
	 public  String readMenu(String path)
	  {
		  
         String anString="";
		  try {
	           BufferedReader bis = new BufferedReader(new InputStreamReader(new FileInputStream( new File(path)), "utf-8") );
	           String szTemp;
	          
	           
	           while ( (szTemp = bis.readLine()) != null) {
	               
	                   anString+=szTemp.trim();

	           }
	           bis.close();
	       }
	       catch( Exception e ) 
	       {
	       	System.out.println(e.getMessage());
	          
	       }
	       System.out.println(anString);
      return anString;
	  } 
	
	
//	  public static String httpRequest(String reqUrl,String reqMethod,String outStr) {
//	        String jsonObj = null;
//	        StringBuffer buffer = new StringBuffer();
//	        
//	        try {
//	            TrustManager[] tm = { new MyX509TrustManager()};
//	            SSLContext  sslContext = SSLContext.getInstance("SSL","SunJSSE");
//	            sslContext.init(null, tm, new SecureRandom());
//	            
//	            javax.net.ssl.SSLSocketFactory ssf = sslContext.getSocketFactory();
//	            
//	            URL url = new URL(reqUrl);
//	            HttpsURLConnection httpUrlCon = (HttpsURLConnection)url.openConnection();
//	            httpUrlCon.setSSLSocketFactory(ssf);
//	            
//	            httpUrlCon.setDoInput(true);
//	            httpUrlCon.setDoOutput(true);
//	            httpUrlCon.setUseCaches(false);
//	            
//	            httpUrlCon.setRequestMethod(reqMethod);
//	            
//	            if ("GET".equalsIgnoreCase(reqMethod)) {
//	                httpUrlCon.connect();
//	            }
//	            
//	            if (null != outStr) {
//	                OutputStream outputStream = httpUrlCon.getOutputStream();
//	                outputStream.write(outStr.getBytes("utf-8"));
//	                outputStream.close();
//	            }
//	            
//	            InputStream inputStream = httpUrlCon.getInputStream();
//	            InputStreamReader reader = new InputStreamReader(inputStream,"utf-8");
//	            BufferedReader bufferedReader = new BufferedReader(reader);
//	            
//	            String str = null;
//	            while ((str = bufferedReader.readLine()) != null) {
//	                buffer.append(str);
//	            }
//	            
//	            bufferedReader.close();
//	            reader.close();
//	            inputStream.close();
//	            httpUrlCon.disconnect();
//	            jsonObj= (buffer.toString());
//	            
//	        } catch (ConnectException ex) {
//	            log.error("Weixin server connection timed out.");
//	        } catch (Exception e) {
//	            log.error("https request error:{}", e);
//	        }
//	        
//	        return jsonObj;
//	    }
	  public static void httpPostWithJSON(String url, String json) throws Exception {
	        // 将JSON进行UTF-8编码,以便传输中文
//	        String encoderJson = URLEncoder.encode(json, HTTP.UTF_8);
//	        
//	    //    DefaultHttpClient httpClient = new DefaultHttpClient();
//	   //     HttpPost httpPost = new HttpPost(url);
//	        httpPost.addHeader(HTTP.CONTENT_TYPE, "application/json");
//	        
//	        StringEntity se = new StringEntity(encoderJson);
//	        se.setContentType("text/json");
//	        se.setContentEncoding(new BasicHeader(HTTP.CONTENT_TYPE, "application/json"));
//	        httpPost.setEntity(se);
//	        HttpResponse response=httpClient.execute(httpPost);
//	        System.out.println(EntityUtils.toString(response.getEntity()));

	    }
	  
		public boolean createMenu(Menu menu,String accessToken) {
			boolean result = MenuUtil.createMenu(menu, accessToken);   
			/*int result = WeixinUtil.createMenu(getMenu(), "0aFyg9AhkcWs__0NAAOWYR0O2pkV5yThzFFwIe_gh9ANHNV5-RwB1lo4iOyASzPlEuh4hpotT418drJ8LHQGyilOBpMVJQ9JPinr8cN5XUFfVQNkGzz-GChXTeoqbULnVHy-F1XVNVMyjUji8mbEhQ");*/
	        // 判断菜单创建结果  
	        if (result)  
	            log.info("菜单创建成功！ok");  
	        else  
	            log.info("菜单创建失败，错误码：" + result);  
	        return result;
		}  
		
		public boolean createMenu(String menuTxt, String accessToken) {
			// TODO Auto-generated method stub
			return MenuUtil.createMenu(menuTxt, accessToken);
		}
	public List<WeixinGroup> getGroupsList(String accessToken) {
		// TODO Auto-generated method stub
		List<WeixinGroup> groupList=GroupUtil.getGroups(accessToken);
		return groupList;
	}
	  
	public WeixinUserList getweixinuserList(String accessToken,String nextOpenId) {
		// TODO Auto-generated method stub
		WeixinUserList weixinUserList=GetUserList.getUserList(accessToken, nextOpenId);

		return weixinUserList;
	}
	public PersonalInf getPersonInfo(String accessToken,String openId) {
		// TODO Auto-generated method stub
		PersonalInf personalInf=GetPersoninf.getPersonalInf(accessToken, openId);

		return personalInf;
	}
	public int getGroupId(String accessToken, String openId) {
		// TODO Auto-generated method stub
		return GetPersoninf.getPersonGroupId(accessToken, openId);
	}
	public WeixinGroup createGroup(String accessToken, String groupName) {
		// TODO Auto-generated method stub
		WeixinGroup group=GroupUtil.createGroup(accessToken, groupName);
		return group;
	}
	public boolean updateGroup(String accessToken, int groupId, String groupName) {
		// TODO Auto-generated method stub		
		boolean result=GroupUtil.updateGroup(accessToken, groupId, groupName);
		return result;
	}
	public boolean removeMemberGroups(String accessToken, String openId,
			int groupId) {
		// TODO Auto-generated method stub
		boolean result = GroupUtil.removeMemberGroups(accessToken, openId, groupId);
		return result;
	}
	public boolean sendTxtMessage(String accessToken, String openId,
			String content) {
		// 组装文本客服消息
		String jsonTextMsg=MakeCustomMessage.makeTextCustomMessage(openId, content);
		// 发送客服消息
		return SendCustomMessage.sendCustomMessage(accessToken, jsonTextMsg);
 
	}
	public boolean sendImageMessage(String accessToken, String openId,
			String mediaId) {
		// 组装图片客服消息
		String jsonImageMsg=MakeCustomMessage.makeImageCustomMessage(openId, mediaId);
		// 发送客服消息
		return SendCustomMessage.sendCustomMessage(accessToken, jsonImageMsg);
	}
	public boolean sendVoiceMessage(String accessToken, String openId,
			String mediaId) {
		// 组装语音客服消息
		String jsonVoiceMsg=MakeCustomMessage.makeVoiceCustomMessage(openId, mediaId);
		// 发送客服消息
		return SendCustomMessage.sendCustomMessage(accessToken, jsonVoiceMsg);
	}
	public boolean sendVideoMessage(String accessToken, String openId,
			String mediaId, String title, String description) {
		// 组装视频客服消息
		String jsonVideoMsg=MakeCustomMessage.makeVideoCustomMessage(openId, mediaId, title, description);
		// 发送客服消息
		return SendCustomMessage.sendCustomMessage(accessToken, jsonVideoMsg);
	}
	public boolean sendMusicMessage(String accessToken, String openId,
			Music music) {
		// 组装音乐客服消息
		String jsonMusicMsg=MakeCustomMessage.makeMusicCustomMessage(openId, music);
		// 发送客服消息
		return SendCustomMessage.sendCustomMessage(accessToken, jsonMusicMsg);
	}
	public boolean sendNewsCustomMessage(String accessToken, String openId,
			List<Article> articleList) {
		// 组装图文客服消息
		String jsonNewsMsg=MakeCustomMessage.makeNewsCustomMessage(openId, articleList);
		// 发送客服消息
		return SendCustomMessage.sendCustomMessage(accessToken, jsonNewsMsg);
	}
	public WeixinQRCode createTemporaryQRCode(String accessToken,
			int expireSeconds, int sceneId) {
		// TODO Auto-generated method stub
		return CreateQRCode.createTemporaryQRCode(accessToken, expireSeconds, sceneId);
	}
	public String createPermanentQRCode(String accessToken, int sceneId) {
		// TODO Auto-generated method stub
		return CreateQRCode.createPermanentQRCode(accessToken, sceneId);
	}
	public WeixinMedia uploadMedia(String accessToken, String type,
			String mediaFileUrl) {
		// TODO Auto-generated method stub
		return MediaUtil.uploadMedia(accessToken, type, mediaFileUrl);
	}
	public String getMedia(String accessToken, String mediaId, String savePath) {
		// TODO Auto-generated method stub
		return MediaUtil.getMedia(accessToken, mediaId, savePath);
	}
	public WeixinOauth2Token getOauth2AccessToken(String appId,
			String appSecret, String code) {
		// TODO Auto-generated method stub
		return OAuthUtil.getOauth2AccessToken(appId, appSecret, code);
	}
	public WeixinOauth2Token refreshOauth2Token(String appId,
			String refreshToken) {
		// TODO Auto-generated method stub
		return OAuthUtil.refreshOauth2Token(appId, refreshToken);
	}
	public String getMenu(String accessToken) {
		// TODO Auto-generated method stub
		return MenuUtil.getMenu(accessToken);
	}
	public boolean deleteMenu(String accessToken) {
		// TODO Auto-generated method stub
		return MenuUtil.deleteMenu(accessToken);
	}
	public List<String> getTitleSplitWord(String setence) {
		MMAnalyzer mm = new MMAnalyzer();
		String temp="";
		try {
			temp = mm.segment(setence,";");
		} catch (IOException e) {
			// TODO Auto-generated catch block
            log.error("菜单创建失败，错误码：" + e);  
		}
//		System.out.println(temp);
		return getKeywordList(temp,';',2);//
	}
	public List<String> getKeywordList(String keyword,char split,int min)//取得每行关键词那一列中的关键词
	{
		int s = 0;
		int e =0;
		List<String>  wList = new ArrayList<String>();
		while(true)
		{
			e = keyword.indexOf(';',s);
			
			if(e==-1)
				break;
			if(min!=0)//不为0   选分词中字数不小于min的关键词
			{
				if(keyword.substring(s,e).trim().length()<min)
				{
					s = e+1;
					continue;
				}
			}
			wList.add(keyword.substring(s,e).trim());
			s=e+1;
		}
		return wList;
	}
	
	

}
