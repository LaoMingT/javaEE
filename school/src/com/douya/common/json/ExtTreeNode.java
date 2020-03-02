/**
 * <pre>
 * 上海久科信息技术有限公司
 * Copyright (C): 2012
 * 
 * 文件名称：
 * com.nusof.iptv.common.json.ExtTreeNode.java
 * 
 * 文件描述: 
 * 对应Ext的TreeNode 类的Java实体类。
 * 
 * Notes:
 * 修改历史(作者/日期/改动描述):
 * 王彬/2012.04.15/初始化版本。
 * </pre>
 */
package com.douya.common.json;

import java.io.Serializable;

/**
 * 对应Ext的TreeNode 类的Java实体类。<br />
 * 使用该类将某个类的相关属性转到本类属性，然后使用 JSONArray.fromObject()进行转换。
 * 
 * @date 2010-8-25
 * @author 王帅
 */
public class ExtTreeNode implements Serializable {
	private static final long serialVersionUID = 1L;
	private String id; // 节点ID -- 必须
	private String text; // 节点显示的文本 -- 必须
	private boolean leaf = false; // 是否为叶子节点 -- 必须
	private boolean allowDrag = false; // 该节点是否允许拖拽，true允许进行拖拽
	private boolean draggable = true; // 该节点是否可拖拽，本身是否禁止拖拽。
	private boolean disabled;// 是否禁用该节点
	private String cls; // 该节点样式
	private String href; // 该节点 href 地址
	private String qtip; // 该节点的悬浮提示
	private boolean allowChildren = true; // 是否允许添加子节点。
	private Object srcObj; // 属性的源对象
	private String note; // 用于备用的字段，可以做其他事情。例如多数据分类。
	
	public Object getSrcObj() {
		return srcObj;
	}
	
	public void setSrcObj(Object srcObj) {
		this.srcObj = srcObj;
	}
	
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}
	
	public void setText(String text) {
		this.text = text;
	}
	
	public boolean isLeaf() {
		return leaf;
	}
	
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}
	
	public boolean isAllowDrag() {
		return allowDrag;
	}
	
	public void setAllowDrag(boolean allowDrag) {
		this.allowDrag = allowDrag;
	}
	
	public boolean isDraggable() {
		return draggable;
	}
	
	public void setDraggable(boolean draggable) {
		this.draggable = draggable;
	}
	
	public boolean isDisabled() {
		return disabled;
	}
	
	public void setDisabled(boolean disabled) {
		this.disabled = disabled;
	}
	
	public String getCls() {
		return cls;
	}
	
	public void setCls(String cls) {
		this.cls = cls;
	}
	
	public String getHref() {
		return href;
	}
	
	public void setHref(String href) {
		this.href = href;
	}
	
	public String getQtip() {
		return qtip;
	}
	
	public void setQtip(String qtip) {
		this.qtip = qtip;
	}
	
	public boolean isAllowChildren() {
		return allowChildren;
	}
	
	public void setAllowChildren(boolean allowChildren) {
		this.allowChildren = allowChildren;
	}
	
	public String getNote() {
		return this.note;
	}
	
	public void setNote(String note) {
		this.note = note;
	}
	
}
