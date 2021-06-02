# Recipe Tracker App

This project was my first time making a MERN stack application as well as my first time making any sort of backend. Additionally I learned a lot about Material UI and styled components as I only had very basic understanding of these topics before.

This app will allow the user to browse some example data that I have created which is initially fetched from the Mongo cluster. They can edit/delete/create using the data however this is only stored locally and is lost on refresh. They also have the ability to log in with their Google account. The app will create a new document for them if they have never logged or retrieve their previous created document if they have.

The user will have the ability to edit/delete/create their own data that will be stored on the Mongo server which will be fetched if they come back.  

## Technologies Used

[React](https://reactjs.org/)  
[Node.js](https://nodejs.org/en/)  
[Express.js](https://expressjs.com/)  
[Mongo DB](https://www.mongodb.com/cloud/atlas)  

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
- Implement a different google log in process as the current one will not work with incognito mode or apparently any browser with third party cookies disabled as I have found out [here](https://github.com/google/google-api-javascript-client/issues/260).
- Add Custom select components for ingredient components allowing you to select fractional units for the quantity rather than the standard number selects I have now.
- Add the ability to change the servings and have the ingredient amounts update dynamically on the recipe modal on the recipes page.
- Optimze start up as currently if you are logged in the app will still intially load example data.
- Improve accessibility.
- Refeshing on either the edit of create pages gives a 404
- The URL checking check will sometimes return false for some valid URLs
- There is a React error caused by React Material UI Carousel. According to [this](https://github.com/Learus/react-material-ui-carousel/issues/44) it is caused by a intended behavior.
