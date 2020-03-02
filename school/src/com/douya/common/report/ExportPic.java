package com.douya.common.report;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fusioncharts.exporter.ErrorHandler;
import com.fusioncharts.exporter.FusionChartsExportHelper;
import com.fusioncharts.exporter.beans.ExportBean;

public class ExportPic {
	@SuppressWarnings("unused")
	public static String excute(HttpServletRequest request,
			HttpServletResponse response) {
		String WEB_ROOT_PATH = request.getSession().getServletContext()
				.getRealPath("/");
		ExportBean localExportBean = FusionChartsExportHelper
				.parseExportRequestStream(request);
		
		String exportFormat = (String) localExportBean
				.getExportParameterValue("exportformat");
		StringBuffer err_warn_Codes = new StringBuffer();
		if (localExportBean.getMetadata().getWidth() == -1
				|| localExportBean.getMetadata().getHeight() == -1
				|| localExportBean.getMetadata().getWidth() == 0
				|| localExportBean.getMetadata().getHeight() == 0) {
			
			err_warn_Codes.append("E101,");
		}
		
		if (localExportBean.getMetadata().getBgColor() == null) {
			// Background color not available
			err_warn_Codes.append("W513,");
		}
		
		if (localExportBean.getStream() == null) {
			
			// If image data not available
			// Raise Error E100
			err_warn_Codes.append("E100,");
		}
		String exportAction = (String) localExportBean
				.getExportParameterValue("exportaction");
		boolean isHTML = false;
		if (exportAction.equals("download"))
			isHTML = true;
		
		if (!exportAction.equals("download")) {
			String fileNameWithoutExt = (String) localExportBean
					.getExportParameterValue("exportfilename");
			String extension = FusionChartsExportHelper
					.getExtensionFor(exportFormat.toLowerCase());
			;
			String fileName = fileNameWithoutExt + "." + extension;
			err_warn_Codes.append(ErrorHandler.checkServerSaveStatus(
					WEB_ROOT_PATH, fileName));
		}
		String pathToWebAppRoot = request.getSession().getServletContext()
				.getRealPath("/");
		localExportBean.addExportParameter("webapproot", pathToWebAppRoot);
		String fileName = "";
		try {
			// Class exporterClass = Class.forName(exporterClassName);
			FCExporter_IMG fcExporter = new FCExporter_IMG();
			Object exportObject = fcExporter.exportProcessor(localExportBean);
			fileName = fcExporter.exportOutput(exportObject, response);
		}
		catch (Exception e) {
			
			err_warn_Codes.append("E404");
		}
		return fileName;
	}
}
