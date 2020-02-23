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

const getIDs = new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve([523, 883, 432, 974]); // setTimeout will always work, so you don't need the reject callback. Once the setTimeout completes, the promise is fulfilled with the resolve function
    }, 1500);
});

const getRecipe = recID => {
    return new Promise((resolve, reject) => {
        setTimeout((ID) => {
            const recipe = {
                title: 'Fresh tomato pasta',
                publisher: 'Jonas'
            };
            resolve(`${ID}: ${recipe.title}`);
        }, 1500, recID);
    });
};

const getRelated = publisher => {
    return new Promise((resolve, reject) => {
        setTimeout((pub) => {
            const recipe = {
                title: 'Italian pizza',
                publisher: 'Jonas'
            };
            resolve(`${pub}: ${recipe.title}`);
        }, 1500, publisher);
    });
};

// Consuming promises
getIDs
.then(IDs => { // the callback is the result of the fulfilled promise
    console.log(IDs);
    return getRecipe(IDs[2]);
})
.then(recipe => {
    console.log(recipe);
    return getRelated('Jonas')
})
.then(recipe => {
    console.log(recipe);
})
.catch(error => { // this handles the async if it fails
    console.log(error);
});

