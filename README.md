**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Mockup for admin](#mockup-for-admin)
- [PostgreSQL Database](#postgresql-database)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Mockup for admin

>1.First page for <span style="color:red; font-family:Georgia; font-size:2em;">admin user</span>.

![avatar](public/mockup/Dashboard.png)

>2.Second tab for list of devices, we can search each element with filter block, in the action, we can edit or delete row.

![avatar](public/mockup/Devices.png)

>2.1.Click ![avatar](public/mockup/edit.png), there is all the details of one device, we can update or return last page.

![avatar](public/mockup/Devicedetail.png)

>3.Third tab for list of locations, we can search each location with filter block, in the action, we can edit or delete row.

![avatar](public/mockup/Location.png)

>3.1.Click ![avatar](public/mockup/edit.png), there is all the details of one location, we can update or return last page.

![avatar](public/mockup/Locationdetail.png)

>4.Fourth tab for list of users, we can search each user with filter block, in the action, we can edit or delete row.

![avatar](public/mockup/User.png)

>4.1.Click ![avatar](public/mockup/edit.png), there is all the details of one user, we can update or return last page.

![avatar](public/mockup/Userdetail.png)

>5.Fifth tab for help search.

![avatar](public/mockup/Help.png)

# PostgreSQL Database

>1.Modify config/config.json

>2.Create database
```
./node_modules/.bin/sequelize db:create   
```
>3.Create tables
```
./node_modules/.bin/sequelize db:migrate       
```

>4.Run seed
```
./node_modules/.bin/sequelize db:seed:all
```



