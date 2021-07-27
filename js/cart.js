class CartItem {
    constructor(quantity, product) {
        this.quantity = quantity;
        this.product = product;
    }
    
    get price(){
        return this.quantity * this.product.price;
    }
}
const cartItems = [
    new CartItem(1, switchGames[0]),
    new CartItem(2, ps4Games[0]),
    new CartItem(3, ps4Games[1]),
    new CartItem(4, ps5Games[0]),
];

const getTotalPrice = function(){
    let total = 0;
    for(const item of cartItems) {
        total += item.price;
    }
    return total;
}

const onQuantityChange = function(domElem, itemIndex){
    const item = cartItems[itemIndex];
    item.quantity = domElem.value;
    const itemPriceElem = domElem.parentNode.parentNode.querySelector('.cart-item-price');
    itemPriceElem.innerText = `$${item.price.toFixed(2)}`;
    
    const totalPriceElem = document.getElementById('totalPrice');
    totalPriceElem.innerText = `$${getTotalPrice().toFixed(2)}`
}

/*build html for one featured product*/
function buildCartItemHtml(item, itemIndex) {
    const { quantity, product } = item;

    return `
<tr>
    <td class="cart-item-head">
        <a href="${product.url}">
            <div class="cart-item-image">
                <img class="cart-item-image" src="${product.imageUrl}" alt="${product.name}">
            </div>
            <div class="cart-item-name">${product.name}</div>
        </a>
    </td>
    <td class="cart-item-price">$${item.price.toFixed(2)}</td>
    <td class="cart-item-quantity">
        <input type="number" value="${quantity}" min="1" onchange="onQuantityChange(this, ${itemIndex})">
    </td>
</tr>`;
}

/*build html for one featured group*/
function buildCartHtml(items) {
    let itemsHtml = "";
    for(let i = 0; i < items.length; ++i) {
        itemsHtml += buildCartItemHtml(items[i], i);
    }
    return `
<table id="cartContent">
    <colgroup>
        <col>
        <col>
        <col>
    </colgroup>
    <!--head-->
    <tr id="cartHeader">
        <th>Item</th>
        <th>price</th>
        <th>Quantity</th>
    </tr>
    ${itemsHtml}
    <tr>
        <td class="cart-item-head">Total</td>
        <td id="totalPrice" class="cart-item-price">$${getTotalPrice().toFixed(2)}</td>
        <td>
            <button id="cartCheckoutButton" class="primary-button">
                <img class="nav-icon" src="images/icons/cart-check.svg" alt="cart check">
                <span>Checkout</span>
            </button>
        </td>
    </tr>
</table>
`
}


/*set content of cart*/
window.addEventListener('load', () => {
    const cart = document.getElementById('cart');
    cart.innerHTML = buildCartHtml(cartItems);
});
