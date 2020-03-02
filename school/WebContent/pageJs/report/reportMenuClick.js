Ext.require('Ext.chart.*');
Ext.require(['Ext.data.*']);
Ext.require(['Ext.Window', 'Ext.layout.container.Fit', 'Ext.fx.target.Sprite']);

Ext.onReady(function () {

var store = Ext.create('Ext.data.JsonStore', {
    autoLoad: true,
    storeId: 'mystore',
    proxy: {
        type: 'ajax',
        url: './reportMenuClick.do?method=getdata',
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


	
    var colors = ['url(#v-1)',
                  'url(#v-2)',
                  'url(#v-3)',
                  'url(#v-4)',
                  'url(#v-5)'];
    
    var baseColor = '#eee';
    
    Ext.define('Ext.chart.theme.Fancy', {
        extend: 'Ext.chart.theme.Base',
        
        constructor: function(config) {
            this.callParent([Ext.apply({
                axis: {
                    fill: baseColor,
                    stroke: baseColor
                },
                axisLabelLeft: {
                    fill: baseColor
                },
                axisLabelBottom: {
                    fill: baseColor
                },
                axisTitleLeft: {
                    fill: baseColor
                },
                axisTitleBottom: {
                    fill: baseColor
                },
                colors: colors
            }, config)]);
        }
    });
 
      var  panel1 = Ext.create('widget.panel', {
        width: 700,
        height: 400,
        title: '菜单点击报表',
        renderTo:'reportMenuClickId',
        layout: 'fit',
        tbar: [{
            text: '重新加载',
            handler: function() {
                store.loadData();
            }
        }],
        items: {
            id: 'chartCmp',
            xtype: 'chart',
            theme: 'Fancy',
            animate: {
                easing: 'bounceOut',
                duration: 750
            },
            store: store,
            background: {
                fill: 'rgb(17, 17, 17)'
            },
            gradients: [
            {
                'id': 'v-1',
                'angle': 0,
                stops: {
                    0: {
                        color: 'rgb(212, 40, 40)'
                    },
                    100: {
                        color: 'rgb(117, 14, 14)'
                    }
                }
            },
            {
                'id': 'v-2',
                'angle': 0,
                stops: {
                    0: {
                        color: 'rgb(180, 216, 42)'
                    },
                    100: {
                        color: 'rgb(94, 114, 13)'
                    }
                }
            },
            {
                'id': 'v-3',
                'angle': 0,
                stops: {
                    0: {
                        color: 'rgb(43, 221, 115)'
                    },
                    100: {
                        color: 'rgb(14, 117, 56)'
                    }
                }
            },
            {
                'id': 'v-4',
                'angle': 0,
                stops: {
                    0: {
                        color: 'rgb(45, 117, 226)'
                    },
                    100: {
                        color: 'rgb(14, 56, 117)'
                    }
                }
            },
            {
                'id': 'v-5',
                'angle': 0,
                stops: {
                    0: {
                        color: 'rgb(187, 45, 222)'
                    },
                    100: {
                        color: 'rgb(85, 10, 103)'
                    }
                }
            }],
	        axes: [{
		        type: 'Numeric',
		        position: 'left',
		        fields: ['data'],
		        minimum: 0,
		        maximum: 100,
		        label: {
		            renderer: Ext.util.Format.numberRenderer('0,0')
		        },
		        title: 'Sample Values',
		        grid: {
                    odd: {
                        stroke: '#555'
                    },
                    even: {
                        stroke: '#555'
                    }
                }
		      
	        },
	        {
	            type: 'Category',
	            position: 'bottom',
	            fields: ['name'],
	            title: 'Sample Metrics'
	        }
          ],
           series: [{
            type: 'column',
            axis: 'left',
            highlight: true,
            tips: {
              trackMouse: true,
              width: 140,
              height: 28,
              renderer: function(storeItem, item) {
                this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data'));
              }
            },
            label: {
              display: 'insideEnd',
              'text-anchor': 'middle',
                field: 'data',
                renderer: Ext.util.Format.numberRenderer('0'),
                orientation: 'vertical',
                color: '#333'
            },
            renderer: function(sprite, storeItem, barAttr, i, store) {
                    barAttr.fill = colors[i % colors.length];
                    return barAttr;
                },
            xField: 'name',
            yField: 'data'
        }]
        }
    });
});
