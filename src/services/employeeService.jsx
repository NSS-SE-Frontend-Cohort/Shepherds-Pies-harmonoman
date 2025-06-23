export const getAllEmployees = () => {
    return fetch(`http://localhost:8088/employees`).then(res => res.json());
}

export const createOrderEmployee = (orderEmployee) => {
    return fetch(`http://localhost:8088/orderEmployees`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderEmployee),
    })
}

export const createEmployee = (employee) => {
    return fetch(`http://localhost:8088/employees`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    })
}