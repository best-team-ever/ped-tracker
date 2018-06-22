#create database
./node_modules/.bin/sequelize db:create

#generate javascript for tables management (only for information, not to execute when /migrations/ is felt)
./node_modules/.bin/sequelize model:generate --name locations --attributes location_type:string,name:string,site_id:string,address:string,country:sting,contact_name:string,contact_position:string,contact_phone:string,contact_email:string,status:integer
./node_modules/.bin/sequelize model:generate --name users --attributes first_name:string,last_name:string,email:string,p2pe_agreement:integer,language:string,role:string,location_id:integer
./node_modules/.bin/sequelize model:generate --name devices --attributes brand:string,model:string,serial_nr:string,tid:sting,location_id:integer,till_label:string,status:string,security_bag_sn:string,last_inspection_date:date
./node_modules/.bin/sequelize model:generate --name events --attributes user_id:integer,device_id:integer,user_id:integer,message:string

#create tables
./node_modules/.bin/sequelize db:migrate
