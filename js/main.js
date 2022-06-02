let element=document.getElementById("totalPrecio");
element.innerHTML="Total en precio uwu";

let txtNombre = document.getElementById("Name");
//txtNombre.value="Leche semidescremada";
//console.log(txtNombre.value);

let campos = document.getElementsByClassName("campo");
let txtNumber = document.getElementById("Number")
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
      return false
    }
    return true
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
        let precio = (Math.floor((Math.random()*50)*100))/100;//para solo 2 decimales, multiplicar 
        //por 100, math.floor y luego dividir entre 100.
        let cantidad = parseFloat(txtNumber.value);
        costoTotal = costoTotal+(precio*cantidad);
        costoTotal = (Math.ceil(costoTotal*100))/100;
        total.innerHTML = `$ ${costoTotal}`;
        let tmp = `<tr>
              <th scope="row">${contador}</th>
              <td>${txtNombre.value}</td>
              <td>${txtNumber.value}</td>
              <td>$ ${precio}</td>
            </tr>
        `
        //console.log(tmp);
        cuerpoTabla[0].innerHTML += tmp;
        txtNombre.value="";
        txtNumber.value="";
        txtNombre.focus();
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