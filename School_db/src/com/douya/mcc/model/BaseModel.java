/**

* <p>Title: BaseModel.java</p>

* <p>Description: </p>

* <p>Copyright: Copyright (c) 2014</p>

* <p>Company: 豆芽科技</p>

* @author wangmingbo

* @date 2014-6-17

* @version 1.0

**/

package com.douya.mcc.model;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.MappedSuperclass;

import com.douya.mcc.service.dto.BaseDTO;



@SuppressWarnings("serial")
@MappedSuperclass
public abstract class BaseModel implements Serializable {
	/** 
	 * 根据属性名获取属性值 
	 * */
	public Object getFieldValueByName(String fieldName) {
		Object value = null;
		try {
			value = this
					.getClass()
					.getMethod("get" + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1), new Class[] {})
					.invoke(this, new Object[] {});
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		} catch (SecurityException e) {
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
		}
		return value;
	}

	/** 
	 * 根据属性名设置属性值 
	 * */
	public void setFieldValueByName(String fieldName, Object o) {
		this.setSuperFieldValueByName(fieldName, o, this.getClass());
	}

	private void setSuperFieldValueByName(String fieldName, Object o, Class<?> myclass) {
		if (myclass != BaseModel.class) {
			try {
				this.getClass()
						.getMethod("set" + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1),
								myclass.getDeclaredField(fieldName).getType()).invoke(this, o);
			} catch (IllegalArgumentException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			} catch (SecurityException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			} catch (IllegalAccessException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			} catch (InvocationTargetException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			} catch (NoSuchMethodException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			} catch (NoSuchFieldException e1) {
				this.setSuperFieldValueByName(fieldName, o, myclass.getSuperclass());
			}
		}
	}

	/** 
	 * 获取属性名数组 
	 * */
	public List<String> getFiledName() {
		Class<?> myclass = this.getClass();
		List<String> fieldNames = new ArrayList<String>();
		this.getSuperFiledName(myclass, fieldNames);
		return fieldNames;
	}

	private void getSuperFiledName(Class<?> myclass, List<String> fieldNames) {
		if (myclass != BaseModel.class) {
			Field[] fields = myclass.getDeclaredFields();
			for (Field field : fields) {
				fieldNames.add(field.getName());
			}
			this.getSuperFiledName(myclass.getSuperclass(), fieldNames);
		}
	}

	/** 
	 * 获取属性类型(type)，属性名(name)，属性值(value)的map组成的list 
	 * */
	public List<FiledInfo> getFiledsInfo() {
		Class<?> myclass = this.getClass();
		List<FiledInfo> list = new ArrayList<FiledInfo>();
		this.getSuperFiledsInfo(myclass, list);
		return list;
	}

	private void getSuperFiledsInfo(Class<?> myclass, List<FiledInfo> list) {
		if (myclass != BaseModel.class) {
			Field[] fields = myclass.getDeclaredFields();
			for (Field field : fields) {
				list.add(new FiledInfo(field.getType(), field.getName(), this.getFieldValueByName(field.getName())));
			}
			this.getSuperFiledsInfo(myclass.getSuperclass(), list);
		}
	}

	/** 
	 * 获取对象的所有属性值，返回一个对象数组 
	 * */
	public List<Object> getFiledValues() {
		List<Object> value = new ArrayList<Object>();
		for (String filedName : this.getFiledName()) {
			value.add(this.getFieldValueByName(filedName));
		}
		return value;
	}

	public void UpdateDTO(BaseDTO dto) {
		List<FiledInfo> list = this.getFiledsInfo();
		Object obj = null;
		for (FiledInfo model : list) {
			obj = dto.getFieldValueByName(model.getName());
			if (obj != null) {
				this.UpdateValue(obj, model);
			}
		}
	}

	protected void UpdateValue(Object obj, FiledInfo model) {
		if (model.getValue() instanceof Integer) {
			if ("0".equals(obj.toString()) || obj.toString() == "0") {
				//DTO为0
			} else if (("0".equals(obj.toString()) || obj.toString() == "0")
					&& (!"0".equals(model.getValue()) || model.getValue() != "0")) {
				//DTO为0 && Model不为0
			} else {
				this.setFieldValueByName(model.getName(), obj);
			}
		} else if (model.getValue() instanceof Date) {
			this.setFieldValueByName(model.getName(), obj);
		} else if (model.getValue() instanceof Long) {
			this.setFieldValueByName(model.getName(), obj);
		} else if (model.getValue() instanceof Character) {
			if ((Character) model.getValue() == Character.MIN_VALUE) {
			} else {
				this.setFieldValueByName(model.getName(), obj);
			}
		} else {
			this.setFieldValueByName(model.getName(), obj);
		}
	}

	public void UpdateModel(BaseModel dto) {
		List<FiledInfo> list = this.getFiledsInfo();
		Object obj = null;
		for (FiledInfo model : list) {
			obj = dto.getFieldValueByName(model.getName());
			if (obj != null) {
				this.UpdateValue(obj, model);
			}
		}
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append(this.getClass().getSimpleName() + "[");
		for (FiledInfo model : this.getFiledsInfo()) {
			sb.append(" {" + model.getName() + "=" + model.getValue() + "} ");
		}
		sb.append("];");
		return sb.toString();
	}
}
