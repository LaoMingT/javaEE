/**
 * 紫光软件系统有限公司广电事业部 Copyright (C): 2010
 * 
 * 文件名称： Nineclient.talk.js
 * 
 * 文件描述: talk系统公用的JS文件。
 * 
 * Notes: 修改历史(作者/日期/改动描述): 赵旺/2010.08.11/初始化。
 */
var Nineclient = {
	version : 1.0
};
Nineclient.info = 'talk项目通用JS组件包';
Ext.namespace('Nineclient.talk');

/**
 * 公共的提示功能。
 * 
 * @param {String}
 *            msg 提示的消息字符串
 * @param {String}
 *            id 用于定位的元素的id，可以为空，如果为空， 则默认为alignPoint（如果页面中存在的话）。
 */
Nineclient.talk.warning = function(msg, id) {
	var win = Ext.MessageBox;
	var alignPointId = 'alignPoint';
	if (id != undefined || $(alignPointId)) {
		win.getDialog().on({
					show : function(dlg) {
						dlg.alignTo(id ? id : alignPointId, 't-b');
					}
				});
	}

	win.show({
				title : '提示',
				msg : msg,
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING
			});
};

/**
 * 打开进度条窗口。
 * 
 * @param {String}
 *            msg 提示的消息字符串，可以为空
 * @param {String}
 *            id 用于定位的元素的id，可以为空，如果为空， 则默认为alignPoint（如果页面中存在的话）。
 */
Nineclient.talk.progress = function(msg, id) {
	var win = Ext.MessageBox;
	var alignPointId = 'alignPoint';
	if (id != undefined || $(alignPointId)) {
		win.getDialog().on({
					show : function(dlg) {
						dlg.alignTo(id ? id : alignPointId, 't-b');
					}
				});
	}

	win.show({
				msg : msg ? msg : '正在处理中，请稍等...',
				progressText : '处理中...',
				width : 300,
				wait : true
			});
};

/**
 * 隐藏搜索框的公共方法
 * 
 * @param {String}
 *            searchFormId 搜索框的ID
 * @param {String}
 *            toggleId 切换搜索框显示和隐藏的图片ID
 */
Nineclient.talk.toggleSearchForm = function(searchFormId, toggleId) {
	var searchForm = Ext.get(searchFormId);;
	var toggle = $(toggleId);
	if (!searchForm.isVisible()) {
		searchForm.slideIn('t', {
					easing : 'easeOut'
				});
		toggle.src = './images/Hidden.gif';
		toggle.title = '隐藏查询条件';
	} else {
		searchForm.slideOut('t', {
					easing : 'easeOut',
					remove : false,
					useDisplay : true
				});
		toggle.src = './images/Show.gif';
		toggle.title = '显示查询条件';
	}
};

/**
 * talk校验方法
 * 
 * @type
 */
Nineclient.talk.Validator = {

	/**
	 * 验证是否是URL
	 * 
	 * @param {String}
	 *            value 要验证的字符串
	 * @return {boolean} 是返回true 否则fasle
	 */
	validateUrl : function(value) {
		var urlRegexp = new RegExp('[a-zA-z]+[^s]*');
		return urlRegexp.test(value);
	},

	/**
	 * 验证是否是非空白字符窜
	 * 
	 * @param {String}
	 *            value 要验证的字符串
	 * @return {boolean} 是返回true 否则fasle
	 */
	isNullStr : function(value) {
		return /^\s*$/g.test(value);
	},

	/**
	 * 验证是否是Ip
	 * 
	 * @param {String}
	 *            value 要验证的字符串
	 * @return {boolean} 是返回true 否则fasle
	 */
	validateIp : function(value) {
		var pattern = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
		return pattern.test(value);
	},

	/**
	 * 验证是否是正整数
	 * 
	 * @param {String}
	 *            value 要验证的数字
	 * @return {boolean} 是返回true 否则fasle
	 */
	isPositiveInteger : function(value) {
		return /^\d+$/.test(value);
	},

	/**
	 * 验证是否是email
	 * 
	 * @param {String}
	 *            value 字符串
	 * @return {boolean} 是返回true 否则fasle
	 */
	isEmail : function(value) {
		var pattern = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
		return pattern.test(value);
	}
};

/**
 * 替换面板内容 url: 目标地址 par: 访问参数 renderId: 面板ID
 */
Nineclient.talk.refreshDiv = function(url, pars, renderId) {
	Ext.Ajax.request({
				url : encodeURI(url),
				params : pars,
				success : function(resp, option) {
					Ext.get(renderId).dom.innerHTML = resp.responseText;
				},
				failure : function(resp, option) {
				}
			});
};

/**
 * 在新的窗口打开一个页面
 * 
 * @return 打开新页面
 */
Nineclient.talk.openNewWin = function(url, width, height) {
	var paramStr = '';
	if (width != null && height != null) {
		paramStr = 'width=' + width + ',height=' + height + ',';
	}
	paramStr += 'center=1,status=no,location=0,top=264,left=264,top=254,resizable=no';

	var title = 'new';
	window.open(url, title, paramStr);
};

/**
 * 时间格式转换（将时：分：秒 的格式换成秒数转 ）
 * 
 * @param {String}
 *            value 时：分：秒
 * @return {Number} 秒数
 */
Nineclient.talk.timeFormater = function(value) {
	var time = value.split(':');
	var hour = time[0];
	var minute = time[1];
	var second = time[2];

	var hourFmt = parseInt(hour) * 3600;
	var minuteFmt = parseInt(minute) * 60;
	var timeFmt = hourFmt + minuteFmt + parseInt(second);
	return timeFmt;
};

/**
 * 是否状态Renderer
 * 
 * @return {String} 是否状态
 */
Nineclient.talk.yesOrNoRenderer = function(value, p, record) {
	if (value) {
		return '<font color=\"#088A08\">是</font>';
	} else {
		return '<font color=\"#FF0000\">否</font>';
	}
};

/**
 * 是否为空字段
 */
Nineclient.talk.nullRenderer = function(value) {
	if (value) {
		return value;
	} else {
		return '<font color=\"#FF0000\">-</font>';
	}
};

Nineclient.talk.slideIn = function(el) {
	Ext.get(el).fadeIn({
				duration : 2.5
			});
};

/**
 * 没有权限的提示信息。
 */
Nineclient.talk.noPrivilege = function() {
	Ext.tip.msg('提示', '<span style="color: red;">您没有权限操作此模块！</span>');
};

/**
 * 退出系统
 */
Nineclient.talk.exit = function() {
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