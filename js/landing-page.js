import { getFeaturedProducts } from '/js/api.js'
const main = document.getElementsByTagName('main')[0];

function getProductUrl(product) {
    return `/products.html?id=${product.id}`;
}

function buildProductCard(product) {
    return `<div class="featured-item">
<a href="${getProductUrl(product)}">
    <img class="featured-item-image" src="${product.imageUrl}" alt="${product.name}">
    <p class="featured-item-title">${product.name}</p>
</a>
<button class="primary-button">
    <img class="nav-icon" src="images/icons/cart-plus.svg" alt="Add to cart">
    <span class="featured-item-price">$${product.price}</span>
</button>
</div>`;
}

function buildFeaturedGroup(featuredGroup) {
    let items = "";
    for(const p of featuredGroup.items) {
        items += buildProductCard(p);
    }
    return `<section class="featured-group">
    <h1 class="featured-group-title">${featuredGroup.title}</h1>
    <div class="featured-group-content">
        ${items}
    </div>
</section>
`
}

function buildFeaturedProducts(featuredProducts) {
    let groups = "";
    for(const group of featuredProducts.featuredGroups) {
        groups += buildFeaturedGroup(group);
    }
    
    let bannerUrl;
    let bannerImageAlt;
    if (featuredProducts.banner.product) {
        bannerUrl = getProductUrl(featuredProducts.banner.product);
        bannerImageAlt = featuredProducts.banner.product.name;
    } else {
        bannerUrl = "/";
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

window.addEventListener('load', async (event) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    main.innerHTML = buildFeaturedProducts(await getFeaturedProducts(params.category));
});
