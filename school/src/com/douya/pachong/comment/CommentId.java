package com.douya.pachong.comment;

import net.sf.json.JSONObject;


public class CommentId {

	private String content; //
	
	private String id; //

	public CommentId(String mm) {

		JSONObject tt = JSONObject.fromObject(mm);
		JSONObject hh1s = tt;
		if (tt.containsKey("data")) {
			hh1s = JSONObject.fromObject(tt.getString("data"));
		}

		if (!hh1s.isNullObject()) {
			if (hh1s.containsKey("content")) {
				this.content = hh1s.getString("content");
			}
			if (hh1s.containsKey("id")) {
				this.id = hh1s.getString("id");
			}
		}
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
}
