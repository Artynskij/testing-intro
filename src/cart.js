function notImplemented() {
    throw new Error("Корзина ещё не реализована. Сначала прочитайте тесты.");
}

function addToCart(cart, product, quantity = 1) {
    if (quantity < 1) throw new RangeError("quantity must be at least 1");
    if (quantity > product.stock) {
        throw new RangeError("not enough stock");
    }
    const foundProduct = cart.find((p) => p.id === product.id);

    if (foundProduct) {
        return cart.map((p) => {
            if (p.id !== product.id) return p;
            const updated = { ...p, quantity: p.quantity + quantity };
            if (updated.quantity > updated.stock) {
                throw new RangeError("not enough stock");
            }
            return updated;
        });
    }

    return [...cart, { ...product, quantity }];
}
function changeQuantity(cart, idProduct, newQuantity) {
    const foundProduct = cart.find((p) => p.id === idProduct);
    if (!foundProduct) return cart;
    if (newQuantity < 1) throw new RangeError("quantity must be at least 1");
    if (newQuantity > foundProduct.stock) {
        throw new RangeError("not enough stock");
    }

    return cart.map((p) =>
        p.id !== foundProduct.id ? p : { ...p, quantity: newQuantity },
    );
}
function removeFromCart(cart, idProduct) {
    const foundProduct = cart.find((p) => p.id === idProduct);
    if (!foundProduct) return cart;
    return cart.filter((p) => p.id !== idProduct);
}
function calculateCartSubtotal(cart) {
    return cart.reduce((total, p) => total + p.price * p.quantity, 0);
}
function calculateOrderTotal(cart, promo) {
    const isPromo = promo === "SAVE10";
    let subTotal = calculateCartSubtotal(cart);
    let discount = isPromo && subTotal > 20000 ? subTotal / 10 : 0;
    let delivery = subTotal > 50000 ? 0 : 30000;
    let total = subTotal - discount + delivery;
    return {
        subtotal: subTotal,
        discount: discount,
        delivery: delivery,
        total: total,
    };
}

const cartApi = {
    addToCart,
    changeQuantity,
    removeFromCart,
    calculateCartSubtotal,
    calculateOrderTotal,
};

if (typeof module !== "undefined") module.exports = cartApi;
if (typeof window !== "undefined") window.cartApi = cartApi;
