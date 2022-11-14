document.addEventListener("DOMContentLoaded", function(e){
  datosperfil();        
  miperfil();
  verificarperfil();
})
;

function datosperfil(){
  if(localStorage.getItem("PrimerNombre") === null){
    let PrimerNombre = localStorage.setItem("PrimerNombre"," ");
  }
  if(localStorage.getItem("SegundoNombre") === null){
    let PrimerNombre = localStorage.setItem("SegundoNombre"," ");
  }  if(localStorage.getItem("PrimerApellido") === null){
    let PrimerNombre = localStorage.setItem("PrimerApellido"," ");
  }  if(localStorage.getItem("SegundoApellido") === null){
    let PrimerNombre = localStorage.setItem("SegundoApellido"," ");
  }  if(localStorage.getItem("Telefono") === null){
    let PrimerNombre = localStorage.setItem("Telefono"," ");
  }
    let Email = localStorage.getItem("usuario");
}


function miperfil(){
    let perfiltoAppend = ""
   
    let PrimerNombre = localStorage.getItem("PrimerNombre");
    let SegundoNombre = localStorage.getItem("SegundoNombre");
    let PrimerApellido = localStorage.getItem("PrimerApellido");
    let SegundoApellido = localStorage.getItem("SegundoApellido");
    let Email = localStorage.getItem("usuario");
    let Telefono = localStorage.getItem("Telefono");
    

    if(localStorage.getItem("usuario") === null){

        document.getElementById(error.classList.remove('d-none'))
        document.getElementById(error2.classList.remove('d-none'))
    } else {

    perfiltoAppend = `

<h1 class="text-center mt-3 mb-5 fw-bold">Mi Perfil</h1>

<hr class="mt-3 mb-3"></hr>

<form class="row g-2 needs-validation" novalidate>
  <div class="col-md-6">
    <label for="PrimerNombre" class="form-label">Primer nombre</label>
    <input type="text" class="form-control" id="PrimerNombre" required value=${(PrimerNombre)}>
  </div>
  <div class="col-md-6">
    <label for="SegundoNombre" class="form-label">Segundo nombre</label>
    <input type="text" class="form-control" id="SegundoNombre" value=${SegundoNombre}>
  </div>
  <div class="col-md-6">
  <label for="PrimerApellido" class="form-label">Primer apellido</label>
  <input type="text" class="form-control" id="PrimerApellido" required value=${PrimerApellido}>
  </div>
  <div class="col-md-6">
  <label for="SegundoApellido" class="form-label">Segundo apellido</label>
  <input type="text" class="form-control" id="SegundoApellido" value=${SegundoApellido}>
  </div>
  <div class="col-md-6">
    <label for="Email" class="form-label">Email</label>
    <div class="input-group has-validation">
      <span class="input-group-text" id="inputGroupPrepend">@</span>
      <input type="email" class="form-control" id="Email" aria-describedby="inputGroupPrepend" required value=${Email}>
      <div class="invalid-feedback">
        Ingrese un email válido.
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <label for="Telefono" class="form-label">Telefono</label>
    <input type="tel" pattern="[0-9]{9}" class="form-control" id="Telefono" placeholder="099000000" required value=${Telefono}>
    <div class="invalid-feedback">
      Ingrese un numero correcto. 
    </div>
  </div>

  </div>
  <div class="col-12 mt-3">
    <button class="btn btn-primary" type="submit">Guardar Cambios</button>
  </div>
</form>
`
document.getElementById("perfil").innerHTML += perfiltoAppend

}

}

function verificarperfil(){
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
              } else {
              actualizardatos()
            }
            
            form.classList.add('was-validated')
            }, false)
          })
      })()
    }

    function actualizardatos(){
        localStorage.setItem("PrimerNombre", document.getElementById("PrimerNombre").value);
        localStorage.setItem("SegundoNombre", document.getElementById("SegundoNombre").value);
        localStorage.setItem("PrimerApellido", document.getElementById("PrimerApellido").value);
        localStorage.setItem("SegundoApellido", document.getElementById("SegundoApellido").value);
        localStorage.setItem("usuario", document.getElementById("Email").value);
        localStorage.setItem("Telefono", document.getElementById("Telefono").value);
    }