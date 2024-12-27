function addslashes (str) {
  return (str + '')
    .replace(/[\\"']/g, '\\$&')
    .replace(/\u0000/g, '\\0')
}

const map = L.map('myMap');
const prefix_mmo = 'https://cache.willhaben.at/mmo/';
const prefix_willhaben = 'https://willhaben.at/iad/';

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var markers;

async function addMarker(dd){
  //clear MarkerClusterGroup
  if(markers){
    markers.clearLayers();
  }
  //then remove all Marker
  map.eachLayer(function(layer) {
    if (layer instanceof L.Marker)
    {
      map.removeLayer(layer);
    }
  });
        
  markers = L.markerClusterGroup();
  
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
  map.fitBounds([min,max], {padding: [25,25]});
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
