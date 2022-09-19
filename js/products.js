let currentProductsList = [];

function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsList.products.length; i++){
        let products = currentProductsList.products[i];
          
        if (((minPrice == undefined) || (minPrice != undefined && products.cost >= minPrice)) &&
        ((maxPrice == undefined) || (maxPrice != undefined && products.cost <= maxPrice))){
            htmlContentToAppend += `
            <div onclick="setProductID(${products.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${products.image}" alt="${products.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${products.name + " - " + products.currency + products.cost}</h4>
                            <small class="text-muted">${products.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${products.description}</p>
                    </div>
                </div>
            </div>
            `
        }
    }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductsList = resultObj.data
            showProductsList()
        }
    }
)}
)

  document.getElementById("sortAsc").addEventListener("click", function(){
    ordenayMuestraProducts("sortAsc");
});

document.getElementById("sortDesc").addEventListener("click", function(){
    ordenayMuestraProducts("sortDesc");
});

document.getElementById("sortByCount").addEventListener("click", function(){
    ordenayMuestraProducts("sortByCount");
});

document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";
    minPrice = undefined;
    maxPrice = undefined;
    showProductsList();
});

document.getElementById("rangeFilterCount").addEventListener("click", function(){
    minPrice = document.getElementById("rangeFilterCountMin").value;
    maxPrice = document.getElementById("rangeFilterCountMax").value;

    if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
        minPrice = parseInt(minPrice);
    }
    else{
        minPrice = undefined;
    }

    if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
        maxPrice = parseInt(maxPrice);
    }
    else{
        maxPrice = undefined;
    }

    showProductsList();
});
;

let minPrice= undefined;
let maxPrice= undefined;

function ordenayMuestraProducts(condicion){
if (condicion === "sortDesc")
{
    currentProductsList.products.sort(function(a, b) {
        if ( a.cost< b.cost ){ return -1; }
        if ( a.cost > b.cost ){ return 1; }
        return 0;
    });
}else if (condicion === "sortAsc"){
    currentProductsList.products.sort(function(a, b) {
        if ( a.cost > b.cost ){ return -1; }
        if ( a.cost < b.cost ){ return 1; }
        return 0;
    });
}else if (condicion === "sortByCount"){
    currentProductsList.products.sort(function(a, b) {
        if ( a.soldCount > b.soldCount ){ return -1; }
        if ( a.soldCount < b.soldCount ){ return 1; }
        return 0;
    });
}

showProductsList();
}

function setProductID(id){
    localStorage.setItem("productID",id)
    window.location = "product-info.html"
}