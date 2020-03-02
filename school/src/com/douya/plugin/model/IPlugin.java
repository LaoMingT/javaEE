package com.douya.plugin.model;

import java.util.HashMap;

public interface IPlugin {
	String getName();


	IPluginManager getPluginManager();

	void setPluginManager(IPluginManager pluginManager);

	HashMap<String, Thread> getThreadPool();

	void LoadFninsh();

	void Refresh();

}
