var currentCategoriesArray = [];

function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.products.length; i++){
        let Autos = currentCategoriesArray.products[i];
            htmlContentToAppend += `
            <div onclick="setCatID(${Autos.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${Autos.image}" alt="${Autos.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${Autos.name}</h4>
                            <small class="text-muted">${Autos.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${Autos.description}</p>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("cat-list-container").innerHTML += htmlContentToAppend;
    }


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL+101+".json").then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCategoriesArray = resultObj.data
            showCategoriesList()
            console.log(currentCategoriesArray)
        }
    }
)}
)