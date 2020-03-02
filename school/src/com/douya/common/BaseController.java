
package com.douya.common;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.douya.common.utils.ServletUtils;
import com.douya.property.ErrorCodeUtil;



public abstract class BaseController extends MultiActionController {
	
	@Override
	protected ModelAndView handleRequestInternal(HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			// request.setAttribute(Global.ATTR_SYSTEM_DATE, new Date());
			//OperatorDTO opdto = getOperatorDTO(request);
			ModelAndView modelAndView = null;
			//if (opdto == null && !request.getRequestURI().contains("home")) {
				modelAndView = new ModelAndView(Global.SESSION_LOGIN_URL);
			//}
			//else {
				this.setSessionObject(request, response);
				String method = ServletUtils.getStringParameter(request, "method", "defaultHandler");
				Class<?>[] argTypes = new Class[] { HttpServletRequest.class, HttpServletResponse.class };
				modelAndView = (ModelAndView) this.getClass().getMethod(method, argTypes).invoke(this, request, response);
			//}
			
			return modelAndView;
		}
		catch (Exception e) {
			this.setSessionObject(request, response);
			return this.defaultHandler(request, response);
		}
	}
	
	private void setSessionObject(HttpServletRequest request, HttpServletResponse response) {
		request.getSession().setAttribute(Global.SESSION_USER, request.getSession().getAttribute(Global.SESSION_USER));
		request.getSession().setAttribute(Global.SESSION_ACCOUNT, request.getSession().getAttribute(Global.SESSION_ACCOUNT));
		request.getSession().setAttribute(Global.SESSION_BRAND, request.getSession().getAttribute(Global.SESSION_BRAND));
		request.getSession().setAttribute(Global.SESSION_PLATFORM, request.getSession().getAttribute(Global.SESSION_PLATFORM));
		request.getSession().setAttribute(Global.SESSION_DEPARTMENT, request.getSession().getAttribute(Global.SESSION_DEPARTMENT));
		request.getSession().setAttribute(Global.SESS_JSON_ACTION_PRIVILEGE, request.getSession().getAttribute(Global.SESS_JSON_ACTION_PRIVILEGE));
		
	}
	
	/**
	 * 页面权限
	 * 
	 * @author 王彬 @2013-1-14
	 * @param request
	 * @return
	 */
	protected Map<String, Boolean> getModleRole(HttpServletRequest request) {
		Map<String, Boolean> list = new HashMap<String, Boolean>();
		String key = ServletRequestUtils.getStringParameter(request, "key", "");
		@SuppressWarnings("unchecked")
		Map<String, Map<String, Boolean>> map = (Map<String, Map<String, Boolean>>) request.getSession().getAttribute(Global.SESS_JSON_ACTION_PRIVILEGE);
		if (null != map && map.containsKey(key)) {
			list = map.get(key);
		}
		return list;
		
	}
	
	/**
	 * 系统错误码
	 * 
	 * @author 王彬 @2013-1-14
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	protected Map<String, String> getErrorCode(HttpServletRequest request) {
		Map<String, String> errorCode = new HashMap<String, String>();
		Set<String> set = (Set<String>) ErrorCodeUtil.keySet();
		for (String key1 : set) {
			// System.out.println);
			String code = "";
			if (key1.contains("sina")) {
				code = key1.replaceAll("sina", "1");
			}
			else if (key1.contains("tencent")) {
				code = key1.replaceAll("tencent", "2");
			}
			
			errorCode.put(code, ErrorCodeUtil.getProperty(key1));
		}
		return errorCode;
	}
	
	/**
	 * 系统缓存
	 * 
	 * @author 王彬 @2013-1-14
	 * @param request
	 * @return
	 */
	
	
	
	protected abstract ModelAndView defaultHandler(HttpServletRequest request, HttpServletResponse response) throws Exception;
}
