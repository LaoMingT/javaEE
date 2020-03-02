package com.douya.weixin.serviceImpl;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.douya.weixin.Fan;
import com.douya.weixin.Weixin;
import com.douya.weixin.service.WeixinServiceSimulate;
/**
 * 微信功能接口的模拟登陆实现
 * @author szd1007  20140617 www.douyakeji.com
 *
 */
public class WeixinServiceSimulateImpl implements WeixinServiceSimulate {

	private Weixin weixin;
	private final static Log log = LogFactory.getLog(WeixinServiceSimulateImpl.class);

	
	
	public WeixinServiceSimulateImpl(String account,String paswd)
	{
		weixin = new Weixin(account,paswd);
	}
	
	public List<Fan> getFans() {
		// TODO Auto-generated method stub
		weixin.getFans();
	    
		return weixin.getWeixinFansList();
	}

	public boolean sendMessage(String fanId,String mes) {
		// TODO Auto-generated method stub

		return weixin.sendMsg(fanId,mes);
		 
	}

	
	public static void main(String[] args) {
	   String account="java_php_wmb@126.com";
	   String paswd="wangmingbo";
	   WeixinServiceSimulate wss = new WeixinServiceSimulateImpl(account, paswd);
	   //获取粉丝列表
//	   for(Fan fan :wss.getFans())
//		   System.out.println("$$"+fan.getId()+":"+fan.getNick_name());
//       
//	   wss.sendMessage(wss.getFans().get(0).getId(),"呵呵hehe");
	}

}
