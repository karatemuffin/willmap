


var callfun = function(){
var leaf_ex = document.createElement("script");
leaf_ex.innerHTML=`

function addslashes (str) {
  return (str + '')
    .replace(/[\\"']/g, '\\$&')
    .replace(/\u0000/g, '\\0')
}


  const map = L.map('myMap').setView([47.0313,15.4105], 12);
  const prefix_mmo = 'https://cache.willhaben.at/mmo/';
  const prefix_willhaben = 'https://willhaben.at/';

  const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  
  var data = JSON.parse(document.getElementById('__NEXT_DATA__').textContent);
  
  var markers = L.markerClusterGroup();
  data.props.pageProps.searchResult.advertSummaryList.advertSummary.forEach((item) => {
    var array = [];
    array['ADDRESS'] = 'NA';
    item.attributes.attribute.forEach((entry) => {
      array[entry.name] = addslashes(entry.values[0]);
    });
    const coords = array['COORDINATES'].split(",").map(Number);
//    console.log(coords);    
    var tmp = L.marker(coords).addTo(map);

//    console.log('<a href=\"' + prefix_willhaben +   array['SEO_URL'] + '\" target=\"_blank\">Link</a>');
    tmp.bindPopup('<b>' + array['HEADING']  + '</b><br>' + array['POSTCODE'] +' ' + array['LOCATION'] +', ' +array['ADDRESS'] +'<br>' + array['ESTATE_SIZE'] + 'm²<br>' + array['PRICE'] + '€<br><a href=\"' + prefix_willhaben +   array['SEO_URL'] + '\" target=\"_blank\">Link</a><br> <img src=\"' + prefix_mmo + array['MMO'] +'\" height=\"200px\">');
    //let mess = "<b>" + array['HEADING'] + "</b><br>" + array['POSTCODE'] +" " + array['LOCATION'] +", " +array['ADDRESS'] +"<br>" + array['ESTATE_SIZE'] + "m²<br>" + array['PRICE'] + "€<br>" + "<a href=\"" + prefix_willhaben +   array['SEO_URL'] + "\" target=\"_blank\">Link</a><br> <img src=\"" + prefix_mmo + array['MMO'] +"\" height=\"200px\">";   
    //console.log(mess);
   // tmp.bindPopup(mess);
    
    markers.addLayer(tmp);        
  });
  
  map.addLayer(markers);
  
  
//  foreach ($data->props->pageProps->searchResult->advertSummaryList->advertSummary as $item) {
  `;


document.body.appendChild(leaf_ex);

}


document.body.style.border = "5px solid red";
var leaf_css = document.createElement("link");
leaf_css.rel = "stylesheet";
leaf_css.type = "text/css";
leaf_css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
//leaf_css.integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
//leaf_css.crossorigin="";
document.head.appendChild(leaf_css);

var leaf_css1 = document.createElement("link");
leaf_css1.rel = "stylesheet";
leaf_css1.type = "text/css";
leaf_css1.href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css";
document.head.appendChild(leaf_css1);

var leaf_css2 = document.createElement("link");
leaf_css2.rel = "stylesheet";
leaf_css2.type = "text/css";
leaf_css2.href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css";
document.head.appendChild(leaf_css2);


	
	

var call1 = function(){

var leaf_js1 = document.createElement("script");
leaf_js1.src="https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster-src.js";
//leaf_js.integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
leaf_js1.type = "text/javascript";
//leaf_js1.crossorigin="";
leaf_js1.onload = callfun;


document.head.appendChild(leaf_js1);

}


var leaf_js = document.createElement("script");
leaf_js.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
//leaf_js.integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
leaf_js.type = "text/javascript";
//leaf_js.crossorigin="";
//leaf_js.onreadystatechange = callfun;
leaf_js.onload = call1;
document.head.appendChild(leaf_js);


document.getElementById("skip-to-resultlist").innerHTML = `<div id="myMap" style="width: 600px; height: 400px; border: 5px solid red;"></div>`;





console.log("foo");




//myfun();

/*document.head.innerHTML += `<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>
 <!-- Make sure you put this AFTER Leaflet's CSS -->
 <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin=""></script>`;
*/
/*
var callback = function(){
  console.log("asd");
  var map = L.map('myMap').setView([51.505, -0.09], 13);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
};
*/






/*
var leaf_map = document.createElement("script");

leaf_map.innerHTML=``;
document.head.appendChild(leaf_map);
*/






/*let createData = {
  type: "detached_panel",
  url: "willmap.html",
  width: 250,
  height: 100,
};
let creating = browser.windows.create(createData);
*/

/*



let createData = {
  type: "detached_panel",
  url: "willmap.html",
  width: 250,
  height: 100,
};
let creating = browser.windows.create(createData);





/*const CSS = `#fixedbutton {
    position: fixed;
    top: 5px;
    right: 5px;
    }`;
*/

//document.getElementById("main-header").innerHTML += `<button id="myBtn">Willmap</button>`;
