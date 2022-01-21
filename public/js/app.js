console.log('Client side javascript file is loaded!')

function fetchWeatherData(location, callback){

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            console.log("IN FETCH: " + data);
            if(data.error)
            {
                console.log(data.error);
                return callback(data.error, undefined)
            }
            else{
                console.log(data.address);
                console.log(data.forecast);
                console.log("RETURINING FORECAST");

                return callback(undefined, {'forecast': data.forecast, 'address':data.address})
            }
        })
    }
    )
}
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#msg-1');
const messageTwo = document.querySelector('#msg-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetchWeatherData(location, (error, data)=>{
        if(error){
            console.log("ERROR: ", error);
            messageOne.textContent = error;
        }
        else{
            console.log("DATA: ", data);
            messageOne.textContent = data.address;
            messageTwo.textContent = data.forecast;
        }

    });

    console.log("SUBMIT WORKING");
    // console.log(weather);
}
)