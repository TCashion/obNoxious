# obNoxious


## The problem

#### What is a noxious weed? 

Noxious weeds are a major issue in the realm of ecological conservation. Plant species brought from other continents and transplanted into wild environments tend to crowd out native vegetation due to their lack of natural competitors. This is an issue worldwide, but this app focuses on invasive species in North America, specifically the United States.  

When I initially set out to create this app, I was unable to find an API containing current, reliable, and public data specific to noxious weeds. So, with the help of the NatureServeExpolorer API (an extensive database of most plant and animal species in North America), I set out to create a public API. 

## The solution

The obNoxious app servers two purposes: 

* 1) To provide an API resource available to the public containing identifying information about noxious plant species. 
* 2) To provide an interface for authenticated users to report sightings of noxious species, thereby building a user-supported database mapping the distribution of some of the most tenacious invaders.

## Accessing the API

The method and URL endpoint for the obNoxious API are: 

```
GET https://obnoxious.herokuapp.com/api/plants
```

(Screenshot example below)

Querying the endpoint will return an array of objects, with each object representing a specific plant record. 

These endpoints are fully public, so you do not need an access token or API key. 

## Screenshots

Check out some of the features of the obNoxious app: 

    ![Postman plant query]()
    ![Responsive]()
    ![Authentication]()
    ![]()
    ![]()
    ![]()
    ![]()

## Technologies Used

This app employs the MERN stack: 

* MongoDB / Mongoose
* ExpressJS
* React
* Node.JS

As well as a few other helpers: 

* HTML5
* CSS / MaterializeCSS

And, as mentioned before, the NatureServe Explorer API: 

* https://explorer.natureserve.org/ 

## Getting Started

* Visit the deployed app at: https://obnoxious.herokuapp.com/

## Next Steps 

* 