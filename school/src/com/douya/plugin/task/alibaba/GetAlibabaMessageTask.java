package com.douya.plugin.task.alibaba;

import org.apache.log4j.Logger;



/**
 * 
 * @author Jack
 * 
 *         获取@我的微博
 */
public class GetAlibabaMessageTask implements Runnable {
	private static Logger logger = Logger.getLogger(GetAlibabaMessageTask.class);

	public GetAlibabaMessageTask() {
        
	}

	public void run() {
		logger.info(Thread.currentThread().getName() + " is running!");
		try {
			long startTime = 0;
			while (true) {
				startTime = System.currentTimeMillis();
				try {
					System.out.println("GetAlibabaMessageTask---------------");
				} catch (Exception e) {
					logger.info(e.getMessage(), e);
				}
				logger.warn("当次操作用时：" + 1.0 * (System.currentTimeMillis() - startTime) / 1000);
				Thread.sleep(1000);
			}

		} catch (Exception ex) {
			logger.error(Thread.currentThread().getName() + " is stop!", ex);
		}
	}

	

	public static void main(String[] args) {

		GetAlibabaMessageTask task = new GetAlibabaMessageTask();

		task.run();

	}

}
