

// Obtener referencias a los elementos HTML
let resultado = document.getElementById("resultado");
const historicoBtn = document.querySelector('.historico-btn')
const convertBtn = document.querySelector("#convert");

let taskStorage = JSON.parse(
  window.localStorage.getItem("taskStorage") || "[]"
);

// Llamada a la API de conversión de moneda
const convertirMoneda=async (monedaOrigen, monedaDestino, monto)=> {
  let myHeaders = {
    "Content-Type": "application/json",
    apikey: "z0yo6UagCGoA82cLshcxyyGdOu7NXuAp",
  };
  myHeaders = new Headers();
  myHeaders.append("apikey", "z0yo6UagCGoA82cLshcxyyGdOu7NXuAp");

  let requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };
  let tasaDeCambio
  const url = `https://api.frankfurter.app/latest?from=${monedaOrigen}&to=${monedaDestino}&amount=${monto}`;
  //const url= `https://api.apilayer.com/fixer/convert?to=${monedaOrigen.value}&from=${monedaDestino.value}&amount=${monto.value}`
  tasaDeCambio=fetch(url)
    .then((response) => response.json())
    .then((data) => {
       const tasa = Object.values(data.rates)[0];
      //const montoConvertido = (tasaDeCambio * parseFloat(monto.value)).toFixed(2);
      return resultado.value = tasa;
      
    })
    .catch((error) => console.error(error));
    
    return tasaDeCambio
}

const flag=({id,flag_name})=>{
  const fragment = document.createDocumentFragment();
  const img = document.createElement("img");
  img.setAttribute("class","w-2/8 h-3/6")
  img.setAttribute("id", id)
  img.setAttribute("src",`./assets/images/${flag_name}.png`)

  fragment.appendChild(img)
  return fragment
}

convertBtn.addEventListener("click", async(e) => {
  e.preventDefault();
  const monedaOrigen = document.getElementById("moneda-origen").value;
  const monedaDestino = document.getElementById("moneda-destino").value;
  const monto = document.getElementById("monto").value;
  const flags = document.querySelector('.flags')
  
  flags.innerHTML=""
  
  if (!monedaDestino) return alert("No seleccionó ninguna moneda destino");

  if (!monedaOrigen) return alert("No seleccionó ninguna moneda origen");

  if (!monto) return alert("Ingrese un monto válido");

  if(monedaDestino===monedaOrigen) return alert("Divisas iguales, seleccione diferentes");
  // Evento para actualizar el resultado de la conversión cuando cambia algún valor
   const r=await convertirMoneda(monedaOrigen, monedaDestino, monto)
  
   if(r===undefined && monto!="0"){
    return alert("Error en el servidor, compruebe conexion a internet")
   }
   const ahora = new Date();
   const fechaActual =
     ahora.toLocaleDateString() + " " + ahora.toLocaleTimeString();
  let record = {
    id: create_UUID(),
    monedaOrigen,
    monedaDestino,
    monto,
    resultado:r,
    fecha:fechaActual
  };
  if(monto=="0"){
    record.resultado="0"
    resultado.value="0"
  }
   let fl = flag({id:create_UUID(),flag_name:monedaOrigen})
  flags.appendChild(fl)
  const arrow = document.createDocumentFragment()
  const ar = document.createElement("i")
  ar.setAttribute("class","flex fa-solid fa-arrow-right fa-2xl text-green-900 mx-10")
  arrow.appendChild(ar)
  flags.appendChild(arrow)
  fl = flag({id:create_UUID(),flag_name:monedaDestino})
  
  flags.appendChild(fl)
  taskStorage.push({ ...record });
  window.localStorage.setItem("taskStorage", JSON.stringify(taskStorage));

});

function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}


