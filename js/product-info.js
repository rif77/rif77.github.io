let productInfo = [];
let productComments = [];

function showProduct (){

    let htmlContentToAppend = "";

    htmlContentToAppend +=`
    <h1><b>${productInfo.name} </b></h1> 
    <br></br>
    <p><b>Precio </b></h2>
    <p><b>${productInfo.currency}</b> ${productInfo.cost}</h2> 
    <p><b>Descripción </b></h2>
    <p>${productInfo.description}</p>
    <p><b>Categoria </b></h2>
    <p>${productInfo.category}</p>
    <p><b>Cantidad de vendidos </b></p>
    <p>${productInfo.soldCount}</p>
    <p><b>Imagenes Ilustrativas</b></p>

    <div id="carousel" class="carousel slide carousel-fade" data-bs-ride="carousel">
        <div class="carousel-inner" id="carrusel">
             </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
            </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
            </button>
    </div>
    `

    let imagestoappend = "";

    imagestoappend +=
    `<div class="carousel-item active">
    <img src="${(productInfo.images[0])}" class="d-block w-100">
    </div>
    `

    for (let i = 1; i < productInfo.images.length; i++) {
    imagestoappend += `
        <div class="carousel-item">
        <img src="${(productInfo.images[i])}" class="d-block w-100">
        </div>
        `
    }

    document.getElementById("product-info.container").innerHTML += htmlContentToAppend;
    document.getElementById("carrusel").innerHTML += imagestoappend
}

function estrellas(rating){
    rating = Math.round(rating * 2) / 2;
    let output = [];

    for (var i = rating; i >= 1; i--)
    output.push('<i class="fa fa-star" style="color: gold; text-shadow: 0 0 3px #000;"></i>&nbsp;');

    if (i == .5) output.push('<i class="fa fa-star-half-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');

    for (let i = (5 - rating); i >= 1; i--)
    output.push('<i class="fa fa-star" style="color: white; text-shadow: 0 0 3px #000;"></i>&nbsp;');

    return output.join('');

}

function showComments() {
    let comentariostoappend = "";
    
    comentariostoappend +=`
    <h2 class="mt-5"><b>Comentarios</b></h2>
    `

    for(let i = 0; i < productComments.length; i++){
            comentariostoappend += `
            <div class ="list-group-item">
                <div class="row"    >
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1"><b>${productComments[i].user}</b></h5>
                            <h5 class="mb-1" "align-self: right">${productComments[i].dateTime}</h5>
                            <h5 class="mb-1" "align-self: right">${estrellas(productComments[i].score)}</h5>
                            </div>
                        <p class="mb-1">${productComments[i].description}</p>
                    </div>
                </div>
            </div>
            `
        }
        document.getElementById("comentarios").innerHTML += comentariostoappend;
    }


async function cajadecomentarios(){
    let cajacomentarios = ""

    cajacomentarios +=`
    <h2 class="mt-5"><b>Comentar</b></h1>
      <label for="comentario"> Tu comentario:</label>
      <br>
      <textarea id="comentario" name="comment" class="d-flex w-50 justify-content-between"></textarea>
      <br>
        <label for="puntaje"> Tu puntuacion:</label>
        <br>
        <select name="score" id="puntaje" style="width:100px">
            <option value="Default">1</option>
            <option value="malo">2</option>
            <option value="decente">3</option>
         <option value="bueno">4</option>
            <option value="perfecto">5</option>
        </select>
      <br>
      <br>
    <label for="comentar"></label>    
    <input type="submit" class="button" value="Publicar Comentario">
    `
    document.getElementById("comentar").innerHTML += cajacomentarios;
}


function mostrarproductosrelacionados(productos){
    let productostoappend = "";

    for (let relacionados of productos) {
    productostoappend +=`
        <div class="row" onclick="MostrarNuevoProducto(${relacionados.id})">
            <div class="col-3">
                <img src="${relacionados.image}" class="img-thumbnail" style="cursor:pointer">
                <p>${relacionados.name}</p>
            </div>
        </div>
     `
    }

    document.getElementById("productos-relacionados").innerHTML +=productostoappend
}

function MostrarNuevoProducto(id){
    localStorage.setItem("productID",id)
    window.location = "product-info.html"
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            productInfo = resultObj.data
            showProduct()
            mostrarproductosrelacionados(productInfo.relatedProducts)
        }
    }
)
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultcoments){
        if(resultcoments.status === "ok"){
            productComments = resultcoments.data
            showComments()
        }
    })

    cajadecomentarios()
}
)
