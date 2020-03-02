/**
 * <pre>
 * 上海久科信息技术有限公司
 * Copyright (C): 2012
 * 
 * 文件名称：
 * com.nusof.iptv.common.json.JsonUtils.java
 * 
 * 文件描述: 
 * JSON数据输出公用类。
 * 
 * Notes:
 * 
 * 修改历史(作者/日期/改动描述):
 * 
 * 王彬/2012.04.15/初始化版本
 * </pre>
 */
package com.douya.common.json;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import org.apache.log4j.Logger;

import com.douya.common.PageModel;
import com.douya.common.utils.DateUtil;

/**
 * 为 json 生成字符串，或者转对象用的 json 工具类。 方法中会忽略 json 字样。
 * 
 * @date 2012-04-15
 * @author
 */
public class JsonUtils {
	public static final String TOTAL_PROPERTY = "sum"; // TOTAL_PROPERTY 属性
	public static final String SUCCESS_PROPERTY = "success"; // SUCCESS_PROPERTY
	public static final String ROOT = "root"; // ROOT 属性
	public static final String FORM_MSG = "msg";
	
	private static Logger logger = Logger.getLogger(JsonUtils.class);
	
	/**
	 * 向页面写入失败消息
	 * 
	 * @author 2012-04-15
	 * @param response
	 * @param msg
	 * @throws Exception
	 */
	public static void writeToPageFailure(HttpServletResponse response,
			String msg) throws Exception {
		response.setStatus(500);
		writeToPageForForm(response, false, "<span style=\"color: red;\">"
				+ msg + "</span>");
		throw new Exception(msg);
	}
	
	/**
	 * 向页面写入成功消息
	 * 
	 * @author @2012-04-15
	 * @param response
	 * @param msg
	 * @throws Exception
	 */
	public static void writeToPageSuccess(HttpServletResponse response,
			String msg) throws Exception {
		writeToPageForForm(response, true, "<span style=\"color: green;\">"
				+ msg + "</span>");
	}
	
	/**
	 * 为 Ext.FormPanel 返回标准的JSON格式并写到前台。
	 * 
	 * @author @2012-04-15
	 * @param response
	 * @param totalCount
	 *            总数
	 * @param jsonData
	 *            数据
	 * @throws Exception
	 */
	public static void writeToPageForForm(HttpServletResponse response,
			boolean success, String msg) throws Exception {
		JSONObject jo = new JSONObject();
		jo.put(SUCCESS_PROPERTY, success);
		jo.put(FORM_MSG, msg);
		writeToPage(response, jo.toString());
	}
	
	/**
	 * 将 jsonObject 或者 list 数据转为json字符串，使用 response 写出。
	 * 
	 * @author @2012-04-15
	 * @param response
	 * @param totalCount
	 *            总数
	 * @param jsonData
	 *            数据
	 * @throws Exception
	 */
	public static void writeToPageForStore(HttpServletResponse response,
			int totalCount, Object data) throws Exception {
		writeToPage(response, convertToStringForStore(totalCount, data));
	}
	
	/**
	 * 将封装的对象数据写到页面
	 * 
	 * @author @2010-9-17
	 * @param response
	 * @param pm
	 * @throws Exception
	 */
	public static void writeToPage(HttpServletResponse response, PageModel<?> pm)
			throws Exception {
		writeToPage(response, pm.getDataJson());
	}
	
	/**
	 * 常规的向页面写入json数据的方法。
	 * 
	 * @author @2010-9-17
	 * @param response
	 * @param json
	 * @throws Exception
	 */
	public static void writeToPage(HttpServletResponse response, String json)
			throws Exception {
		logger.debug("Json To Page: " + json);
		response.setContentType("text/json; charset=UTF-8");
		response.getWriter().write(json);
		response.getWriter().flush();
		response.getWriter().close();
	}
	
	/**
	 * 将对想判断类型转成对应的 json 对象或 json 数组
	 * 
	 * @author @2012-04-15
	 * @param data
	 * @return
	 */
	public static String convertToString(Object data) {
		String json = "";
		if (data.getClass().isArray() || data instanceof Collection<?>) {
			json = JSONArray.fromObject(data, JsonUtils.getCommonConfig())
					.toString();
		}
		else {
			json = JSONObject.fromObject(data, JsonUtils.getCommonConfig())
					.toString();
		}
		logger.debug("JsonString: " + json);
		return json;
	}
	
	/**
	 * @author @2012-04-15
	 * @param data
	 *            数据集
	 * @return
	 */
	public static String convertToStringForStore(Object data) {
		return convertToJSONObjectForStore(0, data, null, null, null)
				.toString();
	}
	
	/**
	 * @author @2012-04-15
	 * @param dataList
	 *            数据集，该数据集的单个类型应该为，totalCount 会取自传入数据大小。
	 * @param clazz
	 *            需要转换到 json 类型的类。
	 * @return
	 */
	public static String convertToStringForStore(Object data, Class<?> clazz) {
		return convertToJSONObjectForStore(0, data, null, null, clazz)
				.toString();
	}
	
	/**
	 * @author @2012-04-15
	 * @param totalCount
	 *            数据总数，为 0 的话会自动获取 dataList 的大小
	 * @param dataList
	 *            数据集，该数据集的单个类型应该为 @param clazz 的类型一致。
	 * @param clazz
	 *            需要转换到 json 类型的类。
	 * @return
	 */
	public static String convertToStringForStore(int totalCount, Object data) {
		return convertToJSONObjectForStore(totalCount, data, null, null, null)
				.toString();
	}
	
