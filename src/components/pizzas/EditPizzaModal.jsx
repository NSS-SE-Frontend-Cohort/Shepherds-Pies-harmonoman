import { useState, useEffect } from "react";
import { PizzaBuilderFields } from "../pizzaDropdowns/PizzaBuilderFields";

export const EditPizzaModal = ({ 
        sizes,
        sauces,
        cheeses,
        toppings,
        pizza, 
        pizzaToppings, 
        onSave, 
        onCancel 
    }) => {

    const [selectedSizeId, setSelectedSizeId] = useState(pizza.size?.id || {});
    const [selectedSauceId, setSelectedSauceId] = useState(pizza.sauce?.id || {});
    const [selectedCheeseId, setSelectedCheeseId] = useState(pizza.cheese?.id || {});
    const [selectedToppingIds, setSelectedToppingIds] = useState([]);
    const [selectedToppingId, setSelectedToppingId] = useState(0);

    useEffect(() => {
        const toppingList = pizzaToppings
            .filter(pt => pt.pizzaId === pizza.id)
            .map(pt => pt.topping.id);

        setSelectedToppingIds(toppingList);
    }, [pizza, pizzaToppings]);

    // Handle selecting a size
    const handleSizeSelection = (sizeId) => {
        setSelectedSizeId(sizeId);
    }

    // Handle selecting a sauce
    const handleSauceSelection = (sauceId) => {
        setSelectedSauceId(sauceId);
    }
    
    // Handle selecting a cheese
    const handleCheeseSelection = (cheeseId) => {
        setSelectedCheeseId(cheeseId);
    }

    // Handle selecting one or multiple toppings
    const handleToppingSelection = (toppingId) => {
        setSelectedToppingIds(prev =>
            prev.includes(toppingId) ? prev : [...prev, toppingId]
        );

        setSelectedToppingId(0);
    };

    // Handle removing a topping from the pizza
    const handleRemoveTopping = (id) => {
        setSelectedToppingIds(prev => prev.filter(tid => tid !== id))
    }

    const handleSave = () => {
        console.log("Saving pizza...");

        const selectedToppingObjects = toppings.filter(t =>
            selectedToppingIds.includes(t.id)
        );

        onSave({
            ...pizza,
            size: sizes.find(size => size.id === selectedSizeId),
            sauce: sauces.find(sauce => sauce.id === selectedSauceId),
            cheese: cheeses.find(cheese => cheese.id === selectedCheeseId),
            toppings: selectedToppingObjects,
        });
    };

    const isFormInvalid = !selectedSizeId || !selectedSauceId || !selectedCheeseId;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg w-full space-y-4">
                <h2 className="text-2xl font-bold text-center">
                Edit Pizza
                </h2>

                <PizzaBuilderFields 
                    sizes={sizes}
                    onSizeChange={handleSizeSelection}
                    selectedSizeId={selectedSizeId}
                    sauces={sauces}
                    onSauceChange={handleSauceSelection}
                    selectedSauceId={selectedSauceId}
                    cheeses={cheeses}
                    onCheeseChange={handleCheeseSelection}
                    selectedCheeseId={selectedCheeseId}
                    toppings={toppings}
                    onToppingChange={handleToppingSelection}
                    selectedToppingIds={selectedToppingIds}
                    onToppingRemove={handleRemoveTopping}
                    selectedToppingId={selectedToppingId}
                />

                <div className="flex justify-center space-x-2">
                    <button 
                        type="button"
                        className={`bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition duration-200 ${
                            isFormInvalid ? 'opacity-50 cursor-not-allowed' : 'active:translate-y-[2px]'
                        }`}
                        onClick={handleSave}
                    >
                        Save Changes
                    </button>
                    <button 
                        type="button"
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl shadow-md active:translate-y-[2px] transition duration-200"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};