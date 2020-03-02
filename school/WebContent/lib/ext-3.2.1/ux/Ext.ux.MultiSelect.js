Ext.ns('Ext.ux.MultiSelect');
// 自动加载。
Ext.data.JsonStore.prototype.autoLoad = true;
Ext.ux.MultiSelect.cfg = {
	editable : false,
	mode : 'local',
	triggerAction : 'all',
	emptyText : '请选择',
	width : 145, // 默认宽
	listWidth : 145, // 默认高
	beforeBlur : function() {
	}

};

/**
 * 平台
 */
Ext.ux.MultiSelect.platform = function(/* String */cfg, /* Object */params) {
	var ds = new Ext.data.JsonStore(Ext.apply({
		url : './common.do',
		autoLoad : true,
		baseParams : {
			method : 'comboxPlatformList'
		},
		reader : new Ext.data.JsonReader({}, [ 'pk', 'name' ])

	}, params));

	cfg = Ext.apply(Ext.ux.MultiSelect.cfg, cfg, {
		autoLoad : true,
		valueField : 'pk', // 值字段，
		displayField : 'name' ,// 显示字段,
		store : ds
	});
	var cb = new Ext.form.MultiSelect(cfg); // 注意 new 出来的代码一定要 return
	return cb;
};

/**
 * 品牌
 */
Ext.ux.MultiSelect.brand = function(/* String */cfg, /* Object */params) {
	var ds = new Ext.data.JsonStore(Ext.apply({
		url : './common.do',
		autoLoad : true,
		baseParams : {
			method : 'comboxBrandList'
		},
		reader : new Ext.data.JsonReader({}, [ 'pk', 'name' ])

	}, params));

	cfg = Ext.apply(Ext.ux.MultiSelect.cfg, cfg, {
		valueField : 'pk', // 值字段，
		displayField : 'name', // 显示字段,
		autoLoad : true,
		store : ds
	});
	var cb = new Ext.form.MultiSelect(cfg); // 注意 new 出来的代码一定要 return
	return cb;
};

/**
 * 账号
 */
Ext.ux.MultiSelect.account = function(/* String */cfg, /* Object */params) {
	var ds = new Ext.data.JsonStore(Ext.apply({
		url : './common.do',
		autoLoad : true,
		baseParams : {
			method : 'comboxAccountList'
		},
		reader : new Ext.data.JsonReader({}, [ 'pk', 'weiboAccount' ])

	}, params));

	cfg = Ext.apply(Ext.ux.MultiSelect.cfg, cfg, {
		valueField : 'pk', // 值字段，
		displayField : 'weiboAccount', // 显示字段,
		autoLoad : true,
		store : ds
	});
	var cb = new Ext.form.MultiSelect(cfg); // 注意 new 出来的代码一定要 return
	return cb;
};
/**
 * 业务分类
 */
Ext.ux.MultiSelect.department = function(/* String */cfg, /* Object */params) {
	var ds = new Ext.data.JsonStore(Ext.apply({
		url : './common.do',
		autoLoad : true,
		baseParams : {
			method : 'comboxDepartmentList'
		},
		reader : new Ext.data.JsonReader({}, [ 'pk', 'name' ])

	}, params));

	cfg = Ext.apply(Ext.ux.MultiSelect.cfg, cfg, {
		valueField : 'pk', // 值字段，
		displayField : 'name', // 显示字段,
		autoLoad : true,
		store : ds
	});
	var cb = new Ext.form.MultiSelect(cfg); // 注意 new 出来的代码一定要 return
	return cb;
};
/**
 * 坐席
 */
Ext.ux.MultiSelect.operator = function(/* String */cfg, /* Object */params) {
	var ds = new Ext.data.JsonStore(Ext.apply({
		url : './common.do',
		autoLoad : true,
		baseParams : {
			method : 'comboxOperatorList'
		},
		reader : new Ext.data.JsonReader({}, [ 'pk', 'name' ])

	}, params));

	cfg = Ext.apply(Ext.ux.MultiSelect.cfg, cfg, {
		valueField : 'pk', // 值字段，
		displayField : 'name', // 显示字段,
		autoLoad : true,
		store : ds
	});
	var cb = new Ext.form.MultiSelect(cfg); // 注意 new 出来的代码一定要 return
	return cb;
};

/**
 * 分组
 */
Ext.ux.MultiSelect.group = function(/* String */cfg, /* Object */params) {
	var ds = new Ext.data.JsonStore(Ext.apply({
		url : './common.do',
		autoLoad : true,
	    baseParams : {},
		reader : new Ext.data.JsonReader({}, [ 'pk', 'name' ])

	}, params));

	cfg = Ext.apply(Ext.ux.MultiSelect.cfg, cfg, {
		valueField : 'pk', // 值字段，
		displayField : 'name', // 显示字段,
		autoLoad : true,
		store : ds
	});
	var cb = new Ext.form.MultiSelect(cfg); // 注意 new 出来的代码一定要 return
	return cb;
};
/**
 * 关键词
 */
Ext.ux.MultiSelect.keyword = function(/* String */cfg, /* Object */params) {
	var ds = new Ext.data.JsonStore(Ext.apply({
		url : './common.do',
		autoLoad : true,
		baseParams : {
			method : 'comboxkeywordList'
		},
		reader : new Ext.data.JsonReader({}, [ 'pk', 'name' ])

	}, params));

	cfg = Ext.apply(Ext.ux.MultiSelect.cfg, cfg, {
		valueField : 'pk', // 值字段，
		displayField : 'name', // 显示字段,
		autoLoad : true,
		store : ds
	});
	var cb = new Ext.form.MultiSelect(cfg); // 注意 new 出来的代码一定要 return
	return cb;
};

/**
 * 竞争对手
 */
Ext.ux.MultiSelect.competitor = function(/* String */cfg, /* Object */params) {
	var ds = new Ext.data.JsonStore(Ext.apply({
		url : './common.do',
		autoLoad : true,
		baseParams : {
			method : 'comboxCompetitorList'
		},
		reader : new Ext.data.JsonReader({}, [ 'pk', 'screenName' ])

	}, params));

	cfg = Ext.apply(Ext.ux.MultiSelect.cfg, cfg, {
		valueField : 'pk', // 值字段，
		displayField : 'screenName', // 显示字段,
		autoLoad : true,
		store : ds
	});
	var cb = new Ext.form.MultiSelect(cfg); // 注意 new 出来的代码一定要 return
	return cb;
};


