

const app = require("express");

let myHeaders =  {
    'Content-Type': "application/json",
    'apikey':"z0yo6UagCGoA82cLshcxyyGdOu7NXuAp"
  }
  

const api = app()
let requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

api.get(`/server`,async (req, res) => {
  try {
    const {monedaDestino,monedaOrigen,monto} = req.query
    
    const response = await fetch(`https://api.apilayer.com/fixer/convert?to=${monedaOrigen}&from=${monedaDestino}&amount=${monto}`,requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
})
  

  api.listen(3000, () => {
    console.log('Server listening on port 3000');
  });