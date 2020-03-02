// var atmyreviewreply = Ext.util.JSON.decode(atmyreviewreply);

// var caches = Ext.util.JSON.decode(cache);

var inserttime={};

var state="listen";

var ds = new Ext.data.JsonStore(Ext.apply({
		url : './reportMenuClick.do',
		baseParams : {
			method : 'getdatabyparams'
		},
		params:{
			
		},
		reader : new Ext.data.JsonReader({
			root : 'root'
		}, [ {
			
			name : 'name',
			type : 'string'
		}, {
			name : 'data',
			type : 'Number'
		} ])
	}));
Ext.r(function() {

			var gridPanel = new Ext.ux.GridPanel({
						gridCfg : {
							id : 'topic-grid',
							width : document.body.clientWidth - 30,
							height : 320,
							region : 'center',
							viewConfig : {
								forceFit : false,
								autoScroll : true,
								enableRowBody : true,
								showPreview : true,
								getRowClass : function(record, index) {
									// 48内交互过的粉丝标记为红色
									if (record.data.isltFortyEight == 1) {
									  if (record.data.isCancel == 2) {
										 return 'row_yellow';
									   }else{
									   	return 'row_red';
									   }
									}
									if (record.data.isCancel == 2) {
										return 'row_green';
									}
								}

							}
						},
						pageSize : 10,
						columnCheckBoxCfg : {
							single : false
						},
						columns : COLUMN,
						storeCfg : {
							url : './fansMessage.do',
							baseParams : {
								method : 'searchGrid'
							},
							autoLoad : true,
							remoteSort : true,
							listeners : {}
						},
						tbarItems : [{
									pressed : true,
									enableToggle : true,
									text : '群发信息',
									tooltip : {
										title : '群发信息',
										text : '选取用户，群发信息'
									},
									iconCls : 'summary',
									handler : toggleDetails
								}]

					});


/*var store = new Ext.data.JsonStore({    // store configs    autoDestroy: true,
    url: './reportMenuClick.do?method=getdata',   
    storeId: 'myStore',    // reader configs
    autoLoad: true,
    root: 'root',  
    idProperty: 'name',  
    fields: [
    'name', 
    {name:'data', type:'Number'}]
});
  */

	
function getchartPanel(){
	
  var chartpa=   new Ext.Panel({
  	    id:'chartpaneljs',
        width: 700,
        height: 400,
        title: '微信菜单统计报表',
        tbar: [{
            text: '加载新数据',
            handler: function(){
               // ds.loadData();
            }
        }],
        items: {
            xtype: 'columnchart',
            store: ds,
            yField: 'data',
	        url: './flashChart/charts.swf',
            xField: 'name',
            xAxis: new Ext.chart.CategoryAxis({
                title: '微信菜单'
            }),
            yAxis: new Ext.chart.NumericAxis({
                title: '点击次数'
            }),
            extraStyle: {
               xAxis: {
                    labelRotation: -90
                }
            }
        }
    });					
	return 	chartpa;		
}					

function getinterestchartPanel(){
  var chartinterest=   new Ext.Panel({
        width: 700,
        height: 400,
        id:'chartinterestjs',
        title: '客户兴趣图谱',
        tbar: [{
            text: '加载新数据',
            handler: function(){
               // ds.loadData();
            }
        }],
        items: {
            xtype: 'columnchart',
            store: ds,
            yField: 'data',
	        url: './flashChart/charts.swf',
            xField: 'name',
            xAxis: new Ext.chart.CategoryAxis({
                title: '微信菜单'
            }),
            yAxis: new Ext.chart.NumericAxis({
                title: '点击次数'
            }),
            extraStyle: {
               xAxis: {
                    labelRotation: -90
                }
            }
        }
    });					
	return 	chartinterest;		
}
var tabPanel = new Ext.TabPanel({
			id : 'tablePanelId',
			region : 'center',
			margins : '0 5 5 0',
			resizeTabs:true,
			enableTabScroll : true,
			deferredRender : false,
			activeTab : 0,
			width : document.body.clientWidth - 30,
			height : 350,
			xtype : 'tabpanel',
			items : [ getBehaviorMenuPanel(),getBehaviorWebpagePanel(),getchartPanel(),getBehaviorWordPanel()/*,getinterestchartPanel()*/ ]
	});
function getBehaviorMenuPanel(){
	
	var FANSBEHAVIORMENUCOLUMN = [{
	header : "微信公众平台",
	dataIndex : 'wxAccountdto',
	width : 100,
	renderer : function(v, m, rec) {
		return rec.data['wxAccountdto'].wxAccount;
	}
},{
	header : "用户",
	dataIndex : 'fansdto',
	width : 100,
	renderer : function(v, m, rec) {
		return rec.data['fansdto'].nickname;
	}
},{
	header : "菜单名字",
	dataIndex : 'wxMenuName',
	width : 100
}, {
	header : "点击时间",
	dataIndex : 'insertTime',
	width : 150,
	renderer : function(v, m, rec) {
					
			if (v.time == null) {
			   return '';
		    }
		   return josn_to_String(v.time);
					
	}
}];
	var fansbehaviormenuRecords = new Ext.ux.GridPanel({
		gridCfg : {
			title : '自定义菜单点击轨迹',
			id : 'fansbehaviormenuRecordsGridId',
			width : document.body.clientWidth - 30,
			height : 320,
			viewConfig : {
				forceFit : false
			// autoScroll : true
			}
		},
		pageSize : 10,
		columns : FANSBEHAVIORMENUCOLUMN,
		storeCfg : {
			url : './fansBehaviorMenu.do',
			baseParams : {
				method : 'searchGrid'
			},
			autoLoad : true,
			remoteSort : true,
			listeners : {}
		}
	});
	return fansbehaviormenuRecords;
}

function getBehaviorWebpagePanel(){
	
	var FANSBEHAVIORWEBPAGECOLUMN = [{
	header : "微信公众平台",
	dataIndex : 'wxAccountdto',
	width : 100,
	renderer : function(v, m, rec) {
		return rec.data['wxAccountdto'].wxAccount;
	}
},{
	header : "用户",
	dataIndex : 'fansdto',
	width : 100,
	renderer : function(v, m, rec) {
		return rec.data['fansdto'].nickname;
	}
},{
	header : "网站地址",
	dataIndex : 'url',
	width : 100
},{
	header : "网站名",
	dataIndex : 'urltext',
	width : 100
},{
	header : "图片地址",
	dataIndex : 'imgurl',
	width : 100
}, {
	header : "点击时间",
	dataIndex : 'insertTime',
	width : 150,
	renderer : function(v, m, rec) {
					
			if (v.time == null) {
			   return '';
		    }
		   return josn_to_String(v.time);
					
	}
}];
	var fansbehaviorwebpageRecords = new Ext.ux.GridPanel({
		gridCfg : {
			title : '微网站浏览轨迹',
			id : 'fansbehaviorwebpageRecordsGridId',
			width : document.body.clientWidth - 30,
			height : 320,
			viewConfig : {
				forceFit : false
			// autoScroll : true
			}
		},
		pageSize : 10,
		columns : FANSBEHAVIORWEBPAGECOLUMN,
		storeCfg : {
			url : './fansBehaviorWebpage.do',
			baseParams : {
				method : 'searchGrid'
			},
			autoLoad : true,
			remoteSort : true,
			listeners : {}
		}
	});
	return fansbehaviorwebpageRecords;
}


function getBehaviorWordPanel(){
	
var FANSBEHAVIORWORDCOLUMN = [{
	header : "用户",
	dataIndex : 'fansdto',
	width : 100,
	renderer : function(v, m, rec) {
		return rec.data['fansdto'].nickname;
	}
},{
	header : "词汇",
	dataIndex : 'word',
	width : 100
},{
	header : "出现次数",
	dataIndex : 'wordCount',
	width : 100
}];
	var fansbehaviorwordRecords = new Ext.ux.GridPanel({
		gridCfg : {
			title : '微网站浏览轨迹',
			id : 'fansbehaviorwordRecordsGridId',
			width : document.body.clientWidth - 30,
			height : 320,
			viewConfig : {
				forceFit : false
			// autoScroll : true
			}
		},
		pageSize : 10,
		columns : FANSBEHAVIORWORDCOLUMN,
		storeCfg : {
			url : './fansMessage.do',
			baseParams : {
				method : 'searchGridWord'
			},
			autoLoad : true,
			remoteSort : true,
			listeners : {}
		}
	});
	return fansbehaviorwordRecords;
}
	
			new Ext.form.FormPanel({
						id : 'fansMessageId',
						renderTo : 'FansInfoId',
						frame : true,
						border : false,
						labelWidth : 70,
						autoScroll : true,
						width : document.body.clientWidth,
						height : document.body.clientHeight,
						items : [{
									xtype : 'fieldset',
									title : '查询条件',
									collapsible : true,
									collapsed : true,
									height : 220,
									width : document.body.clientWidth - 30,
									buttonAlign : 'center',
									buttons : [{
												text : '查询',
												style : 'margin-bottom: 5px;',
												handler : function(t) {
													askQuery();
												}
											}, {
												text : '重置',
												style : 'margin-bottom: 5px;',
												handler : function(t) {
													resetReset();
												}
											}],
									items : [
											/*
											 * { xtype : 'panel', layout :
											 * 'column', items : [ { xtype :
											 * 'panel', layout : 'form',
											 * columnWidth : 0.3, items : [
											 * brandCombox ] }, { xtype :
											 * 'panel', layout : 'form',
											 * labelWidth : 100, columnWidth :
											 * 0.3, items : [ platformCombox ] }, {
											 * xtype : 'panel', layout : 'form',
											 * columnWidth : 0.3, items : [
											 * comAccount ] } ] },
											 */
											{
										xtype : 'panel',
										layout : 'column',
										items : [{
													xtype : 'panel',
													layout : 'form',
													columnWidth : 0.25,
													items : [{
																xtype : 'textfield',
																name : 'nickName',
																width : 145,
																id : 'nickNameJs',
																fieldLabel : '昵称'
															}]
												}, {
													xtype : 'panel',
													layout : 'form',
													columnWidth : 0.25,
													labelWidth : 70,
													items : [{
																xtype : 'textfield',
																name : 'sex',
																width : 145,
																id : 'sexJx',
																fieldLabel : '性别'
															}]
												},
												{
													xtype : 'panel',
													layout : 'form',
													columnWidth : 0.25,
													items : [{
																xtype : 'textfield',
																name : 'hhhh',
																width : 145,
																id : 'cehngshi',
																fieldLabel : '城市'
															}]
												},{
													xtype : 'panel',
													layout : 'form',
													columnWidth : 0.25,
													labelWidth : 90,
													items : [{
														xtype: 'radiogroup',
														id : 'isSendMessageJs',
											            fieldLabel: '是否可发信息',
											            items: [
											                {
												                boxLabel: '是',
												                name: 'rb-auto',
												                inputValue: 1
											                },{
												                boxLabel: '否', 
												                name: 'rb-auto',
												                inputValue: 2
											                }
											            ]
										           }]
										        }]
									}]
								}, gridPanel,tabPanel]
					});

		});
		
		
