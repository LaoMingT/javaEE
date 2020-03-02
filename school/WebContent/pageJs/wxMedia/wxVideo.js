var image = new Image();
var img_reg = /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;

Ext.r(function() {

	var gridPanel = new Ext.ux.GridPanel({
				gridCfg : {
					id : 'topic-grid',
					width : document.body.clientWidth - 30,
					height : 520,
					region : 'center',
					viewConfig : {
						forceFit : false,
						autoScroll : true,
						getRowClass : function(record, index) {
						}
					}
				},
				pageSize : 20,
				columnCheckBoxCfg : {
					single : false
				},
				columns : COLUMN,
				storeCfg : {
					url : './wxImage.do',
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
							text : '添加视频',
							tooltip : {
								title : '添加视频'
								// text : '添加视频'
							},
							iconCls : 'summary',
							handler : addVideo
						}]

			});

	new Ext.form.FormPanel({
				id : 'weixinImageId',
				renderTo : 'wxVideoId',
				frame : true,
				border : false,
				labelWidth : 80,
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
							items : [{
										xtype : 'panel',
										layout : 'column',
										items : [{
													xtype : 'panel',
													layout : 'form',
													columnWidth : 0.3,
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
													columnWidth : 0.3,
													labelWidth : 100,
													items : [{
																xtype : 'textfield',
																name : 'sex',
																width : 145,
																id : 'sexJx',
																fieldLabel : '性别'
															}]
												}, {
													xtype : 'panel',
													layout : 'form',
													columnWidth : 0.3,
													items : [{
																xtype : 'textfield',
																name : 'hhhh',
																width : 145,
																id : 'cehngshi',
																fieldLabel : '城市'
															}]
												}]
									}]
						}, gridPanel]
			});

		/*
		 * Ext.getCmp('topic-grid').getStore().on('beforeload', function(t, ops) {
		 * var params = { }; Ext.apply(ops.params, params); }, this);
		 * Ext.getCmp('topic-grid').getStore().load({ params : { start : 0 } });
		 */

});

