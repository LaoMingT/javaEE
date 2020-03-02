
var selectedNode=null;
Ext.r(function() {
	// 树结构
	var columnTree = new Ext.ux.tree.ColumnTree({
		width : document.body.clientWidth-30,
		id : 'templateCoumnTreeId',
		rootVisible : false,
		border : false,
		title : ' ',
		columns : [ {
			header : '模板名称',
			width : document.body.clientWidth - 250,
			dataIndex : 'name'
		}, {
			header : '操作',
			width : 200,
			dataIndex : 'operation0'
		} ],
		loader : new Ext.tree.TreeLoader({
			dataUrl : './template.do?method=searchTree',
			uiProviders : {
				'col' : Ext.ux.tree.ColumnNodeUI
			},
			listeners : {
				load : function() {
				}
			}
		}),
		root : new Ext.tree.AsyncTreeNode({
			id : '-1'
		}),
		stateEvents : [ {
			click : function(node) {
			selectedNode = Ext.getCmp('templateCoumnTreeId').getSelectionModel()
			.getSelectedNode();
			}
		} ]
	});
	columnTree.expandAll();
	// 树panel
	new Ext.form.FormPanel({
		frame : true,
		border : false,
		renderTo : 'wxCharId',
		labelWidth : 50,
		autoScroll : true,
		width : document.body.clientWidth,
		height : document.body.clientHeight,
		items : [ {
			xtype : 'fieldset',
			title : '查询',
			autoHeight : true,
			height : 220,
			width : document.body.clientWidth - 50,
			layout : 'form',
			buttonAlign : 'center',
			buttons : [ {
				text : '查询',
				handler : function() {
					query();
				}
			}, {
				text : '重置',
				handler : function() {
					reset();
				}
			} ],
			items : [ {
				xtype : 'panel',
				layout : 'column',
				items : [ {
					xtype : 'panel',
					layout : 'form',

					columnWidth : 0.4,
					items : [ new Ext.ux.combox.brand({
						fieldLabel : '品牌',
						id : 'brandId',
						width : 145,
						name : 'brandPk',
						editable : false,
						resizable : false,
						listWidth : 145
					}), {
						xtype : 'textfield',
						name : 'title',
						id : 'titleJs',
						width : 145,
						fieldLabel : '标题'
					} ]
				}, {
					xtype : 'panel',
					layout : 'form',
					columnWidth : 0.3,

					items : [ new Ext.ux.combox.platform({
						fieldLabel : '平台',
						id : 'platformId',
						width : 145,
						name : 'platformPk',
						editable : false,
						resizable : false,
						listWidth : 145
					}), {
						xtype : 'textfield',
						name : 'content',
						id : 'contentJs',
						width : 145,
						fieldLabel : '内容'
					} ]
				} ]
			} ]
		}, new Ext.Toolbar({
			autoWidth : true,
			autoShow : true,
			items : [ {
				text : '添加分类',
				id : "btnAdd1",
				iconCls : 'bmenu',
				icon : '。。/../style/images/icons/add0.png',
				handler : function() {
					editCatalog();
				}
			}, {
				text : '添加模板',
				id : "btnAdd2",
				iconCls : 'bmenu',
				icon : '。。/../style/images/icons/add0.png',
				handler : function() {
					editTemplate();
				}
			} ]
		}), columnTree ]
	});
});

/**
 * 删除模板
 */
function delTemplate(pk) {
	
	Ext.MessageBox.confirm('提示', '确认删除该模板?', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : './template.do',
				params : {
					method : 'delTemplate',
					pk : pk
				},
				success : function(ro, opt) {
					var data = Ext.util.JSON.decode(ro.responseText);
					if (data.success) {
						Ext.Msg.alert("提示", data.msg);
						Ext.getCmp('templateCoumnTreeId').getLoader()
								.load(
										Ext.getCmp('templateCoumnTreeId')
												.getRootNode(),
										function() {
											Ext.getCmp('templateCoumnTreeId')
													.expandAll();
										});
					} else {
						Ext.Msg.alert("提示", data.msg);
					}
				}
			});
		}
	});
}
/**
 * 查询
 */
function query() {
	Ext.getCmp('templateCoumnTreeId').getLoader().on("beforeload",
			function(treeLoader, node) {
				var baseParams = {
					content : Ext.getCmp('contentJs').getValue(),
					platformPk : Ext.getCmp('platformId').getValue(),
					brandPk : Ext.getCmp('brandId').getValue(),
					title : Ext.getCmp('titleJs').getValue()

				};
				Ext.apply(treeLoader.baseParams, baseParams);
			}, this);

	Ext.getCmp('templateCoumnTreeId').getLoader().load(
			Ext.getCmp('templateCoumnTreeId').getRootNode(), function() {
				Ext.getCmp('templateCoumnTreeId').expandAll();
			});
}
/**
 * 重置
 */
