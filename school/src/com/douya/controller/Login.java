package com.douya.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;

import com.douya.common.BaseController;
import com.douya.common.Global;
import com.douya.common.hessian.MCCBusinessHessianHelper;
import com.douya.mcc.service.dto.PeopleDTO;

/**
 * @date 2010-9-7
 * @author 王帅
 */
public class Login extends BaseController {
	
	@Override
	protected ModelAndView defaultHandler(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelAndView mav = new ModelAndView("login");
		System.out.println("fangwen2");
	       PeopleDTO p= MCCBusinessHessianHelper.getRemoteBusinesService().getN("1");
	       
	       System.out.println(p.getTpname());
		return mav;
	}
	
	public void doLogout(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Global.removeAllSession(request);
		response.sendRedirect(request.getContextPath());
	}
	
}
