# CriShipped :fearful:

Check out the deployed site here: 
[CriShipped](https://crishipped.herokuapp.com/)

**CriShipped** is a full-stack web application that incorporates front-end user friendly technologies with a complete back-end server to support itself.  It is a website that connects users in need of crisis-related goods to users who have those goods.  It is also a community resource page that contains local crisis updates, news, user profiles and a forum, to connect all users during unprecidented cirtical times.

## The site consists of the following pages:

### Landing Page

![Image of Landing Page](https://github.com/jscottusf/CriShipped/blob/master/public/images/landingPg.jpg)

### Registration Page 
 
![Image of Registration Page](https://github.com/jscottusf/CriShipped/blob/master/public/images/registationPg.jpg)


### Login Page

![Image of Login Page](https://github.com/jscottusf/CriShipped/blob/master/public/images/loginPg.jpg)

### User Profile Landing Page

![Image of Profle Landing Page](https://github.com/jscottusf/CriShipped/blob/master/public/images/profileLandingPg.jpg)

### User Profile Editing Page

![Image of Profile Update Page](https://github.com/jscottusf/CriShipped/blob/master/public/images/editingProfilePg.jpg)

### User Profile View Page

![Image of Profile View Page](https://github.com/jscottusf/CriShipped/blob/master/public/images/profileViewPg.jpg) 

### User Location & Local News Page

![Image of Location & Local News Page](https://github.com/jscottusf/CriShipped/blob/master/public/images/locationPg.jpg)

### Catalogue Page

![Image of the Catalogue](https://github.com/jscottusf/CriShipped/blob/master/public/images/catalogPg.jpg)

### Rules and FAQ Page

![Image of the FAQ page](https://github.com/jscottusf/CriShipped/blob/master/public/images/FAQpg.jpg)

### Discussion Forum Page




## Technoligies that were used in the development and implementation of the site:
- MongoDB 
- Bootstrap
- Node.js along with the following **Node Packages**...
- ***Dependencies***:
  - Axios
  - Body-parser
  - Dotenv
  - Express, Express-paginate, Express-handlebars, Express-session, & Express-flash
  - Forms
  - Handlebars-layouts
  - Http-errors
  - Method-override
  - MongoDB
  - Morgan
  - MySQL2
  - Passport & Passport-local
  - Path
  - Request
  - Sequelize & Sequelize-CLI
  - UUID
- ***Dev Dependencies***:
  - Chai & Chai-env
  - Cross-env
  - ESLInt, ESLint-config-prettier, ESLint-plugin-prettier & Prettier
  - Handlebars
  - Mocha
  - Nodemon



### Viewing the site from the back-end:

In order to see the site functioning with the server, for developmental purposes, the viewer would have to install  MongoDB locally.  Below is a link to install MongoDB, with implemenation instructions from  [Zell Liew](https://zellwk.com/blog) Blog.

[MongoDB - Click here to download (Mac or Windows)](https://www.mongodb.com/cloud/atlas/lp/try2?utm_source=google&utm_campaign=gs_americas_united%20states_search_brand_atlas_desktop&utm_term=download%20mongodb&utm_medium=cpc_paid_search&utm_ad=e&gclid=CjwKCAjw4KD0BRBUEiwA7MFNTS9fWMoVoGhexjP11iqCEL8Xptq2MTCuosWb1ic07twCX0opJz3nDRoCb0sQAvD_BwE)


#####  Here are instructions to get it running locally:

You need to install MongoDB on your computer before you can connect to it. 

***Connecting to MongoDB with a Node server:***

When we build applications, we connect to MongoDB through our applications (not through Mongo Shell nor MongoDB Compass).

To connect to MongoDB, we need to use the mongodb package. Alternatively, you can also use Mongoose.

***Connecting with MongoDB native driver:***

First you have to install and require the mongodb package.

```
npm install mongodb --save
```
```
const MongoClient = require('mongodb').MongoClient
```

You can connect to your local MongoDB with this url:
```
const url = 'mongodb://127.0.0.1:27017' 
```

With the Mongo Client, you need to specify the database you’re using after you connect to MongoDB. Here’s what it looks like:
```
const dbName = 'game-of-thrones'
let db MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err)
```
  Storing a reference to the database so you can use it later:
  ```
 db = client.db(dbName)
  console.log(`Connected MongoDB: ${url}`)
  console.log(`Database: ${dbName}`)
})
```
Connected to local MongoDB with MongoDB native driver.


***Connecting with Mongoose:***

To connect with Mongoose, you need to download and require mongoose.
```
npm install mongoose --save
```
```
const mongoose = require('mongoose')
```
When you use Mongoose, the connection url should include the database you’re connecting to:
```
const url = 'mongodb://127.0.0.1:27017/game-of-thrones'
```
**NOTE:**

You can connect to MongoDB with the connect method:

```
mongoose.connect(url, { useNewUrlParser: true })
```

Here’s how you can check whether the connection succeeds.
```
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})
```

Connected to local MongoDB through Mongoose. 

Now, you should be able to use this Github repository to the fullest to view the full-stack site!



###  Future Development Ideas for the site:
- Implementing a mobile-hybrid framework
- Having the site verify and rate all sellers
- Off-loading the User Authentication externally to Amazon Web Services Cognito, to support sign-in with social identity providers and enterprise identity providers, for easier and quicker sign-on and more security for the users purchases
- Creating a more in-depth forum with drop down menu options and more specific fields 
- Adding actual payments methods into the site for true purchases
- More shopping cart functionality with actual real-time products being offered


### Creators Involved:
Ryan Oakley - [SlayerOak](https://github.com/slayeroak)

Joel Scott -  [JScottUSF](https://github.com/jscottusf)

Andrea Labis - [AndreaLabis](https://github.com/andrealabis)


#### Thanks for checking out our site!!





###### © 2020 - CriShipped






