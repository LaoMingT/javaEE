
Ext.r(function() {

	
	
	
	  var gridPanel = new Ext.ux.GridPanel({
				gridCfg : {
					id : 'topic-company-grid',
					width : document.body.clientWidth - 30,
					height : document.body.clientHeight - 30,
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
				columns : COLUMN,
				storeCfg : {
					url : './company.do',
					baseParams : {
						method : 'searchGrid'
					},
					autoLoad : true,
					remoteSort : true,
					listeners : {}
				},
				tbarItems : [{
							text : '添加公司',
							//hidden : !roles['A_ROLE_ADD'],
							icon : BASE_PATH + '/styles/images/icons/add0.png',
							handler : function() {
								editCom();
							}
						}]

			});

			


	new Ext.form.FormPanel({
		id : 'companyIdPanelId',
		renderTo : 'companyId',
		frame : true,
		border : false,
		labelWidth : 80,
		autoScroll : true,
		width : document.body.clientWidth,
		height : document.body.clientHeight,
		items : [  gridPanel ]
	});

	
	
});
var COLUMN = [{
	header : '操作',
	width : 100,
	align : 'center',
	sortable : true,
	renderer : function(v, m, rec) {
		/**
		 * 
		 */
		var value = '<a title="修改" id="a-reply-' + rec.data['pk']
				+ '" href="javascript:;" onclick="javascript:editCom( \''
				+ rec.data['pk'] + '\',\''
				+ rec.data['comName'] + '\',\'' 
				+ rec.data['comView']
				+ '\')" class="edit0">&nbsp;</a>';
		 value += '<a title="删除" href="javascript:;" onclick="javascript:delCom(\''
													+ rec.data.pk
													+ '\')" class="del0">&nbsp;</a>';

		return value;
	 }
  },{
		id : 'topic',
		header : "公司名称",
		dataIndex : 'comName',
		width : 150
			// renderer : Forum.Renderers.topic
		}, {
		header : "公司简介",
		dataIndex : 'comView',
		width : 350
			// align : 'right'
		}];
	
function editCom(pk,comname,content) {
		
		
		var yuangongmessage = new Ext.form.FormPanel({
					id : 'addCompanyPanel',
					frame : true,
					border : false,
					labelWidth : 80,
					layout : 'form',
					items : [ {
								xtype : 'hidden',
								id : 'pkJs',
								name : 'pk'
							 },{
								xtype : 'textfield',
								fieldLabel : '公司名称',
								allowBlank : false,
								width : 200,
								name : 'companyNameId',
								id : 'companyNameIdJs'
								
							  }, {
								xtype : 'textarea',
								fieldLabel : '公司简介',
								id : 'viewContentJs',
								height : 100,
								width : 350
							}]
				});

		var changesWin = new Ext.Window({
			id : 'addCompanyWindow',
			layout : 'fit',
			title : '添加公司',
			buttonAlign : 'center',
			width : 490,
			height : 270,
			closeAction : 'close',
			items : [yuangongmessage],
			buttons : [{
				text : '确定',
				handler : function() {
					Ext.Ajax.request({
						url : './company.do',
						params : {
							method : 'addCompany',
							pk:Ext.getCmp('pkJs').getValue(),
							comName : Ext.getCmp('companyNameIdJs').getValue(),
							comView : Ext.getCmp('viewContentJs').getValue()
						},
						success : function(resp, opts) {
							var data = Ext.util.JSON.decode(resp.responseText);
							if (data.success) {
								Ext.Msg.alert("提示", data.msg);
								Ext.getCmp('addCompanyWindow').close();
								Ext.getCmp('topic-company-grid').getStore().load();
							} else {
								Ext.getCmp('addCompanyWindow').show();
							}
						}
					});
				}
			}, {
				text : '取消',
				handler : function() {
					Ext.getCmp('addCompanyWindow').close();
				}
			}]
		});

		changesWin.show();
		
		if (null != pk) {
			Ext.getCmp('pkJs').setValue(pk);
			Ext.getCmp('companyNameIdJs').setValue(comname);
			Ext.getCmp('viewContentJs').setValue(content);
		 }
	}
function   delCom(pk){
	Ext.Msg.confirm('提示', '确认删除公司?', function(btn) {
		
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : './company.do?method=delCom&pk=' + pk,
				success : function(response) {
					var ro = Ext.util.JSON.decode(response.responseText);
					if (ro.success) {
						Ext.MessageBox.alert('提示', ro.msg);
						Ext.getCmp('topic-company-grid').getStore().load();
					} else {
						Ext.MessageBox.alert("提示", ro.msg);
					}
				},
				failure : function() {
					Ext.MessageBox.alert('错误', '操作失败!');
				}
			});
		}
	});
}