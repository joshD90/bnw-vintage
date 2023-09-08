# bnw-vintage
## Introduction
A mock E-Commerce Website made for a real local business.  Black and White Vintage is a classic football based company that was created by some friends of friends.  I felt that I could give a tailor made solution that uniquely fit their unique product.
I created the frontend with React Javascript and the backend with nodejs and Express to manage the backend server.  The product and order database is managed through MongoDB and product pictures are uploaded to Firebase.
An admin section is available through a hidden route with access and protection managed through Passport.js.  This allows the site owners to create new products without needing any further developer input.

## Features
The site has a grayscale stylished look to it adding to the concept of the Black and White Vintage namebrand.  Certain pages are uniquely styled to showcase certain releases that the company had.  The website is fully responsive.  I must give credit to Lama Dev youtube channel for giving some inspiration around some component design however I recreated them using my own coding practice.

This site hosts a fully functional Shopping Cart which can pervade the site through React.useContext.  This cart is hooked up to the backend to process submitted payments.  The backend then connects to Stripe and can go through the process of making a purchase.  This can be done using a dummy account number.

The frontend also features a swiper widget used to view some of the pictures associated with any product.  This swiper widget was made from scratch with no third party libraries.

A hidden Admin section is accessible.  The user login is handled using useContext in React.  The backend part of all admin related routes are secured using Passport, bcrypt level of encryption and sessions are maintained through express sessions.  Through this admin section the store owner can do all CRUD operations for maintaining and creating new products.  The store owner can also review all orders that have been made also.  The creation of the product allows for multiple pictures of a product to be uploaded to Firebase and the url reference will be then saved to the backend MongoDB database which is managed non-locally in Atlas storage.

## Key Learnings
This project gave me insights into my first management of a larger scale production and an understanding of the difficulties that arise from the interplay of many moving pieces and simply working within a larger codebase than I was used to.  This also gave me my first taste of hooking together multiple external sources such as linking the frontend to the backend and hooking up to Stripe as well as Firebase a level of complexity which I had not dealt with previously on top of managing security concerns related to the same.

## Get it working for yourself

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js:** You will need Node.js installed on your machine. If you haven't installed it yet, you can download it from the [official Node.js website](https://nodejs.org/). Follow the installation instructions for your specific operating system.

- **npm (Node Package Manager):** npm usually comes bundled with Node.js. After installing Node.js, you can verify if npm is installed by running:

  ```bash
  npm -v

### Clone repo
`git clone https://github.com/joshD90/bnw-vintage.git`
`cd bnw-vintage`

### Install Dependencies

Install Nodemon on the backend
`cd api-bnw`

Install nodemon
`npm install --save-dev nodemon`

Install remaining dependencies
`npm i`

Install frontend Dependencies
`cd ../client`
`npm i`

### Set Up .env files

Create an MongoDB Atlas account and get the connection string to be plugged into .env file.
Set up your own Stripe account with stripe Secret

cd into api-bnw

Create a file '.env'

```
PORT = 
ATLAS_PASSWORD = 
ATLAS_USERNAME = 
STRIPE_SECRET = 
CLIENT_URL = 
PASSPORT_SESSION_SECRET =

```
Fill in own custom details into .env according to this format.

cd into bnw-client

Create a file '.env'

```
REACT_APP_FIREBASE_KEY = 
REACT_APP_ADMIN_EMAIL = 
REACT_APP_ADMIN_PASSWORD = 
REACT_APP_ADMIN_UID = 
REACT_APP_BASE_URL =

```

Fill in own custom details into .env according to this format

## Get it up and Running

Go to root of entire folder
`cd api-bnw`

`nodemon index.jsz`

`cd ../bnw-client`

`npm start`

Go to preferred browser and open a new tab at 'http://localhost:3000'

If you would like to view the live website without having to do any setup please visit
[here](https://bnw.joshuadanceywebdev.ie/)



