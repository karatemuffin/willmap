<script>
<?php 

$prefix_mmo = 'https://cache.willhaben.at/mmo/';
$prefix_willhaben = 'https://willhaben.at/iad/';

//TODO option: &page=2 , &ESTATE_SIZE/LIVING_AREA_FROM=80 & &PRICE_TO=500

if(!isset($_GET["art"])){
    $_GET["art"]= "0";
}
if(!isset($_GET["pages"])){
    $_GET["pages"]= "1";
}
if(!isset($_GET["minsize"])){
    $_GET["minsize"]= "50";
}

switch($_GET["art"]){
    default:
    case "0":
        $default = 'https://www.willhaben.at/iad/immobilien/mietwohnungen/steiermark/graz?rows=200';        
        break;
    case "1":
        $default = 'https://www.willhaben.at/iad/immobilien/eigentumswohnung/steiermark/graz?rows=200';
        break;
    case "2":
        $default = 'https://www.willhaben.at/iad/immobilien/haus-kaufen/steiermark/graz?rows=200';
        break;
    case "3":
        $default = 'https://www.willhaben.at/iad/immobilien/mietwohnungen/steiermark/graz-umgebung?rows=200';
        break;
    case "4":
        $default = 'https://www.willhaben.at/iad/immobilien/eigentumswohnung/steiermark/graz-umgebung?rows=200';
        break;
    case "5":
        $default = 'https://www.willhaben.at/iad/immobilien/haus-kaufen/steiermark/graz-umgebung?rows=200';
        break;
        
        
}

//$default = 'https://www.willhaben.at/iad/immobilien/haus-kaufen/steiermark/graz?rows=200&sort=3';

$js = "var markers = L.markerClusterGroup();\n";

$pattern = "/{\"props\":.*}/i";

$cnt=0;
for($page=1;$page < $_GET["pages"] + 1 ; $page++){
    
    $data = file_get_contents($default."&page=".$page);
    preg_match($pattern, $data, $matches);
    $data = json_decode($matches[0]);

    foreach ($data->props->pageProps->searchResult->advertSummaryList->advertSummary as $item) {
        $info = array('ADDRESS'=>'NA');
        foreach ($item->attributes->attribute as $entry){
            if (in_array($entry->name , array('MMO','PRICE','ESTATE_SIZE','ADDRESS','LOCATION','COORDINATES','HEADING','POSTCODE','ESTATE_SIZE/LIVING_AREA','SEO_URL'))){
                $info[$entry->name] = addslashes($entry->values[0]);
            }
            
        }
        try{
            if(strlen($info['COORDINATES']) > 3 && $_GET["minsize"] <= $info['ESTATE_SIZE']){
            $js .= "var tmp = L.marker([".$info['COORDINATES']."]).addTo(map);\n";
            $js .= "tmp.bindPopup('<b>".$info['HEADING']."</b><br>"
             .$info['POSTCODE']." ".$info['LOCATION'].", ".$info['ADDRESS']."<br>"
        .$info['ESTATE_SIZE']."m²<br>"
        .$info['PRICE']."€<br>"
        ."<a href=\"".$prefix_willhaben . $info['SEO_URL']."\" target=\"_blank\">Link</a><br>"
        ."<img src=\"".$prefix_mmo . $info['MMO']."\" height=\"200px\">'); \n";
            
            $js .= 'markers.addLayer(tmp);';
            $cnt += 1;
            }
        }
        catch(Exception $e) {
            print_r('Message: ' .$e->getMessage());
        }
        
    }
}
$js .= "map.addLayer(markers);\n";
echo $js;
?>
</script>
