var la;

    window.onbeforeunload = onbeforeunload_handler;  
  //  window.onunload = onunload_handler;  
    function onbeforeunload_handler(){

        var warning="确认退出?";    
        
       Ext.Ajax.request({
							url : './home.do',
							params : {
								method : 'offline'
							},
							success : function(resp, option) {
								var data = Ext.util.JSON
										.decode(resp.responseText);
								return data.msg;  
							}
						});
		return warning;
        
    }  
       

Ext
		.r(function() {
			var modules = Ext.util.JSON.decode(module);
			la = new Ext.ux.Layout({
				renderId : 'layoutRender',
				// 业务模块的参数
				businessCfg : {
					autoLoad : 'welcome.jsp',
					items : [ {
						title : '首页'
					} ]
				},
				moduleCfg : {
					items : modules
				}
			});
			for ( var i = 0; i < modules.length; i++) {
				var m = modules[i];
				var _key = m.moduleId;
				var treePanel = new Ext.ux.TreePanel(
						{
							treeCfg : {
								renderTo : 'module' + _key,
								id : 'treeModule' + _key,
								listeners : {
									'click' : {
										fn : function(node, e) {

											if (null != node.attributes.srcObj
													&& null != node.attributes.srcObj.url
													&& '' != node.attributes.srcObj.url) {
												addTabPanel(node);
											}
										}
									}
								}
							},
							treeObjCfg : {
								url : './common.do',
								params : {
									method : 'treeModule'
								},
								rootText : '全部',
								rootId : _key,
								rootVisible : false
							}
						});
				Ext.getCmp('treeModule' + _key).on('load',function(node) {
									if (null != node.attributes.srcObj
											&& null != node.attributes.srcObj.image
											&& '' != node.attributes.srcObj.image) {
										node.getUI().getIconEl().src = node.attributes.srcObj.image;
									}
								});
				treePanel.expandAll();
			}
		});
/**
 * 点击菜单添加tab页
 * 
 * @param node
 * @return
 */
function addTabPanel(node) {
	var n;
	var tabPanel = la.businessPanel;
	n = tabPanel.getComponent(node.id);
	if (n) {
		tabPanel.setActiveTab(n);
		return;
	}
	var object = node.attributes.srcObj;
	var url = object.url + '?key=' + node.id;
	// 每个业务页面只要写这个方法即可
	n = tabPanel
			.add({
				id : node.id,
				title : node.text,
				autoScroll : true,
				height : document.body.clientHeight - 85,
				html : '<iframe width="100%" height="100%" scrolling="auto" frameborder="0" src="'
						+ url + '" />',
				closable : 'true'
			});
	tabPanel.setActiveTab(n);

};
exit = function() {
	Ext.Msg.confirm('提示', '确定要退出系统吗？', function(m) {
		if (m == 'yes') {
			Ext.getBody().switchOff({
				duration : .5,
				remove : false,
				callback : function() {
					document.body.innerHTML = '';
					location.href = './login.do?method=doLogout';
				}
			});
		}
	});
};
editPassWord = function(pk, account, name) {
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
				xtype : 'hidden',
				id : 'pkJs',
				name : 'pk',
				value : pk
			}, {
				xtype : 'textfield',
				name : 'account',
				id : 'accountJs',
				fieldLabel : '客服账号',
				maxLength : 30,
				value : account,
				disabled : true
			}, {
				xtype : 'textfield',
				name : 'name',
				id : 'nameJs',
				fieldLabel : '客服名',
				regex : /^[0-9a-zA-Z_@.\u4e00-\u9fa5]+$/,
				regexText : "只能输入字母、汉字、数字、下划线._@",
				maxLength : 30,
				allowBlank : false,
				value : name
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
			} ]
		} ]
	});
	new Ext.Window({
		id : 'userWinId',
		layout : 'fit',
		buttonAlign : 'center',
		width : 300,
		height : 300,
		closeAction : 'close',
		items : [ form ],
		buttons : [
				{
					text : '确定',
					handler : function() {
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
						if (Ext.get("PasswordJs").getValue() != Ext.get(
								"Password1Js").getValue()) {
							Ext.Msg.alert("错误", "密码和重复密码不一致！");
							return false;
						}

						Ext.Ajax.request({
							url : './operator.do',
							params : {
								method : 'saveOrEditOperator',
								pk : Ext.getCmp('pkJs').getValue(),
								account : Ext.getCmp('accountJs').getValue(),
								name : Ext.getCmp('nameJs').getValue(),
								password : Ext.getCmp('PasswordJs').getValue()
							},
							success : function(resp, option) {
								var data = Ext.util.JSON
										.decode(resp.responseText);
								if (data.success) {
									if(Ext.getCmp('PasswordJs').getValue()!=''){
										Ext.getBody().switchOff({
											duration : .5,
											remove : false,
											callback : function() {
												document.body.innerHTML = '';
												location.href = './login.do?method=doLogout';
											}
										});
									}else{
										Ext.Msg.alert("提示", data.msg);
									}
									Ext.getCmp('userWinId').close();
								} else {
									Ext.Msg.alert("提示", data.msg);
								}

							}

						});
					}
				}, {
					text : '取消',
					handler : function() {
						Ext.getCmp('userWinId').close();
					}
				} ]
	});
	Ext.getCmp('userWinId').show();
};