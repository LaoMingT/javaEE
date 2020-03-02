package com.douya.common.utils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


import jeasy.analysis.MMAnalyzer;

public class SplitWordUtil {
	private final static Log log = LogFactory.getLog(SplitWordUtil.class);

	public List<String> getTitleSplitWord(String setence) {
		MMAnalyzer mm = new MMAnalyzer();
		String temp="";
		try {
			temp = mm.segment(setence,";");
		} catch (IOException e) {
			// TODO Auto-generated catch block
            log.error("菜单创建失败，错误码：" + e);  
		}
//		System.out.println(temp);
		return getKeywordList(temp,';',2);//
	}
	public List<String> getKeywordList(String keyword,char split,int min)//取得每行关键词那一列中的关键词
	{
		int s = 0;
		int e =0;
		List<String>  wList = new ArrayList<String>();
		while(true)
		{
			e = keyword.indexOf(';',s);
			if(e==-1)
				break;
			if(min!=0)//不为0   选分词中字数不小于min的关键词
			{
				if(keyword.substring(s,e).trim().length()<min)
				{
					s = e+1;
					continue;
				}
			}
			wList.add(keyword.substring(s,e).trim());
			s=e+1;
		}
		return wList;
	}
	
}
