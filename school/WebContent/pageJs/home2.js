/*
 * ! Ext JS Library 3.2.1 Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com http://www.extjs.com/license
 */

// ////////////////////////////////////////////////////////////////////////////////////////////
// The data store for topics

// ////////////////////////////////////////////////////////////////////////////////////////////
// some renderers

// ////////////////////////////////////////////////////////////////////////////////////////////

Ext.onReady(function() {
	var COLUMN = [{
		id : 'topic',
		header : "姓名",
		dataIndex : 'userName',
		width : 150
			// renderer : Forum.Renderers.topic
		}, {
		header : "年龄",
		dataIndex : 'age',
		width : 70
			// align : 'right'
		}, {
		id : 'cont',
		header : "联系方式",
		dataIndex : 'contact',
		width : 150
			// renderer : Forum.Renderers.lastPost
		}, {
		id : 'addr',
		header : "地址",
		dataIndex : 'address',
		width : 150
			// renderer : Forum.Renderers.lastPost
		}, {
		id : 'sal',
		header : "薪水",
		dataIndex : 'salary',
		width : 150
			// renderer : Forum.Renderers.lastPost
		}, {
		id : 'departName',
		header : "所在部门",
		dataIndex : 'departmentName',
		width : 150
			// renderer : Forum.Renderers.lastPost
		}, {
		id : 'whenc',
		header : "入职时间",
		dataIndex : 'whencome',
		width : 150
			// renderer : Forum.Renderers.lastPost
		}, {
		id : 'wheng',
		header : "辞职时间",
		dataIndex : 'whengo',
		width : 150
			// renderer : Forum.Renderers.lastPost
		}];

	var ds = new Ext.ux.GridPanel({
				gridCfg : {
					id : 'topic-grid',
					width : document.body.clientWidth - 30,
					height : 320,
					region : 'center',
					viewConfig : {
						forceFit : false,
						autoScroll : true,
						enableRowBody : true,
						showPreview : true,
						getRowClass : function(record, index) {

						}

					}
				},
				pageSize : 10,
				columnCheckBoxCfg : {
					single : false
				},
				columns : COLUMN,
				storeCfg : {
					url : './home.do',
					baseParams : {
						method : 'searchGrid'
					},
					autoLoad : true,
					remoteSort : true,
					listeners : {}
				},
				tbarItems : [{
							pressed : true,
							enableToggle : true,
							text : '添加员工信息',
							tooltip : {
								title : '新增员工',
								text : '把他们的信息保存起来'
							},
							iconCls : 'summary',
							handler : toggleDetails
						}]

			});
	var treee1 = new Ext.tree.TreePanel({
				id : 'forum-tree',
				region : 'west',
				title : '',
				split : true,
				width : 325,
				minSize : 175,
				maxSize : 400,
				collapsible : true,
				margins : '0 0 5 5',
				loader : new Ext.tree.TreeLoader({
							dataUrl : './home.do?method=searchMenu',
							baseParams : {
								parentPk : 1
							}
						}),
				rootVisible : false,
				lines : false,
				autoScroll : true,
				root : new Ext.tree.AsyncTreeNode({
							text : 'Forums',
							expanded : true
						})
			});

	var tree2 = new Ext.ux.TreePanel({
				treeCfg : {
					id : 'forum-tree',
					region : 'west',
					split : true,
					width : 325,
					minSize : 175,
					maxSize : 400,
					collapsible : true,
					margins : '0 0 5 5',
					listeners : {
						'click' : {
							fn : function(node, e) {/*
													 * 
													 * if (null !=
													 * node.attributes.srcObj &&
													 * null !=
													 * node.attributes.srcObj.url && '' !=
													 * node.attributes.srcObj.url) {
													 * addTabPanel(node); }
													 */
							}
						}
					}
				},
				treeObjCfg : {
					url : './home.do',
					params : {
						method : 'searchMenu'
					},
					rootText : '全部',
					rootVisible : false
				}
			});

	var viewport = new Ext.Viewport({
		layout : 'border',
		items : [new Ext.BoxComponent({ // raw
					region : 'north',
					el : 'header',
					height : 62
				}), tree2, new Ext.TabPanel({
					id : 'main-tabs',
					activeTab : 0,
					region : 'center',
					margins : '0 5 5 0',
					resizeTabs : true,
					tabWidth : 150,
					items : {
						id : 'main-view',
						layout : 'border',
						title : '员工信息',
						items : [ds, {
							id : 'preview',
							region : 'south',
							height : 250,
							title : 'View Topic',
							split : true,
							bodyStyle : 'padding: 10px; font-family: Arial; font-size: 12px;'
						}]
					}
				})]
	});

	// Custom rendering Template

	// apply it to the exsting input element
	// search.applyTo('search');

	function toggleDetails() {

		var yuangongmessage = new Ext.form.FormPanel({
					id : 'activityformId',
					frame : true,
					border : false,
					width : 620,
					layout : 'form',
					height : 330,
					labelWidth : 80,
					items : [{
								xtype : 'textfield',
								fieldLabel : '活动名称',
								id : 'remarkJs',
								name : 'remark',
								width : 100

							}]
				});

		var changesWin = new Ext.Window({
			id : 'mchangesWinId',
			layout : 'fit',
			title : '添加员工信息',
			buttonAlign : 'center',
			width : 620,
			height : 390,
			closeAction : 'close',
			items : [yuangongmessage],
			buttons : [{
				text : '确定',
				handler : function() {

					Ext.Ajax.request({
						url : './atMyWeibo.do',
						params : {
							method : 'mchangeOperator',
							pks : pks,
							operatorPk : Ext.getCmp('moperatorIds').getValue().inputValue
						},
						success : function(resp, opts) {
							var data = Ext.util.JSON.decode(resp.responseText);
							if (data.success) {
								Ext.Msg.alert("提示", data.msg);
								Ext.getCmp('mchangesWinId').close();
								Ext.getCmp('atMyWeiboGridId').getStore().load();
							} else {
								Ext.getCmp('mchangesWinId').show();
							}
						}
					});
				}
			}, {
				text : '取消',
				handler : function() {
					Ext.getCmp('mchangesWinId').close();
				}
			}]
		});

		changesWin.show();
	}

	function togglePreview(btn, pressed) {
		var preview = Ext.getCmp('preview');
		preview[pressed ? 'show' : 'hide']();
		preview.ownerCt.doLayout();
	}
});
