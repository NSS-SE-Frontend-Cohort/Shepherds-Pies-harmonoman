export const getAllOrderPizzas = () => {
    return fetch('http://localhost:8088/orderPizzas?_expand=pizza').then(res => res.json());
}

export const getAllPizzas = () => {
    return fetch('http://localhost:8088/pizzas?_expand=size&_expand=sauce&_expand=cheese').then(res => res.json());
}

export const getAllPizzaToppings = () => {
    return fetch('http://localhost:8088/pizzaToppings?_expand=topping').then(res => res.json());
}

export const getAllSizes = () => {
    return fetch(`http://localhost:8088/sizes`).then(res => res.json());
}

export const getAllSauces = () => {
    return fetch(`http://localhost:8088/sauces`).then(res => res.json());
}

export const getAllCheeses = () => {
    return fetch(`http://localhost:8088/cheeses`).then(res => res.json());
}

export const getAllToppings = () => {
    return fetch(`http://localhost:8088/toppings`).then(res => res.json());
}

export const createPizza = (pizza) => {
    return fetch(`http://localhost:8088/pizzas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pizza),
    })
}

export const createOrderPizza = (orderPizza) => {
    return fetch(`http://localhost:8088/orderPizzas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderPizza),
    })
}

export const createPizzaTopping = (topping) => {
    return fetch(`http://localhost:8088/pizzaToppings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(topping),
    })
}