function reset() {
	Ext.getCmp('contentJs').setValue('');
	Ext.getCmp('platformId').setValue('');
	Ext.getCmp('brandId').setValue('');
	Ext.getCmp('titleJs').setValue('');

}
/**
 * 模板的编辑保存
 */
function editTemplate(pk, title,brandPk,brandName,platformPk,platformName, parentPk, parentName, sort, isVisable, content) {
	var radioIsVisable = new Ext.form.RadioGroup({
		id : 'isVisableId',
		fieldLabel : '是否启用',
		columns : 2,
		items : [ {
			id : 'active1',
			boxLabel : '　正常',
			name : 'active',
			inputValue : '1',
			checked : isVisable != 2
		}, {
			id : 'active0',
			boxLabel : '禁用',
			name : 'active',
			inputValue : '2',
			checked : isVisable == 2
		} ]
	});
	var comboBrand = new Ext.ux.combox.brand({
		xtype : 'combo',
		fieldLabel : '品牌',
		id : 'TbrandPkJs',
		width : 145,
		name : 'brandPk',
		listWidth : 145,
		editable : false,
		resizable : false,
		mode : 'remote',
		listeners : {
			'select' : function(combo, record, index) {
				queryCatalog();

			}
		}
	});
	var comboPlatform = new Ext.ux.combox.platform({
		xtype : 'combo',
		fieldLabel : '平台',
		id : 'TplatformPkJs',
		width : 145,
		name : 'platformPk',
		listWidth : 145,
		editable : false,
		resizable : false,
		mode : 'remote',
		listeners : {
			'select' : function(combo, record, index) {
		queryCatalog();

			}
		}
	});
	var comboSort = new Ext.form.ComboBox({
		xtype : 'combo',
		name : 'sort',
		id : 'sortId',
		fieldLabel : '排序',
		width : 145,
		displayField : 'sort',
		editable : false,
		mode : 'local',
		triggerAction : 'all',
		store : new Ext.data.SimpleStore({
			fields : [ 'sort' ],
			data : [ [ '1' ], [ '2' ], [ '3' ], [ '4' ], [ '5' ], [ '6' ],
					[ '7' ], [ '8' ], [ '9' ] ]
		})
	});
	if (null == sort || 0 == sort) {
		comboSort.on('beforerender', function() {
			this.value = this.store.getAt(0).get('sort');
		});
	}
	var comboCatalog = new Ext.ux.combox.templateCatalogByPks({
		xtype : 'combo',
		fieldLabel : '分类',
		id : 'parentPkJs',
		width : 145,
		name : 'parentPk',
		listWidth : 145,
		editable : false,
		resizable : false,
		mode : 'remote',
		listeners : {
			'select' : function(combo, record, index) {
				

			}
		}
	});

	var templateForm = new Ext.FormPanel({
		id : 'templateform',
		frame : true,
		border : false,
		labelWidth : 80,
		items : [ new Ext.form.Hidden( // hidden
		{
			id : 'templatePk',
			value : ''
		}), comboBrand,comboPlatform,comboCatalog, {
			xtype : 'textfield',
			fieldLabel : '标题',
			id : 'templateTitleJs',
			name : 'templateTitle',
			width : 145
		}, comboSort, radioIsVisable, {
			xtype : 'textarea',
			name : 'templateContent',
			id : 'templateContentJs',
			fieldLabel : '内容',
			height : 60,
			maxLength : 140,
			width : 200
		} ]
	});

	var win = new Ext.Window({
		id : 'templateWinId',
		layout : 'fit',
		buttonAlign : 'center',
		width : 360,
		height : 330,
		closeAction : 'close',
		items : [ templateForm ],
		buttons : [ {
			text : '确定',
			handler : function() {
				saveTemplate();
			}
		}, {
			text : '取消',
			handler : function() {
				Ext.getCmp('templateWinId').close();
			}
		} ]
	});
	win.show();

	if (null != pk) {
		Ext.getCmp('TbrandPkJs').setValue(brandPk);
		Ext.getCmp('TbrandPkJs').setRawValue(brandName);
		Ext.getCmp('TbrandPkJs').setDisabled(true);
		Ext.getCmp('TplatformPkJs').setValue(platformPk);
		Ext.getCmp('TplatformPkJs').setRawValue(platformName);
		Ext.getCmp('TplatformPkJs').setDisabled(true);
		Ext.getCmp('templatePk').setValue(pk);
		Ext.getCmp('templateTitleJs').setValue(title);
		Ext.getCmp('isVisableId').setValue(isVisable);
		Ext.getCmp('sortId').setValue(sort);
		Ext.getCmp('templateContentJs').setValue(content);
		Ext.getCmp('parentPkJs').setValue(parentPk);
		Ext.getCmp('parentPkJs').setRawValue(parentName);
		Ext.getCmp('parentPkJs').getStore().on('beforeload',
				function(t, ops) {
					var params = {
						brandPk : Ext.getCmp('TbrandPkJs').getValue(),
						platformPk : Ext.getCmp('TplatformPkJs').getValue()
					};
					Ext.apply(ops.params, params);
				}, this);
		Ext.getCmp('parentPkJs').getStore().load({
			params : {
				start : 0
			}
		});
	}
}
//通过品牌和平台得到相应的模板分类
function queryCatalog() {
	Ext.getCmp('parentPkJs').setValue('');
	Ext.getCmp('parentPkJs').getStore().on('beforeload',
			function(t, ops) {
				var params = {
					brandPk : Ext.getCmp('TbrandPkJs').getValue(),
					platformPk : Ext.getCmp('TplatformPkJs').getValue()
				};
				Ext.apply(ops.params, params);
			}, this);
	Ext.getCmp('parentPkJs').getStore().load({
		params : {
			start : 0
		}
	});
};
/**
 * 模板编辑的方法
 */
