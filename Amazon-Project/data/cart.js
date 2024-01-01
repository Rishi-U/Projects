export let cart = JSON.parse(localStorage.getItem("cart"))


if (!cart) {

    cart = [{
        productId:"58b4fc92-e98c-42aa-8c55-b6b79996769a",
        quatity:3
    }, {
        productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quatity:1
    }
    ];  
}

function saveCart() {
    localStorage.setItem("cart",JSON.stringify(cart));
}

export function addToCart(productid) {

    let matchingItem 

    cart.forEach((item) => {
        if(item.productId === productid) {
            matchingItem = item;
        }
    })

    if(matchingItem) {
        matchingItem.quatity +=1;
    } else {
        cart.push({
            /* productName: productname, */
            productId: productid,
            quatity: 1
        })
    }

    saveCart()
}

export function removeCart(productid) {
    let newcart = []

    cart.forEach((item) => {
        if (item.productId !== productid) {
            newcart.push(item);
        }
    })
    cart = newcart;

    saveCart()
    updateCheckbox ()
}

export function updateCheckbox () {
    let checkoutItem = cart.length;

    document.querySelector(".js-checkout-item").innerHTML = ` ${checkoutItem}`
}

updateCheckbox ()