Calls a function with a clean scope. No access to global variables including built-ins! Optionally you can provide the function with arguments and the argument names will be used to exclude those objects.

```JavaScript
cleanScope(function(console) {
	console.log("I can use the `console` object!");
});
```

## Caveat
You may use a native function with cleanScope. This includes functions created with `.bind`! To bypass this caveat you can create another function that calls that one.

```JavaScript
var bindObject = /* ... */;

cleanScope(function(bindObject) {
	funcWithBoundObject.bind(bindObject)();
});

// This will not work.
cleanScope(funcWithBoundObject.bind(bindObject));
```