function askQuery() {
	alert(Ext.getCmp('isSendMessageJs').getValue().inputValue);
	// 判断开始结束时间大小
	/*var myDate = new Date();
	var start = myDate.format(Ext.getCmp('createTimeJs').getValue());
	var end = myDate.format(Ext.getCmp('createEndTimeJs').getValue());
	if ('' != start && '' != end) {
		if (start > end) {
			Ext.Msg.alert("提示", "开始时间大于结束时间 ！");
			return;
		}
	}*/
	Ext.getCmp('topic-grid').getStore().on('beforeload',
			function(t, ops) {
				var params = {
					nickName : Ext.getCmp('nickNameJs').getValue(),
					isSendMessage : Ext.getCmp('isSendMessageJs').getValue().inputValue
					
                  
				};
				Ext.apply(ops.params, params);
			}, this);
	Ext.getCmp('topic-grid').getStore().load({
		params : {
			start : 0
		}
	});
};

/**
 * `wx_account_pk` varchar(50) DEFAULT NULL COMMENT '对应是哪个微信账号的', `subscribe`
 * int(11) NOT NULL DEFAULT '0' COMMENT
 * '用户是否订阅该公众号标识，值为0时，代表此用户没有关注该公众号，拉取不到其余信息。', `openid` varchar(50) DEFAULT
 * NULL COMMENT '用户的标识，对当前公众号唯一 ', `nickname` varchar(50) DEFAULT NULL COMMENT
 * '用户的昵称 ', `sex` int(11) DEFAULT '0' COMMENT '用户的性别，值为1时是男性，值为2时是女性，值为0时是未知 ',
 * `city` varchar(30) DEFAULT NULL COMMENT '用户所在城市', `country` varchar(15)
 * DEFAULT NULL COMMENT '用户所在国家', `province` varchar(11) DEFAULT NULL,
 * `language` varchar(11) DEFAULT NULL, `headimgurl` varchar(150) DEFAULT NULL
 * COMMENT
 * '用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空 ',
 * `subscribe_time` varchar(50) DEFAULT NULL COMMENT
 * '用户关注时间，为时间戳。如果用户曾多次关注，则取最后关注时间',
 * 
 * @type
 */
