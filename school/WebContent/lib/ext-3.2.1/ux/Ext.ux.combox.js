Ext.ns('Ext.ux.combox');
// 自动加载。
Ext.data.JsonStore.prototype.autoLoad = true;
Ext.ux.combox.cfg = {
	mode : 'local', // 默认的模式为远程，也可以为 local，当不请求时
	selectOnFocus : true,// 值为 ture 时表示字段获取焦点时自动选择字段既有文本
	triggerAction : 'all',// 使用'all'来运行由allQuery属性指定的查询
	typeAhead : true,// 值为true时在经过指定延迟（typeAheadDelay）后弹出并自动选择输入的文本
	width : 120, // 默认宽
	listWidth : 120, // 默认高
	emptyText : '全部', // 不选择时的空文本// 是否可调大小
	resizable : true
};

//公司选择
Ext.ux.combox.company = function(/* String */cfg, /* Object */params) {
	// 将默认配置 copy 到 cfg 上。
	// 注释掉的是代码不需要的。
	var ds = new Ext.data.JsonStore(Ext.apply({
		url : './common.do',
		baseParams : {
			method : 'comboxCompanyList'
		},
		reader : new Ext.data.JsonReader({
			root : 'root'
		}, [ {
			name : 'pk',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		} ])
	}, params));
	cfg = Ext.apply(Ext.ux.combox.cfg, cfg, {
		store : ds,
		autoLoad : true,
		valueField : 'pk', // 值字段，
		displayField : 'name' // 显示字段,

	});
	var cb = new Ext.form.ComboBox(cfg); // 注意 new 出来的代码一定要 return

	return cb;
};

// 类型选择
Ext.ux.combox.department = function(/* String */cfg, /* Object */params) {
	// 将默认配置 copy 到 cfg 上。
	// 注释掉的是代码不需要的。
	var ds = new Ext.data.JsonStore(Ext.apply({
		url : './common.do',
		autoLoad : true,
		baseParams : {
			method : 'comboxDepartmentList'
		},
		reader : new Ext.data.JsonReader({
			root : 'root'
		}, [ {
			name : 'pk',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		} ])
	}, params));
	cfg = Ext.apply(Ext.ux.combox.cfg, cfg, {
		store : ds,
		valueField : 'pk', // 值字段，
		displayField : 'name' // 显示字段,

	});
	var cb = new Ext.form.ComboBox(cfg); // 注意 new 出来的代码一定要 return

	return cb;
};
// 微博账号分类
Ext.ux.combox.catalog = function(/* String */cfg, /* Object */params) {
	// 将默认配置 copy 到 cfg 上。
	// 注释掉的是代码不需要的。
	var ds = new Ext.data.JsonStore(Ext.apply({
		url : './common.do',
		autoLoad : true,
		baseParams : {
			method : 'comboxCatalogList'
		},
		reader : new Ext.data.JsonReader({
			root : 'root'
		}, [ {
			name : 'id',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		} ])
	}, params));
	cfg = Ext.apply(Ext.ux.combox.cfg, cfg, {
		store : ds,
		autoLoad : true,
		valueField : 'id', // 值字段，
		displayField : 'name' // 显示字段,

	});
	var cb = new Ext.form.ComboBox(cfg); // 注意 new 出来的代码一定要 return

	return cb;
};
// 权限选择
Ext.ux.combox.replyselect = function(/* String */cfg, /* Object */params) {
	// 将默认配置 copy 到 cfg 上。
	// 注释掉的是代码不需要的。
	var ds = new Ext.data.JsonStore(Ext.apply({
		url : './common.do',
		autoLoad : true,
		reader : new Ext.data.JsonReader({
			root : 'root'
		}, [ {
			name : 'weiboId',
			type : 'string'
		}, {
			name : 'remark',
			type : 'string'
		} ])
	}, params));
	cfg = Ext.apply(Ext.ux.combox.cfg, cfg, {
		store : ds,
		autoLoad : true,
		valueField : 'weiboId', // 值字段，
		displayField : 'remark' // 显示字段,
	});
	var cb = new Ext.form.ComboBox(cfg); // 注意 new 出来的代码一定要 return

	return cb;
};

