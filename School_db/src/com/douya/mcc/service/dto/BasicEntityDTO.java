package com.douya.mcc.service.dto;

import java.util.Date;

@SuppressWarnings("serial")
public abstract class BasicEntityDTO extends BaseDTO {
	public String pk;
	public int isDelete;//1是未删除，2是删除
	//public String companyPk;
	public long version;
	public Date insertTime;
	/*	public String insertIp;
	public String insertPk;
	public Date updateTime;
	public String updateIp;
	public String updatePk;
	public Date deleteTime;
	public String deleteIp;
	public String deletePk;*/


/*	public String getInsertIp() {
		return this.insertIp;
	}

	public void setInsertIp(String insertIp) {
		this.insertIp = insertIp;
	}

	public String getInsertPk() {
		return this.insertPk;
	}

	public void setInsertPk(String insertPk) {
		this.insertPk = insertPk;
	}

	public String getUpdateIp() {
		return this.updateIp;
	}

	public void setUpdateIp(String updateIp) {
		this.updateIp = updateIp;
	}

	public String getUpdatePk() {
		return this.updatePk;
	}

	public void setUpdatePk(String updatePk) {
		this.updatePk = updatePk;
	}

	public Date getDeleteTime() {
		return this.deleteTime;
	}

	public void setDeleteTime(Date deleteTime) {
		this.deleteTime = deleteTime;
	}

	public String getDeleteIp() {
		return this.deleteIp;
	}

	public void setDeleteIp(String deleteIp) {
		this.deleteIp = deleteIp;
	}

	public String getDeletePk() {
		return this.deletePk;
	}

	public void setDeletePk(String deletePk) {
		this.deletePk = deletePk;
	}*/

	public String getPk() {
		return this.pk;
	}

	public void setPk(String pk) {
		this.pk = pk;
	}

	public int getIsDelete() {
		return this.isDelete;
	}

	public void setIsDelete(int isDelete) {
		this.isDelete = isDelete;
	}

	public long getVersion() {
		return this.version;
	}

	public void setVersion(long version) {
		this.version = version;
	}

	public Date getInsertTime() {
		return this.insertTime;
	}

	public void setInsertTime(Date insertTime) {
		this.insertTime = insertTime;
	}
	/*
	public Date getUpdateTime() {
		return this.updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}*/

}