var COLUMN = [{
	header : '聊天',
	width : 50,
	align : 'center',
	sortable : true,
	renderer : function(v, m, rec) {
		/**
		 * 
		 */
		var value = '<a title="聊天" id="a-reply-' + rec.data['openid']
				+ '" href="javascript:;" onclick="javascript:chatwin( \''
				+ rec.data['openid'] + '\',\'' 
				+ rec.data['pk'] + '\',\''
				+ rec.data['wxAccountPk'] + '\',\''
				+ rec.data['wxAccountDTO'].wxAccountId + '\',\''
				+ rec.data['nickname']
				+ '\')"><img src="./styles/images/icons/reply.gif"/></a>';
         
		return value;
	}
},{
	header : '用户行为',
	width : 50,
	align : 'center',
	sortable : true,
	renderer : function(v, m, rec) {

		var value = '<a title="查看用户行为" id="a-chakan-'
							+ rec.data['weiboId']
							+ '" href="javascript:;" onclick="javascript:checkBehavior(\''
							+ rec.data['openid']+ '\',\''
							+ 2
							+ '\')"><img src="./styles/images/icons/details.gif"/><a>';
		return value;
	}
},{
	header : "未读消息",
	dataIndex : 'noReadNum',
	width : 100,
	align : 'center'
	
},{
	header : "微信公众账号",
	dataIndex : 'wxAccountDTO',
	width : 100,
	renderer : function(v, m, rec) {
		return rec.data['wxAccountDTO'].wxAccount;
	}
}, {
	id : 'groupid',
	header : "所在分组",
	dataIndex : 'groupdDTO',
	width : 100,
	renderer : function(v, m, rec) {
		return rec.data['groupdDTO'].groupname;
	}
}/*, {
	id : 'openid_',
	header : "粉丝标识",
	dataIndex : 'openid',
	width : 100
		// renderer : Forum.Renderers.topic
	}*/, {
	header : "昵称",
	dataIndex : 'nickname',
	width : 100
		// align : 'right'
	}, {
	id : 'sex_',
	header : "性别",
	dataIndex : 'sex',
	width : 100,
	sortable : true,
	renderer : function(v, m, rec) {
		if (v == 1) {
			return '男';
		} else if (v == 2) {
			return '女';
		}
	}
}, {
	id : 'country_',
	header : "所在国家",
	dataIndex : 'country',
	width : 100
}, {
	id : 'province_',
	header : "所在省",
	dataIndex : 'province',
	width : 100
}, {
	id : 'city_',
	header : "所在城市",
	dataIndex : 'city',
	width : 100
}/*
	 * , { id : 'language_', header : "使用语言", dataIndex : 'language', width :
	 * 100 }
	 */, {
	id : 'headimgurl_',
	header : "用户头像",
	dataIndex : 'headimgurl',
	width : 150
}, {
	id : 'subscribe_time_',
	header : "用户关注时间",
	dataIndex : 'subscribe_time',
	width : 100
}];

