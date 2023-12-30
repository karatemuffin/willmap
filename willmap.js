


var callfun = function(){
var leaf_ex = document.createElement("script");
leaf_ex.innerHTML=`
function addslashes (str) {
  return (str + '')
    .replace(/[\\"']/g, '\\$&')
    .replace(/\u0000/g, '\\0')
}

const map = L.map('myMap').setView([47.0313,15.4105], 11);
const prefix_mmo = 'https://cache.willhaben.at/mmo/';
const prefix_willhaben = 'https://willhaben.at/';

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



async function addMarker(dd){
  var markers = L.markerClusterGroup();
  map.eachLayer((layer) => {
     if(layer['_latlng']!=undefined)
         layer.remove();
  });
  dd.advertSummaryList.advertSummary.forEach((item) => {
    var array = [];
    array['ADDRESS'] = 'NA';
    item.attributes.attribute.forEach((entry) => {
      array[entry.name] = addslashes(entry.values[0]);
    });
    const coords = array['COORDINATES'].split(",").map(Number);
    var tmp = L.marker(coords).addTo(map);
    tmp.bindPopup('<b>' + array['HEADING']  + '</b><br>' + array['POSTCODE'] +' ' + array['LOCATION'] +', ' +array['ADDRESS'] +'<br>' + array['ESTATE_SIZE'] + 'm²<br>' + array['PRICE'] + '€<br><a href=\"' + prefix_willhaben +   array['SEO_URL'] + '\" target=\"_blank\">Link</a><br> <img src=\"' + prefix_mmo + array['MMO'] +'\" height=\"200px\">');
    markers.addLayer(tmp);        
  });
  map.addLayer(markers);
}

var nextData = JSON.parse(document.getElementById('__NEXT_DATA__').textContent);
nextData = nextData.props.pageProps.searchResult;
addMarker(nextData);



window.fetch = new Proxy(window.fetch, {
    apply(actualFetch, that, args) {
        // Do whatever you want with the resulting Promise
        if( args[0].includes("/webapi/iad/search/atz/seo/")) {
          const result = Reflect.apply(actualFetch, that, args);
          result.then(result => result.json()).then( data => {
            addMarker(data);
          });
        }

        return Reflect.apply(actualFetch, that, args);
    }
});
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
  leaf_js1.type = "text/javascript";
  leaf_js1.onload = callfun;
  document.head.appendChild(leaf_js1);
}


var leaf_js = document.createElement("script");
leaf_js.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
leaf_js.type = "text/javascript";
leaf_js.onload = call1;
document.head.appendChild(leaf_js);



var leaf_div = document.createElement("div");
leaf_div.id="myMap";
leaf_div.style="width: auto; height: 600px; border: 5px solid green;";
let targetDiv = document.getElementById("skip-to-resultlist")
let parentDiv = targetDiv.parentNode;
parentDiv.insertBefore(leaf_div, targetDiv);

console.log("foo");
