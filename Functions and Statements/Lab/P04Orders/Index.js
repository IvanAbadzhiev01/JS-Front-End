function calculatePrice(product, qty) {
    let obj = {
        coffee: 1.5,
        water: 1.00,
        coke: 1.40,
        snacks: 2.00

    }

    console.log((obj[product] * qty).toFixed(2));
}

