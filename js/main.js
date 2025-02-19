let element=document.getElementById("totalPrecio");
element.innerHTML="Total en precio uwu";

let txtNombre = document.getElementById("Name");
//txtNombre.value="Leche semidescremada";
//console.log(txtNombre.value);

let campos = document.getElementsByClassName("campo");
let txtNumber = document.getElementById("Number");
//arreglo global para almacenar la lista de compras.
let datos = [];
//campos[0].value = "Leche descremada deslactosada light=agua"
//console.log(campos[0].value);
//console.log(campos);
/*
for(let i=0;i<campos.length;i++){
    campos[i].style.border="red thin solid"
}
let spans = document.getElementsByTagName("span");

for(let i=0;i<spans.length;i++){
    console.log(spans[i].textContent);
}
*/
/*tablaListaCompras*/
/*
            <tr>
              <th scope="row">1</th>
              <td>Leche descremada</td>
              <td>1</td>
              <td>$ 23</td>
            </tr>
*/

let tabla = document.getElementById("tablaListaCompras");
let cuerpoTabla = tabla.getElementsByTagName("tbody");
/*
cuerpoTabla[0].innerHTML = `
            <tr>
              <th scope="row">1</th>
              <td>Leche descremada</td>
              <td>1</td>
              <td>$ 23</td>
            </tr>

`;
*/
function validarNombre(){
    if(txtNombre.value.length<3){
      return false;
    }
    return true;
}

function validarCantidad() {
    if( isNaN (parseFloat(txtNumber.value))){ //jc tiene !
      return false;
    } 
    if (parseFloat(txtNumber.value)<=0){
      return false;
    }
    if(txtNumber.value.length==0) {
      return false;
    }
    return true;
  }


let agregar = document.getElementById("botonAgregar");
let total = document.getElementById("precioTotal");
let contador = 0;
let costoTotal=0;
let totalEnProductos=0;
agregar.addEventListener("click", (event)=>{
        event.preventDefault();
        if((! validarNombre()) || (! validarCantidad())){
          let lista="";
          
          if(!validarNombre()){
            txtNombre.style.border="red thin solid";
            lista+=`<li>Se debe escribir un nombre valido</li>`;
          }
          if(!validarCantidad()){
            txtNumber.style.border="red thin solid";
            lista+=`<li>Se debe escribir una cantidad valida</li>`;
          }               
          document.getElementById("alertValidacionesTexto").innerHTML=`
          Los campos deben ser llenados correctamente.
          <ul>${lista}</ul>
          `;
          document.getElementById("alertValidaciones").style.display="block";
          setTimeout(function(){
            document.getElementById("alertValidaciones").style.display="none";
          },3000
          );
          return false;
        }
               
        txtNombre.style.border="";
        txtNumber.style.border="";
        
        document.getElementById("alertValidaciones").style.display="none";
        contador++;
        document.getElementById("contadorProductos").innerHTML=contador;
        let precio = (Math.floor((Math.random()*50)*100))/100;
        let cantidad = parseFloat(txtNumber.value);
        totalEnProductos += (cantidad<1)?Math.ceil(cantidad):parseInt(cantidad);
        document.getElementById("productosTotal").innerHTML=totalEnProductos; 
        costoTotal = costoTotal+(precio*cantidad);
        costoTotal = (Math.ceil(costoTotal*100))/100;
        total.innerHTML = `$ ${costoTotal}`;
        //JSON
        let elemento= `{"id":${contador}, 
          "nombre":"${txtNombre.value}", 
          "cantidad":${txtNumber.value}, 
          "precio":${precio}
        }`;

        datos.push(JSON.parse(elemento));
        console.log(datos);
        let tmp = `<tr>
              <th scope="row">${contador}</th>
              <td>${txtNombre.value}</td>
              <td>${txtNumber.value}</td>
              <td>$ ${precio}</td>
            </tr>
        `
        cuerpoTabla[0].innerHTML += tmp;
        txtNombre.value="";
        txtNumber.value="";
        txtNombre.focus();

      //almacenamiento
            localStorage.setItem("contadorProductos",contador);
            localStorage.setItem("productosTotal",totalEnProductos);
            localStorage.setItem("costoTotal",costoTotal);
            localStorage.setItem("elementosTabla",JSON.stringify(datos));
      }
);
txtNombre.addEventListener("blur",(event)=>{
    event.target.value=event.target.value.trim();//objeto
  }
);
txtNumber.addEventListener("blur",(event)=>{
  event.target.value=event.target.value.trim();//objeto
  }
);
window.addEventListener("load",function(){
    if(localStorage.getItem("contadorProductos")!=null){
      contador=parseInt(localStorage.getItem("contadorProductos"));
      document.getElementById("contadorProductos").innerHTML=contador;
    }
    if(localStorage.getItem("productosTotal")!=null){
      totalEnProductos=parseFloat(localStorage.getItem("productosTotal"));
      document.getElementById("productosTotal").innerHTML=totalEnProductos;
    }
    if(localStorage.getItem("costoTotal")!=null){
      costoTotal=parseFloat(localStorage.getItem("costoTotal"));
      document.getElementById("precioTotal").innerHTML=costoTotal;
      console.log(costoTotal);
    }
    if(localStorage.getItem("elementosTabla")!=null){
      datos = JSON.parse(localStorage.getItem("elementosTabla"));
      datos.forEach(element => {
        cuerpoTabla[0].innerHTML +=  `<tr>
                <th scope="row">${element.id}</th>
                <td>${element.nombre}</td>
                <td>${element.cantidad}</td>
                <td>$ ${element.precio}</td>
              </tr>`;
      });
    }
    
}
);