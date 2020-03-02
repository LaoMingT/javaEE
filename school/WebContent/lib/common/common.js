/**
 * 上海久科信息技术有限公司 
 * Copyright (C): 2012 
 * 
 * 文件名称：
 * common.js
 * 
 * 文件描述: 
 * 通用的JS文件。 
 * 
 * Notes: 修改历史(作者/日期/改动描述):
 * 王彬/2012.04.11/初始化。
 */

/**
 * 根据Id获取页面html标签对象
 * 
 * @param {String}
 *            idStr 要获取的DOM对象的ID
 * @return {DOM} ID对应的DOM对象
 */
function $(idStr) {
	return document.getElementById(idStr);
}

/**
 * 格式化数字方法 dight: 要格式化的数字 how: 保留小数个数
 * 
 * @author zhaow 2010-05-26
 */
function toFloat(dight, how) {
	var f = Math.round(dight * Math.pow(10, how)) / Math.pow(10, how);
	return f;
}

/**
 * 字符串替换方法
 * 
 * @param {String}
 *            findText 原字符
 * @param {String}
 *            replaceText 用来替换的字符
 * @return {String} 替换后的字符串
 */
String.prototype.replaceAll = function strReplace(findText, replaceText) {
	var str = new String(this);
	while (str.indexOf(findText) != -1) {
		str = str.replace(findText, replaceText);
	}
	return str;
};

/**
 * 为 window 添加一个 Map 对象，实现简单的 map 功能。
 */
window.Map = function() {
	/**
	 * Map 的 key
	 */
	this.key = new Array();
	/**
	 * Map 的元数据，用于存放 key 为属性的值
	 */
	this.metaData = new Object();

	/**
	 * put 方法
	 */
	this.put = function(key, value) {
		if (this.metaData[key] == null) {
			this.key.push(key);
		}
		this.metaData[key] = value;
	};

	/**
	 * get,根据 key 获取 value
	 */
	this.get = function(key) {
		return this.metaData[key];
	};

	/**
	 * 移除 key
	 */
	this.remove = function(key) {
		this.key.remove(key);
		delete this.metaData[key];
	};

	/**
	 * map 大小
	 */
	this.size = function() {
		return this.key.length;
	};

	/**
	 * 是否为空
	 */
	this.isEmpty = function() {
		return this.size() == 0;
	};

	/**
	 * 遍历 map， func(key, value, index)
	 */
	this.each = function(func) {
		if (typeof func != 'function') {
			return;
		}
		var len = this.size();
		for ( var i = 0; i < len; i++) {
			var k = this.key[i];
			func(k, this.metaData[k], i);
		}
	};

	/**
	 * 反对成对的 k v 对象数组
	 */
	this.entrySet = function() {
		var l = this.size();
		var entry = new Array(l);
		for ( var i = 0; i < l; i++) {
			var k = this.key[i];
			var v = this.metaData[k];
			entry[i] = {
				key : k,
				value : v
			};
		}
		return entry;
	};

	/**
	 * 返回 key 数组
	 */
	this.keySet = function() {
		return this.key;
	};

	/**
	 * 返回 value 数组
	 */
	this.values = function() {
		var vs = new Array();
		for ( var i = 0; i < this.size(); i++) {
			var k = this.key[i];
			vs.push(this.metaData[k]);
		}
		return vs;
	};

	/**
	 * 是否包含该 key
	 */
	this.containsKey = function(key) {
		var k = this.key;
		var flag = false;
		for ( var i = 0; i < k.length; i++) {
			if (k[i] == key) {
				flag = true;
				break;
			}
		}
		return flag;
	};

	/**
	 * 是否包含值。
	 */
	this.containsValue = function(value) {
		var flag = false;
		var md = this.metaData;
		for ( var e in md) {
			if (md[e] == value) {
				flag = true;
				break;
			}
		}
		return flag;
	};

	/**
	 * 清理该map
	 */
	this.clear = function() {
		this.key = new Array();
		this.metaData = new Object();
	};

	/**
	 * 重写toString
	 */
	this.toString = function() {
		var s = "{";
		for ( var i = 0; i < this.size(); i++) {
			var k = this.key[i];
			s += k + "=" + this.metaData[k] + ',';
		}
		s = s.substring(0, s.length - 2) + "}";
		return s;
	};

	if (!Array.prototype.remove) {
		Array.prototype.remove = function(s) {
			var a = this.indexOf(s);
			if (a != -1) {
				this.splice(a, 1);
			}
			return this;
		};
	}
};

/**
 * 当鼠标点击文本框时如果文本框中的字符串是默认字符串时清空文本框
 * 
 * @param obj
 *            文本框对象
 * @param text
 *            默认字符串
 * @return
 */
function clearText(obj, text) {
	if (obj.value == text) {
		obj.value = '';
	}
};

/**
 * 当鼠标点击非文本框区域时如果文本框中的字符串是空时在文本框中填入默认字符串
 * 
 * @param obj
 *            文本框对象
 * @param text
 *            默认字符串
 * @return
 */
function showText(obj, text) {
	if (obj.value == '') {
		obj.value = text;
	}
};

/**
 * 删除字符串前面的0
 * 
 * @param {}
 *            str
 * @return {}
 */
function deleteZero(str) {
	var index = 0;
	for ( var i = 0; i < str.length; i++) {
		if (parseInt(str.charAt(i)) != 0) {
			index = i;
			break;
		}
	}
	return str.substring(index, str.length);
}
function josn_to_String(time) {
	var datetime = new Date();
	datetime.setTime(time);
	var year = datetime.getFullYear();
	var month = datetime.getMonth() + 1;// js从0开始取
	var date = datetime.getDate();
	var hour = datetime.getHours();
	var minutes = datetime.getMinutes();
	var second = datetime.getSeconds();

	if (month < 10) {
		month = "0" + month;
	}
	if (date < 10) {
		date = "0" + date;
	}
	if (hour < 10) {
		hour = "0" + hour;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if (second < 10) {
		second = "0" + second;
	}

	var time = year + "-" + month + "-" + date + " " + hour + ":" + minutes
			+ ":" + second; // 2009-06-12 17:18:05
	return time;
}
