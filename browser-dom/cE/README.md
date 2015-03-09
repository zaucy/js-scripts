## cE (createElement)
cE takes a string similar to CSS and creates an element based on it. 

#### Examples
```JavaScript

cE("div");
// <div></div>

cE("span.class-name");
// <span class="class-name"></span>

cE("ul#my-list")
// <ul id="my-list></ul>

cE("input[type=text]");
// <input type="text">

cE("link[rel=stylesheet][href=/style.css]")
// <link rel="stylesheet" href="/style.css">
```
