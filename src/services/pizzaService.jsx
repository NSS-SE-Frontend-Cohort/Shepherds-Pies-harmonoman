export const getAllOrderPizzas = () => {
    return fetch('http://localhost:8088/orderPizzas?_expand=pizza').then(res => res.json());
}

export const getAllPizzas = () => {
    return fetch('http://localhost:8088/pizzas?_expand=size&_expand=sauce&_expand=cheese').then(res => res.json());
}

export const getAllPizzaToppings = () => {
    return fetch('http://localhost:8088/pizzaToppings?_expand=topping').then(res => res.json());
}