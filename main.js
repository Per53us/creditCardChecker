// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:

/*First up we have the function that will find which cards are valid using the Luhn algorhithm.
For all of this excercise, I use arrow function systax, as is my preference.*/
const validateCred = (array) => {
    /*Firstly we declare a variable that will be used to sum up all the numbers in the card;
    we're going to be changing the numbers a bit before that, though, so we set the value to 0.
    I declare the finalSum variable witht the keyword let, since this number will be changing
    after each iteration of our loop.*/
    let finalSum = 0;
    //next we start a for loop that will iterate through all of the numbers in our array, starting from the end.
    for (let i = array.length - 1; i >= 0; i--) {
        /*here in the body of the loop, we declare a variable ('currValue') that tracks the current number we're on. 
        Using an if statement, we check if the number's position is one of the every other numbers, and if it is,
        we multiply it by two. Another if statement afterwards checks if the result of that is greater than 9; if
        so, it subsequently subtracts 9.*/
        let currValue = array[i];
        if ((array.length - 1 - i) % 2 === 1) {
            currValue *=2;
            if (currValue > 9) {
                currValue -= 9;
            }
        }
        /*after the if statement, the currValue number is cumulatively added to the finalSum variable.
        Please note that because this operation is cumulative, this statement goes inside the body of
        the loop, ensuring that it's done for each iteration.*/
        finalSum += currValue;
    }
    /*Finally, the return statement, which makes sure that the final sum of the numbers are a multiple of ten,
    after being altered by the Luhn Algorhithm. The function thus returns a boolean value: true for valid cards,
    and false for invalid.*/
    return finalSum % 10 === 0;
}

/*On to the next function, which will take in an array of card numbers and return the invalid ones.
We already wrote a function that checks if a given card is valid or not, so most of the hard work is done!*/
const findInvalidCards = (array) => {
    //We start by declaring an empty array with the let keyword, which will store the invalid numbers.
    let invalidCards = [];
    /*here a simple for loop iterates through each element of our argument array, and calls our validateCred function
    on it. If the result of that call returns the value false, we store it in our new invalidCards array using the .push method. */ 
    for (let i = 0; i < array.length; i++) {
        if (validateCred(array[i]) === false) {
            invalidCards.push(array[i]);
        }
    }
    //finally, the return statement gives us our array that is now full of invalid card numbers!
    return invalidCards;
}

/*now for the last function. This one takes the invalid card numbers from the last function,
and identifies them with their respective issuing companies.
Like the last function, we'll start with an empty array, that will store the companies that issued invalid cards.*/
const idInvalidCardCompanies = (invalidNums) => {
    let invalidCardCompanies = [];
    /*we have a for loop to iterate through all of the numbers, while a series of else if statements pushes company
    names into our storing array based on the first number of each card, refenced by the index 0. */
    for (let i = 0; i < invalidNums.length; i++) {
        let num = invalidNums[i];
        if (num[0] === 3) {
            invalidCardCompanies.push('Amex')
        } else if (num[0] === 4) {
            invalidCardCompanies.push('Visa')
        } else if (num[0] === 5) {
            invalidCardCompanies.push('Mastercard')
        } else if (num[0] === 6) {
            invalidCardCompanies.push('Discover')
        } else {
            /*this last else statement catches all other cards that don't have an identifiable company associated with them.
            I spruce it up with a bit of string interpolation, to ensure there is a number returned for quick reference.*/
            invalidCardCompanies.push(`Card company not found. Reference number: ${invalidNums[i]}.`)
        }
    }
    /*next we'll provide another function within our current one (idInvalidCardCompanies) 
    that will remove the duplicate card companies. This function makes use of nested for loops to compare
    each element of the given array against the others, and if it matches, calls the splice method on the
    duplicate one. Please note how the inner loop is staggered against the outer, specifying the starting
    condition as "i+1".*/
    const removeDuplicates = (arr) => {
        for(let i = 0; i < arr.length; i++){
            for (let k = i+1; k < arr.length; k++){
                if(arr[i] === arr[k]){
                    arr.splice(k,1);
                }
            }
        }
        return arr;
    }
    /*finally, we have the return statement for our final function, 
    which calls our removeDuplicate function on the companies that issued invalid cards.*/
    return removeDuplicates(invalidCardCompanies);

}

/* To finish things off, I include testing statements below to ensure the code works. Note that I
log each function call. Otherwise, without the console.log statement, the computer will return the
values we told it to, but we won't see them!*/

console.log(validateCred(valid4));
console.log(validateCred(invalid2))
console.log(findInvalidCards(batch));
console.log(idInvalidCardCompanies(findInvalidCards(batch)));





