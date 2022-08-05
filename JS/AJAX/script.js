'use strict';

// the DOM has these elements for us to interact with once the page loads...
document.addEventListener('DOMContentLoaded', () =>
{
    const loadAssociates = document.getElementById('load-associates');
    const associateList = document.getElementById('associate-list');
    const errorDisplay = document.getElementById('error-display');
    const dataInput = document.getElementById('data-input');

// here's what to do when you see one of these events...

    loadAssociates.addEventListener('click', () =>
    {
        // let url = 'https://demowebapp-hawkins-220705.azurewebsites.net/api/Associates';
        let url = `https://jsonplaceholder.typicode.com/users/${dataInput.value}`;
        // const req = new XMLHttpRequest();
        // req.onload = function() 
        // { 
        //     if (req.status === 200)
        //     {
        //         console.log("Request successful");
        //         let response = JSON.parse(req.responseText);
        //         if(!(response instanceof Array))
        //         {
        //             response = [response];
        //         }
        //         let html = '<ul>';
        //         // for (let item in response)
        //         // {
        //         //     console.log(response[item].name);
        //         //     html += '<li>' + response[item].name + '</li>';
        //         // }
        //         html += response.map(x => '<li>' + x.name + '</li>').join('');
        //         html += '</ul>';
        //         associateList.innerHTML = html;
        //     }
        //     else
        //     {
        //         errorDisplay.hidden = false;
        //         errorDisplay.textContent = "Request failed. Error";
        //         dataContainer.textContent = '';
        //     }           
        // }
        // req.open('GET', url);     
        // req.send();


        fetch(url)
            .then(response => 
            {
                if (!response.ok)
                {
                    throw new Error(`server error ${response.status}`);
                }
                return response.json();
            })
            .then(obj =>
            {
                errorDisplay.hidden = true;
                displayData(obj, associateList);
            })
            .catch(err => 
            {
                errorDisplay.hidden = false;
                errorDisplay.textContent = err.message;
                associateList.textContent = '';
            });
    })
})

function displayData(data, container)
{
    if (!(data instanceof Array))
    {
        data = [data];
    }

    let html = '<ul>' + data.map(x => '<li>' + x.name + '</li>').join('') + '</ul>';
    container.innerHTML = html;
}