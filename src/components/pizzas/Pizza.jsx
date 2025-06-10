export const Pizza = ({ pizza, pizzaToppings }) => {

    const foundPizzaToppings = pizzaToppings?.filter(
        pizzaTopping => pizzaTopping.pizzaId === pizza.id
    ) ?? [];

    const basePrice = pizza.size?.cost ?? 0.0;
    const toppingCost = foundPizzaToppings.reduce(
        (sum, pt) => sum + (pt.topping?.cost ?? 0), 0
    );

    const totalPizzaPrice = (basePrice + toppingCost).toFixed(2);

    return (
        <div className="grid grid-cols-[1fr_auto] items-start gap-4 py-4 border-b border-gray-200">
            <div className="space-y-1">
                <p><strong>Size:</strong> {pizza.size?.name}</p>
                <p><strong>Sauce:</strong> {pizza.sauce?.type}</p>
                <p><strong>Cheese:</strong> {pizza.cheese?.type}</p>
                <p><strong>Toppings:</strong> {foundPizzaToppings.map(pt => pt.topping.ingredient).join(", ")}</p>
            </div>
            <div className="text-right font-bold text-lg pr-2">
                ${totalPizzaPrice}
            </div>
        </div>
    );
};