	/**
	 * @author @2012-04-15
	 * @param totalCount
	 *            数据总数，为 0 的话会自动获取 dataList 的大小
	 * @param dataList
	 *            数据集，该数据集的单个类型应该为 @param clazz 的类型一致。
	 * @param clazz
	 *            需要转换到 json 类型的类。
	 * @return
	 */
	public static String convertToStringForStore(int totalCount, Object data,
			Class<?> clazz) {
		return convertToJSONObjectForStore(totalCount, data, null, null, clazz)
				.toString();
	}
	
	/**
	 * @author @2012-04-15
	 * @param totalCount
	 *            数据总数
	 * @param dataList
	 *            数据集，该数据集的单个类型应该为 @param clazz 的类型一致。
	 * @param mapping
	 *            自定义映射类型，key = 类的真实属性, value = 映射后的放入Store中用的字段名。
	 * @param clazz
	 *            需要转换到 json 类型的类。
	 * @return
	 */
	public static String convertToStringForStore(int totalCount, Object data,
			List<String> filterFields, Class<?> clazz) {
		return convertToJSONObjectForStore(totalCount, data, null,
				filterFields, clazz).toString();
	}
	
	/**
	 * @author @2012-04-15
	 * @param totalCount
	 *            数据总数，
	 * @param dataList
	 *            数据集，该数据集的单个类型应该为 @param clazz 的类型一致。
	 * @param mapping
	 *            自定义映射类型，key = 类的真实属性, value = 映射后的放入Store中用的字段名。
	 * @param clazz
	 *            需要转换到 json 类型的类。
	 * @return
	 */
	public static String convertToStringForStore(int totalCount, Object data,
			Map<String, String> mapping, Class<?> clazz) {
		return convertToJSONObjectForStore(totalCount, data, mapping, null,
				clazz).toString();
	}
	
	/**
	 * Ext Store 核心转换方法
	 * 
	 * @author @2010-8-25
	 * @param totalCount
	 *            数据总数，
	 * @param dataList
	 *            数据集，该数据集的单个类型应该为 @param clazz 的类型一致。
	 * @param mapping
	 *            自定义映射类型，key = 类的真实属性, value = 映射后的放入Store中用的字段名。
	 * @param filterFields
	 *            需要过滤的类属性字段，哪些字段不需生成json。
	 * @param clazz
	 *            需要转换到 json 类型的类。
	 * @return
	 */
	public static JSONObject convertToJSONObjectForStore(int totalCount,
			Object data, Map<String, String> mapping,
			List<String> filterFields, Class<?> clazz) {
		// 生成标准json对象。
		JSONObject jo = new JSONObject();
		
		if (clazz != null) {
			JSONObject meta = new JSONObject();
			meta.put("totalProperty", JsonUtils.TOTAL_PROPERTY);
			meta.put("root", JsonUtils.ROOT);
			// meta.put("successProperty", JsonUtils.SUCCESS_PROPERTY);
			JSONArray fields = new JSONArray();
			// 将javabean字段转为 FIELD字段，暂不对类型进行设置。
			
			try {
				@SuppressWarnings("unchecked")
				Set<Object> fieldProperties = JSONObject.fromObject(
						clazz.newInstance()).keySet();
				JSONObject field;
				for (Object property : fieldProperties) {
					property = property.toString();
					// 过滤字段包含该属性，则过滤。
					if (filterFields != null && filterFields.contains(property)) {
						continue;
					}
					field = new JSONObject();
					field.put("mapping", property);
					// 将字段映射过来。
					if (mapping != null && mapping.containsKey(property)) {
						property = mapping.get(property);
						mapping.remove(property);
					}
					field.put("name", property);
					// 数据类型的处理，暂时不处理
					fields.add(field);
				}
				meta.put("fields", fields);
				jo.put("metaData", meta);
			}
			catch (Exception e) {
				logger.debug("处理失败，失败原因：" + e.getLocalizedMessage());
			}
		}
		JSONArray root = JSONArray
				.fromObject(data, JsonUtils.getCommonConfig());
		
		jo.put(JsonUtils.TOTAL_PROPERTY, totalCount == 0 ? root.size()
				: totalCount);
		jo.put(JsonUtils.ROOT, root);
		// logger.info("JsonString: " + jo.toString());
		return jo;
	}
	
	/**
	 * 获取 json 的通用配置
	 * 
	 * @author @2012-04-15
	 * @return
	 */
	public static JsonConfig getCommonConfig() {
		/*---- 做属性配置 start------*/
		JsonConfig conf = new JsonConfig();
		// 加入支持枚举对象匹配的匹配器。
		conf.setJsonValueProcessorMatcher(new JsonEnumValueProcessorMatcher());
		// 加入枚举对象处理器。
		conf.registerJsonValueProcessor(Enum.class, new EnumToJsonProcessor());
		// 加入空属性去除过滤器。
		conf.setJsonPropertyFilter(new IgnoreNullPropertyFilter());
		// 加入时间格式化处理器。
		conf.registerJsonValueProcessor(Timestamp.class,
				new TimestampToJsonProcessor(DateUtil.DATE_AND_TIME_FORMATER));
		/*---- 做属性配置 end------*/
		return conf;
	}
	
	/***
	 * 将对象转换为JSON对象
	 * 
	 * @param object
	 * @return
	 */
	public static JSONObject toJSONObject(Object object) {
		return JSONObject.fromObject(object);
	}
	
	/***
	 * 将对象转换为HashMap
	 * 
	 * @param object
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static HashMap<String, Object> toHashMap(Object object) {
		HashMap<String, Object> data = new HashMap<String, Object>();
		JSONObject jsonObject = JsonUtils.toJSONObject(object);
		Iterator it = jsonObject.keys();
		while (it.hasNext()) {
			String key = String.valueOf(it.next());
			Object value = jsonObject.get(key);
			data.put(key, value);
		}
		
		return data;
	}
	
}