// 消息渠道
Ext.ux.combox.fromType = function(/* String */cfg, /* Object */params) {
	// 将默认配置 copy 到 cfg 上。
	// 注释掉的是代码不需要的。
	var ds = new Ext.data.JsonStore(Ext.apply({
		url : './common.do',
		autoLoad : true,
		baseParams : {
			method : 'comboxFromTypeList'
		},
		reader : new Ext.data.JsonReader({
			root : 'root'
		}, [ {
			name : 'id',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		} ])
	}, params));
	cfg = Ext.apply(Ext.ux.combox.cfg, cfg, {
		store : ds,
		valueField : 'id', // 值字段，
		displayField : 'name' // 显示字段,

	});
	var cb = new Ext.form.ComboBox(cfg); // 注意 new 出来的代码一定要 return

	return cb;
};

Ext.ux.combox.brand = function(/* String */cfg, /* Object */params) {
	// 将默认配置 copy 到 cfg 上。
	// 注释掉的是代码不需要的。
	var ds = new Ext.data.JsonStore(Ext.apply({
		url : './common.do',
		autoLoad : true,
		baseParams : {
			method : 'comboxBrandList'
		},
		reader : new Ext.data.JsonReader({
			root : 'root'
		}, [ {
			name : 'pk',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		} ])
	}, params));
	cfg = Ext.apply(Ext.ux.combox.cfg, cfg, {
		store : ds,
		autoLoad : true,
		valueField : 'pk', // 值字段，
		displayField : 'name' // 显示字段,

	});
	var cb = new Ext.form.ComboBox(cfg); // 注意 new 出来的代码一定要 return

	return cb;
};

Ext.ux.combox.platform = function(/* String */cfg, /* Object */params) {
	// 将默认配置 copy 到 cfg 上。
	// 注释掉的是代码不需要的。
	var ds = new Ext.data.JsonStore(Ext.apply({
		url : './common.do',
		autoLoad : true,
		baseParams : {
			method : 'comboxPlatformList'
		},
		reader : new Ext.data.JsonReader({
			root : 'root'
		}, [ {
			name : 'pk',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		} ])
	}, params));
	cfg = Ext.apply(Ext.ux.combox.cfg, cfg, {
		store : ds,
		autoLoad : true,
		valueField : 'pk', // 值字段，
		displayField : 'name' // 显示字段,

	});
	var cb = new Ext.form.ComboBox(cfg); // 注意 new 出来的代码一定要 return

	return cb;
};

Ext.ux.combox.email = function(/* String */cfg, /* Object */params) {
	// 将默认配置 copy 到 cfg 上。
	// 注释掉的是代码不需要的。
	var ds = new Ext.data.JsonStore(Ext.apply({
		url : './common.do',
		autoLoad : true,
		baseParams : {
			method : 'comboxEmailList'
		},
		reader : new Ext.data.JsonReader({
			root : 'root'
		}, [ {
			name : 'pk',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		} ])
	}, params));
	cfg = Ext.apply(Ext.ux.combox.cfg, cfg, {
		store : ds,
		autoLoad : true,
		valueField : 'pk', // 值字段，
		displayField : 'name' // 显示字段,

	});
	var cb = new Ext.form.ComboBox(cfg); // 注意 new 出来的代码一定要 return

	return cb;
};
//账号
//官方微博
Ext.ux.combox.account = function(/* String */cfg, /* Object */params) {
	// 将默认配置 copy 到 cfg 上。
	// 注释掉的是代码不需要的。
	var ds = new Ext.data.JsonStore(Ext.apply({
		url : './common.do',
		autoLoad : true,
		baseParams : {
			method : 'comboxAccountList'
		},
		reader : new Ext.data.JsonReader({
			root : 'root'
		}, [ {
			name : 'pk',
			type : 'string'
		}, {
			name : 'weiboAccount',
			type : 'string'
		} ])
	}, params));
	cfg = Ext.apply(Ext.ux.combox.cfg, cfg, {
		store : ds,
		autoLoad : true,
		valueField : 'pk', // 值字段，
		displayField : 'weiboAccount' // 显示字段,

	});
	var cb = new Ext.form.ComboBox(cfg); // 注意 new 出来的代码一定要 return

	return cb;
};

