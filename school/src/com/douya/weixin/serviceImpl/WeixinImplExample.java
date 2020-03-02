package com.douya.weixin.serviceImpl;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.douya.common.hessian.MCCBusinessHessianHelper;

import com.sedion.advanced.model.PersonalInf;
import com.sedion.advanced.model.WeixinGroup;
import com.sedion.advanced.model.WeixinUserList;
import com.sedion.menu.model.Button;
import com.sedion.menu.model.CommonButton;
import com.sedion.menu.model.ComplexButton;
import com.sedion.menu.model.Menu;

public class WeixinImplExample {
	/**
	 * 组装菜单数据
	 * 
	 * @return
	 */
	private static Logger logger = Logger.getLogger(WeixinImplExample.class);

	public Menu getMenu() {

		CommonButton btn21 = new CommonButton();
		btn21.setName("我是好人");
		btn21.setType("click");
		btn21.setKey("21");

		CommonButton btn22 = new CommonButton();
		btn22.setName("申请条件");
		btn22.setType("click");
		btn22.setKey("22");

		CommonButton btn23 = new CommonButton();
		btn23.setName("进度查询");
		btn23.setType("click");
		btn23.setKey("23");

		ComplexButton mainBtn1 = new ComplexButton();
		mainBtn1.setName("操le");
		mainBtn1.setType("click");
		mainBtn1.setKey("1+");

		ComplexButton mainBtn2 = new ComplexButton();
		mainBtn2.setName("我要贷款");
		mainBtn2.setSub_button(new CommonButton[] { btn21, btn22, btn23 });

		ComplexButton mainBtn3 = new ComplexButton();
		mainBtn3.setName("微公益");
		mainBtn3.setType("click");
		mainBtn3.setKey("3+");
		/**
		 * 每个一级菜单都有二级菜单项 在某个一级菜单下没有二级菜单的情况，menu该如何定义呢？
		 * 比如，第三个一级菜单项不是“更多体验”，而直接是“幽默笑话”，那么menu应该这样定义： menu.s etButton(new
		 * Button[] { mainBtn1, mainBtn2, btn33 });
		 */
		Menu menu = new Menu();
		menu.setButton(new Button[] { mainBtn1, mainBtn2, mainBtn3 });
		return menu;
	}

	public static void main(String[] args) throws Exception {}
}
