var filters={
    platform:"nofilter",
    price:"nofilter",
    category:"nofilter",
    rating:"nofilter"
}

let products 
window.addEventListener('load', async (event) => {
    const params = getQueryParameters();
    const searchKeyWord = params.q;

    products = await search(searchKeyWord,filters)
    let searchResult = document.getElementById('search-Result');
    searchResult.innerHTML = BuildResultItems(products);
    const filterArea = (document.getElementsByClassName("filters"))
    filterArea[0].addEventListener("click",async function(){
        filters.platform=document.querySelector('input[name="Platform"]:checked').value;
        filters.price=document.querySelector('input[name="Price"]:checked').value;
        filters.category=document.querySelector('input[name="Category"]:checked').value;
        filters.rating=document.querySelector('input[name="Rating"]:checked').value;
        console.log(filters)
        await loadSearchResult(searchKeyWord,filters)
        // products = await search(searchKeyWord,filters)
        // searchResult = document.getElementById('search-Result');
        // console.log(products)
        // searchResult.innerHTML = BuildResultItems(products);
    })
});
async function loadSearchResult(searchKeyWord,filters){
    products =await search(searchKeyWord,filters)
    searchResult = document.getElementById('search-Result')
    console.log(products)
    searchResult.innerHTML = BuildResultItems(products)
}

function BuildResultItems(products){
    let resultItems = "";
    for (const p of products) {
        resultItems += BuildResultItem(p);       
    }
    return resultItems
}


// for (const filterElement of filterElements)
// filterElement.addEventListener('click',(event)=>{
//     alert('haha')
// })

function BuildResultItem(product){
    // document.title = product.name;
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
//todo filter click event: change filters value and refresh result
//todo add sort click event: 1 change icon 2 refresh result order
//todo price change according to quantity
// $("input[type='radio'][name='rate']:checked").val();