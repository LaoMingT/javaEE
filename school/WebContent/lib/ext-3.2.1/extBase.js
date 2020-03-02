/**
 * Ext 基本属性定义文件。统一应用
 */
var BASE_PATH = BASE_PATH == null ? 'weibo_web' : BASE_PATH;
// 空图片路径
Ext.BLANK_IMAGE_URL = BASE_PATH
		+ '/lib/ext-3.2.1/resources/images/default/s.gif';
// 对 onready 的简化
Ext.r = Ext.onReady;
// 提示
Ext.QuickTips.init(true);
// 设置提示框最小的宽度
Ext.MessageBox.minWidth = 200;
// 修正时间菜单宽度过窄问题。
// Ext.menu.DateMenu.prototype.width = 180;
// grid 的读取遮盖默认开启
Ext.grid.GridPanel.prototype.loadMask = true;
// 默认窗体不能拖到浏览器外
Ext.Window.prototype.constrain = true;
// 默认窗体遮盖
Ext.Window.prototype.modal = true;
// 默认窗体大小不可变
Ext.Window.prototype.resizable = false;
// 全局参数设置
Ext.data.Connection.prototype.timeout = 99999999;
// 默认显示翻页信息
Ext.PagingToolbar.prototype.displayInfo = true;
// 默认使用POST请求
Ext.data.Connection.prototype.method = 'POST';
// 解决系统冲突。
Ext.grid.RowExpander = Ext.ux.grid.RowExpander;
// 覆写 默认 render，实现 - 默认显示。
Ext.grid.ColumnModel.defaultRenderer = function(value) {
	if (typeof value == "string" && value.length < 1) {
		return "&#160;-&#160;";
	}
	return value;
};
// 扩展长度。
Ext.PagingToolbar.prototype.render = Ext.PagingToolbar.prototype.render
		.createSequence(function() {
					this.inputItem.allowNegative = false;
					this.inputItem.setWidth(40);
					this.inputItem.minValue = 1;
					this.inputItem.maxLength = 8;
					this.inputItem.maxValue = 99999999;
				});
// 禁止EXT所有组件的右键系统菜单。
Ext.Component.prototype.render = Ext.Component.prototype.render.createSequence(
		function() {
			if (!this.hasListener('contextmenu')) {
				this.relayEvents(this.el, ['contextmenu']);
			}
			this.on('contextmenu', function(e) {
						try {
							e.preventDefault();
						} catch (e) {
						}
					});
		});

// 修改EXT源码以修正翻页问题。
Ext.data.Store.prototype.load = function(options) {
	options = Ext.apply({}, options);
	this.storeOptions(options);
	var pn = this.paramNames;

	options.params = options.params || {
		start : 0
	};
	if (this.sortInfo && this.remoteSort) {
		options.params = Ext.apply({}, options.params);
		options.params[pn.sort] = this.sortInfo.field;
		options.params[pn.dir] = this.sortInfo.direction;
	}
	try {
		return this.execute('read', null, options);
	} catch (e) {
		this.handleException(e);
		return false;
	}
};

/**
 * 异步请求时出现异常处理
 */
Ext.Ajax.on('requestexception', function(conn, response, options) {
			var html = response.responseText;
			// 异常处理
			if (html == null) {
				Ext.tip.msg('错误', '<span style="color: red">服务器没有响应！</span>');
				return;
			}
			var reg = new RegExp(/<span id="error-page-log-info".*>.*<\/span>/);
			if (reg.test(html)) {
				Ext.tip.msg('异常', html.match(reg).toString());
				html = html.match(reg).toString();
				return;
			}
			// 
			if (/Error report/img.test(html)) {
				Ext.tip.msg('服务器异常',
						'<span style="color: red">服务器异常，请联系管理员！</span>');
				return;
			};
			// 如果为json，解码并进行正常提示。
			reg = new RegExp(/\{.*\}/);
			if (reg.test(html)) {
				var o = Ext.decode(html);
				if (o.success === false) {
					Ext.tip.msg('提示', o.msg || '操作失败！');
				}
				return;
			}
		});

/**
 * 异步请求时正常情况处理
 */
Ext.Ajax.on('requestcomplete', function(conn, response, options) {
	var html = response.responseText;
	if (html == null) {
		Ext.tip.msg('错误', '<span style="color: red">服务器没有响应！</span>');
		return;
	}
	// 登录页面检测
	var reg = new RegExp(/<form id="loginForm" .*?>/);
	if (reg.test(html)) {
		response.responseText = '<span style="color: red;">登录超时，即将转到登录页面！</span>';
		Ext.tip.msg('提示', '<span style="color: red;">登录超时，即将转到登录页面！</span>',
				function() {
					window.location.reload(true);
				});
		return;
	}

	// 如果为json，解码并进行正常提示。
	reg = new RegExp(/^\{.*\}$/im);
	if (reg.test(html)) {
		var o = Ext.decode(html);
		if (o.success === true) {
			Ext.tip.msg('提示', o.msg || '操作成功！');
		} else if (o.success === false) {
			Ext.tip.msg('提示', o.msg || '操作失败！');
		}
		return;
	}
});
