/**
 * 豆芽科技
 * Copyright (C): 2014
 * 
 * 文件名称：account.js
 * 
 * 文件描述: account管理
 * 
 * Notes: 修改历史(作者/日期/改动描述): jack/2014.6.15/初始化
 * 
 */



//var accounts = Ext.util.JSON.decode(accounts);
Ext.r(function() {	
	
			new Ext.ux.GridPanel(
					{
						gridCfg : {
							id : 'authorityGridId',
							renderTo : 'authorityId',
							width : document.body.clientWidth,
							height : document.body.clientHeight,
							viewConfig : {
								forceFit : false,
								autoScroll : true
							}
						},
						columns : [
								{
									header : '操作',
									dataIndex : 'authorityPks',
									width : 200,
									align : 'center',
									renderer : function(v, m, rec) {
										var actStr = "";
											actStr += '<a title="编辑" id="a-edit-'
													+ rec.data.pk
													+ '" href="javascript:;" onclick="javascript:editRole(\''
													+ v
													+ '\',\''
													+ rec.data.pk
													+ '\',\''
													+ rec.data.roleName
													+ '\',\''
													+ rec.data.roleIsVisable
													+ '\')" class="edit0">&nbsp;</a>';
											actStr += '<a title="删除" href="javascript:;" onclick="javascript:delRole(\''
													+ rec.data.pk
													+ '\')" class="del0">&nbsp;</a>';
										return actStr;
									}
								}, {
									header : '名称',
									dataIndex : 'roleName',
									width : 200,
									align : 'center'
								}, {
									header : '是否启用',
									dataIndex : 'isVisable',
									width : 200,
									align : 'center',
									renderer : function(v, m, rec) {

	                                	if (v == 1) {
												return '启用';
										} else if (v == 2) {
											return '未启用';
										}
	                                 }	
								} ],
						storeCfg : {
							url : './authority.do',
							baseParams : {
								method : 'searchGrid'
							},
							autoLoad : true,
							remoteSort : true,
							listeners : {

							}
						},
						tbarItems : [ {
							text : '添加权限组',
							//hidden : !roles['A_ROLE_ADD'],
							icon : BASE_PATH + '/styles/images/icons/add0.png',
							handler : function() {
								editRole();
							}
						} ]
					});

});
function editRole(data, pk, name, isVisable) {
	var tree = new Ext.ux.TreePanel({
		treeCfg : {
			id : 'roleTree',
			listeners : {
				'load' : {
					fn : function(node) {
						var childNodes = node.childNodes;
						if (null != pk && '' != pk) {
							var datas = data.split(',');
							for ( var i = 0; i < childNodes.length; i++) {
								var childNode = childNodes[i];
								for ( var j = 0; j < datas.length; j++) {
									var id = datas[j];
									if (childNode.id == id) {
										childNode.attributes.checked = true;
										childNode.ui.toggleCheck(true);
									}
								}
							}
						} else if (null == pk) {
							for ( var i = 0; i < childNodes.length; i++) {
								var childNode = childNodes[i];
								childNode.attributes.checked = true;
								childNode.ui.toggleCheck(true);
								if (childNode.hasChildNodes()) {
									childNode.expand();
								}

							}
						}
						var bl = false;
						if (!node.attributes.checked) {
							node.attributes.checked = true;
							node.ui.toggleCheck(true);
							for ( var i = 0; i < childNodes.length; i++) {
								var childNode = childNodes[i];
								bl = false || childNode.attributes.checkde;
							}
							if (!bl) {
								node.attributes.checked = false;
								node.ui.toggleCheck(false);
							}
						}
					}
				}
			}
		},
		treeObjCfg : {
			url : './authority.do',
			params : {
				method : 'getListByParentPk'

			},
			checkBox : true,
			mutiSelect : true
		}

	});
	var radioIsVisable = new Ext.form.RadioGroup({
		fieldLabel : '是否启用',
		columns : 2,
		items : [ {
			id : 'active1',
			boxLabel : '　启用',
			name : 'active',
			inputValue : '1',
			checked : isVisable != 2
		}, {
			id : 'active0',
			boxLabel : '　指定',
			boxLabel : '禁用',
			name : 'active',
			inputValue : '2',
			checked : isVisable == 2
		} ]
	});

	var form = new Ext.form.FormPanel({
		id : 'roleForm',
		frame : true,
		border : false,
		labelWidth : 80,
		items : [ {
			xtype : 'fieldset',
			title : '基本设置',
			collapsible : true,
			autoHeight : true,
			layout : 'form',
			items : [ {
				xtype : 'hidden',
				id : 'rolepk',
				name : 'rolepk'
			}, {
				xtype : 'textfield',
				name : 'rolename',
				id : 'rolename',
				fieldLabel : '权限组名称',
				maxLength : 30,
				regex : /^[0-9a-zA-Z_@.\u4e00-\u9fa5]+$/,
				regexText : "只能输入字母、汉字、数字、下划线._@",
				allowBlank : false
			}, radioIsVisable ]
		}, {
			xtype : 'fieldset',
			title : '权限设置',
			autoHeight : true,
			items : [ {
				xtype : 'panel',
				height : 300,
				autoScroll : true,
				items : [ tree ]
			} ]
		} ]
	});
	new Ext.Window(
			{
				id : 'roleWin',
				layout : 'fit',
				buttonAlign : 'center',
				width : 450,
				height : 550,
				closeAction : 'close',
				items : [ form ],
				listeners : {
					'show' : function(w) {
						if (null != pk && '' != pk) {
							Ext.getCmp('rolepk').setValue(pk);
						}
						if (null != name && '' != name) {
							Ext.getCmp('rolename').setValue(name);
						}

					}
				},
				buttons : [
						{
							text : '确定',
							handler : function() {
								if (null == Ext.getCmp('rolename').getValue()
										|| '' == Ext.getCmp('rolename')
												.getValue()) {
									Ext.Msg.alert("提示", "请设置权限组名称！");
									return;
								}
								var node = Ext.getCmp('roleTree').getChecked();
								var treeids = '';
								for ( var i = 0; i < node.length; i++) {
									treeids += node[i].id + ',';

								}
								if ('' == treeids) {
									Ext.Msg.alert("提示", "该权限组没有进行权限设置！");
									return;
								}
								Ext.Ajax
										.request({
											url : './authority.do',
											params : {
												method : 'editRole',
												pk : Ext.getCmp('rolepk')
														.getValue(),
												name : Ext.getCmp('rolename')
														.getValue(),
												isVisable : radioIsVisable
														.getValue().inputValue,
												treeids : treeids
											},
											success : function(resp, option) {
												var data = Ext.util.JSON
														.decode(resp.responseText);
												Ext.Msg.alert("提示", data.msg);
												Ext.getCmp('roleWin').close();
												Ext.getCmp('authorityGridId')
														.getStore().load();
											}
										});
							}
						}, {
							text : '取消',
							handler : function() {
								Ext.getCmp('roleWin').close();
							}
						} ]
			});
	Ext.getCmp('roleWin').show();
	tree.expandAll();
}
function delRole(pk) {
	Ext.Msg.confirm('提示', '删除权限组，归属于该权限组的客服人员将无法正常使用本系统，确认要删除吗？',
			function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
						url : './authority.do?method=deleteRole&pk=' + pk,
						success : function(response) {
							var data = Ext.util.JSON
									.decode(response.responseText);
							Ext.Msg.alert("提示", data.msg);
							Ext.getCmp('authorityGridId').getStore().reload();

						},
						failure : function() {
							Ext.MessageBox.alert('提示', '操作失败');
						}
					});
				}
			});
}