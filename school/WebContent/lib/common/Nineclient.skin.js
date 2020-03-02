Nineclient = Nineclient || {};
/**
 * 换肤管理器。 崭新的换肤管理器，只需要定义 skin 的字符串值(该值需要与规则相对应) <br />
 * 本系统的规则为定义的需要替换的css文件夹/文件名一律为： theme-{name}，使用本管理器可以方便的实现换肤功能。
 */
Nineclient.skin = function() {
	/**
	 * 文件动态替换并加载到cookies，下次访问直接读取cookies，有则加载 styles 样式，无则加载默认，放置序号。
	 */
	// 当前皮肤的风格
	this.styles = ['default', 'red'];
	// 当前皮肤
	this.currentSkin = 0;
};

/**
 * 下一个皮肤序号
 */
Nineclient.skin.prototype.nextSkin = function() {
	(this.currentSkin + 1 == this.styles.length)
			? this.currentSkin = 0
			: this.currentSkin++;
	return this.currentSkin;
};
/**
 * 为皮肤赋值，可以用于调试。
 * 
 * @param {}
 *            sameName
 */
Nineclient.skin.prototype.setSrcs = function(skinName) {
	var links = document.getElementsByTagName('link');
	for (var i = 0; i < links.length; i++) {
		var href = links[i].href;
		var m = href.match(/theme-[a-z]*/igm);
		if (m != null) {
			if(m == 'theme-' + skinName) {
				return;
			}
			links[i].href = href.replace(m, 'theme-' + skinName);
		}
	}
};

/**
 * 换肤方法
 * 
 * @param {}
 *            num 更换的序号。即为 this.styles 数组号。不传默认取当前皮肤的下一个。
 */
Nineclient.skin.prototype.change = function(num) {
	num = num == null ? 0 : num;
	var style = this.styles[num];
	if (style == null && num != 0) {
		this.change(0);
	}

	var name = this.styles[num];
	this.setSrcs(name);
	this.currentSkin = num;
	// 超期时间设置为一年
	Cookies.set('iptv-style-v2-', num, new Date(new Date().getTime()
					+ 31536000000));
	return this.currentSkin;
};

/**
 * 清理皮肤，删掉所有
 */
Nineclient.skin.prototype.clear = function() {
	this.setSrcs('');
};

Nineclient.skin = new Nineclient.skin();
Ext.r(function() {
			// 动态切换页面的样式。
			Nineclient.skin.change(Cookies.get('iptv-style-v2-'));
		});