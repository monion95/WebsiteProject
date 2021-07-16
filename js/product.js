function generateProductPage(product){
    document.title = product.name;


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
            <span class=product-price>$${product.price}</span>
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

function updateTotalPrice(){
    var price = document.getElementsByClassName('product-price')[0]
    console.log(price)
}


window.addEventListener('load', async (event) => {
    const params = getQueryParameters();
    const product = await getProductById(params.id);
    const main = document.getElementsByTagName('main')[0];
    main.innerHTML = generateProductPage(product);
});