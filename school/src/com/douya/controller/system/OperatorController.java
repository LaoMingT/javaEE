
package com.douya.controller.system;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;

import com.douya.common.BaseController;



public class OperatorController extends BaseController {

	@Override
	protected ModelAndView defaultHandler(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelAndView mv =  new ModelAndView("system/operator");
		return mv;
	}
	
	public ModelAndView  searchGrid(HttpServletRequest request, HttpServletResponse response)throws Exception {return null;}
	
	public ModelAndView editUserStaff(HttpServletRequest request,
			HttpServletResponse response) throws Exception {return null;}
	
	public ModelAndView delOper(HttpServletRequest request, HttpServletResponse response) throws Exception {return null;}
	
}
