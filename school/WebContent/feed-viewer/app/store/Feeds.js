Ext.define('FV.store.Feeds', {
    extend: 'Ext.data.Store',

    model: 'FV.model.Feed',

    data: [
        {name: '登记',   url: 'http://feeds.feedburner.com/extblog'},
        {name: '经理',   url: 'http://feeds.feedburner.com/extblog'},
        {name: '员工', url: 'http://sencha.com/forum/external.php?type=RSS2'},
        {name: '管理员',       url: 'http://feeds.feedburner.com/ajaxian'}
    ]
});
