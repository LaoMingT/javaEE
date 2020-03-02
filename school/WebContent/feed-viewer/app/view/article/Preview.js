Ext.define('FV.view.article.Preview', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.articlepreview',

    requires: ['Ext.toolbar.Toolbar'],

    cls: 'preview',
    scrollable: true,
    border: false,
    
    initComponent: function() {
        Ext.apply(this, {
            tpl: new Ext.XTemplate(
                '<div class="post-data">',
                    '<span class="post-date">{pubDate:this.formatDate}</span>',
                    '<h3 class="post-title">{title}</h3>',
                    '<h4 class="post-author">by {author:this.defaultValue}</h4>',
                '</div>',
                '<div class="post-body">{content:this.getBody}</div>', {

                getBody: function(value, all) {
                    return Ext.util.Format.stripScripts(value);
                },

                defaultValue: function(v) {
                    return v ? v : 'Unknown';
                },

                formatDate: function(value) {
                    if (!value) {
                        return '';
                    }
                    return Ext.Date.format(value, 'M j, Y, g:i a');
                }
            }),

            dockedItems: [{
                dock: 'top',
                xtype: 'toolbar',
                items: [{
                    iconCls: 'tab-new',
                    text: '查看',
                    action: 'viewintab'
                }, {
                    iconCls: 'post-go',
                    text: '进入',
                    action: 'gotopost'
                }]
            }]
        });

        this.callParent(arguments);
    }
});