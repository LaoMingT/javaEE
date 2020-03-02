package com.douya.common.report;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;

import javax.imageio.stream.FileImageOutputStream;
import javax.servlet.http.HttpServletResponse;

import com.fusioncharts.exporter.ErrorHandler;
import com.fusioncharts.exporter.FusionChartsExportHelper;
import com.fusioncharts.exporter.beans.ChartMetadata;
import com.fusioncharts.exporter.beans.ExportBean;
import com.fusioncharts.exporter.encoders.BasicEncoder;
import com.fusioncharts.exporter.encoders.JPEGEncoder;
import com.fusioncharts.exporter.generators.ImageGenerator;

/**
 * 
 * @author InfosoftGlobal (P) Ltd.
 * 
 */
public class FCExporter_IMG {

	private ExportBean exportBean = null;

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.fusioncharts.exporter.resources.FcExporter_Format#exportOutput(java
	 * .lang.Object, javax.servlet.http.HttpServletResponse, java.lang.String,
	 * int)
	 */

	@SuppressWarnings("unused")
	public String exportOutput(Object exportObj, HttpServletResponse response) {
		String action = (String) exportBean
				.getExportParameterValue("exportaction");
		String exportFormat = (String) exportBean
				.getExportParameterValue("exportformat");
		String exportTargetWindow = (String) exportBean
				.getExportParameterValue("exporttargetwindow");

		String fileNameWithoutExt = (String) exportBean
				.getExportParameterValue("exportfilename");
		String extension = FusionChartsExportHelper
				.getExtensionFor(exportFormat.toLowerCase());
		String fileName = fileNameWithoutExt + "." + extension;

		StringBuffer err_warn_Codes = new StringBuffer();

		BufferedImage chartImage = (BufferedImage) exportObj;
		boolean isHTML = false;
		if (action.equals("download"))
			isHTML = true;

		String noticeMessage = "";
		String meta_values = exportBean.getMetadataAsQueryString(null, false,
				isHTML);

		if (!action.equals("download")) {
			noticeMessage = "&notice=";
			String pathToSaveFolder = (String) exportBean
					.getExportParameterValue("webapproot")
					+ File.separator
					+ FusionChartsExportHelper.SAVEPATH;
			File saveFolder = new File(pathToSaveFolder);

			String completeFilePath = pathToSaveFolder + File.separator
					+ fileName;
			String completeFilePathWithoutExt = pathToSaveFolder
					+ File.separator + fileNameWithoutExt;
			File saveFile = new File(completeFilePath);
			if (saveFile.exists()) {
				noticeMessage += ErrorHandler.getErrorForCode("W509");
				if (!FusionChartsExportHelper.OVERWRITEFILE) {
					if (FusionChartsExportHelper.INTELLIGENTFILENAMING) {
						noticeMessage += ErrorHandler.getErrorForCode("W514");
						completeFilePath = FusionChartsExportHelper
								.getUniqueFileName(completeFilePathWithoutExt,
										extension);
						File tempFile = new File(completeFilePath);
						fileName = tempFile.getName();
						noticeMessage += ErrorHandler.getErrorForCode("W515")
								+ fileName;
						err_warn_Codes.append("W515,");
					}
				}
			}
			String pathToDisplay = FusionChartsExportHelper.HTTP_URI + "/"
					+ fileName;
			if (FusionChartsExportHelper.HTTP_URI.endsWith("/")) {
				pathToDisplay = FusionChartsExportHelper.HTTP_URI + fileName;
			}

			meta_values = exportBean.getMetadataAsQueryString(pathToDisplay,
					false, isHTML);
			try {
				// Now encode and save to file
				FileImageOutputStream fios = new FileImageOutputStream(
						new File(completeFilePath));
				if (exportFormat.toLowerCase().equalsIgnoreCase("jpg")
						|| exportFormat.toLowerCase().equalsIgnoreCase("jpeg")) {
					JPEGEncoder jpegEncoder = new JPEGEncoder();
					try {
						jpegEncoder.encode(chartImage, fios);
					} catch (Throwable e) {
						// TODO Unable to encode the buffered image
						err_warn_Codes.append("E516,");
					}
					chartImage = null;
				} else {

					BasicEncoder basicEncoder = new BasicEncoder();
					try {
						basicEncoder.encode(chartImage, fios, 1F,
								exportFormat.toLowerCase());
					} catch (Throwable e) {
						System.out
								.println(" Unable to encode the buffered image");
						err_warn_Codes.append("E516,");
					}
					chartImage = null;
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else {
			OutputStream os = null;
			try {
				response.setContentType(FusionChartsExportHelper
						.getMimeTypeFor(exportFormat.toLowerCase()));

				os = response.getOutputStream();

				if (exportTargetWindow.equalsIgnoreCase("_self")) {
					response.addHeader("Content-Disposition",
							"attachment; filename=\"" + fileName + "\"");
					// response.addHeader("Content-length",""+ios.length());
				} else {
					response.addHeader("Content-Disposition",
							"inline; filename=\"" + fileName + "\"");
				}
				if (exportFormat.toLowerCase().equalsIgnoreCase("jpg")
						|| exportFormat.toLowerCase().equalsIgnoreCase("jpeg")) {
					JPEGEncoder jpegEncoder = new JPEGEncoder();
					try {
						jpegEncoder.encode(chartImage, os);
						os.flush();
					} catch (Throwable e) {
					} finally {
						os.close();
					}
					chartImage = null;
				} else {

					BasicEncoder basicEncoder = new BasicEncoder();
					try {
						basicEncoder.encode(chartImage, os, 1F,
								exportFormat.toLowerCase());
						os.flush();
					} catch (Throwable e) {
						return null;
					} finally {
						os.close();
					}
					chartImage = null;
				}

			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} finally {
				try {
					if (null != os) {
						os.close();
					}
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return fileName;
	}

	public Object exportProcessor(ExportBean pExportBean) {
		exportBean = pExportBean;
		String stream = (String) exportBean.getStream();
		ChartMetadata metadata = exportBean.getMetadata();
		BufferedImage chartImage = ImageGenerator.getChartImage(stream,
				metadata);

		return chartImage;
	}

}
