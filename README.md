# Recipe Tracker App

This project was my first time making a MERN stack application as well as my first time integrating a back end to a front end project. Additionally I learned a lot about Material UI and styled components as I only had very basic understanding of these topics before.

This app will allow the user to browse some example data that I have created which is initially fetched from the Mongo cluster. This data was created using the recipe creation form in the app. They can edit/delete/create with the data however this is only stored locally and is lost on refresh.

The creation form features an ingredient autocomplete search field which utilizes the [Spoonacular](https://spoonacular.com/food-api/) API to fetch ingredients with their associated units. 

They also have the ability to log in with their Google account. The app will create a new document for them if they have never logged or retrieve their previous created document if they have. Once logged in the user will have the ability to edit/delete/create their own data that will be stored on the Mongo server which will be fetched if they come back later.

The app also is able to let the user filter by certain "tags” which are attached to each recipe when it is created. You can also do a search based on recipe titles with or without using tag filters. For example you could search "pasta" with the vegetarian diet tag and a wheat intolerance tag selected and the app will filter out any recipes that don't meet all conditions.

## Main Technologies Used

[React](https://reactjs.org/)  
[Node.js](https://nodejs.org/en/)  
[Express.js](https://expressjs.com/)  
[Mongo DB](https://www.mongodb.com/cloud/atlas)  
[Spoonacular API](https://spoonacular.com/food-api/)

## Libraries Used

[Material UI](https://material-ui.com/)  
[Axios](https://www.npmjs.com/package/axios)  
[Print.js](https://printjs.crabbly.com/)  
[React Google Login](https://www.npmjs.com/package/react-google-login)  
[React Masonry CSS](https://www.npmjs.com/package/react-masonry-css)  
[React Material UI Carousel](https://www.npmjs.com/package/react-material-ui-carousel)  
[React Router](https://reactrouter.com/)  

## Planned updates and fixes

- Create a more advanced error display system in the recipe form possibly using [notistack](https://github.com/iamhosseindhv/notistack)
- Implement a different google log in process(OAuth most likely) as the current one will not work with incognito mode or apparently any browser with third party cookies disabled as I have found out [here](https://github.com/google/google-api-javascript-client/issues/260).
- Add custom select components for ingredient components allowing you to select fractional units for the quantity rather than the standard number selects I have now.
- Add the ability to change the servings and have the ingredient amounts update dynamically on the recipe modal on the recipes page.
- Optimze start up as currently if you are logged in the app will still intially load example data.
- Improve accessibility.
- ~~Refeshing on either the edit of create pages currently gives a 404. I found some useful information about this issue [here](https://stackoverflow.com/questions/58065603/netlify-renders-404-on-page-refresh-using-react-and-react-router).~~ FIXED  
- The URL checking check will sometimes return false for some valid URLs
- There is a React warning triggered by React Material UI Carousel. According to [this](https://github.com/Learus/react-material-ui-carousel/issues/44) it is caused by a intended behavior.
