/**
 * <pre>
 * 上海久科信息技术有限公司
 * Copyright (C): 2012
 * 
 * 文件名称：
 * 
 * 
 * 文件描述: 
 * MCC微博中间公用的模板 
 * 
 * Notes: 修改历史(作者/日期/改动描述):
 * 王彬/2012.04.11/初始化
 * </pre>
 */
// 命名空间，构建成为类似 java package 的结构，其实是js对象的一种形式。
document
		.write('<link rel="stylesheet" type="text/css" href="./lib/common/layout/layout.css" />');
document
		.write('<link rel="stylesheet" type="text/css" href="./lib/common/layout/theme-default.css" />');
Ext.namespace('Ext.ux');
/**
 * 页面中常用的布局方式，可以简单的构成左树右表的结构形式。 <br />
 * 如果生成树，需要 TreeCheckNodeUI.js，Ext.ux.TreeImpl的支持。
 * 
 * @param {cfg}
 *            传入配置文件，为 Object({}) 形式。
 */
Ext.ux.Layout = function(/* Object */cfg) {
	/** ---------- 本类主要的属性/配置项 start ---------- */
	// 渲染到哪个元素下
	this.renderId;
	// 主体 panel 的配置项。linked{@Ext.Panel}
	this.layoutCfg = {};
	// 业务配置项
	this.businessCfg = {};
	// 菜单配置项
	this.moduleCfg = {};

	//
	/** ---------- 本类主要的属性/配置项 END ---------- */

	Ext.apply(this, cfg);
	/** ---------- 本类主要的/基本属性 START ---------- */
	this.layoutPanel; // 主体面板
	this.headerPanel;// 头部面板
	this.modulePanel;// 菜单面板
	this.businessPanel;// 业务面板

	/** ---------- 本类主要的属性 END ---------- */
	// 初始化类。
	this.init();
	// 渲染到页面元素
	this.layoutPanel.render(this.renderId);
};
/**
 * 初始化本类
 */
Ext.ux.Layout.prototype.init = function() {
	this.getLayoutPanel(); // 创建面板
};
/**
 * 布局整体框架
 * 
 * @return
 */
Ext.ux.Layout.prototype.getLayoutPanel = function() {
	if (!this.layoutPanel) {
		var cfg = {
			layout : 'border',
			frame : false,
			bodyStyle : 'background: #fff;',
			items : [],
			headerCfg : {},
			border : true,
			animate:true
		};
		// 创建头部面板
		var hp = this.getHeaderPanel();
		cfg.items.push(hp);
		var bp = this.getBusinessPanel();
		cfg.items.push(bp);
		// 创建中间面板
		var mp = this.getModuelPanel();
		cfg.items.push(mp);
		this.layoutPanel = new Ext.Viewport(cfg);
	}
	return this.layoutPanel;
};
/**
 * 获取头部面板
 * 
 * @return {}
 */
Ext.ux.Layout.prototype.getHeaderPanel = function() {
	if (!this.headerPanel) {
		var cfg = {
			region : 'north', // 始终在最上面
			border : false,
			contentEl : 'heard',
			height : 49
		};
		this.headerPanel = new Ext.Panel(cfg);
	}
	return this.headerPanel;
};
/**
 * 获取菜单面板
 * 
 * @return
 */
Ext.ux.Layout.prototype.getModuelPanel = function() {
	if (!this.modulePanel) {
		var cfg = {
			region : 'west',
			width : 200,
			collapsible : true,
			title : '功能菜单',
			margins : '0 5 5 5',
			layout : 'accordion',
			layoutConfig : {
				animate : true
			}

		};
		Ext.apply(cfg, this.moduleCfg);
		this.modulePanel = new Ext.Panel(cfg);

	}
	return this.modulePanel;
};
/**
 * 获取业务面板
 * 
 * @return
 */
Ext.ux.Layout.prototype.getBusinessPanel = function() {
	if (!this.businessPanel) {
		var cfg = {
			region : 'center',
			id : 'tabPanel',
			margins : '0 5 5 0',
			enableTabScroll : true,
			deferredRender : false,
			activeTab : 0,
			xtype : 'tabpanel'
		};
		Ext.apply(cfg, this.businessCfg);
		this.businessPanel = new Ext.TabPanel(cfg);
	}
	return this.businessPanel;
};