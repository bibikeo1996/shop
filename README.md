Personal Project - Shop

CMD line: 
 touch server.js => Create new server file
 npm init -y => Create package json
 curl http://localhost:3000 --include => check all header information

Folder
=> src
+ controller
+ models
+ services
+ ultils
+ config
+ dbs
+ postman => for testing API
+ router
+ auth => Create Token
+ helper
toucn src/app.js => create file app inside src folder


Required package: npm install 
+ npm i express --save
+ npm i morgan --save-dev  => write log every single user run a request
+ npm i helmet --save-dev
+ npm i compression --save-dev 
+ npm i dotenv
+ npm i bcrypt --save
+ npm i crypto --save => to create privateKey, publishKey
+ npm i jsonwebtoken --save
+ npm i lodash --save