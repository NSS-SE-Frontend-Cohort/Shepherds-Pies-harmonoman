import { useEffect, useState } from "react";
import { EmployeeDropdown } from "../filters/EmployeeDropdown";
import { useNavigate } from "react-router-dom";
import { PizzaModal } from "../pizzas/PizzaModal";
import { Pizza } from "../pizzas/Pizza";
import { createNewOrder } from "../../services/orderService";
import { createOrderPizza, createPizza, createPizzaTopping, getAllCheeses, getAllSauces, getAllSizes, getAllToppings } from "../../services/pizzaService";
import { createOrderEmployee, getAllEmployees } from "../../services/employeeService";
import { EditPizzaModal } from "../pizzas/EditPizzaModal";

export const NewOrder = () => {
    const [employees, setEmployees] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [sauces, setSauces] = useState([]);
    const [cheeses, setCheeses] = useState([]);
    const [toppings, setToppings] = useState([]);
    const [selectedServerId, setSelectedServerId] = useState(0);
    const [tableNum, setTableNum] = useState("");
    const [delivery, setDelivery] = useState(false);
    const [selectedDelivererId, setSelectedDelivererId] = useState("");
    const [address, setAddress] = useState("");
    const [takeaway, setTakeaway] = useState(false);
    const [tip, setTip] = useState(0.0);
    const [showPizzaModal, setShowPizzaModal] = useState(false);
    const [pizzasOnOrder, setPizzasOnOrder] = useState([]);
    const [pizzaToppings, setPizzaToppings] = useState([]);
    const [pizzaBeingEdited, setPizzaBeingEdited] = useState(null);

    const navigator = useNavigate();

    useEffect(() => {
        // Fetch all data
        const fetchAllData = async () => {
            try {
                const [employeesData, sizesData, saucesData, cheesesData, toppingsData] = await Promise.all([
                getAllEmployees(),
                getAllSizes(),
                getAllSauces(),
                getAllCheeses(),
                getAllToppings(),
                ]);
                
                setEmployees(employeesData);
                setSizes(sizesData);
                setSauces(saucesData);
                setCheeses(cheesesData);
                setToppings(toppingsData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        }
        
        fetchAllData();
    }, [])

    // Delivery/Takeaway logic
    useEffect(() => {
        if (!delivery) {
            setAddress("");
            setSelectedDelivererId("");
        }
    }, [delivery]);

    useEffect(() => {
        if (delivery) {
            setTableNum("");
            setTakeaway(false);
        }
    }, [delivery]);
    
    useEffect(() => {
        if (takeaway) {
            setTableNum("");
            setDelivery(false);
        }
    }, [takeaway]);

    // Handle server selection
    const handleServerChange = (employeeId) => {
        setSelectedServerId(employeeId);
    }

    // Handle deliverer selection
    const handleDelivererChange = (employeeId) => {
        setSelectedDelivererId(employeeId);
        setTableNum("");
    }

    // Handle creating a pizza
    const handleCreatePizza = (e) => {
        e.preventDefault();
        setShowPizzaModal(true);
    }

    // Handle opening/closing of modal
    const handlePizzaModal = (value) => {
        setShowPizzaModal(value);
    }

    // Handle adding a created pizza to orderPizzas array
    const handleAddPizzaToOrder = (newPizza) => {
        const { toppings, id } = newPizza;

        const newPizzaToppings = toppings.map(topping => ({
            pizzaId: id,
            topping
        }));

        setPizzaToppings(prev => [...prev, ...newPizzaToppings]);
        setPizzasOnOrder(prev => [...prev, newPizza]);

        setShowPizzaModal(false); // Close the creation modal
    };

    // Handle pizza setting pizza to be edited
    const handleEditPizza = (pizza) => {
        setPizzaBeingEdited(pizza);
    };

    // Handle saving the edited pizza
    const handleSaveEditedPizza = (updatedPizza) => {

        setPizzasOnOrder((prevPizzas) =>
            prevPizzas.map(p => p.id === updatedPizza.id ? updatedPizza : p)
        );
    
        // Replace toppings too
        const newToppings = updatedPizza.toppings.map(t => ({
            pizzaId: updatedPizza.id,
            topping: t
        }));

        setPizzaToppings(prev =>
            [...prev.filter(pt => pt.pizzaId !== updatedPizza.id), ...newToppings]
        );
        
        setPizzaBeingEdited(null);
    };

    // Handle deleting a pizza from the new order
    const handleDeletePizza = (pizzaId) => {
        if (!window.confirm("Delete this pizza from the order?")) return;

        setPizzasOnOrder(prev => prev.filter(p => p.id !== pizzaId));
        setPizzaToppings(prev => prev.filter(pt => pt.pizzaId !== pizzaId));
    }
    
    // Handle creating the order and associated data
    const handleCreateOrder = async (e) => {
        e.preventDefault();

        if (selectedServerId === 0) {
            alert("Please assign a server to the order.");
            return;
        }
        
        if (delivery && !selectedDelivererId) {
            console.warn("Delivery is selected but no deliverer is assigned.");
            alert("Please assign a deliverer before submitting the order.");
            return;
        }

        if (pizzasOnOrder.length === 0) {
            alert("You must add at least one pizza to the order.");
            return;
        }

        if (isNaN(parseFloat(tip))) {
            alert("You must enter a valid tip amount.");
            return;
        }

        // build order
        const newOrderObj = {
            tableNumber: tableNum === "" ? null : parseInt(tableNum),
            delivery: delivery,
            address: address === "" ? null : address,
            takeaway: takeaway, 
            tip: parseFloat(tip),
            dateTimePlaced: new Date().toISOString().replace(/\.\d{3}Z$/, "Z"),
            dateTimeFulfilled: null
        }

        try {
            // Post new order to database
            const createdOrder = await createNewOrder(newOrderObj);

            const orderId = createdOrder.id;

            for (const pizza of pizzasOnOrder) {
                // Create pizzas in the database
                const { size, sauce, cheese, toppings, id: _ } = pizza;

                const pizzaToCreate = {
                    sizeId: size.id,
                    sauceId: sauce.id,
                    cheeseId: cheese.id
                };

                const newPizza = await createPizza(pizzaToCreate).then(res => res.json());

                await createOrderPizza({ orderId: orderId, pizzaId: newPizza.id })

                // Add toppings of pizza to database
                for (const topping of toppings) {
                    await createPizzaTopping({ pizzaId: newPizza.id, toppingId: topping.id }).then(res => res.json());
                }
            } 

            // Add assigned server to database
            await createOrderEmployee({ 
                orderId: orderId, 
                employeeId: selectedServerId, 
                role: "server"
            });
            
            // Add assigned deliverer (if applicable) to database
            if (delivery && selectedDelivererId) {
                await createOrderEmployee({
                    orderId: orderId,
                    employeeId: selectedDelivererId,
                    role: "deliverer"
                })
            }

            navigator("/");

        } catch (err) {
            console.error("Failed to create order:", err);
        }
    }

    // Get and add elements for total order price
    const pizzaSubtotal = pizzasOnOrder.reduce((acc, pizza) => {
        const pizzaToppingsForThis = pizzaToppings.filter(pt => pt.pizzaId === pizza.id);
        const basePrice = pizza.size?.cost ?? 0;
        const toppingCost = pizzaToppingsForThis.reduce((sum, pt) => sum + (pt.topping?.cost ?? 0), 0);
        return acc + basePrice + toppingCost;
    }, 0);
    
    const deliveryFee = delivery ? 5 : 0;
    const orderTip = isNaN(parseFloat(tip)) ? 0 : parseFloat(tip);
    
    const grandTotal = (pizzaSubtotal + deliveryFee + orderTip).toFixed(2);

    // Button stylings
    const gradientWrapper = "p-[2px] bg-gradient-to-r from-green-500 via-white to-red-500 rounded-xl shadow";
    const inputControl = "w-full bg-white rounded-lg px-6 py-2 w-64 text-gray-800 font-semibold text-lg hover:bg-gray-100 transition duration-150 ease-in-out focus:outline-none";
    const isFormInvalid = pizzasOnOrder.length === 0 || selectedServerId === 0 || isNaN(parseFloat(tip)) || (delivery && !selectedDelivererId || (!delivery && !takeaway && tableNum === ""));

    return (
        <form
            onSubmit={handleCreateOrder}
            className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-300 via-white to-red-300 p-4"
        >
            <section className="bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-3xl mx-auto mt-10 space-y-4">

                {/* Centered Header */}
                <div className="flex justify-center">
                    <div className="font-italianno italic text-6xl text-red-700 bg-gradient-to-r from-green-500 via-white to-red-500 font-bold p-10 text-center shadow-xl rounded-xl border-4 border-white">
                        Shepherd's Pies 🇮🇹
                    </div>
                </div>

                {/* New Order */}
                <h1 className="font-italianno italic text-center text-6xl mt-15 mb-15">New Order</h1>

                {/* Assigned Server */}
                <fieldset>
                    <legend className="mb-1">Assigned Server</legend>
                    <div className="w-full p-[2px] bg-gradient-to-r from-green-500 via-white to-red-500 rounded-xl shadow">
                        <div className="bg-white rounded-lg w-64"></div>
                        <EmployeeDropdown
                            employees={employees}
                            onEmployeeChange={handleServerChange}
                            selectedEmployeeId={selectedServerId}
                        />
                    </div>
                </fieldset>

                {/* Order Type */}
                <fieldset className="space-y-2">
                    <legend className="mb-1">Order Type</legend>

                    {/* Delivery Selector */}
                    <label className="flex items-center space-x-2 text-lg font-semibold">
                        <input
                            type="checkbox"
                            checked={delivery}
                            onChange={(e) => setDelivery(e.target.checked)}
                            className="form-checkbox h-5 w-5 text-red-600"
                        />
                        <span>Delivery?</span>
                    </label>

                    {/* Takeaway Selector */}
                    <label className="flex items-center space-x-2 text-lg font-semibold">
                        <input
                            type="checkbox"
                            checked={takeaway}
                            onChange={(e) => setTakeaway(e.target.checked)}
                            className="form-checkbox h-5 w-5 text-red-600"
                        />
                        <span>Take-away?</span>
                    </label>

                    {delivery ? (
                        <>
                            {/* Delivery Address input */}
                            <span>Delivery Address</span>
                            <fieldset>
                                <div className={gradientWrapper}>
                                    <input
                                        onChange={(event) => setAddress(event.target.value)}
                                        type="text"
                                        placeholder="Enter Address"
                                        className={inputControl}
                                        required
                                    />
                                </div>
                            </fieldset>

                            {/* Assigned Deliverer input */}
                            <span>Assigned Deliverer</span>
                            <div className="w-full p-[2px] bg-gradient-to-r from-green-500 via-white to-red-500 rounded-xl shadow">
                                <div className="bg-white rounded-lg w-64"></div>
                                <EmployeeDropdown
                                    employees={employees}
                                    onEmployeeChange={handleDelivererChange}
                                    selectedEmployeeId={selectedDelivererId}
                                />
                            </div>
                        </>
                        ) : takeaway ? (
                            <p className="text-lg font-semibold italic">Customer will take the order to go.</p>
                        ) : (
                        <>
                            {/* Table Number */}
                            <span>Table Number</span>

                            {/* Table Number Input */}
                            <div className={gradientWrapper}>
                                <input
                                    type="number"
                                    min="0"
                                    value={tableNum}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setTableNum(value);
                                    }}
                                    placeholder="Table #"
                                    className={inputControl}
                                />
                            </div>
                        </>
                    )}
                </fieldset>

                {/* Pizzas */}
                {pizzasOnOrder.map((pizza) => {
                    return (
                        <Pizza 
                            key={pizza.id} 
                            pizza={pizza} 
                            pizzaToppings={pizzaToppings} 
                            showEdit={true}
                            onEdit={handleEditPizza}
                            onDelete = {handleDeletePizza}
                        />
                    )
                })}     

                {/* Add Pizza Button */}
                <div className="flex justify-center">
                    <button 
                        type="button"
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl shadow-md active:translate-y-[2px] transition duration-200"
                        onClick={handleCreatePizza}
                    >
                        Add Pizza
                    </button>
                </div>

                {/* Delivery Surcharge */}
                <div className="flex justify-between font-serif text-2xl">
                    <span>Delivery Surcharge:</span>
                    <span>{delivery ? "$5" : "n/a"}</span>
                </div>

                {/* Tip */}
                <span>Tip</span>
                <fieldset className={gradientWrapper}>
                    <legend className="sr-only">Tip Amount</legend>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={tip}
                        onChange={(e) => setTip(e.target.value)}
                        placeholder="Enter Tip Amount"
                        className={inputControl}
                    />
                </fieldset>

                {/* Total */}
                <div className="flex justify-between font-serif italic text-2xl font-bold">
                    <span>Total Price: </span> 
                    <span>${grandTotal}</span>
                </div>

                {/* Save/Cancel Order */}
                <div className="flex justify-center space-x-2">
                    <button 
                        type="submit"
                        disabled={isFormInvalid}
                        className={`bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition duration-200 ${
                            isFormInvalid ? 'opacity-50 cursor-not-allowed' : 'active:translate-y-[2px]'
                        }`}
                        // onClick={handleCreateOrder}
                    >
                        Save Order
                    </button>
                    <button 
                        type="button"
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl shadow-md active:translate-y-[2px] transition duration-200"
                        onClick={() => navigator("/")}
                    >
                        Cancel
                    </button>
                </div>

            </section>
            
            {/* Build Pizza Modal */}
            {showPizzaModal && (
                <PizzaModal
                    sizes={sizes}
                    sauces={sauces}
                    cheeses={cheeses}
                    toppings={toppings}
                    showPizzaModal={showPizzaModal}
                    handlePizzaModal={handlePizzaModal}
                    onAddPizza={handleAddPizzaToOrder}
                />
            )}

            {pizzaBeingEdited?.id && (
                <EditPizzaModal
                    sizes={sizes}
                    sauces={sauces}
                    cheeses={cheeses}
                    toppings={toppings}
                    pizza={pizzaBeingEdited}
                    pizzaToppings={pizzaToppings}
                    onSave={handleSaveEditedPizza}
                    onCancel={() => setPizzaBeingEdited(null)}
                />
            )}
        </form>
    )
}