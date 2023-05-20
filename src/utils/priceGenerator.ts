export function generateRandomPrice() {
    const minPrice = 200; // Minimum price
    const maxPrice = 2000; // Maximum price

    const randomPrice = Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;

    return randomPrice;
}
