function hexunRoll() {
	this.rolltext = '';
	this.rollTextCopy = '';
	this.rollArea = '';
	this.rollGap = 0;
	this.rollPos = 0;
	this.preItem = '';
	this.nextItem = '';
	this.hexunRoll = '';
}
hexunRoll.prototype.init = function() {
	this.rollTextCopy.innerHTML = this.rolltext.innerHTML;
	this.hexunRoll.obj = this;
	this.hexunRoll.onmouseover = function() {
		var _hexunRoll = this.obj;
		if (_hexunRoll.rollTimer) clearTimeout(_hexunRoll.rollTimer);
	};
	this.hexunRoll.onmouseout = function() {
		var _hexunRoll = this.obj;
		_hexunRoll.startRoll();
	};
	this.preItem.obj = this;
	this.preItem.onclick = function() {
		var _preItem = this.obj;
		_preItem.showPreItem();
	};
	this.nextItem.obj = this;
	this.nextItem.onclick = function() {
		var _nextItem = this.obj;
		_nextItem.showNextItem();
	};
};
hexunRoll.prototype._roll = function() {

	var s = 0,
	_this = this;

	var timer = setInterval(function() {
		if (s >= _this.rollGap) {
			clearInterval(timer);

			_this.rollPos += _this.rollGap;
			return;
		}

		if (_this.rollArea.scrollTop >= _this.rollHeight) {
			_this.rollArea.scrollTop = _this.rollPos = 0;
		}

		s += 1;
		_this.rollArea.scrollTop = _this.rollPos + s;

	},
	30);
};
hexunRoll.prototype.startRoll = function() {
	var _this = this;
	this.rollHeight = this.rolltext.offsetHeight;

	this.rollTimer = setInterval(function() {
		_this._roll();
	},
	5000); //滚动间隔
};

hexunRoll.prototype.showNextItem = function() {
	if (this.rollArea.scrollTop >= this.rollHeight) {
		this.rollArea.scrollTop = this.rollPos = 0;
	} else {
		this.rollArea.scrollTop += this.rollGap;
		this.rollPos += this.rollGap;
	}
};
hexunRoll.prototype.showPreItem = function() {
	if (this.rollArea.scrollTop == 0) {
		this.rollArea.scrollTop = this.rollPos = this.rollHeight;
	} else {
		this.rollArea.scrollTop -= this.rollGap;
		this.rollPos -= this.rollGap;
	}
};