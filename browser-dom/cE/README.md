## cE (createElement)
cE takes a string similar to a CSS selector and creates an element based on it. 

#### Examples
```JavaScript

cE("div")
// <div></div>

cE("span.class-name")
// <span class="class-name"></span>

cE("ul#my-list")
// <ul id="my-list></ul>

cE("input[type=text]")
// <input type="text">

cE("link[rel=stylesheet][href=/style.css]")
// <link rel="stylesheet" href="/style.css">
```

*Create multiple elements!*
```JavaScript
cE("ul#the-list > 4^li.item")
// <ul id="the-list">
//   <li class="item"></li>
//   <li class="item"></li>
//   <li class="item"></li>
//   <li class="item"></li>
// </ul>
```

## Browser Compatibility
The script uses [`String.trim()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim) and [`Element.classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) a few times which isn't supported by a few older browsers. Some polyfill would be needed (or just modify the code to not use them.)
