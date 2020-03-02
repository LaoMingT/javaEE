
package com.douya.entity;

import java.util.List;

/**
 * @date 2012-12-2
 * @author 
 * 
 */
public class ModelList {
	private String key;
	private String name;
	private List<Model> list;
	private List<ModelList> mlist;

	public ModelList(String key, String name) {
		this.key = key;
		this.name = name;
	}

	public ModelList(String key, String name, List<Model> list) {
		this.key = key;
		this.name = name;
		this.list = list;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Model> getList() {
		return list;
	}

	public void setList(List<Model> list) {
		this.list = list;
	}

	public List<ModelList> getMlist() {
		return mlist;
	}

	public void setMlist(List<ModelList> mlist) {
		this.mlist = mlist;
	}

}
