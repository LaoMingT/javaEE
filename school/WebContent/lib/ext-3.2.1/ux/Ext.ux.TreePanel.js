Ext.namespace('Ext.ux');
Ext.ux.TreePanel = function(/* String */cfg) {
	
	this.treePanel;// 树面板
	/* ---------- treePanel 的相关配属性，这些都是必须的 start ---------- */
	// 树的配置项，linked{@Ext.tree.TreePanel}，默认 = null 的话则不启用树，有配置项则启用。
	this.treeCfg = null;
	// 树所属布局的位置。linked{@Ext.ux.TreeImpl}，该类基本设置根结点，url和参数及即可
	this.treeObjCfg = {
		treeUrl : null, // 读取树的 url
		treeParams : {}, // 读取参数。
		rootId : -1, // 根节点
		rootText : '根', // 根文本
		rootExpand : true, // 是否展开树根
		rootVisible : true, // 是否显示父节点
		enableDD : false, // 是否具有拖拽节点功能
		mutiSelect : false, // 是否多选(多选包含复选框)
		checkBox : false, // 是否包含 checkBox
		nodeParamName : 'pid', // 结点参数名，默认为 pid
		checkModel : null, // 树选择模式，参考 TreeCheckNodeUI.js 文件
		depth : -1, // 深度，默认是 -1，即忽略深度。
		contextmenu : null, // 附加的上下文目录。
		// 启用默认的树的右键菜单。
		enableContextMenu : true
	};
	// 应用树节点。
	Ext.applyIf(cfg.treeObjCfg, this.treeObjCfg);
	Ext.apply(this, cfg);
	return this.initTreePanel();
};
/**
 * 获取本类使用的 TreePanel
 * 
 * @return {}
 */
Ext.ux.TreePanel.prototype.initTreePanel = function() {
	if (!this.treePanel) {
		var tree = new Ext.ux.TreeImpl(this.treeObjCfg);
		var cfg = Ext.applyIf( {
			height : '100%',
			width : '100%',
			animCollapse : false,
			minWidth : '100%',
			border : true,
			margins : '0 0 0 0',
			tools : [],
			headerCssClass : 'c-img'
		}, this.treeCfg);
		this.treePanel = tree.getTreePanel(cfg);
	}
	return this.treePanel;
};