function exist(id){
    var s=document.getElementById(id);
    if(s)
    	{return true;}
    else
    	{return false;}
  };
function  checkBehavior(fansOpenid){
	if(exist('fansbehaviormenuRecordsGridId')){
			Ext.getCmp('fansbehaviormenuRecordsGridId').getStore().on('beforeload',
			function(t, ops) {
				var params = {
						fansopenid : fansOpenid
				};
				Ext.apply(ops.params, params);
			}, this);
	Ext.getCmp('fansbehaviormenuRecordsGridId').getStore().load({
		params : {
			start : 0
		}
	});
  }
	
	if(exist('fansbehaviorwebpageRecordsGridId')){
			Ext.getCmp('fansbehaviorwebpageRecordsGridId').getStore().on('beforeload',
			function(t, ops) {
				var params = {
						fansopenid : fansOpenid
				};
				Ext.apply(ops.params, params);
			}, this);
	Ext.getCmp('fansbehaviorwebpageRecordsGridId').getStore().load({
		params : {
			start : 0
		}
	});
  }
  
    ds.on('beforeload',
			function(t, ops) {
				var params = {
						fansopenid : fansOpenid
				};
				Ext.apply(ops.params, params);
			}, this);
	ds.load();
	
	
	if(exist('fansbehaviorwordRecordsGridId')){
		Ext.getCmp('fansbehaviorwordRecordsGridId').getStore().on('beforeload',
			function(t, ops) {
				var params = {
						fansopenid : fansOpenid
				};
				Ext.apply(ops.params, params);
			}, this);
		Ext.getCmp('fansbehaviorwordRecordsGridId').getStore().load({
			params : {
				start : 0
			}
		});
  }
	
}

