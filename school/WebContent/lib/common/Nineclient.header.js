/**
 * 头部文件用到的相关js
 × 
 × 修改历史记录：
 * 赵旺 /2011-11-01/修改密码长度为6-16位字符。
 * 赵旺 /2011-10-12/注释掉body隐藏再动态显示的代码，否则对页面响应观察到的效果不好。
 * 赵旺 /2011-10-09/修改页面显示载入时间。
 */
Ext.ns('Nineclient.header');
//document.body.style.visibility = 'hidden';
Ext.r(function() {
//			Ext.get(document.body).fadeIn({
//						duration : .1,
//						useDisplay : true
//					});
			// 禁用右键菜单。
//			document.body.oncontextmenu = function(e) {
//				return false;
//			};
		});
Nineclient.header.frameMenu = function(t) {
	if (t.over) {
		return;
	}
	t.over = true;
	Ext.get(t).frame('055ba5', 1, {
				duration : .2
			});
};

/**
 * 展开菜单。
 */
Nineclient.header.expendMenu = function(pid, callback) {
	Ext.get('iptv-menu-iframe' + pid).slideIn('t', {
				duration : .5,
				remove : false,
				useDisplay : true
			});
	Ext.get('iptv-menu-p' + pid).slideIn('t', {
				duration : .5,
				remove : false,
				useDisplay : true,
				callback : function(t) {
					Nineclient.header.toggleMenu.doing = false;
					Nineclient.header.toggleMenu.prid = pid;
					if (callback != null) {
						callback(pid);
					}
				}
			});
};

/**
 * 合住菜单
 */
Nineclient.header.closeMenu = function(pid, callback) {
	Ext.get('iptv-menu-iframe' + pid).slideOut('t', {
				remove : false,
				duration : .3,
				useDisplay : true
			});
	Ext.get('iptv-menu-p' + pid).slideOut('t', {
				remove : false,
				duration : .3,
				useDisplay : true,
				callback : function(t) {
					Nineclient.header.toggleMenu.doing = false;
					Nineclient.header.toggleMenu.prid = null;
					if (callback != null) {
						callback(pid);
					}
				}
			});
};

/**
 * 菜单的显示，合并操作。 王彬/2011.03.12/添加nextNode和url两个参数 nextNode判断是否出现下级菜单 url点击菜单跳转页面
 */
Nineclient.header.toggleMenu = function(pid) {
	if (Nineclient.header.toggleMenu.doing) {
		return;
	}
	// @modifier zw 20110313 ，使原来的方法调用不受影响，否则影响原有代码调用
	Nineclient.header.toggleMenu.doing = true;
	var prid = Nineclient.header.toggleMenu.prid;
	// 上次记录的ID为空，则直接展开
	if (prid == null) {
		Nineclient.header.expendMenu(pid);
	} else {
		Nineclient.header.closeMenu(prid, function(id) {
					if (prid != pid) {
						Nineclient.header.toggleMenu.doing = true;
						Nineclient.header.expendMenu(pid);
					}
				});
	}

};

/*--------------------------------------OVER 菜单方法完毕。1-------------------------------------- */

