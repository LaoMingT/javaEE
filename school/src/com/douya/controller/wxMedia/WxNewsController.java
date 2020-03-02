
package com.douya.controller.wxMedia;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;

import com.douya.common.BaseController;



public class WxNewsController extends BaseController {

	@Override
	protected ModelAndView defaultHandler(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelAndView mv =  new ModelAndView("wxMedia/wxNews");
		return mv;
	}
	
	public ModelAndView  searchGrid(HttpServletRequest request, HttpServletResponse response)throws Exception {return null;}
	public ModelAndView addNews(HttpServletRequest request,
			HttpServletResponse response) throws Exception {return null;}
	
}
