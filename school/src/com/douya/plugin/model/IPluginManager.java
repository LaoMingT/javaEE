package com.douya.plugin.model;

import java.util.HashMap;

public interface IPluginManager {
	void AddPlugin(IPlugin plugin);

	void RunPluginJob();

	void RunCheckPluginJob();

	void Refresh();
}
