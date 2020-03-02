
package com.douya.common;

import java.util.Collection;

import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.hibernate.criterion.SimpleExpression;

/**

* <p>Title: CriteriaUtil.java</p>

* <p>Description: </p>

* <p>Copyright: Copyright (c) 2014</p>

* <p>Company: 豆芽科技</p>

* @author wangmingbo

* @date 2014-6-19

* @version 1.0

*/

public class CriteriaUtil {
	/**
	 * Restrictions.eq --> equal,等于.
	 * 
	 * @author 王彬 @2013-1-15
	 * @return
	 */
	public static SimpleExpression eq(String key, String equal) {
		SimpleExpression si = null;
		if (StringHelper.checkNull(key) && StringHelper.checkNull(equal)) {
			si = Restrictions.eq(key, equal);
		}
		return si;
		
	}
	
	/**
	 * in-->数组
	 * 
	 * @author 王彬 @2013-1-15
	 * @param key
	 * @param equal
	 * @return
	 */
	public static Criterion inArray(String key, Object[] equal) {
		Criterion cr = null;
		if (StringHelper.checkNull(key) && null != equal) {
			cr = Restrictions.in(key, equal);
		}
		return cr;
	}
	
	@SuppressWarnings("rawtypes")
	public static Criterion inCollection(String key, Collection equal) {
		Criterion cr = null;
		if (StringHelper.checkNull(key) && null != equal) {
			cr = Restrictions.in(key, equal);
		}
		return cr;
	}
}
