/**
 * 使用 calendar 组件结合 Ext 的控件。 使用方式和 Ext.form.DateField 一样。
 */
Ext.ns('Ext.ux');
Ext.ux.CalenderField = Ext.extend(Ext.form.TriggerField, {
			format : 'yyyy-MM-dd HH:mm:ss',
			triggerClass : 'x-form-date-trigger',
			minValue : '1900-01-01 00:00:00',
			maxValue : '2099-12-31 23:59:59',
			onTriggerClick : function() {
				var fmt = this.format;
				var min = this.minValue;
				var max = this.maxValue;
				WdatePicker({
							skin : 'blue',
							el : this.el.id,
							minDate : min,
							maxDate : max,
							dateFmt : fmt
						});
			}
		});