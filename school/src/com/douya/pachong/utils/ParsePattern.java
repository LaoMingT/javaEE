package com.douya.pachong.utils;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.douya.pachong.model.RegexModel;


public class ParsePattern {
    
	public static void main(String[] args) {
		
	}
	
	 
	/**
	 * 初始化正则对象<br>
	 * @param patternPath 正则路径
	 */
	public static void init(String patternPath,List<RegexModel> regList)
	{
		
		String regexStr = Util.readFile(patternPath);
		String regex = "<regex_model\\s*?layer\\s*?=\\s*?(\\d+?)\\s*?> [\\s\\S]*?</regex_model>";
		Pattern p = Pattern.compile(regex);
		Matcher m = p.matcher(regexStr);
		
		String regex_1 = "<reg>(.*?)</reg>";
		String regex_2 = "<property_name\\s*?=(.*?)>(.*?)</property_name>";
		
		Pattern p_1 = Pattern.compile(regex_1);
		Pattern p_2 = Pattern.compile(regex_2);
		
		
		     while(m.find())
		   {
			   String matcherStr = m.group();
				int layer = Integer.parseInt(m.group(1).trim());
				Matcher m_1 = p_1.matcher(matcherStr);
				if(m_1.find())
				{
					 String regex_ = m_1.group(1).trim();
					
					 Matcher m_2 = p_2.matcher(matcherStr);
					 List<Map<String, Integer>> matchGroupList = new ArrayList<Map<String, Integer>>();
					while(m_2.find())
					{
						String propertyName = m_2.group(1).trim();
						int propertyNameGroup = Integer.parseInt(m_2.group(2).trim());
						
						Map<String, Integer> map = new HashMap<String, Integer>();
						map.put(propertyName, propertyNameGroup);
						matchGroupList.add(map);
					}
					
				   RegexModel rm = new RegexModel();
					  rm.setRegex(regex_);
					  rm.setLayer(layer);
					  rm.setMatchGroupList(matchGroupList);
					  regList.add(rm);
//					  System.out.println("wm "+rm);
				 }
		   }
		     if(regList == null || regList.size() == 0)
			  {
				  System.out.println("模板对象加载失败,程序退出!!!");
	              System.exit(1);
			  }
		     
	}
}
