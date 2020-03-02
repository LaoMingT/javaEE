package com.douya.weixin.serviceImpl;

import java.util.ArrayList;
import java.util.List;

import com.sedion.advanced.model.Article;
import com.sedion.advanced.model.WeixinMedia;

public class test {

	
	public static void main(String[] args) {
		
		WeixinServiceInterfaceImpl ws = new WeixinServiceInterfaceImpl(
				"wxc3e62a071621f2e5", "7fe2dd2f993ee46a1ce16d01b94a818e");
		
		String token = ws.getToken();

		System.setProperty ("jsse.enableSNIExtension", "false");
        
		//WeixinMedia wm=	ws.uploadMedia(token, "image", "");
		
		List<Article> articleList =new ArrayList<Article>();
		Article art=new Article();
		art.setPicurl("http://pic.4j4j.cn/upload/pic/20131119/1168c654aa.jpg");
		art.setDescription("大美女哦");
		art.setTitle("好漂亮");
		art.setUrl("");
		articleList.add(art);
		Article art1=new Article();
		art1.setPicurl("http://image.s1979.com/allimg/130531/458-130531163215.jpg");
		art1.setDescription("好多");
		art1.setTitle("好多美女");
		art1.setUrl("http://image.s1979.com/allimg/130531/458-130531163215.jpg");
		articleList.add(art1);
		Article art2=new Article();
		art2.setPicurl("http://image.s1979.com/allimg/130531/458-130531163215.jpg");
		art2.setDescription("好多");
		art2.setTitle("好多美女");
		art2.setUrl("http://image.s1979.com/allimg/130531/458-130531163215.jpg");
		articleList.add(art2);
		Article art3=new Article();
		art3.setPicurl("http://image.s1979.com/allimg/130531/458-130531163215.jpg");
		art3.setDescription("好多");
		art3.setTitle("好多美女");
		art3.setUrl("http://image.s1979.com/allimg/130531/458-130531163215.jpg");
		articleList.add(art3);
		Article art4=new Article();
		art4.setPicurl("http://image.s1979.com/allimg/130531/458-130531163215.jpg");
		art4.setDescription("好多");
		art4.setTitle("好多美女");
		art4.setUrl("http://image.s1979.com/allimg/130531/458-130531163215.jpg");
		articleList.add(art4);
		Article art5=new Article();
		art5.setPicurl("http://image.s1979.com/allimg/130531/458-130531163215.jpg");
		art5.setDescription("好多");
		art5.setTitle("好多美女");
		art5.setUrl("http://image.s1979.com/allimg/130531/458-130531163215.jpg");
		articleList.add(art5);
		//ws.sendNewsCustomMessage(token, "oOagquP5ydtGo7YsSKOAPjg7U_jk", articleList);
		//ws.sendImageMessage(token, "oOagquP5ydtGo7YsSKOAPjg7U_jk", wm.getMediaId());
		
		//System.out.println(wm.getMediaId());
		
		List<String>  list =ws.getTitleSplitWord("……我就只想当一个九十几斤刚刚好、浅薄无知、长得好看又有钱的傻逼而已~ 偷来的说说，觉得很有道理。还手则友尽。仰天大笑出门去，我辈岂是蓬蒿人");
	
	    for(String t:list){
	    	System.out.println(t);
	    }
	}
}
