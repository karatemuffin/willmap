#change the urls example.com to yours
cat /etc/letsencrypt/live/example.com/cert.pem /etc/letsencrypt/live/example.com/privkey.pem > /etc/letsencrypt/live/example.com/merged.pem
service lighttpd force-reload

