package com.douya.mongdb;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.Before;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.MongoException;

public class IAObj {

	 private DB db;   
	 private Mongo mg = null;   
	 private DBCollection users; 
	 
	 
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
		 * 获取属性类型(type)，属性名(name)，属性值(value)的map组成的list
		 * */
		public List<ENtity> getFiledsInfo() {
			Class<?> myclass = this.getClass();
			List<ENtity> list = new ArrayList<ENtity>();
			this.getSuperFiledsInfo(myclass, list);
			return list;
		}

		private void getSuperFiledsInfo(Class<?> myclass, List<ENtity> list) {
			if (myclass != IAObj.class) {
				Field[] fields = myclass.getDeclaredFields();
				for (Field field : fields) {
					list.add(new ENtity(field.getType(), field.getName(), this.getFieldValueByName(field.getName())));
				}
				this.getSuperFiledsInfo(myclass.getSuperclass(), list);
			}
		}
		/**
		 * 根据属性名设置属性值
		 **/
		public void setFieldValueByName(String fieldName, Object o) {
			this.setSuperFieldValueByName(fieldName, o, this.getClass());
		}
		
		private void setSuperFieldValueByName(String fieldName, Object o, Class<?> myclass) {
			if (myclass != IAObj.class) {
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
	 @Before    
	 public void init() {    
		 try {         
			// mg = new Mongo();            //
			 mg = new Mongo("localhost", 27017);     
			 } catch (UnknownHostException e) {    
				 e.printStackTrace();     
				 } catch (MongoException e) {       
					 e.printStackTrace();   
			 }        //获取temp DB；如果默认没有创建，mongodb会自动创建     
		 db = mg.getDB("temp");        //获取users DBCollection；如果默认没有创建，mongodb会自动创建        
		 users = db.getCollection("users");    

	}     
	
	 
	 public void UpdateMine(IAObj dto) {
			List<ENtity> list = this.getFiledsInfo();
			Object obj = null;
			for (ENtity model : list) {
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
	 
	 public void add(Object o){
		
		   DBObject user = new BasicDBObject();    
		   user.put("name", o.getClass());   
		   user.put("age", 24); 
		
		   db.getCollection("test").save(user);
	 }
	
	
}
