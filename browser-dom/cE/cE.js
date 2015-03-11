(function(exports) {

	var addText = function(str) {
		
	};

	function cE(str) {
		var tagName = "";
		var lastSymbol = null;
		var lastSymbolIndex = 0;
		var el = null;
		var els = [];
		var elRepeat = 0;
		var bRetArray = false;
		str += '\0';
		for(var i=0; str.length > i; i++) {
			var c = str[i];
			if(lastSymbol == '[') {
				if(c != ']') continue;
				var attr = str.substring(lastSymbolIndex+1, i);
				var equalIndex = attr.indexOf('=');
				var attrName, attrValue = "";
				if(equalIndex == -1) {
					attrName = attr;
				} else {
					attrName = attr.substring(0, equalIndex);
					attrValue = equalIndex == -1 ? "" : attr.substr(equalIndex+1);
				}

				el.setAttribute(attrName, attrValue);

				lastSymbol = c;
				lastSymbolIndex = i;
			} else
			if(lastSymbol == '\'') {
				if(c != '\'') continue;
				el.textContent += str.substring(lastSymbolIndex+1, i);

				lastSymbol = '\0';
				lastSymbolIndex = i;
			} else
			if(lastSymbol == '"') {
				if(c != '"') continue;
				el.textContent += str.substring(lastSymbolIndex+1, i);

				lastSymbol = '\0';
				lastSymbolIndex = i;
			} else
			if(c == '#' || c == '.' || c == '[' || c ==']' || c == '\0' || c == '>' || c =='\'' || c =='"' || c == '+') {
				if(!lastSymbol) {
					tagName = str.substr(0, i).trim();
					var multiIndex = tagName.indexOf('^');
					if(multiIndex > -1) {
						bRetArray = true;
						elRepeat = parseInt(tagName.substring(0, multiIndex))-1;
						tagName = tagName.substr(multiIndex+1);
					}
					el = document.createElement(tagName);
				} else
				if(lastSymbol == '#') {
					el.id = str.substring(lastSymbolIndex+1, i).trim();
				} else
				if(lastSymbol == '.') {
					el.classList.add(str.substring(lastSymbolIndex+1, i).trim());
				}

				if(c == '>') {
					var subEl = cE(str.substring(i+1));
					if(subEl.length > 0) {
						for(var n=0; subEl.length > n; n++) {
							el.appendChild(subEl[n]);
						}
					} else {
						el.appendChild(subEl);
					}
					break;
				} else
				if(c == '+') {
					bRetArray = true;
					els.push(el);
					var subEls = cE(str.substr(i+1));
					if(subEls.length > 0) {
						for(var n=0; subEls.length-1 > n; n++) {
							els.push(subEls[n]);
						}
						el = subEls[subEls.length-1];
					} else {
						el = subEls;
					}

					break;
				}

				lastSymbol = c;
				lastSymbolIndex = i;
			}

		}

		els.push(el);
		var retEls = [];
		for(var n=0; els.length > n; n++) retEls.push(els[n]);

		for(; elRepeat != 0; --elRepeat) {
			for(var n=0; els.length > n; n++) {
				retEls.push(els[n].cloneNode(true));
			}
		}

		return bRetArray ? retEls : el;
	}

	exports['cE'] = cE;

}(window));
