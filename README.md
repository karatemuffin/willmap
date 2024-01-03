# willmap
Basierend auf den übergebenen willhaben.at Suchstring wird eine Karte mit den Ergebnissen erstellt, inkl. Links zu den willhaben.at Einträgen

## php-standalone 
  `apt-get install  php-cli`
  `php -S localhost:8080`
 
## firefox-extension
Die Webextension läuft auf Firefox und Chrome. Sie fügt oberhalb der Immobiliensuchergebnisse von willhaben.at eine Karte ein.

### SHA256 für js/content.js
Um im scritp-tag mittels integrity attribut die Echtheit der Datei zu verifizieren muss bei jeder Änderung die Checksumme angepasst werden.

  `openssl dgst -sha256 -binary content.js  | openssl base64 -A`