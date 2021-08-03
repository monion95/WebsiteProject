function getProductPageUrl(product) {
  return `product.html?id=${product.id}`;
}

/*get featured products of a given product platform*/
async function getFeaturedProducts(platform) {
  const resp = await fetch(`api/featured.php${platform?`?platform=${platform}`:''}`);
  const result = await resp.json();
  console.log(result);
  return result;
 // return resp.json();
}

function toStarRating(numberRating) {
    return "★★★★★☆☆☆☆☆".slice(5 - numberRating, 10 - numberRating);
}

/*get product detail by id*/
async function getProductById(id) {
  const resp = await fetch(`api/product.php?id=${id}`);
  return resp.json();
}

/*search products with filters and sort order*/
async function search(query) {
  const resp = await fetch('api/search.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(query)
  });
  return resp.json();
}

//sort products according to given order
async function sortprducts(productFiltered,sortby){
    if (sortby =="priceAsc"){
        productFiltered.sort((a,b) => {return a.price - b.price});
    }
    else if (sortby =="priceDes"){
        productFiltered.sort((a,b) => {return b.price - a.price});
    }
    else if (sortby =="alpAsc"){
        productFiltered.sort((a,b) => a.name.localeCompare(b.name));
    }
    else if (sortby =="alpDes"){
        productFiltered.sort((a,b) => a.name.localeCompare(b.name)).reverse();
    }
    else if (sortby =="ratingDes"){
        productFiltered.sort((a,b) => {return b.rating - a.rating});
    }
    return productFiltered
}

/*get query parameters of current page url*/
function getQueryParameters() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return Object.fromEntries(urlSearchParams.entries());
}

/*update search url when search text changed*/
window.addEventListener('load', (event) => {
    const quickSearch = document.getElementById('quickSearch');
    if (!quickSearch) {
        return;
    }
    
    const params = getQueryParameters();
    if (params.q) {
        quickSearch.value = params.q;
    }
    
    const quickSearchLink = document.getElementById('quickSearchLink');
    if (quickSearchLink) {
        quickSearch.addEventListener('change', (event) => {
            quickSearchLink.href = `search.html?q=${quickSearch.value}`;
        });
        
        quickSearch.addEventListener("keyup", (event) => {
            if (event.key === "Enter"){
                quickSearchLink.click();
            }
        });
    }
});

