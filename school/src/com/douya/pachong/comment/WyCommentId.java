package com.douya.pachong.comment;

import net.sf.json.JSONObject;

public class WyCommentId {
	
	private String f;
	private String d;
	private String b;
	private String n;
	private String a;
	private String t;
	private String userId;
	
	

	public WyCommentId(String str,String data) {

		try {
			JSONObject jsonObj = JSONObject.fromObject(str);
			if (!jsonObj.isNullObject()) {

				if (jsonObj.containsKey(data)) {

					JSONObject HH = JSONObject.fromObject(jsonObj
							.getString(data));
					if (!HH.isNullObject()) {

						if (HH.containsKey("f")) {
							this.f =HH.getString("f");
						}
						if (HH.containsKey("d")) {
							this.d =HH.getString("d");
						}
						if (HH.containsKey("b")) {
							this.b =HH.getString("b");
						}
						if (HH.containsKey("n")) {
							this.n =HH.getString("n");
						}
						if (HH.containsKey("a")) {
							this.a =HH.getString("a");
						}
						if (HH.containsKey("t")) {
							this.t =HH.getString("t");
						}
					}
				}
			}
		} catch (Exception e) {
			this.b="";
		}

	}

	

	public String getF() {
		return f;
	}

	public void setF(String f) {
		this.f = f;
	}

	public String getD() {
		return d;
	}

	public void setD(String d) {
		this.d = d;
	}

	public String getB() {
		return b;
	}

	public void setB(String b) {
		this.b = b;
	}

	public String getN() {
		return n;
	}

	public void setN(String n) {
		this.n = n;
	}

	public String getA() {
		return a;
	}

	public void setA(String a) {
		this.a = a;
	}

	public String getT() {
		return t;
	}

	public void setT(String t) {
		this.t = t;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	

}
