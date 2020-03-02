// var atmyreviewreply = Ext.util.JSON.decode(atmyreviewreply);

// var caches = Ext.util.JSON.decode(cache);

var insertChatTime='';

var state="listen";

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
								enableRowBody : true,
								showPreview : true,
								getRowClass : function(record, index) {
									// 48内交互过的粉丝标记为红色
									if (record.data.isltFortyEight == 1) {
										return 'row_red';
									}
								}

							}
						},
						pageSize : 20,
						columnCheckBoxCfg : {
							single : false
						},
						columns : COLUMN,
						storeCfg : {
							url : './fansCancel.do',
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
									text : '群发信息',
									tooltip : {
										title : '群发信息',
										text : '选取用户，群发信息'
									},
									iconCls : 'summary',
									handler : toggleDetails
								}]

					});

			new Ext.form.FormPanel({
						id : 'FansCancelFormId',
						renderTo : 'FansCancelId',
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

/**
 * `wx_account_pk` varchar(50) DEFAULT NULL COMMENT '对应是哪个微信账号的', `subscribe`
 * int(11) NOT NULL DEFAULT '0' COMMENT
 * '用户是否订阅该公众号标识，值为0时，代表此用户没有关注该公众号，拉取不到其余信息。', `openid` varchar(50) DEFAULT
 * NULL COMMENT '用户的标识，对当前公众号唯一 ', `nickname` varchar(50) DEFAULT NULL COMMENT
 * '用户的昵称 ', `sex` int(11) DEFAULT '0' COMMENT '用户的性别，值为1时是男性，值为2时是女性，值为0时是未知 ',
 * `city` varchar(30) DEFAULT NULL COMMENT '用户所在城市', `country` varchar(15)
 * DEFAULT NULL COMMENT '用户所在国家', `province` varchar(11) DEFAULT NULL,
 * `language` varchar(11) DEFAULT NULL, `headimgurl` varchar(150) DEFAULT NULL
 * COMMENT
 * '用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空 ',
 * `subscribe_time` varchar(50) DEFAULT NULL COMMENT
 * '用户关注时间，为时间戳。如果用户曾多次关注，则取最后关注时间',
 * 
 * @type
 */
var COLUMN = [{
	header : "微信公众账号",
	dataIndex : 'wxAccountDTO',
	width : 100,
	renderer : function(v, m, rec) {
		return rec.data['wxAccountDTO'].wxAccount;
	}
}, {
	id : 'groupid',
	header : "所在分组",
	dataIndex : 'groupdDTO',
	width : 100,
	renderer : function(v, m, rec) {
		return rec.data['groupdDTO'].groupname;
	}
}/*, {
	id : 'openid_',
	header : "粉丝标识",
	dataIndex : 'openid',
	width : 100
		// renderer : Forum.Renderers.topic
	}*/, {
	header : "昵称",
	dataIndex : 'nickname',
	width : 100
		// align : 'right'
	}, {
	id : 'sex_',
	header : "性别",
	dataIndex : 'sex',
	width : 100,
	sortable : true,
	renderer : function(v, m, rec) {
		if (v == 1) {
			return '男';
		} else if (v == 2) {
			return '女';
		}
	}
}, {
	id : 'country_',
	header : "所在国家",
	dataIndex : 'country',
	width : 100
}, {
	id : 'province_',
	header : "所在省",
	dataIndex : 'province',
	width : 100
}, {
	id : 'city_',
	header : "所在城市",
	dataIndex : 'city',
	width : 100
}, {
	id : 'cancel_time_',
	header : "用户取消关注时间",
	dataIndex : 'cancelTime',
	width : 200,
	renderer : function(v, m, rec) {
					
			if (v.time == null) {
			   return '';
		    }
		   return josn_to_String(v.time);
					
	}
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
