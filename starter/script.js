const second = () => {
    setTimeout(() => {
        console.log('Async Hey there');
    }, 2000); // first argument is what runs, the second argument is the time im miliseconds
}

const first = () => {
    console.log('Hello world')
    second(); // doesn't stop the next line from running before the timer is out
    console.log('The end')
};

first();