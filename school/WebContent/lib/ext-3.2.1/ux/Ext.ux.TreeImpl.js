/**
 * 
 * @author Ousui
 * @version 1.0
 * @date 2009-6-19
 * @description Ext树的封装实现，传递简单的参数即可生成一棵树。
 */
Ext.namespace('Ext.ux');
/**
 * Ext 树的封装实现
 * 
 * @param cfg
 *            对象形式传入参数。
 * 
 */
Ext.ux.TreeImpl = function(/* String */cfg) {
	this.url = null; // 读取树的 url
	this.params = {}; // 读取参数。
	this.rootId = null; // 根节点
	this.rootText = null; // 根文本
	this.rootExpand = true; // 是否展开树根
	this.rootVisible = true; // 是否显示父节点
	this.enableDD = false; // 是否具有拖拽节点功能
	this.mutiSelect = false; // 是否多选(多选包含复选框)
	this.checkBox = false; // 是否包含 checkBox
	this.nodeParamName = "pid"; // 结点参数名，默认为 pid
	this.checkModel = null;
	this.depth = -1; // 深度，默认是 -1，即忽略深度。
	this.children = [];

	/* 次要属性 */
	this.animate = true; // 是否具有动画效果
	this.contextmenu = null; // 附加的上下文目录。
	this.enableContextMenu = true; // 启用默认的树的右键菜单。

	// 应用属性。
	Ext.apply(this, cfg);

	// 添加右键菜单
	this.setContextmenu = function(menus) {
		this.contextmenu = menus;
	};
	/* 方法。 */
	// 重新加载方法，传入传递参数。
	this.reload = function(params, rootId, rootText, event) {
		if (this.params == null) {
			this.params = {};
		}
		Ext.apply(this.params, params);
		// 重载。。
		if (rootId != null) {
			this.rootId = rootId;
		}
		if (rootText != null) {
			this.rootText = rootText;
		}
		this.setRootNode(this.rootId, this.rootText);
		for (e in event) {
			treePanel_.getRootNode().on(e, event[e]);
		}
		treePanel_.getRootNode().reload();
	};

	// 设置根结点名字和ID，
	this.setRootNode = function(id, text) {
		this.rootId = id;
		this.rootText = text;
		var root = treePanel_.getRootNode();
		root.setText(this.rootText);
		root.id = id;
		root.attributes.id = id;
	};

	// 内部全局变量。。
	var treePanel_ = null;
	var treeLoader_ = null;

	var model = 'cascadeNoLoad';
	if (!this.mutiSelect) {
		model = 'single';
	}
	;
	if (this.checkModel != null) {
		model = this.checkModel;
	}

	var checkBoxUi = function() {
		this.onlyLeafCheckable = false;
		checkBoxUi.superclass.constructor.apply(this, arguments);
		this.checkModel = model;

	};
	Ext.extend(checkBoxUi, Ext.ux.TreeCheckNodeUI);

	/**
	 * 获取treepanel,即tree.. 该 cfg 为此要配置，优先级要小于 this.treePanelCfg，即，如果
	 * this.treePanelCfg 和 cfg 中有相同属性，优先使用 this.treePanelCfg 中的。
	 */
	this.getTreePanel = function(cfg) {
		if (treePanel_ == null) {
			treePanel_ = getTreePanel(cfg, this);
		}
		return treePanel_;
	};

	/* 内部方法，用来调用，生成树！ */
	function getTreePanel(c, t) {
		var cfg = {
			rootVisible : t.rootVisible,
			containerScroll : true,
			collapsible : false,
			autoScroll : true,
			loadMask : true,
			split : true
		};
		Ext.apply(cfg, c);

		// cfg.el = cfg.id;
		if (t.enableDD) {
			cfg.enableDD = true;
		}

		// 根据配置，更改一些属性。
		var loader = getTreeLoader(t);
		cfg.loader = loader;
		var rootNode = getRootNode(t);
		cfg.root = rootNode;

		var panel = new Ext.tree.TreePanel(cfg);
		createEvent(panel, t);

		return panel;
	}

	function getTreeLoader(t) {
		if (treeLoader_ == null) {
			var cfg = {
				dataUrl : t.url,
				baseParams : t.params,
				baseAttrs : {}
			};
			if (t.mutiSelect || t.checkBox) {
				cfg.baseAttrs.uiProvider = checkBoxUi;
			}

			treeLoader_ = new Ext.tree.TreeLoader(cfg);
		}
		return treeLoader_;
	}

	function getRootNode(t) {
		var cfg = {
			id : t.rootId,
			text : t.rootText,
			allowDrag : true,
			draggable : true,
			leaf : false,
			expanded : true
		};
		if (t.mutiSelect || t.checkBox) {
			cfg.uiProvider = checkBoxUi;
		}
		var rootNode = new Ext.tree.AsyncTreeNode(cfg);
		// 根结点展开事件，如果展开后没有子节点，则重新加载。。
		var countTmp = 0;
		rootNode.on('expand', function(node) {
			if (node.firstChild == null && countTmp <= 2) {
				countTmp++;
				node.reload();
			}
		});
		return rootNode;
	}

	/*
	 * ==================== EVENT ====================
	 */
	// 创建事件。
	function createEvent(panel, t) {
		if (t.enableContextMenu) {
			panel.on('contextmenu', contextmenuEvent, t);
		}
		panel.on('render', renderEvent, t);
		panel.on('beforeload', beforeloadEvent, t);
		panel.on('click', clickEvent, t);
	}
	;

	// 右键点击事件。。
	function contextmenuEvent(node, e) {
		node.select();
		var t = this;
		var rightMenu = new Ext.menu.Menu({
			items : getRightMenu(t, node)
		});
		rightMenu.showAt(e.getXY());
	}
	;

	// 临时 id ，用于创建上层
	//var tmpNode = new Array();

	/* 右键菜单 */
	function getRightMenu(t, n) {
		var menu = new Array();
		var m = t.contextmenu;
		if (m != null) {
			for ( var i = 0; i < m.length; i++) {
				menu.push(m[i]);
			}
		}
		return menu;
	}
	// 渲染后事件
	function renderEvent(panel) {
		var r = panel.getRootNode();
		if (this.rootExpand) {
			// 渲染后展开根。
			r.expand();
		}
	}

	// 配置加载前事件。
	function beforeloadEvent(node) {
		treeLoader_.baseParams[this.nodeParamName] = ((node.id == null) ? this.rootId
				: node.id);
		if (this.depth != -1) {
			treeLoader_.baseParams.depth = this.depth;
		}
	}
	// 节点选择事件。
	function clickEvent(node, e) {
		var ui = node.ui;
		if (!this.mutiSelect && this.checkBox) {
			ui.check(true);
		}
	}
};
