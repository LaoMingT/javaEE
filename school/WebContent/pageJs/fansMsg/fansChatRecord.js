Ext.r(function() {

			var gridPanel = new Ext.ux.GridPanel({
						gridCfg : {
							id : 'topic-grid',
							width : document.body.clientWidth - 30,
							height : 520,
							region : 'center',
							viewConfig : {
								forceFit : false,
								autoScroll : true,
								getRowClass : function(record, index) {}
							}
						},
						pageSize : 20,
						columnCheckBoxCfg : {
							single : false
						},
						columns : COLUMN,
						storeCfg : {
							url : './fansChatRecord.do',
							baseParams : {
								method : 'searchGrid'
							},
							autoLoad : true,
							remoteSort : true,
							listeners : {}
						},
			        	tbarItems : [{
							text : '批量筛选问题',
							icon : BASE_PATH + '/styles/images/icons/transfer.gif',
							handler : function() {
								editCom();
							}
						}]

					});

			new Ext.form.FormPanel({
						id : 'fansChatReordFormId',
						renderTo : 'FansChatRecordId',
						frame : true,
						border : false,
						labelWidth : 80,
						autoScroll : true,
						width : document.body.clientWidth,
						height : document.body.clientHeight,
						items : [{
									xtype : 'fieldset',
									title : '查询条件',
									collapsible : true,
									collapsed : true,
									height : 220,
									width : document.body.clientWidth - 30,
									buttonAlign : 'center',
									buttons : [{
												text : '查询',
												style : 'margin-bottom: 5px;',
												handler : function(t) {
													askQuery();
												}
											}, {
												text : '重置',
												style : 'margin-bottom: 5px;',
												handler : function(t) {
													resetReset();
												}
											}],
									items : [
											/*
											 * { xtype : 'panel', layout :
											 * 'column', items : [ { xtype :
											 * 'panel', layout : 'form',
											 * columnWidth : 0.3, items : [
											 * brandCombox ] }, { xtype :
											 * 'panel', layout : 'form',
											 * labelWidth : 100, columnWidth :
											 * 0.3, items : [ platformCombox ] }, {
											 * xtype : 'panel', layout : 'form',
											 * columnWidth : 0.3, items : [
											 * comAccount ] } ] },
											 */
											{
										xtype : 'panel',
										layout : 'column',
										items : [{
													xtype : 'panel',
													layout : 'form',
													columnWidth : 0.3,
													items : [{
																xtype : 'textfield',
																name : 'nickName',
																width : 145,
																id : 'nickNameJs',
																fieldLabel : '昵称'
															}]
												}, {
													xtype : 'panel',
													layout : 'form',
													columnWidth : 0.3,
													labelWidth : 100,
													items : [{
																xtype : 'textfield',
																name : 'sex',
																width : 145,
																id : 'sexJx',
																fieldLabel : '性别'
															}]
												},
												{
													xtype : 'panel',
													layout : 'form',
													columnWidth : 0.3,
													items : [{
																xtype : 'textfield',
																name : 'hhhh',
																width : 145,
																id : 'cehngshi',
																fieldLabel : '城市'
															}]
												}]
									}]
								}, gridPanel]
					});
					

});


var COLUMN = [{
	header : '筛选',
	width : 50,
	align : 'center',
	sortable : true,
	renderer : function(v, m, rec) {
		/**
		 * 
		 */
		var value = '<a title="筛选" id="a-reply-' + rec.data['openid']
				+ '" href="javascript:;" onclick="javascript:chatwin( \''
				+ rec.data['pk']
				+ '\')"><img src="./styles/images/icons/transfer.gif"/></a>';
         
		return value;
	}
},{
	header : "粉丝",
	dataIndex : 'fansDTO',
	width : 100,
	renderer : function(v, m, rec) {
		return rec.data['fansDTO'].nickname;
	}
},{
	header : "发送内容",
	dataIndex : 'content',
	width : 100
}];



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

function loadChatRecord(operator,pk,openid){
	
	
	//alert(insertChatTime);
	

	Ext.Ajax.request({
		url : './fansMessage.do',
		params : {
			method : 'getChatRecordList',
			fansOpenId:openid,
			insertTime:insertChatTime
		},
		success : function(resp, option) {
			
			  var   message=resp.responseText;
			   showChatmsg(message,operator,pk);
		}

	});
	setTimeout(function() {
		loadChatRecord(operator,pk,openid);
	}, 2000);	
}
