
package com.douya.controller.fansMsg;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;

import com.douya.common.BaseController;



public class FansMessageController extends BaseController {

	@Override
	protected ModelAndView defaultHandler(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelAndView mv =  new ModelAndView("fansMsg/fansMessage");
		return mv;
	}
	
	public ModelAndView  searchGrid(HttpServletRequest request, HttpServletResponse response)throws Exception {return null;}
	
	public ModelAndView getChatRecordList(HttpServletRequest request,
			HttpServletResponse response) throws Exception {return null;}
	
	public ModelAndView sendChatMsg(HttpServletRequest request,
			HttpServletResponse response) throws Exception {return null;}
	public ModelAndView updateFans(HttpServletRequest request,
			HttpServletResponse response) throws Exception {return null;}
	
	public ModelAndView sendNews(HttpServletRequest request,
			HttpServletResponse response) throws Exception {return null;}
	public ModelAndView  searchGridWord(HttpServletRequest request, HttpServletResponse response)throws Exception {return null;}
	
	
}
