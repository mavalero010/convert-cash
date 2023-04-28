const tablaBtn=document.querySelector('#tabla-btn')
let mont =""
const createDiv = ({ classDiv, children }) => {
    const cd=classDiv.split(" ")
    
    const div = document.createElement("div");
    cd.forEach(element => {
      div.classList.add(element);
    });
  
    children.forEach((child) => {
      div.appendChild(child);
    });
  
    return div;
  };
  const createP = ({ text, classP }) => {
    const parrafo = document.createElement("p");
    cp=classP.split(" ")
    cp.forEach(element => {
        parrafo.classList.add(element);
      });
    
    if (text) {
      text = document.createTextNode(text);
      parrafo.appendChild(text);
    }
  
    return parrafo;
  };

  const createImg=({name,classImg})=>{
    const img = document.createElement("img")
    const cd=classImg.split(" ")
    cd.forEach(element => {
        img.classList.add(element);
      }); 
    img.setAttribute("src",`./assets/images/${name}.png`)
    return img
  }
  const convertirMoneda=async ({monedaOrigen, monedaDestino, monto})=> {
    
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
    tasaDeCambio=await fetch(url)
      .then((response) => response.json())
      .then((data) => {
         const tasa = Object.values(data.rates)[0];
        //const montoConvertido = (tasa * parseFloat(monto)).toFixed(2);
        mont=tasa
        const item=elemTable({monedaOrigen:monedaDestino,monto:mont})
        document.querySelector(".compare").appendChild(item);
        return tasa
        
      })
      .catch((error) => console.error(error));
      
      return tasaDeCambio
  }
  
  const elemTable=({monedaOrigen,monto})=>{
    const fragment = document.createDocumentFragment();
    const article = document.createElement("article");
    
    article.setAttribute("class", "register bg-slate-600 w-full flex justify-between items-center shadow-lg flex-grow flex-shrink-0 flex-basis-auto mx-2");
    const divMonedaOrigen = createDiv({
        classDiv: "monedaOrigen flex text-black bg-slate-300 w-full justify-around flex-grow",
    
        children: [createImg({name:monedaOrigen,classImg:"h-6 w-8 flex justify-start w-1/3"}),createP({ text: `${monedaOrigen}` ,classP:"w-1/3 text-center"}),createP({ text: `${monto}`,classP:"w-1/3 text-end" })],
      }); 

      article.appendChild(divMonedaOrigen)
      fragment.appendChild(article)
      return fragment
  }

tablaBtn.addEventListener("click",async(e)=>{
    const moneda = document.getElementById('moneda-origen')
    const monedas = [];

    for (let i = 0; i < moneda.length; i++) {
        if(moneda[i].value!=moneda.value){
            monedas.push(moneda[i].value);
    }
}
mont=""
document.querySelector('.compare').innerHTML=""
const item=elemTable({monedaOrigen:moneda.value,monto:'1'})
document.querySelector(".compare").appendChild(item);
monedas.forEach(async(element) => {
   await convertirMoneda ({monedaOrigen:moneda.value,monedaDestino:element,monto:'1'})

});
})