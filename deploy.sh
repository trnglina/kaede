USER=sysadmin
HOST=trnglina.org
DIR=/var/www/trnglina.org/public_html

gulp build && hugo && rsync -Iavz --delete public/ ${USER}@${HOST}:${DIR}
