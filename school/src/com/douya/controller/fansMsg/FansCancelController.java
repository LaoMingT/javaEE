
package com.douya.controller.fansMsg;

import java.util.Date;
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



public class FansCancelController extends BaseController {

	@Override
	protected ModelAndView defaultHandler(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelAndView mv =  new ModelAndView("fansMsg/fansCancel");
		return mv;
	}
	
	public ModelAndView  searchGrid(HttpServletRequest request, HttpServletResponse response)throws Exception {return null;}
	
}
