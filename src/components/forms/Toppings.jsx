import { useEffect, useState } from "react";
import { createTopping, getAllToppings, updateTopping } from "../../services/toppingsService";

export const Toppings = () => {

    const [allToppings, setAllToppings] = useState([]);
    const [currentlyEditingId, setCurrentlyEditingId] = useState(null);
    const [editedPrice, setEditedPrice] = useState(0.0);
    const [toppingName, setToppingName] = useState("");
    const [toppingPrice, setToppingPrice] = useState(0.0);


    useEffect(() => {
        getAllToppings().then(toppingsArray => {
            setAllToppings(toppingsArray);
        })
    },[]);

    // Handle creating a new topping
    const handleNewTopping = async (event) => {
        event.preventDefault();

        const newToppingObj = {
            ingredient: toppingName,
            cost: parseFloat(toppingPrice)
        }

        try {
            const savedTopping = await createTopping(newToppingObj).then(res => res.json());
        
            setAllToppings(prev => [...prev, savedTopping]);
            setToppingName("");
            setToppingPrice("");
        } catch (err) {
        console.error("Error creating topping:", err);
        }    
    }

    // Handle saving an updated price
    const handleSavePrice = async (toppingId) => {
        const topping = allToppings.find(t => t.id === toppingId);

        if (!topping) return;
      
        const price = parseFloat(editedPrice);

        try {
            const updateObj = {
                id: toppingId,
                ingredient: topping.ingredient,  
                cost: price
            };
        
            await updateTopping(updateObj);
        
            // Update UI optimistically
            const updatedToppings = allToppings.map(t =>
                t.id === toppingId ? { ...t, cost: price } : t
            );
            setAllToppings(updatedToppings);
            setCurrentlyEditingId(null);
            setEditedPrice("");

        } catch (err) {
            console.error("Failed to update topping:", err);
        }
    };

    const gradientWrapper = "p-[2px] bg-gradient-to-r from-green-500 via-white to-red-500 rounded-xl shadow";
    const inputControl = "bg-white rounded-lg px-6 py-2 w-35 text-gray-800 font-semibold text-lg hover:bg-gray-100 transition duration-150 ease-in-out focus:outline-none";

    const isFormInvalid = !toppingName || !toppingPrice;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-300 via-white to-red-300 p-4">
            <section className="bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-3xl mx-auto mt-10 space-y-4">

                {/* Header */}
                <div className="flex justify-center">
                    <div className="font-italianno italic text-6xl text-red-700 bg-gradient-to-r from-green-500 via-white to-red-500 font-bold p-10 text-center shadow-xl rounded-xl border-4 border-white">
                        Shepherd's Pies 🇮🇹
                    </div>
                </div>

                <h1 className="font-italianno italic text-center text-6xl mt-15 mb-15">Toppings</h1>
            
                {/* Toppings List */}
                <div className="w-full space-y-6">
                    {allToppings.map(topping => (
                        <div
                            key={topping.id}
                            className="flex items-center justify-between text-xl font-serif gap-2"
                        >
                            {/* Name */}
                            <span className="w-1/4 truncate">{topping.ingredient}</span>
                            {/* Price */}
                            <div className="flex items-center gap-10 flex-grow justify-end">
                            {currentlyEditingId !== topping.id && (
                                    <span className="text-lg ml-1">${topping.cost?.toFixed(2)}</span>
                                )}
                                {currentlyEditingId === topping.id ? (
                                    // Input and Save button for editing topping price
                                    <>
                                        <input
                                            type="number"
                                            min="0"
                                            max="1"
                                            step="0.01"
                                            value={editedPrice}
                                            onChange={(e) => setEditedPrice(e.target.value)}
                                            className={inputControl}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleSavePrice(topping.id)}
                                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-xl text-sm font-bold"
                                        >
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    // Edit button for topping price
                                    <button
                                    type="button"
                                    onClick={() => {
                                        setCurrentlyEditingId(topping.id);
                                        setEditedPrice(topping.cost.toFixed(2));
                                    }}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-xl text-sm font-bold"
                                    >
                                    Edit
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add Topping */}
                <div className="space-y-6">
                    {/* Name + Price in same row */}
                    <div className="flex justify-between w-full px-4 py-10">
                        {/* Name Field */}
                        <div className="flex flex-col space-y-1">
                            <span>New Topping</span>
                            <div className={gradientWrapper}>
                                <input
                                value={toppingName}
                                onChange={(event) => setToppingName(event.target.value)}
                                type="text"
                                placeholder="Enter Topping"
                                className="bg-white rounded-lg px-6 py-2 w-63 text-gray-800 font-semibold text-lg hover:bg-gray-100 transition duration-150 ease-in-out focus:outline-none"
                                required
                                />
                            </div>
                        </div>

                        {/* Price Field */}
                        <div className="flex flex-col space-y-1 ">
                            <span>Topping Price</span>
                            <div className={gradientWrapper}>
                                <input
                                value={toppingPrice}
                                onChange={(event) => setToppingPrice(event.target.value)}
                                type="number"
                                min="0"
                                max="1"
                                step="0.01"
                                placeholder="Enter Price"
                                className={inputControl}
                                required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Add Button */}
                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={handleNewTopping}
                            className={`bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition duration-200 ${
                                isFormInvalid ? 'opacity-50 cursor-not-allowed' : 'active:translate-y-[2px]'
                            }`}    
                            disabled={isFormInvalid}
                        >
                        Add Topping
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}