Nineclient.header.userWin;
Nineclient.header.showUserWin = function() {
	if (!Nineclient.header.userWin) {
		var UserIdField = new Ext.form.Hidden({
					name : 'userSid'
				});
		var UserNameField = new Ext.form.TextField({
					name : 'userSys',
					fieldLabel : '用　户　名',
					maxLength : 12,
					allowBlank : false,
					blankText : '请输入用户名'
				});
		var UserPasswordOld = new Ext.form.TextField({
					name : 'userSpassOld',
					fieldLabel : '旧　密　码',
					inputType : 'password'
				});
				/**
				 * zhengwen 2011-10-28 增加密码强度判断，修改密码长度提示样式
				 */
		var UserPassword = new Ext.ux.PasswordMeter({
					name : 'userSpass',
					fieldLabel : '新　密　码',
					minLength : 6,
					minLengthText : '长度不低于6位',
					maxLength : 16,
					manLengthText : '长度不高于16位',
					inputType : 'password',
					msgTarget : 'title'
				});

		var UserPassword1 = new Ext.form.TextField({
					id : 'userSpass1',
					fieldLabel : '新密码确认',
					inputType : 'password'
				});

		var UserTitleField = new Ext.form.TextField({
					name : 'userStitle',
					fieldLabel : '职　　　称',
					inputType : 'userTitle'
				});

		var UserTrueNameField = new Ext.form.TextField({
					name : 'trueSname',
					fieldLabel : '真实 姓 名'
				});

		var UserEmailField = new Ext.form.TextField({
					name : 'userSemail',
					fieldLabel : '邮　　　箱',
					regex : /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
					inputType : 'userEmail'
				});

		var UserPhoneField = new Ext.form.TextField({
					regex : /^(\d{11})|^((\d{3,4})\-{0,1}(\d{7,8}))+/,
					name : 'userSehone',
					fieldLabel : '联系 电 话'
				});

		var UserOrgComField = new Ext.form.TextField({
					fieldLabel : '监管 机 构',
					hiddenName : 'sorgId',
					width : 128,
					displayField : 'sorgName'
				});
		var UserRoleManField = new Ext.form.TextField({
					width : 128,
					listWidth : 120,
					fieldLabel : '用户 角 色'
				});
		var UserReticulationIP = new Ext.form.TextField({
					name : 'ipes',
					fieldLabel : '用　户　IP',
					width : 128
				});
		var temOperateLevelCbx = Nineclient.combox.temOperateLevel({
			fieldLabel : '终端优先级',
			hiddenName : 'temOperateLevel',
			width : 128,
			displayField : 'name',
			listWidth : 130
		});
		var la;
		var fp = new Ext.form.FormPanel({
					border : false,
					frame : true,
					items : [{
						layout : 'column',
						defaults : {
							layout : 'form',
							labelWidth : 65,
							border : false,
							baseCls : 'x-plain'
						},
						items : [{
							columnWidth : .5,
							items : [UserIdField, UserNameField,
									UserRoleManField,UserTitleField, UserPhoneField,
									UserEmailField, UserOrgComField, temOperateLevelCbx]
						}, {
							columnWidth : .5,
							items : [UserTrueNameField, 
									UserReticulationIP, UserPasswordOld,
									UserPassword, UserPassword1]
						}]
					}]
				});
		// 判断修改以后的数据是否符合正确格式
		var fpSubmit = function() {
			if (UserNameField.getValue() == ''
					|| UserNameField.getValue() == null) {
				Nineclient.iptv.warning('请输入用户名！');
				return;
			}
			if (UserRoleManField.getValue() == ''
					|| UserRoleManField.getValue() == null) {
				Nineclient.iptv.warning('请选择用户角色！');
				return;
			}
			if (UserPasswordOld.getValue() == ''
					|| UserPasswordOld.getValue() == null) {
				Nineclient.iptv.warning('请填写密码！');
				return;
			}

			if (UserPassword.getRawValue() != UserPassword1.getRawValue()) {
				Nineclient.iptv.warning('两次输入的密码不一样，请重新输入！');
				return;
			}
			if (UserOrgComField.getRawValue() == ''
					|| UserOrgComField.getRawValue() == null) {
				Nineclient.iptv.warning('请选择监管机构！');
				return;
			}

			fp.getForm().submit({
						waitMsg : '正在验证旧密码，请稍候...',
						waitTitle : '请稍候..',
						url : './sysUsers.do?method=updateUsers',
						success : function(form, action) {
							Nineclient.header.userWin.hide();
							la.getStore().reload();
						}
					});
		};
		Nineclient.header.userWin = new Ext.Window({
					frame : true,
					border : false,
					width : 470,
					height : 300,
					title : '修改个人信息',
					layout : 'fit',
					closeAction : 'hide',
					items : [fp],
					buttons : [{
								text : '确定',
								disabled : !Nineclient.iptv.privilege['update'],
								handler : fpSubmit
							}, {
								text : '取消',
								handler : function() {
									Nineclient.header.userWin.hide();
								}
							}]
				});
		// 传递修改以后的数据
		Nineclient.header.userWin.on('beforeshow', function(t) {
					Nineclient.header.userWin.setTitle('修改用户');
					UserPasswordOld.setValue('');
					UserPassword.setValue('');
					UserPassword1.setValue('');
					Ext.Ajax.request({
								url : './sysUsers.do?method=detailUser',
								success : function(resp, option) {
									var array = resp.responseText;
									var obj = Ext.decode(array);
									UserIdField.setValue(obj.userId);
									UserNameField.setValue(obj.userName);
									UserTitleField.setValue(obj.userTitle);
									UserTrueNameField.setValue(obj.trueName);
									UserEmailField.setValue(obj.userEmail);
									UserPhoneField.setValue(obj.userPhone);
									UserRoleManField.setValue(obj.roleName);
									UserOrgComField.setValue(obj.sorgName);
									temOperateLevelCbx.setValue(obj.temOperateLevel.codeText);
									var userIps1 = obj.userIps;
									var ips1 = '';
									if (userIps1 != null && userIps1.length > 0) {
										for (var i = 0; i < userIps1.length; i++) {
											var userIp1 = userIps1[i];
											ips1 += userIp1.startIP + '-'
													+ userIp1.endIP;
											if (i < userIps1.length - 1) {
												ips1 += ',';
											}
										}
										UserReticulationIP.setValue(ips1);
									}
									UserNameField.setDisabled(true);
									UserOrgComField.setDisabled(true);
									UserRoleManField.setDisabled(true);
									UserReticulationIP.setDisabled(true);
									temOperateLevelCbx.setDisabled(true);
								}
							});

				});
	}
	Nineclient.header.userWin.show(document.body);
};
