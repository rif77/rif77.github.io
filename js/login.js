function irasitio(){
    window.location.href = "home.html";
}

document.getElementById("Entrada").addEventListener("click", function(validacion){
    let mail = document.getElementById("correo").value ;
    let password = document.getElementById("contraseña").value ;
    console.log (mail + " " + password);

    if (mail == "" || password ==""){
        alert ("La informacion ingresada no es valida, intentelo de nuevo");
        validacion.preventDefault();
    }else{
        alert ("Acceso permitido. Bienvenido al sitio");
        irasitio();
        validacion.preventDefault();
    }
    localStorage.setItem("usuario", mail);
    localStorage.setItem("userID", "25801");

})