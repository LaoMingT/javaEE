/**
 * 使用正则表达式匹配 text 判断类型，进一步进行权限控制。
 * 
 * @王帅
 */
Ext.ns('Nineclient.privilege');
var PRIVILEGE_REGEX = {
	'insert' : /^\s?(添加|保存|新增)/ig,
	'update' : /^\s?(编辑|修改)/ig,
	'delete' : /^\s?(删除)/ig,
	'audit1' : /^\s?(一审)/ig,
	'audit2' : /^\s?(二审)/ig,
	'follow' : /^\s?(跟踪)/ig,
	'offlin' : /^\s?(下线)/ig
};
Nineclient.privilege.sequence = function() {
	if (!this.text) {
		return;
	}
	// 正则
	var r = PRIVILEGE_REGEX, p = Nineclient.talk.privilege, t = this.text.toString();
	for (var e in p) {
		// 是否有该正则是否有权限
		var rv = r[e], pv = p[e];;
		// 匹配成功，设置disabled.
		if (rv != null && t.search(rv) == 0 && !pv) {
			this.disabled = true;
		}
	}
};

/**
 * 统一按照权限禁用按钮。
 */
Ext.Button.prototype.initComponent = Ext.Button.prototype.initComponent
		.createSequence(Nineclient.privilege.sequence);
/**
 * 统一按照权限禁用菜单按钮。
 */
Ext.menu.BaseItem.prototype.initComponent = Ext.menu.BaseItem.prototype.initComponent
		.createSequence(Nineclient.privilege.sequence);