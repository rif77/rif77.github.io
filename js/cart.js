let carrito = [];

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            carrito = resultObj.data
            showCarrito();
            configuracionesdeenvio();
            actualizaciondeProducto();
            costodeenvio();
            validacion();
            validarModal();
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
                    <td class="col-md-2"><label for ="cantidad"></label><input type = "number" value="${(carrito.articles[0].count)}" min="1" onkeyup="actualizaciondeProducto(), costodeenvio()" onclick="actualizaciondeProducto(), costodeenvio()" oninput="validity.valid|| 
                    (value='');" id="cantidad"></td>
                    <td id="Subtotal" class="col-md-2"></td>
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
    <form id="envio" class="row g-3 needs-validation" novalidate>
    <div class="mb-2"> <h4> Tipo de Envío </h4>
        <div class="d-block my-3">
            <div class="custom-control custom-radio">
                <input id="Premium" name="tipoEnvio" type="radio" class="custom-control-input" onclick="costodeenvio()" checked="">
                <label class="custom-control-label" for="Premium">Premium: De 2 a 5 dias (15%)</label>
            </div>
            <div class="custom-control custom-radio">
                <input id="Express" name="tipoEnvio" type="radio" class="custom-control-input" onclick="costodeenvio()">
                <label class="custom-control-label" for="Express">Express: De 5 a 8 dias (7%)</label>
            </div>
            <div class="custom-control custom-radio">
                <input id="Standard" name="tipoEnvio" type="radio" class="custom-control-input" onclick="costodeenvio()">
                <label class="custom-control-label" for="Standard">Standard: De 12 a 15 dias (5%)</label>
            </div>
    </div>
    <h4> Direccion de Envío </h4>
    <div class="row g-3">
        <div class="col-sm-6">
            <label for="validationCustom01" class="form-label">Calle:</label>
            <input type="text" class="form-control" id="validationCustom01" required>
                <div class="invalid-feedback">
                    Debe ingresar una calle.
                </div>
        </div>
    
        <div class="col-sm-3">
            <label for="validationCustom02" class="form-label">Numero:</label>
            <input type="text" class="form-control" id="validationCustom02" required>
                <div class="invalid-feedback">
                    Debe ingresar un número de calle.
                </div>
        </div>
    </div>
   
    <div class="row g-3 mt-1 mb-3">
        <div class="col-sm-6">
            <label for="validationCustom03" class="form-label">Esquina:</label>
            <input type="text" class="form-control" id="validationCustom03" required>
            <div class="invalid-feedback">
                Debe ingresar una esquina.
            </div>
        </div>
    </div>
    
    <h4 class="mb-3">Costos</h4>
        <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                    <h6 class="my-0">Subtotal</h6>
                    <small class="text-muted">Precio unitario del producto por cantidad</small>
                </div>
                <span class="text-muted" id="subtotalProducto"></span>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                    <h6 class="my-0">Costo de envio</h6>
                    <small class="text-muted">Según el tipo de envio</small>
                </div>
                <span class="text-muted" id="valordeEnvio"></span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
                <span>Total ($)</span>
                <strong id="valorTotal"></strong>
            </li>
        </ul>
    <hr class="mb-4">

    <h4 class="mb-3">Metodo de Pago</h4>
    <div id="Estado"><p>No se ha seleccionado modo de pago.</p></div>
        <div id="validacionPago">
        </div>
        
        <span id="Modal">
            <button type="button" class="m-1 btn btn-link mb-4" data-bs-toggle="modal" data-bs-target="#pagosModal">Seleccionar modo de pago</button>
        </span> <span id="modalspan" class="d-none text-danger">Debe completar la información en método de pago.</span>

    <div class="modal fade" tabindex="-1" id="pagosModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><b>Forma de Pago</b></h5>
                </div>
            <div class="modal-body">
                <form id="formadePago" method="post" onSubmit=""  class="needs-validation" nonvalidate>
                    <div>
                        <input id="Credito" name="tipoPago" type="radio" class="custom-control-input" onclick="eleccionCredito()">
                        <label class="custom-form-label" for="Credito">Tarjeta de Credito</label>
                        <hr>
                    </div>
                    <div class="row g-3">
                        <div class="col-sm-6" id="TarjetadeCredito">
                            <label class="form-label" for="NumeroCredito"> Numero de Tarjeta </label>
                            <input class="form-control" type="text" id="numeroCredito" required>
                            <div class="invalid-feedback">
                            Debe completar este campo.
                            </div>
                        </div>
                        <div class="col-sm-4" id="CodigodeSeg">
                            <label class="form-label for="NumeroCodigo"> Codigo de Seg</label>
                            <input class="form-control" type="number" min="100" max="999" id="numeroCodigo" required>
                            <div class="invalid-feedback">
                            Debe completar este campo.
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 mt-2" id="Vencimiento">
                        <label class="form-label" for="vigenciaCredito"> Vencimiento (MM/AAAA) </label>
                        <input class="form-control" type="month" id="vigenciaCredito" required>
                        <div class="invalid-feedback">
                        Debe completar este campo.
                        </div>
                    </div>
            
                    <div class="mt-4">
                        <input id="Banco" name="tipoPago" type="radio" class="custom-control-input" onclick="eleccionBanco()">
                        <label class="custom-form-label" for="Banco">Transferencia Bancaria</label>
                        <hr>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="nCuentaBanco"> Numero de Cuenta </label>
                        <input class="form-control" type="number" id="nCuentaBanco" required>
                        <div class="invalid-feedback">
                        Debe completar este campo.
                        </div>
                    </div>
                    <p class='d-none incorrecto' id="ErrorModal1">Debe seleccionar un metodo de pago</p>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </div>

    <div class="w-100">
      <button class="btn btn-primary w-100" type="submit" id="finalizarCompra">Finalizar compra</button>
    </div>
    </form>
    `
    document.getElementById("envio").innerHTML+= enviotoAppend;
}

function actualizaciondeProducto() {
    let cantidad = document.getElementById("cantidad").value;
    let resultado = cantidad * carrito.articles[0].unitCost;
    if (resultado != 0) {
      document.getElementById("Subtotal").innerHTML = `<b>${carrito.articles[0].currency + " " + resultado}</b>`;
      document.getElementById("subtotalProducto").innerHTML = `${carrito.articles[0].currency + " " + resultado}`;
    } else {
      document.getElementById("Subtotal").innerHTML = `<b>${carrito.articles[0].currency + " " + 0}`;
      document.getElementById("subtotalProducto").innerHTML = `${carrito.articles[0].currency + " " + 0}`;
    }
    return resultado;
  }
  
function costodeenvio(){
    let cantidad = document.getElementById("cantidad").value;
    let valor = cantidad * carrito.articles[0].unitCost;
    let costoEnvioStandard = ((valor / 100) * 5);
    let costoEnvioExpress = ((valor/100) * 7);
    let costoEnvioPremium = ((valor/100) * 15);
    let valorSubtotal = actualizaciondeProducto();
    let valorEnvioStandard = valorSubtotal + costoEnvioStandard;
    let valorEnvioExpress = valorSubtotal + costoEnvioExpress;
    let valorEnvioPremium = valorSubtotal + costoEnvioPremium;
    let envioStandard = document.getElementById("Standard").checked;
    let envioExpress = document.getElementById("Express").checked;
    let envioPremium = document.getElementById("Premium").checked;

    if(envioStandard){
    document.getElementById("valordeEnvio").innerHTML = `USD ${costoEnvioStandard}`;
    document.getElementById("valorTotal").innerHTML = `USD ${valorEnvioStandard}`;
    }
    if(envioExpress){
    document.getElementById("valordeEnvio").innerHTML = `USD ${costoEnvioExpress}`;
    document.getElementById("valorTotal").innerHTML = `USD ${valorEnvioExpress}`;
    }
    if(envioPremium){
    document.getElementById("valordeEnvio").innerHTML = `USD ${costoEnvioPremium}`;
    document.getElementById("valorTotal").innerHTML = `USD ${valorEnvioPremium}`;
    }
}



// Example starter JavaScript for disabling form submissions if there are invalid fields
function validacion(){
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            form.classList.add('was-validated')  
          } else {
            event.preventDefault();
            event.stopPropagation();
            finalizarCompra();
          }

        }, false)
        
      })
  })()

}

function eleccionCredito() {
    document.getElementById("numeroCredito").removeAttribute("disabled", "");
    document.getElementById("numeroCredito").setAttribute("required", "");
    document.getElementById("numeroCodigo").removeAttribute("disabled", "");
    document.getElementById("numeroCodigo").setAttribute("required", "");
    document.getElementById("vigenciaCredito").removeAttribute("disabled", "");
    document.getElementById("vigenciaCredito").setAttribute("required", "");
    document.getElementById("nCuentaBanco").setAttribute("disabled", "");
    document.getElementById("nCuentaBanco").removeAttribute("required", "");
    document.getElementById("nCuentaBanco").value = "";
    document.getElementById("Estado").innerHTML = `<p class='text-success'>Has seleccionado pagar mediante tarjeta de credito</p>`
  }

function eleccionBanco() {
    document.getElementById("numeroCredito").setAttribute("disabled", "");
    document.getElementById("numeroCredito").removeAttribute("required", "");
    document.getElementById("numeroCredito").value = "";
    document.getElementById("numeroCodigo").setAttribute("disabled", "");
    document.getElementById("numeroCodigo").removeAttribute("required", "");
    document.getElementById("numeroCodigo").value = "";
    document.getElementById("vigenciaCredito").setAttribute("disabled", "");
    document.getElementById("vigenciaCredito").removeAttribute("required", "");
    document.getElementById("vigenciaCredito").value = "";
    document.getElementById("nCuentaBanco").removeAttribute("disabled", "");
    document.getElementById("nCuentaBanco").setAttribute("required", "");
    document.getElementById("Estado").innerHTML = `<p class='text-success'>Has seleccionado pagar mediante transferencia bancaria</p>`
  }

function validarModal(){
  document.getElementById("finalizarCompra").addEventListener('click',function(){
    let numeroCredito = document.getElementById("numeroCredito");
    let numeroCodigo = document.getElementById("numeroCodigo");
    let vigenciaCredito = document.getElementById("vigenciaCredito");
    let nCuentaBanco = document.getElementById("nCuentaBanco");
    let arrayAValidar = [numeroCredito, numeroCodigo, vigenciaCredito, nCuentaBanco];

    for (let i = 0; i < arrayAValidar.length; i++) {
        const element = arrayAValidar[i];
        if(element.hasAttribute('disabled')){

        } else {
        if(element.checkValidity()){
            document.getElementById("modalspan").classList.add('d-none')
        } else {
            document.getElementById("modalspan").classList.remove('d-none')
        }
    }
        
    }

})
  document.getElementById("pagosModal").addEventListener('input',function(){
    let numeroCredito = document.getElementById("numeroCredito");
    let numeroCodigo = document.getElementById("numeroCodigo");
    let vigenciaCredito = document.getElementById("vigenciaCredito");
    let nCuentaBanco = document.getElementById("nCuentaBanco");
    let arrayAValidar = [numeroCredito, numeroCodigo, vigenciaCredito, nCuentaBanco];

    for (let i = 0; i < arrayAValidar.length; i++) {
        const element = arrayAValidar[i];

        if(element.hasAttribute('disabled')){

        } else {
        if(element.checkValidity()){
            document.getElementById("modalspan").classList.add('d-none')
        } else {
            document.getElementById("modalspan").classList.remove('d-none')
        }
    }
        
    }
})
}

function finalizarCompra(){
    document.getElementById("alert-success").classList.remove("d-none");
    setTimeout(redireccionar, 2000)
}

function redireccionar(){
    window.location.href = "home.html";
}