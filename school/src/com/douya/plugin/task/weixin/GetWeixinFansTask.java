package com.douya.plugin.task.weixin;


import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.apache.log4j.Logger;

import com.douya.common.hessian.MCCBusinessHessianHelper;

import com.douya.weixin.serviceImpl.WeixinServiceInterfaceImpl;
import com.sedion.advanced.model.PersonalInf;
import com.sedion.advanced.model.WeixinUserList;



/**
 * 
 * @author Jack
 * 
 *        
 */
public class GetWeixinFansTask implements Runnable {
	private static Logger logger = Logger.getLogger(GetWeixinFansTask.class);

	public GetWeixinFansTask() {

	}

	public void run() {}

	

	public static void main(String[] args) {

		GetWeixinFansTask task = new GetWeixinFansTask();

		task.run();

	}

}
