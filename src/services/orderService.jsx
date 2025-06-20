export const getAllOrders = () => {
    return fetch(`http://localhost:8088/orders`).then(res => res.json());
}

export const getAllOrderEmployees = () => {
    return fetch(`http://localhost:8088/orderEmployees?_expand=order&_expand=employee`).then(res => res.json());
}

export const updateOrder = (order) => {
    return fetch(`http://localhost:8088/orders/${order.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    })
}

// Helper for deleteFullOrder - orderEmployees
const deleteOrderEmployeesForOrder = async (orderId) => {
    const orderEmployees = await fetch(`http://localhost:8088/orderEmployees?orderId=${orderId}`).then(res => res.json());

    await Promise.all(orderEmployees.map(oe =>
        fetch(`http://localhost:8088/orderEmployees/${oe.id}`, { method: "DELETE" })
    ));
};

// Delete the full Order and associated connections
export const deleteFullOrder = async (orderId) => {
    try {

        // Get all pizzas associated with the order
        const orderPizzas = await fetch(`http://localhost:8088/orderPizzas?orderId=${orderId}`).then(res => res.json());

        // Delete the pizzas and their toppings
        for (const orderPizza of orderPizzas) {
            const pizzaId = orderPizza.pizzaId;

            // Get then Delete pizzaToppings
            const pizzaToppings = await fetch(`http://localhost:8088/pizzaToppings?pizzaId=${pizzaId}`).then(res => res.json());

            await Promise.all(pizzaToppings.map(pt =>
                fetch(`http://localhost:8088/pizzaToppings/${pt.id}`, { method: "DELETE" })
            ));
            
            // Delete the orderPizzas connections
            await fetch(`http://localhost:8088/orderPizzas/${orderPizza.id}`, { method: "DELETE" })

            // Delete the pizza
            await fetch(`http://localhost:8088/pizzas/${pizzaId}`, { method: "DELETE" });
        } 

        // Delete employees related to the order
        await deleteOrderEmployeesForOrder(orderId);
        
        // Delete the order
        await fetch(`http://localhost:8088/orders/${orderId}`, { method: "DELETE"});

        console.log(`Order #${orderId} and related data successfully deleted.`);
        
    } catch (error) {        
        console.error("Failed to delete order and related data:", error);
    }
}

export const createNewOrder = (order) => {
    return fetch("http://localhost:8088/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    }).then((res) => res.json())
  }