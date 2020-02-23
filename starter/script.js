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


//  /////////////////////////////////////////////////
// // Lecture: Asynchronous Javascript with Callbacks

// Callback hell

function getRecipe() {
    setTimeout(()=>{
        const recipeID = [523, 883, 432, 974];
        console.log(recipeID);

        setTimeout((id)=> {
            const recipe = {
                title: 'Fresh tomato pasta',
                publisher: 'Jonas'
            };
            console.log(`${id}: ${recipe.title}`);

            setTimeout(publisher => {
                const recipe2 = {
                    title: 'Italian pizza',
                    publisher: 'Jonas'
                };
                console.log(publisher, recipe2);
            }, 1500, recipe.publisher)
        }, 1000, recipeID[2]); // third callback is passed into the setTimeout as an argument
    }, 1500)
}
getRecipe();
// Callback hell is remedied by ES6 promises