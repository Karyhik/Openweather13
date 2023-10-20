
let calculation =localStorage.getItem('calculation')|''; //whenever page is reloading we are getting calculation using get item
displayOnPage();
function calciMath(value)
{
    
    calculation = calculation+value;
    displayOnPage();
    localStorage.setItem('calculation',calculation); //whenever we are updating the calculation we are saving it using setItem
}

function displayOnPage() //function for displaying calculation on page instead of console
{
    document.querySelector('.js-calcu').innerHTML =calculation;
}