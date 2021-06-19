curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g harp --unsafe-perm=true
npm install 



sudo npm install pm2 -g
pm2 start app.js


sudo apt-get update
sudo apt-get install nginx