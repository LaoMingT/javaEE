Ext.require('Ext.chart.*');
Ext.require(['Ext.data.*']);
Ext.require(['Ext.Window', 'Ext.layout.container.Fit', 'Ext.fx.target.Sprite']);

Ext.onReady(function () {

var store = Ext.create('Ext.data.JsonStore', {
    autoLoad: true,
    storeId: 'mystore',
    proxy: {
        type: 'ajax',
        url: './reportFans.do?method=getdata',
        reader: {
            type: 'json',
            root: 'root',
            idProperty: 'name'
        }
    },
    fields: [
    'name', 
    {name:'data', type:'Number'}]
});

/*  var panel2 = Ext.create('widget.panel', {
        width: 600,
        height: 300,
        title: 'ExtJS.com Visits Trends, 2007/2008 (Simple styling)',
        renderTo: Ext.getBody(),
        layout: 'fit',
        items: {
            xtype: 'chart',
            animate: false,
            store: store,
            insetPadding: 30,
            axes: [{
                type: 'Numeric',
                minimum: 0,
                position: 'left',
                fields: ['data'],
                title: false,
                grid: true,
                label: {
                    renderer: Ext.util.Format.numberRenderer('0,0'),
                    font: '10px Arial'
                }
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['name'],
                title: false,
                label: {
                    font: '11px Arial',
                    renderer: function(name) {
                        return name.substr(0, 3);
                    }
                }
            }],
            series: [{
                type: 'line',
                axis: 'left',
                xField: 'name',
                yField: 'data',
                tips: {
                    trackMouse: true,
                    width: 110,
                    height: 25,
                    renderer: function(storeItem, item) {
                        this.setTitle(storeItem.get('data') + ' visits in ' + storeItem.get('name').substr(0, 3));
                    }
                },
                style: {
                    fill: '#38B8BF',
                    stroke: '#38B8BF',
                    'stroke-width': 3
                },
                markerConfig: {
                    type: 'circle',
                    size: 4,
                    radius: 4,
                    'stroke-width': 0,
                    fill: '#38B8BF',
                    stroke: '#38B8BF'
                }
            }]
        }
    });*/
	
     var win = Ext.create('Ext.Window', {
        width: 800,
        height: 600,
        minHeight: 400,
        minWidth: 550,
        hidden: false,
        maximizable: true,
        title: '粉丝增长报表',
        renderTo: Ext.getBody(),
        layout: 'fit',
        tbar: [{
            text: '重新加载',
            handler: function() {
                store.load();
            }
        }],
        items: {
            xtype: 'chart',
            style: 'background:#fff',
            animate: true,
            store: store,
            shadow: true,
            theme: 'Category1',
            legend: {
                position: 'right'
            },
            axes: [{
                type: 'Numeric',
                minimum: 0,
                position: 'left',
                fields: ['data'],
                title: '粉丝量',
                minorTickSteps: 1,
                grid: {
                    odd: {
                        opacity: 1,
                        fill: '#ddd',
                        stroke: '#bbb',
                        'stroke-width': 0.5
                    }
                }
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['name'],
                title: '月',
                label: {
                    font: '11px Arial',
                    renderer: function(name) {
                        return name.substr(6,1);
                    }
                }
            }],
            series: [/*{
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                xField: 'name',
                yField: 'data',
                markerConfig: {
                    type: 'cross',
                    size: 4,
                    radius: 4,
                    'stroke-width': 0
                }
            },*/ {
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                smooth: true,
                xField: 'name',
                yField: 'data',
                tips: {
                    trackMouse: true,
                    width: 110,
                    height: 25,
                    renderer: function(storeItem, item) {
                        this.setTitle(storeItem.get('data') + ' visits in ' + storeItem.get('name').substr(0, 3));
                    }
                },
                markerConfig: {
                    type: 'circle',
                    size: 10,
                    radius: 10,
                    'stroke-width': 0
                }
            }/*, {
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                smooth: true,
                fill: true,
                xField: 'name',
                yField: 'data',
                markerConfig: {
                    type: 'circle',
                    size: 4,
                    radius: 4,
                    'stroke-width': 0
                }
            }*/]
        }
    });
});
