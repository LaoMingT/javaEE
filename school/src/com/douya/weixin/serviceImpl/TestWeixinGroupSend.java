package com.douya.weixin.serviceImpl;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import org.junit.Test;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class TestWeixinGroupSend {

    
    public String getAccess_token(String appid,String secret){
        String access_token=null;
        StringBuffer action =new StringBuffer();
        action.append("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential")
        .append("&appid="+appid)
        .append("&secret="+secret);
         
        URL url;
        try {
            url = new URL(action.toString());
            HttpURLConnection http = (HttpURLConnection) url.openConnection();        
            http.setRequestMethod("GET");        
            http.setRequestProperty("Content-Type","application/x-www-form-urlencoded");    
            http.setDoInput(true);
            InputStream is =http.getInputStream();
            int size =is.available();
            byte[] buf=new byte[size];
            is.read(buf);
            String resp =new String(buf,"UTF-8");
            JSONObject jsonObject =JSONObject.fromObject(resp);
            System.out.println("access_token:"+jsonObject.toString());
            Object object =jsonObject.get("access_token");
            if(object !=null){
                  access_token =String.valueOf(object);
            }
             return access_token;
        } catch (MalformedURLException e) {
            e.printStackTrace();
             return access_token;
             
        } catch (IOException e) {
            e.printStackTrace();
             return access_token;
         
        }
        
    } 
    
    public  JSONArray  getOpenids(String appid,String secret,String token){
        JSONArray array =null;
        String urlstr ="https://api.weixin.qq.com/cgi-bin/user/get?access_token=ACCESS_TOKEN&next_openid=NEXT_OPENID";
        urlstr =urlstr.replace("ACCESS_TOKEN", token);
        urlstr =urlstr.replace("NEXT_OPENID", "");
        URL url;
        try {
            url = new URL(urlstr);
            HttpURLConnection http = (HttpURLConnection) url.openConnection();        
            http.setRequestMethod("GET");        
            http.setRequestProperty("Content-Type","application/x-www-form-urlencoded");    
            http.setDoInput(true);
            InputStream is =http.getInputStream();
            int size =is.available();
            byte[] buf=new byte[size];
            is.read(buf);
            String resp =new String(buf,"UTF-8");
            JSONObject jsonObject =JSONObject.fromObject(resp);
            System.out.println("resp:"+jsonObject.toString());
            array =jsonObject.getJSONObject("data").getJSONArray("openid");
            return array;
        } catch (MalformedURLException e) {
            e.printStackTrace();
             return array;
             
        } catch (IOException e) {
            e.printStackTrace();
             return array;
         
        }
    }
    @Test
    public void testsendTextByOpenids(String appid,String secret,String token){
        String urlstr ="https://api.weixin.qq.com/cgi-bin/message/mass/send?access_token=ACCESS_TOKEN";
        urlstr =urlstr.replace("ACCESS_TOKEN",token);
        String reqjson =createGroupText(getOpenids(appid,secret,token));
        try {
             
            URL httpclient =new URL(urlstr);
            HttpURLConnection conn =(HttpURLConnection) httpclient.openConnection();
            conn.setConnectTimeout(5000);
            conn.setReadTimeout(2000);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type","application/x-www-form-urlencoded");    
            conn.setDoOutput(true);        
            conn.setDoInput(true);
            conn.connect();
            OutputStream os= conn.getOutputStream();    
            System.out.println("req:"+reqjson);
            os.write(reqjson.getBytes("UTF-8"));//传入参数    
            os.flush();
            os.close();
            
            InputStream is =conn.getInputStream();
            int size =is.available();
            byte[] jsonBytes =new byte[size];
            is.read(jsonBytes);
            String message=new String(jsonBytes,"UTF-8");
            System.out.println("resp:"+message);
         
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } 
    }
    
    private String createGroupText(JSONArray array){
         JSONObject gjson =new JSONObject();
         gjson.put("touser", array);
         gjson.put("msgtype", "text");
         JSONObject text =new JSONObject();
         text.put("content", "你好");
         gjson.put("text", text);
        return gjson.toString();
    }
    
    public static void main(String[] args) {
		
    	
    	TestWeixinGroupSend ts=new TestWeixinGroupSend();
    	String appid="wxc3e62a071621f2e5";
    	String sercet="7fe2dd2f993ee46a1ce16d01b94a818e";
    	String token=ts.getAccess_token(appid,sercet);
    
    	ts.testsendTextByOpenids(appid, sercet,token);
    	
	}
}

