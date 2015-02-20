function cleanScope(func, global) {
	if(typeof func != "function") {
		throw Error("cleanScope expects Function argument");
	}
	
	if(typeof global == "undefined") global = {};
	
	var globalObj = Function('return this')();
	var funcStr = func.toString();
	var funcBody = funcStr.substring(funcStr.indexOf("{")+1, funcStr.lastIndexOf("}"));
	var skippedProps = funcStr.substring(funcStr.indexOf("(")+1, funcStr.indexOf(")"));
	skippedProps = skippedProps.replace(/\s/g, '');
	skippedProps = skippedProps.split(",");
	
	// Remove function arguments in function string
	funcStr = funcStr.substring(0, funcStr.indexOf("(")+1) + funcStr.substring(funcStr.indexOf(")"), funcStr.length);
	var skippedPropsMap = {};
	
	for(var skippedPropIndex in skippedProps) {
		var skippedPropName = skippedProps[skippedPropIndex];
		skippedPropsMap[skippedPropName] = true;
	}
	
	var evalStr = "(function(){ evalStr=undefined;delete evalStr; var ";
	for(var propName in globalObj) {
		if(skippedPropsMap[propName]) { continue; }
		evalStr += propName+"=undefined,";
	}
	
	evalStr = evalStr.split('');
	evalStr[evalStr.length-1] =";";
	evalStr = evalStr.join('');
	evalStr += funcBody + "}.bind(global)());";
	
	func = undefined; delete func;
	globalObj = undefined; delete globalObj;
	funcStr = undefined; delete funcStr;
	funcBody = undefined; delete funcBody;
	skippedProps = undefined; delete skippedProps;
	skippedPropsMap = undefined; delete skippedPropsMap;
	skippedPropIndex = undefined; delete skippedPropIndex;
	skippedPropName = undefined; delete skippedPropName;
	
	return eval(evalStr);
}
