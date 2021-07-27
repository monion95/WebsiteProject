function generateProductPage(product){
    //get product name from api
    document.title = product.name;

    //generating web page
    return`
    <section class="product">
        <div class="product-texts">
            <div class="product-title">
                <h1>${product.name}</h1>
            </div>
            <div class="Rating">
                <h1>RATING:${toStarRating(product.rating)}</h1>
            </div>
        </div>
        <div class="maininfo">
            <div class=product-image>
                <img src="${product.imageUrl}" alt="${product.name}">
            </div>
            <span id=product-price>$${product.price}</span>
            <form>
                <label for="quantity" id=quantityLabel>Quantity</label>
                <input type="number" id="quantity" name="quantity" value="1" min="1" max="5">
            </form>
            <button type="button" id="addToCart" onclick="alert('item added')">Add to Cart</button>
            <div class=product-description>
                <h1>Description</h1>
                <p>${product.description}</p>
            </div>
        </div>
    </section>
    `
}





// eventlistenner, load functions when page is loaded
window.addEventListener('load', async (event) => {

    //declarations
    const params = getQueryParameters();
    const product = await getProductById(params.id);
    const main = document.getElementsByTagName('main')[0];

    //call generateProductPage to generate dynamic web content
    main.innerHTML = generateProductPage(product);

    //create eventlistener for quantity
    document.getElementById("quantity").addEventListener("change", updateTotalPrice);

    //update price when change quantity
    function updateTotalPrice(){
        var quantity  = document.getElementById("quantity").value;
        document.getElementById("product-price").textContent = "$"+ (quantity * product.price).toFixed(2);
       
    }
});

