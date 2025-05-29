export const getAllOrders = () => {
    return fetch(`http://localhost:8088/orders`).then(res => res.json())
}

export const getAllOrderEmployees = () => {
    return fetch(`http://localhost:8088/orderEmployees?_expand=order&_expand=employee`).then(res => res.json());
}