function saveTemplate() {
	if (Ext.getCmp('templateContentJs').getValue().length > 140) {
		Ext.Msg.alert("提示", "模板内容不能超过140！");
		return false;
	}
	if (Ext.getCmp('parentPkJs').getValue() == '') {
		Ext.Msg.alert("提示", "分类不能为空！");
		return false;
	}
	if (Ext.getCmp('templateTitleJs').getValue() == '') {
		Ext.Msg.alert("提示", "标题不能为空！");
		return false;
	}
	if (Ext.getCmp('templateContentJs').getValue() == '') {
		Ext.Msg.alert("提示", "内容不能为空！");
		return false;
	}
	Ext.Ajax.request({
		url : './template.do',
		params : {
			method : 'editTemplate',
			pk : Ext.getCmp('templatePk').getValue(),
			title : Ext.getCmp('templateTitleJs').getValue(),
			isVisable : Ext.getCmp('isVisableId').getValue().inputValue,
			sort : Ext.getCmp('sortId').getValue(),
			parentPk : Ext.getCmp('parentPkJs').getValue(),
			content : Ext.getCmp('templateContentJs').getValue()
		},
		success : function(resp, option) {
			var data = Ext.util.JSON.decode(resp.responseText);
			if (data.success) {
				Ext.Msg.alert("提示", data.msg);
				Ext.getCmp('templateWinId').close();
				Ext.getCmp('templateCoumnTreeId').getLoader().load(
						Ext.getCmp('templateCoumnTreeId').getRootNode(),
						function() {
							Ext.getCmp('templateCoumnTreeId').expandAll();
						});
			} else {
				Ext.Msg.alert("提示", data.msg);
			}

		}
	});
}
// 添加模板分类
function editCatalog(pk, title, brandPk, brandName, platformPk, platformName,
		sort, isVisable) {
	var radioIsVisables = new Ext.form.RadioGroup({
		id : 'isVisableIds',
		fieldLabel : '是否启用',
		width : 200,
		columns : 2,
		items : [ {
			id : 'active1',
			boxLabel : '　正常',
			name : 'active',
			inputValue : '1',
			checked : isVisable != 2
		}, {
			id : 'active0',
			boxLabel : '禁用',
			name : 'active',
			inputValue : '2',
			checked : isVisable == 2
		} ]
	});

	var comboSorts = new Ext.form.ComboBox({
		xtype : 'combo',
		name : 'sort',
		id : 'sortIds',
		fieldLabel : '排序',
		width : 145,
		displayField : 'sort',
		editable : false,
		mode : 'local',
		triggerAction : 'all',
		store : new Ext.data.SimpleStore({
			fields : [ 'sort' ],
			data : [ [ '1' ], [ '2' ], [ '3' ], [ '4' ], [ '5' ], [ '6' ],
					[ '7' ], [ '8' ], [ '9' ] ]
		})
	});
	if (null == sort || 0 == sort) {
		comboSorts.on('beforerender', function() {
			this.value = this.store.getAt(0).get('sort');
		});
	}
	var comboBrand = new Ext.ux.combox.brand({
		xtype : 'combo',
		fieldLabel : '品牌',
		id : 'brandPkJs',
		width : 145,
		name : 'brandPk',
		listWidth : 145,
		editable : false,
		resizable : false,
		mode : 'remote'
	});
	var comboPlatform = new Ext.ux.combox.platform({
		xtype : 'combo',
		fieldLabel : '平台',
		id : 'platformPkJs',
		width : 145,
		name : 'platformPk',
		listWidth : 145,
		editable : false,
		resizable : false,
		mode : 'remote'
	});
	var catalogForm = new Ext.FormPanel({
		id : 'catalogForm',
		frame : true,
		border : false,
		labelWidth : 80,
		items : [ new Ext.form.Hidden( // hidden
		{
			id : 'catalogPk',
			value : ''
		}), comboBrand, comboPlatform, comboSorts, radioIsVisables, {
			xtype : 'textfield',
			fieldLabel : '分类名',
			id : 'catalogTitleJs',
			name : 'catalogTitle',
			width : 200
		} ]
	});

	var cwin = new Ext.Window({
		id : 'catalogWinId',
		layout : 'fit',
		buttonAlign : 'center',
		width : 360,
		height : 220,
		closeAction : 'close',
		items : [ catalogForm ],
		buttons : [ {
			text : '确定',
			handler : function() {
				saveCatalog();
			}
		}, {
			text : '取消',
			handler : function() {
				Ext.getCmp('catalogWinId').close();
			}
		} ]
	});
	cwin.show();

	if (null != pk) {
		Ext.getCmp('catalogPk').setValue(pk);
		Ext.getCmp('catalogTitleJs').setValue(title);
		Ext.getCmp('isVisableIds').setValue(isVisable);
		Ext.getCmp('sortIds').setValue(sort);
		Ext.getCmp('brandPkJs').setValue(brandPk);
		Ext.getCmp('brandPkJs').setRawValue(brandName);
		Ext.getCmp('brandPkJs').setDisabled(true);
		Ext.getCmp('platformPkJs').setValue(platformPk);
		Ext.getCmp('platformPkJs').setRawValue(platformName);
		Ext.getCmp('platformPkJs').setDisabled(true);
	}
};
// 保存分类方法
function saveCatalog() {
	if (Ext.getCmp('brandPkJs').getValue() == '') {
		Ext.Msg.alert("提示", "品牌不能为空！");
		return false;
	}
	if (Ext.getCmp('platformPkJs').getValue() == '') {
		Ext.Msg.alert("提示", "平台不能为空！");
		return false;
	}
	if (Ext.getCmp('catalogTitleJs').getValue() == '') {
		Ext.Msg.alert("提示", "标题不能为空！");
		return false;
	}
	Ext.Ajax.request({
		url : './template.do',
		params : {
			method : 'saveCatalog',
			pk : Ext.getCmp('catalogPk').getValue(),
			title : Ext.getCmp('catalogTitleJs').getValue(),
			isVisable : Ext.getCmp('isVisableIds').getValue().inputValue,
			sort : Ext.getCmp('sortIds').getValue(),
			brandPk : Ext.getCmp('brandPkJs').getValue(),
			platformPk : Ext.getCmp('platformPkJs').getValue()
		},
		success : function(resp, option) {
			var data = Ext.util.JSON.decode(resp.responseText);
			if (data.success) {
				Ext.Msg.alert("提示", data.msg);
				Ext.getCmp('catalogWinId').close();
				Ext.getCmp('templateCoumnTreeId').getLoader().load(
						Ext.getCmp('templateCoumnTreeId').getRootNode(),
						function() {
							Ext.getCmp('templateCoumnTreeId').expandAll();
						});
			} else {
				Ext.Msg.alert("提示", data.msg);
			}

		}
	});
};
function deleteCatalog(pk) {
	Ext.MessageBox.confirm('提示', '确认删除此模板分类?', function(btn) {
		if (btn == 'yes') {

			if (null != selectedNode.firstChild) {
				Ext.MessageBox.confirm('提示', '该节点下存在模板,确认删除?',
				function(btn) {
				if (btn == 'yes') {
					del(pk);
				}
				});
			}else{
					del(pk);
			}
		
	
		}
	});
}
 function del(pk)
{
	Ext.Ajax.request({
		url : './template.do',
		params : {
			method : 'delTemplateClass',
			pk : pk
		},
		success : function(ro, opt) {
			var data = Ext.util.JSON.decode(ro.responseText);
			if (data.success) {
				Ext.Msg.alert("提示", data.msg);
				Ext.getCmp('templateCoumnTreeId').getLoader()
						.load(
								Ext.getCmp('templateCoumnTreeId')
										.getRootNode(),
								function() {
									Ext.getCmp('templateCoumnTreeId')
											.expandAll();
								});
			} else {
				Ext.Msg.alert("提示", data.msg);
			}
		}
	});
	}
