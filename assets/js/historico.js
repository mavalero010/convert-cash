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
  const createP = ({ text, child }) => {
    const parrafo = document.createElement("p");
  
    if (child) {
      parrafo.appendChild(child);
    }
  
    if (text) {
      text = document.createTextNode(text);
      parrafo.appendChild(text);
    }
  
    return parrafo;
  };
  
  const createIcon=(cl)=>{
  const c = cl.split(" ")
  const icono = document.createElement("i")
  c.forEach(element => {
    icono.classList.add(element)
  });
  return icono
  }
  const deleteH=(cl)=>{
    const c = cl.split(" ")
    const icono = document.createElement("i")
    c.forEach(element => {
      icono.classList.add(element)
    });
    return icono
    }
    const deleteAllH=(cl)=>{
      const c = cl.split(" ")
      const icono = document.createElement("i")
      c.forEach(element => {
        icono.classList.add(element)
      });
      return icono
      }
    
  
const addRecord = ({ id, monedaOrigen, monedaDestino, monto, resultado,fecha }) => {
    const fragment = document.createDocumentFragment();
    const article = document.createElement("article");
    article.setAttribute("class", "register bg-slate-600 hover:bg-gray-100 flex justify-around items-center shadow-lg flex-grow flex-shrink-0 flex-basis-auto border-gray-200 my-2 mx-2 rounded-md");
    article.setAttribute("id", id);
    const divMonedaOrigen = createDiv({
      classDiv: "monedaOrigen mr-2 text-red-500 w-1/4 text-center",
  
      children: [createP({ text: `${monto} ${monedaOrigen}` })],
    });
  
    const ico = createIcon("fa-solid fa-arrow-right mr-2 text-blue-500 w-1/4 text-center")
  
    const divMonedaDestino = createDiv({
      classDiv: "monedaDestino mr-2 text-green-500 w-1/4 text-center",
      children: [createP({ text: `${resultado} ${monedaDestino}` })],
    });
   
    const divFechaActual = createDiv({
      classDiv: "fechaActual text-blue-500 w-1/4 text-center",
      children: [createP({ text: fecha })],
    });
  
    //article.appendChild(divMonto);
    article.appendChild(divMonedaOrigen);
    article.appendChild(ico);
    //article.appendChild(divResultado);
    article.appendChild(divMonedaDestino);
    article.appendChild(divFechaActual);
    fragment.appendChild(article);
    return fragment;
  };
  
export const historicos =(historicos)=>{
    if(historicos!==null)
{
    historicos.forEach(({ id, monedaOrigen, monedaDestino, monto, resultado,fecha }) => {
        const newRecord = addRecord({ id, monedaOrigen, monedaDestino, monto, resultado,fecha });
        document.querySelector(".record").appendChild(newRecord);
      });
}
    
    
}

historicos(JSON.parse(
    window.localStorage.getItem("taskStorage")
  ))

  //window.localStorage.removeItem("taskStorage")