function chatwin(openid, pk, wxAccountPk,wxAccountId,name) {
	
	Ext.Ajax.request({
		url : './fansMessage.do',
		params : {
			method : 'updateFans',
			fansOpenId:openid
		},
		success : function(resp, option) {
			var data = Ext.util.JSON.decode(resp.responseText);
				if (data.success) {
					Ext.getCmp('topic-grid').getStore().load();
					showChatWindow(openid,pk,name,wxAccountPk,wxAccountId);
				}
		}

	});
   
}


function showChatWindow(openid,pk, username,wxAccountPk,wxAccountId) {
	var chatwindow = Ext.getCmp('cw_' + pk);
	
	if (chatwindow == null) {
		inserttime[openid]="";
		chatwindow = new Ext.Window({
			id : 'cw_' + pk,
			width : 550,
			height : 530,
			title : '微信聊天窗口',
			renderTo : document.body,
			border : false,
			hidden : true,
			layout : 'border',
			closeAction : 'hide',
			collapsible : true,
			constrain : true,
			iconCls : 'my-userCommentIcon',
			maximizable : true,
			items : [{
				xtype : "panel",
				region : 'center',
				layout : 'border',
				//bodyStyle : 'padding:0px 0px 0',
				items : [{
							region : 'center',
							title : '历史记录  ',
							id : 'cw_hw_' + pk,
							//autoScroll : true,
							bodyStyle:'overflow-y:auto;overflow-x:hidden',
							iconCls : 'my-userCommentIcon'/*,
							tools : [{
										id : 'refresh',
										qtip : '注意：如果长时间没有收到对方回应，试一下',
										// hidden:true,
										handler : function(event, toolEl, panel) {
											// refresh logic
										}
									}]*/
						}, {
							region : 'south',
							title : '聊天啦',
							layout : 'fit',

							iconCls : 'user_edit',
							autoScroll : true,
							height : 230,

							collapsible : true,

							// margins:'0 0 0 0',
							items : {
								xtype : 'panel',
								baseCls : 'x-plain',
								autoHeight : true,
								autoWidth : true,
								// bodyStyle: 'padding:10 10px 0;',
								/*defaults : {
									anchor : '100%'
								},*/
								
								items : [{
									xtype : 'textarea',
									id : 'cw_iw_' + pk,
									height : 142,
									width:550
						        }/*{

											xtype : 'htmleditor',
											height : 145,
											id : 'cw_iw_' + pk,
											enableAlignments: true,
						                    enableColors: true,
						                    enableFont: true,
						                    enableFontSize: true,
						                    enableFormat: true,
						                    enableLinks: true,
						                    enableLists: true,
						                    enableSourceEdit: true,
											hideLabel : true
											
										}*/]
							},
							bbar : [{
								text : '图片',
								handler : function() {
                                    openImage();
                                },
								iconCls : 'my-sendingIcon'
							}
							, '-', {
								text : '图文',
								handler : function() {
									openNews(openid,wxAccountPk,wxAccountId);
								}
							}, '-', {
								text : '视频',
								handler : function() {
									Ext.getCmp('cw_iw_' + pk).reset();
								}
							}, '-', {
								text : '语音',
								handler : function() {
									Ext.getCmp('cw_iw_' + pk).reset();
								}
							}, '-', {
								text : '文字模板',
								handler : function() {
									Ext.getCmp('cw_iw_' + pk).reset();
								}
							}],
							buttons : [{
							text : '确定',
							handler : function() {
                                   sendMsg(openid,pk,username,wxAccountPk,wxAccountId);
                                }
						}, {
							text : '取消',
							handler : function() {
									Ext.getCmp('cw_iw_' + pk).reset();
								}
						} ]
                    }]
			}]
 });
		Ext.getCmp('cw_iw_' + pk).focus();
	}
	chatwindow.show();
	
	
	loadchatRecord1(operator,pk,openid,username);
}

