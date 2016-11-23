# Meteor React Apollo App

#Overview 
In this app we have integrated Apollo with Meteor React. Here we are using MongoDB & MySQL as databases.
Here user can select desired database and can insert any post in same. Inserted post will get visible inside respective column.

You can contact us at info@deligence.com in case of any doubt or query.

<img height="300" width="500" src="https://github.com/DeligenceTechnologies/Meteor-Apollo-with-MongoDB-MySQL/blob/master/meteor-apollo-mognodb-mysql/public/images/apolloApp.png" /><h4 width="300">Main page</h4>
<br>


# Getting Started

# Install MySQL
To run, first install MySQL. On OSX:
```
> brew install mysql
``` 
Start MySQL and create a database named `apollodemo`

```
> mysql.server start
> mysql -u root

mysql>  CREATE DATABASE apollodemo;
```

## Run the app
First clone this repository, if you haven't already. Then run the app.
```
> meteor npm install
> meteor
``` 
You can view the app at `http://localhost:3000/` or the built in graphiqql browser at `http://localhot:3000/graphiql`

