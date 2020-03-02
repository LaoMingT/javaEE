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
 * jack/2012-11-1/初始化版本。
 * </pre>
 */
package com.douya.mcc.service.impl;

import org.apache.log4j.Logger;
import org.dozer.DozerBeanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.douya.mcc.dao.PeopleDAO;
import com.douya.mcc.model.People;
import com.douya.mcc.service.MccRemoteBusinesService;
import com.douya.mcc.service.dto.PeopleDTO;




/**
 * @date 2013-11-1
 * @author jack
 * 
 */
@Service
@Transactional
public class MccRemoteBusinesServiceImpl implements MccRemoteBusinesService {
	private final Logger logger = Logger.getLogger(MccRemoteBusinesServiceImpl.class);
	@Autowired
	DozerBeanMapper dozer;
	@Autowired
	private PeopleDAO peopleDAO;
	@Override
	public PeopleDTO getN(String id) {
		
		PeopleDTO dto = null;
		try {
			People model = peopleDAO.findUniqueBy("pk", id);
			if (model != null) {
				dto = dozer.map(model, PeopleDTO.class);
			}
		}
		catch (Exception e) {
			logger.error("getUserGroupByPk", e);
			e.printStackTrace();
		}
		return dto;
	}
	
	public static void main(String[] args) {
		
		System.out.println("11111111111111111");
		
		MccRemoteBusinesServiceImpl mi=new MccRemoteBusinesServiceImpl();
		
		
		System.out.println(mi.getN("1").getPk());
	}
	
	
	
}
