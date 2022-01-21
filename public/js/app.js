function fetchWeatherData(location, callback){

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error)
            {
                return callback(data.error, undefined)
            }
            else{
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
            messageOne.textContent = error;
        }
        else{
            messageOne.textContent = data.address;
            messageTwo.textContent = data.forecast;
        }

    });
}
)