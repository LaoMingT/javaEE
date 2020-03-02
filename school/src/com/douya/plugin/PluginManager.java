package com.douya.plugin;

import java.util.HashMap;
import java.util.List;

import org.apache.log4j.Logger;

import com.douya.plugin.allaction.PachongPlugin;
import com.douya.plugin.model.IPlugin;
import com.douya.plugin.model.IPluginManager;
import com.douya.plugin.task.PluginTask;



public class PluginManager implements IPluginManager {
	private static Logger logger = Logger.getLogger(PluginManager.class);
	protected HashMap<String, IPlugin> plugins;
	
	private PluginManager() {
		this.plugins = new HashMap<String, IPlugin>();
	}

	private static PluginManager m_instance = null;

	private final Object locker = new Object();

	public static PluginManager instance() {
		if (m_instance == null) {
			synchronized (PluginManager.class) {
				if (m_instance == null) {
					m_instance = new PluginManager();
					m_instance.init();
				}
			}
		}
		return m_instance;
	}

	private Thread pluginThread;

	private long now = 0;
	
	public HashMap<String, IPlugin> getPlugins() {
		return this.plugins;
	}

	private void init() {
		logger.info("Now init PluginManager .....");
		this.LoadPlugin();
		this.pluginThread = new Thread(new PluginTask());
		this.pluginThread.setName("pluginThread");
	
	}
	public IPlugin getPlugin(String key) {
		if (this.getPlugins().containsKey("pachong")) {
           
		} else {
			PachongPlugin pachongPlugin = new PachongPlugin();
			this.AddPlugin(pachongPlugin);
		}
		return this.getPlugins().get(key);
	}
	
	public void AddPlugin(IPlugin plugin) {
		if (plugin != null) {
			if (this.getPlugins().containsKey(plugin.getName())) {

			} else {
				this.getPlugins().put(plugin.getName(), plugin);
			}
		} else {
			throw new NullPointerException("you can't add null plugin!");
		}
	}

	public void RunPluginJob() {
		synchronized (this.locker) {
			if (this.pluginThread.isAlive()) {

			} else {
				this.pluginThread.start();
			}
		}
	}

	public void RunCheckPluginJob() {
		synchronized (this.locker) {
			System.out.println("最近一次刷新时间:" + this.getNow());
		}
	}
	
	private void LoadPlugin() {
		IPlugin iplugin  = this.getPlugin("pachong");
	}

	public void Refresh() {
				for (IPlugin pluin : this.getPlugins().values()) {
					if (this.getNow() < 1) {
						pluin.LoadFninsh();
					} else {
						pluin.Refresh();
					}
				}
		//		if (this.getNow() < 1) {
		//			this.getEmailManage().LoadFninsh();
		//		} else {
		//			this.getEmailManage().Refresh();
		//		}
		//		if (this.getNow() < 1) {
		//			this.getReportManage().LoadFninsh();
		//		} else {
		//			this.getReportManage().Refresh();
		//		}
		//		if (this.getNow() < 1) {
		//			this.getBusinessManage().LoadFninsh();
		//		} else {
		//			this.getBusinessManage().Refresh();
		//		}
		//		if (this.getNow() < 1) {
		//			this.getDistributionManage().LoadFninsh();
		//		} else {
		//			this.getDistributionManage().Refresh();
		//		}
		//		if (this.getNow() < 1) {
		//			this.getWeiboWarningManage().LoadFninsh();
		//		} else {
		//			this.getWeiboWarningManage().Refresh();
		//		}
		this.setNow(System.currentTimeMillis());
	}

	public long getNow() {
		return this.now;
	}

	private void setNow(long now) {
		this.now = now;
	}



}