//客服分类
Ext.ux.combox.operator = function(/* String */cfg, /* Object */params) {
	// 将默认配置 copy 到 cfg 上。
	// 注释掉的是代码不需要的。
	var ds = new Ext.data.JsonStore(Ext.apply({
		url : './common.do',
		autoLoad : true,
		baseParams : {
			method : 'comboxOperatorList'
		},
		reader : new Ext.data.JsonReader({
			root : 'root'
		}, [ {
			name : 'pk',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		} ])
	}, params));
	cfg = Ext.apply(Ext.ux.combox.cfg, cfg, {
		store : ds,
		autoLoad : true,
		valueField : 'pk', // 值字段，
		displayField : 'name' // 显示字段,

	});
	var cb = new Ext.form.ComboBox(cfg); // 注意 new 出来的代码一定要 return

	return cb;
};

//转移坐席
Ext.ux.combox.viewOperator = function(cfg, params) {
	var ds = new Ext.data.JsonStore(Ext.apply({
		url : './common.do',
		autoLoad : true,
		baseParams : {
			method : 'comboxViewOperatorList'
		},
		reader : new Ext.data.JsonReader({
			root : 'root'
		}, [ {
			name : 'pk',
			type : 'string'
		}, {
			name : 'operatorName',
			type : 'string'
		} ])
	}, params));
	cfg = Ext.apply(Ext.ux.combox.cfg, cfg, {
		store : ds,
		autoLoad : true,
		valueField : 'pk', // 值字段，
		displayField : 'operatorName' // 显示字段,

	});
	var cb = new Ext.form.ComboBox(cfg); 
	return cb;
};

//帖子分类
Ext.ux.combox.invitation = function(/* String */cfg, /* Object */params) {
	// 将默认配置 copy 到 cfg 上。
	// 注释掉的是代码不需要的。
	var ds = new Ext.data.JsonStore(Ext.apply({
		url : './common.do',
		autoLoad : true,
		baseParams : {
			method : 'comboxInvitationList'
		},
		reader : new Ext.data.JsonReader({
			root : 'root'
		}, [ {
			name : 'pk',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		} ])
	}, params));
	cfg = Ext.apply(Ext.ux.combox.cfg, cfg, {
		store : ds,
		autoLoad : true,
		valueField : 'pk', // 值字段，
		displayField : 'name' // 显示字段,

	});
	var cb = new Ext.form.ComboBox(cfg); // 注意 new 出来的代码一定要 return

	return cb;
};

//详细分类
Ext.ux.combox.invitationSon = function(/* String */cfg, /* Object */params) {
	// 将默认配置 copy 到 cfg 上。
	// 注释掉的是代码不需要的。
	var ds = new Ext.data.JsonStore(Ext.apply({
		url : './common.do',
		autoLoad : true,
		baseParams : {
			method : 'comboxInvitationSonList'
		},
		reader : new Ext.data.JsonReader({
			root : 'root'
		}, [ {
			name : 'pk',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		} ])
	}, params));
	cfg = Ext.apply(Ext.ux.combox.cfg, cfg, {
		store : ds,
		autoLoad : true,
		valueField : 'pk', // 值字段，
		displayField : 'name' // 显示字段,

	});
	var cb = new Ext.form.ComboBox(cfg); // 注意 new 出来的代码一定要 return

	return cb;
};
//账号类型   取到的值是weiboAccount,显示结果是根据平台  ，品牌条件搜出来的 
Ext.ux.combox.accountbyPlatformBrand = function(/* String */cfg, /* Object */params) {
	// 将默认配置 copy 到 cfg 上。
	// 注释掉的是代码不需要的。
	var ds = new Ext.data.JsonStore(Ext.apply({
		url : './common.do',
		autoLoad : true,
		baseParams : {
			method : 'comboxAccountList'
		},
		reader : new Ext.data.JsonReader({
			root : 'root'
		}, [ {
			name : 'pk',
			type : 'string'
		}, {
			name : 'remark',
			type : 'string'
		} ])
	}, params));
	cfg = Ext.apply(Ext.ux.combox.cfg, cfg, {
		store : ds,
		autoLoad : true,
		valueField : 'pk', // 值字段，
		displayField : 'remark' // 显示字段,

	});
	var cb = new Ext.form.ComboBox(cfg); // 注意 new 出来的代码一定要 return

	return cb;
};

