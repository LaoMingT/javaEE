//var atmyreviewreply = Ext.util.JSON.decode(atmyreviewreply);

//var caches = Ext.util.JSON.decode(cache);
Ext.r(function() {  

var chatWin = new Ext.Window({  
            width:800,  
            height:500,  
            title:'Ext聊天窗口测试版',  
            renderTo : 'UserInfoId',
            border :false,  
            hidden :true,  
        layout:'border',  
        closeAction :'hide',  
        collapsible :true,  
        constrain :true,  
        iconCls :'my-userCommentIcon',  
        maximizable :true,  
        items:[  
            {  
                region:'west',  
                id:'chat-west-panel',  
                title:'用户面板',  
                split:true,  
                width: 170,  
                minSize: 100,  
                maxSize: 200,  
                collapsible: true,  
                constrain :true,  
                //margins:'0 0 0 5',  
                layout:'accordion',  
                layoutConfig:{  
                    animate:true  
                },  
                items: [{  
                    items:  new Ext.tree.TreePanel({  
                                id:'im-tree',  
                                
                                rootVisible:false,  
                                lines:false,  
                                 
                                border :false,  
                                dataUrl: 'chat/updateChat.jsp',  
                                singleExpand :true,  
                                selModel:new Ext.tree.MultiSelectionModel(),  
                                 
                                root: new Ext.tree.AsyncTreeNode({  
                                    text:'Online',  
                                    children:[{  
                                        text:'Sunrise',  
                                        id:'SunriseIm',  
                                        nodeType: 'async',  
                                        singleClickExpand :true,  
                                        expandable:true,  
                                        expanded:true  
                                    }]  
                                })  
                            }),  
                    title:'在线人员',  
                    //layout:'form',  
                    border:false,  
                    autoScroll:true,  
                    iconCls:'im_list',  
                    tools:[{  
                        id:'refresh',  
                        qtip: '刷新在线信息',  
                        // hidden:true,  
                        handler: function(event, toolEl, panel) {  
                            reloadUser();  
                        }  
                    },  
                        {  
                            id:'close',  
                            qtip: '清除选定',  
                            // hidden:true,  
                            handler: function(event, toolEl, panel) {  
                                Ext.getCmp('im-tree').getSelectionModel().clearSelections();  
                            }  
                        }  
                    ]  
  
                },{  
                    title:'Settings',  
                    html:'<p>Some settings in here.</p>',  
                    border:false,  
                    iconCls:'settings'  
                }]  
            },  
            {  
                region:'center',  
                layout:'border',   items:[  
                {  
                    region:'center',  
                    title:'历史记录  ',  
                    id:'history_panel',  
                    autoScroll:true,  
                    iconCls :'my-userCommentIcon',  
                    tools:[{  
                        id:'refresh',  
                        qtip: '注意：如果长时间没有收到对方回应，试一下',  
                        // hidden:true,  
                        handler: function(event, toolEl, panel) {  
                            // refresh logic  
                        }  
                    }]  
                },  
                {  
                    region:'south',  
                    title:'聊天啦',  
                    layout:'fit',  
                  
                    iconCls :'user_edit',  
                    autoScroll:true,  
                    height: 200,  
                  
                    collapsible: true,  
  
                    //margins:'0 0 0 0',  
                    items:{  
                        xtype:'form',  
                        baseCls: 'x-plain',  
                        autoHeight:true,  
                        autoWidth:true,  
                        bodyStyle: 'padding:10 10px 0;',  
                        defaults: {  
                            anchor: '95%'  
                        },  
                        items:[  
                             
                            {  
                                xtype:'htmleditor',  
                                height:130,  
                                id:'htmleditor',  
                                hideLabel :true  
                            }  
                        ]  
                    }  
                    ,bbar :[{  
                    text:'发送请输入Ctrl-Enter',  
                    handler:function() {  
                        sendmsg();  
                    },  
                    iconCls:'my-sendingIcon'  
                }  
  
                    ,'-',{  
                        text:'清除',  
                        handler:function() {  
                            Ext.getCmp("htmleditor").reset();  
                        }  
                    }  
                ]  
                }  
  
  
            ]  
            }  
        ]  
    });  
  
    var query = location.search.substring(1);//获取查询串  
    var sessionId = SESSION;//Ext.urlDecode(query).sid;  
    // 发送消息  
    function sendmsg() {  
Ext.getCmp("htmleditor").syncValue();  
        var content_value = Ext.getCmp("htmleditor").getValue();  
        if (content_value.trim() == '') {  
            alert("您没有输入消息文本内容！");  
            Ext.getCmp("htmleditor").focus(true);  
            return;  
        }  
  
  
        var receivers_values = [];  
        var tree = Ext.getCmp('im-tree');  
        var receivers = tree.getSelectionModel().getSelectedNodes();  
        for (i = 0; i < receivers.length; ++i) {  
  
            receivers_values.push(receivers[i].attributes.sessionId);  
  
        }  
        if (receivers_values.length == 0) {  
            alert("您没有选择接收者！");  
            tree.focus();  
            return;  
        }  
        //alert(receivers_values.length);  
        if (receivers_values.length > 1) {  
            if (!confirm("您选择了多个接收者，是否继续？")) {  
                return;  
            }  
        }  
  
        var nickname_value = 'forget';  
  
        var pars = {  
            "content":content_value,  
            "receivers":"" + receivers_values,  
            "sender":sessionId  
            // "nickname":'forget'  
        };  
  
        var conn = new Ext.data.Connection();  
        // 发送异步请求  
        conn.request({  
            // 请求地址  
            url: 'chat/sendmsg.jsp',  
            method: 'post',  
            params: pars,  
            // 指定回调函数  
            callback: msgsent  
        });  
  
  
    }  
  
    function msgsent(options, success, response) {  
        requestCount--;  
        if (success) {  
            try {  
                var jsonObj = Ext.util.JSON.decode(response.responseText);  
            } catch(e) {  
  
            }  
            if (jsonObj && jsonObj.success)  
            {  
                var cur = jsonObj.cur;  
                var sessions = [];  
  
                var c = node.childNodes;  
                for (var i = 0; i < c.length; i++) {  
                    sessions[c[i].attributes.sessionId] = c[i].attributes;  
                }  
  
  
             if (cur) {  
                    var a = [];  
                    for (var j = 0; j < cur.receivers.length; j++) {  
  
                        a.push(sessions[cur.receivers[j]].loginName);  
                    }  
  
   var msg = '<div style="margin:20px 5px 10px 5px">   <img src="js/ext/user_comment.png"/> {0} <b>{1}</b> 对 <b>{2}</b> 说：<br> </div>' ;  
                  
var chat_record =new Ext.Element(document.createElement('div'));  
chat_record.addClass('chat_record');  
  
  
      
chat_record.update('<span style="margin:0px 5px 0px 5px">'+cur.content+'</span>');  
  
Ext.getCmp("history_panel").body.appendChild(chat_record);  
var canvas=new Ext.Element(document.createElement('canvas'));  
var size_chat=chat_record.getSize();  
if(!Ext.isIE && size_chat.height < 100) {  
    chat_record.setHeight(100);  
    size_chat.height=100;  
}  
canvas.setSize(size_chat.width-30,size_chat.height);  
//canvas.setSize(size_chat.width-,40);  
chat_record.appendChild(canvas);  
  
  
if(window['G_vmlCanvasManager'] ) {  
                    G_vmlCanvasManager.initElement(canvas.dom);  
}  
  
  
draw_m(chat_record.dom.lastChild,'#FFB100');  
  
  
  
                    var mc = String.format(msg, cur.time, sessions[cur.sender].loginName, a);  
                      
                    Ext.getCmp("history_panel").body.insertHtml('beforeEnd',  
                            mc);  
                              
                             
                    
                    Ext.getCmp("history_panel").body.scroll('b', 10000, {  
                        duration:0.1  
                    });  
                }  
                Ext.getCmp("htmleditor").reset();  
            }  
            else if(response.result)  
                alert(response.result);  
        } else {  
            if(response.responseText)  
            alert(response.responseText);  
        }  
  
    }  
    //event for source editing mode  
    new Ext.KeyMap(Ext.getCmp("htmleditor").getEl(), [  
        {  
            key: 13,  
            ctrl:true,  
            stopEvent :true,  
            fn: sendmsg  
        }  
    ]);  
  
  
    //event for normal mode  
      
    Ext.getCmp("htmleditor").onEditorEvent = function(e) {  
        this.updateToolbar();  
        var keyCode = (document.layers) ? keyStroke.which : e.keyCode;  
        if (keyCode == 13 && e.ctrlKey) sendmsg(); //it'a my handler  
    }  
  
    var tree = Ext.getCmp('im-tree');  
    var node = tree.getNodeById('SunriseIm');  
    var requestCount = 0;  
  
    function reloadUser() {  
        if (requestCount == 10) {  
            alert('服务器连接失败');  
            window.location = 'login.jsp';  
            return;  
        }  
        requestCount++;  
        var conn = new Ext.data.Connection();  
        // 发送异步请求  
        conn.request({  
            // 请求地址  
            url: 'chat/updateChat.jsp',  
            method: 'post',  
            // 指定回调函数  
            callback: callback  
        });  
  
        //回调函数  
        function callback(options, success, response) {  
            requestCount--;  
            if (success) {  
                try {  
                    var jsonObj = Ext.util.JSON.decode(response.responseText);  
                } catch(e) {  
  
                }  
                if (jsonObj)  
                {  
                    var jsonNodes = jsonObj.nodes;  
                    var msgs = jsonObj.msgs;  
  
                    var cs = node.childNodes ;  
                    var nodes = {};  
                    var sessions = {};  
                    for (var i = 0; i < cs.length; i++) {  
                        nodes[cs[i].id] = cs[i];  
  
                    }  
  
  
                    var user;  
                    for (var i = 0; i < jsonNodes.length; i++) {  
                        user = jsonNodes[i];  
                        // alert(user.sessionId);  
                        sessions[user.sessionId] = user;  
                        if (nodes[user.id]) {  
                            nodes[user.id] = null;  
                            continue;  
                        }  
                        node.appendChild(user);  
  
                    }  
  
                    for (var id in nodes) {  
                        if (nodes[id])  
                            node.removeChild(nodes[id]);  
                    }  
  
  
                     var msg = '<div style="margin:20px 5px 10px 5px">   <img src="js/ext/user_comment.png"/> {0} <b>{1}</b> 对 <b>{2}</b> 说：<br> </div>' ;  
        
                      
                    if (msgs) {  
                        for (var i = 0; i < msgs.length; i++) {  
                            var a = [];  
                            for (var j = 0; j < msgs[i].receivers.length; j++) {  
  
                                a.push(sessions[msgs[i].receivers[j]].loginName);  
                            }  
  
                              
                              
                                        
var chat_record =new Ext.Element(document.createElement('div'));  
chat_record.addClass('chat_record');  
  
  
      
chat_record.update('<span style="margin:0px 5px 0px 5px">'+msgs[i].content+'</span>');  
  
Ext.getCmp("history_panel").body.appendChild(chat_record);  
var canvas=new Ext.Element(document.createElement('canvas'));  
var size_chat=chat_record.getSize();  
if(!Ext.isIE && size_chat.height < 100) {  
    chat_record.setHeight(100);  
    size_chat.height=100;  
}  
canvas.setSize(size_chat.width-10,size_chat.height);  
//canvas.setSize(size_chat.width-,40);  
chat_record.appendChild(canvas);  
  
  
if(window['G_vmlCanvasManager'] ) {  
                    G_vmlCanvasManager.initElement(canvas.dom);  
}  
  
  
draw_m(chat_record.dom.lastChild,'#FFB100');  
  
  
  
                            var mc = String.format(msg, msgs[i].time, sessions[msgs[i].sender].loginName, a);  
                            Ext.getCmp("history_panel").body.insertHtml('beforeEnd',  
                                    mc);  
                            
                            Ext.getCmp("history_panel").body.scroll('b', 10000, {  
                                duration:0.1  
                            });  
                        }  
                        
                      if(!chatWin.isVisible()){  
                             self.focus();  
                                        Ext.example.msg('叮当',   
                                        '您有新的短消息     <a href="javascript:window.startChatWin()">查看</a>');  
                      }  
                     }  
  
  
                }  
                else if(response.responseText)  
                    alert(response.responseText);  
            } else {  
                if(response.responseText)  
                alert(response.responseText);  
            }  
  
        }  
  
    }  
//chatWin.show();  
//chatWin.setSize(0,0);  
//chatWin.hide();  
if(!Ext.isIE) {  
    chatWin.collapse();  
}  
    var chatTask = {  
        run:reloadUser,  
        //scope:this,  
        interval: 5000 //1 second  
    };  
    time_pro = new Ext.util.TaskRunner();  
    time_pro.start(chatTask);  
    //chatWin.hide();  
        window.startChatWin = function (){  
          
            chatWin.show();  
                chatWin.center();  
            //Ext.getCmp('htmleditor').focus();  
        };  
  
  
function draw_m(canvas,color){  
          
            var context = canvas.getContext("2d");  
            var width=canvas.width;  
            var height2=canvas.height-4.5;  
            var height=canvas.height;  
            context.beginPath();  
            context.strokeStyle = color;  
            context.moveTo(0.5,0.5+5);  
            context.arc(5.5,5.5,5,-Math.PI,-Math.PI/2,false);  
            context.lineTo(width-0.5-5,0.5);  
            context.arc(width-0.5-5,5.5,5,-Math.PI/2,0,false);  
            context.lineTo(width-0.5,height2-5);  
            context.arc(width-0.5-5,height2-5,5,0,Math.PI/2,false);  
            context.lineTo(width/2+3,height2);  
            context.lineTo(width/2,height);  
            context.lineTo(width/2-3,height2);  
            context.lineTo(0.5+5,height2);  
            context.arc(0.5+5,height2-5,5,Math.PI/2,Math.PI,false);  
            context.lineTo(0.5,0.5+5);  
            context.stroke();  
        }     
});  
	/*
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

						}

					}
				},
				pageSize : 10,
				columnCheckBoxCfg : {
					single : false
				},
				columns : COLUMN,
				storeCfg : {
					url : './userMessage.do',
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
							text : '添加员工信息',
							tooltip : {
								title : '新增员工',
								text : '把他们的信息保存起来'
							},
							iconCls : 'summary',
							handler : toggleDetails
						}]

			});


	new Ext.form.FormPanel({
		id : 'UserMessageId',
		renderTo : 'UserInfoId',
		frame : true,
		border : false,
		labelWidth : 80,
		autoScroll : true,
		width : document.body.clientWidth,
		height : document.body.clientHeight,
		items : [  gridPanel ]
	});

});
	var COLUMN = [{
		id : 'topic',
		header : "姓名",
		dataIndex : 'userName',
		width : 150
			// renderer : Forum.Renderers.topic
		}, {
		header : "年龄",
		dataIndex : 'age',
		width : 70
			// align : 'right'
		}, {
		id : 'cont',
		header : "联系方式",
		dataIndex : 'contact',
		width : 150
			// renderer : Forum.Renderers.lastPost
		}, {
		id : 'addr',
		header : "地址",
		dataIndex : 'address',
		width : 150
			// renderer : Forum.Renderers.lastPost
		}, {
		id : 'sal',
		header : "薪水",
		dataIndex : 'salary',
		width : 150
			// renderer : Forum.Renderers.lastPost
		}, {
		id : 'departName',
		header : "所在部门",
		dataIndex : 'departmentName',
		width : 150
			// renderer : Forum.Renderers.lastPost
		}, {
		id : 'whenc',
		header : "入职时间",
		dataIndex : 'whencome',
		width : 150
			// renderer : Forum.Renderers.lastPost
		}, {
		id : 'wheng',
		header : "辞职时间",
		dataIndex : 'whengo',
		width : 150
			// renderer : Forum.Renderers.lastPost
		}];
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
	}*/
