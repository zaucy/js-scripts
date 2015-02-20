Calls a function with a clean scope. No access to global variables including built-ins! Optionally you can provide the function with arguments and the argument names will be used to exclude those objects.

```JavaScript
cleanScope(function(console) {
	console.log("I can use the `console` object!");
});
```

cleanScope acceps 1 - 3 arguments and can be called in these ways. Hopefully this is self explanatory. 
```JavaScript
cleanScope(func, global = {}, removeBuiltIns = true);

cleanScope(func, removeBuiltIns);
cleanSCope(func, global);
cleanScope(func);
```

`func` is the function that will be called with the clean scope.

`global` is what's used as the scopes global object. Anything that func sets to `this` or `global` will be reflected on that object.

`removeBuiltIns` will do exactly that. It will remove builtins inside the clean scope called function. By default this is set to `true`.

## Caveat
You may *not* use a native function with cleanScope. This includes functions created with `.bind`! To bypass this caveat you can create another function that calls that one.

```JavaScript
var bindObject = /* ... */;

cleanScope(function(bindObject) {
	funcWithBoundObject.bind(bindObject)();
});

// This will not work.
cleanScope(funcWithBoundObject.bind(bindObject));
```
