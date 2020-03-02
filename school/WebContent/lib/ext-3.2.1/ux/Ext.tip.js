Ext.ns('Ext.tip');
Ext.tip = function() {
	var msgCt;
	var isFirst = true;
	var isTipping = false;
	function createBox(t, s) {
		return [
				'<div style="font-size: 14px;">',
				'<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
				'<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc" style="font-size: 14px;" ><h3>',
				t,
				'</h3>',
				s,
				'</div></div></div>',
				'<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
				'</div>'].join('');
	}
	return {
		msg : function(title, format, callback) {
			if (isTipping) {
				return;
			}
			isTipping = true;
			if (!msgCt) {
				msgCt = Ext.DomHelper.insertFirst(document.body, {
							style : 'position: absolute; width: 250px; z-index: 20000;'
						}, true);
			}
			// 修正偏移问题。
			if (isFirst && Ext.isIE7) {
				msgCt.alignTo(document, 't-t');
				isFirst = false;
			}
			msgCt.alignTo(document, 't-t');
			var s = String.format.apply(String, Array.prototype.slice.call(
							arguments, 1));
			var m = Ext.DomHelper.append(msgCt, {
						html : createBox(title, s)
					}, true);
			m.slideIn('t').pause(1.5).ghost("t", {
						remove : true,
						callback : function() {
							isTipping = false;
							if (callback != null) {
								callback();
							}
						}
					});
		}
	};
}();