package com.douya.mcc.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import org.hibernate.annotations.GenericGenerator;

@SuppressWarnings("serial")
@MappedSuperclass
public abstract class BasicEntity extends BaseModel {
	@Id
	@Column(nullable = false, updatable = false, length = 32)
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name = "system-uuid", strategy = "uuid")
	protected String pk;

	@Column(name = "is_delete")
	protected int isDelete;//1是未删除，2是删除
	//@Column(name = "COMPANY_PK")
	//protected String companyPk;
	protected long version;
	@Column(name = "INSERT_TIME", columnDefinition = "DATE")
	protected Date insertTime;
	/*	@Column(name = "INSERT_IP")
	protected String insertIp;
	@Column(name = "INSERT_PK")
	protected String insertPk;
	@Column(name = "UPDATE_TIME", columnDefinition = "DATE")
	protected Date updateTime;
	@Column(name = "UPDATE_IP")
	protected String updateIp;
	@Column(name = "UPDATE_PK")
	protected String updatePk;
	@Column(name = "DELETE_TIME", columnDefinition = "DATE")
	protected Date deleteTime;
	@Column(name = "DELETE_IP")
	protected String deleteIp;
	@Column(name = "DELETE_PK")
	protected String deletePk;*/
    

	/*public String getInsertIp() {
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

	/*public Date getUpdateTime() {
		return this.updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}*/

}
