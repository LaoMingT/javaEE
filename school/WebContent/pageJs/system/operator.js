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
					id : 'topic-Operator-grid',
					width : document.body.clientWidth - 30,
					height : document.body.clientHeight - 30,
					region : 'center',
					viewConfig : {
						forceFit : false,
						autoScroll : true,
						enableRowBody : true,
						showPreview : true,
						getRowClass : function(record, index) {
                             if (record.data.isOnline == 2) {
									return 'row_red';
							 }
						}

					}
				},
				pageSize : 10,
/*				columnCheckBoxCfg : {
					single : false
				},*/
				columns : COLUMN,
				storeCfg : {
					url : './operator.do',
					baseParams : {
						method : 'searchGrid'
					},
					autoLoad : true,
					remoteSort : true,
					listeners : {}
				},
				tbarItems : [{
							text : '添加坐席',
							//hidden : !roles['A_ROLE_ADD'],
							icon : BASE_PATH + '/styles/images/icons/add0.png',
							handler : function() {
			               	  editOperator();
		                	}
						}]

			});


	new Ext.form.FormPanel({
		id : 'operatorIdPanelId',
		renderTo : 'operatorId',
		frame : true,
		border : false,
		labelWidth : 80,
		autoScroll : true,
		width : document.body.clientWidth,
		height : document.body.clientHeight,
		items : [  gridPanel ]
	});
	
});


/**
 * //姓名
	private String userName;
	
	private String account;//账号（用户名,用于登录）
	
	private String password;//登录密码
	
	private int sex;// 1是男，2是女
	
	private int age;//年龄
	private String position;//职称
	
	private String address;////地址
	//联系方式
	private String contact;

	private String whencome;//  入职时间

	private String whengo;// 辞职时间

	private int salary;// 薪水

	private String departmentName;// 所在部门

	private String departmentPk;//所在部门pk
	
	private String rolePk;//所属角色pk
	
	private int isOnline;//是否在线
	
	private String emailUrl;//email 地址
	
	private  int isVisable;//状态  是否启用
	
	private String wxAccountPk;//微信公众账号
 * @type 
 */

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
				+ '" href="javascript:;" onclick="javascript:editOperator( \''
				+ rec.data['pk'] + '\',\''
				+ rec.data['wxAccount'] + '\',\'' 
				+ rec.data['wxAccountDTO'].wxAccount + '\',\'' 
				+ rec.data['rolePk'] + '\',\'' 
				+ rec.data['roleDTO'].roleName + '\',\'' 
				+ rec.data['departmentPk'] + '\',\'' 
				+ rec.data['departmentDTO'].departmentName + '\',\'' 
				+ rec.data['isVisable'] + '\',\'' 
				+ rec.data['account'] + '\',\'' 
				+ rec.data['password'] + '\',\'' 
				+ rec.data['userName'] + '\',\'' 
				+ rec.data['contact'] + '\',\'' 
				+ rec.data['maxChat'] + '\',\'' 
				+ rec.data['emailUrl'] 
				+ '\')" class="edit0">&nbsp;</a>';
		 value += '<a title="删除" href="javascript:;" onclick="javascript:delOperator(\''
													+ rec.data.pk
													+ '\')" class="del0">&nbsp;</a>';

		return value;
	 }
  },{
			id : 'topic',
			header : "客服名",
			align : 'center',
			dataIndex : 'userName',
			width : 150
				// renderer : Forum.Renderers.topic
		}, {
			header : "客服账号",
			dataIndex : 'account',
			align : 'center',
			width : 70
				// align : 'right'
		}, {
			header : "微信公众账号",
			dataIndex : 'wxAccountDTO',
			align : 'center',
			width : 100,
			renderer : function(v, m, rec) {
	        	return rec.data['wxAccountDTO'].wxAccount;
	        }
		}, {
			header : "网络状态",
			dataIndex : 'isOnline',
			width : 70,
			align : 'center',
			renderer : function(v, m, rec) {
			if (v == 1) {
				return '在线';
			} else {
				return '离线';
			}
		}
		}, {
			header : "权限",
			align : 'center',
			dataIndex : 'roleDTO',
			width : 150,
			renderer : function(v, m, rec) {
	        	return rec.data['roleDTO'].roleName;
	        }
		}, {
			header : "手机号码",
			align : 'center',
			dataIndex : 'contact',
			width : 150
				// renderer : Forum.Renderers.lastPost
		}, {
			header : "Email地址",
			align : 'center',
			dataIndex : 'emailUrl',
			width : 150
				// renderer : Forum.Renderers.lastPost
		}, {
			header : "状态",
			dataIndex : 'isVisable',
			width : 70,
			align : 'center',
			renderer : function(v, m, rec) {
			if (v == 1) {
				return '正常';
			} else {
				return '禁用';
			}
		}
		}];



