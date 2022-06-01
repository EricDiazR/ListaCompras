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

for(let i=0;i<campos.length;i++){
    campos[i].style.border="red thin solid"
}
let spans = document.getElementsByTagName("span");

for(let i=0;i<spans.length;i++){
    console.log(spans[i].textContent);
}
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
let agregar = document.getElementById("botonAgregar");

agregar.addEventListener("click", (event)=>{
        let precio = Math.random()*50;
        let tmp = `<tr>
              <th scope="row">1</th>
              <td>${txtNombre.value}</td>
              <td>${txtNumber.value}</td>
              <td>${precio}</td>
            </tr>
        `
        console.log(tmp);
        cuerpoTabla[0].innerHTML += tmp;
        txtNombre.value="";
        txtNumber.value="";
        txtNombre.focus();
        }
);


