fetch('https://fakestoreapi.com/products/categories')
  .then((res) => res.json())
  .then((categories) => {
    console.log(categories);

    const listGroup = document.querySelector('.list-group');

    categories.forEach((cat) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'list-group-item list-group-item-action';
      button.textContent = cat; 

      button.addEventListener('click', () => fetchCategory(cat) );

      listGroup.appendChild(button);
    });
  })
  .catch((error) => console.error('Error fetching data:', error));

function fetchCategory(categoryName) {
    API_URL=`https://fakestoreapi.com/products`
    if(categoryName){
        API_URL+=`/category/${categoryName}`
    }
  fetch(API_URL)
    .then((res) => res.json())
    .then((products) => {


      const productList = document.getElementById("product-list");
      productList.innerHTML = "";
        products.forEach((product) =>{
          
            const productitem=document.createElement("div");
            productitem.className = "card col-3 m-2";
            productitem.style.width = "18rem";
            productitem.innerHTML = `     
             <img src="${product.image} " class="card-img-top img-fluid " alt="...">
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                 <ul class="list-group list-group-flush">
                    <li class="list-group-item">${product.category}</li>
                    <li class="list-group-item">${product.price}$</li>
                </ul>
                  <button onClick="SingleProduct(${product.id})" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Watch Now</button>
            </div>
            `
            productList.appendChild(productitem);
        })

    })
    .catch((error) => console.error('Error fetching category products:', error));
}
fetchCategory()



async function SingleProduct(id){
    
    try {

        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        
        const products = await response.json();

        console.log("Single Products fetched from API:", products);

        const productList = document.getElementById("model3");

        productList.innerHTML = "";
            
            const productItem = document.createElement("div");
            productItem.className = "card mb-3 p-2";
            productItem.style.width = "100%";
            productItem.innerHTML = `
            
              <div class="row g-0">
            <div class="col-md-4">
              <img src="${products.image}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${products.title}</h5>
                   <div class="d-flex justify-content-between">
                <p class="card-text fs-4 text-bold">${products.price}$</p>
                <p class="me-3 fs-6">In Stock: ${products.rating.count} </p>
                </div>
                <div class="d-flex justify-content-between">
                    <p class=" fs-6">Category: ${products.category} </p>
                    <p class="me-3 fs-6">Rating: ${products.rating.rate}/5 </p>
                    
                </div>
                <p class="card-text">${products.description} </p>
                <p class="card-text"><small class="text-body-secondary">Last updated 3 hr ago</small></p>
              </div>
            </div>
          </div>
       
        `

            productList.appendChild(productItem);
       

}
catch (error) {
    console.error("Error fetching products:", error);
}
}