function editOperator(pk, wxAccountPk,wxAccountName, rolePk,roleName,departmentPk,departmentName, active, account,
		password, userName, contact, maxChat,email) {

		openWindow(pk, wxAccountPk,wxAccountName, rolePk,roleName,departmentPk,departmentName, active, account,
		password, userName, contact, maxChat,email);
}



function openWindow(pk, wxAccountPk,wxAccountName, rolePk,roleName, departmentPk,departmentName, active, account,
		password, userName, contact, maxChat,email) {

    alert(maxChat);

	var comwxAccount =  Ext.ux.combox.wxAccount({
		fieldLabel : '公众平台',
		id : 'wxAccountJs',
		width : 145,
		name : 'wxAccount',
		listWidth : 145,
		mode : 'remote'
	});

	var roleCombox = Ext.ux.combox.role({
		fieldLabel : '权限组',
		id : 'rolePkJs',
		width : 145,
		name : 'rolePk',
		listWidth : 145,
		mode : 'remote'
	});
	var departmentCombox = Ext.ux.combox.department({
		fieldLabel : '所属组织',
		id : 'departmentJs',
		width : 145,
		name : 'departmentPk',
		listWidth : 145,
		mode : 'remote'
	});

	var activeRadio = new Ext.form.RadioGroup({
		fieldLabel : '客服状态',
		columns : 2,
		items : [ {
			id : 'active1',
			boxLabel : '　正常',
			name : 'active',
			inputValue : '1',
			checked : active != 2
		}, {
			id : 'active2',
			boxLabel : '　指定',
			boxLabel : '禁用',
			name : 'active',
			inputValue : '2',
			checked : active == 2
		} ]
	});
/*	var operatorCombox = new Ext.ux.ComboBoxTree({ // 组织架构下拉树
		id : 'comTree',
		fieldLabel : '所属组织',
		width : 145,
		tree : {
			xtype : 'treepanel',
			height : 100,
			animate : true,
			rootVisible : false,
			autoScroll : true,
			loader : new Ext.tree.TreeLoader({
				dataUrl : './organization.do?method=searchOrganization',
				baseAttrs : {
					uiProvider : Ext.ux.TreeCheckNodeUI({
						checkModel : 'single'
					})
				}
			}),
			root : new Ext.tree.AsyncTreeNode({
				id : -1,
				text : 'root',
				expanded : true
			}),
			listeners : {
				click : function(n) {
					Ext.getCmp('organizationPkJs').setValue(n.id);
				}
			}
		}
	});*/

	var form = new Ext.form.FormPanel({
		id : 'operForm',
		frame : true,
		border : false,
		labelWidth : 50,
		items : [ {
			xtype : 'fieldset',
			title : '基本设置',
			autoHeight : true,
			labelWidth : 80,
			layout : 'form',
			items : [ {
				xtype : 'panel',
				layout : 'column',
				items : [
						{
							xtype : 'panel',
							layout : 'form',
							columnWidth : 0.5,
							items : [ {
								xtype : 'hidden',
								id : 'pkJs',
								name : 'pk'
							}, {
								xtype : 'textfield',
								name : 'account',
								id : 'accountJs',
								fieldLabel : '客服账号',
								regex : /^[a-zA-Z0-9_@\.]{1,}$/,
								regexText : "只能输入字母数字._@",
								maxLength : 30,
								allowBlank : false
							}, {
								xtype : 'textfield',
								name : 'password',
								id : "PasswordJs",
								fieldLabel : '密码',
								minLength : 6,
								maxLength : 32,
								inputType : 'password'
							}, {
								xtype : 'textfield',
								name : 'password1',
								id : "Password1Js",
								fieldLabel : '重复密码',
								minLength : 6,
								maxLength : 32,
								inputType : 'password'
							}, new Ext.form.Hidden( // hidden
							{
								id : 'organizationPkJs',
								name : 'organizationPk'
							}), departmentCombox, roleCombox, {
								xtype : 'textfield',
								name : 'mobile',
								id : 'mobileJs',
								fieldLabel : '手机号码',
								regex : /^1[0-9]{10}$/,
								regexText : "手机号码格式不符",
								maxLength : 20,
								allowBlank : true
							} ]
						},
						{
							xtype : 'panel',
							layout : 'form',
							labelWidth : 100,
							columnWidth : 0.5,
							items : [ {
								xtype : 'textfield',
								name : 'name',
								id : 'nameJs',
								fieldLabel : '客服名',
								regex : /^[0-9a-zA-Z_@.\u4e00-\u9fa5]+$/,
								regexText : "只能输入字母、汉字、数字、下划线._@",
								maxLength : 30,
								allowBlank : false
							}, comwxAccount,{
										xtype : 'textfield',
										id : 'emailJs',
										name : 'email',
										vtype : 'email',
										fieldLabel : '电子邮件'
									}, activeRadio, {
										xtype : 'textfield',
										id : 'maxChatJs',
										name : 'maxChat',
										fieldLabel : '最大分配',
										allowDecimals : false,
										allowNegative : false,
										regex : /^([0-9])/,
										value : 0,
										regexText : "最大分配格式不符",
										maxValue : 100,
										allowBlank : false
									} ]
						} ]
			} ]
		} ]
	});
	new Ext.Window({
		id : 'operWinId',
		layout : 'fit',
		buttonAlign : 'center',
		width : 600,
		height : 300,
		closeAction : 'close',
		items : [ form ],
		buttons : [
				{
					text : '确定',
					handler : function() {
						
						saveOperator(activeRadio.getValue().inputValue,
								Ext.getCmp('maxChatJs').getValue(), Ext
										.get('departmentJs').getValue(), Ext
										.get('wxAccountJs').getValue());
					}
				}, {
					text : '取消',
					handler : function() {
						Ext.getCmp('operWinId').close();
					}
				} ]
	});
	Ext.getCmp('operWinId').show();
	if (null != pk) {
		Ext.getCmp('pkJs').setValue(pk);
		Ext.getCmp('nameJs').setValue(userName);
		Ext.getCmp('accountJs').setValue(account);
		
		Ext.getCmp('emailJs').setValue(email);
		Ext.getCmp('rolePkJs').setValue(rolePk);
		Ext.getCmp('rolePkJs').setRawValue(roleName);
		Ext.getCmp('maxChatJs').setValue(maxChat);
		Ext.getCmp('mobileJs').setValue(contact);
		
		Ext.getCmp('departmentJs').setValue(departmentPk);
		Ext.getCmp('departmentJs').setRawValue(departmentName);
		Ext.getCmp('wxAccountJs').setValue(wxAccountPk);
		Ext.getCmp('wxAccountJs').setRawValue(wxAccountName);
		//Ext.getCmp('rolePkJs').setValue(rolePk);
		
	}
}

