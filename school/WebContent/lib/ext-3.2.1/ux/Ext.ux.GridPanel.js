Ext.namespace('Ext.ux');
Ext.ux.GridPanel = function(/* String */cfg) {
	this.gridPanel;// 列表面板
	/*---- GridPanel 的相关配置属性------------------*/
	// 列表配置项
	this.gridCfg = null;
	// 数据源
	this.storeCfg = {
		remoteSort : false,
		autoLoad : true
	};
	// 列头，需要哪些列头，以数组形式传入。linked{@Ext.grid.GridPanel.columns}
	this.columns = [];
	// 行号器
	this.columnRowNumberCfg = null;
	// checkBox
	this.columnRowNumberCfg = null;
	// 展开器
	this.columnExpanderCfg = null;
	// 每页加载数据大小。
	this.pageSize = 50;
	// TBar 工具栏的其他 items。linked{@Ext.PagingToolbar.items}
	this.tbarItems = null;
	// BBar 工具栏的其他 items。linked{@Ext.PagingToolbar.items}
	this.bbarItems = null;
	// grid 的右键菜单数组，linked{@Ext.menu.BaseItem} 集成该类的都可以使用。
	this.contextmenus = [];
	this.contextmenu=null;//右键菜单
	this.tbar;// tbar
	this.store;// 数据源
	this.bbar;// bbar
	this.tbShow;//判断tb
	// 行数据对象
	this.rowData = {
		click : null, // 单击某行的数据
		dblclick : null, // 双击某行的数据
		// 右键单击某行的数据
		contextmenu : null
	};
	// 单元格数据
	this.cellData = {
		click : null, // 单击某单元格具体值。
		dblclick : null,// 双击某单元格具体值
		// 右击某单元格值
		contextmenu : null
	};
	Ext.apply(this, cfg);
	return this.init();

};

Ext.ux.GridPanel.prototype.init = function() {
	var gridPanel=this.getGridPanel();
	// 单元格操作 Handler
	var cellAction = function(grid, rowI, cellI, e, eventName) {
		var rowData = grid.getStore().getAt(rowI).data;
		var colIndex = grid.getColumnModel().getDataIndex(cellI);
		this.rowData[eventName] = rowData;
		this.cellData[eventName] = Ext.value(rowData[colIndex], '');
	};
	// 注册右键菜单监听事件
	gridPanel.on('cellcontextmenu',
			cellAction.createDelegate(this, ['contextmenu'], true), this);
	// 注册右键菜单，右键单击选中本行。
	gridPanel.on('cellcontextmenu', function(g, r, c, e) {
				this.getContextmenu().showAt(e.getXY());
				g.getSelectionModel().selectRow(r);
			}, this);
	// 注册单元格单击
	gridPanel.on('cellclick',
			cellAction.createDelegate(this, ['click'], true), this);
	// 注册单元格双击
	gridPanel.on('celldblclick',
			cellAction.createDelegate(this, ['dblclick'], true), this);
	this.getStore().on('beforeload', function(t, ops) {
		ops.params = ops.params || {};
		ops.params.start = ops.params.start || 0;
		ops.params.limit = ops.params.limit || this.pageSize;

		if (this.onBeforeload != null) {
			this.onBeforeload(ops.params);
		}
	}, this);
	return gridPanel;
};
/**
 * 获取本类使用的 Store
 * 
 * @return {}
 */
Ext.ux.GridPanel.prototype.getStore = function() {
	if (!this.store) {
		var cfg = {
			totalProperty : 'sum',
			root : 'root'
		};
		Ext.applyIf(cfg, this.storeCfg);
		this.store = new Ext.data.JsonStore(cfg);
	}
	return this.store;
};

/**
 * 获取本类使用的所有列信息
 * 
 * @return { cols : 所有列，数组 sm : selectionModel 即选择模式 numCol : 数字行 expander : 展开器 }
 */
