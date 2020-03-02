package com.douya.plugin.allaction;

import com.douya.plugin.model.BasePlugin;
import com.douya.plugin.task.alibaba.GetAlibabaMessageTask;
import com.douya.plugin.task.taobao.GetTaobaoMessageTask;
import com.douya.plugin.task.weixin.GetWeixinFansTask;
import com.douya.plugin.task.weixin.GetWeixinGroupTask;



public class PachongPlugin extends BasePlugin {
	public PachongPlugin() {
		super();
		this.setName("pachong");
	}

	@Override
	public void LoadFninsh() {
		
		Thread thread = null;
		thread = new Thread(new GetAlibabaMessageTask());
		thread.setName("GetAlibabaMessageTask");
		//this.getThreadPool().put(thread.getName(), thread);
	
		thread = new Thread(new GetTaobaoMessageTask());
		thread.setName("GetTaobaoMessageTask");
	//	this.getThreadPool().put(thread.getName(), thread);

		thread = new Thread(new GetWeixinGroupTask());
		thread.setName("GetWeixinGroupTask");
		this.getThreadPool().put(thread.getName(), thread);
		
		thread = new Thread(new GetWeixinFansTask());
		thread.setName("GetWeixinFansTask");
		this.getThreadPool().put(thread.getName(), thread);
		
		
		for (Thread model : this.getThreadPool().values()) {
				model.start();
		}

	}

	@Override
	public void Refresh() {

	}
}
