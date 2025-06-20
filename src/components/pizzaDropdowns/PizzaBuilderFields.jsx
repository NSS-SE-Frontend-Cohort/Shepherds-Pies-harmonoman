import { CheeseDropdown } from "./CheeseDropdown";
import { SauceDropdown } from "./SauceDropdown";
import { SizeDropdown } from "./SizeDropdown";
import { ToppingDropdown } from "./ToppingDropdown";

export const PizzaBuilderFields = ({
    sizes,
    sauces,
    cheeses,
    toppings,
    selectedSizeId,
    selectedSauceId,
    selectedCheeseId,
    selectedToppingIds,
    selectedToppingId,
    onSizeChange,
    onSauceChange,
    onCheeseChange,
    onToppingChange,
    onToppingRemove,
}) => {

    return (
        <div className="space-y-4">
            <fieldset className="w-full">
                <legend className="sr-only">Select a pizza size</legend>
                <SizeDropdown
                    sizes={sizes}
                    selectedSizeId={selectedSizeId}
                    onSizeChange={onSizeChange}
                />
            </fieldset>

            <fieldset className="w-full">
                <legend className="sr-only">Select a pizza sauce</legend>
                <SauceDropdown
                    sauces={sauces}
                    selectedSauceId={selectedSauceId}
                    onSauceChange={onSauceChange}
                />
            </fieldset>

            <fieldset className="w-full">
                <legend className="sr-only">Select a pizza cheese</legend>
                <CheeseDropdown
                    cheeses={cheeses}
                    selectedCheeseId={selectedCheeseId}
                    onCheeseChange={onCheeseChange}
                />
            </fieldset>

            <fieldset className="w-full">
                <legend className="sr-only">Select a pizza topping</legend>
                <ToppingDropdown
                    toppings={toppings}
                    onToppingChange={onToppingChange}
                    selectedToppingId={selectedToppingId}
                />
            </fieldset>

            {/* Selected Toppings */}
            <div className="flex flex-wrap gap-2">
                {selectedToppingIds.map(id => {
                    const topping = toppings.find(t => t.id === id);
                    return (
                        <span key={id} className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm font-medium shadow">
                            {topping ? topping.ingredient : `Topping ${id}`}
                            <button
                                type="button"
                                onClick={() =>
                                    onToppingRemove(id)
                                }
                                className="ml-1 text-red-600 hover:text-red-800 font-bold focus:outline-none"
                            >
                                ×
                            </button>
                        </span>
                    );
                })}
            </div>
        </div> 
    )
}