package com.douya.weixin.service;

import java.util.List;

import com.sedion.advanced.model.Article;
import com.sedion.advanced.model.Music;
import com.sedion.advanced.model.PersonalInf;
import com.sedion.advanced.model.WeixinGroup;
import com.sedion.advanced.model.WeixinMedia;
import com.sedion.advanced.model.WeixinOauth2Token;
import com.sedion.advanced.model.WeixinQRCode;
import com.sedion.advanced.model.WeixinUserList;
import com.sedion.menu.model.Menu;


/**
 * 定义微信功能接口  通过调用api实现
 * @author szd1007  20140617 www.douyakeji.com
 *  
 */
public interface WeixinServiceInterface 
{
 
  public String getToken();//获取token
  //自定义菜单创建接口
  public boolean createMenu(Menu menu,String accessToken);//创建菜单
  public boolean createMenu(String  menuTxt,String accessToken);//创建菜单

  public String getMenu(String accessToken);//查询菜单
  public boolean deleteMenu(String accessToken);//删除菜单
  //用户操作
  public WeixinUserList getweixinuserList(String accessToken,String nextOpenId);//获取用户列表
  public PersonalInf getPersonInfo(String accessToken,String openId);//获取用户基本信息
  public int getGroupId(String accessToken,String openId);//获取用户所在分组
  //用户组操作
  public List<WeixinGroup>getGroupsList(String accessToken);//获取用户分组
  public WeixinGroup createGroup(String accessToken,String groupName);//创建用户分组
  public boolean updateGroup(String accessToken,int groupId,String groupName);//修改分组名
  public boolean removeMemberGroups(String accessToken,String openId,int groupId) ;//移动用户分组
  
  //客服接口   
    //发送自定义消息  文本  图片   。。
  public boolean sendTxtMessage(String accessToken,String openId,String content);//发送文本消息
  public boolean sendImageMessage(String accessToken,String openId,String mediaId);//发送图片消息
  public boolean sendVoiceMessage(String accessToken,String openId,String mediaId);//发送语音消息
  public boolean sendVideoMessage(String accessToken,String openId,String mediaId,String title,String description);//发送视频消息
  public boolean sendMusicMessage(String accessToken,String openId,Music music);//发送音乐消息
  public boolean sendNewsCustomMessage(String accessToken,String openId,List<Article> articleList);//发送图文消息

  //生成带参数二维码
  /**
	 * 创建临时带参数二维码
	 *
	 * @param accessToken 接口访问凭证
	 * @param expireSeconds 二维码的有效时间，以秒为单位，最大不超过1800秒
	 * @param sceneId 场景值ID，临时二维码时为32位非0整型，永久二维码时最大值为100000（目前参数只支持1--100000）
	 * @return WeixinQRCode
	 */
  public  WeixinQRCode createTemporaryQRCode(String accessToken,int expireSeconds,int sceneId);
  /**
	 * 创建永久带参数二维码
	 *
	 * @param accessToken 接口访问凭证
	 * @param sceneId 场景值ID，临时二维码时为32位非0整型，永久二维码时最大值为100000（目前参数只支持1--100000）
	 * @return String
	 */
  public  String createPermanentQRCode(String accessToken,int sceneId);
  
  
  //上传下载多媒体文件
  /**
	 * 上传多媒体文件
	 * 
	 * @param accessToken 调用接口凭证
	 * @param type 媒体文件类型，分别有图片（image）、语音（voice）、视频（video）和缩略图（thumb）
	 * @param mediaFileUrl 媒体文件url(如：localhost:8080/test/upload/music.mp3)
	 * @return WeixinMedia
	 */
	public WeixinMedia uploadMedia(String accessToken,
			String type,String mediaFileUrl);
	/**
	 * 下载多媒体文件
	 * 
	 * @param accessToken 调用接口凭证
	 * @param mediaId 媒体文件ID
	 * @param savePath 保存路径
	 * @return String 保存文件路径
	 */
	public  String getMedia(String accessToken,String mediaId,String savePath) ;
  
	
	
	//oAuth2.0网页授权接口
	/**
	 * 1.通过code换取网页授权access_token
	 * 
	 * @param appId  公众号的唯一标识
	 * @param appSecret 公众号的appsecret
	 * @param code 填写第一步获取的code参数
	 * @return WeixinOauth2Token
	 */
	public WeixinOauth2Token getOauth2AccessToken(String appId,
			String appSecret,String code);
	/**
	 * 2.刷新access_token
	 * 
	 * @param appId 公众号的唯一标识 
	 * @param refreshToken 通过access_token获取到的refresh_token参数 
	 * @return
	 */
	public WeixinOauth2Token refreshOauth2Token(String appId,
			String refreshToken);
	
	
	
	
	
	
	
	
	//用户分词
	public List<String> getTitleSplitWord(String setence);//luence 分词
  
}
