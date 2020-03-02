package com.douya.plugin.task.weixin;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.apache.log4j.Logger;

import com.douya.common.hessian.MCCBusinessHessianHelper;

import com.douya.weixin.serviceImpl.WeixinServiceInterfaceImpl;
import com.sedion.advanced.model.PersonalInf;
import com.sedion.advanced.model.WeixinGroup;
import com.sedion.advanced.model.WeixinUserList;

/**
 * 
 * @author Jack
 * 
 *         获取@我的微博
 */
public class GetWeixinGroupTask implements Runnable {
	private static Logger logger = Logger.getLogger(GetWeixinFansTask.class);

	public GetWeixinGroupTask() {

	}

	public void run() {}

	public static void main(String[] args) {

		GetWeixinGroupTask task = new GetWeixinGroupTask();

		task.run();

	}

}
