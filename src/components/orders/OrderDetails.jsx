import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteFullOrder, getAllOrderEmployees, getAllOrders, updateOrder } from "../../services/orderService";
import { getAllOrderPizzas, getAllPizzas, getAllPizzaToppings } from "../../services/pizzaService";
import { Pizza } from "../pizzas/Pizza";


export const OrderDetails = () => {
    const { orderId } = useParams();
    const [orderInfo, setOrderInfo] = useState(null);
    const [server, setServer] = useState([]);
    const [deliverer, setDeliverer] = useState([]);
    const [pizzas, setPizzas] = useState([]);
    const [pizzaToppings, setPizzaToppings] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0); // scroll to top on mount
      
        // Fetch all data to be displayed
        const fetchAllData = async () => {
          const [orders, orderEmployees, orderPizzasAll, allPizzas, allPizzaToppings] = await Promise.all([
            getAllOrders(),
            getAllOrderEmployees(),
            getAllOrderPizzas(),
            getAllPizzas(),
            getAllPizzaToppings()
          ]);
      
          const foundOrder = orders.find(order => order.id === parseInt(orderId));
          setOrderInfo(foundOrder);
      
          const foundServer = orderEmployees.find(emp => emp.orderId === parseInt(orderId) && emp.role === "server");
          setServer(foundServer || {});
      
          const foundDeliverer = orderEmployees.find(emp => emp.orderId === parseInt(orderId) && emp.role === "deliverer");
          setDeliverer(foundDeliverer || {});
      
          const foundOrderPizzas = orderPizzasAll.filter(op => op.orderId === parseInt(orderId));
      
          const matchedPizzas = foundOrderPizzas.map(op => allPizzas.find(p => p.id === op.pizzaId));
          setPizzas(matchedPizzas);
      
          const matchedToppings = allPizzaToppings.filter(pt => 
            matchedPizzas.some(pizza => pizza?.id === pt.pizzaId)
          );
          setPizzaToppings(matchedToppings);
        };
      
        fetchAllData();
      }, [orderId]);

    // Get and add elements for total order price
    const pizzaSubtotal = pizzas.reduce((acc, pizza) => {
        const pizzaToppingsForThis = pizzaToppings.filter(pt => pt.pizzaId === pizza.id);
        const basePrice = pizza.size?.cost ?? 0;
        const toppingCost = pizzaToppingsForThis.reduce((sum, pt) => sum + (pt.topping?.cost ?? 0), 0);
        return acc + basePrice + toppingCost;
    }, 0);
    
    const deliveryFee = orderInfo?.delivery ? 5 : 0;
    const tip = Number(orderInfo?.tip ?? 0);
    
    const grandTotal = (pizzaSubtotal + deliveryFee + tip).toFixed(2);

    // Handle fulfilled order
    const handleOrderFulfilled = (orderId) => {
        const updatedOrderObj = {
            "id": orderId,
            "tableNumber": orderInfo.tableNumber,
            "delivery": orderInfo.delivery,
            "address": orderInfo.address,
            "tip": orderInfo.tip,
            "dateTimePlaced": orderInfo.dateTimePlaced,
            "dateTimeFulfilled": new Date().toISOString().replace(/\.\d{3}Z$/, "Z"),
        }
        
        updateOrder(updatedOrderObj).then(() => {
            navigate("/", { state: { refreshOrders: true } });
        });

    }

    // Handle order deletion
    const handleDeleteOrder = (orderId) => {
        const confirmed = window.confirm("Are you sure you want to delete this order?");
        if(confirmed) {
            deleteFullOrder(orderId).then(() => {
                navigate("/", { state: { refreshOrders: true } });
            });
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-300 via-white to-red-300 p-4">
            <section className="bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-3xl mx-auto mt-10 space-y-4">

                {/* Centered Header */}
                <div className="flex justify-center">
                    <div className="font-italianno italic text-6xl text-red-700 bg-gradient-to-r from-green-500 via-white to-red-500 font-bold p-10 text-center shadow-xl rounded-xl border-4 border-white">
                        Shepherd's Pies 🇮🇹
                    </div>
                </div>

                {/* Order # */}
                <h1 className="font-serif italic text-center text-3xl font-bold">Order # {orderId}</h1>

                {/* Order Date */}
                <h1 className="font-serif  text-left text-2xl">Time Placed: {new Date(orderInfo?.dateTimePlaced).toLocaleString()}</h1>
            
                {/* Fulfillment Info */}
                {orderInfo?.dateTimeFulfilled ? (
                        <h1 className="font-serif text-left text-2xl">
                            Fulfilled: {new Date(orderInfo.dateTimeFulfilled).toLocaleString()}
                        </h1>
                ) : (
                    <button 
                        className="w-full py-2 px-4 bg-gradient-to-r from-green-600 via-white to-red-600 text-black font-serif text-lg rounded-xl shadow hover:shadow-lg active:translate-y-[2px] transition duration-200"
                        onClick={() => handleOrderFulfilled(orderId)}
                    >
                        Order Fulfilled
                    </button>
                )}

                {/* Table # */}
                <h1 className="font-serif  text-left text-2xl">Table #: {orderInfo?.tableNumber || ""}</h1>    
                
                {/* Server */}
                <h1 className="font-serif  text-left text-2xl">Server: {server?.employee?.name || "-"}</h1>
            
                {/* Deliverer */}
                <h1 className="font-serif  text-left text-2xl">Deliverer: {deliverer?.employee?.name || ""}</h1>
            
                {/* Ordern Details */}
                <div className="flex justify-between font-serif italic text-2xl font-bold">
                    <span>Order Details</span> 
                    <span>Price</span>
                </div>

                {/* Pizzas */}
                {pizzas.map((pizza) => {
                    return (
                        <Pizza 
                            key={pizza.id} 
                            pizza={pizza} 
                            pizzaToppings={pizzaToppings} 
                        />
                    )
                })}

                {/* Delivery Surcharge */}
                <div className="flex justify-between font-serif text-2xl">
                    <span>Delivery Surcharge:</span>
                    <span>{orderInfo?.delivery ? "$5" : "n/a"}</span>
                </div>

                {/* Tip */}
                <div className="flex justify-between font-serif text-2xl">
                    <span>Tip:</span> 
                    <span>{orderInfo?.tip ? `${"$" + orderInfo?.tip}` : "$0"}</span>
                </div>

                {/* Total */}
                <div className="flex justify-between font-serif italic text-2xl font-bold">
                    <span>Total Price: </span> 
                    <span>${grandTotal}</span>
                </div>

                {/* Delete Order */}
                <div className="flex justify-center">
                    <button 
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl shadow-md active:translate-y-[2px] transition duration-200"
                        onClick={() => handleDeleteOrder(orderId)}
                    >   
                        Delete Order
                    </button>
                </div>
                
            </section>
        </main>
    )
}