function openNews(openid,wxAccountPk,wxAccountId){
	
/*   var store = new Ext.data.JsonStore({
        url: 'fansMessage.do?method=getdata',
        root: 'root',
        fields: ['name', 'url', {name:'size', type: 'float'}, {name:'lastmod', type:'date', dateFormat:'timestamp'}]
    });*/
    
    var store = new Ext.data.JsonStore(Ext.apply({
		url : './wxNews.do',
		baseParams : {
			method : 'searchGrid'
		},
		params:{
			
		},
		reader : new Ext.data.JsonReader({
			root : 'root'
		}, [ {
			name : 'title',
			type : 'string'
		}, {
			name : 'picurl',
			type : 'string'
		} ])
	}));
    store.load();

    var tpl = new Ext.XTemplate(
		'<tpl for=".">',
            '<div class="thumb-wrap" id="{pk}">',
		    '<div class="thumb"><img src="{picurl}" title="{title}" width="200" height="200"></div>',
		    '<span class="x-editable">{title}</span></div>',
        '</tpl>',
        '<div class="x-clear"></div>'
	);
	
	var dataview=new Ext.DataView({
	            store: store,
	            tpl: tpl,
	            autoHeight:true,
	            multiSelect: true,
	            overClass:'x-view-over',
	            itemSelector:'div.thumb-wrap',
	            emptyText: 'No images to display',
	
	            plugins: [
	                new Ext.DataView.DragSelector(),
	                new Ext.DataView.LabelEditor({dataIndex: 'title'})
	            ],
	
	            prepareData: function(data){
	                data.shortName = Ext.util.Format.ellipsis(data.medianame, 15);
	                data.sizeString = Ext.util.Format.fileSize(20);
	                return data;
	            },
	            
	            listeners: {
	            	selectionchange: {
	            		fn: function(dv,nodes){
	            			var l = nodes.length;
	            			var s = l != 1 ? 's' : '';
	                   	    var data = nodes[0];
                            //alert(data.id);
                            //alert(dv.getRecord().data['medianame']);
	            		}
	            	}
	            }
	        });
var Newswindow = Ext.getCmp('cw_news');
	if (Newswindow == null) {
		Newswindow = new Ext.Window({
			id : 'cw_news',
			width : 450,
			height : 330,
			title : '图片',
			renderTo : document.body,
			border : false,
			autoScroll : true,
			hidden : true,
			closeAction : 'hide',
			collapsible : true,
			constrain : true,
			maximizable : true,
			items : [{
	        id:'images-view',
	        frame:true,
	        autoWidth:true,
	        autoHeight:true,
	        layout:'fit',
	
	        items: dataview
	    }],
	    buttons :[{
			text : '确定',
			handler : function() {
			 var selNode = dataview.getSelectedNodes();
			  var pks="";
			 for(var i=0;i<selNode.length;i++){
			 	pks=pks+selNode[i].id+",";
			 }
			 
			 Ext.Ajax.request({
					url : './fansMessage.do',
					params : {
						method : 'sendNews',
						pks : pks,
						wxAccountPk:wxAccountPk,
						openid:openid,
						wxAccountId:wxAccountId
					},
					success : function(resp, opts) {
						var data = Ext.util.JSON.decode(resp.responseText);
						if (data.success) {
							Ext.Msg.alert("提示", data.msg);
							Ext.getCmp('cw_news').close();
							//Ext.getCmp('atMyWeiboGridId').getStore().load();
						} else {
							Ext.getCmp('mchangesWinId').show();
						}
					}
				});
			}
		}, {
			text : '取消',
			handler : function() {
				Ext.getCmp('mchangesWinId').close();
			}
		}]
     });
  }
     
     Newswindow.show();
	
}
function openImage(){
	
/*   var store = new Ext.data.JsonStore({
        url: 'fansMessage.do?method=getdata',
        root: 'root',
        fields: ['name', 'url', {name:'size', type: 'float'}, {name:'lastmod', type:'date', dateFormat:'timestamp'}]
    });*/
    
    var store = new Ext.data.JsonStore(Ext.apply({
		url : './wxImage.do',
		baseParams : {
			method : 'searchGrid'
		},
		params:{
			
		},
		reader : new Ext.data.JsonReader({
			root : 'root'
		}, [ {
			name : 'medianame',
			type : 'string'
		}, {
			name : 'url',
			type : 'string'
		} ])
	}));
    store.load();

    var tpl = new Ext.XTemplate(
		'<tpl for=".">',
            '<div class="thumb-wrap" id="{medianame}">',
		    '<div class="thumb"><img src="{url}" title="{medianame}" width="200" height="200"></div>',
		    '<span class="x-editable">{medianame}</span></div>',
        '</tpl>',
        '<div class="x-clear"></div>'
	);
var Imagewindow = Ext.getCmp('cw_');
	if (Imagewindow == null) {
		Imagewindow = new Ext.Window({
			id : 'cw_',
			width : 450,
			height : 330,
			title : '图片',
			renderTo : document.body,
			border : false,
			autoScroll : true,
			hidden : true,
			//autoScroll : true,
			closeAction : 'hide',
			collapsible : true,
			constrain : true,
			iconCls : 'my-userCommentIcon',
			maximizable : true,
			items : [{
	        id:'images-view',
	        frame:true,
	        autoWidth:true,
	        autoHeight:true,
	        layout:'fit',
	
	        items: new Ext.DataView({
	            store: store,
	            tpl: tpl,
	            autoHeight:true,
	            multiSelect: true,
	            overClass:'x-view-over',
	            itemSelector:'div.thumb-wrap',
	            emptyText: 'No images to display',
	
	            plugins: [
	                new Ext.DataView.DragSelector(),
	                new Ext.DataView.LabelEditor({dataIndex: 'medianame'})
	            ],
	
	            prepareData: function(data){
	                data.shortName = Ext.util.Format.ellipsis(data.medianame, 15);
	                data.sizeString = Ext.util.Format.fileSize(20);
	               // data.dateString = data.lastmod.format("m/d/Y g:i a");
	                return data;
	            },
	            
	            listeners: {
	            	selectionchange: {
	            		fn: function(dv,nodes){
	            			var l = nodes.length;
	            			var s = l != 1 ? 's' : '';
	            			//panel.setTitle('Simple DataView ('+l+' item'+s+' selected)');
	            		}
	            	}
	            }
	        })
	    }]
     });
  }
     
     Imagewindow.show();
	
}


