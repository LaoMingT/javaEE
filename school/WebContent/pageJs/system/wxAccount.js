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

	
	
	
	  var gridPanel = new Ext.ux.GridPanel({
				gridCfg : {
					id : 'topic-Account-grid',
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
/*				columnCheckBoxCfg : {
					single : false
				},*/
				columns : COLUMN,
				storeCfg : {
					url : './wxAccount.do',
					baseParams : {
						method : 'searchGrid'
					},
					autoLoad : true,
					remoteSort : true,
					listeners : {}
				},
				tbarItems : [{
							text : '添加公众账号',
							//hidden : !roles['A_ROLE_ADD'],
							icon : BASE_PATH + '/styles/images/icons/add0.png',
							handler : function() {
								toggleDetails();
							} 
						}]

			});


	new Ext.form.FormPanel({
		id : 'wxAccountPanelId',
		renderTo : 'wxAccountId',
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
	header : '导入',
	width : 70,
	align : 'center',
	sortable : true,
	renderer : function(v, m, rec) {
		/**
		 * 
		 */
		var value = '<a title="导入" id="a-reply-' + rec.data['openid']
				+ '" href="javascript:;" onclick="javascript:importData( \''
				+ rec.data['pk']
				+ '\')"><img src="./styles/images/icons/down0.gif"/></a>';
         
		return value;
	}
  },{
	header : '操作',
	width : 80,
	align : 'center',
	sortable : true,
	renderer : function(v, m, rec) {
		/**
		 * 
		 */
		var value = '<a title="修改" id="a-reply-' + rec.data['wxAccountId']
				+ '" href="javascript:;" onclick="javascript:toggleDetails( \''
				+ rec.data['pk'] + '\',\''
				+ rec.data['wxAccount'] + '\',\'' 
				+ rec.data['wxAccountId'] + '\',\''
				+ rec.data['category'] + '\',\''
				+ rec.data['appId'] + '\',\''
				+ rec.data['appsecret'] + '\',\''
				+ rec.data['weixinId'] + '\',\''
				+ rec.data['url']
				+ '\')" class="edit0">&nbsp;</a>';
		 value += '<a title="删除" href="javascript:;" onclick="javascript:delwxAccount(\''
													+ rec.data.pk
													+ '\')" class="del0">&nbsp;</a>';

		 return value;
	  }
  },{
		header : "公众账号名",
		dataIndex : 'wxAccount',
		align : 'center',
		width : 150
		// renderer : Forum.Renderers.topic
	},{
		header : "公众账号id",
		dataIndex : 'wxAccountId',
		align : 'center',
		width : 150
		// renderer : Forum.Renderers.topic
	},{
		header : "账号类型",
		dataIndex : 'category',
		align : 'center',
		width : 70,
		renderer : function(v, m, rec) {
			if (v == 1) {
				return '服务号';
			} else {
				return '订阅号';
		  	}
		}
		// renderer : Forum.Renderers.topic
	}, {
		header : "appID",
		dataIndex : 'appId',
		width : 150
		// align : 'right'
	}, {
		header : "appsecret",
		dataIndex : 'appsecret',
		width : 150
	}, {
		header : "微信id",
		dataIndex : 'weixinId',
		width : 150
	}, {
		header : "地址",
		dataIndex : 'url',
		width : 150
	}];
	
function importData(pk){
	
	Ext.MessageBox.show({
							msg : '正在更新数据，请耐心等待...',
							progressText : '正在更新数据，请耐心等待...',
							width : 300,
							wait : true
						});
						
   Ext.Ajax.request({
		url : './wxAccount.do',
		params : {
			method : 'importData',
			pk:pk
		},
		success : function(resp, option) {
		  var data = Ext.util.JSON.decode(resp.responseText);
			if (data.success){
			     Ext.MessageBox.hide();
                 Ext.MessageBox.alert('成功','数据更新成功');
			}else{
				 Ext.MessageBox.hide();
				 Ext.MessageBox.alert('失败','数据更新失败');
			}
		}
		
   });
 
}
	
	
	function toggleDetails(pk,wxAccount,wxAccountId,categoryt,appId,appsecret,weixinId,url) {
		
		
			var wxCategroy = new Ext.form.ComboBox({
				xtype : 'combo',
				name : 'category',
				id : 'wxleixingJs',
				fieldLabel : '微信号类型',
		
				displayField : 'name',
				valueField : 'value',
				editable : false,
				width : 100,
				mode : 'local',
				triggerAction : 'all',
				store : new Ext.data.SimpleStore({
					fields : [ 'value', 'name' ],
					data : [ [ '1', '服务号' ], [ '2', '订阅号' ] ]
				})
			});
		var wxAccountmsg = new Ext.form.FormPanel({
					id : 'addAccountPanel',
					frame : true,
					border : false,
					labelWidth : 110,
					layout : 'form',
					items : [{
								xtype : 'hidden',
								id : 'pkJs',
								name : 'pk'
							},{
								xtype : 'textfield',
								fieldLabel : '公众号名称',
								allowBlank : false,
								id : 'wxaccountJs',
								name : 'wxaccount',
								width : 200

							}, {

								xtype : 'textfield',
								fieldLabel : '公众号原始id',
								allowBlank : false,
								width : 200,
								name : 'wxaccountId',
								id : 'wxaccountIdJs'
								
							  }, {
								
								xtype : 'textfield',
								fieldLabel : '微信号',
								allowBlank : false,
								width : 200,
								name : 'weixinId',
								id : 'weixinIdJs'
								
							 }, {
								
								xtype : 'textfield',
								fieldLabel : 'url',
								allowBlank : false,
								width : 200,
								name : 'url',
								id : 'urlIdJs'
								
							 }, {
								
								xtype : 'textfield',
								fieldLabel : 'appID',
								allowBlank : false,
								width : 200,
								name : 'appId',
								id : 'appidJs'
								
							 }, {
								xtype : 'textfield',
								fieldLabel : 'appsecret',
								allowBlank : false,
								width : 200,
								name : 'appsecret',
								id : 'appsecretIdJs'
								
							 }, wxCategroy]
				});

		var changesWin = new Ext.Window({
			id : 'addAccountWindow',
			layout : 'fit',
			title : '添加账号',
			buttonAlign : 'center',
			width : 350,
			height : 290,
			closeAction : 'close',
			items : [wxAccountmsg],
			buttons : [{
				text : '确定',
				handler : function() {

					Ext.Ajax.request({
						url : './wxAccount.do',
						params : {
							method : 'editWxAccount',
							pk: Ext.getCmp('pkJs').getValue(),
							wxaccount : Ext.getCmp('wxaccountJs').getValue(),
							wxaccountId : Ext.getCmp('wxaccountIdJs').getValue(),
							weixinId : Ext.getCmp('weixinIdJs').getValue(),
							url : Ext.getCmp('urlIdJs').getValue(),
							appId : Ext.getCmp('appidJs').getValue(),
							appsecret : Ext.getCmp('appsecretIdJs').getValue(),
							category : Ext.getCmp('wxleixingJs').getValue()
						},
						success : function(resp, opts) {
							var data = Ext.util.JSON.decode(resp.responseText);
							if (data.success) {
								Ext.Msg.alert("提示", data.msg);
								Ext.getCmp('addAccountWindow').close();
								Ext.getCmp('topic-Account-grid').getStore().load();
							} else {
								Ext.getCmp('addAccountWindow').show();
							}
						}
					});
				}
			}, {
				text : '取消',
				handler : function() {
					Ext.getCmp('addAccountWindow').close();
				}
			}]
		});

		changesWin.show();
		
		if (null != pk) {
			Ext.getCmp('pkJs').setValue(pk);
			Ext.getCmp('wxaccountJs').setValue(wxAccount);
			Ext.getCmp('wxaccountIdJs').setValue(wxAccountId);
			Ext.getCmp('weixinIdJs').setRawValue(weixinId);
			Ext.getCmp('urlIdJs').setValue(url);
			Ext.getCmp('appidJs').setValue(appId);
			Ext.getCmp('appsecretIdJs').setValue(appsecret);
			Ext.getCmp('wxleixingJs').setValue(categoryt);
		 }
	}
	
 function   delwxAccount(pk){
	Ext.Msg.confirm('提示', '确认删除公众账号?', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : './wxAccount.do?method=delWxAccount&pk=' + pk,
				success : function(response) {
					var ro = Ext.util.JSON.decode(response.responseText);
					if (ro.success) {
						Ext.MessageBox.alert('提示', ro.msg);
						Ext.getCmp('topic-Account-grid').getStore().load();
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

