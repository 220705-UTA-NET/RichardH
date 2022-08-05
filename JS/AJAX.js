'use strict';

// AJAX - Asynchronous JavaScript and XML

// XMLHttpRequest - used to make HTTP requests to a server

// XMLHttpRequest.readyState - the state of the request
// 0-4, unsent, opened, headers received, loading, done

// XMLHttpRequest.onreadystatechange = the function to be called when the readyState property changes

// XMLHttpRequest.onload = the function to be called when the request is complete


const req = new XMLHttpRequest();
console.log(req.readyState);

// what do you do when the ready state changes?
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

// what do you do when the request is done/returned?
req.onload = function() 
{
    let response = JSON.parse(req.responseText);
    if(!(response instanceof Array))
    {
        response = [response];
    }
    for (let item in response)
    {
        console.log(response[item].name);
    }
    
}

// requestObject.open(method, url, async)
req.open("GET", "https://jsonplaceholder.typicode.com/users/", true);

req.setRequestHeader("Accept", "application/json");
req.send();