function sendMsg(openid,pk,username,wxAccountPk,wxAccountId){
		var smessage = Ext.get('cw_iw_' + pk).dom.value;
		 if (smessage.trim() == '') {  
            alert("您没有输入消息文本内容！");  
            Ext.getCmp('cw_iw_' + pk).focus(true);  
            return;  
        }  
        
        Ext.Ajax.request({
		url : './fansMessage.do',
		params : {
			method : 'sendChatMsg',
			content:smessage,
			wxAccountPk:wxAccountPk,
			openid:openid,
			wxAccountId:wxAccountId
		},
		success : function(resp, option) {
			var data = Ext.util.JSON.decode(resp.responseText);
			if (data.success){
				Ext.getCmp('cw_iw_' + pk).reset();
				/*
			 	var now = new Date();
				var time = " " + now.getHours() + ":"
						+ now.getMinutes() + ":"
						+ now.getSeconds() + "";
				var smessage = Ext.get('cw_iw_' + pk).dom.value;
				var a = [];
			//	var msg = '<div style="margin:20px 5px 10px 5px"> <img src="./styles/images/icons/reply.gif"/> 坐席-{0} <b>{1}</b> 对 <b>{2}</b> 说：<br> </div>';
				var msg = '<div style="margin:20px 5px 10px 5px"> <img src="./styles/images/icons/reply.gif"/> {0} <b>坐席-{1}</b> 说：<br> </div>';

				var mc = String.format(msg, time, operator);

				Ext.getCmp('cw_hw_' + pk).body.insertHtml(
						'beforeEnd', mc);
						
				var chat_record = new Ext.Element(document
						.createElement('div'));
				chat_record.addClass('chat_record');

				chat_record
						.update('<div style="margin:0px 5px 0px 15px">'
								+ smessage + '</div>');

				Ext.getCmp('cw_hw_' + pk).body
						.appendChild(chat_record);
				// var canvas = new Ext.Element(document
				// .createElement('canvas'));
				var size_chat = chat_record.getSize();
				
				if (!Ext.isIE && size_chat.height < 20) {
					chat_record.setHeight(20);
					size_chat.height = 20;
				}
				chat_record.setHeight(size_chat.height+10);
					Ext.getCmp('cw_hw_' + pk).body.scroll('b',
											10000, {
												duration : 0.1
											});

				
			 */}
		}

	});
        

}

