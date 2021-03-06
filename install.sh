#!/usr/bin/env bash

trap catch_errors ERR;

docker-compose up -d
docker-compose exec php chmod +x /var/www/html/bin/console
docker-compose exec php composer install --prefer-dist
docker-compose exec php chown -R www-data: /var/www/html
docker-compose exec php php vendor/bin/pimcore-install --ignore-existing-config --admin-username admin --admin-password admin --mysql-username pimcore --mysql-database pimcore --mysql-host-socket db --mysql-password pimcore --mysql-port 3306 --no-interaction
docker-compose exec php php bin/console pimcore:bundle:enable WvisionBundle
docker-compose exec php php bin/console pimcore:bundle:install WvisionBundle
docker-compose down
docker-compose up -d
yarn install
yarn dev
chmod 600 ./.deployer/id_deployer

function catch_errors() {
   echo "Whoooooops! Script aborted, because of errors";
   exit 2;
}
