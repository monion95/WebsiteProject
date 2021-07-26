const DEFAULT_PRODUCT_DESCRIPTION = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At varius vel pharetra vel. Magna etiam tempor orci eu lobortis elementum nibh tellus molestie. Lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci. A iaculis at erat pellentesque adipiscing commodo elit at imperdiet. Habitant morbi tristique senectus et netus et malesuada fames. In cursus turpis massa tincidunt dui ut ornare lectus. Nec ullamcorper sit amet risus nullam eget felis eget nunc. Et leo duis ut diam quam nulla porttitor. Tristique senectus et netus et. Pretium nibh ipsum consequat nisl vel. Consequat id porta nibh venenatis cras sed felis.";

class Product {
    constructor(id, name, price, platform, imageUrl, category, rating, description = DEFAULT_PRODUCT_DESCRIPTION) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.platform = platform;
        this.imageUrl = imageUrl;
        this.category = category;
        this.rating = rating;
        this.description = description;
    }
    
    /*get the url to the page of the product*/
    get url() {
        return `product.html?id=${this.id}`;
    }
    
}
const switchGames = [
    new Product(1, "Mario Kart 8 Deluxe", 79.99, "Switch", "images/switch/mk8.jpg", "sports", 3),
    new Product(2, "Super Mario Odyssey", 59.99, "Switch", "images/switch/modyssey.jpg", "sports", 4),
    new Product(3, "Pokémon Sword", 79.99, "Switch", "images/switch/PokemonS.jpg", "rpg", 4),
    new Product(4, "The Legend of Zelda™: Breath of the Wild", 39.99, "Switch", "images/switch/zelda.jpg", "action", 5)
];

const ps4Games = [
    new Product(5, "NBA 2K21", 79.99, "PS4", "images/ps4/2k21.jpg", "sports", 3),
    new Product(6, "Avengers", 59.99, "PS4", "images/ps4/Avengers.jpg", "rpg", 5),
    new Product(7, "Cyberpunk 2077", 39.99, "PS4", "images/ps4/Cyberpunk.jpg", "rpg", 3),
    new Product(8, "Final Fantasy VII", 59.99, "PS4", "images/ps4/FFvii.jpg", "sports", 5),
    new Product(9, "FIFA 21", 39.99, "PS4", "images/ps4/Fifa21.jpg", "sports", 3),
    new Product(10, "Need for Speed™ Heat", 79.99, "PS4", "images/ps4/nfs.jpg", "strategy", 3),
    new Product(11, "NHL 21", 59.99, "PS4", "images/ps4/nhl21.jpg", "adventure", 4)
];

const ps5Games = [
    new Product(12, "Battlefield 2042", 19.99, "PS5", "images/ps5/bf2042.jpg", "strategy", 4),
    new Product(13, "Dying Light 2", 19.99, "PS5", "images/ps5/dyinglight2.jpg", "sports", 3),
    new Product(14, "RiMS Racing", 79.99, "PS5", "images/ps5/rims.jpg", "action", 5),
    new Product(15, "SGW Contracts 2", 59.99, "PS5", "images/ps5/sniper2.jpg", "action", 4),
    new Product(16, "WRC 10", 79.99, "PS5", "images/ps5/wrc10.jpg", "adventure", 4)
];

const idToProduct = new Map();

const allProducts = [];

/*add products to idToProduct and allProducts*/
function registerProducts(prods) {
    for (const p of prods) {
        idToProduct.set(p.id, p);
        allProducts.push(p);
    }
}

registerProducts(switchGames);
registerProducts(ps4Games);
registerProducts(ps5Games);

/*get featured products of a given product platform*/
async function getFeaturedProducts(platform) {
    
    switch(platform) {
        case 'ps4':
            return {
                banner: {
                    bannerimageUrl: "images/banners/digital.jpg",
                },
                featuredGroups: [
                    {
                        title: "PS4 Games",
                        items: ps4Games
                    }
                ]
            };
        case 'ps5':
            return {
                banner: {
                    bannerimageUrl: "images/banners/digital.jpg",
                },
                featuredGroups: [
                    {
                        title: "PS5 Games",
                        items: ps5Games
                    }
                ]
            };
        case 'switch':
            return {
                banner: {
                    bannerimageUrl: "images/banners/digital.jpg",
                },
                featuredGroups: [
                    {
                        title: "Switch Games",
                        items: switchGames
                    }
                ]
            };
        default:
            return {
                banner: {
                    product: ps5Games[0],
                    bannerimageUrl: "images/banners/battle-field.jpg",
                },
                featuredGroups: [
                    {
                        title: "PS4 Best Sellers",
                        items: ps4Games.slice(0, 3)
                    },
                    {
                        title: "PS5 Best Sellers",
                        items: ps5Games.slice(0, 3)
                    },
                    {
                        title: "Switch Best Sellers",
                        items: switchGames.slice(0, 3)
                    }
                ]
            };
    }
}

function toStarRating(numberRating) {
    return "★★★★★☆☆☆☆☆".slice(5 - numberRating, 10 - numberRating);
}

/*get product detail by id*/
async function getProductById(id) {
    return idToProduct.get(Number(id));
}

/*search products with filters and sort order*/
async function search(keywords, filters, sortby) {
    return allProducts.filter((item) => {
        //search according to keyword
        if (keywords && !item.name.toUpperCase().includes(keywords.toUpperCase())){
            return false;
        }
        
        // filter by platform
        if (filters.platform !== 'nofilter' && item.platform !== filters.platform) {
            return false;
        }
        
        // filter by price
        if (filters.price !== 'nofilter') {
            const min = parseFloat(filters.price);
            const max = min + 30;
            if(item.price < min || item.price >= max){
                return false;
            }
        }
        
        // filter by category
        if (filters.category !== 'nofilter' && item.category !== filters.category) {
            return false;
        }

        // filter by rating
        return filters.rating === 'nofilter' || item.rating >= filters.rating;
    });
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
    }
});