var COLUMN = [{
			header : "微信公众平台",
			dataIndex : 'wxAccountdto',
			width : 100,
			renderer : function(v, m, rec) {
				return rec.data['wxAccountdto'].wxAccount;
			}
		}, {
			header : "视频备注",
			dataIndex : 'wxMenuName',
			width : 100
		}, {
			header : "视频地址",
			dataIndex : 'url',
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

function addVideo() {

	var videopanel = new Ext.Panel({
		title : 'video',
		columnWidth : 0.5,
		height : 440,
		html : '<video width="320" height="240" controls="controls">'
				+ ' <source src="video/movie.mp4" type="video/mp4" />'
				+ ' <source src="video/movie.ogg" type="video/ogg" />'
				+ '<source src="video/movie.webm" type="video/webm" />'
				+ '<object data="video/movie.mp4" width="320" height="240">'
				+ ' <embed src="video/movie.mp4" width="320" height="240" />'
				+ '</object>' + '</video>'
	});
	var yuangongmessage = new Ext.form.FormPanel({
		id : 'addimagePanel',
		frame : true,
		border : false,
		labelWidth : 80,
		layout : 'form',
		items : [{
			xtype : 'fieldset',
			title : '',
			items : [{
						xtype : 'textfield',
						fieldLabel : '视频备注',
						allowBlank : false,
						width : 200,
						name : 'imageNameId',
						id : 'imageNameIdJs'

					}, {
						xtype : 'textfield',
						fieldLabel : '视频地址',
						allowBlank : false,
						width : 300,
						name : 'imageUrlId',
						id : 'imageUrlIdJs',
						listeners : {
							render : function(p) {// 渲染后给el添加mouseover事件
								p.getEl().on('change', function(p) {
									Ext.get('profileImgId').dom.src = Ext
											.getCmp('imageUrlIdJs').getValue();
									DrawImage("profileImgId", 350, 350);
								});
							}
						}
					}, {
						id : 'uploadFieldJs',
						xtype : 'textfield',
						name : 'uploadField',
						width : 150,
						fieldLabel : '上传视频',
						inputType : 'file',
						value : '',
						listeners : {
							'render' : function() {
								var logoFileCmp = Ext.get('uploadFieldJs');
								logoFileCmp.on('change', function(field,
										newValue, oldValue) {
									var picPath = getValue(logoFileCmp);
									var url = 'file:///' + picPath;
									if (img_reg.test(url)) {
										if (Ext.isIE) {
											var imaget = Ext
													.get('profileImgId').dom;
											imaget.src = Ext.BLANK_IMAGE_URL;
											imaget.filters
													.item("DXImageTransform.Microsoft.AlphaImageLoader").src = url;
											DrawImage("profileImgId", 350, 350);
										} else {
											// 支持FF
											Ext.get('profileImgId').dom.src = window.URL
													.createObjectURL(Ext
															.get('uploadFieldJs').dom.files[0]);
											DrawImage("profileImgId", 350, 350);
										}
									} else {
										alert("格式不符");
										Ext.getCmp('uploadFieldJs')
												.setValue('');
									}
								}, this);
							}

						}
					}]
		},videopanel]
	});

	var changesWin = new Ext.Window({
				id : 'addimageWindow',
				layout : 'fit',
				title : '添加视频',
				buttonAlign : 'center',
				width : 490,
				height : 470,
				closeAction : 'close',
				items : [yuangongmessage],
				buttons : [{
					text : '确定',
					handler : function() {

						Ext.Ajax.request({
									url : './image.do',
									params : {
										method : 'addimage',
										comName : Ext.getCmp('imageNameIdJs')
												.getValue(),
										comView : Ext.getCmp('viewContentJs')
												.getValue()
									},
									success : function(resp, opts) {
										var data = Ext.util.JSON
												.decode(resp.responseText);
										if (data.success) {
											Ext.Msg.alert("提示", data.msg);
											Ext.getCmp('addimageWindow')
													.close();
											Ext.getCmp('topic-image-grid')
													.getStore().load();
										} else {
											Ext.getCmp('addimageWindow').show();
										}
									}
								});
					}
				}, {
					text : '取消',
					handler : function() {
						Ext.getCmp('addimageWindow').close();
					}
				}]
			});

	changesWin.show();

}


function fileChange(targe, id) {
	// 检测上传文件的类型

	var imgName = document.getElementById(id).value;
	var ext, idx;
	idx = imgName.lastIndexOf(".");
	if (idx != -1) {
		ext = imgName.substr(idx + 1).toUpperCase();
		ext = ext.toLowerCase();
		if (ext != 'jpg' && ext != 'png' && ext != 'jpeg' && ext != 'gif') {
			alert("只能上传.jpg  .png  .jpeg  .gif类型的文件!");
			return false;
		}
	} else {
		alert("只能上传.jpg  .png  .jpeg  .gif类型的文件!");
		return false;
	}

	// 检测上传文件的大小

	// var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
	//
	// var fileSize = 0;
	//
	// if (isIE && document.getElementById(id).value!=null){
	//
	// var filePath = document.getElementById(id).value;
	//
	// var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
	//
	// var file = fileSystem.GetFile (filePath);
	//
	// fileSize = file.Size;
	//
	// } else {
	//
	// fileSize = target.files[0].size;
	//
	// }
	//
	//  
	//
	// var size = fileSize / 1024*1024;

	// if(size>(1024*200)){
	//
	// document.getElementById(id).disabled=true;
	//
	// alert("文件大小不能超过200KB");
	// return false;
	// }else{
	//
	// document.getElementById(id).disabled=false;
	//
	// }
	return true;
}

function getValue(obj) {
	var version = window.navigator.userAgent;
	if (version.substr(version.indexOf("MSIE") + 5, 1) >= 9) {
		var strPic = obj.value;
		obj.select();
		obj.blur();
		strPic = document.selection.createRange().text;
		return strPic;
	} else {
		return obj.getValue();
	}
}