function showChatmsg(message,operator,pk,username1,openid){
	var chatRecordList = Ext.util.JSON.decode(message);
	if(chatRecordList!=null&&chatRecordList!=""){
		    inserttime[openid]=josn_to_String(chatRecordList[chatRecordList.length-1].insertTime.time);
    var msg = '<div style="margin:20px 5px 10px 5px"> <img src="./styles/images/icons/reply.gif"/> {0} <b>{1}</b>  说：<br> </div>';

	  if (null != chatRecordList) {
		for ( var i = 0; i < chatRecordList.length; i++) {
			var uname="";
		    var smessage = chatRecordList[i].content;
			var chatTime=josn_to_String(chatRecordList[i].insertTime.time);
			if(chatRecordList[i].username!=null){
				uname=chatRecordList[i].username;
			}else{
				uname=username1;
			}
			var mc = String.format(msg,chatTime,uname);
	
			Ext.getCmp('cw_hw_' + pk).body.insertHtml(
					'beforeEnd', mc);
					
			var chat_record = new Ext.Element(document
					.createElement('div'));
			chat_record.addClass('chat_record');
	
			chat_record
					.update('<div style="margin:0px 5px 0px 15px">'
							+ smessage + '</div>');
	
			Ext.getCmp('cw_hw_' + pk).body
					.appendChild(chat_record);
			// var canvas = new Ext.Element(document
			// .createElement('canvas'));
			var size_chat = chat_record.getSize();
			
			if (!Ext.isIE && size_chat.height < 20) {
				chat_record.setHeight(20);
				size_chat.height = 20;
			}
			chat_record.setHeight(size_chat.height+10);   
		}
	 }
	}
}


function toggleDetails() {

	var yuangongmessage = new Ext.form.FormPanel({
				id : 'activityformId',
				frame : true,
				border : false,
				width : 620,
				layout : 'form',
				height : 330,
				labelWidth : 80,
				items : [{
							xtype : 'textfield',
							fieldLabel : '活动名称',
							id : 'remarkJs',
							name : 'remark',
							width : 100

						}]
			});

	var changesWin = new Ext.Window({
		id : 'mchangesWinId',
		layout : 'fit',
		title : '添加员工信息',
		buttonAlign : 'center',
		width : 620,
		height : 390,
		closeAction : 'close',
		items : [yuangongmessage],
		buttons : [{
			text : '确定',
			handler : function() {

				Ext.Ajax.request({
					url : './atMyWeibo.do',
					params : {
						method : 'mchangeOperator',
						pks : pks,
						operatorPk : Ext.getCmp('moperatorIds').getValue().inputValue
					},
					success : function(resp, opts) {
						var data = Ext.util.JSON.decode(resp.responseText);
						if (data.success) {
							Ext.Msg.alert("提示", data.msg);
							Ext.getCmp('mchangesWinId').close();
							Ext.getCmp('atMyWeiboGridId').getStore().load();
						} else {
							Ext.getCmp('mchangesWinId').show();
						}
					}
				});
			}
		}, {
			text : '取消',
			handler : function() {
				Ext.getCmp('mchangesWinId').close();
			}
		}]
	});
	changesWin.show();
}

function loadchatRecord1(operator,pk,openid,username){
	loadChatRecord2(operator,pk,openid,username);
}

function loadChatRecord2(operator,pk,openid,username){
	Ext.Ajax.request({
		url : './fansMessage.do',
		params : {
			method : 'getChatRecordList',
			fansOpenId:openid,
			insertTime:inserttime[openid]
		},
		success : function(resp, option) {
			
			  var   message=resp.responseText;
			   showChatmsg(message,operator,pk,username,openid);
		}

	});
	setTimeout(function() {
		loadChatRecord2(operator,pk,openid,username);
	}, 10000);	
}

