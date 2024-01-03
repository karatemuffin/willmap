var leaf_css = document.createElement("link");
leaf_css.rel = "stylesheet";
leaf_css.type = "text/css";
leaf_css.href = chrome.runtime.getURL("js/leaflet.css");
document.head.appendChild(leaf_css);

var leaf_css1 = document.createElement("link");
leaf_css1.rel = "stylesheet";
leaf_css1.type = "text/css";
leaf_css1.href=chrome.runtime.getURL("js/MarkerCluster.css");
document.head.appendChild(leaf_css1);

var leaf_css2 = document.createElement("link");
leaf_css2.rel = "stylesheet";
leaf_css2.type = "text/css";
leaf_css2.href=chrome.runtime.getURL("js/MarkerCluster.Default.css");
document.head.appendChild(leaf_css2);

var callfun = function(){
  var leaf_ex = document.createElement("script");
  leaf_ex.src=chrome.runtime.getURL("js/content.js");
  leaf_ex.type = "text/javascript";
  leaf_js.integrity="sha256-AAocQZ5C0xp7fcfBi6C3bGR4xYMHvDr0w+7YsDRT5Cg=";
  document.body.appendChild(leaf_ex);
}

var call1 = function(){
  var leaf_js1 = document.createElement("script");
  leaf_js1.src=chrome.runtime.getURL("js/leaflet.markercluster.js");
  leaf_js1.type = "text/javascript";
  leaf_js1.onload = callfun;
  document.head.appendChild(leaf_js1);
}

var leaf_js = document.createElement("script");
leaf_js.src=chrome.runtime.getURL("js/leaflet.js");
leaf_js.type = "text/javascript";
leaf_js.integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
leaf_js.onload = call1;
document.head.appendChild(leaf_js);

var leaf_div = document.createElement("div");
leaf_div.id="myMap";
leaf_div.style="width: auto; height: 600px; border: 2px solid green;";
let targetDiv = document.getElementById("skip-to-resultlist")
let parentDiv = targetDiv.parentNode;
parentDiv.insertBefore(leaf_div, targetDiv);
