
package com.douya.mcc.model;



import javax.persistence.Entity;
import javax.persistence.Table;


/**

* <p>Title: Fans.java</p>

* <p>Description: </p>

* <p>Copyright: Copyright (c) 2014</p>

* <p>Company: 豆芽科技</p>

* @author wangmingbo

* @date 2014-6-19

* @version 1.0

*/

@SuppressWarnings("serial")
@Entity
@Table(name = "people")
public class People extends BasicEntity {

	private String tpname;

	public String getTpname() {
		return tpname;
	}

	public void setTpname(String tpname) {
		this.tpname = tpname;
	}
	
	
}
