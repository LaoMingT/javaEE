package com.douya.job;

import org.apache.log4j.Logger;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.StatefulJob;
import org.springframework.scheduling.quartz.QuartzJobBean;

import com.douya.plugin.PluginManager;

//

public class PluginJob extends QuartzJobBean implements StatefulJob {
	private static Logger logger = Logger.getLogger(PluginJob.class);

	@Override
	protected void executeInternal(JobExecutionContext arg0) throws JobExecutionException {
		try {
			PluginManager.instance().RunPluginJob();
		} catch (Exception ex) {
			logger.error("PluginJob", ex);
		}
	}
}