Ext.ux.GridPanel.prototype.getColumns = function() {
	var numCol = null;
	var sm = null;
	var expander = null;
	var cols = [];
	// 不为空，则生成行号器
	if (this.columnRowNumberCfg != null) {
		numCol = new Ext.grid.RowNumberer(this.columnRowNumberCfg);
		cols.push(numCol);
	}
	// 不为空生成checkBox，否则普通模式
	if (this.columnCheckBoxCfg != null) {
		sm = new Ext.grid.CheckboxSelectionModel(this.columnRowNumberCfg);
		cols.push(sm);
	} else {
		sm = new Ext.grid.RowSelectionModel();
	}
	// 不为空生成展开器
	if (this.columnExpanderCfg != null) {
		expander = new Ext.grid.RowExpander(this.columnExpanderCfg);
		cols.push(expander);
	}
	// 放入列
	for ( var i = 0; i < this.columns.length; i++) {
		cols.push(this.columns[i]);
	}
	return {
		cols : cols,
		sm : sm,
		numCol : numCol,
		expander : expander
	};
};

/**
 * 获取本类使用的底部工具栏
 * 
 * @return {}
 */
Ext.ux.GridPanel.prototype.getBbar = function() {
	if (!this.bbar) {
		var cfg = {
			pageSize : this.pageSize,
			store : this.getStore(),
			items : this.bbarItems
		};
		var pagingToolbar= new Ext.PagingToolbar(cfg);
		this.bbar=pagingToolbar;
	}
	return this.bbar;
};
Ext.ux.GridPanel.prototype.getTbar = function() {
	if (!this.tbar) {
		var cfg = {
			pageSize : this.pageSize,
			store : this.getStore(),
			items : this.tbarItems
		};
		this.tbar = new Ext.PagingToolbar(cfg);
	}
	return this.tbar;
};

/**
 * 获取本类使用的 GridPanel
 * 
 * @return {}
 */
Ext.ux.GridPanel.prototype.getGridPanel = function() {
	if (!this.gridPanel) {
		var ds = this.getStore();

		var colsObj = this.getColumns();
		var cfg = {
			columns : colsObj.cols,
			plugins : [],
			border : false,
			autoScroll : true,
			stripeRows : true,
			sm : colsObj.sm,
			store : ds
		};

		Ext.applyIf(cfg, this.gridCfg);
		if (colsObj.expander != null) {
			cfg.plugins.push(colsObj.expander);
		}
		if (this.bbarItems != null) {
			cfg.bbar = this.getBbar();
		}
			cfg.tbar = this.getTbar();
		this.gridPanel = new Ext.grid.GridPanel(cfg);
	}
	;
	return this.gridPanel;
};
/**
 * 获取本类使用的右键菜单
 * 
 * @return {}
 */
Ext.ux.GridPanel.prototype.getContextmenu = function() {
	if (!this.contextmenu) {
		var menus = this.contextmenus;

		if (menus.length > 0) {
			menus.push('-');
		}
		var copy = new Ext.menu.Item({
					text : '复制内容',
					icon : BASE_PATH
							+ '/style/images/icon16x16/045631607.gif'
				});
		copy.setHandler(function() {
					if (Ext.isIE) {
						var d = this.cellData.contextmenu.toString();
						window.clipboardData.setData('text', d);
					} else {
						prompt('暂时不支持本浏览器的复制，请手使用【ctrl+c】进行复制。',
								this.cellData.contextmenu);
					}
				}, this);
		menus.push(copy);

		this.contextmenu = new Ext.menu.Menu({
					items : this.contextmenus
				});
	}
	return this.contextmenu;
};
Ext.ux.GridPanel.prototype.getRowData = function(/* String */location) {
	if (location != 'click' && location != 'contextmenu'
			&& location != 'dblclick') {
		alert('debug - 需要以下参数: "click", "dblclick", "contextmenu"。');
		return null;
	}
	return this.rowData[location];
};

/**
 * 获取某行数据，传入参数获取具体事件获取的值，不传则获取该对象自定义操作。
 * 
 * @param {String}
 *            location: 'click', 'dblclick', 'contextmenu'
 */
Ext.ux.GridPanel.prototype.getCellData = function(/* String */location) {
	if (location != 'click' && location != 'contextmenu'
			&& location != 'dblclick') {
		alert('debug - 需要以下参数: "click", "dblclick", "contextmenu"。');
		return null;
	}
	return this.cellData[location];
};
Ext.ux.GridPanel.prototype.load = function(/* Object */params) {
	alert(params);
	params = params || {};
	this.onBeforeload = function(bs) {
		Ext.apply(bs, params);
	};
	this.getStore().load({
				params : {
					start : 0
				}
			});
};
