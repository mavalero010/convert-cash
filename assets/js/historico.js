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

  const deleteH=({cl,idarticle})=>{

    const c = cl.split(" ")
    const icono = document.createElement("button")
    icono.setAttribute("value",idarticle)
    icono.setAttribute("id",create_UUID())
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
    const deleteBtn=deleteH({cl:"delete-register fa-solid fa-x text-red-500",idarticle:id})
    //article.appendChild(divMonto);
    article.appendChild(divMonedaOrigen);
    article.appendChild(ico);
    //article.appendChild(divResultado);
    article.appendChild(divMonedaDestino);
    article.appendChild(divFechaActual);
    article.appendChild(deleteBtn);
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

  const btn_borrar_todo=document.querySelector(".borrar-todo")

  btn_borrar_todo.addEventListener("click",(e)=>{
    window.localStorage.removeItem("taskStorage")
    location.replace("historico.html")
  })

/*  const botones = document.querySelectorAll('.delete-register');
  let taskStorage=JSON.parse(window.localStorage.getItem("taskstorage"))
  console.log("nre: ",(taskStorage))
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener('click', function(event) {
      const id = event.target.id;
      const bt = document.getElementById(id)
      bt.addEventListener("click", function() {
        const idAEliminar = this.value; // obtiene el valor de la propiedad "value" del botón
        const elementoAEliminar = document.getElementById(idAEliminar);
        if (elementoAEliminar) { // verifica si se encontró el elemento a eliminar
          elementoAEliminar.remove(); 
          const newStorage = taskStorage.filter(t=>t.id==idAEliminar)
          console.log("nre: ",newStorage)
          
          location.replace("historico.html")
          // elimina el elemento del DOM
        }
      });
      // Realiza aquí la acción que desees con el botón presionado
    });
  }*/