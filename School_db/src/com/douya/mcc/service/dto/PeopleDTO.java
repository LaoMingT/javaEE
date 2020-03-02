package com.douya.mcc.service.dto;

import java.util.Date;

/**

* <p>Title: FansDTO.java</p>

* <p>Description: </p>

* <p>Copyright: Copyright (c) 2014</p>

* <p>Company: 豆芽科技</p>

* @author wangmingbo

* @date 2014-6-19

* @version 1.0

*/

@SuppressWarnings("serial")
public class PeopleDTO extends BasicEntityDTO {

	private String tpname;

	public String getTpname() {
		return tpname;
	}

	public void setTpname(String tpname) {
		this.tpname = tpname;
	}
	
}
