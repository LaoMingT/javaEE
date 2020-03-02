/**
 * 常用 ext grid column 列头渲染方式。 <br />
 * return 开头的需要在 renderer 里面进行返回，传值。 <br />
 * 其他则直接作为 handler 传入即可。
 */
Ext.ns('Nineclient.renderer');

/**
 * function 链接，点击调用页面方法。 <br />
 * 例如:<br />
 * renderer: function(v, m, r){ <br />
 * var dn = v; <br />
 * var fn = 'showWindows('+r.get('id')+', "'+r.get('name')+'")'; <br />
 * return Nineclient.renderer.returnFunc(dn, fn); <br /> }; <br />
 */
Nineclient.renderer.returnFunc = function(displayName, funcName) {
	return ['<a ', 'style="color:#0000FF; text-decoration:underline;" ',
			'href="javascript:;" ', 'onclick="', funcName, ';" >', displayName,
			'</a>'].join('');
};

/**
 * link 链接。 target 可以为空，默认是 _blank 例如:<br />
 * renderer: function(v, m, r){ <br />
 * var dn = v; <br />
 * var link = 'http://www.google.com?method=' + r.get('id') ; <br />
 * return Nineclient.renderer.returnLink(dn, link, '_self'); <br /> }; <br />
 */
Nineclient.renderer.returnLink = function(displayName, link, target) {
	return ['<a ', 'target="', target ? target : '_blank', '" ',
			'style="color:#0000FF; text-decoration:underline;" ', 'href="',
			link, '" > ', displayName, '</a>'].join('');
};

/**
 * 是否有效<br />
 * renderer: Nineclient.renderer.vaild; <br />
 */
Nineclient.renderer.vaild = function(v, m, r) {
	if (v) {
		m.attr = 'style="color: red;"';
		return '有效';
	} else {
		m.attr = 'style="color: green;"';
		return '无效';
	}
};

/**
 * 异步请求时返回loading图标， <br />
 * renderer: function(v, m, r){ <br />
 * return Nineclient.renderer.returnAjax(r.get('programId')); <br /> }; <br />
 */
Nineclient.renderer.returnAjax = function(uniId) {
	return [
			'<span id="' + uniId + '">',
			'<img alt="loading" src="'
					+ BASE_PATH
					+ '/lib/ext-3.2.1/resources/images/default/grid/loading.gif" />',
			'</span>'].join('');
};
