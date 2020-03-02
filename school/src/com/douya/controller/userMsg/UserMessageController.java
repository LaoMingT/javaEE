
package com.douya.controller.userMsg;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;

import com.douya.common.BaseController;



public class UserMessageController extends BaseController {

	@Override
	protected ModelAndView defaultHandler(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelAndView mv =  new ModelAndView("userMsg/userMessage");
		return mv;
	}
	
	public ModelAndView  searchGrid(HttpServletRequest request, HttpServletResponse response)throws Exception {return null;}
	
	
}
