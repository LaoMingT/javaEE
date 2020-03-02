
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



public class FansChatRecordController extends BaseController {

	@Override
	protected ModelAndView defaultHandler(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelAndView mv =  new ModelAndView("fansMsg/fansChatRecord");
		return mv;
	}
	
/*	public ModelAndView  searchGrid(HttpServletRequest request, HttpServletResponse response)throws Exception {
		
		   int start = ServletRequestUtils.getIntParameter(request, "start");
		   int limit = ServletRequestUtils.getIntParameter(request, "limit", 20);
		   String dir = ServletRequestUtils.getStringParameter(request, "dir", "asc");
		   String sort = ServletRequestUtils.getStringParameter(request, "sort", "insertTime");
		
		   FansDTO dto=new FansDTO();

		   QueryModel<FansDTO> qm = new QueryModel<FansDTO>(dto, start, limit, sort, dir);
		
		   PageModel<FansDTO>   pm= MCCBusinessHessianHelper.getRemoteBusinesService().getFansList(qm);
		   
		   String json = JsonUtils.convertToStringForStore(pm.getTotalCount(), pm.getDataList(), FansDTO.class);
		   System.out.println(json);
		   pm.setDataJson(json.toString());
		   JsonUtils.writeToPage(response, pm);
	       return null;
	}*/
	
	public ModelAndView searchGrid(HttpServletRequest request,
			HttpServletResponse response) throws Exception {return null;}

	
}
