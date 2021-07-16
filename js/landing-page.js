/*build html for one featured product*/
function buildFeaturedItem(product) {
    return `
<div class="featured-item">
    <div class="featured-item-body">
        <a href="${product.url}">
            <img class="featured-item-image" src="${product.imageUrl}" alt="${product.name}">
            <div class="featured-item-title">${product.name}</div>
        </a>
        <div class="product-rating">${toStarRating(product.rating)}</div>
    </div>
    <button class="primary-button">
        <img class="nav-icon" src="images/icons/cart-plus.svg" alt="Add to cart">
        <span class="featured-item-price">$${product.price}</span>
    </button>
</div>`;
}

/*build html for one featured group*/
function buildFeaturedGroup(featuredGroup) {
    let items = "";
    for(const p of featuredGroup.items) {
        items += buildFeaturedItem(p);
    }
    return `<section class="featured-group">
    <h1 class="featured-group-title">${featuredGroup.title}</h1>
    <div class="featured-group-content">
        ${items}
    </div>
</section>
`
}

/*build html for all featured products of current page*/
function buildFeaturedProducts(featuredProducts) {
    let groups = "";
    for(const group of featuredProducts.featuredGroups) {
        groups += buildFeaturedGroup(group);
    }
    
    let bannerUrl;
    let bannerImageAlt;
    if (featuredProducts.banner.product) {
        bannerUrl = featuredProducts.banner.product.url;
        bannerImageAlt = featuredProducts.banner.product.name;
    } else {
        bannerUrl = "";
        bannerImageAlt = "banner";
    }
    
    return `<div id="banner">
    <a href="${bannerUrl}">
        <img class="banner-image" src="${featuredProducts.banner.bannerimageUrl}" alt="${bannerImageAlt}">
    </a>
</div>
<div id="featured">
    ${groups}
</div>`;
}

/*set content of the main element after page load*/
window.addEventListener('load', async (event) => {
    const params = getQueryParameters();
    const main = document.getElementsByTagName('main')[0];
    main.innerHTML = buildFeaturedProducts(await getFeaturedProducts(params.platform));
});
