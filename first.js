// ! -------------------- 1
// ? Checks a and b 's value is equal to 100

/*
const isEqualTo100 = (a,b) => a === 100 || b === 100;
console.log(isEqualTo100(100,1))
console.log(isEqualTo100(100,100))
console.log(isEqualTo100(0,100))
console.log(isEqualTo100(10,10))
*/


// ! -------------------- 2
// ? Getting extension of a file like .html or .js
/*
const getExt = (str) => str.slice(str.lastIndexOf('.'));


console.log(getExt('index.html'))
console.log(getExt('index.js'))
*/


// ! -------------------- 3
// ? Takes word and their letters to replace them with following characters in the alphabet
/*
const moveCharsForward = (str) => 
    str.split('')
    .map(char => String.fromCharCode(char.charCodeAt(0)+1))
    .join('');

console.log(moveCharsForward('abcd'))
*/


// ! -------------------- 4
// ? Getting the current date
/*
const d = new Date();
document.getElementById('hello').innerHTML = d
*/


// ! -------------------- 5
// ? html code get date on-click the button
/*
<button onclick="document.getElementById('demo').innerHTML=Date()">The time is?</button>
*/


// ! -------------------- 6
// ? Adding new word in front of the given string
/*
const addNewWord = (str) =>
    str.indexOf('New!') === 0 ? str : `New! ${str}`;

console.log(addNewWord('N offers'));
*/


// ! -------------------- 7
// ? Making a new string with given string's first 3 letters and last 3 letters (if it's length less than 3 than returns  original string)
/*
function makeNewStr(str) {
    return str.length < 3 ? str : str.slice(0, 3) + str.slice(-3);
}
console.log(makeNewStr('a2sdh3gsa4jk2hs1ad'));
console.log(makeNewStr('32şw3şi34i'));
console.log(makeNewStr('123asd213'));
console.log(makeNewStr('23'));
*/


// ! -------------------- 8
// ? Gets First Half of given string
/*
const getFirstHalf = (str) => str.slice(0, str.length / 2);

console.log(getFirstHalf('d3fsh2gaj4d1s'))
console.log(getFirstHalf('Wor2dde3ss'))
console.log(getFirstHalf('Press'))
console.log(getFirstHalf('d2ruh'))
*/


// ! -------------------- 9
// ? Concatenate 2 Strings Except their first character
/*
const conTwoChars = (str1, str2) => 
    str1.slice(1) + str2.slice(1);
console.log(conTwoChars('s2ak2fa3sd', 'sa3ds2a'));
console.log(conTwoChars('asd', 'sa1ds'));
*/


// ! -------------------- 10
// ? Finds which of the given numbers are closer to 100
/*
const findWhoIsNear = (num1, num2) => (100 - num1) > (100 - num2) ? a : b ;

console.log(findWhoIsNear(22, 231));
console.log(findWhoIsNear(253, 23));
console.log(findWhoIsNear(92, 31));
*/


// ! ----------------------- 11
// ? Just look at the code i don't want to explain
/*
const givenStrings = (str, char) =>
    str.split('').filter(ch => ch === char).length;

const doesCont2to4 = (str, char) =>
    givenStrings(str, char) >= 2 && givenStrings(str, char) <= 4;

console.log(doesCont2to4('wo2ho4hoh3o', 'o'))
console.log(doesCont2to4('ehe6he1he', 'e'))
console.log(doesCont2to4('b09tuh8ret', 't'))
console.log(doesCont2to4('ut3hel9sse', 's'))
*/

// ! ----------------- 12
// ? Finding number of even numbers in the given numbers in an array
/*
const isEvenNumber = (arr) =>
    arr.filter(num => num % 2 === 0).length; 

console.log(isEvenNumber([2,4,6,8,4,2,6])); 
console.log(isEvenNumber([2,6,5,4,86,5,34]));
console.log(isEvenNumber([6,342,5643,32,6,543,21]));
*/

// ! ----------------- 13
// ? Finding how many even numbers in the array up to the given number
/*
const isEvenNumber = (arr) =>
    arr.filter(num => num % 2 === 0).length;

const makeArrayOfNumber = (num) =>{
    const returnArray = [];
    for (let i = 1; i <= num ; i++){
        returnArray.push(i)
    }
    return returnArray;
};

console.log(isEvenNumber(makeArrayOfNumber(9)));
*/

// ! ----------------- 14
// ? Checks the given array's integers are sorted in ascending order
/*
const isSorted = (arr) =>{
    for (let i = 0 ; i < arr.length ; i ++){
        for(arr[i+1] > arr[i]) return false;
    }
    return true;
}

console.log(isSorted([1,2,3,4,5,6]));
console.log(isSorted([2,3,4,5,8,6,7]));
console.log(isSorted([8,9,4,7,9,0]));
*/

