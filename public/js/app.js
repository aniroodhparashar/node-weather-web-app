console.log('Client side javascript')

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message_one');
const messageTwo = document.querySelector('#message_two');

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {

            if(!data.error){

             messageOne.textContent = data.forecast
             messageTwo.textContent = data.address
            }else {
               // console.log(data.error)
                messageOne.textContent = data.error
            }

        })
    })
    //console.log(location)
})