
package com.douya.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.servlet.ModelAndView;

import com.douya.common.BaseController;
import com.douya.common.Global;
import com.douya.common.PageModel;
import com.douya.common.hessian.MCCBusinessHessianHelper;
import com.douya.common.json.ExtTreeNode;
import com.douya.common.json.JsonUtils;
import com.douya.common.utils.ServletUtils;
import com.douya.common.utils.StringHelper;
import com.douya.entity.Module;
import com.douya.mcc.service.dto.PeopleDTO;




public class HomeController extends BaseController {
	
	/**
	 * 做用户登录操作 跳转到主页
	 * 
	 * @author 
	 * @2012-04-12
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@Override
	protected ModelAndView defaultHandler(HttpServletRequest request,
		   HttpServletResponse response) throws Exception {
		
       System.out.println("fangwen1");
       PeopleDTO p= MCCBusinessHessianHelper.getRemoteBusinesService().getN("1");
       
       System.out.println(p.getTpname());
		return null;
		 
	 }

	
	public ModelAndView offline(HttpServletRequest request,
			HttpServletResponse response) throws Exception {return null;}
	
	
}
