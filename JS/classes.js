"use strict";

// JavaScript Objects

// an object is just a collect of related functionality stored together.
// Objects are used to store Properties(key/value pairs) and more complex entities.

// JS objects are stored by reference, not by value.
// the variable representing the object is not the object itself, 
// instead it holds the memory location/address of the object on the heap.

let user = new Object(); //object constructor syntax
let user2 = {}; //object literal syntax

let user3 = {
    name: "Jimmy",
    age: 30
}



// property values and shorthands

// function makeUser(name, age)
// {
//     return {
//         name: name,
//         age: age
//     };
// }


function makeUser(name, age)
{
    return {
        name,
        age,
        sizes : {
            height: 160,
            weight: 50
        }
    };
}

let newUser = makeUser("Jimmy", 30);
console.log(newUser);
console.log(newUser.age); // user the "dot property" syntax
console.log(newUser.sizes.height);

// console.log(newUser["homeAddress" ]);
// newUser.homeAddress = "123 Main St";
// console.log(newUser);
// console.log(newUser.homeAddress);

//let anotherUser = makeUser("Timmy", 20);


// Map is a key/value data structure, like an object
// any type of data can be used as a key
// the value can be any type of data
// the insertion order is the iteration order

let map = new Map();

map.set(1, "one");
map.set("2", 2);
map.set("4", "one");

alert( map.get("4"));


// Set is a data structure that stores unique values
// think array, but everything must be unique

let set = new Set();

set.add(5);
set.add("john");
set.add(true);

for (let item of set)
{
    console.log(item);
}



// classes - state and bahavior
class Rectangle2
{
    // constructor method (also supplies the "fields"/vlues/properties of the object)
    constructor(height, width)
    {
        this.height = height;
        this.width = width;
    }

    // prototype method
    // prototype methods are declared in the class and arevailable though an instance of the class.

    // getters and setters (accessor properties)
    get area()
    {
        return this.calcArea();
    }

    calcArea()
    {
        return this.height * this.width;
    }
    
    // static method
    // static methods are called without instantiating the class
    //  and are not available through the class instance.

    static calcPerimeter(a, b)
    {
        return 2 * a + 2 * b;
    }
}

let Rectangle = new Rectangle2(10, 20);
console.log(Rectangle.area);
console.log(Rectangle2.calcPerimeter(2, 4));

// for (let value in Rectangle)
// {
//     console.log(value);
// }



// JSON  and JSON methods
// JavaScript Object Notation

// JSON.stringify(object) - converts an object to a JSON string

console.log(JSON.stringify(Rectangle));
console.log(JSON.stringify(newUser));

let json = '{"name":"Annie","age":30,"sizes":{"height":160,"weight":30}}';

let obj = JSON.parse(json);
console.log(obj);



// AJAX - Asynchronous JavaScript and XML
// XMLHttpRequest - used to make HTTP requests to a server
// XMLHttpRequest.readyState - the state of the request
// 0-4, unsent, opened, headers received, loading, done

const req = new XMLHttpRequest();
console.log(req.readyState);

req.onreadystatechange = () =>
{
    console.log("Ready state: " + req.readyState);
    
    if (req.readyState === 4)
    {
        if (req.status === 200)
        {
            console.log("Request successful");
        }
        else
        {
            console.log("Request failed. Error");
        }
    }
    else
    {
        console.log("Pending...");
    }
}

req.onload = function() 
{
    console.log("all done with request");
    console.log(req.responseText);
}
// requestObject.open(method, url, async)
req.open("GET", "https://jsonplaceholder.typicode.com/users", true);

req.setRequestHeader("Accept", "application/json");
req.send();







// if(req.readystate < 4)
// {
//     console.log("loading...");
// }
// else{
//    // req.onreadystatechange = function()
// }






// After AJAX, we send the data to the DOM

// DOM = Document Object Model
