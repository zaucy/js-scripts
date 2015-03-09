(function(exports) {
	
	function cE(str) {
		var tagName = "";
		var lastSymbol = null;
		var lastSymbolIndex = 0;
		var el = null;
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
			if(c == '#' || c == '.' || c == '[' || c ==']' || c == '\0' || c == '>') {
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
				}
				
				lastSymbol = c;
				lastSymbolIndex = i;
			}
			
		}
		
		var els = [el];
		
		for(; elRepeat != 0; --elRepeat) {
			els.push(el.cloneNode(true));
		}
		
		return bRetArray ? els : el;
	}
	
	exports['cE'] = cE;
	
}(window));