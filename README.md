Personal Project - Shop

CMD line: 
+ touch server.js => Create new server file
+ npm init -y => Create package json
+ curl http://localhost:3000 --include => check all header information
+ node -v => check version NodeJS

Folder structure
+ controller  => Contain function redirect router 
+ models      => Contain function create database
+ services    => Contain all website process function like sigup, CRUD, ...
+ utils       => Contain all function we usually use
+ config      => Contain function config localhost, production environment
+ dbs         => Contain function to connect to DB(mongodb)
+ postman     => Contain file for testing API
+ router      => Contain routers website
+ auth        => Contain function related to authorize
+ helper      => Contain function support like counting how many number connection, overload, ...

toucn src/app.js => create file app inside src folder

File JS
+ server.js => File start network NodeJS 
+ src/app.js => File include middleware


Required package: npm install 
+ npm i express --save
+ npm i nodemon --save-dev => restart server every user take a change
+ npm i morgan --save-dev  => write log every single user run a request
+ npm i helmet --save
+ npm i compression --save
+ npm i dotenv --save
+ npm i bcrypt --save
+ npm i crypto --save => to create privateKey, publishKey
+ npm i jsonwebtoken --save
+ npm i lodash --save