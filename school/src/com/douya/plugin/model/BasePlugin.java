package com.douya.plugin.model;



import java.util.HashMap;

public abstract class BasePlugin implements IPlugin {

	protected String name = "";
	protected HashMap<String, Thread> threadPool;
	protected IPluginManager pluginManager;


	public BasePlugin() {
		
		this.threadPool = new HashMap<String, Thread>();

	}


	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	




	public IPluginManager getPluginManager() {
		return this.pluginManager;
	}

	public void setPluginManager(IPluginManager pluginManager) {
		this.pluginManager = pluginManager;
	}

	public HashMap<String, Thread> getThreadPool() {
		return this.threadPool;
	}

	public abstract void LoadFninsh();

	public abstract void Refresh();

}