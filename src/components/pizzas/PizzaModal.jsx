import { useEffect, useState } from "react";
import { PizzaBuilderFields } from "../pizzaDropdowns/PizzaBuilderFields";

export const PizzaModal = ({ 
        sizes,
        sauces,
        cheeses,
        toppings,
        showPizzaModal, 
        handlePizzaModal, 
        onAddPizza, 
    }) => {

    const [selectedSizeId, setSelectedSizeId] =  useState(0);
    const [selectedSauceId, setSelectedSauceId] =  useState(0);
    const [selectedCheeseId, setSelectedCheeseId] =  useState(0);
    const [selectedToppingIds, setSelectedToppingIds] =  useState([]);
    const [selectedToppingId, setSelectedToppingId] =  useState(0);

    useEffect(() => {
        if (showPizzaModal) {
            handleResetModal();
        }
    }, [showPizzaModal]);
    
    if (!showPizzaModal) return null;

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

    // Handle resetting the selectedIds
    const handleResetModal = () => {
        setSelectedSizeId(0);
        setSelectedSauceId(0);
        setSelectedCheeseId(0);
        setSelectedToppingIds([]);
    }

    // Handle adding a pizza to the new order
    const handleAddPizza = () => {
        const newPizza = {
            sizeId: selectedSizeId,
            sauceId: selectedSauceId,
            cheeseId: selectedCheeseId,
            toppingIds: selectedToppingIds,
        };

        // Map full objects before storing
        const expandedPizza = {
            size: sizes.find(s => s.id === newPizza.sizeId),
            sauce: sauces.find(s => s.id === newPizza.sauceId),
            cheese: cheeses.find(c => c.id === newPizza.cheeseId),
            toppings: toppings.filter(t => newPizza.toppingIds.includes(t.id)),
            id: Date.now() + Math.random()
        };

        onAddPizza(expandedPizza);
    }

    const isFormInvalid = !selectedSizeId || !selectedSauceId || !selectedCheeseId;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg w-full space-y-4">
                <h2 className="text-2xl font-bold text-center">
                    Build Your Pizza
                </h2>

                {/* Import PizzaBuilderFields */}
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

                {/* Add Pizza/Cancel Buttons */}
                <div className="flex justify-center space-x-2">
                    <button 
                        type="button"
                        className={`bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition duration-200 ${
                            isFormInvalid ? 'opacity-50 cursor-not-allowed' : 'active:translate-y-[2px]'
                        }`}
                        onClick={() => {
                            if (isFormInvalid) return;
                            handleAddPizza();
                            handlePizzaModal(false);
                            handleResetModal();
                        }}
                        disabled={isFormInvalid}
                    >
                        Add Pizza
                    </button>
                    <button 
                        type="button"
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl shadow-md active:translate-y-[2px] transition duration-200"
                        onClick={() => {
                            handlePizzaModal(false);
                            handleResetModal();
                            }
                        }
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}