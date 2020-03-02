package com.douya.weixin.service;

import java.util.List;

import com.douya.weixin.Fan;

/**
 * 定义微信功能接口  通过模拟登陆实现
 * @author szd1007  20140617 www.douyakeji.com
 *  
 */
public interface WeixinServiceSimulate 
{
 
  public List<Fan>getFans();//获取粉丝列表
  public boolean sendMessage(String fanId,String mes);//给指定用户发送消息

 
  
}
