/**

* <p>Title: BaseDTO.java</p>

* <p>Description: </p>

* <p>Copyright: Copyright (c) 2014</p>

* <p>Company: 豆芽科技</p>

* @author wangmingbo

* @date 2014-6-19

* @version 1.0

*/
package com.douya.mcc.service.dto;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;



@SuppressWarnings("serial")
public abstract class BaseDTO implements Serializable {
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
			if (super.getClass() != this.getClass()) {
				e.printStackTrace();
			}
		}
		return value;
	}

	/**
	 * 根据属性名设置属性值
	 **/
	public void setFieldValueByName(String fieldName, Object o) {
		this.setSuperFieldValueByName(fieldName, o, this.getClass());
	}

	private void setSuperFieldValueByName(String fieldName, Object o, Class<?> myclass) {
		if (myclass != BaseDTO.class) {
			try {
				this.getClass()
						.getMethod("set" + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1),
								myclass.getDeclaredField(fieldName).getType()).invoke(this, o);
			} catch (IllegalArgumentException e1) {
				// TODO Auto-generated catch block
				//e1.printStackTrace();
				System.out.println(e1.getMessage() + "--" + fieldName);
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
				if (super.getClass() != myclass) {
					e1.printStackTrace();
				}
			} catch (NoSuchFieldException e1) {
				this.setSuperFieldValueByName(fieldName, o, myclass.getSuperclass());
			}
		}
	}

	/**
	 * 获取属性名数组
	 * 
	 * */
	public List<String> getFiledName() {
		Class<?> myclass = this.getClass();
		List<String> fieldNames = new ArrayList<String>();
		this.getSuperFiledName(myclass, fieldNames);
		return fieldNames;
	}

	private void getSuperFiledName(Class<?> myclass, List<String> fieldNames) {
		if (myclass != BaseDTO.class) {
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
	public List<FiledInfoDTO> getFiledsInfo() {
		Class<?> myclass = this.getClass();
		List<FiledInfoDTO> list = new ArrayList<FiledInfoDTO>();
		this.getSuperFiledsInfo(myclass, list);
		return list;
	}

	private void getSuperFiledsInfo(Class<?> myclass, List<FiledInfoDTO> list) {
		if (myclass != BaseDTO.class) {
			Field[] fields = myclass.getDeclaredFields();
			for (Field field : fields) {
				list.add(new FiledInfoDTO(field.getType(), field.getName(), this.getFieldValueByName(field.getName())));
			}
			this.getSuperFiledsInfo(myclass.getSuperclass(), list);
		}
	}

	/**
	 * 获取对象的所有属性值，返回一个对象数组
	 **/
	public List<Object> getFiledValues() {
		List<Object> value = new ArrayList<Object>();
		for (String filedName : this.getFiledName()) {
			value.add(this.getFieldValueByName(filedName));
		}
		return value;
	}

	public void UpdateMine(BaseDTO dto) {
		List<FiledInfoDTO> list = this.getFiledsInfo();
		Object obj = null;
		for (FiledInfoDTO model : list) {
			obj = dto.getFieldValueByName(model.getName());
			if (obj != null) {
				if (model.getValue() instanceof Integer) {
					this.setFieldValueByName(model.getName(), obj);
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
		}
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append(this.getClass().getSimpleName() + "[");
		for (FiledInfoDTO model : this.getFiledsInfo()) {
			sb.append(" {" + model.getName() + "=" + model.getValue() + "} ");
		}
		sb.append("];");
		return sb.toString();
	}
}
