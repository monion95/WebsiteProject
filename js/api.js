const switchGames = [
    {
        name: "Mario Kart 8 Deluxe",
        price: 79.99,
        platform: "Switch",
        imageUrl: "images/switch/mk8.jpg",
        category: 'sports',
        id: 1,
        rating: 3
    },
    {
        name: "Super Mario Odyssey",
        price: 59.99,
        platform: "Switch",
        imageUrl: "images/switch/modyssey.jpg",
        category: 'sports',
        id: 2,
        rating: 4
    },
    {
        name: "Pokémon Sword",
        price: 79.99,
        platform: "Switch",
        imageUrl: "images/switch/PokemonS.jpg",
        category: 'rpg',
        id: 3,
        rating: 4.5
    },
    {
        name: "The Legend of Zelda?: Breath of the Wild",
        price: 39.99,
        platform: "Switch",
        imageUrl: "images/switch/zelda.jpg",
        category: 'adventure',
        id: 4,
        rating: 5
    }
];

const ps4Games = [
    {
        name: "NBA 2K21",
        price: 79.99,
        platform: "PS4",
        imageUrl: "images/ps4/2k21.jpg",
        category: 'rpg',
        id: 5,
        rating: 3.5
    },
    {
        name: "Avengers",
        price: 59.99,
        platform: "PS4",
        imageUrl: "images/ps4/Avengers.jpg",
        category: 'sports',
        id: 6,
        rating: 5
    },
    {
        name: "Cyberpunk 2077",
        price: 39.99,
        platform: "PS4",
        imageUrl: "images/ps4/Cyberpunk.jpg",
        category: 'action',
        id: 7,
        rating: 3
    },
    {
        name: "Final Fantasy VII",
        price: 59.99,
        platform: "PS4",
        imageUrl: "images/ps4/FFvii.jpg",
        category: 'sports',
        id: 8,
        rating: 5
    },
    {
        name: "FIFA 21",
        price: 39.99,
        platform: "PS4",
        imageUrl: "images/ps4/Fifa21.jpg",
        category: 'action',
        id: 9,
        rating: 3.5
    },
    {
        name: "Need for Speed? Heat",
        price: 79.99,
        platform: "PS4",
        imageUrl: "images/ps4/nfs.jpg",
        category: 'strategy',
        id: 10,
        rating: 3.5
    },
    {
        name: "NHL 21",
        price: 59.99,
        platform: "PS4",
        imageUrl: "images/ps4/nhl21.jpg",
        category: 'adventure',
        id: 11,
        rating: 4
    }
];

const ps5Games = [
    {
        name: "Battlefield 2042",
        price: 19.99,
        platform: "PS5",
        imageUrl: "images/ps5/bf2042.jpg",
        category: 'strategy',
        id: 12,
        rating: 4.5
    },
    {
        name: "Dying Light 2",
        price: 19.99,
        platform: "PS5",
        imageUrl: "images/ps5/dyinglight2.jpg",
        category: 'sports',
        id: 13,
        rating: 3.5
    },
    {
        name: "RiMS Racing",
        price: 79.99,
        platform: "PS5",
        imageUrl: "images/ps5/rims.jpg",
        category: 'action',
        id: 14,
        rating: 5
    },
    {
        name: "SGW Contracts 2",
        price: 59.99,
        platform: "PS5",
        imageUrl: "images/ps5/sniper2.jpg",
        category: 'action',
        id: 15,
        rating: 4.5
    },
    {
        name: "WRC 10",
        price: 79.99,
        platform: "PS5",
        imageUrl: "images/ps5/wrc10.jpg",
        category: 'adventure',
        id: 16,
        rating: 4.5
    }
];

const idToProduct = new Map();

const allProducts = [];

/*add products to idToProduct and allProducts*/
function registerProducts(prods) {
    for (const p of prods) {
        idToProduct.set(p.id, p);
        p.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At varius vel pharetra vel. Magna etiam tempor orci eu lobortis elementum nibh tellus molestie. Lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci. A iaculis at erat pellentesque adipiscing commodo elit at imperdiet. Habitant morbi tristique senectus et netus et malesuada fames. In cursus turpis massa tincidunt dui ut ornare lectus. Nec ullamcorper sit amet risus nullam eget felis eget nunc. Et leo duis ut diam quam nulla porttitor. Tristique senectus et netus et. Pretium nibh ipsum consequat nisl vel. Consequat id porta nibh venenatis cras sed felis.";
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

/*get product detail by id*/
async function getProductById(id) {
    return idToProduct.get(Number(id));
}

/*search products*/
async function search(keywords, filters) {
    return [switchGames[0], ps4Games[0], ps5Games[0], consoles[0]];
}

/*get the url to the product page of a product*/
function getProductUrl(product) {
    return `product.html?id=${product.id}`;
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
            quickSearchLink.href = `SearchResultpage.html?q=${quickSearch.value}`;
        });
    }
});

