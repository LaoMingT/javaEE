/**
 * <pre>
 * 豆芽工作室
 * Copyright (C): 2012
 * 
 * 
 * 文件描述: 
 * 业务管理 接口
 * 
 * Notes:
 * 修改历史(作者/日期/改动描述):
 * /2012-11-1/初始化版本。
 * </pre>
 */
package com.douya.mcc.service;

import com.douya.mcc.service.dto.PeopleDTO;

/**
 * @date 2012-11-1
 * @author 
 * 
 */
public interface MccRemoteBusinesService {
	

	public  PeopleDTO  getN(String account);
	
	
	
}
