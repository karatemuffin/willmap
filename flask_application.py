#!/bin/python3

import requests,re,json
from flask import Flask, flash, redirect, render_template, request, session, abort, url_for

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.secret_key = 'ItShouldBeAnythingButSecret'

@app.route("/")
def index():
    default_url = 'https://www.willhaben.at/iad/immobilien/eigentumswohnung/steiermark/graz?rows=200'
    return redirect(url_for('index2',url=default_url))
    
@app.route("/<path:url>")
def index2(url):
    prefix_mmo = 'https://cache.willhaben.at/mmo/'
    prefix_willhaben = 'https://willhaben.at/'
    #NOTE 200 = max
    r = requests.get(url)
    h = r.text.rstrip()
    h= re.search(r"{\"props\":.*}", h, re.DOTALL).group()
    j = json.loads(h)
    js = ''
    js += 'var markers = L.markerClusterGroup();\n'
    cnt =  0
    for item in j['props']['pageProps']['searchResult']['advertSummaryList']['advertSummary']:
        info = {'ADDRESS':'NA'}
        for entry in item['attributes']['attribute']:
            if entry['name'] in ['MMO','PRICE','ESTATE_SIZE','ADDRESS','LOCATION','COORDINATES','HEADING','POSTCODE','ESTATE_SIZE/LIVING_AREA','SEO_URL']:
                info[entry['name']] = entry['values'][0]
        try:
            js += f'''var tmp = L.marker([{info['COORDINATES']}]).addTo(map);\n'''
            js += f'''tmp.bindPopup(\'<b>{info['HEADING']}</b><br>\
    {info['POSTCODE']} {info['LOCATION']}, {info['ADDRESS']}<br>\
    {info['ESTATE_SIZE']}m²<br>\
    {info['PRICE']}€<br>\
    <a href=\"{prefix_willhaben + info['SEO_URL']}" target=\"_blank\">Link</a><br>\
    <img src=\"{prefix_mmo + info['MMO']}\" height=\"200px\">\'); \n'''
            js += f'''markers.addLayer(tmp);'''
        except Exception as e:
            print(e)
            #print(info)
            #print(item)
        finally:
            cnt+=1
    js += "map.addLayer(markers);\n"
    print(cnt)
    return render_template('index.html',marker=js)

if __name__ == "__main__":
  app.run(debug=True)
#	app.run(host='0.0.0.0', port='5000')