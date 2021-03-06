// const second = () => {
//     setTimeout(() => {
//         console.log('Async Hey there');
//     }, 2000); // first argument is what runs, the second argument is the time im miliseconds
// }

// const first = () => {
//     console.log('Hello world')
//     second(); // doesn't stop the next line from running before the timer is out
//     console.log('The end')
// };

// first();

/////////////////////////////////////////////////
// Lecture: Asynchronous Javascript with Callbacks

// Callback hell

// function getRecipe() {
//     setTimeout(()=>{
//         const recipeID = [523, 883, 432, 974];
//         console.log(recipeID);

//         setTimeout((id)=> {
//             const recipe = {
//                 title: 'Fresh tomato pasta',
//                 publisher: 'Jonas'
//             };
//             console.log(`${id}: ${recipe.title}`);

//             setTimeout(publisher => {
//                 const recipe2 = {
//                     title: 'Italian pizza',
//                     publisher: 'Jonas'
//                 };
//                 console.log(publisher, recipe2);
//             }, 1500, recipe.publisher)
//         }, 1000, recipeID[2]); // third callback is passed into the setTimeout as an argument
//     }, 1500)
// }
// getRecipe();
// Callback hell is remedied by ES6 promises

//////////////////////////////////////////
// Lecture: From Callback Hell to Promises

// Promise:
// Object that keeps track of whether or a certain asynchronous event has happened already
// Determines what happens after the event has happened
// Implements the concept of a future value that we're expecting

// const getIDs = new Promise((resolve, reject) => {
//     setTimeout(()=>{
//         resolve([523, 883, 432, 974]); // setTimeout will always work, so you don't need the reject callback. Once the setTimeout completes, the promise is fulfilled with the resolve function
//     }, 1500);
// });

// const getRecipe = recID => {
//     return new Promise((resolve, reject) => {
//         setTimeout((ID) => {
//             const recipe = {
//                 title: 'Fresh tomato pasta',
//                 publisher: 'Jonas'
//             };
//             resolve(`${ID}: ${recipe.title}`);
//         }, 1500, recID);
//     });
// };

// const getRelated = publisher => {
//     return new Promise((resolve, reject) => {
//         setTimeout((pub) => {
//             const recipe = {
//                 title: 'Italian pizza',
//                 publisher: 'Jonas'
//             };
//             resolve(`${pub}: ${recipe.title}`);
//         }, 1500, publisher);
//     });
// };

// // Consuming promises
// getIDs
// .then(IDs => { // the callback is the result of the fulfilled promise
//     console.log(IDs);
//     return getRecipe(IDs[2]);
// })
// .then(recipe => {
//     console.log(recipe);
//     return getRelated('Jonas')
// })
// .then(recipe => {
//     console.log(recipe);
// })
// .catch(error => { // this handles the async if it fails
//     console.log(error);
// });

////////////////////////////////////////
// Lecture: From Promises to Async/Await

// Easier way to consume promises (produce promises the same way)

// const getIDs = new Promise((resolve, reject) => {
//     setTimeout(()=>{
//         resolve([523, 883, 432, 974]); // setTimeout will always work, so you don't need the reject callback. Once the setTimeout completes, the promise is fulfilled with the resolve function
//     }, 1500);
// });

// const getRecipe = recID => {
//     return new Promise((resolve, reject) => {
//         setTimeout((ID) => {
//             const recipe = {
//                 title: 'Fresh tomato pasta',
//                 publisher: 'Jonas'
//             };
//             resolve(`${ID}: ${recipe.title}`);
//         }, 1500, recID);
//     });
// };

// const getRelated = publisher => {
//     return new Promise((resolve, reject) => {
//         setTimeout((pub) => {
//             const recipe = {
//                 title: 'Italian pizza',
//                 publisher: 'Jonas'
//             };
//             resolve(`${pub}: ${recipe.title}`);
//         }, 1500, publisher);
//     });
// };

// async function getRecipesAW() { // runs in the background and returns a promise
//     const IDs = await getIDs; // await causes the code to stop and wait for the promise in getIDs to be resolved. Once it's resolved, the value of the resolved function is stored in the variable IDs. Also remember that you need more code to handle an error.
//     console.log(IDs);
//     const recipe = await getRecipe(IDs[2]);
//     console.log(recipe);
//     const related = await getRelated('Jonas');
//     console.log(related);

//     return recipe;
// };
// getRecipesAW().then(result => {
//     console.log(`${result} is the best ever.`)
// }); // you have to consume the async function with then() and pass in a callback function where the callback is what is returned, in this case "recipe";

/////////////////////////
// Lecture: AJAX and APIs

// AJAX: Asynchronous Javascript and XML
// API: Application Programming Interface

// function getWeather(woeid) {
//     const cors = 'https://cors-anywhere.herokuapp.com/';

//     fetch(`${cors}https://www.metaweather.com/api/location/${woeid}/`) // returns a promise
//     .then(res => {
//         // console.log(res); // res is stored in the body and needs to be converted from JSON to JS
//         return res.json(); // converts the result of the fetch promise body into a JS object
//     })
//     .then(data => { // consuming the promise that is returned from the above then
//         // console.log(data);
//         const today = data.consolidated_weather[0];
//         console.log(`Temperatures in ${data.title} stay between ${today.min_temp} and ${today.max_temp}.`)
//     })
//     .catch(error => {
//         // console.log(error);
//     });
// };

// getWeather(44418);
// getWeather(2487956);

/////////////////////////////////////////////////////////
// Lecture: Making AJAX calls with fetch and async/await

async function getWeatherAW(woeid) {
    try {
        const result = await fetch(`https://www.metaweather.com/api/location/${woeid}/`);
        const data = await result.json();
        const tomorrow = data.consolidated_weather[1];
        console.log(`Temperatures in ${data.title} stay between ${tomorrow.min_temp} and ${tomorrow.max_temp}.`);
        return data; // returns the result of the promise of getWeatherAW
    } catch(error) {
        console.log(error);
    }
}

let dataLondon;

getWeatherAW(44418).then(data => {
    dataLondon = data;
    console.log(dataLondon);
});
getWeatherAW(2487956);