// ! ----------------- 15
// ? Gets the largest even number from a given array of integers
/*
const largestEvent = (arr) => 
    Math.max(...arr.filter(num => num % 2 === 0));

console.log(largestEvent([22,3,4,5643,3453,756,234]));
console.log(largestEvent([32,534,745,34,745,32]));
console.log(largestEvent([39,23,432,523,32442,2342]));
*/

// ! ----------------- 16
// ? Replace first digit with $ sign in the given string
/*
const replaceDigit = (str) => str.replace(/[0-9]/, '$');

console.log(replaceDigit('hakjsd8as7d8sadsa87'));
console.log(replaceDigit('sad9sa89xz'));
console.log(replaceDigit('d7sa90saxcz*'));
*/

// ! ----------------- 17
// ? Checks given year is a leap year 
/*
const isLeap = (year) =>{
    if( year % 4 === 0 ){
        return ("Yes, That's a leap year");
    }
    return ("No, That's not a leap year");
}

console.log(isLeap(2024));
console.log(isLeap(2010));
console.log(isLeap(2014));
*/

// ! ----------------- 18
// ? Comparing two objects to if their properties are the same 
/*
const objA = {a: 2, b: 4, c: 5};
const objB = {a: 2, b: 4, c: 5};
const objC = {a: 3, b: 4, c: 6};

const isObjEqual = (a, b) => {
    Object.keys(a).every(key => b[key]);
}
console.log(isObjEqual(objA, objB));
*/

// ! ----------------- 19
// ? Convert CSV (Comma separated values) to 2D array . A new line indicates new row in the array
/*
const conCsvToRow = (csv) => 
    csv.split('\n').map(row => row.split(','));

const csv = `abc,def,hgi
jkl,dsa,sdd
asr,re,tyre`

console.log(conCsvToRow(csv));
*/

// ! ----------------- 20
// ? Generates random hexadecimal color code 
/*
const randColorHex = () => 
    Math.floor(Math.random() * 16).toString(16);

const getRandomHex = () => 
    '#' + Array.from({length: 6}).map(randColorHex).join('');

console.log(getRandomHex());
console.log(getRandomHex());
console.log(getRandomHex());
console.log(getRandomHex());
console.log(getRandomHex());
*/


// ! -------------------- 21
// ? Checks all elements provides given rules
/*
const isEveryElem = (a, b) => {
    for (let i = 1; i < a.length; i++){
        if(!b(a[i])){
            return false;
        }
    }
    return true;
}

console.log(isEveryElem([1,3,4,5,6], (x) => x > 0));
console.log(isEveryElem([6,4,32,5,6,2], (x) => x > 3));
*/

// ! -------------------- 22
// ? Sorts by alphabetic order that given word
/*
const sortAlphabeticOrder = (a) => 
    a.split('').sort((a, b) => a > b ? 1 : -1).join('');

console.log(sortAlphabeticOrder('words that i care'));
*/

// ! -------------------- 23
// ?  Counts Vowels in the given string
/*
const countVowels = (str, letters = ['a', 'e', 'i', 'o', 'u']) =>
    str.split('')
    .filter(s => letters.indexOf(s) > -1)
    .length;

console.log(countVowels('sasdasgdsfeityocx'));
console.log(countVowels('asrteityocx'));
console.log(countVowels('sotisuygcaa'));
*/

// ! -------------------- 24
// ? Convert amount of given coin to possible coins
/*
const getPossibleCoins = (num, coins = [25,10,5]) => {
    const totalCoins = [];
    for (let i = 0; i < coins.length; i++){
        const thisCoinNum = Math.floor(num / coins[i]);
        for(let q = 0; q<thisCoinNum; q ++){
            totalCoins.push(coins[i]);
        }
    num -= coins[i] * thisCoinNum;
    }
    return totalCoins;
}
console.log(getPossibleCoins(27));
*/

// ! -------------------- 25
// ? Extract unique characters from given string 
/*
const extChars = (str) => 
    str.split('').filter(
        (item, index, arr) => 
            arr.slice(index + 1).indexOf(item) === -1
    );

console.log(extChars('aassaaffddaagghhrtyuopmnbczxzcvqaweratsdfzgxcvbnhjyıolnmmöçipğüo,.ç?)(/)&+/)%/!112343679*')); // * 48

---- OR -----

const extChars2 = (str) =>
    [... new Set(str.split(''))];

console.log(extChars2('dshfgkdhsagjfasd')); // * 8
*/

// ! -------------------- 26
// ? Gives the not repeated characters
/*
const getNoRepeat = (str) => 
    str.split('')
        .filter((item, index, arr) => 
            arr.filter(arrItem => arrItem === item).length === 1
        );

console.log(getNoRepeat('asoprejdsşasdawqerxxvxc'));
*/

// ! -------------------- 27
// ? 
