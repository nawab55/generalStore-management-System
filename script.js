const url = "https://crudcrud.com/api/846a70e9ca014578961105127a153daf/saveItem";


// function addProduct(){
    
//     const name = document.getElementById("product-name").value;
//     const price = document.getElementById("product-price").value;
//     const quantity = document.getElementById("product-quantity").value;
//     // console.log(name, price, quantity);

//     const product = {
//         name,
//         price,
//         quantity
//     }
//     console.log(product);

//     axios.post(url, product)
//         .then((response) => {
//             displayInventory(response.data);
//             console.log(response);
//             // console.log(response.data);
//         })
//         .catch((err) => {
//             console.log(err);
//         })

// }

// function sellProduct(){

//     const sellProductName = document.getElementById("sell-product-name").value;
//     const sellQuantity = document.getElementById("sell-quantity").value;
    
//      // Fetch the product data from the server to get its current quantity
//     axios.get(`https://crudcrud.com/api/ec082b79b3794e57bfdbd4ab0d6caaa3/saveItem`)
//         .then((response) => {
//             console.log(response);
//             const products = response.data;   //response.data is an array of object
//             const productIndex = products.findIndex(product => product.name === sellProductName);
//             // console.log(products);
//             // console.log(productIndex);

//             const product = products[productIndex];

//             product.quantity -= sellQuantity;
//             // console.log(product.quantity);
//             // if (product.quantity < sellQuantity) {
//             //     console.log("Insufficient quantity.");
//             //     return;
//             // }else{
//             //     // Update the product's quantity
//             //     product.quantity -= sellQuantity;
//             // }
//             console.log(product);
//             console.log(product._id);
//             const productId = product._id;
//             delete product._id;
//             // Update the product on CRUD CRUD
//             axios.put(`https://crudcrud.com/api/ec082b79b3794e57bfdbd4ab0d6caaa3/saveItem/${productId }`, product)
//                 .then((response) => {
//                     console.log(response);
//                     console.log("Product sold successfully.");
//                     // displayInventory(product); // Update the display
//                 })
//                 .catch((err) => {
//                     console.log("Error updating product: " + err);
//                 });
//         })
//          .catch((err) => {
//             console.log("Error fetching product: " + err);
//          });
// }

async function addProduct(){
    try{
        const name = document.getElementById("product-name").value;
        const price = document.getElementById("product-price").value;
        const quantity = document.getElementById("product-quantity").value;
        // console.log(name, price, quantity);

        const product = {
            name,
            price,
            quantity
        }
        console.log(product);

        let postRes = await axios.post(url, product)
        console.log(postRes);
        displayInventory(postRes.data);
           
    }
    catch(err){
        console.log(err);
    }
}

async function sellProduct(){

    try{       
        const sellProductName = document.getElementById("sell-product-name").value;
        const sellQuantity = document.getElementById("sell-quantity").value;

        // Fetch the product data from the server to get its current quantity
        let res = await axios.get(url)
        const products = res.data;
        const productIndex = products.findIndex(product => product.name === sellProductName);
        // console.log(products);
        console.log(productIndex);

        const product = products[productIndex];
        product.quantity -= sellQuantity;

        console.log(product);
        console.log(product._id);
        let productId = product._id;
        delete product._id;

        // Update the product on CRUD CRUD
        let putRes = await axios.put(`${url}/${productId}`,product)
        console.log(putRes);
        
        let getRes = await axios.get(`${url}/${productId}`)
        console.log(getRes);
        displayInventory(getRes.data);

    }
    catch(err){
        console.log(err);
    }  

}

// read data from crudcrud when screen is refresh/reloaded
window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/846a70e9ca014578961105127a153daf/saveItem")
        .then((response)=>{
            // console.log(response);    //response.data is an array of object
            for(var i=0; i<response.data.length; i++){
                displayInventory(response.data[i]);
            }
        })
        .catch((err)=>{
            console.log(err);
        })
})


function displayInventory(data){

   
    console.log(data.name);
    // data = {
    //     _id,
    //     name,
    //     price,
    //     quantity
    // }

    const inventoryList = document.getElementById("inventory-list");
    const existingListItem = inventoryList.querySelector(`[data-id="${data._id}"]`);

    if (existingListItem) {
        existingListItem.textContent = `Name: ${data.name}, Price: $${data.price}, Quantity: ${data.quantity}`;
    } else {
        const listItem = document.createElement("li");
        listItem.textContent = `Name: ${data.name}, Price: $${data.price}, Quantity: ${data.quantity}`;
        listItem.setAttribute("data-id", data._id);
        inventoryList.appendChild(listItem);
    }
 

    // const inventoryList = document.getElementById("inventory-list");
    // const listItem = document.createElement("li");
    // listItem.textContent = `Name: ${data.name}, Price: $${data.price}, Quantity: ${data.quantity}`;
    // inventoryList.appendChild(listItem);

    // const inventoryList = document.getElementById("inventory-list");
    // // inventoryList.innerHTML = "";
    // childHTML = `<li id=${data._id}>Name: ${data.name}, Price: ${data.price}rs, Quantity: ${data.quantity} </li>`
    // inventoryList.innerHTML = inventoryList.innerHTML + childHTML;  

}