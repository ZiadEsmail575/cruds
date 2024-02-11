

var emptyArrayToPush = [];


var ProductName = document.getElementById("ProductName");
var ProductPrice = document.getElementById("ProductPrice");
var ProductModel = document.getElementById("ProductModel");
var ProductDescription = document.getElementById("ProductDescription");



var addProductsbtn = document.getElementById("addProductsbtn");
var UpdateProductsbtn = document.getElementById("UpdateProductsbtn");



var id = emptyArrayToPush.length;
var temp ;



function setLocalStorage(setter) {
    localStorage.setItem("product", JSON.stringify(setter));
}


function getLocalStorage() {
    emptyArrayToPush = JSON.parse(localStorage.getItem("product"));
}


if (localStorage.getItem("product") == null) {
    emptyArrayToPush = [];
} else {
    getLocalStorage();
    displayProducts(emptyArrayToPush);
};

// ?add products obj into array contaier (emptyarraytopush)........

function addProducts() {

 

    var productsData = {
        name: ProductName.value,
        price: ProductPrice.value,
        model: ProductModel.value,
        desc: ProductDescription.value,
        id: id++
    };
  
    emptyArrayToPush.push(productsData);



    displayProducts(emptyArrayToPush);


    setLocalStorage(emptyArrayToPush);


    clearForm();
};


function displayProducts(products) {
    var container = ``;
    for (var i = 0; i < products.length; i++) {
        container += ` 
    <td>${i + 1}</td>
    <td>${products[i].newName ? products[i].newName : products[i].name}</td>
    <td>${products[i].price}</td>
    <td>${products[i].model}</td>
    <td>${products[i].desc}</td>
    <td><button onclick = showUpdateProducts(${products[i].id}) class="btn btn-outline-warning btn-sm">Updata</button></td>
    <td><button onclick="deleteitems(${products[i].id})" class="btn btn-outline-danger btn-sm">Delete</button></td>
</tr>`;

    };
    document.getElementById("tableBody").innerHTML = container;

};

function deleteitems(index) {
    for (var i = 0; i < emptyArrayToPush.length; i++) {
        if (emptyArrayToPush[i].id === index) {
emptyArrayToPush.splice(emptyArrayToPush[i],1);
setLocalStorage(emptyArrayToPush);
displayProducts(emptyArrayToPush);
        };
    };
};


function searchByName(term) {
    var searcArray = [];
    for (var i = 0 ; i < emptyArrayToPush.length ; i++) {
        if (emptyArrayToPush[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
            emptyArrayToPush[i].newName = emptyArrayToPush[i].name.replace(term.toLowerCase(), `<span class="text-danger">${term}</span>`);
            searcArray.push(emptyArrayToPush[i]);
        };
    };
    displayProducts(searcArray);
};


function showUpdateProducts(newitem) {
    addProductsbtn.classList.replace("d-block","d-none");
    UpdateProductsbtn.classList.replace("d-none", "d-block");
    for (var i = 0; i < emptyArrayToPush.length; i++) {
        if (emptyArrayToPush[i].id === newitem) {
            temp = emptyArrayToPush[i];
            clearForm(temp);
        };
    };
};
function clearForm(data) {
    ProductPrice.value = data ? data.price : "";
    ProductName.value = data ? data.name : "";
    ProductModel.value = data ? data.model : "";
    ProductDescription.value = data ? data.desc : "";
};

function reUpdate() {
    addProductsbtn.classList.replace("d-none","d-block");
    UpdateProductsbtn.classList.replace("d-block", "d-none");
    
    var productsData = {
        name: ProductName.value,
        price: ProductPrice.value,
        model: ProductModel.value,
        desc: ProductDescription.value
    };
    emptyArrayToPush.splice(emptyArrayToPush.indexOf(temp), 1, productsData);
displayProducts(emptyArrayToPush);
setLocalStorage(emptyArrayToPush);
clearForm();
    
}
