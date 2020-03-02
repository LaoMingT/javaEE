Ext.ux.ComboBoxTree = function() {
	this.treeId = Ext.id() + '-tree';
	this.maxHeight = arguments[0].maxHeight || arguments[0].height || this.maxHeight;
	this.tpl = new Ext.Template('<tpl for="."><div style="height:' + this.maxHeight 
									+ 'px"><div id="' + this.treeId
									+ '"></div></div></tpl>');
	this.store = new Ext.data.SimpleStore({
		fields : [],
		data : [[]]
	});
	this.selectedClass = '';
	this.mode = 'local';
	this.triggerAction = 'all';
	this.onSelect = Ext.emptyFn;
	this.editable = false;
	this.selectValueModel = 'leaf';
	this.a = '';

	Ext.ux.ComboBoxTree.superclass.constructor.apply(this, arguments);
};

Ext.extend(Ext.ux.ComboBoxTree, Ext.form.ComboBox, {
	initEvents : function() {
		Ext.ux.ComboBoxTree.superclass.initEvents.apply(this, arguments);
		//this.keyNav.tab = false;

	},

	initComponent : function() {
		this.on({
			scope : this
		});

	},
	expand : function() {
		Ext.ux.ComboBoxTree.superclass.expand.call(this);
		if (!this.tree.rendered) {
			this.tree.height = this.maxHeight;
			this.tree.border = false;
			this.tree.autoScroll = true;
			if (this.tree.xtype) {
				this.tree = Ext.ComponentMgr.create(this.tree, this.tree.xtype);
			}
			this.tree.render(this.treeId);
			var combox = this;
			this.tree.on('click', function(node) {
				try{
					combox.setValue(node.text);
					combox.collapse();
				}catch(err){
					
				}
				return;
			});
			this.tree.getRootNode().expandChildNodes(false);
			var root = this.tree.getRootNode();
			if (!root.isLoaded()){
				root.reload();
			}
		}
		this.tree.getRootNode().expandChildNodes(false);
		this.tree.expandAll( );
	},

	getValue : function() {
		if(this.tree.rendered 
			&& this.tree != undefined 
			&& this.tree.getSelectionModel() != undefined
			&& this.tree.getSelectionModel().getSelectedNode() != undefined){
			return this.tree.getSelectionModel().getSelectedNode().id;
		}
		return '';
	},
	
	clearValue : function() {
		this.value = '';
		this.setRawValue(this.value);
		if (this.hiddenField) {
			this.hiddenField.value = '';
		}
		this.tree.getSelectionModel().clearSelections();
	}
});

Ext.reg('comboBoxTree', Ext.ux.ComboBoxTree);