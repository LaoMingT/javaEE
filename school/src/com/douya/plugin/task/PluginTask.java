package com.douya.plugin.task;

import org.apache.log4j.Logger;

import com.douya.plugin.PluginManager;



public class PluginTask implements Runnable {
	private static Logger logger = Logger.getLogger(PluginTask.class);

	public void run() {
		try {
			logger.info("PluginTask will running after 10 s!");
			Thread.sleep(10 * 1000);
		} catch (InterruptedException e) {

		}
		while (true) {
			try {
				PluginManager.instance().Refresh();
				Thread.sleep(59 * 1000);
			} catch (InterruptedException e) {
				logger.info("PluginTask InterruptedException, Thread is go on!");
			}
		}

	}

}
