var callfun = function(){
var leaf_ex = document.createElement("script");
leaf_ex.innerHTML=`
function addslashes (str) {
  return (str + '')
    .replace(/[\\"']/g, '\\$&')
    .replace(/\u0000/g, '\\0')
}

const map = L.map('myMap');
const prefix_mmo = 'https://cache.willhaben.at/mmo/';
const prefix_willhaben = 'https://willhaben.at/';

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



async function addMarker(dd){
  map.eachLayer(function(layer) {
      if (layer instanceof L.MarkerClusterGroup)
      {
          layer.clearLayers();
          map.removeLayer(layer);
      }
  });
  
  var markers = L.markerClusterGroup();
  var min = [1000,1000];
  var max = [0,0];
  
  dd.advertSummaryList.advertSummary.forEach((item) => {
    var array = [];
    
    const need = ['MMO','PRICE','ESTATE_SIZE','ADDRESS','LOCATION','COORDINATES','HEADING','POSTCODE','ESTATE_SIZE/LIVING_AREA','SEO_URL'];
    need.forEach( (item) => {
      array[item] = 'NA';
    });
    
    item.attributes.attribute.forEach((entry) => {
      array[entry.name] = addslashes(entry.values[0]);
    });
    
    const coords = array['COORDINATES'].split(",").map(Number);

    if(isNaN(coords[0])){
      console.log("skipping: " + array['HEADING']);
      return;
    }

    max[0] = Math.max(max[0],coords[0]);
    max[1] = Math.max(max[1],coords[1]);
    min[0] = Math.min(min[0],coords[0]);
    min[1] = Math.min(min[1],coords[1]);
    
    var tmp = L.marker(coords).addTo(map);
    tmp.bindPopup('<b>' + array['HEADING']  + '</b><br>' + array['POSTCODE'] +' ' + array['LOCATION'] +', ' +array['ADDRESS'] +'<br>' + array['ESTATE_SIZE'] + 'm²<br>' + array['PRICE'] + '€<br><a href=\"' + prefix_willhaben +   array['SEO_URL'] + '\" target=\"_blank\">Link</a><br> <img src=\"' + prefix_mmo + array['MMO'] +'\" height=\"200px\">');
    markers.addLayer(tmp);

  });
  map.addLayer(markers);

  map.fitBounds([min,max]);
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
leaf_css.href = browser.runtime.getURL("js/leaflet.css");
document.head.appendChild(leaf_css);

var leaf_css1 = document.createElement("link");
leaf_css1.rel = "stylesheet";
leaf_css1.type = "text/css";
leaf_css1.href=browser.runtime.getURL("js/MarkerCluster.css");
document.head.appendChild(leaf_css1);

var leaf_css2 = document.createElement("link");
leaf_css2.rel = "stylesheet";
leaf_css2.type = "text/css";
leaf_css2.href=browser.runtime.getURL("js/MarkerCluster.Default.css");
document.head.appendChild(leaf_css2);

var call1 = function(){
  var leaf_js1 = document.createElement("script");
  leaf_js1.src=browser.runtime.getURL("js/leaflet.markercluster.js");
  leaf_js1.type = "text/javascript";
  leaf_js1.onload = callfun;
  document.head.appendChild(leaf_js1);
}

var leaf_js = document.createElement("script");
leaf_js.src=browser.runtime.getURL("js/leaflet.js");
leaf_js.type = "text/javascript";
leaf_js.integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
leaf_js.onload = call1;
document.head.appendChild(leaf_js);

var leaf_div = document.createElement("div");
leaf_div.id="myMap";
leaf_div.style="width: auto; height: 600px; border: 5px solid green;";
let targetDiv = document.getElementById("skip-to-resultlist")
let parentDiv = targetDiv.parentNode;
parentDiv.insertBefore(leaf_div, targetDiv);
