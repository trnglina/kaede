update.bat && gulp build && hugo && wsl rsync -Iavz --delete public/ sysadmin@trnglina.org:/var/www/trnglina.org/public_html
