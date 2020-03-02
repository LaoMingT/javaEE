package com.douya.pachong.comment;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class WyComment {
	private String reqtime = null;
	private JSONArray newPosts = null;
	private int tcount;

	public WyComment(String str) {
		try {
			JSONObject jsonObj = JSONObject.fromObject(str);
			
					if (!jsonObj.isNullObject()) {
						if (jsonObj.containsKey("newPosts")
								&& jsonObj.getJSONArray("newPosts") != null
								&& jsonObj.getString("newPosts") != null) {
							this.newPosts = jsonObj.getJSONArray("newPosts");
						}

						if (jsonObj.containsKey("total")) {
							this.tcount = Integer.valueOf(jsonObj.getString("tcount"));
						}
					}
		}catch (Exception e) {
			this.newPosts=null;
		}
	}

	public JSONArray getNewPosts() {
		return newPosts;
	}

	public void setNewPosts(JSONArray newPosts) {
		this.newPosts = newPosts;
	}


	public String getReqtime() {
		return reqtime;
	}


	public void setReqtime(String reqtime) {
		this.reqtime = reqtime;
	}


	public int getTcount() {
		return tcount;
	}


	public void setTcount(int tcount) {
		this.tcount = tcount;
	}

	

}
