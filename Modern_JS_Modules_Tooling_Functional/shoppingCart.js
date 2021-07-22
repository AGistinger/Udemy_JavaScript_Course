// Exporting Module
console.log("Exporting module");

// All top level variables are private inside the module
const shippingCost = 10;
const cart = [];

export function addToCart(product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}

const totalPrice = 237;
const totalQuantity = 23;

// Export multiple things at one time
export { totalPrice, totalQuantity as tq }; // changing name of totalQuantity

// Defualt Exports (not named)
// When you only want to export (1) thing per module
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
