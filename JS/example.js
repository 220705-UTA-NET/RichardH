"use strict";

// This is a simple example of a JavaScript file.
// we're back to // to comment!

// dynamic typing!
// in C#, if you want an int, you have to say you want an int.
// in JavaScript, we can use dynamic typing to manipulate the values
// of variables.

// let and var
var number = 10; // var is function scopped
let name = "Jimmy"; // let is block scopped

// console output!
console.log("Hello World!");
console.log(4);
console.log(number);
console.log(name);

// hoisting
// hoisting is a JavaScript feature that allows variables to be declared
// after they are used.
let value = 5;
value = 6;
console.log(value);


// yeah, i know, my example is broken!


// operators
// we still have all the operators we know and love!
// + - * / % ++ --
// = assignment
// == >= <= != !=
// == equality - compare/check value only
// === strict equality - compare/check value and type
// = : let value = 5;
// == : let bool = (5 == (2+3));
// === : let bool = (5 === (2+3)); true
// === : let bool = ( 2 === '2' ); false

console.log(5===5);
console.log(5==='5');


// truthy and falsy
// in JS, everything is truthy except:
// false
// 0
// ""
// null
// undefined
// NaN
// -0
// 0n

// Type Conversions
// the three common conversions in JS are:
// to number
// to string
// to boolean

// anything can become a string!

// from string to number:
// undefined -> NaN
// null -> 0
// true/false -> 1/0
// whitespaces are ignored, an error returns NaN
// emptly string -> 0

// to boolean:
// truthy = true
// falsy = false



// Control Flow
// if/else
// loops
// conditionals

while(true){
    console.log("Hello World!");
    break;
    // continue;
    // return;
}

for (let i = 0; i < 2; i++){
    console.log("Hello again!");
}
// we also have do/while



// Functions
// a JS function is handled like an object.
// it has a name, parameters, and a body.

function showMessage(from, text = "no message")
{
    //console.log(`${from}: ${text}`);
    console.log(from + " : " + text);
}

showMessage("James");
showMessage("Hau", "Hi there!");

function checkAge(age)
{
    if(age >= 18)
    {
        return true;
    }
    else
    {
    return confirm ("Did parents allow you?");
    // confirm returns a boolean
    }
}

console.log(checkAge(15));


// Function Expressions
// a function expression is a function that is
// defined inside another function

function sayHi()
{
    alert("Hello!");
}

let func = sayHi;

func();
sayHi();

// we can make a function part of an object
// (and since an function is an object,
// we can make a function part of another function)

// Callback Functions
// a function that is passed to another function


// lets declare some functions...

try{
    function addNums(num1, num2)
    {
        return num1 + num2;
    }

    function multiplyNums(b)
    {
        return num1 * num2;
    }

    function doMath(num1, num2, func)
    {
        return func(num1, num2);
    }

    // assign those functions to variables...
    let runFunc = addNums;
    console.log(doMath(5, 6, runFunc));

    // and then change the function to multiplyNums,
    // without changing the call to doMath!

    runFunc = multiplyNums;
    console.log(doMath(5, 6, runFunc));
}
catch(oops)
{
    alert('not again!');
}

// Arrow Functions

let func4 = function(arg1, arg2)
{
    return arg1 + arg2;
}

let func5 = (arg1, arg2) => arg1 + arg2;

// func4 and func5 are the same!
// when there are no parameters, you have to use parentheses
// when there are one parameter, you don't have to use parentheses

let newFunc = () => alert('hi there!');
let newFunc2 = n => alert('hi again' + n);

newFunc();
console.log(newFunc);



// Try Catch Finally in JS

// JS has one error object, it has a name, a message, and a stack trace
// (a list of functions that caused the error)

// Error(message);
// SyntaxError(message);
// ReferenceError(message);

try 
{
    alert('Starting try runs...');

    lalala;

    alert('Ending try runs...');
} catch (err)
{
    alert('Error has occurred');
}
finally
{
    alert('Finally runs...');
}



// Scope and Closure
// scope is the area of memory in which a variable is defined
// closure is the ability to access a variable from within a function
// this particular exmple is Lexical Scoping

function init()
{
    var name = "Mozilla";
    function displayName()
    {
        alert(name);
    }
    displayName();
}
init();

function makeAdder(x)
{
    return function(y)
    {
        return x + y;
    };
}

let add5 = makeAdder(5);
let add10 = makeAdder(10);

console.log(add5(2));
console.log(add10(2));







