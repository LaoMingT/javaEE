
package com.douya.controller.fansMsg;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.servlet.ModelAndView;

import com.douya.common.BaseController;
import com.douya.common.PageModel;
import com.douya.common.QueryModel;
import com.douya.common.hessian.MCCBusinessHessianHelper;
import com.douya.common.json.JsonUtils;
import com.douya.weixin.serviceImpl.WeixinServiceInterfaceImpl;




public class FansBehaviorController extends BaseController {

	@Override
	protected ModelAndView defaultHandler(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelAndView mv =  new ModelAndView("fansMsg/fansBehavior");
		return mv;
	}
	
	public ModelAndView  searchGrid(HttpServletRequest request, HttpServletResponse response)throws Exception {

	       return null;
	}
	
	public ModelAndView getChatRecordList(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		return null;
	}
	
	public ModelAndView sendChatMsg(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String msg = "{success:true}";
		String UserOpenId = ServletRequestUtils.getStringParameter(request,
				"openid", "");
		String chatmessage = ServletRequestUtils.getStringParameter(request,
				"content", "");
		WeixinServiceInterfaceImpl ws = new WeixinServiceInterfaceImpl(
				"wxc3e62a071621f2e5", "7fe2dd2f993ee46a1ce16d01b94a818e");
		String token = ws.getToken();
		boolean  is_success=ws.sendTxtMessage(token, UserOpenId, chatmessage);
		if(is_success){
			 msg = "{success:true}";
		}else{
			msg = "{success:false}";
		}
		response.getWriter().append(msg);
		return null;
	}
	
	
}
