# obNoxious

## The problem

#### What is a noxious weed? 

Noxious weeds are a major issue in ecological conservation. Plant species brought from other continents and introduced into wild environments tend to out-compete and crowd out native vegetation. This can result in widespread loss of habitat for both native plant and animal species. 

When I initially set out to create this app, I was unable to find an API containing current, reliable, and public data specific to noxious weeds. So, with the help of the NatureServe Explorer (an extensive database of most plant and animal species in North America), I set out to create a public API to fill this gap in public resources. 

## The solution

Inasive species are an issue worldwide, but this app focuses on those species invading North America, specifically the United States. 

The obNoxious app serves two purposes: 

* 1) To provide an API resource available to the public that contains identifying information about noxious plant species. 
* 2) To provide an interface for authenticated users to report sightings of noxious species, thereby building a user-supported database that maps the distribution of some of the US's most tenacious invaders.

## Accessing the API

The method and URL endpoint for the obNoxious API are: 

```
GET https://obnoxious.herokuapp.com/api/plants
```

(Screenshot example [below](#screenshots))

Querying the endpoint will return an array of objects, with each object representing a specific plant record. 

These endpoints are fully public, so you do not need an access token or API key. 

## Screenshots

Check out some of the features of the obNoxious app: 

* Publicly available API (`GET https://obnoxious.herokuapp.com/api/plants`)
![Postman plant query](https://i.imgur.com/I16Ul80.png)
* Mobile-first, responsive design
![Responsive](https://i.imgur.com/Cnut0Rd.png)
* Full authentication capabilities, including changing password
![Authentication](https://i.imgur.com/V3RktZH.png)
* Ability for authenticated users to contribute to the database
![Add Plants](https://i.imgur.com/huWMlvN.png)
* Tag the locations of reports with a built-in MapBox GL API. 
![MapBox API](https://i.imgur.com/8KmG9lW.png)

## Technologies Used

This app employs the MERN stack: 

* MongoDB / Mongoose
* ExpressJS
* React
* Node.JS

As well as a few other helpers: 

* HTML5
* CSS / MaterializeCSS

## APIs implemented 

* https://explorer.natureserve.org/ 
* MapBox GL API

## Getting Started

* Visit the deployed app at: https://obnoxious.herokuapp.com/

## Next Steps 

Here are some of the major remaining icebox features: 

* AAU, I want to upload photos of the species that I report. 
* AAU, I want to get special super-user access so that I can download all user reports (for example, if a state or agricultural agency would like to view the map data).
* AAU, I want to be able to build on the data provided by NatureServe Explorer by adding data to fields such as aliases, origin, etc. 
