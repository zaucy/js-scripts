(function(exports) {
	var global = Function('return this')();
	if(typeof global.ImportedData == "undefined") {
		function ImportedData() {}
		
		ImportedData.prototype = {
			data: null,
			ondata: function() { },
			oncomplete: function() { }
		};
		
		global.ImportedData = ImportedData;
	}
	var currentScript = document.currentScript;
	var dataUrl = currentScript.getAttribute("data-url");
	var dataType = currentScript.getAttribute("data-type");
	var dataId = currentScript.getAttribute("data-id");
	
	if(typeof dataUrl != "string" || dataUrl == "") {
		return;
	}
	
	if(typeof exports.importedData == "undefined") {
		exports.importedData = [];
	}
	
	var importedData = new ImportedData;
	
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if(request.readyState == 4) {
			var responseStr = request.response.toString();
			if(dataType == "application/json" || dataType == "json") {
				try {
					importedData.data = JSON.parse(responseStr);
				} catch(err) {
					importedData.onerror.bind(importedData)(err);
				}
				
				importedData.oncomplete.bind(importedData)();
			} else {
				importedData.data = request.response;
				importedData.oncomplete.bind(importedData)();
			}
		}
	};
	request.open("GET", dataUrl, true);
	request.send();
	
	exports.importedData.push(importedData);
	if(typeof dataId == "string" && dataId != "") {
		
		dataId = dataId.replace(/[^a-z0-9\.]/gi, "");
		
		eval("exports." + dataId + "= importedData;");
	}
	
}(window));
