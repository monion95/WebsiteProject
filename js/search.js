// here gives initial value for filters and sortby
let filters={
    platform:"nofilter",
    price:"nofilter",
    category:"nofilter",
    rating:"nofilter"
}
let sortby = "priceAsc"

window.addEventListener('load', async (event) => {
    const params = getQueryParameters();
    const searchKeyWord = params.q;
    products =await search(searchKeyWord,filters,sortby)  
    await loadSearchResult(products)

    //add listener to filter, when user click, update filter
    const filterArea = (document.getElementsByClassName("filters"))
    filterArea[0].addEventListener("click",async function(){
        filters.platform=document.querySelector('input[name="Platform"]:checked').value;
        filters.price=document.querySelector('input[name="Price"]:checked').value;
        filters.category=document.querySelector('input[name="Category"]:checked').value;
        filters.rating=document.querySelector('input[name="Rating"]:checked').value;
        products =await search(searchKeyWord,filters,sortby)  
        await loadSearchResult(products)
    })

    //add listener for sortby, when sort order change, update order of product
    const sortbybox = document.getElementById("sortby")
    sortbybox.addEventListener("change",async function(){
        sortby =sortbybox.value;
        products = await sortprducts(products,sortby)
        await loadSearchResult(products)
    })
});
//this function reload current search result to page
async function loadSearchResult(products){
    searchResult = document.getElementById('search-Result')
    searchResult.innerHTML = BuildResultItems(products)
}

//this function build items then load to searchResult area of the page
function BuildResultItems(products){
    let resultItems = "";
    for (const p of products) {
        resultItems += BuildResultItem(p);       
    }
    return resultItems
}


//this function build a single product item code.
function BuildResultItem(product){
    return`
    <div class=result-item>
    <div class=product-image>
        <a href="${product.url}">
            <img src="${product.imageUrl}" alt="${product.name}" >
        </a>
    </div>
    <div class=product-info>
        <h2>${product.name}</h2>
        <p>${product.platform}, ${toStarRating(product.rating)}</p>
        <label for="quantity1" id = quantityLabel1>Quantity</label>
        <input type="number" id="quantity1" name="quantity" value = "1" min="1" max="5">
    </div>
    <div>
        <button class="primary-button">
            <img class="nav-icon" src="images/icons/cart-plus.svg" alt="Add to cart">
            <span class="featured-item-price">${product.price}</span>
        </button>
    </div>
    </div>
    `
}
