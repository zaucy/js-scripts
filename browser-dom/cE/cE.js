(function(exports) {
	
	function cE(str) {
		var tagName = "";
		var lastSymbol = null;
		var lastSymbolIndex = 0;
		var el = null;
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
			if(c == '#' || c == '.' || c == '[' || c ==']' || c == '\0') {
				if(!lastSymbol) {
					tagName = str.substr(0, i);
					el = document.createElement(tagName);
				} else
				if(lastSymbol == '#') {
					el.id = str.substring(lastSymbolIndex+1, i);
				} else
				if(lastSymbol == '.') {
					el.classList.add(str.substring(lastSymbolIndex+1, i));
				}
				
				lastSymbol = c;
				lastSymbolIndex = i;
			}
			
		}
		
		return el;
	}
	
	exports['cE'] = cE;
	
}(window));