function saveOperator(active, maxChat,
		departmentPk, wxAccount) {
	if (Ext.getCmp('accountJs').getValue() == "") {
		Ext.Msg.alert("错误", "账号不能为空！");
		return false;
	}
	if (Ext.getCmp('nameJs').getValue() == "") {
		Ext.Msg.alert("错误", "名称不能为空！");
		return false;
	}
	if (Ext.get("pkJs").getValue() == ""
			&& Ext.get("PasswordJs").getValue() == "") {
		Ext.Msg.alert("错误", "密码不能为空！");
		return false;
	}
	if (Ext.get("pkJs").getValue() == ""
			&& Ext.get("Password1Js").getValue() == "") {
		Ext.Msg.alert("错误", "重复密码不能为空！");
		return false;
	}
	if (Ext.get("PasswordJs").getValue() != Ext.get("Password1Js").getValue()) {
		Ext.Msg.alert("错误", "密码和重复密码不一致！");
		return false;
	}

	Ext.Ajax.request({
		url : './operator.do',
		params : {
			method : 'editUserStaff',
			pk : Ext.getCmp('pkJs').getValue(),
			account : Ext.getCmp('accountJs').getValue(),
			name : Ext.getCmp('nameJs').getValue(),
			password : Ext.getCmp('PasswordJs').getValue(),
			emailUrl : Ext.getCmp('emailJs').getValue(),
			rolePk : Ext.getCmp('rolePkJs').getValue(),
			isVisable : active,
			contact : Ext.getCmp('mobileJs').getValue(),
			maxChat : maxChat,
			department : departmentPk,
			wxAccount : wxAccount
		},
		success : function(resp, option) {
			var data = Ext.util.JSON.decode(resp.responseText);
			if (data.success) {
				Ext.Msg.alert("提示", data.msg);
				Ext.getCmp('topic-Operator-grid').getStore().load();
				Ext.getCmp('operWinId').close();
			} else {
				Ext.Msg.alert("提示", data.msg);
			}

		}

	});
};

function delOperator(pk) {
	Ext.Msg.confirm('提示', '确认删除该坐席?', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : './operator.do?method=delOper&pk=' + pk,
				success : function(response) {
					var ro = Ext.util.JSON.decode(response.responseText);
					if (ro.success) {
						Ext.MessageBox.alert('提示', ro.msg);
						Ext.getCmp('topic-Operator-grid').getStore().load();
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