Ext.ux.combox.keyword = function(/* String */cfg, /* Object */params) {
	// 将默认配置 copy 到 cfg 上。
	// 注释掉的是代码不需要的。
	var ds = new Ext.data.JsonStore(Ext.apply({
		url : './common.do',
		autoLoad : true,
		baseParams : {
			method : 'comboxkeywordList'
		},
		reader : new Ext.data.JsonReader({
			root : 'root'
		}, [ {
			name : 'pk',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		} ])
	}, params));
	cfg = Ext.apply(Ext.ux.combox.cfg, cfg, {
		store : ds,
		autoLoad : true,
		valueField : 'pk', // 值字段，
		displayField : 'name' // 显示字段,

	});
	var cb = new Ext.form.ComboBox(cfg); // 注意 new 出来的代码一定要 return

	return cb;
};


Ext.ux.combox.warningkeyword = function(/* String */cfg, /* Object */params) {
	// 将默认配置 copy 到 cfg 上。
	// 注释掉的是代码不需要的。
	var ds = new Ext.data.JsonStore(Ext.apply({
		url : './common.do',
		autoLoad : true,
		baseParams : {
			method : 'comboxwarnkeywordList'
		},
		reader : new Ext.data.JsonReader({
			root : 'root'
		}, [ {
			name : 'pk',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		} ])
	}, params));
	cfg = Ext.apply(Ext.ux.combox.cfg, cfg, {
		store : ds,
		autoLoad : true,
		valueField : 'pk', // 值字段，
		displayField : 'name' // 显示字段,

	});
	var cb = new Ext.form.ComboBox(cfg); // 注意 new 出来的代码一定要 return

	return cb;
};
Ext.ux.combox.emailGroup = function(/* String */cfg, /* Object */params) {
	// 将默认配置 copy 到 cfg 上。
	// 注释掉的是代码不需要的。
	var ds = new Ext.data.JsonStore(Ext.apply({
		url : './common.do',
		autoLoad : true,
		baseParams : {
			method : 'comboxMailGroupList'
		},
		reader : new Ext.data.JsonReader({
			root : 'root'
		}, [ {
			name : 'pk',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		} ])
	}, params));
	cfg = Ext.apply(Ext.ux.combox.cfg, cfg, {
		store : ds,
		autoLoad : true,
		valueField : 'pk', // 值字段，
		displayField : 'name' // 显示字段,

	});
	var cb = new Ext.form.ComboBox(cfg); // 注意 new 出来的代码一定要 return

	return cb;
};
//获取模板分类
Ext.ux.combox.templateCatalogByPks = function(/* String */cfg, /* Object */params) {
	// 将默认配置 copy 到 cfg 上。
	// 注释掉的是代码不需要的。
	var ds = new Ext.data.JsonStore(Ext.apply({
		url : './common.do',
		autoLoad : true,
		baseParams : {
			method : 'comboxTemplateList'
			
		},
		reader : new Ext.data.JsonReader({
			root : 'root'
		}, [ {
			name : 'id',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		} ])
	}, params));
	cfg = Ext.apply(Ext.ux.combox.cfg, cfg, {
		store : ds,
		autoLoad : true,
		valueField : 'id', // 值字段，
		displayField : 'name' // 显示字段,

	});
	var cb = new Ext.form.ComboBox(cfg); // 注意 new 出来的代码一定要 return

	return cb;
};
Ext.ux.combox.appkey = function(/* String */cfg, /* Object */params) {
	// 将默认配置 copy 到 cfg 上。
	// 注释掉的是代码不需要的。
	var ds = new Ext.data.JsonStore(Ext.apply({
		url : './common.do',
		autoLoad : true,
		baseParams : {
			method : 'comboxAppkey'
		},
		reader : new Ext.data.JsonReader({
			root : 'root'
		}, [ {
			name : 'pk',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		} ])
	}, params));
	cfg = Ext.apply(Ext.ux.combox.cfg, cfg, {
		store : ds,
		autoLoad : true,
		valueField : 'pk', // 值字段，
		displayField : 'name' // 显示字段,

	});
	var cb = new Ext.form.ComboBox(cfg); // 注意 new 出来的代码一定要 return

	return cb;
};

