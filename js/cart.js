let carrito = [];

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            carrito = resultObj.data
            showCarrito();
            configuracionesdeenvio();
            costoTotal();
        }
    })
})

function showCarrito(){

    let htmlContentToAppend = "";

    htmlContentToAppend = `
    <h1 class="text-center mt-3 mb-3 fw-bold">Carrito de Compras</h1>
    <h4 class="mb-3">Artículos a comprar</h4>
    <table class="mt-2 mb-5">
        <thead>
            <tbody>
                <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Costo</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                </tr>
                <tr>
                <th><hr></th>
                <th><hr></th>
                <th><hr></th>
                <th><hr></th>
                <th><hr></th>
                </tr>
                <tr>
                    <td class="col-md-2"><div><img src=${(carrito.articles[0].image)} class="w-50 h-50 img-fluid img-thumbnail"></img></div></td>
                    <td class="col-md-2">${(carrito.articles[0].name)}</td>
                    <td class="col-md-2">${(carrito.articles[0].currency +" "+carrito.articles[0].unitCost)}</td>
                    <td class="col-md-2"><label for ="cantidad"></label><input type = "number" value="${(carrito.articles[0].count)}" min="1" onkeyup="costoTotal()" onclick="costoTotal()" oninput="validity.valid|| 
                    (value='');" id="cantidad"></td>
                    <td id="subtotal" class="col-md-2"></td>
                </tr>
            </tbody>
        </thead>
    </table>
    <hr>
    `

    document.getElementById("carrito").innerHTML += htmlContentToAppend
}

function configuracionesdeenvio(){
    let enviotoAppend = ""
    enviotoAppend = `
    <h4> Tipo de Envío </h4>
    <div class="d-block my-3">
    <div class="custom-control custom-radio">
      <input id="Premium" name="tipoEnvio" type="radio" class="custom-control-input" checked="">
      <label class="custom-control-label" for="Premiun">Premium: De 2 a 5 dias (15%)</label>
    </div>
    <div class="custom-control custom-radio">
      <input id="Express" name="tipoEnvio" type="radio" class="custom-control-input">
      <label class="custom-control-label" for="Express">Express: De 5 a 8 dias (7%)</label>
    </div>
    <div class="custom-control custom-radio">
      <input id="Standar" name="tipoEnvio" type="radio" class="custom-control-input">
      <label class="custom-control-label" for="Standar">Standar: De 12 a 15 dias (5%)</label>
    </div>
    <br>
    <h4> Direccion de Envío </h4>
    <div class="row">
        <div class="col-md-4 mb-3">
            <label for="Calle"> Calle: </label>
            <input type="text" class="form-control" id="Calle">
        </div>
        <div class="col-md-2 mb-3">
            <label for="NumeroCalle"> Numero: </label>
            <input type="number" class="form-control" id="NumeroCalle">
        </div>
    </div>
    <div class="row">
        <div class="col-md-4 mb-3">
            <label for="Esquina"> Esquina: </label>
            <input type="text" class="form-control" id="Esquina">
        </div>
    </div>
    <hr>

    `
    document.getElementById("envio").innerHTML+= enviotoAppend;
}

function costoTotal(){
    let cantidad = document.getElementById("cantidad").value;
    let resultado = cantidad * carrito.articles[0].unitCost;
    if (resultado != 0){
        document.getElementById("subtotal").innerHTML=`<b>${carrito.articles[0].currency+ " " + resultado}</b>`;
    }else{
        document.getElementById("subtotal").innerHTML=`<b>${carrito.articles[0].currency+ " " + 0}`;
    }
}
