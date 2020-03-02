
package com.douya.entity;

/**
 * @date 2012-4-16
 * @author
 *
 */
public class Module {
	private String moduleId;
	private String title;
	private String html;
	private String image;
	private boolean border=false;
	private String modules;//二级菜单
	public String getModules() {
		return modules;
	}
	public void setModules(String modules) {
		this.modules = modules;
	}
	public String getTitle() {
		return title;
	}
	public String getModuleId() {
		return moduleId;
	}
	public void setModuleId(String moduleId) {
		this.moduleId = moduleId;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getHtml() {
		return html;
	}
	public void setHtml(String html) {
		this.html = html;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public boolean isBorder() {
		return border;
	}
	public void setBorder(boolean border) {
		this.border = border;
	}
	
}
