var inputval = document.querySelector('#cityinput');
var btn = document.querySelector('#add');
var city = document.querySelector('#cityoutput');
var descr = document.querySelector('#description');
var tem = document.querySelector('#temp');
var wind = document.querySelector('#wind');

function conversion(val) //conversion of kelvin to celsius
{
    return(val-273).toFixed(2);
}
apik = "ab6ecedbbe2a4f7500c428ac6d6ce32a"

btn.addEventListener('click',function(){

    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputval.value+'&appid='+apik)// fetching the data from website through API KEY
    .then(res => res.json())

    .then(data => {

        var nameVal = data['name']
        var descrip = data['weather']['0']['description']
        var temperature = data['main']['temp']
        var wSpeed = data['wind']['speed']

        city.innerHTML = `City : ${nameVal}`
        description.innerHTML = `Conditions : ${descrip}`
        temp.innerHTML = `Temperature : ${conversion(temperature)} C`
        wind.innerHTML = `Wind Speed : ${wSpeed} Km/h`
    })
    .catch(err => alert('You have entered wrong city'))
})