//分组
Ext.ux.combox.group = function(/* String */cfg, /* Object */params) {
	// 将默认配置 copy 到 cfg 上。
	// 注释掉的是代码不需要的。
	var ds = new Ext.data.JsonStore(Ext.apply({
		url : './common.do',
		autoLoad : true,
		baseParams : {/*
			method : 'columnGroupList'
		*/},
		reader : new Ext.data.JsonReader({
			root : 'root'
		}, [ {
			name : 'pk',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		} ])
	}, params));
	cfg = Ext.apply(Ext.ux.combox.cfg, cfg, {
		store : ds,
		autoLoad : true,
		valueField : 'pk', // 值字段，
		displayField : 'name' // 显示字段,

	});
	var cb = new Ext.form.ComboBox(cfg); // 注意 new 出来的代码一定要 return

	return cb;
};

Ext.ux.combox.wxAccount = function(/* String */cfg, /* Object */params) {
	// 将默认配置 copy 到 cfg 上。
	// 注释掉的是代码不需要的。
	var ds = new Ext.data.JsonStore(Ext.apply({
		url : './common.do',
		autoLoad : true,
		baseParams : {
			method : 'GetwxAccount'
		},
		reader : new Ext.data.JsonReader({
			root : 'root'
		}, [ {
			name : 'pk',
			type : 'string'
		}, {
			name : 'wxAccount',
			type : 'string'
		} ])
	}, params));
	cfg = Ext.apply(Ext.ux.combox.cfg, cfg, {
		store : ds,
		autoLoad : true,
		valueField : 'pk', // 值字段，
		displayField : 'wxAccount' // 显示字段,

	});
	var cb = new Ext.form.ComboBox(cfg); // 注意 new 出来的代码一定要 return

	return cb;
};

// 权限选择
Ext.ux.combox.role = function(/* String */cfg, /* Object */params) {
	// 将默认配置 copy 到 cfg 上。
	// 注释掉的是代码不需要的。
	var ds = new Ext.data.JsonStore(Ext.apply({
		url : './common.do',
		baseParams : {
			method : 'comboxRoleList'
		},
		reader : new Ext.data.JsonReader({
			root : 'root'
		}, [ {
			name : 'pk',
			type : 'string'
		}, {
			name : 'roleName',
			type : 'string'
		} ])
	}, params));
	cfg = Ext.apply(Ext.ux.combox.cfg, cfg, {
		store : ds,
		autoLoad : true,
		valueField : 'pk', // 值字段，
		displayField : 'roleName' // 显示字段,

	});
	var cb = new Ext.form.ComboBox(cfg); // 注意 new 出来的代码一定要 return

	return cb;
};
Ext.ux.combox.department = function(/* String */cfg, /* Object */params) {
	// 将默认配置 copy 到 cfg 上。
	// 注释掉的是代码不需要的。
	var ds = new Ext.data.JsonStore(Ext.apply({
		url : './common.do',
		baseParams : {
			method : 'departmentList'
		},
		reader : new Ext.data.JsonReader({
			root : 'root'
		}, [ {
			name : 'pk',
			type : 'string'
		}, {
			name : 'departmentName',
			type : 'string'
		} ])
	}, params));
	cfg = Ext.apply(Ext.ux.combox.cfg, cfg, {
		store : ds,
		autoLoad : true,
		valueField : 'pk', // 值字段，
		displayField : 'departmentName' // 显示字段,

	});
	var cb = new Ext.form.ComboBox(cfg); // 注意 new 出来的代码一定要 return

	return cb;
};
