package com.douya.pachong.comment;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class MainComment {

	private String data = null;
	private JSONArray commentid = null;
	private int total;

	public MainComment(String str) {

		try {
			JSONObject jsonObj = JSONObject.fromObject(str);
			if (!jsonObj.isNullObject()) {

				if (jsonObj.containsKey("data")) {
					this.data = jsonObj.getString("data");

					JSONObject HH = JSONObject.fromObject(jsonObj
							.getString("data"));
					if (!HH.isNullObject()) {
						if (HH.containsKey("commentid")
								&& HH.getJSONArray("commentid") != null
								&& HH.getString("commentid") != null) {
							this.commentid = HH.getJSONArray("commentid");
						}

						if (HH.containsKey("total")) {
							this.total = Integer.valueOf(HH.getString("total"));
						}
					}
				}
			}
		} catch (Exception e) {
			this.data="";
			this.total=0;
		}

	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public JSONArray getCommentid() {
		return commentid;
	}

	public void setCommentid(JSONArray commentid) {
		this.commentid = commentid;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

}
