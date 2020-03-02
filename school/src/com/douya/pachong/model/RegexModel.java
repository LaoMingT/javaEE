package com.douya.pachong.model;


import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

/**
 * 自定义正则对象
 * @author sea
 *
 */
public class RegexModel {
   private String regex ; //正则文本
   private Pattern myPattern; //编译好的正则对象
   private int layer = 1;   //标示当前正则匹配第几层的页面
   private List<Map<String, Integer>> matchGroupList = new ArrayList<Map<String, Integer>>(); //属性和分组对应
   
   public int getLayer() {
	return layer;
}

public void setLayer(int layer) {
	this.layer = layer;
}

public List<Map<String, Integer>> getMatchGroupList() {
	return matchGroupList;
}

public void setMatchGroupList(List<Map<String, Integer>> matchGroupList) {
	this.matchGroupList = matchGroupList;
}

public String getRegex() {
	return regex;
    }

   public void setRegex(String regex) {
	this.regex = regex;
	this.myPattern = Pattern.compile(this.regex);
   }



 public Pattern getMyPattern() {
	return myPattern;
 }

 public void setMyPattern(Pattern myPattern) {
	this.myPattern = myPattern;
     }

    @Override
	public String toString() {
		StringBuffer sb = new StringBuffer();
		
		Class<?> clazz = this.getClass();
		Field [] field = clazz.getDeclaredFields();
		try {
			for(Field f: field)
			{
				f.setAccessible(true);
				sb.append(f.getName()+" : "+f.get(this)+"\n");
			}
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
		
		return sb.toString();
	}
}
