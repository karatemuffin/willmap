#!/bin/python3

import requests,re,json
#SEO prefix https://willhaben.at/
#MMO prefix https://cache.willhaben.at/mmo/
prefix_mmo = 'https://cache.willhaben.at/mmo/'
prefix_willhaben = 'https://willhaben.at/'
#NOTE 200 = max
filter1 = "https://www.willhaben.at/iad/immobilien/eigentumswohnung/eigentumswohnung-angebote?areaId=117464&areaId=117465&areaId=117456&FREE_AREA/FREE_AREA_TYPE=20&AVAILABLETODAY=1&sort=1&rows=200&isNavigation=true&page=1&sfId=6706a2c6-c900-4919-8d15-3adbaba4b4de&ESTATE_SIZE/LIVING_AREA_FROM=50"
new200 = 'https://www.willhaben.at/iad/immobilien/eigentumswohnung/steiermark/graz?rows=200'
r = requests.get(filter1)
f = open('tmp.txt','w')
f.write(r.text)
f.close()

f = open('tmp.txt','r')
h = f.read(-1).rstrip()
h= re.search(r"{\"props\":.*}", h, re.DOTALL).group()
#print(h)
j = json.loads(h)
js = open('marker.js','w')
js.write('var markers = L.markerClusterGroup();\n')
cnt =  0
for item in j['props']['pageProps']['searchResult']['advertSummaryList']['advertSummary']:
    info = {'ADDRESS':'NA'}
    for entry in item['attributes']['attribute']:
        if entry['name'] in ['MMO','PRICE','ESTATE_SIZE','ADDRESS','LOCATION','COORDINATES','HEADING','POSTCODE','ESTATE_SIZE/LIVING_AREA','SEO_URL']:
            info[entry['name']] = entry['values'][0]
    #print(info)
    try:
        #url = info['SEO_URL']
        js.write(f'''var tmp = L.marker([{info['COORDINATES']}]).addTo(map);\n''')
        js.write(f'''tmp.bindPopup(\'<b>{info['HEADING']}</b><br>\
{info['POSTCODE']} {info['LOCATION']}, {info['ADDRESS']}<br>\
{info['ESTATE_SIZE']}m²<br>\
{info['PRICE']}€<br>\
<a href=\"{prefix_willhaben + info['SEO_URL']}" target=\"_blank\">Link</a><br>\
<img src=\"{prefix_mmo + info['MMO']}\" height=\"200px\">\'); \n''')
        js.write(f'''markers.addLayer(tmp);''')
    except Exception as e:
        print(e)
        print(info)
        print(item)
    finally:
        cnt+=1
js.write("map.addLayer(markers);\n")
js.close()
print(cnt)