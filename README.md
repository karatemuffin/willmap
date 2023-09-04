# willmap
Basierend auf den übergebenen willhaben.at Suchstring wird eine Karte mit den Ergebnissen erstellt, inkl. Links zu den willhaben.at Einträgen

## Vorraussetzungen
`apt-get install  certbot lighttpd lighttpd-mod-openssl uwsgi python3-pip python3-flask`
  
## Benutzung
Ohne Parameter z.B. `https://meineurl.com/` werden die aktuellsten 200 Einträge von Willhaben angezeigt. 
Man kann jedoch auch eine Suchurl von Willhaben kopieren und mittels `https://www.urlencoder.io/` codieren um sie hiernach als Parameter zu übergeben. z.B. `https://meineurl.com/https://willhabenurl`


