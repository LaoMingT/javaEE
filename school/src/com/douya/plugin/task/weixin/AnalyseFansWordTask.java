package com.douya.plugin.task.weixin;

import java.util.List;

import org.apache.log4j.Logger;

import com.douya.common.QueryModel;
import com.douya.common.hessian.MCCBusinessHessianHelper;
import com.douya.common.utils.SplitWordUtil;


/**
 * 
 * @author Jack
 * 
 *         获取@我的微博
 */
public class AnalyseFansWordTask implements Runnable {
	private static Logger logger = Logger.getLogger(AnalyseFansWordTask.class);

	public AnalyseFansWordTask() {

	}

	public void run() {}

	public static void main(String[] args) {

		AnalyseFansWordTask task = new AnalyseFansWordTask();

		task.run();

	}

}
