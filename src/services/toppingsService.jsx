export const getAllToppings = () => {
    return fetch(`http://localhost:8088/toppings`).then(res => res.json());
}

export const updateTopping = (topping) => {
    return fetch(`http://localhost:8088/toppings/${topping.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(topping)
    })
}

export const deleteTopping = (toppingId) => {
    return fetch(`http://localhost:8088/toppings/${toppingId}`, { 
        method: "DELETE" 
    })
}

export const createTopping = (topping) => {
    return fetch(`http://localhost:8088/toppings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(topping),
    })
}