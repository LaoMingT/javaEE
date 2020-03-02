
package com.douya.controller.system;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;

import com.douya.common.BaseController;



public class WxAccountController extends BaseController {
	private static Logger logger = Logger.getLogger(WxAccountController.class);

	@Override
	protected ModelAndView defaultHandler(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelAndView mv =  new ModelAndView("system/wxAccount");
		return mv;
	}
	
	public ModelAndView  searchGrid(HttpServletRequest request, HttpServletResponse response)throws Exception {return null;}
	public ModelAndView editWxAccount(HttpServletRequest request,
			HttpServletResponse response) throws Exception {return null;}
	
	public ModelAndView delWxAccount(HttpServletRequest request, HttpServletResponse response) throws Exception {return null;}
	
	public ModelAndView importData(HttpServletRequest request, HttpServletResponse response) throws Exception {return null;}
	

	
	
}
