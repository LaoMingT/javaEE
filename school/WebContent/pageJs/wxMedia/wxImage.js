var image = new Image();
var  img_reg = /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/; 

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
							text : '添加图片',
							tooltip : {
								title : '添加图片'
								// text : '添加图片'
							},
							iconCls : 'summary',
							handler : addimage
						}]

			});

	new Ext.form.FormPanel({
				id : 'weixinImageId',
				renderTo : 'wxImageId',
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
		 * var params = {
		 *  }; Ext.apply(ops.params, params); }, this);
		 * Ext.getCmp('topic-grid').getStore().load({ params : { start : 0 } });
		 */

});

var COLUMN = [{
	header : '预览',
	width : 50,
	align : 'center',
	sortable : true,
	renderer : function(v, m, rec) {

			var value = '<a title="预览" id="a-chakan-'
								+ rec.data['pk']
								+ '" href="javascript:;" onclick="javascript:yulan(\''
								+ rec.data['url']
								+ '\')"><img src="./styles/images/icons/details.gif"/><a>';
		 	return value;
    	}
    },{
			header : "微信公众平台",
			dataIndex : 'wxAccountDTO',
			width : 100,
			renderer : function(v, m, rec) {
				return rec.data['wxAccountDTO'].wxAccount;
			}
		}, {
			header : "图片备注",
			dataIndex : 'mediaName',
			width : 100
		}, {
			header : "图片地址",
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

function addimage() {
var comwxAccount =  Ext.ux.combox.wxAccount({
		fieldLabel : '公众平台',
		id : 'wxAccountJs',
		width : 145,
		name : 'wxAccount',
		listWidth : 145,
		mode : 'remote'
	});
	var yuangongmessage = new Ext.form.FormPanel({
				id : 'addimagePanel',
				frame : true,
				border : false,
				labelWidth : 80,
				layout : 'form',
				items : [comwxAccount,{
							xtype : 'textfield',
							fieldLabel : '图片备注',
							allowBlank : false,
							width : 200,
							name : 'imageNameId',
							id : 'imageNameIdJs'

						},{
								xtype : 'hidden',
								id : 'imageUrlIdhidenJs',
								name : 'imageUrlIdhidenName'
						},{
								xtype : 'hidden',
								id : 'typejsId',
								name : 'typejsName'
						}, {
							xtype : 'textfield',
							fieldLabel : '图片地址',
							width : 300,
							name : 'imageUrlId',
							id : 'imageUrlIdJs',
							listeners : {
								render : function(p) {// 渲染后给el添加mouseover事件
									p.getEl().on('change', function(p) {
										Ext.get('profileImgId').dom.src = Ext
												.getCmp('imageUrlIdJs')
												.getValue();
										DrawImage("profileImgId", 350, 350);
									    Ext.getCmp('imageUrlIdhidenJs').setValue(Ext.getCmp('imageUrlIdJs').getValue());
									    Ext.getCmp('typejsId').setValue("1");
									});
								}
							}
						}, {
							id : 'uploadFieldJs',
							xtype : 'textfield',
							name : 'uploadField',
							width : 150,
							fieldLabel : '上传图片',
							inputType : 'file',
							value : '',
							listeners : {
								  'render':function(){  
								        var logoFileCmp = Ext.get('uploadFieldJs');  
								        logoFileCmp.on('change',function(field,newValue,oldValue){  
								                 var picPath = getValue(logoFileCmp);
								                 var url = 'file:///' + picPath;  
								                if (img_reg.test(url)){
								                 if(Ext.isIE){  
								                      var imaget = Ext.get('profileImgId').dom;    
								                      imaget.src = Ext.BLANK_IMAGE_URL;  
								                      imaget.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = url;   
								                      DrawImage("profileImgId", 350, 350);
								                      Ext.getCmp('imageUrlIdhidenJs').setValue(Ext.getCmp('uploadFieldJs').getValue());
								                      Ext.getCmp('typejsId').setValue("2");
								                 
								                 }else{  
								                      //支持FF  
								                      Ext.get('profileImgId').dom.src=window.URL.createObjectURL(Ext.get('uploadFieldJs').dom.files[0]);  
								                      DrawImage("profileImgId", 350, 350);
								                      Ext.getCmp('imageUrlIdhidenJs').setValue(Ext.getCmp('uploadFieldJs').getValue());
								                      Ext.getCmp('typejsId').setValue("2");
								                  } 
								                }else{
								                	alert("格式不符");
								                	Ext.getCmp('uploadFieldJs').setValue('');
								                }
								            },this);  
								         }  
								 
								
								/*'valid' : function(t) {
									if (Ext.getCmp('uploadFieldJs').getValue() != "") {
										fileChange(t, 'uploadFieldJs');
									}
								}*/
							}
						}, {
							xtype : 'box',
							id : 'profileImgId',
							fieldLabel : "预览图片",  
							autoEl : {
								tag : 'img', // 指定为img标签
								style : 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale);',
								src : '' // 指定url路径
							}
						}]
			});

	var changesWin = new Ext.Window({
				id : 'addimageWindow',
				layout : 'fit',
				title : '添加图片',
				buttonAlign : 'center',
				width : 490,
				height : 470,
				closeAction : 'close',
				items : [yuangongmessage],
				buttons : [{
					text : '确定',
					handler : function() {

						if (Ext.getCmp('wxAccountJs').getValue() == "") {
							Ext.Msg.alert("错误", "微信账号不能为空！");
							return false;
						}
						if (Ext.getCmp('imageNameIdJs').getValue() == "") {
							Ext.Msg.alert("错误", "图片备注不能为空！");
							return false;
						}
						if (Ext.getCmp('imageUrlIdJs').getValue() == "" && Ext.getCmp('uploadFieldJs').getValue() == "") {
							Ext.Msg.alert("错误", "图片地址跟上次图片不能都为空！");
							return false;
						}
					
						if (Ext.getCmp('typejsId').getValue() == "1") {
							Ext.Ajax.request({
									url : './wxImage.do',
									params : {
										method : 'addImage',
										accountPk:Ext.getCmp('wxAccountJs').getValue(),
										mediaName : Ext.getCmp('imageNameIdJs').getValue(),
										url : Ext.getCmp('imageUrlIdhidenJs').getValue()
									},
									success : function(resp, opts) {
										var data = Ext.util.JSON
												.decode(resp.responseText);
										if (data.success) {
											Ext.Msg.alert("提示", data.msg);
											Ext.getCmp('addimageWindow')
													.close();
											Ext.getCmp('topic-grid')
													.getStore().load();
										} else {
											Ext.getCmp('addimageWindow').show();
										}
									}
								});
								
						}else{
							Ext.Msg.confirm('提示','确定要上传图片？',function(btn,text) {
									if (btn == 'yes') {
										if(Ext.getCmp('uploadFieldJs').getValue()!=null&&Ext.getCmp('uploadFieldJs').getValue()!=''){
											Ext.MessageBox.show({
													msg : '正在上传中，请耐心等待...',
													progressText : '正在上传，请耐心等待...',
													width : 300,
													wait : true
												});
										}
										Ext.Ajax.request({
														url : './wxImage.do',
														params: {
														   method : 'uploadimage',
                                                           fileName:'file'
                                                        },
														success : function(resp, opts) {
															var data = Ext.util.JSON
																	.decode(resp.responseText);
															if (data.success) {
																Ext.Msg.alert("提示", data.msg);
																Ext.getCmp('addimageWindow')
																		.close();
																Ext.getCmp('topic-grid')
																		.getStore().load();
															} else {
																Ext.getCmp('addimageWindow').show();
															}
														 }
													});
									   }
									});
							
						}
						
						
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

function yulan(url){
	var  yulanwindow= Ext.getCmp('yulanimageWindow');
	if(yulanwindow == null){
		var yuangongmessage = new Ext.Panel({
				id : 'yulanimagePanel',
				frame : true,
				border : false,
				labelWidth : 80,
				layout : 'form',
				items : [{
							xtype : 'box',
							id : 'yulanImgId',
							autoEl : {
								tag : 'img', // 指定为img标签
								style : 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale);',
								src : url // 指定url路径
							}
						}]
			});
		 yulanwindow = new Ext.Window({
				id : 'yulanimageWindow',
				layout : 'fit',
				title : '图片展示',
				buttonAlign : 'center',
				width : 360,
				height :360,
				closeAction : 'close',
				items : [yuangongmessage]
			});
		yulanwindow.show();
		DrawImage('yulanImgId', 350, 350);
	}else{
		yulanwindow.show();
		DrawImage2('yulanImgId', 350, 350);
	}
		
	 
	
	 DrawImage2('yulanImgId', 350, 350);
}

/**
 * 等比例缩放 图片
 * 
 * @param {}
 *            imageid
 * @param {}
 *            FitWidth
 * @param {}
 *            FitHeight
 */
function DrawImage(imageid, FitWidth, FitHeight) {
	var ImgD = Ext.get(imageid).dom;
	image.src = ImgD.src;
	if (window.ActiveXObject) {
		image.onreadystatechange = function() {
			if (image.readyState == "loaded" || image.readyState == "complete") {
				image.onreadystatechange = null;
				if (image.width > 0 && image.height > 0) {
					if (image.width / image.height >= FitWidth / FitHeight) {
						if (image.width > FitWidth) {
							ImgD.width = FitWidth;
							ImgD.height = (image.height * FitWidth)
									/ image.width;
						} else {
							ImgD.width = image.width;
							ImgD.height = image.height;
						}
					} else {
						if (image.height > FitHeight) {
							ImgD.height = FitHeight;
							ImgD.width = (image.width * FitHeight)
									/ image.height;
						} else {
							ImgD.width = image.width;
							ImgD.height = image.height;
						}
					}
				}
			}
		};
	} else {
		
		image.onload = function() {
			image.onload = null;
			if (image.width > 0 && image.height > 0) {
				if (image.width / image.height >= FitWidth / FitHeight) {
					if (image.width > FitWidth) {
						ImgD.width = FitWidth;
						ImgD.height = (image.height * FitWidth) / image.width;
					} else {
						ImgD.width = image.width;
						ImgD.height = image.height;
					}
				} else {
					if (image.height > FitHeight) {
						ImgD.height = FitHeight;
						ImgD.width = (image.width * FitHeight) / image.height;
					} else {
						ImgD.width = image.width;
						ImgD.height = image.height;
					}
				}
			}
		};
	}

}
function DrawImage2(imageid, FitWidth, FitHeight) {
	var ImgD = Ext.get(imageid).dom;
	image.src = ImgD.src;
	if (image.width > 0 && image.height > 0) {
		if (image.width / image.height >= FitWidth / FitHeight) {
			if (image.width > FitWidth) {
				ImgD.width = FitWidth;
				ImgD.height = (image.height * FitWidth) / image.width;
			} else {
				ImgD.width = image.width;
				ImgD.height = image.height;
			}
		} else {
			if (image.height > FitHeight) {
				ImgD.height = FitHeight;
				ImgD.width = (image.width * FitHeight) / image.height;
			} else {
				ImgD.width = image.width;
				ImgD.height = image.height;
			}
		}
	}
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

function getValue(obj)
{
   var version = window.navigator.userAgent;
    if (version.substr(version.indexOf("MSIE") + 5, 1) >= 9) {
                    var strPic = obj.value;
                    obj.select();
                    obj.blur();
                    strPic = document.selection.createRange().text;
                    return strPic;
      }else{
      	return obj.getValue();
    }
}