
package com.douya.controller.report;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;

import com.douya.common.BaseController;



public class ReportFansController extends BaseController {

	@Override
	protected ModelAndView defaultHandler(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelAndView mv =  new ModelAndView("report/reportFans");
		return mv;
	}
	
	public ModelAndView  searchGrid(HttpServletRequest request, HttpServletResponse response)throws Exception {return null;}
	public ModelAndView getdata(HttpServletRequest request,
			HttpServletResponse response) throws Exception {return null;}
	
	public ModelAndView getdatabyparams(HttpServletRequest request,
			HttpServletResponse response) throws Exception {return null;}
}
